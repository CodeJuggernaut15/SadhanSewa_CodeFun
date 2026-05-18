import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, ShoppingCart, Search, TrendingUp,
  ArrowRight, Clock, CheckCircle, AlertCircle,
  DollarSign, UserPlus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' },
  mainLayout: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '3.5rem' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '2rem', transition: 'all 0.3s ease' },
  th: { background: 'rgba(0,0,0,0.01)', padding: '1rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', borderBottom: '1.5px solid var(--border-color)' },
  td: { padding: '1.25rem 1.5rem', fontSize: '13px', borderBottom: '1.5px solid var(--border-color)', verticalAlign: 'middle' },
};

const formatAmount = (value) => `Rs. ${Number(value || 0).toLocaleString('en-IN')}`;

const StaffDashboard = () => {
  const { authFetch } = useAuth();
  const { addNotification } = useNotification();
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [reports, setReports] = useState({ overdueCredit: [] });
  const [appointments, setAppointments] = useState([]);
  const [partRequests, setPartRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const [salesRes, customersRes, reportsRes, appointmentsRes, requestsRes] = await Promise.all([
        authFetch('/api/sales-invoices'),
        authFetch('/api/customers'),
        authFetch('/api/customers/reports'),
        authFetch('/api/appointments'),
        authFetch('/api/part-requests')
      ]);

      const [salesJson, customersJson, reportsJson, appointmentsJson, requestsJson] = await Promise.all([
        salesRes.json(),
        customersRes.json(),
        reportsRes.json(),
        appointmentsRes.json(),
        requestsRes.json()
      ]);

      if (salesRes.ok && Array.isArray(salesJson.data)) setSales(salesJson.data);
      if (customersRes.ok && Array.isArray(customersJson.data)) setCustomers(customersJson.data);
      if (reportsRes.ok && reportsJson.data) setReports(reportsJson.data);
      if (appointmentsRes.ok && Array.isArray(appointmentsJson.data)) setAppointments(appointmentsJson.data);
      if (requestsRes.ok && Array.isArray(requestsJson.data)) setPartRequests(requestsJson.data);
    } catch {
      addNotification('Error', 'Failed to load staff dashboard data.', 'error');
    } finally {
      setLoading(false);
    }
  }, [authFetch, addNotification]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const today = new Date().toISOString().slice(0, 10);
  const todaySales = sales.filter(s => String(s.createdAt || '').slice(0, 10) === today);
  const todayRevenue = todaySales.reduce((sum, sale) => sum + Number(sale.totalAmount || 0), 0);
  const pendingTasks = appointments.filter(a => a.status === 'Pending').length + partRequests.filter(r => r.status === 'Pending').length;

  const filteredSales = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return sales.slice(0, 8);
    return sales.filter(s =>
      String(s.invoiceNumber || '').toLowerCase().includes(term) ||
      String(s.customerName || '').toLowerCase().includes(term) ||
      s.items?.some(item => String(item.sku || item.partName || '').toLowerCase().includes(term))
    ).slice(0, 8);
  }, [sales, search]);

  const stats = [
    { l: "Today's Sales", v: formatAmount(todayRevenue), c: `${todaySales.length} invoice(s)`, i: DollarSign, color: 'var(--primary)' },
    { l: 'Transactions', v: sales.length, c: 'Total', i: ShoppingCart, color: '#3b82f6' },
    { l: 'Customers', v: customers.length, c: 'Registered', i: Users, color: '#8b5cf6' },
    { l: 'Pending Tasks', v: pendingTasks, c: 'Open', i: Clock, color: 'var(--warning)' }
  ];

  return (
    <div style={S.page} className="page-transition">
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <TrendingUp size={16} /> Operational Command
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Staff <span style={{ color: 'var(--primary)' }}>Hub</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Daily operations and customer management dashboard.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/staff/customer-registration" className="btn btn-outline" style={{ textDecoration: 'none' }}><UserPlus size={18} /> New Customer</Link>
          <Link to="/staff/sales" className="btn btn-primary" style={{ textDecoration: 'none' }}><ShoppingCart size={18} /> New Sale</Link>
        </div>
      </div>

      <div style={S.grid}>
        {stats.map((s, i) => (
          <div key={i} style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}10`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><s.i size={22} /></div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: s.color, background: `${s.color}10`, padding: '4px 10px', borderRadius: '6px' }}>{s.c}</span>
            </div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{s.l}</p>
            <p style={{ fontSize: '1.8rem', fontWeight: 800, margin: '4px 0', color: 'var(--text-primary)' }}>{loading ? '...' : s.v}</p>
          </div>
        ))}
      </div>

      <div style={S.mainLayout}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 800, color: 'var(--text-primary)' }}>Recent Sales Invoices</h3>
              <Link to="/staff/sales" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px', textDecoration: 'none' }}>Open POS</Link>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={S.th}>Invoice</th>
                  <th style={S.th}>Customer</th>
                  <th style={S.th}>Value</th>
                  <th style={S.th}>Status</th>
                  <th style={{ ...S.th, textAlign: 'right' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.length === 0 ? (
                  <tr><td colSpan={5} style={{ ...S.td, textAlign: 'center', color: 'var(--text-muted)' }}>No records found.</td></tr>
                ) : filteredSales.map(tx => (
                  <tr key={tx.id}>
                    <td style={S.td}><span style={{ color: 'var(--primary)', fontWeight: 800 }}>{tx.invoiceNumber}</span></td>
                    <td style={S.td}><span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{tx.customerName || 'Walk-in'}</span></td>
                    <td style={S.td}><span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{formatAmount(tx.totalAmount)}</span></td>
                    <td style={S.td}>
                      <span className={`chip ${tx.paymentStatus === 'Paid' ? 'chip-success' : ''}`}>
                        {tx.paymentStatus === 'Paid' ? <CheckCircle size={12} /> : <Clock size={12} />} {tx.paymentStatus}
                      </span>
                    </td>
                    <td style={{ ...S.td, textAlign: 'right', color: 'var(--text-muted)' }}>{new Date(tx.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside>
          <div style={{ ...S.card, background: 'var(--bg-nav)', color: 'var(--text-on-nav)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <Search size={20} /> Quick Search
            </h4>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '10px', fontWeight: 800, opacity: 0.5, marginBottom: '8px', display: 'block', textTransform: 'uppercase' }}>Find Customer or SKU</label>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                <input
                  className="input"
                  placeholder="Invoice, name or SKU..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-on-nav)', paddingLeft: '40px' }}
                />
              </div>
            </div>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1.5px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-on-nav)', opacity: 0.6, lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Open the POS terminal to create a new sales invoice or register a customer before checkout.
              </p>
              <Link to="/staff/sales" className="btn btn-primary" style={{ width: '100%', background: 'var(--text-on-nav)', color: 'var(--bg-nav)', border: 'none', textDecoration: 'none' }}>Initialize POS <ArrowRight size={16} /></Link>
            </div>
          </div>

          <div style={{ ...S.card, marginTop: '1.5rem', background: 'var(--warning-bg)', borderColor: 'var(--warning)' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1rem', color: 'var(--warning)' }}>
              <AlertCircle size={20} />
              <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Action Required</h4>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
              {(reports.overdueCredit || []).length} customer credit account(s) need follow-up.
            </p>
            <Link to="/staff/reports" className="btn btn-outline" style={{ width: '100%', borderColor: 'var(--warning)', color: 'var(--warning)', background: 'transparent', textDecoration: 'none' }}>Review Credit Hub</Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StaffDashboard;
