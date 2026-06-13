import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react';

export default function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="card p-10 sm:p-14">
        <CheckCircle size={56} className="mx-auto text-gold mb-6" />

        <p className="section-eyebrow">Order Confirmed</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-3">
          Thank you, {order?.customer?.name?.split(' ')[0] || 'dear'}!
        </h1>

        {order && (
          <p className="text-xs font-body text-muted mb-2 tracking-widest uppercase">
            Order ID: {order.id}
          </p>
        )}

        <div className="w-10 h-0.5 bg-gold mx-auto my-5" />

        <div className="bg-blush-light border border-blush rounded-sm p-5 mb-8 text-left">
          <div className="flex gap-3 items-start">
            <MessageCircle size={18} className="text-espresso flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-body font-semibold text-ink mb-1">
                What happens next?
              </p>
              <p className="text-sm text-muted font-body leading-relaxed">
                Your order has been received. The seller will contact you on{' '}
                <strong className="text-ink">WhatsApp</strong> at{' '}
                <strong className="text-ink">{order?.customer?.phone || 'your number'}</strong>{' '}
                with MoMo payment details. Please keep your phone handy!
              </p>
            </div>
          </div>
        </div>

        {order && (
          <div className="text-left border border-card-border rounded-sm p-5 mb-8 text-sm font-body space-y-2">
            <h3 className="font-display text-base font-semibold text-ink mb-3">Order Details</h3>
            {order.items?.map(item => (
              <div key={item.id} className="flex justify-between text-muted">
                <span>{item.name} × {item.quantity}</span>
                <span>GH₵ {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t border-card-border pt-2 mt-2 flex justify-between font-semibold text-ink">
              <span>Total</span>
              <span>GH₵ {order.total?.toLocaleString()}</span>
            </div>
            <div className="text-muted pt-1">
              <span className="capitalize">{order.customer?.deliveryMethod}</span>
              {order.customer?.address && ` · ${order.customer.address}`}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/products" className="btn-primary flex items-center justify-center gap-2">
            Continue Shopping <ArrowRight size={16} />
          </Link>
          <Link to="/" className="btn-secondary text-center">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}