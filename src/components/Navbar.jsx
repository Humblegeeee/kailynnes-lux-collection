import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND, BRAND_SUB, FREE_DELIVERY_THRESHOLD } from '../lib/constants';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/bags', label: 'Bags' },
  { to: '/clothes', label: 'Clothes' },
  { to: '/products', label: 'Shop All', end: true },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Remember which page each panel was opened on, so it closes itself on navigation.
  const [menuPath, setMenuPath] = useState(null);
  const [searchPath, setSearchPath] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const menuOpen = menuPath === pathname;
  const searchOpen = searchPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setSearchPath(null);
    setSearchQuery('');
  };

  const toggleMenu = () => {
    setSearchPath(null);
    setMenuPath(menuOpen ? null : pathname);
  };

  const toggleSearch = () => {
    setMenuPath(null);
    setSearchPath(searchOpen ? null : pathname);
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-noir text-gold-light text-center text-[10px] sm:text-[11px] py-2.5 px-4 font-body tracking-[0.28em] uppercase">
        Free delivery on orders over GH₵ {FREE_DELIVERY_THRESHOLD}
        <span className="mx-3 text-gold">✦</span>
        Pay via MoMo
      </div>

      <header
        className="site-header sticky top-0 z-50 border-b border-card-border bg-ivory/90 backdrop-blur-md"
        data-scrolled={scrolled || undefined}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="site-header-bar grid grid-cols-[1fr_auto_1fr] items-center">
            {/* Left: desktop nav / mobile menu toggle */}
            <div className="flex items-center">
              <button
                type="button"
                className="md:hidden -ml-1 p-1 text-ink hover:text-gold-deep transition-colors"
                onClick={toggleMenu}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>

              <nav className="hidden md:flex items-center gap-8 lg:gap-10">
                {NAV_LINKS.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `nav-link text-[11px] font-body font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${
                        isActive ? 'is-active text-ink' : 'text-ink/70 hover:text-ink'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Centre: wordmark */}
            <Link to="/" className="flex flex-col items-center leading-none text-center" aria-label={`${BRAND} ${BRAND_SUB} — home`}>
              <span className="font-display text-[26px] sm:text-[30px] font-medium text-ink tracking-tight">{BRAND}</span>
              <span className="mt-1 pl-[0.42em] text-[8px] sm:text-[9px] font-body tracking-[0.42em] text-gold-deep uppercase">
                {BRAND_SUB}
              </span>
            </Link>

            {/* Right: icons */}
            <div className="flex items-center justify-end gap-4 sm:gap-5">
              <button
                type="button"
                onClick={toggleSearch}
                className="p-1 text-ink hover:text-gold-deep transition-colors"
                aria-label="Search"
                aria-expanded={searchOpen}
              >
                {searchOpen ? <X size={20} strokeWidth={1.5} /> : <Search size={20} strokeWidth={1.5} />}
              </button>

              <Link
                to="/cart"
                className="relative p-1 text-ink hover:text-gold-deep transition-colors"
                aria-label={`Your bag, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
              >
                <ShoppingBag size={21} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span
                    key={cartCount}
                    className="cart-bump absolute -top-1 -right-1.5 bg-gold text-ink text-[9px] font-semibold min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-body"
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <form onSubmit={handleSearch} className="drop-panel pb-5" role="search">
              <div className="flex items-end gap-4 border-b border-ink/30 focus-within:border-gold transition-colors">
                <Search size={18} strokeWidth={1.5} className="mb-3 text-muted flex-shrink-0" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search bags and clothes…"
                  className="flex-1 min-w-0 bg-transparent py-2 font-display text-2xl text-ink placeholder:text-muted/60 focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="mb-2.5 text-[11px] font-body font-medium uppercase tracking-[0.22em] text-ink hover:text-gold-deep transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="drop-panel md:hidden absolute inset-x-0 top-full h-dvh overflow-y-auto bg-ivory border-t border-card-border px-6 pt-8 pb-10">
            <nav className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  style={{ '--i': i }}
                  className={({ isActive }) =>
                    `menu-item flex items-baseline justify-between border-b border-card-border py-5 font-display text-4xl ${
                      isActive ? 'text-gold-deep italic' : 'text-ink'
                    }`
                  }
                >
                  {link.label}
                  <span className="font-body text-[10px] tracking-[0.3em] text-muted not-italic">0{i + 1}</span>
                </NavLink>
              ))}
            </nav>
            <p className="menu-item mt-10 text-[10px] font-body uppercase tracking-[0.3em] text-muted" style={{ '--i': NAV_LINKS.length }}>
              Curated in Accra
            </p>
          </div>
        )}
      </header>
    </>
  );
}
