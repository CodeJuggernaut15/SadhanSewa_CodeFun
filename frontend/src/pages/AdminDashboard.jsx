import React, { useState } from 'react';
import {
  TrendingUp, Users, Truck, DollarSign,
  PieChart, BarChart3, ArrowUpRight,
  Download, Package, AlertTriangle,
  ShieldCheck, CreditCard, Activity, Globe, Zap, ArrowRight, Clock, CheckCircle
} from 'lucide-react';

const REVENUE_DATA = {
  Daily: [3200, 4100, 2800, 5300, 4700, 6100, 5500, 4900, 6800, 5200, 7100, 6400],
  Monthly: [28000, 34000, 29000, 42000, 38000, 51000, 47000, 43000, 58000, 49000, 62000, 55000],
  Yearly: [210000, 245000, 198000, 312000, 287000, 358000, 332000, 298000, 415000, 371000, 428000, 458000],
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const RECENT_TRANSACTIONS = [
  { id: 'INV-0091', customer: 'Prashiddhika Bhattarai', part: 'Brake Pad Set', amount: 'Rs. 3,200', status: 'Paid', date: 'Today' },
  { id: 'INV-0090', customer: 'Kriti Bista', part: 'Engine Oil Filter', amount: 'Rs. 850', status: 'Pending', date: 'Today' },
  { id: 'INV-0089', customer: 'Rupesh Dahal', part: 'Alternator', amount: 'Rs. 8,500', status: 'Paid', date: 'Yesterday' },
  { id: 'INV-0088', customer: 'Nelson Rai', part: 'Spark Plug x4', amount: 'Rs. 1,200', status: 'Overdue', date: '2d ago' },
  { id: 'INV-0087', customer: 'Paushan Chaudhary', part: 'Timing Belt', amount: 'Rs. 4,700', status: 'Paid', date: '3d ago' },
];

const LOW_STOCK = [
  { part: 'Air Filter (Honda)', stock: 4, threshold: 10 },
  { part: 'Clutch Plate (Bajaj)', stock: 7, threshold: 10 },
  { part: 'Radiator Cap', stock: 2, threshold: 10 },
];

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1600px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '2rem', overflow: 'hidden' },
  darkCard: { background: 'var(--bg-nav)', borderRadius: '32px', padding: '2.5rem', color: '#fff' },
  th: { background: 'rgba(0,0,0,0.01)', padding: '1rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', borderBottom: '1.5px solid var(--border-color)' },
  td: { padding: '1.25rem 1.5rem', fontSize: '13px', borderBottom: '1.5px solid var(--border-color)', verticalAlign: 'middle' },
};

