import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../data/sampleProducts';

export default function Products() {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [showFilters, setShowFilters] = useState(false);

  // Keep params in sync
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCategory(searchParams.get('category') || '');
  }, [searchParams]);

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setSearchParams({});
  };

  const filtered = products
    .filter(p => p.status === 'active')
    .filter(p => !category || p.category === category)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase())
      || p.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="section-eyebrow">Our Collection</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink">
          {category || 'All Bags'}
        </h1>
        <p className="text-sm text-muted font-body mt-1">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              updateFilter('search', e.target.value);
            }}
            placeholder="Search bags..."
            className="input-field pl-9"
          />
        </div>

        {/* Category filter - desktop: pills, mobile: dropdown */}
        <div className="hidden sm:flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter('category', '')}
            className={`px-4 py-2 text-xs font-body font-medium rounded-sm border transition-all ${
              !category ? 'bg-espresso text-white border-espresso' : 'border-card-border text-ink hover:border-gold'
            }`}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => updateFilter('category', cat)}
              className={`px-4 py-2 text-xs font-body font-medium rounded-sm border transition-all ${
                category === cat ? 'bg-espresso text-white border-espresso' : 'border-card-border text-ink hover:border-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile: dropdown */}
        <select
          value={category}
          onChange={e => updateFilter('category', e.target.value)}
          className="input-field sm:hidden"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Active filters badge */}
      {(search || category) && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-xs text-muted font-body">Filters:</span>
          {category && (
            <span className="flex items-center gap-1 text-xs font-body bg-blush text-espresso px-3 py-1 rounded-full">
              {category}
              <button onClick={() => updateFilter('category', '')}><X size={10} /></button>
            </span>
          )}
          {search && (
            <span className="flex items-center gap-1 text-xs font-body bg-blush text-espresso px-3 py-1 rounded-full">
              "{search}"
              <button onClick={() => updateFilter('search', '')}><X size={10} /></button>
            </span>
          )}
          <button onClick={clearFilters} className="text-xs text-muted underline font-body">
            Clear all
          </button>
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="text-5xl mb-4">🛍️</div>
          <h3 className="font-display text-xl font-semibold text-ink mb-2">No bags found</h3>
          <p className="text-sm text-muted font-body">Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="btn-secondary mt-6">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}