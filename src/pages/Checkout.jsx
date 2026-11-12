import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Truck, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { FALLBACK_IMAGE, deliveryFeeFor, formatPrice } from '../lib/constants';
import SmartImage from '../components/SmartImage';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { placeOrder } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    deliveryMethod: 'delivery',
    address: '',
    pickupNote: '',
    orderNote: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Same rule as the cart page and the announcement bar (free over GH₵ 800).
  const deliveryFee = deliveryFeeFor(cartTotal);

  const set = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (form.phone.replace(/\D/g, '').length < 9) e.phone = 'Enter a valid phone number';
    if (!form.email.trim()) e.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.deliveryMethod === 'delivery' && !form.address.trim()) {
      e.address = 'Delivery address is required';
    }
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Bring the first problem into view instead of failing silently off-screen.
      document.getElementById(`checkout-${Object.keys(errs)[0]}`)?.focus();
      return;
    }

    setSubmitting(true);
    const order = placeOrder(form, cartItems, cartTotal + deliveryFee);
    clearCart();
    navigate('/order-success', { state: { order } });
  };

  // After a successful order the cart is cleared while we navigate away,
  // so only show the empty state when no order is being placed.
  if (cartItems.length === 0 && !submitting) {
    return (
      <div className="text-center py-28 px-4">
        <div className="gold-rule mb-6" aria-hidden="true">✦</div>
        <h2 className="font-display text-4xl font-medium text-ink mb-6">Your bag is empty</h2>
        <Link to="/products" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-10">
        <p className="fade-rise section-eyebrow">Almost There</p>
        <h1 className="font-display text-5xl sm:text-6xl font-medium text-ink">
          <span className="line-mask"><span className="line-rise" style={{ '--d': '100ms' }}>Checkout</span></span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact info */}
            <div className="row-in card p-6 sm:p-8" style={{ '--i': 1 }}>
              <h2 className="font-display text-2xl font-medium text-ink mb-5">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Full Name <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    value={form.name}
                    id="checkout-name"
                    onChange={e => set('name', e.target.value)}
                    className="input-field"
                    placeholder="e.g. Abena Mensah"
                  />
                  {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="label">Phone Number <span className="text-red-600">*</span></label>
                  <input
                    type="tel"
                    value={form.phone}
                    id="checkout-phone"
                    onChange={e => set('phone', e.target.value)}
                    className="input-field"
                    placeholder="e.g. 024 000 0000"
                  />
                  {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Email Address <span className="text-red-600">*</span></label>
                  <input
                    type="email"
                    value={form.email}
                    id="checkout-email"
                    onChange={e => set('email', e.target.value)}
                    className="input-field"
                    placeholder="e.g. abena@email.com"
                  />
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Delivery method */}
            <div className="row-in card p-6 sm:p-8" style={{ '--i': 2 }}>
              <h2 className="font-display text-2xl font-medium text-ink mb-5">Delivery Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {[
                  { value: 'delivery', label: 'Home Delivery', icon: Truck, desc: 'Delivered to your door' },
                  { value: 'pickup', label: 'Pickup', icon: MapPin, desc: 'Collect at agreed location' },
                ].map(({ value, label, icon: Icon, desc }) => (
                  <label
                    key={value}
                    className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                      form.deliveryMethod === value
                        ? 'border-gold bg-gold/5'
                        : 'border-card-border hover:border-gold/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value={value}
                      checked={form.deliveryMethod === value}
                      onChange={e => set('deliveryMethod', e.target.value)}
                      className="mt-0.5 accent-gold"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Icon size={14} className="text-gold" />
                        <span className="text-sm font-body font-medium text-ink">{label}</span>
                      </div>
                      <p className="text-xs text-muted font-body mt-0.5">{desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {form.deliveryMethod === 'delivery' ? (
                <div>
                  <label className="label">Delivery Address <span className="text-red-600">*</span></label>
                  <textarea
                    value={form.address}
                    id="checkout-address"
                    onChange={e => set('address', e.target.value)}
                    className="input-field resize-none"
                    rows={3}
                    placeholder="Street name, area, landmark, city"
                  />
                  {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
                </div>
              ) : (
                <div>
                  <label className="label">Pickup Note / Preferred Date (optional)</label>
                  <input
                    type="text"
                    value={form.pickupNote}
                    onChange={e => set('pickupNote', e.target.value)}
                    className="input-field"
                    placeholder="e.g. Saturday afternoon, Accra Mall"
                  />
                </div>
              )}
            </div>

            {/* Order note */}
            <div className="row-in card p-6 sm:p-8" style={{ '--i': 3 }}>
              <h2 className="font-display text-2xl font-medium text-ink mb-2">Order Note</h2>
              <p className="text-xs text-muted font-body mb-4">Optional — any special requests or notes</p>
              <textarea
                value={form.orderNote}
                onChange={e => set('orderNote', e.target.value)}
                className="input-field resize-none"
                rows={3}
                placeholder="e.g. Prefer black, gift wrapping, etc."
              />
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="fade-rise card p-7 sticky top-24" style={{ '--d': '300ms' }}>
              <h2 className="font-display text-3xl font-medium text-ink mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-5">
                {cartItems.map(item => (
                  <div key={item.lineId} className="flex gap-3">
                    <div className="w-12 h-14 flex-shrink-0 overflow-hidden bg-blush-light" style={{ containerType: 'inline-size' }}>
                      <SmartImage
                        src={item.photos?.[0] || FALLBACK_IMAGE}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body font-medium text-ink line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted font-body">
                        Qty: {item.quantity}{item.size ? ` · Size ${item.size}` : ''}
                      </p>
                    </div>
                    <p className="text-sm font-body text-ink whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-card-border pt-4 space-y-2 text-sm font-body mb-5">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-gold-deep font-medium uppercase tracking-[0.14em] text-xs' : ''}>
                    {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
                  </span>
                </div>
              </div>

              <div className="border-t border-card-border pt-5 flex justify-between items-baseline font-body text-ink mb-7">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium">Total</span>
                <span className="font-display text-3xl">
                  {formatPrice(cartTotal + deliveryFee)}
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full"
              >
                {submitting ? 'Placing Order...' : 'Place Order'}
              </button>

              <p className="text-[11px] text-center text-muted font-body mt-3 leading-relaxed">
                By placing an order, you agree to be contacted via WhatsApp for payment details.
              </p>

              <Link
                to="/cart"
                className="flex items-center justify-center gap-1.5 text-xs text-muted hover:text-espresso transition-colors font-body mt-4"
              >
                <ArrowLeft size={12} /> Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}