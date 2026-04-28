// This page is for new customers to sign up by themselves.
// They can create their own account and add their vehicle details here.
import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, Globe, Activity, RefreshCcw, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const S = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '32px', width: '100%', maxWidth: '580px', padding: '4rem', boxShadow: 'var(--shadow-float)', position: 'relative', zIndex: 10 },
  iconBox: { width: '64px', height: '64px', borderRadius: '18px', background: 'var(--primary)10', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' },
  label: { fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '10px', display: 'block' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
};

const CustomerSelfRegister = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // This function handles the registration when the user clicks the button.
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
    }, 1500);
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
              Your professional vehicle profile has been initialized. You can now access real-time diagnostics and book service appointments.
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
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Initialize your vehicle profile and activate real-time telemetry.</p>
        </div>

        {/* Registration Form: Where the user types their name, email, and vehicle info. */}
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={S.grid}>
            <div>
              <label style={S.label}>Full Legal Name</label>
              <input className="input" required placeholder="e.g. John Doe" />
            </div>
            <div>
              <label style={S.label}>Primary Contact</label>
              <input className="input" required placeholder="+977" />
            </div>
          </div>

          <div>
            <label style={S.label}>Digital Identity (Email)</label>
            <input className="input" type="email" required placeholder="john@example.com" />
          </div>

          <div style={S.grid}>
            <div>
              <label style={S.label}>Vehicle Model</label>
              <input className="input" required placeholder="e.g. Toyota Prado" />
            </div>
            <div>
              <label style={S.label}>License Plate #</label>
              <input className="input" required placeholder="Ba 1 Pa 1234" />
            </div>
          </div>

          <div>
            <label style={S.label}>System Access Password</label>
            <input className="input" type="password" required placeholder="••••••••" />
          </div>

          <button className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '16px', fontSize: '15px', marginTop: '1.5rem' }}>
            {loading ? 'Processing Registration...' : <>Complete Secure Registration <ArrowRight size={20} /></>}
          </button>
        </form>

        <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Already have an operational profile? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 800, textDecoration: 'none' }}>Authenticate Now</Link>
        </div>

        <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1.5px solid var(--border-color)', display: 'flex', justifyContent: 'center', gap: '30px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
              <ShieldCheck size={16} color="var(--primary)" /> Secure Payload
           </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
              <Activity size={16} color="var(--primary)" /> Live Telemetry
           </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSelfRegister;
