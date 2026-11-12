import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, BellRing } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import SuccessTick from './SuccessTick';

export default function NotifyModal({ product, onClose }) {
  const { addNotifyRequest } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Close on Escape and keep the page behind from scrolling.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Your name is required';
    if (!phone.trim()) e.phone = 'Phone number is required';
    else if (phone.replace(/\D/g, '').length < 9) e.phone = 'Enter a valid phone number';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    addNotifyRequest(product.id, product.name, name.trim(), phone.trim());
    setSubmitted(true);
  };

  return createPortal(
    <div
      className="modal-backdrop fixed inset-0 z-[120] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="modal-panel bg-ivory shadow-2xl w-full max-w-sm p-8 relative border border-gold/30"
        role="dialog"
        aria-modal="true"
        aria-label={`Notify me about ${product.name}`}
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-ink transition-colors"
          aria-label="Close"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <SuccessTick size={64} className="mx-auto mb-5" />
            <h3 className="font-display text-3xl font-medium text-ink mb-2">You're on the list</h3>
            <p className="text-sm text-muted font-body leading-relaxed">
              We'll contact you on <strong className="text-ink">{phone}</strong> as soon as <em>{product.name}</em> is back in stock.
            </p>
            <button type="button" onClick={onClose} className="btn-primary mt-7 w-full">Done</button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <BellRing size={14} strokeWidth={1.5} className="text-gold-deep" />
              <span className="section-eyebrow !mb-0">Notify Me</span>
            </div>
            <h3 className="font-display text-3xl font-medium text-ink mb-2 leading-tight">{product.name}</h3>
            <p className="text-sm text-muted font-body mb-6 leading-relaxed">
              This piece is currently out of stock. Leave your details and we'll let you know when it's available.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="label" htmlFor="notify-name">Your Name</label>
                <input
                  id="notify-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input-field"
                  placeholder="e.g. Abena Mensah"
                  autoFocus
                />
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="label" htmlFor="notify-phone">Phone Number</label>
                <input
                  id="notify-phone"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="input-field"
                  placeholder="e.g. 024 000 0000"
                />
                {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
              </div>
              <button type="submit" className="btn-primary w-full mt-2">
                Notify Me When Available
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
