import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, Globe, Activity, Lock, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const S = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '32px', width: '100%', maxWidth: '580px', padding: '4rem', boxShadow: 'var(--shadow-float)', position: 'relative', zIndex: 10 },
  iconBox: { width: '64px', height: '64px', borderRadius: '18px', background: 'rgba(29, 158, 117, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' },
  label: { fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '10px', display: 'block' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
  error: { background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: '14px', padding: '1rem 1.25rem', marginBottom: '1.5rem', color: '#dc2626', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' },
};

const CustomerSelfRegister = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  // Form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(fullName, email, phone || null, password);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.page} className="page-transition">
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '40%', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.05 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '40%', height: '40%', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.05 }}></div>

      {isSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="icon-circle">
              <CheckCircle2 size={40} />
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Registration Complete!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Your account has been created successfully. You can now sign in to access your dashboard.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/login')} style={{ padding: '12px 40px' }}><Lock size={18} /> Proceed to Login</button>
          </div>
        </div>
      )}

      <div style={S.card}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={S.iconBox}>
            <Globe size={32} />
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Join the <span style={{ color: 'var(--primary)' }}>Ecosystem</span></h1>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Create your account and start booking services.</p>
        </div>

        {error && (
          <div style={S.error}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={S.grid}>
            <div>
              <label style={S.label}>Full Name</label>
              <input className="input" required placeholder="e.g. John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div>
              <label style={S.label}>Phone (Optional)</label>
              <input className="input" placeholder="+977" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          <div>
            <label style={S.label}>Email Address</label>
            <input className="input" type="email" required placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label style={S.label}>Password (min 6 chars)</label>
            <input className="input" type="password" required minLength={6} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '16px', fontSize: '15px', marginTop: '1.5rem' }}>
            {loading ? 'Creating Account...' : <>Complete Registration <ArrowRight size={20} /></>}
          </button>
        </form>

        <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 800, textDecoration: 'none' }}>Sign In</Link>
        </div>

        <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1.5px solid var(--border-color)', display: 'flex', justifyContent: 'center', gap: '30px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
              <ShieldCheck size={16} color="var(--primary)" /> Secure Registration
           </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
              <Activity size={16} color="var(--primary)" /> Instant Access
           </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSelfRegister;
