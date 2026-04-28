import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Activity, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const S = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '32px', width: '100%', maxWidth: '520px', padding: '4rem', boxShadow: 'var(--shadow-float)', position: 'relative', zIndex: 10 },
  iconBox: { width: '64px', height: '64px', borderRadius: '18px', background: 'rgba(29, 158, 117, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' },
  label: { fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '10px', display: 'block' },
  error: { background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: '14px', padding: '1rem 1.25rem', marginBottom: '1.5rem', color: '#dc2626', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' },
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, getDashboardPath } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = await login(email, password);
      // Redirect to where they came from, or their dashboard
      const redirectPath = from || (() => {
        switch (userData.role) {
          case 'Admin': return '/admin/dashboard';
          case 'Staff': return '/staff/dashboard';
          case 'Customer': return '/customer/dashboard';
          default: return '/';
        }
      })();
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.page} className="page-transition">
      {/* Decorative blurs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '40%', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.05 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '40%', height: '40%', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.05 }}></div>

      <div style={S.card}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={S.iconBox}>
            <Lock size={32} />
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Welcome <span style={{ color: 'var(--primary)' }}>Back</span></h1>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Authenticate to access your dashboard.</p>
        </div>

        {error && (
          <div style={S.error}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={S.label}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                className="input"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '44px' }}
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label style={S.label}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                className="input"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '44px', paddingRight: '44px' }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '16px', fontSize: '15px', marginTop: '0.5rem' }}>
            {loading ? 'Authenticating...' : <>Sign In <ArrowRight size={20} /></>}
          </button>
        </form>

        <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
          New customer? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 800, textDecoration: 'none' }}>Register Here</Link>
        </div>

        <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1.5px solid var(--border-color)', display: 'flex', justifyContent: 'center', gap: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
            <ShieldCheck size={16} color="var(--primary)" /> Encrypted Session
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
            <Activity size={16} color="var(--primary)" /> Role-Based Access
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
