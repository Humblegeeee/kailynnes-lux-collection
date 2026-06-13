import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Truck, MapPin, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

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

  const deliveryFee = cartTotal >= 500 ? 0 : 30;

  const set = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.email.trim()) e.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.deliveryMethod === 'delivery' && !form.address.trim()) {
      e.address = 'Delivery address is required';
    }
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    const order = placeOrder(form, cartItems, cartTotal + deliveryFee);
    clearCart();
    navigate('/order-success', { state: { order } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24">
        <h2 className="font-display text-2xl text-ink mb-4">Your cart is empty</h2>
        <Link to="/products" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="section-eyebrow">Almost There</p>
        <h1 className="font-display text-3xl font-bold text-ink">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact info */}
            <div className="card p-6">
              <h2 className="font-display text-lg font-semibold text-ink mb-5">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Full Name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    className="input-field"
                    placeholder="e.g. Abena Mensah"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="label">Phone Number <span className="text-red-400">*</span></label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    className="input-field"
                    placeholder="e.g. 024 000 0000"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Email Address <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    className="input-field"
                    placeholder="e.g. abena@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Delivery method */}
            <div className="card p-6">
              <h2 className="font-display text-lg font-semibold text-ink mb-5">Delivery Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {[
                  { value: 'delivery', label: 'Home Delivery', icon: Truck, desc: 'Delivered to your door' },
                  { value: 'pickup', label: 'Pickup', icon: MapPin, desc: 'Collect at agreed location' },
                ].map(({ value, label, icon: Icon, desc }) => (
                  <label
                    key={value}
                    className={`flex items-start gap-3 p-4 border rounded-sm cursor-pointer transition-all ${
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
                  <label className="label">Delivery Address <span className="text-red-400">*</span></label>
                  <textarea
                    value={form.address}
                    onChange={e => set('address', e.target.value)}
                    className="input-field resize-none"
                    rows={3}
                    placeholder="Street name, area, landmark, city"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
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
            <div className="card p-6">
              <h2 className="font-display text-lg font-semibold text-ink mb-2">Order Note</h2>
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
            <div className="card p-6 sticky top-24">
              <h2 className="font-display text-xl font-semibold text-ink mb-5">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-5">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.photos?.[0]}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-sm bg-blush-light flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-body font-medium text-ink line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted font-body">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-body font-semibold text-ink whitespace-nowrap">
                      GH₵ {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-card-border pt-4 space-y-2 text-sm font-body mb-5">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span>GH₵ {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `GH₵ ${deliveryFee}`}
                  </span>
                </div>
              </div>

              <div className="border-t border-card-border pt-4 flex justify-between font-body font-semibold text-ink mb-6">
                <span>Total</span>
                <span className="font-display text-xl text-espresso">
                  GH₵ {(cartTotal + deliveryFee).toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full flex items-center justify-center gap-2"
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