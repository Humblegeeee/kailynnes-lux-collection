import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, RefreshCw, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { departmentOf } from '../data/sampleProducts';
import { img } from '../lib/constants';
import useParallax from '../hooks/useParallax';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import Marquee from '../components/Marquee';

const DEPARTMENT_TILES = [
  {
    label: 'Bags',
    kicker: 'The Bag Edit',
    desc: 'Totes, handbags and everyday carriers',
    img: img('1590874103328-eac38a683ce7', 1100),
    to: '/bags',
  },
  {
    label: 'Clothes',
    kicker: 'The Wardrobe',
    desc: 'Dresses, workwear and matching sets',
    img: img('1490481651871-ab68de25d43d', 1100),
    to: '/clothes',
  },
];

const BAG_TILES = [
  {
    label: 'Corporate Bags',
    desc: 'For the woman who leads',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    to: '/bags?category=Corporate+Bags',
  },
  {
    label: 'Girlie Bags',
    desc: 'Express your true self',
    img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    to: '/bags?category=Girlie+Bags',
  },
  {
    label: 'Lunch Boxes',
    desc: 'Stylish meals on the go',
    img: 'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=600&q=80',
    to: '/bags?category=Lunch+Boxes',
  },
];

const FEATURES = [
  { icon: Truck, label: 'Fast Delivery', desc: 'Accra & nearby areas' },
  { icon: RefreshCw, label: 'Easy Returns', desc: '7-day hassle-free' },
  { icon: Shield, label: 'Secure Payment', desc: 'MoMo & cash options' },
  { icon: Star, label: 'Quality Pieces', desc: 'Carefully curated' },
];

const STEPS = [
  { title: 'Choose your pieces', desc: 'Browse the collection and add your favourites to your bag.' },
  { title: 'Check out as a guest', desc: 'No account needed — just your name, number and where to deliver.' },
  { title: 'Pay via MoMo', desc: 'We reach out on WhatsApp with payment details. Simple, personal and trusted.' },
];

const MARQUEE = ["Kailynne's Lux Collection", 'Bags', 'Clothes', 'Curated in Accra', 'New Collection 2026'];

function SectionHeading({ eyebrow, title, light = false }) {
  return (
    <Reveal className="text-center mb-12">
      <p className={`section-eyebrow ${light ? '!text-gold-light' : ''}`}>{eyebrow}</p>
      <h2 className={`font-display text-4xl sm:text-5xl font-medium ${light ? 'text-ivory' : 'text-ink'}`}>{title}</h2>
      <div className="gold-rule mt-5" aria-hidden="true">✦</div>
    </Reveal>
  );
}

