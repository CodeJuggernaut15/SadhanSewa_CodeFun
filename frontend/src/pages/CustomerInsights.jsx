import React from 'react';
import { Users, TrendingUp, DollarSign, UserCheck, Search, Filter, Mail, ArrowRight, UserPlus, Star, LayoutGrid, List, ChevronRight, AlertCircle, ShieldAlert, Activity, ArrowUpRight } from 'lucide-react';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  layout: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '3.5rem', alignItems: 'start' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', overflow: 'hidden' },
  th: { background: 'rgba(0,0,0,0.01)', padding: '1.25rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', borderBottom: '1.5px solid var(--border-color)' },
  td: { padding: '1.5rem 1.5rem', fontSize: '14px', borderBottom: '1.5px solid var(--border-color)', verticalAlign: 'middle' },
  projectionCard: { background: 'var(--bg-nav)', borderRadius: '32px', padding: '3rem', color: '#fff', marginTop: '3rem', position: 'relative', overflow: 'hidden' },
  riskCard: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '2rem', marginBottom: '1.25rem', transition: 'all 0.3s ease' },
};

const CustomerInsights = () => {
  const topSpenders = [
    { id: 1, name: "Nelson Rai", vehicle: "Toyota Prado", spent: 125000, visits: 8, loyalty: "Platinum" },
    { id: 2, name: "Prashiddhika B.", vehicle: "Nissan Leaf", spent: 85200, visits: 6, loyalty: "Gold" },
    { id: 3, name: "Bishal Tamang", vehicle: "Honda CB650R", spent: 45000, visits: 3, loyalty: "Silver" }
  ];

  const creditAlerts = [
    { id: "C-102", name: "Paushan Chaudhary", amount: 15400, age: "45 Days", status: "Overdue" },
    { id: "C-115", name: "Rupesh Dahal", amount: 8200, age: "12 Days", status: "Pending" }
  ];

  return (
    <div style={S.page} className="page-transition">
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <Activity size={16} /> Consumer Intelligence Terminal
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Behavioral <span style={{ color: 'var(--primary)' }}>Insights</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Granular profiling of high-value consumers and liquidity risk assessment (Feature 4).</p>
        </div>
        <button className="btn btn-outline" style={{ color: '#ef4444', borderColor: '#ef444420', background: '#ef444405' }}><Mail size={18} /> Notify Delinquents</button>
      </div>

      <div style={S.layout}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Star size={20} color="var(--primary)" /> Priority Asset Holders</h3>
          <div style={S.card}>
            <div style={{ padding: '1.25rem 2rem', background: 'rgba(0,0,0,0.01)', borderBottom: '1.5px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Quarterly Value Ranking</span>
               <button style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: 800, color: 'var(--primary)', cursor: 'pointer' }}>VIEW FULL SYNDICATE</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={S.th}>Client Identity</th>
                  <th style={S.th}>Epoch Visits</th>
                  <th style={S.th}>Gross Value Contribution</th>
                  <th style={{ ...S.th, textAlign: 'right' }}>Loyalty Tier</th>
                </tr>
              </thead>
              <tbody>
                {topSpenders.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                    <td style={S.td}>
                       <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.1rem' }}>{user.name}</div>
                       <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginTop: '4px' }}>{user.vehicle}</div>
                    </td>
                    <td style={S.td}><span style={{ fontWeight: 700, opacity: 0.7 }}>{user.visits} Visits</span></td>
                    <td style={S.td}><span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>Rs. {(user.spent / 1000).toFixed(1)}k</span></td>
                    <td style={{ ...S.td, textAlign: 'right' }}>
                       <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', background: user.loyalty === 'Platinum' ? 'var(--bg-nav)' : user.loyalty === 'Gold' ? 'var(--primary)15' : '#f1f5f9', color: user.loyalty === 'Platinum' ? '#fff' : user.loyalty === 'Gold' ? 'var(--primary)' : 'var(--text-muted)', padding: '6px 14px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <Star size={12} fill={user.loyalty === 'Platinum' ? '#fff' : 'none'} /> {user.loyalty}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={S.projectionCard}>
             <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '0.12em' }}>Algorithmic Projection</div>
                <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>Sustained <span style={{ color: 'var(--primary)' }}>Growth Flow</span></h2>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '450px', lineHeight: 1.7, marginBottom: '3rem' }}>
                   Systematic part liquidation and retention strategies (Feature 9) have resulted in 15% upward trajectory across the Emerald Loyalty syndicate.
                </p>
                <button className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '14px' }}>Execute Structural Growth Audit <ArrowRight size={20} /></button>
             </div>
             <TrendingUp size={180} style={{ position: 'absolute', right: '-40px', bottom: '-40px', color: 'var(--primary)', opacity: 0.1 }} />
          </div>
        </div>

        <aside>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444' }}><ShieldAlert size={20} /> Overdue Risk</h3>
          {creditAlerts.map(alert => (
            <div key={alert.id} style={S.riskCard} className="hover:border-primary group">
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>MANIFEST: {alert.id}</span>
                  <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', background: alert.status === 'Overdue' ? '#ef444415' : '#f59e0b15', color: alert.status === 'Overdue' ? '#ef4444' : '#f59e0b', padding: '4px 12px', borderRadius: '6px' }}>{alert.status}</span>
               </div>
               <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{alert.name}</h4>
               <p style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ef4444', margin: '8px 0' }}>Rs. {alert.amount.toLocaleString()}</p>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', background: 'rgba(0,0,0,0.03)', borderRadius: '14px', border: '1.5px solid var(--border-color)', marginTop: '1.5rem' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, opacity: 0.5, textTransform: 'uppercase' }}>DEBT AGE</span>
                  <span style={{ fontSize: '14px', fontWeight: 800 }}>{alert.age}</span>
               </div>
               <button className="btn btn-outline" style={{ width: '100%', marginTop: '1.5rem', padding: '12px', fontSize: '12px' }}><Mail size={16} /> Dispatch Remittance</button>
            </div>
          ))}

          <div style={{ background: 'rgba(29,158,117,0.05)', border: '1.5px solid rgba(29,158,117,0.1)', borderRadius: '24px', padding: '1.75rem', marginTop: '2.5rem' }}>
             <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '1rem', color: 'var(--primary)' }}>
                <AlertCircle size={20} /> <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Staff Directive</h4>
             </div>
             <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Automatic credit verification (Feature 15) suggests manual outreach for clients exceeding the 30-day liquidity threshold. Real-time audit logs are synced with the Admin control center.</p>
             <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 800, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '1.5rem' }}>Review Data Integrity <ArrowUpRight size={16} /></button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CustomerInsights;
