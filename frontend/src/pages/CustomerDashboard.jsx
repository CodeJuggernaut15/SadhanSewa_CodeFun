import React from 'react';
import { 
  User, Car, AlertTriangle, Calendar, 
  History, ShoppingBag, ArrowRight, Zap, 
  CheckCircle, Clock, ShieldCheck, CreditCard, Tag, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  layout: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '3.5rem' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '2rem', transition: 'all 0.3s ease' },
  profileSection: { display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '3rem' },
  avatar: { width: '80px', height: '80px', borderRadius: '24px', background: 'var(--primary)10', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
};

const CustomerDashboard = () => {
  return (
    <div style={S.page} className="page-transition">
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <User size={16} /> Customer Experience portal
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Welcome Back, <span style={{ color: 'var(--primary)' }}>Prashiddhika</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Your vehicle's health and service history at a glance.</p>
        </div>
        <button className="btn btn-primary"><Calendar size={18} /> Book Appointment</button>
      </div>

      <div style={S.layout}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* AI Insights Banner */}
          <div style={{ ...S.card, background: 'rgba(29, 158, 117, 0.05)', border: '1.5px solid rgba(29, 158, 117, 0.1)', display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={32} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>AI Predictive Diagnostic Alert</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Our telemetry analysis suggests that your **Brake Pads** may reach a critical wear level within the next 300 KM. We recommend a proactive inspection.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-primary" style={{ padding: '8px 24px', fontSize: '12px' }}>Book Inspection</button>
                <button className="btn btn-outline" style={{ padding: '8px 24px', fontSize: '12px' }}>View Analysis</button>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={S.card}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Car size={20} color="var(--primary)" /> Registered Vehicle
              </h4>
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>MODEL</span>
                  <span style={{ fontSize: '12px', fontWeight: 800 }}>Tesla Model 3 (2023)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>PLATE</span>
                  <span style={{ fontSize: '12px', fontWeight: 800 }}>BA-PA-1234</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>LAST SERVICE</span>
                  <span style={{ fontSize: '12px', fontWeight: 800 }}>12 Mar 2026</span>
                </div>
              </div>
            </div>

            <div style={S.card}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <History size={20} color="var(--primary)" /> Recent Activity
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { l: 'Service Completed', d: 'Oil Change & Filtration', t: '2d ago', i: CheckCircle, c: 'var(--primary)' },
                  { l: 'Payment Settled', d: 'Invoice #INV-8821', t: '2d ago', i: CreditCard, c: '#3b82f6' }
                ].map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                    <div style={{ color: a.c, marginTop: '2px' }}><a.i size={16} /></div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 800, margin: 0 }}>{a.l}</p>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0' }}>{a.d} • {a.t}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside>
          <div style={{ ...S.card, background: '#ef444408', borderColor: '#ef444420' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ef4444', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={20} /> Fiscal Alert
            </h4>
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '10px', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', marginBottom: '8px' }}>Unpaid Credit Balance</p>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Rs. 12,500</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '10px' }}>
                A credit balance of Rs. 12,500 from your service on Feb 15th is now overdue. Please settle to maintain your loyalty status.
              </p>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', background: '#ef4444', borderColor: '#ef4444' }}>Clear Balance Now <ArrowRight size={18} /></button>
          </div>

          <div style={{ ...S.card, marginTop: '1.5rem', background: 'var(--bg-nav)', color: '#fff' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase' }}>
              <Star size={18} /> Loyalty Program
            </h4>
            <div style={{ marginBottom: '2rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', opacity: 0.6, fontWeight: 800 }}>POINTS BALANCE</span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)' }}>850 PTS</span>
               </div>
               <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', background: 'var(--primary)' }}></div>
               </div>
            </div>
            <div style={{ background: 'var(--primary)20', padding: '15px', borderRadius: '16px', border: '1.5px solid var(--primary)40' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Tag size={16} color="var(--primary)" />
                  <span style={{ fontSize: '13px', fontWeight: 800 }}>Gold Member Benefit</span>
               </div>
               <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>Automatic **10% discount** applied to all retail assets and service fees.</p>
            </div>
          </div>

          <div style={{ ...S.card, marginTop: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { l: 'Service History', i: History, p: '/customer/history' },
                { l: 'Available Parts', i: ShoppingBag, p: '/customer/shop' },
                { l: 'Account Settings', i: User, p: '/customer/profile' }
              ].map((link, i) => (
                <Link key={i} to={link.p} className="btn btn-outline" style={{ width: '100%', justifyContent: 'flex-start', padding: '12px 20px', gap: '12px', textDecoration: 'none' }}>
                  <link.i size={18} /> {link.l}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CustomerDashboard;