const AdminDashboard = () => {
  const [period, setPeriod] = useState('Monthly');
  const [isExporting, setIsExporting] = useState(false);
  
  const data = REVENUE_DATA[period];
  const max = Math.max(...data);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <div style={S.page} className="page-transition">
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <Activity size={16} /> Global Fiscal Intelligence
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Executive <span style={{ color: 'var(--primary)' }}>Control</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Mission-critical financial health and operational oversight.</p>
        </div>
        <button className="btn btn-primary" onClick={handleExport} disabled={isExporting}>
          {isExporting ? 'Generating Audit...' : <><Download size={18} /> Export Fiscal Audit</>}
        </button>
      </div>

      <div style={S.statsGrid}>
        {[
          { l: 'Gross Revenue Flow', v: 'Rs. 458k', c: '+12%', i: DollarSign, bg: '#10b981' },
          { l: 'Operational Nodes', v: '12 Staff', c: 'Stable', i: Users, bg: '#3b82f6' },
          { l: 'Liquidity Risks', v: 'Rs. 24k', c: '+2.1%', i: CreditCard, bg: '#ef4444' },
          { l: 'Supply Partners', v: '08 Vendors', c: 'Active', i: Truck, bg: '#8b5cf6' }
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: '1.5rem 2rem', background: '#fff', border: '1.5px solid var(--border-color)', borderRadius: '24px' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.bg}10`, color: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><s.i size={22} /></div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: s.c.startsWith('+') ? '#10b981' : '#64748b', background: s.c.startsWith('+') ? '#10b98110' : '#f1f5f9', padding: '4px 10px', borderRadius: '6px' }}>{s.c}</span>
             </div>
             <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.l}</p>
             <p style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0' }}>{s.v}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
         <div style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
               <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 800 }}>Revenue <span style={{ color: 'var(--primary)' }}>Trajectory</span></h3>
               <div style={{ display: 'flex', gap: '8px' }}>
                  {['Daily', 'Monthly', 'Yearly'].map(t => (
                    <button key={t} onClick={() => setPeriod(t)} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, border: 'none', background: period === t ? 'var(--primary)' : 'rgba(0,0,0,0.05)', color: period === t ? '#fff' : 'var(--text-muted)', cursor: 'pointer', transition: '0.3s' }}>{t}</button>
                  ))}
               </div>
            </div>
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingBottom: '2.5rem' }}>
               {data.map((v, i) => {
                 const pct = (v / max) * 100;
                 return (
                   <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '12px' }}>
                      <div className="hover:scale-y-105" style={{ width: '100%', height: `${pct}%`, background: i === data.length - 1 ? 'var(--primary)' : 'rgba(29, 158, 117, 0.15)', borderRadius: '6px 6px 2px 2px', transition: 'all 0.4s ease' }}></div>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)' }}>{MONTHS[i]}</span>
                   </div>
                 );
               })}
            </div>
         </div>

         <div style={S.darkCard}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}><TrendingUp size={20} /> Profit Allocation</h4>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '2.5rem' }}>Real-time part throughput against operational expenditure offsets.</p>
            
            {[
              { l: 'Service Margins', p: 45, v: 'Rs. 180k', c: 'var(--primary)' },
              { l: 'Retail Markups', p: 22, v: 'Rs. 92k', c: '#3b82f6' },
              { l: 'Overhead Offset', p: 18, v: 'Rs. 74k', c: '#f59e0b' },
              { l: 'Net Profit Yield', p: 15, v: 'Rs. 62k', c: '#8b5cf6' }
            ].map((r, i) => (
              <div key={i} style={{ marginBottom: '1.5rem' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                    <span style={{ fontWeight: 600, opacity: 0.7 }}>{r.l}</span>
                    <span style={{ fontWeight: 800, color: r.c }}>{r.v}</span>
                 </div>
                 <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${r.p}%`, height: '100%', background: r.c }}></div>
                 </div>
              </div>
            ))}
            <button className="btn btn-primary" style={{ width: '100%', padding: '14px', background: '#fff', color: 'var(--bg-nav)', marginTop: '2.5rem' }}>View Full Fiscal Ledger <ArrowUpRight size={18} /></button>
         </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '2rem' }}>
         <div style={S.card}>
            <h3 style={{ fontSize: '1.1rem', margin: '0 0 2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}><Clock size={20} color="var(--primary)" /> Recent Manifest Settlements</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
               <thead>
                  <tr>
                     <th style={S.th}>Order ID</th>
                     <th style={S.th}>Beneficiary</th>
                     <th style={S.th}>Amount</th>
                     <th style={S.th}>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {RECENT_TRANSACTIONS.map((tx, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                       <td style={S.td}><span style={{ color: 'var(--primary)', fontWeight: 800 }}>{tx.id}</span></td>
                       <td style={S.td}>{tx.customer}</td>
                       <td style={S.td}><span style={{ fontWeight: 800 }}>{tx.amount}</span></td>
                       <td style={S.td}>
                          <span className={`chip ${tx.status === 'Paid' ? 'chip-success' : ''}`}>
                             {tx.status === 'Paid' ? <CheckCircle size={12} /> : tx.status === 'Pending' ? <Clock size={12} /> : <AlertTriangle size={12} />} {tx.status}
                          </span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div style={{ background: '#fff', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem', fontWeight: 800, color: '#ef4444', display: 'flex', alignItems: 'center', gap: '10px' }}><AlertTriangle size={20} /> Stock Breaches</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Automatic threshold triggers detected for high-demand assets.</p>
            {LOW_STOCK.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
                 <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: item.stock <= 4 ? '#ef444410' : '#f59e0b10', color: item.stock <= 4 ? '#ef4444' : '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Package size={18} /></div>
                    <div><p style={{ fontWeight: 700, margin: 0, fontSize: '14px' }}>{item.part}</p></div>
                 </div>
                 <span style={{ fontSize: '10px', fontWeight: 800, color: item.stock <= 4 ? '#ef4444' : '#f59e0b' }}>{item.stock} LEFT</span>
              </div>
            ))}
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '2.5rem' }}>Replenish Assets <Truck size={18} /></button>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;