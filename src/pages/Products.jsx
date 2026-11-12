import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import useParallax from '../hooks/useParallax';
import { CATEGORIES, DEPARTMENTS, departmentOf } from '../data/sampleProducts';
import { img } from '../lib/constants';

const PAGE_COPY = {
  all: {
    eyebrow: 'Our Collection',
    title: 'Shop All',
    blurb: 'Every bag and every piece of clothing, in one place.',
    image: img('1603400521630-9f2de124b33b', 1800),
    noun: 'pieces',
    placeholder: 'Search bags and clothes…',
  },
  bags: {
    eyebrow: 'The Bag Edit',
    title: 'Bags',
    blurb: 'From the boardroom to the weekend — find your perfect carry.',
    image: img('1590874103328-eac38a683ce7', 1800),
    noun: 'bags',
    placeholder: 'Search bags…',
  },
  clothes: {
    eyebrow: 'The Wardrobe',
    title: 'Clothes',
    blurb: 'Dresses, tailored workwear and matching sets, chosen to be worn with our bags.',
    image: img('1490481651871-ab68de25d43d', 1800),
    noun: 'pieces',
    placeholder: 'Search clothes…',
  },
};

export default function Products({ department }) {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const bannerMedia = useParallax(0.14);

  const copy = PAGE_COPY[department || 'all'];
  const categories = department ? DEPARTMENTS[department].categories : CATEGORIES;

  // The URL is the single source of truth for filters.
  const search = searchParams.get('search') || '';
  const rawCategory = searchParams.get('category') || '';
  const category = categories.includes(rawCategory) ? rawCategory : '';

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    // Replace so typing in the search box doesn't flood the back button.
    setSearchParams(params, { replace: true });
  };

  const clearFilters = () => setSearchParams({}, { replace: true });

  const query = search.trim().toLowerCase();
  const filtered = products
    .filter(p => p.status === 'active')
    .filter(p => !department || departmentOf(p.category) === department)
    .filter(p => !category || p.category === category)
    .filter(p => !query
      || p.name.toLowerCase().includes(query)
      || (p.description || '').toLowerCase().includes(query)
      || p.category.toLowerCase().includes(query));

  const pill = (isActive) =>
    `whitespace-nowrap px-5 py-2.5 text-[10px] font-body font-medium uppercase tracking-[0.2em] border transition-all duration-300 ${
      isActive ? 'bg-ink text-ivory border-ink' : 'border-card-border text-ink/80 hover:border-ink hover:text-ink'
    }`;

  return (
    <div>
      {/* Collection banner */}
      <section className="relative overflow-hidden bg-noir">
        <div ref={bannerMedia} className="hero-media">
          <SmartImage src={copy.image} alt="" tone="dark" className="hero-img" fetchPriority="high" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-noir/90 via-noir/60 to-noir/25" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <p className="fade-rise flex items-center gap-4 text-[11px] font-body font-medium uppercase tracking-[0.36em] text-gold-light mb-5" style={{ '--d': '100ms' }}>
            <span className="draw-x block h-px w-12 bg-gold" style={{ '--d': '250ms' }} />
            {copy.eyebrow}
          </p>
          <h1 className="font-display font-medium text-ivory leading-none text-6xl sm:text-8xl mb-5">
            <span className="line-mask">
              <span className="line-rise" style={{ '--d': '200ms' }}>{category || copy.title}</span>
            </span>
          </h1>
          <p className="fade-rise text-stone-300 font-body font-light max-w-md leading-relaxed" style={{ '--d': '550ms' }}>
            {copy.blurb}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Filters */}
        <div className="fade-rise flex flex-col lg:flex-row lg:items-center gap-4 mb-8" style={{ '--d': '650ms' }}>
          <div className="relative lg:w-72 flex-shrink-0">
            <Search size={16} strokeWidth={1.5} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={search}
              onChange={e => updateFilter('search', e.target.value)}
              placeholder={copy.placeholder}
              aria-label="Search products"
              className="input-field pl-10"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
            <button type="button" onClick={() => updateFilter('category', '')} className={pill(!category)}>
              All
            </button>
            {categories.map(cat => (
              <button key={cat} type="button" onClick={() => updateFilter('category', cat)} className={pill(category === cat)}>
                {cat}
              </button>
            ))}
          </div>

          <p className="lg:ml-auto text-[11px] font-body uppercase tracking-[0.2em] text-muted whitespace-nowrap">
            {filtered.length} {filtered.length === 1 ? copy.noun.replace(/s$/, '') : copy.noun}
          </p>
        </div>

        {/* Active filters */}
        {(search || category) && (
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-body">Filters</span>
            {category && (
              <span className="flex items-center gap-1.5 text-xs font-body bg-blush text-ink px-3 py-1.5">
                {category}
                <button type="button" onClick={() => updateFilter('category', '')} aria-label={`Remove ${category} filter`}>
                  <X size={11} />
                </button>
              </span>
            )}
            {search && (
              <span className="flex items-center gap-1.5 text-xs font-body bg-blush text-ink px-3 py-1.5">
                “{search}”
                <button type="button" onClick={() => updateFilter('search', '')} aria-label="Clear search">
                  <X size={11} />
                </button>
              </span>
            )}
            <button type="button" onClick={clearFilters} className="text-xs text-muted hover:text-ink underline underline-offset-4 font-body ml-1">
              Clear all
            </button>
          </div>
        )}

        {/* Grid — re-keyed so a new filter replays the staggered entrance */}
        {filtered.length > 0 ? (
          <div key={`${department}|${category}`} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6">
            {filtered.map((product, i) => (
              <Reveal key={product.id} delay={(i % 4) * 100}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="gold-rule mb-6" aria-hidden="true">✦</div>
            <h3 className="font-display text-3xl font-medium text-ink mb-2">Nothing found</h3>
            <p className="text-sm text-muted font-body">Try adjusting your search or filters.</p>
            {(search || category) && (
              <button type="button" onClick={clearFilters} className="btn-secondary mt-8">
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
