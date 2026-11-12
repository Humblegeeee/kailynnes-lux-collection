import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FALLBACK_IMAGE, FREE_DELIVERY_THRESHOLD, deliveryFeeFor, formatPrice } from '../lib/constants';
import SmartImage from '../components/SmartImage';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, quantityInCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-28 text-center">
        <ShoppingBag size={44} strokeWidth={1} className="fade-rise mx-auto text-gold mb-7" />
        <h1 className="font-display text-5xl font-medium text-ink mb-3">
          <span className="line-mask"><span className="line-rise" style={{ '--d': '100ms' }}>Your bag is empty</span></span>
        </h1>
        <p className="fade-rise text-sm text-muted font-body font-light mb-9 max-w-sm mx-auto leading-relaxed" style={{ '--d': '300ms' }}>
          You haven't added anything yet. Browse the collection and find your perfect piece.
        </p>
        <div className="fade-rise flex flex-wrap justify-center gap-3" style={{ '--d': '420ms' }}>
          <Link to="/bags" className="btn-primary">Shop Bags</Link>
          <Link to="/clothes" className="btn-secondary">Shop Clothes</Link>
        </div>
      </div>
    );
  }

  const deliveryFee = deliveryFeeFor(cartTotal);
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - cartTotal);
  const progress = Math.min(1, cartTotal / FREE_DELIVERY_THRESHOLD);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-10">
        <p className="fade-rise section-eyebrow">Review Your Selection</p>
        <h1 className="font-display text-5xl sm:text-6xl font-medium text-ink">
          <span className="line-mask"><span className="line-rise" style={{ '--d': '100ms' }}>Your Bag</span></span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="border-t border-card-border">
            {cartItems.map((item, i) => {
              const others = quantityInCart(item.id) - item.quantity;
              const atMax = item.quantity >= item.quantityInStock - others;

              return (
                <div key={item.lineId} className="row-in flex gap-5 py-6 border-b border-card-border" style={{ '--i': i }}>
                  <Link
                    to={`/products/${item.id}`}
                    className="flex-shrink-0 w-24 h-30 sm:w-28 sm:h-36 overflow-hidden bg-blush-light"
                    style={{ containerType: 'inline-size' }}
                  >
                    <SmartImage
                      src={item.photos?.[0] || FALLBACK_IMAGE}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <p className="text-[9px] font-body tracking-[0.28em] text-gold-deep uppercase mb-1">
                      {item.category}
                    </p>
                    <h3 className="font-display font-medium text-ink text-2xl leading-tight mb-1 line-clamp-1">
                      <Link to={`/products/${item.id}`} className="hover:text-gold-deep transition-colors">{item.name}</Link>
                    </h3>
                    <p className="text-sm font-body text-muted mb-auto">
                      {formatPrice(item.price)}
                      {item.size && <span className="ml-3 text-[11px] uppercase tracking-[0.18em]">Size {item.size}</span>}
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-3 mt-4">
                      {/* Qty */}
                      <div className="flex items-center border border-card-border bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-blush-light text-ink font-body text-lg transition-colors"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span className="w-9 text-center text-sm font-body font-medium tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                          disabled={atMax}
                          className="w-9 h-9 flex items-center justify-center hover:bg-blush-light text-ink font-body text-lg transition-colors disabled:opacity-30"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-5">
                        <p className="font-display text-xl text-ink">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.lineId)}
                          className="text-muted hover:text-red-600 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-body text-muted hover:text-ink transition-colors mt-7"
          >
            <ArrowLeft size={13} /> Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="fade-rise bg-white border border-card-border p-7 sticky top-24" style={{ '--d': '250ms' }}>
            <h2 className="font-display text-3xl font-medium text-ink mb-6">Order Summary</h2>

            {/* Free delivery progress */}
            <div className="mb-6">
              <p className="text-xs font-body text-muted mb-2.5">
                {remaining > 0
                  ? <>Add <strong className="text-ink font-medium">{formatPrice(remaining)}</strong> more for free delivery</>
                  : <span className="text-gold-deep font-medium">You qualify for free delivery</span>}
              </p>
              <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} aria-label="Progress to free delivery">
                <div className="progress-fill" style={{ transform: `scaleX(${progress})` }} />
              </div>
            </div>

            <div className="space-y-3 text-sm font-body mb-5">
              <div className="flex justify-between text-muted">
                <span>Subtotal ({cartCount} item{cartCount === 1 ? '' : 's'})</span>
                <span className="text-ink">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Estimated delivery</span>
                <span className={deliveryFee === 0 ? 'text-gold-deep font-medium uppercase tracking-[0.14em] text-xs' : 'text-ink'}>
                  {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
                </span>
              </div>
            </div>

            <div className="border-t border-card-border pt-5 mb-7">
              <div className="flex justify-between items-baseline font-body text-ink">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium">Total</span>
                <span className="font-display text-3xl">
                  {formatPrice(cartTotal + deliveryFee)}
                </span>
              </div>
            </div>

            <Link to="/checkout" className="btn-primary w-full">
              Proceed to Checkout
              <ArrowRight size={14} className="btn-arrow" />
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
