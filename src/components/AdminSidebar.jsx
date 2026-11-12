import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingBag, Bell,
  PlusCircle, LogOut, X,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

const links = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/add-product', icon: PlusCircle, label: 'Add Product' },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/admin/notify-requests', icon: Bell, label: 'Notify Requests' },
];

export default function AdminSidebar({ onClose }) {
  const { adminLogout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin');
  };

  return (
    <aside className="w-64 min-h-screen bg-espresso-dark flex flex-col">
      {/* Header */}
      <div className="px-5 py-6 flex items-center justify-between border-b border-white/10">
        <div>
          <span className="font-display text-2xl font-medium text-ivory">Kailynne's</span>
          <p className="text-[9px] font-body tracking-[0.3em] text-gold uppercase mt-0.5">Lux Collection · Admin</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `admin-sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6 border-t border-white/10 pt-4">
        <button
          onClick={handleLogout}
          className="admin-sidebar-link w-full text-left hover:text-red-300"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </aside>
  );
}