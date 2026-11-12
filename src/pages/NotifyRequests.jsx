import { Bell, Phone, Package, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import AdminLayout from '../components/AdminLayout';
import SmartImage from '../components/SmartImage';

export default function NotifyRequests() {
  const { notifyRequests, products } = useStore();

  // Group by product
  const grouped = notifyRequests.reduce((acc, req) => {
    if (!acc[req.productId]) acc[req.productId] = [];
    acc[req.productId].push(req);
    return acc;
  }, {});

  return (
    <AdminLayout>
      <div className="mb-8">
        <p className="text-xs font-body tracking-[0.18em] text-muted uppercase mb-1">Waitlist</p>
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-ink">Notify Me Requests</h1>
        <p className="text-sm text-muted font-body mt-1">
          {notifyRequests.length} request{notifyRequests.length !== 1 ? 's' : ''} from customers waiting for restocks
        </p>
      </div>

      {notifyRequests.length === 0 ? (
        <div className="card bg-white p-14 text-center">
          <Bell size={40} className="mx-auto text-stone-200 mb-4" />
          <h3 className="font-display text-2xl font-medium text-ink mb-2">No requests yet</h3>
          <p className="text-sm text-muted font-body">When customers request to be notified for out-of-stock items, they'll appear here.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {Object.entries(grouped).map(([productId, requests]) => {
            const product = products.find(p => p.id === productId);
            const productName = requests[0].productName;
            const isStillOutOfStock = !product || product.quantityInStock === 0;

            return (
              <div key={productId} className="card bg-white overflow-hidden">
                {/* Product header */}
                <div className="p-4 sm:p-5 border-b border-card-border bg-stone-50/50 flex items-center gap-3">
                  {product?.photos?.[0] && (
                    <SmartImage src={product.photos[0]} alt={productName} className="w-12 h-12 object-cover bg-blush-light" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-semibold text-ink">{productName}</h3>
                      <span className={`text-xs font-body px-2 py-0.5 rounded-full font-medium ${
                        isStillOutOfStock ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
                      }`}>
                        {isStillOutOfStock ? 'Still out of stock' : `Back in stock (${product.quantityInStock})`}
                      </span>
                    </div>
                    <p className="text-xs text-muted font-body mt-0.5">
                      {requests.length} customer{requests.length !== 1 ? 's' : ''} waiting
                    </p>
                  </div>
                  {product && (
                    <div className="text-xs font-body text-muted">
                      <Package size={12} className="inline mr-1" />
                      {product.quantityInStock} in stock
                    </div>
                  )}
                </div>

                {/* Requests list */}
                <div className="divide-y divide-stone-50">
                  {requests.map(req => (
                    <div key={req.id} className="p-4 sm:p-5 flex items-center gap-4 text-sm font-body">
                      <div className="flex-1">
                        <p className="font-medium text-ink">{req.name}</p>
                        <div className="flex items-center gap-1.5 text-muted text-xs mt-0.5">
                          <Phone size={11} />
                          {req.phone}
                        </div>
                      </div>
                      <div className="text-right text-xs text-muted">
                        <Clock size={11} className="inline mr-1" />
                        {new Date(req.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}