import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop All' },
    { to: '/products?category=Corporate+Bags', label: 'Corporate' },
    { to: '/products?category=Girlie+Bags', label: 'Girlie' },
  ];

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-espresso text-white text-center text-xs py-2 font-body tracking-widest">
        FREE DELIVERY ON ORDERS OVER GH₵ 800 &nbsp;·&nbsp; PAY VIA MOMO
      </div>

      <header className="bg-ivory border-b border-card-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold text-ink tracking-tight">Kailynne's</span>
              <span className="text-[9px] font-body tracking-[0.3em] text-gold uppercase">LUX COLLECTION</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-body font-medium tracking-wide transition-colors duration-150 ${
                      isActive
                        ? 'text-espresso border-b border-gold pb-0.5'
                        : 'text-ink hover:text-espresso'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-ink hover:text-gold transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link to="/cart" className="relative text-ink hover:text-gold transition-colors">
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-espresso text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-body">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden text-ink hover:text-gold transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <form onSubmit={handleSearch} className="pb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search bags..."
                  className="input-field"
                  autoFocus
                />
                <button type="submit" className="btn-primary px-4">
                  Search
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-ivory border-t border-card-border px-4 pb-4">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm font-body font-medium text-ink hover:text-espresso border-b border-card-border last:border-0"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>
    </>
  );
}