export default function Home() {
  const { products } = useStore();
  const active = products.filter(p => p.status === 'active');
  const bags = active.filter(p => departmentOf(p.category) === 'bags').slice(0, 4);
  const clothes = active.filter(p => departmentOf(p.category) === 'clothes').slice(0, 4);

  const heroMedia = useParallax(0.18);
  const bannerMedia = useParallax(0.12);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-7.5rem)] items-end overflow-hidden bg-noir sm:items-center">
        <div ref={heroMedia} className="hero-media">
          <SmartImage
            src={img('1590874103328-eac38a683ce7', 1800)}
            alt=""
            tone="dark"
            className="hero-img"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-noir/90 via-noir/55 to-noir/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-noir/30" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-20 sm:py-28">
          <p className="fade-rise flex items-center gap-4 text-[11px] font-body font-medium uppercase tracking-[0.36em] text-gold-light mb-7" style={{ '--d': '150ms' }}>
            <span className="draw-x block h-px w-12 bg-gold" style={{ '--d': '300ms' }} />
            New Collection 2026
          </p>

          <h1 className="font-display font-medium text-ivory leading-[0.95] text-[3.6rem] sm:text-[5.5rem] lg:text-[7.5rem] max-w-4xl mb-8">
            <span className="line-mask"><span className="line-rise" style={{ '--d': '250ms' }}>Carry Your</span></span>
            <span className="line-mask">
              <span className="line-rise" style={{ '--d': '400ms' }}>
                <span className="gold-text italic pr-[0.08em]">Confidence</span>.
              </span>
            </span>
          </h1>

          <p className="fade-rise text-base sm:text-lg text-stone-300 font-body font-light max-w-md leading-relaxed mb-10" style={{ '--d': '750ms' }}>
            Elegant bags and clothing curated for the modern Ghanaian woman — from boardroom to weekend, we have your perfect look.
          </p>

          <div className="fade-rise flex flex-wrap gap-4" style={{ '--d': '900ms' }}>
            <Link to="/bags" className="btn-gold">
              Shop Bags
              <ArrowRight size={14} className="btn-arrow" />
            </Link>
            <Link to="/clothes" className="btn-ghost-light">
              Shop Clothes
              <ArrowRight size={14} className="btn-arrow" />
            </Link>
          </div>
        </div>

        <div className="fade-rise pointer-events-none absolute bottom-8 right-6 sm:right-10 z-10 hidden sm:flex flex-col items-center gap-4" style={{ '--d': '1300ms' }}>
          <span className="hero-vertical text-[9px] font-body uppercase tracking-[0.4em] text-stone-400">Scroll</span>
          <span className="scroll-cue" />
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-ivory border-b border-card-border py-5">
        <Marquee items={MARQUEE} className="font-display italic text-2xl sm:text-3xl text-ink/80" />
      </div>

      {/* Departments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        <SectionHeading eyebrow="Two Collections" title="One Signature Style" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8">
          {DEPARTMENT_TILES.map((tile, i) => (
            <Reveal key={tile.label} variant="mask" delay={i * 160} className={i === 1 ? 'md:mt-16' : ''}>
              <Link to={tile.to} className="tile aspect-[4/5] sm:aspect-[5/6]">
                <SmartImage src={tile.img} alt={tile.label} tone="dark" className="tile-img" loading="lazy" />
                <div className="tile-shade" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                  <p className="text-[10px] font-body uppercase tracking-[0.34em] text-gold-light mb-3">{tile.kicker}</p>
                  <h3 className="font-display text-5xl sm:text-6xl font-medium text-ivory leading-none mb-3">{tile.label}</h3>
                  <p className="text-sm text-stone-300 font-body font-light mb-6">{tile.desc}</p>
                  <span className="tile-cta text-[10px] font-body font-medium uppercase tracking-[0.26em] text-gold-light">
                    Discover <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured bags */}
      {bags.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
          <SectionHeading eyebrow="Handpicked for You" title="Featured Bags" />
          <div className={`grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 ${bags.length === 3 ? 'sm:grid-cols-3' : 'lg:grid-cols-4'}`}>
            {bags.map((product, i) => (
              <Reveal key={product.id} delay={i * 110}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-12">
            <Link to="/bags" className="btn-secondary">
              View All Bags
              <ArrowRight size={14} className="btn-arrow" />
            </Link>
          </Reveal>
        </section>
      )}

      {/* Bag categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
        <SectionHeading eyebrow="Browse by Category" title="Find Your Style" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {BAG_TILES.map((cat, i) => (
            <Reveal key={cat.label} variant="mask" delay={i * 130}>
              <Link to={cat.to} className="tile aspect-[3/4]">
                <SmartImage src={cat.img} alt={cat.label} tone="dark" className="tile-img" loading="lazy" />
                <div className="tile-shade" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-3xl font-medium text-ivory mb-1">{cat.label}</h3>
                  <p className="text-sm text-stone-300 font-body font-light mb-4">{cat.desc}</p>
                  <span className="tile-cta text-[10px] font-body font-medium text-gold-light tracking-[0.26em] uppercase">
                    Shop Now <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Clothes editorial banner */}
      <section className="relative mt-24 sm:mt-32 overflow-hidden bg-noir">
        <div ref={bannerMedia} className="hero-media">
          <SmartImage src={img('1441984904996-e0b6ba687e04', 1800)} alt="" tone="dark" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-noir/65" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 py-28 sm:py-40 text-center">
          <Reveal>
            <p className="section-eyebrow !text-gold-light">New — The Wardrobe</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-display text-5xl sm:text-7xl font-medium text-ivory leading-[1.02] mb-6">
              Now Dressing You, <span className="gold-text italic">Head to Toe</span>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="text-stone-300 font-body font-light leading-relaxed max-w-lg mx-auto mb-10">
              Dresses, tailored workwear and matching sets — chosen with the same eye as our bags, and made to be worn together.
            </p>
            <Link to="/clothes" className="btn-gold">
              Explore Clothes
              <ArrowRight size={14} className="btn-arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Featured clothes */}
      {clothes.length > 0 && (
        <section className="bg-blush-light py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Just In" title="Featured Clothes" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
              {clothes.map((product, i) => (
                <Reveal key={product.id} delay={i * 110}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
            <Reveal className="text-center mt-12">
              <Link to="/clothes" className="btn-secondary">
                View All Clothes
                <ArrowRight size={14} className="btn-arrow" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Features strip */}
      <section className="border-y border-card-border bg-ivory py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:divide-x md:divide-card-border">
            {FEATURES.map(({ icon: Icon, label, desc }, i) => (
              <Reveal key={label} delay={i * 100} className="flex flex-col items-center text-center gap-2.5 px-2">
                <Icon size={22} strokeWidth={1.25} className="text-gold-deep mb-1" />
                <p className="text-[11px] font-body font-medium uppercase tracking-[0.2em] text-ink">{label}</p>
                <p className="text-sm text-muted font-body font-light">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-espresso-dark text-ivory py-24 sm:py-28 -mb-24">
        <div className="max-w-5xl mx-auto px-5">
          <SectionHeading eyebrow="How It Works" title="Easy, Secure Shopping" light />
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <Reveal variant="line" className="steps-line hidden md:block" />
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 160} className="relative text-center">
                <span className="relative z-[1] mx-auto mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-gold bg-espresso-dark font-display italic text-xl text-gold-light">
                  {i + 1}
                </span>
                <h3 className="font-display text-2xl font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-stone-400 font-body font-light leading-relaxed max-w-[16rem] mx-auto">{step.desc}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-14">
            <Link to="/products" className="btn-gold">
              Start Shopping
              <ArrowRight size={14} className="btn-arrow" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
