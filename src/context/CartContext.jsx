import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const lineIdFor = (id, size) => (size ? `${id}__${size}` : String(id));

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem('kailynnes_cart') || '[]');
    if (!Array.isArray(saved)) return [];
    // Older carts were keyed by product id only.
    return saved.map(item => ({ ...item, lineId: item.lineId || lineIdFor(item.id, item.size) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem('kailynnes_cart', JSON.stringify(cartItems));
    } catch {
      /* storage full or unavailable: the cart still works for this visit */
    }
  }, [cartItems]);

  // Units of a product already in the bag, across every size.
  const quantityInCart = (productId, items = cartItems) =>
    items.filter(i => i.id === productId).reduce((sum, i) => sum + i.quantity, 0);

  const addToCart = (product, qty = 1, size = null) => {
    setCartItems(prev => {
      const room = Math.max(0, product.quantityInStock - quantityInCart(product.id, prev));
      const toAdd = Math.min(qty, room);
      if (toAdd <= 0) return prev;

      const lineId = lineIdFor(product.id, size);
      const existing = prev.find(i => i.lineId === lineId);
      if (existing) {
        return prev.map(i => (i.lineId === lineId ? { ...i, quantity: i.quantity + toAdd } : i));
      }
      return [...prev, { ...product, size: size || undefined, lineId, quantity: toAdd }];
    });
  };

  const removeFromCart = (lineId) => {
    setCartItems(prev => prev.filter(i => i.lineId !== lineId));
  };

  const updateQuantity = (lineId, qty) => {
    if (qty < 1) {
      removeFromCart(lineId);
      return;
    }
    setCartItems(prev => {
      const line = prev.find(i => i.lineId === lineId);
      if (!line) return prev;
      const others = quantityInCart(line.id, prev) - line.quantity;
      const max = Math.max(1, line.quantityInStock - others);
      return prev.map(i => (i.lineId === lineId ? { ...i, quantity: Math.min(qty, max) } : i));
    });
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
      cartCount, cartTotal, quantityInCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
}
