import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, RefreshCw, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const HERO_CATEGORIES = [
  {
    label: 'Corporate Bags',
    desc: 'For the woman who leads',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    to: '/products?category=Corporate+Bags',
  },
  {
    label: 'Girlie Bags',
    desc: 'Express your true self',
    img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    to: '/products?category=Girlie+Bags',
  },
  {
    label: 'Lunch Boxes',
    desc: 'Stylish meals on the go',
    img: 'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=600&q=80',
    to: '/products?category=Lunch+Boxes',
  },
];

const FEATURES = [
  { icon: Truck, label: 'Fast Delivery', desc: 'Accra & nearby areas' },
  { icon: RefreshCw, label: 'Easy Returns', desc: '7-day hassle-free' },
  { icon: Shield, label: 'Secure Payment', desc: 'MoMo & cash options' },
  { icon: Star, label: 'Quality Bags', desc: 'Carefully curated' },
];

export default function Home() {
  const { products } = useStore();
  const featured = products.filter(p => p.status === 'active').slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-stone-900">
        <img
          src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1400&q=80"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-24">
          <p className="section-eyebrow text-gold/90">New Collection 2025</p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] max-w-2xl mb-6">
            Carry Your{' '}
            <span className="hero-title-underline italic">Confidence</span>
            .
          </h1>
          <p className="text-base sm:text-lg text-stone-300 font-body max-w-md leading-relaxed mb-10">
            Elegant bags curated for the modern Ghanaian woman — from boardroom to weekend, we have your perfect carry.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="btn-gold flex items-center gap-2 text-sm">
              Shop the Collection
              <ArrowRight size={16} />
            </Link>
            <Link to="/products?category=Corporate+Bags" className="btn-secondary border-white/40 text-white hover:bg-white/10 hover:text-white flex items-center gap-2 text-sm">
              Corporate Bags
            </Link>
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="section-eyebrow">Browse by Category</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">Find Your Style</h2>
          <div className="gold-divider" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {HERO_CATEGORIES.map(cat => (
            <Link key={cat.label} to={cat.to} className="group relative overflow-hidden rounded-sm aspect-[3/4] block">
              <img
                src={cat.img}
                alt={cat.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-xl font-bold text-white mb-1">{cat.label}</h3>
                <p className="text-sm text-stone-300 font-body mb-3">{cat.desc}</p>
                <span className="text-xs font-body font-medium text-gold tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                  Shop Now <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-blush-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="section-eyebrow">Handpicked for You</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">Featured Bags</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/products" className="btn-secondary inline-flex items-center gap-2">
              View All Bags
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-y border-card-border bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2 py-3">
                <Icon size={22} className="text-gold" />
                <p className="text-sm font-body font-semibold text-ink">{label}</p>
                <p className="text-xs text-muted font-body">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MoMo banner */}
      <section className="bg-espresso text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="section-eyebrow text-gold/80">How It Works</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Easy, Secure Shopping</h2>
          <div className="gold-divider" />
          <p className="text-stone-300 font-body mt-4 leading-relaxed">
            Browse and add your favourites to cart. Check out as a guest — no account needed.
            Once your order is placed, we'll reach out on <strong className="text-white">WhatsApp</strong> with MoMo payment details.
            Simple, personal, and trusted.
          </p>
          <Link to="/products" className="btn-gold inline-flex items-center gap-2 mt-8">
            Start Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}