import { useState } from 'react';
import { X, BellRing, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function NotifyModal({ product, onClose }) {
  const { addNotifyRequest } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Your name is required';
    if (!phone.trim()) e.phone = 'Phone number is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    addNotifyRequest(product.id, product.name, name.trim(), phone.trim());
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(26,26,26,0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-ivory rounded-sm shadow-2xl w-full max-w-sm p-8 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-ink transition-colors"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle className="mx-auto mb-4 text-gold" size={44} />
            <h3 className="font-display text-xl font-semibold text-ink mb-2">You're on the list!</h3>
            <p className="text-sm text-muted font-body leading-relaxed">
              We'll contact you on <strong>{phone}</strong> as soon as <em>{product.name}</em> is back in stock.
            </p>
            <button onClick={onClose} className="btn-primary mt-6 w-full">Done</button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-1">
              <BellRing size={16} className="text-gold" />
              <span className="section-eyebrow !mb-0">Notify Me</span>
            </div>
            <h3 className="font-display text-xl font-semibold text-ink mb-1">{product.name}</h3>
            <p className="text-sm text-muted font-body mb-6">
              This item is currently out of stock. Leave your details and we'll let you know when it's available.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input-field"
                  placeholder="e.g. Abena Mensah"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="label">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="input-field"
                  placeholder="e.g. 024 000 0000"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <button type="submit" className="btn-primary w-full mt-2">
                Notify Me When Available
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}