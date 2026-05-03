import React, { useState, useEffect } from 'react';
import {
  BarChart3, Calendar, Download, Filter,
  TrendingUp, TrendingDown, DollarSign,
  FileText, ArrowUpRight, Search,
  RefreshCcw, CheckCircle, PieChart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
  const { authFetch } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [period, setPeriod] = useState('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReport();
  }, [period]);

  const fetchReport = async () => {
    setLoading(true);
    setError('');

    try {
      let query = `period=${period}`;
      if (startDate && endDate) query += `&startDate=${startDate}&endDate=${endDate}`;

      const res = await authFetch(`/api/financial-reports?${query}`);
      if (!res.ok) throw new Error(`Error ${res.status}`);

      const data = await res.json();
      setSummary(data.summary);
      setTransactions(data.transactions);
    } catch (err) {
      setError('Could not load report. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    const rows = [
      ['Date', 'Type', 'Amount', 'Margin', 'Status'],
      ...transactions.map(t => [t.date, t.type, t.amount, t.margin, t.status])
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-report-${period}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setIsExporting(false), 1000);
  };

  const formatAmount = (num) => `Rs. ${Number(num).toLocaleString('en-IN')}`;

  const statCards = [
    {
      label: 'Total Revenue (Period)',
      value: summary ? formatAmount(summary.totalRevenue) : '—',
      badge: summary ? `${summary.profitMargin}% margin` : '...',
      icon: TrendingUp,
      color: 'var(--primary)'
    },
    {
      label: 'Avg. Profit Margin',
      value: summary ? `${summary.profitMargin}%` : '—',
      badge: summary?.profitMargin > 20 ? 'Healthy' : 'Low',
      icon: PieChart,
      color: '#3b82f6'
    },
    {
      label: 'Outstanding Credit',
      value: summary ? formatAmount(summary.outstandingCredit) : '—',
      badge: summary?.outstandingCredit > 0 ? 'Needs Follow-up' : 'Clear',
      icon: TrendingDown,
      color: '#ef4444'
    }
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
        <button className="btn btn-primary" onClick={handleExport} disabled={isExporting || transactions.length === 0}>
          {isExporting ? 'Generating...' : <><Download size={18} /> Export Audit Bundle</>}
        </button>
      </div>

      {error && (
        <div style={{ background: 'var(--error-bg)', border: '1px solid var(--error)', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '2rem', color: 'var(--error)', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <div style={S.statsGrid}>
        {statCards.map((s, i) => (
          <div key={i} style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}15`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><s.icon size={22} /></div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: s.color, background: `${s.color}10`, padding: '4px 10px', borderRadius: '6px' }}>{s.badge}</span>
            </div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{s.label}</p>
            <p style={{ fontSize: '1.8rem', fontWeight: 800, margin: '4px 0', color: 'var(--text-primary)' }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={S.grid}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
               <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 800, color: 'var(--text-primary)' }}>Audit Timeline</h3>
               <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input className="input" placeholder="Search entries..." style={{ paddingLeft: '40px', fontSize: '12px', width: '200px', background: 'var(--bg-main)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} />
                  </div>
                  <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px' }}><Filter size={16} /> Filters</button>
               </div>
            </div>

            {loading ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Loading...</p>
            ) : transactions.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No transactions found for this period.</p>
            ) : (
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
                  {transactions.map((row, i) => (
                    <tr key={i}>
                      <td style={S.td}><span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{row.date}</span></td>
                      <td style={S.td}><div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{row.type}</div></td>
                      <td style={S.td}><span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{row.amount}</span></td>
                      <td style={S.td}><span style={{ color: 'var(--primary)', fontWeight: 800 }}>{row.margin}</span></td>
                      <td style={{ ...S.td, textAlign: 'right' }}>
                        <span className={`chip ${row.status === 'Paid' || row.status === 'Completed' ? 'chip-success' : ''}`}>
                          {row.status === 'Paid' || row.status === 'Completed' ? <CheckCircle size={12} /> : <RefreshCcw size={12} />} {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <aside>
          <div style={{ ...S.card, background: 'var(--bg-nav)', color: 'var(--text-on-nav)' }}>
             <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Calendar size={20} /> Report Period
             </h4>

             <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
                {['Daily', 'Monthly', 'Yearly'].map(p => (
                  <button
                    key={p}
                    className="btn btn-outline"
                    onClick={() => setPeriod(p.toLowerCase())}
                    style={{
                      padding: '6px 12px', fontSize: '10px', flex: 1,
                      borderColor: period === p.toLowerCase() ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                      color: period === p.toLowerCase() ? 'var(--primary)' : 'var(--text-on-nav)',
                      opacity: period === p.toLowerCase() ? 1 : 0.6,
                      fontWeight: period === p.toLowerCase() ? 800 : 400,
                      background: 'transparent'
                    }}
                  >{p}</button>
                ))}
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '10px', fontWeight: 800, opacity: 0.5, marginBottom: '8px', display: 'block', textTransform: 'uppercase' }}>Commencement Date</label>
                  <input type="date" className="input"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-on-nav)' }}
                    value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: '10px', fontWeight: 800, opacity: 0.5, marginBottom: '8px', display: 'block', textTransform: 'uppercase' }}>Termination Date</label>
                  <input type="date" className="input"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-on-nav)' }}
                    value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
                <button className="btn btn-primary"
                  style={{ width: '100%', background: 'var(--text-on-nav)', color: 'var(--bg-nav)', marginTop: '1rem', border: 'none' }}
                  onClick={fetchReport} disabled={loading}>
                  {loading ? 'Loading...' : <><RefreshCcw size={18} /> Synchronize Report</>}
                </button>
             </div>
          </div>

          <div style={{ ...S.card, marginTop: '2rem' }}>
             <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)' }}>Insight Analytics</h4>
             <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
               {summary
                 ? `Total revenue is ${formatAmount(summary.totalRevenue)} with a ${summary.profitMargin}% profit margin for the selected ${period} period.`
                 : 'Select a period and click Synchronize to view analytics.'}
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
