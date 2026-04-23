import React, { useState } from 'react';
import { 
  Users, TrendingUp, AlertTriangle, 
  Download, Filter, ArrowUpRight, Search, 
  CheckCircle, Clock, PieChart, BarChart3, Star 
} from 'lucide-react';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  grid: { display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '3.5rem', marginBottom: '3rem' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '2rem' },
  th: { background: 'rgba(0,0,0,0.01)', padding: '1rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', borderBottom: '1.5px solid var(--border-color)' },
  td: { padding: '1.25rem 1.5rem', fontSize: '13px', borderBottom: '1.5px solid var(--border-color)', verticalAlign: 'middle' },
};

const StaffReports = () => {
  const [activeTab, setActiveTab] = useState('High Spenders');

  const highSpenders = [
    { name: 'Prashiddhika Bhattarai', total: 'Rs. 124,500', frequency: '12 orders', loyalty: 'Gold' },
    { name: 'Aarav Sharma', total: 'Rs. 98,200', frequency: '8 orders', loyalty: 'Silver' },
    { name: 'Kriti Bista', total: 'Rs. 82,400', frequency: '15 orders', loyalty: 'Gold' },
  ];

  const regularCustomers = [
    { name: 'Sita Thapa', lastVisit: 'Yesterday', totalVisits: '42', status: 'Active' },
    { name: 'Ram Bahadur', lastVisit: '3 days ago', totalVisits: '28', status: 'Active' },
    { name: 'Gita Rai', lastVisit: '1 week ago', totalVisits: '35', status: 'Inactive' },
  ];

  const overdueCredit = [
    { name: 'Nelson Rai', amount: 'Rs. 15,400', overdue: '45 Days', risk: 'High' },
    { name: 'Paushan Chaudhary', amount: 'Rs. 8,200', overdue: '32 Days', risk: 'Medium' },
    { name: 'Manish K.', amount: 'Rs. 4,500', overdue: '31 Days', risk: 'Medium' },
  ];

  return (
    <div style={S.page} className="page-transition">
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <Users size={16} /> Intelligence Hub
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Customer <span style={{ color: 'var(--primary)' }}>Insights</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Analytical overview of customer behavior and fiscal loyalty.</p>
        </div>
        <button className="btn btn-primary"><Download size={18} /> Export Intelligence Bundle</button>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '3rem' }}>
        {['High Spenders', 'Regular Customers', 'Overdue Credit'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: '10px 24px', 
              borderRadius: '12px', 
              fontSize: '13px', 
              fontWeight: 800, 
              border: 'none', 
              background: activeTab === tab ? 'var(--primary)' : 'var(--bg-card)', 
              color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: '0.3s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={S.grid}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
               <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 800 }}>{activeTab} Analytics</h3>
               <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input className="input" placeholder="Search manifest..." style={{ paddingLeft: '40px', fontSize: '12px', width: '200px' }} />
               </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
               <thead>
                  <tr>
                     {activeTab === 'High Spenders' && (
                       <>
                         <th style={S.th}>Customer Identity</th>
                         <th style={S.th}>Gross Contribution</th>
                         <th style={S.th}>Order Frequency</th>
                         <th style={{ ...S.th, textAlign: 'right' }}>Loyalty Tier</th>
                       </>
                     )}
                     {activeTab === 'Regular Customers' && (
                       <>
                         <th style={S.th}>Customer Identity</th>
                         <th style={S.th}>Last Engagement</th>
                         <th style={S.th}>Total Sessions</th>
                         <th style={{ ...S.th, textAlign: 'right' }}>Engagement Status</th>
                       </>
                     )}
                     {activeTab === 'Overdue Credit' && (
                       <>
                         <th style={S.th}>Customer Identity</th>
                         <th style={S.th}>Outstanding Debt</th>
                         <th style={S.th}>Maturity Duration</th>
                         <th style={{ ...S.th, textAlign: 'right' }}>Risk Assessment</th>
                       </>
                     )}
                  </tr>
               </thead>
               <tbody>
                  {activeTab === 'High Spenders' && highSpenders.map((h, i) => (
                    <tr key={i}>
                       <td style={S.td}><div style={{ fontWeight: 800 }}>{h.name}</div></td>
                       <td style={S.td}><span style={{ color: 'var(--primary)', fontWeight: 800 }}>{h.total}</span></td>
                       <td style={S.td}>{h.frequency}</td>
                       <td style={{ ...S.td, textAlign: 'right' }}><span className="chip chip-success">{h.loyalty}</span></td>
                    </tr>
                  ))}
                  {activeTab === 'Regular Customers' && regularCustomers.map((r, i) => (
                    <tr key={i}>
                       <td style={S.td}><div style={{ fontWeight: 800 }}>{r.name}</div></td>
                       <td style={S.td}><span style={{ color: 'var(--text-muted)' }}>{r.lastVisit}</span></td>
                       <td style={S.td}>{r.totalVisits} sessions</td>
                       <td style={{ ...S.td, textAlign: 'right' }}>
                          <span className={`chip ${r.status === 'Active' ? 'chip-success' : ''}`}>{r.status}</span>
                       </td>
                    </tr>
                  ))}
                  {activeTab === 'Overdue Credit' && overdueCredit.map((o, i) => (
                    <tr key={i}>
                       <td style={S.td}><div style={{ fontWeight: 800 }}>{o.name}</div></td>
                       <td style={S.td}><span style={{ color: '#ef4444', fontWeight: 800 }}>{o.amount}</span></td>
                       <td style={S.td}>{o.overdue}</td>
                       <td style={{ ...S.td, textAlign: 'right' }}>
                          <span className={`chip ${o.risk === 'High' ? 'chip-error' : ''}`} style={{ background: o.risk === 'High' ? '#ef4444' : '#f59e0b', color: '#fff' }}>{o.risk}</span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
          </div>
        </div>

        <aside>
           <div style={S.card}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Summary Metrics</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                 {[
                   { l: 'Retention Rate', v: '84%', i: TrendingUp, c: 'var(--primary)' },
                   { l: 'Credit Exposure', v: 'Rs. 42k', i: AlertTriangle, c: '#ef4444' },
                   { l: 'Loyalty Growth', v: '+24%', i: Star, c: '#3b82f6' }
                 ].map((s, i) => (
                   <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                         <p style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{s.l}</p>
                         <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: s.c }}>{s.v}</h2>
                      </div>
                      <div style={{ color: s.c }}><s.i size={28} /></div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div style={{ ...S.card, marginTop: '2rem', background: 'var(--bg-nav)', color: '#fff' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Automated Actions</h4>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                 Dispatched 12 loyalty rewards and 3 credit escalations based on current intelligence cycle.
              </p>
              <button className="btn btn-primary" style={{ width: '100%', background: '#fff', color: 'var(--bg-nav)' }}>Review System Logs <ArrowRight size={16} /></button>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default StaffReports;
