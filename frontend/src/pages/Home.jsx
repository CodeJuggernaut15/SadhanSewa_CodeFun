// This is the landing page of VehicleCore. 
// It's designed to give visitors a clear idea of what our platform does and who it's for.
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, Zap, Users, ShoppingCart, 
  TrendingUp, CheckCircle, Package, Clock, 
  Search, Mail, FileText, Star, Briefcase, Award
} from 'lucide-react';

// Style objects for the landing page. 
// We're using a clean, modern look with plenty of whitespace and clear typography.
const S = {
  container: {
    paddingBottom: '8rem',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    borderRadius: '100px',
    background: 'rgba(29, 158, 117, 0.1)',
    color: '#1D9E75',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '2rem',
    border: '1px solid rgba(29, 158, 117, 0.2)',
  },
  hero: {
    textAlign: 'center',
    padding: '6rem 0 4rem',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 8vw, 4.8rem)',
    fontWeight: 800,
    lineHeight: 1,
    color: '#0f172a',
    letterSpacing: '-0.04em',
    marginBottom: '2.5rem',
  },
  heroSub: {
    fontSize: '1.25rem',
    color: '#64748b',
    maxWidth: '700px',
    margin: '0 auto 3rem',
    lineHeight: 1.6,
  },
  btnRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '5rem',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    marginBottom: '8rem',
  },
  statCard: {
    background: '#f8fafc',
    padding: '2rem',
    borderRadius: '24px',
    textAlign: 'center',
    border: '1px solid #e2e8f0',
  },
  sectionHeader: {
    marginBottom: '4rem',
  },
  roleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    marginBottom: '8rem',
  },
  featureList: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '8rem',
  },
  featureItem: {
    padding: '1.5rem',
    background: '#fff',
    borderRadius: '20px',
    border: '1.5px solid #f1f5f9',
    display: 'flex',
    alignItems: 'start',
    gap: '1.25rem',
    transition: 'all 0.3s ease',
  }
};

