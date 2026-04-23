import React, { useState } from 'react';
import { 
  BarChart3, Calendar, Download, Filter, 
  TrendingUp, TrendingDown, DollarSign, 
  FileText, ArrowUpRight, Search, 
  RefreshCcw, CheckCircle, PieChart 
} from 'lucide-react';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  grid: { display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '3.5rem', marginBottom: '3rem' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '2rem' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' },
  th: { background: 'rgba(0,0,0,0.01)', padding: '1rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', borderBottom: '1.5px solid var(--border-color)' },
  td: { padding: '1.25rem 1.5rem', fontSize: '13px', borderBottom: '1.5px solid var(--border-color)', verticalAlign: 'middle' },
};

const FinancialReports = () => {
  const [loading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  const reportData = [
    { date: '2026-04-23', type: 'Sales Revenue', amount: 'Rs. 42,800', margin: '22%', status: 'Audited' },
    { date: '2026-04-22', type: 'Parts Procurement', amount: 'Rs. 18,500', margin: 'N/A', status: 'Pending' },
    { date: '2026-04-21', type: 'Service Income', amount: 'Rs. 28,400', margin: '65%', status: 'Audited' },
    { date: '2026-04-20', type: 'Sales Revenue', amount: 'Rs. 35,200', margin: '18%', status: 'Audited' },
  ];

  return (
    <div style={S.page} className="page-transition">
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <BarChart3 size={16} /> Fiscal Transparency Dashboard
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Financial <span style={{ color: 'var(--primary)' }}>Reports</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Comprehensive audit of revenue flow and expenditure margins.</p>
        </div>
        <button className="btn btn-primary" onClick={handleExport} disabled={isExporting}>
          {isExporting ? 'Generating Bundle...' : <><Download size={18} /> Export Audit Bundle</>}
        </button>
      </div>

      <div style={S.statsGrid}>
        {[
          { l: 'Total Revenue (Period)', v: 'Rs. 124,900', c: '+12.5%', i: TrendingUp, color: 'var(--primary)' },
          { l: 'Avg. Profit Margin', v: '32.8%', c: 'Healthy', i: PieChart, color: '#3b82f6' },
          { l: 'Outstanding Credit', v: 'Rs. 24,500', c: 'High Risk', i: TrendingDown, color: '#ef4444' }
        ].map((s, i) => (
          <div key={i} style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}10`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><s.i size={22} /></div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: s.color, background: `${s.color}10`, padding: '4px 10px', borderRadius: '6px' }}>{s.c}</span>
            </div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{s.l}</p>
            <p style={{ fontSize: '1.8rem', fontWeight: 800, margin: '4px 0' }}>{s.v}</p>
          </div>
        ))}
      </div>

      <div style={S.grid}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
               <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 800 }}>Audit Timeline</h3>
               <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input className="input" placeholder="Search entries..." style={{ paddingLeft: '40px', fontSize: '12px', width: '200px' }} />
                  </div>
                  <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px' }}><Filter size={16} /> Filters</button>
               </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={S.th}>Settlement Date</th>
                  <th style={S.th}>Transaction Type</th>
                  <th style={S.th}>Monetary Value</th>
                  <th style={S.th}>Yield Margin</th>
                  <th style={{ ...S.th, textAlign: 'right' }}>Audit Status</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, i) => (
                  <tr key={i}>
                    <td style={S.td}><span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{row.date}</span></td>
                    <td style={S.td}><div style={{ fontWeight: 800 }}>{row.type}</div></td>
                    <td style={S.td}><span style={{ fontWeight: 800 }}>{row.amount}</span></td>
                    <td style={S.td}><span style={{ color: 'var(--primary)', fontWeight: 800 }}>{row.margin}</span></td>
                    <td style={{ ...S.td, textAlign: 'right' }}>
                      <span className={`chip ${row.status === 'Audited' ? 'chip-success' : ''}`}>
                        {row.status === 'Audited' ? <CheckCircle size={12} /> : <RefreshCcw size={12} />} {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside>
          <div style={{ ...S.card, background: 'var(--bg-nav)', color: '#fff' }}>
             <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Calendar size={20} /> Report Period
             </h4>

             <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
                {['Daily', 'Monthly', 'Yearly'].map(p => (
                  <button key={p} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '10px', flex: 1, borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>{p}</button>
                ))}
             </div>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '10px', fontWeight: 800, opacity: 0.5, marginBottom: '8px', display: 'block', textTransform: 'uppercase' }}>Commencement Date</label>
                  <input type="date" className="input" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} defaultValue="2026-04-01" />
                </div>
                <div>
                  <label style={{ fontSize: '10px', fontWeight: 800, opacity: 0.5, marginBottom: '8px', display: 'block', textTransform: 'uppercase' }}>Termination Date</label>
                  <input type="date" className="input" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} defaultValue="2026-04-30" />
                </div>
                <button className="btn btn-primary" style={{ width: '100%', background: '#fff', color: 'var(--bg-nav)', marginTop: '1rem' }} onClick={() => {
                  setLoading(true);
                  setTimeout(() => setLoading(false), 1000);
                }}>
                  {loading ? 'Re-auditing...' : <><RefreshCcw size={18} /> Synchronize Report</>}
                </button>
             </div>
          </div>
          
          <div style={{ ...S.card, marginTop: '2rem' }}>
             <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Insight Analytics</h4>
             <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                Revenue yield has increased by **12.5%** compared to the previous fiscal quarter, primarily driven by **Synthetic Oil** sales.
             </p>
             <div style={{ display: 'flex', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '12px', alignItems: 'center' }}>
                <ArrowUpRight size={16} /> VIEW COMPARATIVE ANALYSIS
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FinancialReports;
