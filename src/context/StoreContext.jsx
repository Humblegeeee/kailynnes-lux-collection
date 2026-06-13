import { createContext, useContext, useState, useEffect } from 'react';
import sampleProducts from '../data/sampleProducts';

const StoreContext = createContext();

const ORDER_STATUSES = [
  'Pending',
  'Payment Details Sent',
  'Paid',
  'Preparing',
  'Out for Delivery',
  'Delivered',
  'Picked Up',
  'Cancelled',
];

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('kailynnes_products');
      return saved ? JSON.parse(saved) : sampleProducts;
    } catch {
      return sampleProducts;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('kailynnes_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notifyRequests, setNotifyRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('kailynnes_notify');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('kailynnes_admin') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('kailynnes_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('kailynnes_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('kailynnes_notify', JSON.stringify(notifyRequests));
  }, [notifyRequests]);

  const adminLogin = (email, password) => {
    if (email === 'admin@bagstore.com' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('kailynnes_admin', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('kailynnes_admin');
  };

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const placeOrder = (orderData, cartItems, cartTotal) => {
    const order = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      customer: orderData,
      items: cartItems,
      total: cartTotal,
    };

    setOrders(prev => [order, ...prev]);

    setProducts(prev =>
      prev.map(p => {
        const cartItem = cartItems.find(i => i.id === p.id);
        if (!cartItem) return p;

        return {
          ...p,
          quantityInStock: Math.max(0, p.quantityInStock - cartItem.quantity),
        };
      })
    );

    return order;
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const addNotifyRequest = (productId, productName, name, phone) => {
    const req = {
      id: Date.now().toString(),
      productId,
      productName,
      name,
      phone,
      createdAt: new Date().toISOString(),
    };

    setNotifyRequests(prev => [req, ...prev]);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        placeOrder,
        updateOrderStatus,
        notifyRequests,
        addNotifyRequest,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        ORDER_STATUSES,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}