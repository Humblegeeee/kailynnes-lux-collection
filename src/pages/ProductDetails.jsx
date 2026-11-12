import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, BellRing, ChevronLeft, ChevronRight, Check, Truck, MessageCircle, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { DEPARTMENTS, departmentOf } from '../data/sampleProducts';
import { FALLBACK_IMAGE, formatPrice } from '../lib/constants';
import NotifyModal from '../components/NotifyModal';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';

function ProductView({ product }) {
  const { products } = useStore();
  const { addToCart, quantityInCart } = useCart();

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const department = DEPARTMENTS[departmentOf(product.category)];
  const sizes = product.sizes || [];
  const isOutOfStock = product.quantityInStock === 0;
  const isLowStock = product.quantityInStock > 0 && product.quantityInStock <= 3;
  const photos = product.photos?.length > 0 ? product.photos : [FALLBACK_IMAGE];

  const maxQty = Math.max(0, product.quantityInStock - quantityInCart(product.id));
  const shownQty = Math.max(1, Math.min(qty, maxQty || 1));

  const handleAddToCart = () => {
    if (sizes.length > 0 && !size) {
      setSizeError(true);
      return;
    }
    addToCart(product, shownQty, size);
    setQty(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const trackZoom = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--zx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty('--zy', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id && p.status === 'active')
    .slice(0, 4);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Breadcrumb */}
        <nav className="fade-rise flex flex-wrap items-center gap-2 text-[10px] font-body uppercase tracking-[0.2em] text-muted mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink transition-colors">Home</Link>
          <span className="text-gold">/</span>
          <Link to={department.path} className="hover:text-ink transition-colors">{department.label}</Link>
          <span className="text-gold">/</span>
          <Link to={`${department.path}?category=${encodeURIComponent(product.category)}`} className="hover:text-ink transition-colors">
            {product.category}
          </Link>
          <span className="text-gold">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="fade-rise space-y-4" style={{ '--d': '100ms' }}>
            <div
              className="zoom-frame relative aspect-[4/5] bg-blush-light overflow-hidden"
              style={{ containerType: 'inline-size' }}
              onMouseMove={trackZoom}
            >
              <div key={activeImg} className="swap-in h-full">
                <SmartImage
                  src={photos[activeImg]}
                  alt={product.name}
                  label={product.category}
                  className="zoom-img w-full h-full object-cover"
                />
              </div>
              {isOutOfStock && (
                <div className="absolute top-4 left-4 bg-ink/85 text-ivory text-[10px] font-body font-medium px-3 py-1.5 tracking-[0.22em] uppercase">
                  Sold Out
                </div>
              )}
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveImg(i => (i - 1 + photos.length) % photos.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-ivory/85 hover:bg-ivory p-2.5 shadow transition-colors"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={16} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImg(i => (i + 1) % photos.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-ivory/85 hover:bg-ivory p-2.5 shadow transition-colors"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={16} strokeWidth={1.5} />
                  </button>
                </>
              )}
            </div>
            {photos.length > 1 && (
              <div className="flex gap-2.5">
                {photos.map((photo, i) => (
                  <button
                    type="button"
                    key={photo + i}
                    onClick={() => setActiveImg(i)}
                    aria-label={`Photo ${i + 1}`}
                    aria-current={activeImg === i}
                    className={`w-16 h-20 overflow-hidden border transition-all duration-300 ${
                      activeImg === i ? 'border-gold opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    style={{ containerType: 'inline-size' }}
                  >
                    <SmartImage src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col lg:sticky lg:top-28 lg:self-start">
            <p className="fade-rise section-eyebrow" style={{ '--d': '200ms' }}>{product.category}</p>
            <h1 className="font-display text-5xl sm:text-6xl font-medium text-ink leading-[1.02] mb-5">
              <span className="line-mask"><span className="line-rise" style={{ '--d': '250ms' }}>{product.name}</span></span>
            </h1>
            <p className="fade-rise font-display text-3xl text-ink mb-5" style={{ '--d': '400ms' }}>
              {formatPrice(product.price)}
            </p>

            <div className="draw-x w-full h-px bg-card-border mb-6" style={{ '--d': '450ms' }} />

            <div className="fade-rise" style={{ '--d': '520ms' }}>
              {isLowStock && (
                <p className="inline-flex items-center gap-2 text-[11px] font-body uppercase tracking-[0.16em] text-gold-deep border border-gold/40 bg-gold/5 px-3 py-2 mb-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                  Only {product.quantityInStock} left — order soon
                </p>
              )}

              <p className="text-[15px] text-muted font-body font-light leading-relaxed mb-8 max-w-prose">
                {product.description}
              </p>

              {sizes.length > 0 && (
                <div className="mb-7">
                  <div className="flex items-baseline justify-between mb-2.5">
                    <span className="label !mb-0">Size{size ? ` — ${size}` : ''}</span>
                    {sizeError && !size && (
                      <span className="text-xs text-red-600 font-body" role="alert">Please choose a size</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(s => (
                      <button
                        key={s}
                        type="button"
                        className="size-chip"
                        aria-pressed={size === s}
                        disabled={isOutOfStock}
                        onClick={() => { setSize(s); setSizeError(false); }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!isOutOfStock && (
                <div className="flex items-center gap-4 mb-7">
                  <span className="label !mb-0">Quantity</span>
                  <div className="flex items-center border border-card-border bg-white">
                    <button
                      type="button"
                      onClick={() => setQty(Math.max(1, shownQty - 1))}
                      disabled={shownQty <= 1}
                      className="w-11 h-11 flex items-center justify-center text-ink hover:bg-blush-light transition-colors font-body text-lg disabled:opacity-30"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-body font-medium tabular-nums" aria-live="polite">{shownQty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(Math.min(maxQty, shownQty + 1))}
                      disabled={shownQty >= maxQty}
                      className="w-11 h-11 flex items-center justify-center text-ink hover:bg-blush-light transition-colors font-body text-lg disabled:opacity-30"
                      aria-label="Increase quantity"
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
                  <button type="button" onClick={() => setNotifyOpen(true)} className="btn-gold flex-1">
                    <BellRing size={15} strokeWidth={1.5} />
                    Notify Me When Available
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={maxQty <= 0 && !added}
                    className={`flex-1 ${added ? 'btn-gold' : 'btn-primary'}`}
                  >
                    {added ? <Check size={15} strokeWidth={2} /> : <ShoppingBag size={15} strokeWidth={1.5} />}
                    {added ? 'Added to Bag' : maxQty <= 0 ? 'All Available Stock Is in Your Bag' : 'Add to Bag'}
                  </button>
                )}

                {!isOutOfStock && (
                  <Link to="/cart" className="btn-secondary">
                    View Bag
                  </Link>
                )}
              </div>

              {/* Info notes */}
              <ul className="mt-9 space-y-3 border-t border-card-border pt-7 text-sm font-body text-muted">
                <li className="flex items-start gap-3">
                  <Truck size={16} strokeWidth={1.5} className="text-gold-deep mt-0.5 flex-shrink-0" />
                  <span><strong className="text-ink font-medium">Delivery:</strong> Accra &amp; nearby areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle size={16} strokeWidth={1.5} className="text-gold-deep mt-0.5 flex-shrink-0" />
                  <span><strong className="text-ink font-medium">Payment:</strong> MoMo details sent via WhatsApp after you order</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} strokeWidth={1.5} className="text-gold-deep mt-0.5 flex-shrink-0" />
                  <span><strong className="text-ink font-medium">Pickup:</strong> Available on request</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24 sm:mt-32">
            <Reveal className="mb-10">
              <p className="section-eyebrow">You May Also Like</p>
              <h2 className="font-display text-4xl font-medium text-ink">More {product.category}</h2>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 110}>
                  <ProductCard product={p} />
                </Reveal>
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

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useStore();
  const product = products.find(p => p.id === id && p.status === 'active');

  if (!product) {
    return (
      <div className="text-center py-32 px-4">
        <div className="gold-rule mb-6" aria-hidden="true">✦</div>
        <h2 className="font-display text-4xl font-medium text-ink mb-3">Product not found</h2>
        <p className="text-sm text-muted font-body mb-8">This piece may have been removed or is no longer available.</p>
        <Link to="/products" className="btn-primary">Browse the Collection</Link>
      </div>
    );
  }

  // Keyed by id so photo, quantity and size reset when moving between products.
  return <ProductView key={product.id} product={product} />;
}
