import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  History, Search, Filter, Download,
  Tag, ShieldCheck, TrendingUp,
  Clock, AlertCircle, Car, Receipt, ArrowRight, RefreshCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', overflow: 'hidden' },
  tableHeader: { fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.01)', padding: '1.25rem 1.5rem', textAlign: 'left' },
};

const CustomerHistory = () => {
  const { user, authFetch } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadHistory = useCallback(async () => {
    if (!user?.userId) return;
    const res = await authFetch(`/api/customers/${user.userId}/history`);
    const json = await res.json();
    if (res.ok && Array.isArray(json.data)) setTransactions(json.data);
  }, [authFetch, user?.userId]);

  useEffect(() => {
    loadHistory().catch(() => {});
  }, [loadHistory]);

  const filtered = transactions.filter(t =>
    (t.name.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase())) &&
    (filter === 'all' || t.type.toLowerCase() === filter || t.status.toLowerCase() === filter)
  );

  const totals = useMemo(() => {
    const total = transactions.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const credit = transactions
      .filter(item => item.status !== 'Paid')
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
    return { total, credit };
  }, [transactions]);

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div style={S.page} className="page-transition">
      {isSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="icon-circle">
              <Download size={40} />
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Audit Exported!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              The current transaction list has been prepared from saved sales invoices.
            </p>
            <button className="btn btn-primary" onClick={() => setIsSuccess(false)} style={{ padding: '12px 40px' }}><RefreshCcw size={18} /> Acknowledge</button>
          </div>
        </div>
      )}

      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <History size={16} /> Purchase Records
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Transaction <span style={{ color: 'var(--primary)' }}>History</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Retrieving chronological records from real sales invoices.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select className="input" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ appearance: 'auto', width: 160 }}>
            <option value="all">All records</option>
            <option value="sale">Sales</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
          <button className="btn btn-outline"><Filter size={18} /> Filter</button>
          <button className="btn btn-primary" onClick={handleExport} disabled={loading}>
            {loading ? 'Exporting...' : <><Download size={18} /> Export Audit Log</>}
          </button>
        </div>
      </div>

      <div style={S.summaryGrid}>
        {[
          { label: 'Total Value Flow', value: `Rs. ${totals.total.toLocaleString()}`, icon: TrendingUp, color: '#10b981' },
          { label: 'Archived Records', value: `${transactions.length} Entries`, icon: Receipt, color: '#3b82f6' },
          { label: 'Pending Credits', value: `Rs. ${totals.credit.toLocaleString()}`, icon: AlertCircle, color: '#f59e0b' },
          { label: 'Last System Sync', value: transactions[0] ? new Date(transactions[0].date).toLocaleDateString() : 'No data', icon: Clock, color: '#8b5cf6' }
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: '1.25rem', background: '#fff' }}>
             <div style={{ width: 48, height: 48, borderRadius: 14, background: `${s.color}10`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={22} />
             </div>
             <div>
                <p style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{s.value}</p>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>{s.label}</p>
             </div>
          </div>
        ))}
      </div>

      <div style={S.card}>
        <div style={{ padding: '1.25rem 2rem', borderBottom: '1.5px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Omni-Channel Log</h3>
           <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                className="input"
                placeholder="Search by ID or part name..."
                style={{ padding: '10px 10px 10px 38px', width: '320px', fontSize: '13px' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={S.tableHeader}>Entry ID</th>
              <th style={S.tableHeader}>Transaction Detail</th>
              <th style={S.tableHeader}>Vehicle Association</th>
              <th style={S.tableHeader}>Gross Amount</th>
              <th style={S.tableHeader}>Current Status</th>
              <th style={{ ...S.tableHeader, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>No purchase records found.</td>
              </tr>
            ) : filtered.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                <td style={{ padding: '1.5rem 2rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      <Tag size={14} color="var(--primary)" /> {item.id}
                   </div>
                   <p style={{ margin: '4px 0 0', fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{new Date(item.date).toLocaleDateString()}</p>
                </td>
                <td style={{ padding: '1.5rem 2rem' }}>
                   <p style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>{item.name}</p>
                   <span className="chip" style={{ fontSize: '9px', background: '#8b5cf610', color: '#8b5cf6' }}>{item.type}</span>
                </td>
                <td style={{ padding: '1.5rem 2rem', fontSize: '13px', color: 'var(--text-secondary)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Car size={16} opacity={0.5} /> {item.vehicle}
                   </div>
                </td>
                <td style={{ padding: '1.5rem 2rem', fontWeight: 800, fontSize: '1.1rem' }}>Rs. {Number(item.amount || 0).toLocaleString()}</td>
                <td style={{ padding: '1.5rem 2rem' }}>
                   <span className={`chip ${item.status === 'Paid' ? 'chip-success' : 'chip-error'}`}>
                      <ShieldCheck size={12} /> {item.status}
                   </span>
                </td>
                <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                   <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px' }}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '3rem', background: 'var(--bg-nav)', borderRadius: '24px', padding: '2.5rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <ShieldCheck size={28} />
            </div>
            <div>
               <h4 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Loyalty Discount Active</h4>
               <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Sales invoices above Rs. 5,000 receive an automatic 10% discount.</p>
            </div>
         </div>
         <button className="btn btn-primary">Check Reward Status <ArrowRight size={18} /></button>
      </div>
    </div>
  );
};

export default CustomerHistory;
