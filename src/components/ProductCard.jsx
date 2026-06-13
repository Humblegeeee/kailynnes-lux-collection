import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, BellRing, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import NotifyModal from './NotifyModal';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.quantityInStock === 0;
  const isLowStock = product.quantityInStock > 0 && product.quantityInStock <= 3;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <div className="product-card-wrap group relative">
        <Link to={`/products/${product.id}`} className="block">
          <div className="card overflow-hidden">
            {/* Image */}
            <div className="relative overflow-hidden bg-blush-light aspect-[4/5]">
              <img
                src={product.photos?.[0] || 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80'}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {isOutOfStock && (
                  <span className="bg-ink/80 text-white text-[10px] font-body font-medium px-2.5 py-1 tracking-widest uppercase">
                    Out of Stock
                  </span>
                )}
                {isLowStock && (
                  <span className="bg-gold text-white text-[10px] font-body font-medium px-2.5 py-1 tracking-widest uppercase">
                    Only {product.quantityInStock} left
                  </span>
                )}
              </div>

              {/* Quick view overlay */}
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                <span className="flex items-center gap-1.5 bg-white text-ink text-xs font-body font-medium px-4 py-2 tracking-wide">
                  <Eye size={13} />
                  View Details
                </span>
              </div>

              {/* Gold corner accent */}
              <div className="gold-corner absolute top-0 right-0 w-0 h-0
                border-l-[28px] border-l-transparent
                border-t-[28px] border-t-gold/60">
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="text-[10px] font-body tracking-[0.18em] text-gold uppercase mb-1">
                {product.category}
              </p>
              <h3 className="font-display text-base font-semibold text-ink leading-snug mb-1.5 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-muted font-body line-clamp-2 mb-3 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold text-espresso">
                  GH₵ {product.price.toLocaleString()}
                </span>

                {isOutOfStock ? (
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setNotifyOpen(true); }}
                    className="flex items-center gap-1.5 text-xs font-body font-medium text-gold border border-gold px-3 py-2 hover:bg-gold hover:text-white transition-all duration-200 rounded-sm"
                  >
                    <BellRing size={13} />
                    Notify Me
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className={`flex items-center gap-1.5 text-xs font-body font-medium px-3 py-2 rounded-sm transition-all duration-200 ${
                      added
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-espresso text-white hover:bg-espresso-dark'
                    }`}
                  >
                    <ShoppingBag size={13} />
                    {added ? 'Added!' : 'Add to Bag'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>

      {notifyOpen && (
        <NotifyModal
          product={product}
          onClose={() => setNotifyOpen(false)}
        />
      )}
    </>
  );
}