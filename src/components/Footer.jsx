import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import { BAG_CATEGORIES, CLOTHING_CATEGORIES } from '../data/sampleProducts';
import { BRAND, BRAND_SUB } from '../lib/constants';
import Reveal from './Reveal';

function LinkColumn({ title, base, items }) {
  return (
    <div>
      <h4 className="text-[10px] font-body font-medium tracking-[0.3em] uppercase text-gold-light mb-6">
        {title}
      </h4>
      <ul className="space-y-3.5 text-sm">
        {items.map((cat) => (
          <li key={cat}>
            <Link
              to={`${base}?category=${encodeURIComponent(cat)}`}
              className="nav-link text-stone-400 hover:text-ivory transition-colors duration-300"
            >
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-noir text-stone-300 mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <Reveal className="text-center">
          <p className="text-[10px] font-body tracking-[0.42em] text-gold uppercase mb-5">{BRAND_SUB}</p>
          <p className="font-display text-6xl sm:text-8xl lg:text-9xl font-medium leading-none text-ivory">
            <span className="gold-text italic">{BRAND}</span>
          </p>
          <p className="font-display italic text-lg sm:text-xl text-stone-400 mt-6 max-w-md mx-auto leading-relaxed">
            Bags and clothing for the modern Ghanaian woman — from the boardroom to the weekend.
          </p>
        </Reveal>

        <Reveal variant="line" className="h-px bg-white/10 my-14" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <Reveal>
            <LinkColumn title="Bags" base="/bags" items={BAG_CATEGORIES} />
          </Reveal>
          <Reveal delay={90}>
            <LinkColumn title="Clothes" base="/clothes" items={CLOTHING_CATEGORIES} />
          </Reveal>

          <Reveal delay={180}>
            <h4 className="text-[10px] font-body font-medium tracking-[0.3em] uppercase text-gold-light mb-6">
              Shopping
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li><Link to="/products" className="nav-link text-stone-400 hover:text-ivory transition-colors duration-300">Shop All</Link></li>
              <li><Link to="/cart" className="nav-link text-stone-400 hover:text-ivory transition-colors duration-300">Your Bag</Link></li>
            </ul>
          </Reveal>

          <Reveal delay={270}>
            <h4 className="text-[10px] font-body font-medium tracking-[0.3em] uppercase text-gold-light mb-6">
              Contact
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-center gap-2.5 text-stone-400">
                <Phone size={14} strokeWidth={1.5} className="text-gold" />
                <span>+233 XX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2.5 text-stone-400">
                <Mail size={14} strokeWidth={1.5} className="text-gold" />
                <span className="break-all">info@kailynneslux.com</span>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] tracking-wide text-stone-500">
            © {new Date().getFullYear()} {BRAND} {BRAND_SUB}. All rights reserved.
          </p>

          <Link
            to="/admin"
            className="text-[11px] tracking-wide text-stone-600 hover:text-stone-300 transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
