import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function AdminLogin() {
  const { adminLogin, isAdminLoggedIn } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAdminLoggedIn) {
    navigate('/admin/dashboard');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const ok = adminLogin(email, password);
      if (ok) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-espresso-dark flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="font-display text-3xl font-bold text-white">Lumière</span>
          <p className="text-[10px] font-body tracking-[0.3em] text-gold uppercase mt-1">Admin Panel</p>
        </div>

        <div className="bg-ivory rounded-sm shadow-2xl p-8">
          <h2 className="font-display text-xl font-semibold text-ink mb-6 text-center">
            Sign In
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-body px-4 py-3 rounded-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@bagstore.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              <LogIn size={16} />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 bg-stone-50 border border-stone-200 rounded-sm p-3">
            <p className="text-xs text-muted font-body text-center">
              Demo credentials: <br />
              <strong className="text-ink">admin@bagstore.com</strong> / <strong className="text-ink">admin123</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}