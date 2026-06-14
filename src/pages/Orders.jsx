import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import AdminLayout from '../components/AdminLayout';
import { StatusBadge } from './AdminDashboard';

export default function Orders() {
  const { orders, updateOrderStatus, ORDER_STATUSES } = useStore();
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('');

  const filtered = filter ? orders.filter(o => o.status === filter) : orders;

  return (
    <AdminLayout>
      <div className="mb-8">
        <p className="text-xs font-body tracking-[0.18em] text-muted uppercase mb-1">Sales</p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">Orders</h1>
        <p className="text-sm text-muted font-body mt-1">{orders.length} total order{orders.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('')}
          className={`px-3 py-1.5 text-xs font-body font-medium rounded-full border transition-all ${
            !filter ? 'bg-espresso text-white border-espresso' : 'border-card-border text-ink hover:border-gold'
          }`}
        >
          All ({orders.length})
        </button>
        {ORDER_STATUSES.map(status => {
          const count = orders.filter(o => o.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 text-xs font-body font-medium rounded-full border transition-all ${
                filter === status ? 'bg-espresso text-white border-espresso' : 'border-card-border text-ink hover:border-gold'
              }`}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="card bg-white p-10 text-center text-muted text-sm font-body">
            No orders found
          </div>
        )}
        {filtered.map(order => (
          <div key={order.id} className="card bg-white overflow-hidden">
            {/* Header row */}
            <button
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  <p className="text-xs font-body text-muted mb-0.5">Order ID</p>
                  <p className="text-sm font-body font-semibold text-ink">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs font-body text-muted mb-0.5">Customer</p>
                  <p className="text-sm font-body font-medium text-ink">{order.customer.name}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-body text-muted mb-0.5">Total</p>
                  <p className="text-sm font-body font-semibold text-espresso">GH₵ {order.total?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-body text-muted mb-0.5">Date</p>
                  <p className="text-xs font-body text-muted">
                    {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              {expanded === order.id ? <ChevronUp size={16} className="text-muted flex-shrink-0" /> : <ChevronDown size={16} className="text-muted flex-shrink-0" />}
            </button>

            {/* Expanded detail */}
            {expanded === order.id && (
              <div className="border-t border-card-border p-4 sm:p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-body">
                  <div>
                    <h4 className="font-medium text-ink mb-2">Customer</h4>
                    <p className="text-muted">{order.customer.name}</p>
                    <p className="text-muted">{order.customer.phone}</p>
                    <p className="text-muted">{order.customer.email}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-ink mb-2">Delivery</h4>
                    <p className="text-muted capitalize">{order.customer.deliveryMethod}</p>
                    {order.customer.address && <p className="text-muted">{order.customer.address}</p>}
                    {order.customer.pickupNote && <p className="text-muted">{order.customer.pickupNote}</p>}
                  </div>
                  {order.customer.orderNote && (
                    <div className="sm:col-span-2">
                      <h4 className="font-medium text-ink mb-1">Order Note</h4>
                      <p className="text-muted">{order.customer.orderNote}</p>
                    </div>
                  )}
                </div>

                {/* Items */}
                <div>
                  <h4 className="text-sm font-body font-medium text-ink mb-3">Items</h4>
                  <div className="space-y-2">
                    {order.items?.map(item => (
                      <div key={item.id} className="flex items-center gap-3 text-sm font-body">
                        <img src={item.photos?.[0]} alt={item.name} className="w-10 h-10 object-cover rounded-sm bg-blush-light" />
                        <div className="flex-1">
                          <p className="font-medium text-ink">{item.name}</p>
                          <p className="text-muted text-xs">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-espresso">GH₵ {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status update */}
                <div>
                  <label className="label">Update Status</label>
                  <select
                    value={order.status}
                    onChange={e => updateOrderStatus(order.id, e.target.value)}
                    className="input-field max-w-xs"
                  >
                    {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}