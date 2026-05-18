import React, { useCallback, useEffect, useState } from 'react';
import { 
  Users, TrendingUp, AlertTriangle, 
  Download, Filter, ArrowUpRight, Search, ArrowRight,
  CheckCircle, Clock, PieChart, BarChart3, Star 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  grid: { display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '3.5rem', marginBottom: '3rem' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '2rem' },
  th: { background: 'rgba(0,0,0,0.01)', padding: '1rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', borderBottom: '1.5px solid var(--border-color)' },
  td: { padding: '1.25rem 1.5rem', fontSize: '13px', borderBottom: '1.5px solid var(--border-color)', verticalAlign: 'middle' },
};

const StaffReports = () => {
  const { authFetch } = useAuth();
  const [activeTab, setActiveTab] = useState('High Spenders');
  const [search, setSearch] = useState('');
  const [report, setReport] = useState({ highSpenders: [], regularCustomers: [], overdueCredit: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadReport = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await authFetch('/api/customers/reports');
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Could not load customer reports.');
      if (json.data) setReport(json.data);
    } catch (err) {
      setError(err.message || 'Could not load customer reports.');
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    loadReport().catch(() => {});
  }, [loadReport]);

  const includes = (value) => String(value || '').toLowerCase().includes(search.toLowerCase());
  const highSpenders = (report.highSpenders || []).filter(c => includes(c.fullName) || includes(c.email) || includes(c.phone));
  const regularCustomers = (report.regularCustomers || []).filter(c => includes(c.fullName) || includes(c.email) || includes(c.phone));
  const overdueCredit = (report.overdueCredit || []).filter(c => includes(c.name) || includes(c.email));
  const creditExposure = (report.overdueCredit || []).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const activeRows = activeTab === 'High Spenders' ? highSpenders : activeTab === 'Regular Customers' ? regularCustomers : overdueCredit;

  const exportReport = () => {
    const rows = activeTab === 'Overdue Credit'
      ? [['Customer', 'Email', 'Outstanding', 'Days Overdue', 'Risk'], ...overdueCredit.map(o => [o.name, o.email, o.amount, o.daysOverdue, o.risk])]
      : [['Customer', 'Email', 'Phone', 'Total Spent', 'Visits', 'Tier'], ...activeRows.map(c => [c.fullName, c.email, c.phone, c.totalSpent, c.visits, c.loyaltyTier])];

    const csv = rows.map(row => row.map(value => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `customer-report-${activeTab.toLowerCase().replaceAll(' ', '-')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

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
        <button className="btn btn-primary" onClick={exportReport} disabled={activeRows.length === 0}><Download size={18} /> Export Intelligence Bundle</button>
      </div>

      {error && (
        <div style={{ color: '#ef4444', padding: '1rem', background: '#fef2f2', borderRadius: '12px', border: '1px solid #fecaca', marginBottom: '2rem' }}>
          {error}
        </div>
      )}

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
                  <input className="input" placeholder="Search reports..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: '40px', fontSize: '12px', width: '200px' }} />
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
                  {loading && (
                    <tr><td colSpan={4} style={{ ...S.td, textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</td></tr>
                  )}
                  {!loading && activeRows.length === 0 && (
                    <tr><td colSpan={4} style={{ ...S.td, textAlign: 'center', color: 'var(--text-muted)' }}>No records found.</td></tr>
                  )}
                  {!loading && activeTab === 'High Spenders' && highSpenders.map((h) => (
                    <tr key={h.id}>
                       <td style={S.td}><div style={{ fontWeight: 800 }}>{h.fullName}</div></td>
                       <td style={S.td}><span style={{ color: 'var(--primary)', fontWeight: 800 }}>Rs. {Number(h.totalSpent || 0).toLocaleString()}</span></td>
                       <td style={S.td}>{h.visits} orders</td>
                       <td style={{ ...S.td, textAlign: 'right' }}><span className="chip chip-success">{h.loyaltyTier}</span></td>
                    </tr>
                  ))}
                  {!loading && activeTab === 'Regular Customers' && regularCustomers.map((r) => (
                    <tr key={r.id}>
                       <td style={S.td}><div style={{ fontWeight: 800 }}>{r.fullName}</div></td>
                       <td style={S.td}><span style={{ color: 'var(--text-muted)' }}>{r.email}</span></td>
                       <td style={S.td}>{r.visits} sessions</td>
                       <td style={{ ...S.td, textAlign: 'right' }}>
                          <span className={`chip ${r.isActive ? 'chip-success' : ''}`}>{r.isActive ? 'Active' : 'Inactive'}</span>
                       </td>
                    </tr>
                  ))}
                  {!loading && activeTab === 'Overdue Credit' && overdueCredit.map((o) => (
                    <tr key={o.customerId}>
                       <td style={S.td}><div style={{ fontWeight: 800 }}>{o.name}</div></td>
                       <td style={S.td}><span style={{ color: '#ef4444', fontWeight: 800 }}>Rs. {Number(o.amount || 0).toLocaleString()}</span></td>
                       <td style={S.td}>{o.daysOverdue} Days</td>
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
                   { l: 'High Spenders', v: (report.highSpenders || []).length, i: TrendingUp, c: 'var(--primary)' },
                   { l: 'Credit Exposure', v: `Rs. ${creditExposure.toLocaleString('en-IN')}`, i: AlertTriangle, c: '#ef4444' },
                   { l: 'Regular Customers', v: (report.regularCustomers || []).length, i: Star, c: '#3b82f6' }
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
                 Review loyalty discounts and pending credit follow-ups from this page.
              </p>
              <button className="btn btn-primary" style={{ width: '100%', background: '#fff', color: 'var(--bg-nav)' }}>Review System Logs <ArrowRight size={16} /></button>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default StaffReports;