const Home = () => {
  return (
    <div style={S.container} className="page-transition">
      {/* Hero Section */}
      {/* Hero Section: The first thing people see. We want it to be bold and clear. */}
      <section style={S.hero}>
        <div style={S.badge}>
          <span style={{width: 8, height: 8, borderRadius: '50%', background: '#1D9E75'}}></span>
          Vehicle Parts & Service Platform
        </div>
        <h1 style={S.heroTitle}>
          Smarter inventory.<br />
          Faster <span style={{color: '#1D9E75'}}>service.</span>
        </h1>
        <p style={S.heroSub}>
          VehicleCore unifies inventory management, sales operations, and AI-powered diagnostics for modern vehicle service centers.
        </p>
        <div style={S.btnRow}>
          <Link to="/appointments" className="btn btn-primary" style={{padding: '1rem 2.5rem'}}>Get started</Link>
          <Link to="/register" className="btn btn-outline" style={{padding: '1rem 2.5rem'}}>Learn more</Link>
        </div>
      </section>

      {/* Stats Summary */}
      {/* Stats Summary: Some quick numbers to build trust and show scale. */}
      <div style={S.statsRow}>
        {[
          { v: '3', l: 'User roles', desc: 'Admin, Staff, Customer' },
          { v: '16+', l: 'Core features', desc: 'Integrated workflows' },
          { v: 'AI', l: 'Diagnostics', desc: 'Failure prediction' }
        ].map((s, i) => (
          <div key={i} style={S.statCard}>
            <h2 style={{fontSize: '2.5rem', fontWeight: 800, color: '#1D9E75', marginBottom: '8px'}}>{s.v}</h2>
            <p style={{fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: '#0f172a', marginBottom: '4px'}}>{s.l}</p>
            <p style={{fontSize: '12px', color: '#64748b'}}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* User Roles Section */}
      {/* User Roles Section: Explaining how different people will use the app. */}
      <section style={S.sectionHeader}>
        <p style={{fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px'}}>User Roles</p>
        <h2 style={{fontSize: '2.5rem', fontWeight: 800}}>Built for every<br/><span style={{color: '#1D9E75'}}>team member</span></h2>
      </section>

      <div style={S.roleGrid}>
         {[
           { icon: Shield, title: 'Admin', desc: 'Full system control — manage staff, vendors, inventory, and generate financial reports.', badge: 'Full access', color: '#dbeafe' },
           { icon: Users, title: 'Staff', desc: 'Handle customer registrations, part sales, invoicing, and generate customer reports.', badge: 'Operations', color: '#d1fae5' },
           { icon: Award, title: 'Customer', desc: 'Self-register, book appointments, track purchase history, and receive AI alerts.', badge: 'Self-service', color: '#fef3c7' }
         ].map((r, i) => (
           <div key={i} className="card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%'}}>
              <div style={{width: 44, height: 44, borderRadius: 12, background: 'rgba(29, 158, 117, 0.1)', color: '#1D9E75', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'}}>
                 <r.icon size={22} />
              </div>
              <h3 style={{fontSize: '1.25rem', marginBottom: '0.75rem'}}>{r.title}</h3>
              <p style={{fontSize: '14px', color: '#64748b', lineHeight: 1.6, marginBottom: '2rem', flex: 1}}>{r.desc}</p>
              <span style={{fontSize: '10px', fontWeight: 800, color: '#1D9E75', textTransform: 'uppercase', padding: '4px 10px', background: 'rgba(29, 158, 117, 0.05)', borderRadius: 4, width: 'fit-content'}}>
                 {r.badge}
              </span>
           </div>
         ))}
      </div>

      {/* Everything You Need Section */}
      {/* Features List: A breakdown of all the cool stuff the app can do. */}
      <section style={S.sectionHeader}>
        <p style={{fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px'}}>Features</p>
        <h2 style={{fontSize: '2.5rem', fontWeight: 800}}>Everything <span style={{color: '#1D9E75'}}>you need</span></h2>
      </section>

      <div style={S.featureList}>
        {[
          { icon: TrendingUp, title: 'Financial reports', desc: 'Daily, monthly & yearly reports auto-generated for admin', color: '#ef4444' },
          { icon: Package, title: 'Parts management', desc: 'Add, edit, delete parts with real-time stock tracking', color: '#3b82f6' },
          { icon: FileText, title: 'Purchase invoices', desc: 'Create vendor purchase invoices to update stock levels', color: '#10b981' },
          { icon: Search, title: 'Customer search', desc: 'Find customers by name, phone, ID, or vehicle number', color: '#f59e0b' },
          { icon: Mail, title: 'Sales invoices', desc: 'Generate and email invoices directly to customers', color: '#8b5cf6' },
          { icon: Clock, title: 'Service booking', desc: 'Customers book appointments online at any time', color: '#f97316' },
          { icon: Star, title: 'Part requests', desc: 'Customers can request unavailable parts through the system', color: '#06b6d4' },
          { icon: Briefcase, title: 'Vendor management', desc: 'Full CRUD operations on vendor and supplier records', color: '#6366f1' }
        ].map((f, i) => (
          <div key={i} style={S.featureItem} className="hover:border-primary group">
            <div style={{color: f.color}}><f.icon size={24} /></div>
            <div>
              <h4 style={{fontSize: '1rem', fontWeight: 700, marginBottom: '4px', color: '#0f172a'}}>{f.title}</h4>
              <p style={{fontSize: '13px', color: '#64748b', lineHeight: 1.5}}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Diagnostics Banner */}
      {/* AI Diagnostics: Highlighting the smart tech under the hood. */}
      <div style={{
        background: 'rgba(29, 158, 117, 0.05)',
        borderRadius: '32px',
        padding: '4rem',
        border: '1.5px solid rgba(29, 158, 117, 0.1)',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{maxWidth: '650px', position: 'relative', zIndex: 10}}>
           <h3 style={{fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem'}}>AI-powered diagnostics</h3>
           <p style={{color: '#1D9E75', fontWeight: 600, fontSize: '15px', marginBottom: '2.5rem', lineHeight: 1.6}}>
             The system analyzes your vehicle's condition and usage patterns to predict potential part failures before they happen — keeping you one step ahead.
           </p>
           <div style={{display: 'flex', gap: '10px'}}>
             {['Failure prediction', 'Usage analysis', 'Proactive alerts'].map(tag => (
               <span key={tag} style={{fontSize: '11px', fontWeight: 800, background: 'rgba(29, 158, 117, 0.1)', padding: '6px 12px', borderRadius: '100px', color: '#1D9E75'}}>
                 {tag}
               </span>
             ))}
           </div>
        </div>
        <Zap size={180} style={{position: 'absolute', right: '40px', bottom: '-40px', color: '#1D9E75', opacity: 0.05}} />
      </div>

      {/* Alerts Row */}
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem'}}>
         <div style={{background: '#fef3c7', padding: '2.5rem', borderRadius: '24px', border: '1px solid #fde68a'}}>
            <div style={{color: '#d97706', marginBottom: '1rem'}}><Zap size={24} /></div>
            <h4 style={{fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem'}}>Low stock alerts</h4>
            <p style={{fontSize: '13px', color: '#92400e', lineHeight: 1.5}}>Admin is automatically notified when any part drops below 10 units in inventory.</p>
         </div>
         <div style={{background: '#dbeafe', padding: '2.5rem', borderRadius: '24px', border: '1px solid #bfdbfe'}}>
            <div style={{color: '#2563eb', marginBottom: '1rem'}}><Mail size={24} /></div>
            <h4 style={{fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem'}}>Credit reminders</h4>
            <p style={{fontSize: '13px', color: '#1e40af', lineHeight: 1.5}}>Customers with unpaid credit balances over 1 month receive automatic email reminders.</p>
         </div>
      </div>

      {/* Loyalty Banner */}
      {/* Loyalty and Discounts: Incentivizing returning customers. */}
      <div style={{
        background: 'linear-gradient(135deg, #1D9E75 0%, #065f46 100%)',
        borderRadius: '32px',
        padding: '4rem',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
         <div style={{maxWidth: '600px'}}>
            <h3 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '1rem'}}>Loyalty program</h3>
            <p style={{fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6}}>
              Customers who spend more than Rs. 5,000 in a single purchase automatically receive a discount on their order — no vouchers needed.
            </p>
         </div>
         <div style={{
           background: 'rgba(255,255,255,0.1)',
           padding: '2rem 3rem',
           borderRadius: '20px',
           textAlign: 'center',
           border: '1px solid rgba(255,255,255,0.2)'
         }}>
            <h2 style={{fontSize: '3.5rem', fontWeight: 800, marginBottom: '0'}}>10%</h2>
            <p style={{fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '-4px'}}>auto-discount</p>
         </div>
      </div>

    </div>
  );
};

export default Home;
