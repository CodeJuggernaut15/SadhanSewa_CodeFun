import React from 'react';
import { UserPlus, Car, ShieldCheck, Mail, Phone, Lock, ArrowRight, CheckCircle2, Globe, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const S = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', background: 'var(--bg-workspace)', position: 'relative', overflow: 'hidden' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '32px', width: '100%', maxWidth: '580px', padding: '4rem', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.05)', position: 'relative', zIndex: 10 },
  iconBox: { width: '64px', height: '64px', borderRadius: '18px', background: 'var(--primary)10', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' },
  label: { fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '10px', display: 'block' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
};

const CustomerSelfRegister = () => {
  return (
    <div style={S.page} className="page-transition">
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '40%', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.05 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '40%', height: '40%', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.05 }}></div>

      <div style={S.card}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={S.iconBox}>
            <Globe size={32} />
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Join the <span style={{ color: 'var(--primary)' }}>Ecosystem</span></h1>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Initialize your vehicle profile and activate real-time telemetry (Feature 1).</p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={S.grid}>
            <div>
              <label style={S.label}>Full Legal Name</label>
              <input className="input" placeholder="e.g. John Doe" />
            </div>
            <div>
              <label style={S.label}>Primary Contact</label>
              <input className="input" placeholder="+977" />
            </div>
          </div>

          <div>
            <label style={S.label}>Digital Identity (Email)</label>
            <input className="input" type="email" placeholder="john@example.com" />
          </div>

          <div style={S.grid}>
            <div>
              <label style={S.label}>Vehicle Model</label>
              <input className="input" placeholder="e.g. Toyota Prado" />
            </div>
            <div>
              <label style={S.label}>License Plate #</label>
              <input className="input" placeholder="Ba 1 Pa 1234" />
            </div>
          </div>

          <div>
            <label style={S.label}>System Access Password</label>
            <input className="input" type="password" placeholder="••••••••" />
          </div>

          <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '15px', marginTop: '1.5rem' }}>
            Complete Secure Registration <ArrowRight size={20} />
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
