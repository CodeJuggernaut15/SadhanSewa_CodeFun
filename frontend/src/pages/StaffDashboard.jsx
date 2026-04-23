import React from 'react';
import { 
  Users, ShoppingCart, Search, TrendingUp, 
  ArrowRight, Clock, CheckCircle, AlertCircle, 
  DollarSign, Package, UserPlus 
} from 'lucide-react';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' },
  mainLayout: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '3.5rem' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '2rem', transition: 'all 0.3s ease' },
  th: { background: 'rgba(0,0,0,0.01)', padding: '1rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', borderBottom: '1.5px solid var(--border-color)' },
  td: { padding: '1.25rem 1.5rem', fontSize: '13px', borderBottom: '1.5px solid var(--border-color)', verticalAlign: 'middle' },
};

const StaffDashboard = () => {
  const transactions = [
    { id: 'TX-4401', customer: 'Aarav Sharma', amount: 'Rs. 4,500', status: 'Completed', time: '10 mins ago' },
    { id: 'TX-4402', customer: 'Sita Thapa', amount: 'Rs. 1,200', status: 'Pending', time: '25 mins ago' },
    { id: 'TX-4403', customer: 'Ram Bahadur', amount: 'Rs. 8,900', status: 'Completed', time: '1 hour ago' },
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
          <button className="btn btn-outline"><UserPlus size={18} /> New Customer</button>
          <button className="btn btn-primary"><ShoppingCart size={18} /> New Sale</button>
        </div>
      </div>

      <div style={S.grid}>
        {[
          { l: "Today's Sales", v: 'Rs. 42,800', c: '+15%', i: DollarSign, color: 'var(--primary)' },
          { l: 'Transactions', v: '24', c: 'Active', i: ShoppingCart, color: '#3b82f6' },
          { l: 'New Customers', v: '08', c: '+2', i: Users, color: '#8b5cf6' },
          { l: 'Pending Tasks', v: '05', c: 'High', i: Clock, color: '#f59e0b' }
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

      <div style={S.mainLayout}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 800 }}>Recent Transactions</h3>
              <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px' }}>View All</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={S.th}>Transaction ID</th>
                  <th style={S.th}>Customer</th>
                  <th style={S.th}>Value</th>
                  <th style={S.th}>Status</th>
                  <th style={{ ...S.th, textAlign: 'right' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id}>
                    <td style={S.td}><span style={{ color: 'var(--primary)', fontWeight: 800 }}>{tx.id}</span></td>
                    <td style={S.td}>{tx.customer}</td>
                    <td style={S.td}><span style={{ fontWeight: 800 }}>{tx.amount}</span></td>
                    <td style={S.td}>
                      <span className={`chip ${tx.status === 'Completed' ? 'chip-success' : ''}`}>
                        {tx.status === 'Completed' ? <CheckCircle size={12} /> : <Clock size={12} />} {tx.status}
                      </span>
                    </td>
                    <td style={{ ...S.td, textAlign: 'right', color: 'var(--text-muted)' }}>{tx.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside>
          <div style={{ ...S.card, background: 'var(--bg-nav)', color: '#fff' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <Search size={20} /> Quick Search
            </h4>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '10px', fontWeight: 800, opacity: 0.5, marginBottom: '8px', display: 'block', textTransform: 'uppercase' }}>Find Customer or SKU</label>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                <input 
                  className="input" 
                  placeholder="ID, Name or Phone..." 
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', paddingLeft: '40px' }} 
                />
              </div>
            </div>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1.5px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Search through active customer profiles or scan product SKUs for instant POS integration.
              </p>
              <button className="btn btn-primary" style={{ width: '100%', background: '#fff', color: 'var(--bg-nav)' }}>Initialize POS <ArrowRight size={16} /></button>
            </div>
          </div>
          
          <div style={{ ...S.card, marginTop: '1.5rem', background: '#fef3c7', borderColor: '#fde68a' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1rem', color: '#d97706' }}>
              <AlertCircle size={20} />
              <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Action Required</h4>
            </div>
            <p style={{ fontSize: '13px', color: '#92400e', lineHeight: 1.5, marginBottom: '1rem' }}>
              3 credit balances have exceeded the 30-day threshold. Automated reminders scheduled for dispatch.
            </p>
            <button className="btn btn-outline" style={{ width: '100%', borderColor: '#d9770620', color: '#d97706' }}>Review Credit Hub</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StaffDashboard;
