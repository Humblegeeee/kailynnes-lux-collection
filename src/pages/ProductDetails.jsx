import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, BellRing, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import NotifyModal from '../components/NotifyModal';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useStore();
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-32">
        <h2 className="font-display text-2xl text-ink mb-4">Product not found</h2>
        <Link to="/products" className="btn-primary">Browse All Bags</Link>
      </div>
    );
  }

  const isOutOfStock = product.quantityInStock === 0;
  const isLowStock = product.quantityInStock > 0 && product.quantityInStock <= 3;
  const photos = product.photos?.length > 0 ? product.photos : ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80'];

  const inCart = cartItems.find(i => i.id === product.id);
  const maxQty = product.quantityInStock - (inCart?.quantity || 0);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id && p.status === 'active')
    .slice(0, 4);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-body text-muted mb-8">
          <Link to="/" className="hover:text-espresso transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-espresso transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-espresso transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] bg-blush-light rounded-sm overflow-hidden">
              <img
                src={photos[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {isOutOfStock && (
                <div className="absolute top-4 left-4 bg-ink/80 text-white text-xs font-body font-medium px-3 py-1.5 tracking-widest uppercase">
                  Out of Stock
                </div>
              )}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg(i => (i - 1 + photos.length) % photos.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setActiveImg(i => (i + 1) % photos.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>
            {photos.length > 1 && (
              <div className="flex gap-2">
                {photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-sm overflow-hidden border-2 transition-all ${
                      activeImg === i ? 'border-gold' : 'border-transparent'
                    }`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="section-eyebrow">{product.category}</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-3">
              {product.name}
            </h1>
            <p className="font-display text-3xl font-bold text-espresso mb-4">
              GH₵ {product.price.toLocaleString()}
            </p>

            {isLowStock && (
              <p className="text-xs font-body text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-sm mb-4">
                ⚡ Only {product.quantityInStock} left in stock — order soon!
              </p>
            )}

            <div className="w-10 h-0.5 bg-gold mb-5" />

            <p className="text-sm text-muted font-body leading-relaxed mb-8">
              {product.description}
            </p>

            {!isOutOfStock && (
              <div className="flex items-center gap-3 mb-6">
                <label className="label !mb-0">Quantity</label>
                <div className="flex items-center border border-card-border rounded-sm">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-ink hover:bg-stone-50 transition-colors font-body text-lg"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-body font-medium">{qty}</span>
                  <button
                    onClick={() => setQty(q => Math.min(maxQty, q + 1))}
                    disabled={qty >= maxQty}
                    className="w-10 h-10 flex items-center justify-center text-ink hover:bg-stone-50 transition-colors font-body text-lg disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-muted font-body">
                  {product.quantityInStock} available
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {isOutOfStock ? (
                <button
                  onClick={() => setNotifyOpen(true)}
                  className="btn-gold flex-1 flex items-center justify-center gap-2"
                >
                  <BellRing size={16} />
                  Notify Me When Available
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={maxQty <= 0}
                  className={`flex-1 flex items-center justify-center gap-2 font-body font-medium px-6 py-3 rounded-sm transition-all duration-200 ${
                    added ? 'bg-green-600 text-white' : 'btn-primary'
                  }`}
                >
                  <ShoppingBag size={16} />
                  {added ? 'Added to Bag!' : maxQty <= 0 ? 'Cart limit reached' : 'Add to Bag'}
                </button>
              )}

              {!isOutOfStock && (
                <Link to="/cart" className="btn-secondary text-center">
                  View Cart
                </Link>
              )}
            </div>

            {/* Info notes */}
            <div className="mt-8 space-y-2 border-t border-card-border pt-6">
              <p className="text-xs font-body text-muted">
                🚚 <strong className="text-ink">Delivery:</strong> Accra & surrounding areas
              </p>
              <p className="text-xs font-body text-muted">
                💳 <strong className="text-ink">Payment:</strong> MoMo details sent after order via WhatsApp
              </p>
              <p className="text-xs font-body text-muted">
                📦 <strong className="text-ink">Pickup:</strong> Available on request
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="mb-8">
              <p className="section-eyebrow">You May Also Like</p>
              <h2 className="font-display text-2xl font-bold text-ink">More {product.category}</h2>
              <div className="w-10 h-0.5 bg-gold mt-3" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {notifyOpen && (
        <NotifyModal product={product} onClose={() => setNotifyOpen(false)} />
      )}
    </>
  );
}