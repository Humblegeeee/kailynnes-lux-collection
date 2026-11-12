import { useLocation, Link, Navigate } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { formatPrice } from '../lib/constants';
import SuccessTick from '../components/SuccessTick';

export default function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;

  // Reached directly (bookmark, typed URL) with no order to confirm.
  if (!order) return <Navigate to="/" replace />;

  const firstName = order.customer?.name?.trim().split(/\s+/)[0];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="bg-white border border-card-border shadow-card p-8 sm:p-14">
        <SuccessTick size={76} className="mx-auto mb-7" />

        <p className="fade-rise section-eyebrow" style={{ '--d': '700ms' }}>Order Confirmed</p>
        <h1 className="font-display text-5xl sm:text-6xl font-medium text-ink mb-4 leading-[1.02]">
          <span className="line-mask">
            <span className="line-rise" style={{ '--d': '800ms' }}>
              Thank you{firstName ? <>, <span className="italic">{firstName}</span></> : ''}
            </span>
          </span>
        </h1>

        <div className="fade-rise" style={{ '--d': '1100ms' }}>
          <p className="text-[10px] font-body text-muted mb-2 tracking-[0.28em] uppercase">
            Order ID: {order.id}
          </p>

          <div className="gold-rule my-7" aria-hidden="true">✦</div>

          <div className="bg-blush-light border border-blush p-5 mb-8 text-left">
            <div className="flex gap-3 items-start">
              <MessageCircle size={18} strokeWidth={1.5} className="text-gold-deep flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-body font-medium text-ink mb-1">
                  What happens next?
                </p>
                <p className="text-sm text-muted font-body leading-relaxed">
                  Your order has been received. The seller will contact you on{' '}
                  <strong className="text-ink font-medium">WhatsApp</strong> at{' '}
                  <strong className="text-ink font-medium">{order.customer?.phone || 'your number'}</strong>{' '}
                  with MoMo payment details. Please keep your phone handy!
                </p>
              </div>
            </div>
          </div>

          <div className="text-left border border-card-border p-5 mb-9 text-sm font-body space-y-2">
            <h3 className="font-display text-2xl font-medium text-ink mb-3">Order Details</h3>
            {order.items?.map(item => (
              <div key={item.lineId || item.id} className="flex justify-between gap-4 text-muted">
                <span>
                  {item.name}{item.size ? ` (${item.size})` : ''} × {item.quantity}
                </span>
                <span className="whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-card-border pt-3 mt-3 flex justify-between font-medium text-ink">
              <span>Total (incl. delivery)</span>
              <span>{formatPrice(order.total)}</span>
            </div>
            <div className="text-muted pt-1">
              <span className="capitalize">{order.customer?.deliveryMethod}</span>
              {order.customer?.deliveryMethod === 'delivery' && order.customer?.address && ` · ${order.customer.address}`}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/products" className="btn-primary">
              Continue Shopping <ArrowRight size={14} className="btn-arrow" />
            </Link>
            <Link to="/" className="btn-secondary">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
