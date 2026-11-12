import { Link } from 'react-router-dom';
import { Package, ShoppingBag, AlertTriangle, XCircle, Bell, TrendingUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import AdminLayout from '../components/AdminLayout';
import SmartImage from '../components/SmartImage';

export default function AdminDashboard() {
  const { products, orders, notifyRequests } = useStore();

  const activeProducts = products.filter(p => p.status === 'active');
  const lowStock = products.filter(p => p.quantityInStock > 0 && p.quantityInStock <= 3);
  const outOfStock = products.filter(p => p.quantityInStock === 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending');

  const stats = [
    {
      label: 'Total Products',
      value: activeProducts.length,
      icon: Package,
      color: 'text-gold',
      bg: 'bg-gold/10',
      to: '/admin/products',
    },
    {
      label: 'Total Orders',
      value: orders.length,
      icon: ShoppingBag,
      color: 'text-espresso',
      bg: 'bg-espresso/10',
      to: '/admin/orders',
    },
    {
      label: 'Low Stock Items',
      value: lowStock.length,
      icon: AlertTriangle,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      to: '/admin/products',
    },
    {
      label: 'Out of Stock',
      value: outOfStock.length,
      icon: XCircle,
      color: 'text-red-500',
      bg: 'bg-red-50',
      to: '/admin/products',
    },
    {
      label: 'Notify Requests',
      value: notifyRequests.length,
      icon: Bell,
      color: 'text-gold-deep',
      bg: 'bg-gold/10',
      to: '/admin/notify-requests',
    },
    {
      label: 'Pending Orders',
      value: pendingOrders.length,
      icon: TrendingUp,
      color: 'text-ink',
      bg: 'bg-ink/5',
      to: '/admin/orders',
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <p className="text-xs font-body tracking-[0.18em] text-muted uppercase mb-1">Welcome Back</p>
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-ink">Dashboard</h1>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color, bg, to }) => (
          <Link key={label} to={to} className="card bg-white p-5 hover:shadow-card-hover transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className={`${bg} ${color} p-2`}>
                <Icon size={18} />
              </div>
              <span className="font-display text-4xl font-medium text-ink">{value}</span>
            </div>
            <p className="text-xs font-body text-muted">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="card bg-white p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl font-medium text-ink">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs font-body text-gold-deep hover:underline">View all</Link>
          </div>
          {orders.length === 0 ? (
            <p className="text-sm text-muted font-body py-4">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center justify-between text-sm border-b border-stone-50 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-body font-medium text-ink">{order.id}</p>
                    <p className="text-xs text-muted font-body">{order.customer.name} · GH₵ {order.total?.toLocaleString()}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low stock */}
        <div className="card bg-white p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl font-medium text-ink">Stock Alerts</h2>
            <Link to="/admin/products" className="text-xs font-body text-gold-deep hover:underline">Manage</Link>
          </div>
          {lowStock.length === 0 && outOfStock.length === 0 ? (
            <p className="text-sm text-muted font-body py-4">All products are well stocked.</p>
          ) : (
            <div className="space-y-3">
              {[...outOfStock, ...lowStock].slice(0, 6).map(product => (
                <div key={product.id} className="flex items-center justify-between text-sm border-b border-stone-50 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <SmartImage
                      src={product.photos?.[0]}
                      alt={product.name}
                      className="w-8 h-8 object-cover bg-blush-light"
                    />
                    <div>
                      <p className="font-body font-medium text-ink line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted font-body">{product.category}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-body font-medium px-2 py-1 rounded-full ${
                    product.quantityInStock === 0
                      ? 'bg-red-100 text-red-600'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {product.quantityInStock === 0 ? 'Out' : `${product.quantityInStock} left`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export function StatusBadge({ status }) {
  const map = {
    'Pending': 'bg-stone-100 text-stone-600',
    'Payment Details Sent': 'bg-blue-100 text-blue-700',
    'Paid': 'bg-emerald-100 text-emerald-700',
    'Preparing': 'bg-yellow-100 text-yellow-700',
    'Out for Delivery': 'bg-orange-100 text-orange-700',
    'Delivered': 'bg-green-100 text-green-700',
    'Picked Up': 'bg-teal-100 text-teal-700',
    'Cancelled': 'bg-red-100 text-red-600',
  };
  return (
    <span className={`text-[10px] font-body font-medium px-2 py-1 rounded-full tracking-wide whitespace-nowrap ${map[status] || 'bg-stone-100 text-stone-600'}`}>
      {status}
    </span>
  );
}