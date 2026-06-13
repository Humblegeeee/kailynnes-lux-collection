import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={56} className="mx-auto text-stone-300 mb-6" />
        <h2 className="font-display text-2xl font-bold text-ink mb-2">Your bag is empty</h2>
        <p className="text-sm text-muted font-body mb-8">
          You haven't added any bags yet. Browse our collection and find your perfect carry.
        </p>
        <Link to="/products" className="btn-primary inline-flex items-center gap-2">
          <ShoppingBag size={16} />
          Start Shopping
        </Link>
      </div>
    );
  }

  const deliveryFee = cartTotal >= 500 ? 0 : 30;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="section-eyebrow">Review Your Selection</p>
        <h1 className="font-display text-3xl font-bold text-ink">Your Bag</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="card p-4 flex gap-4">
              <Link to={`/products/${item.id}`} className="flex-shrink-0">
                <img
                  src={item.photos?.[0] || 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=200&q=80'}
                  alt={item.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-sm bg-blush-light"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-body tracking-[0.18em] text-gold uppercase mb-0.5">
                  {item.category}
                </p>
                <h3 className="font-display font-semibold text-ink text-base leading-snug mb-1 line-clamp-1">
                  {item.name}
                </h3>
                <p className="font-display text-lg font-bold text-espresso mb-3">
                  GH₵ {item.price.toLocaleString()}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  {/* Qty */}
                  <div className="flex items-center border border-card-border rounded-sm">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-stone-50 text-ink font-body text-lg transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-body font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.quantityInStock}
                      className="w-8 h-8 flex items-center justify-center hover:bg-stone-50 text-ink font-body text-lg transition-colors disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-sm font-body font-semibold text-ink">
                      GH₵ {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted hover:text-red-500 transition-colors"
                      aria-label="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="flex items-center gap-1.5 text-sm font-body text-muted hover:text-espresso transition-colors mt-2"
          >
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="font-display text-xl font-semibold text-ink mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm font-body mb-5">
              <div className="flex justify-between text-muted">
                <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="text-ink">GH₵ {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Estimated delivery</span>
                <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : 'text-ink'}>
                  {deliveryFee === 0 ? 'FREE' : `GH₵ ${deliveryFee}`}
                </span>
              </div>
              {deliveryFee === 0 && (
                <p className="text-xs text-green-600">🎉 You qualify for free delivery!</p>
              )}
              {cartTotal < 500 && (
                <p className="text-xs text-muted">
                  Add GH₵ {(500 - cartTotal).toLocaleString()} more for free delivery
                </p>
              )}
            </div>

            <div className="border-t border-card-border pt-4 mb-6">
              <div className="flex justify-between font-body font-semibold text-ink">
                <span>Total</span>
                <span className="font-display text-lg text-espresso">
                  GH₵ {(cartTotal + deliveryFee).toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="btn-primary w-full text-center flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight size={16} />
            </Link>

            <p className="text-xs text-center text-muted font-body mt-4">
              Payment details sent via WhatsApp after order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}