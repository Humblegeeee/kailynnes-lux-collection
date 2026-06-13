import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink text-stone-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="mb-4">
              <span className="font-display text-2xl font-bold text-white tracking-tight">
                Kailynne's
              </span>
              <p className="text-[10px] font-body tracking-[0.3em] text-gold uppercase mt-0.5">
                LUX COLLECTION
              </p>
            </div>

            <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
              Curated bags for the modern Ghanaian woman — from the boardroom to the weekend.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-white mb-5">
              Shop
            </h4>
            <ul className="space-y-3 text-sm">
              {['Corporate Bags', 'Girlie Bags', 'Lunch Boxes'].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    className="text-stone-400 hover:text-gold transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-white mb-5">
              Contact
            </h4>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-stone-400">
                <Phone size={14} />
                <span>+233 XX XXX XXXX</span>
              </li>

              <li className="flex items-center gap-2 text-stone-400">
                <Mail size={14} />
                <span>info@kailynneslux.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Kailynne's Bags. All rights reserved.
          </p>

          <Link
            to="/admin"
            className="text-xs text-stone-600 hover:text-stone-400 transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}