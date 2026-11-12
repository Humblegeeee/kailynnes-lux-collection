import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, BellRing, Check, Ruler } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/constants';
import NotifyModal from './NotifyModal';
import SmartImage from './SmartImage';

export default function ProductCard({ product }) {
  const { addToCart, quantityInCart } = useCart();
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [altBroken, setAltBroken] = useState(false);

  const isOutOfStock = product.quantityInStock === 0;
  const isLowStock = product.quantityInStock > 0 && product.quantityInStock <= 3;
  const hasSizes = product.sizes?.length > 0;
  const atLimit = !isOutOfStock && quantityInCart(product.id) >= product.quantityInStock;
  const href = `/products/${product.id}`;
  const altPhoto = !altBroken && product.photos?.[1];

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const actionClass =
    'flex w-full items-center justify-center gap-2 bg-ivory/95 backdrop-blur-sm py-3 text-[10px] font-body font-medium uppercase tracking-[0.22em] text-ink shadow-lg transition-colors duration-300 hover:bg-ink hover:text-ivory disabled:hover:bg-ivory/95 disabled:hover:text-ink disabled:opacity-70';

  return (
    <>
      <article className="pcard group relative">
        <div className="pcard-media">
          <Link to={href} className="block h-full" aria-label={product.name}>
            <SmartImage
              src={product.photos?.[0]}
              alt={product.name}
              label={product.category}
              className="pcard-img"
              loading="lazy"
            />
            {altPhoto && (
              <img
                src={altPhoto}
                alt=""
                className="pcard-img-alt"
                loading="lazy"
                onError={() => setAltBroken(true)}
              />
            )}
          </Link>

          {/* Badges */}
          <div className="pointer-events-none absolute top-3 left-3 z-[1] flex flex-col items-start gap-1.5">
            {isOutOfStock && (
              <span className="bg-ink/85 text-ivory text-[9px] font-body font-medium px-2.5 py-1.5 tracking-[0.22em] uppercase">
                Sold Out
              </span>
            )}
            {isLowStock && (
              <span className="bg-gold text-ink text-[9px] font-body font-medium px-2.5 py-1.5 tracking-[0.22em] uppercase">
                Only {product.quantityInStock} left
              </span>
            )}
          </div>

          {/* Quick action — slides up on hover, always visible on touch screens */}
          <div className="pcard-action">
            {isOutOfStock ? (
              <button type="button" onClick={() => setNotifyOpen(true)} className={actionClass}>
                <BellRing size={13} strokeWidth={1.5} />
                Notify Me
              </button>
            ) : hasSizes ? (
              <Link to={href} className={actionClass}>
                <Ruler size={13} strokeWidth={1.5} />
                Select Size
              </Link>
            ) : (
              <button type="button" onClick={handleAddToCart} disabled={atLimit && !added} className={actionClass}>
                {added ? <Check size={13} strokeWidth={2} /> : <ShoppingBag size={13} strokeWidth={1.5} />}
                {added ? 'Added to Bag' : atLimit ? 'All in Your Bag' : 'Add to Bag'}
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <Link to={href} className="block pt-4">
          <p className="text-[9px] font-body tracking-[0.28em] text-gold-deep uppercase mb-1.5">
            {product.category}
          </p>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
            <h3 className="font-display text-[1.35rem] font-medium text-ink leading-tight line-clamp-2 sm:line-clamp-1">
              <span className="pcard-name">{product.name}</span>
            </h3>
            <span className="font-body text-sm text-ink whitespace-nowrap">
              {formatPrice(product.price)}
            </span>
          </div>
          {hasSizes && (
            <p className="mt-1.5 text-[10px] font-body tracking-[0.18em] uppercase text-muted">
              {product.sizes.join(' · ')}
            </p>
          )}
        </Link>
      </article>

      {notifyOpen && (
        <NotifyModal
          product={product}
          onClose={() => setNotifyOpen(false)}
        />
      )}
    </>
  );
}
