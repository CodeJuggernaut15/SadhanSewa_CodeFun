// This page is for managing the vehicle parts in our store.
// It helps staff track how many parts are in stock and their prices.
import React, { useState } from 'react';
import { 
  Package, Search, Filter, Plus, Edit2, Trash2, ShieldCheck, 
  Box, TrendingDown, ArrowRight, Clock, Tag, CheckCircle, RefreshCcw, X 
} from 'lucide-react';

// This is a sample list of parts available in the inventory.
const INITIAL_PARTS = [
  { id: "P-001", name: "Engine Air Filter", category: "Filtration", stock: 12, price: 850, status: "Healthy" },
  { id: "P-042", name: "Brake Pads (Premium)", category: "Braking", stock: 4, price: 2400, status: "Critical" },
  { id: "P-109", name: "Synthetic Oil (5L)", category: "Lubricants", stock: 28, price: 4500, status: "Healthy" },
  { id: "P-067", name: "Spark Plugs (Platinum)", category: "Ignition", stock: 8, price: 320, status: "Healthy" }
];

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  layout: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '3.5rem', alignItems: 'start' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', overflow: 'hidden' },
  th: { background: 'rgba(0,0,0,0.01)', padding: '1.25rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', borderBottom: '1.5px solid var(--border-color)' },
  td: { padding: '1.5rem 1.5rem', fontSize: '14px', borderBottom: '1.5px solid var(--border-color)', verticalAlign: 'middle' },
  sidebarCard: { background: 'var(--bg-nav)', borderRadius: '32px', padding: '2.5rem', color: '#fff', position: 'sticky', top: '2.5rem' },
};

const PartsManagement = () => {
  const [parts, setParts] = useState(INITIAL_PARTS);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // 'add' | 'edit'
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const filtered = parts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  // This function saves the details of a new or updated part.
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModal(null);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div style={S.page} className="page-transition">
      {isSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="icon-circle">
              <Package size={40} />
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>SKU Registered!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              The vehicle component has been successfully logged into the global manifest and allocated to active stock.
            </p>
            <button className="btn btn-primary" onClick={() => setIsSuccess(false)} style={{ padding: '12px 40px' }}><RefreshCcw size={18} /> Continue Logistics</button>
          </div>
        </div>
      )}

      {modal && (
        <div className="success-overlay" style={{ background: 'rgba(0,0,0,0.6)' }}>
          <div className="success-card" style={{ maxWidth: '500px', textAlign: 'left', background: '#fff', color: 'var(--text-primary)' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{modal === 'add' ? 'Register New Component' : 'Update Component Specs'}</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '8px' }}>Component Name</label>
                <input className="input" required placeholder="e.g. Brake Pad Set (Premium)" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '8px' }}>Asset Category</label>
                  <input className="input" required placeholder="Braking, Lubricants, etc." />
                </div>
                <div>
                  <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '8px' }}>Unit Value (Rs.)</label>
                  <input className="input" type="number" required placeholder="0.00" />
                </div>
              </div>
              <div>
                <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '8px' }}>Initial Liquidity (Stock Quantity)</label>
                <input className="input" type="number" required placeholder="Quantity" />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setModal(null)} style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>{loading ? 'Processing...' : 'Sync Manifest'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header: Shows the title and a button to add a new part to the list. */}
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <Box size={16} /> Asset Logistics Console
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Inventory <span style={{ color: 'var(--primary)' }}>Control</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Granular tracking of vehicle components and supply chain integrity.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('add')}><Plus size={18} /> Register Component</button>
      </div>

      <div style={S.layout}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                className="input" 
                placeholder="Search catalog by SKU, name, or category..." 
                style={{ padding: '14px 14px 14px 50px' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="btn btn-outline" style={{ padding: '14px 24px' }}>Filter Results</button>
          </div>

          {/* Inventory Table: Lists all parts with their ID, name, stock level, and price. */}
          <div style={S.card}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={S.th}>SKU Identity</th>
                  <th style={S.th}>Component Profile</th>
                  <th style={S.th}>Stock Scale</th>
                  <th style={S.th}>Unit Value</th>
                  <th style={{ ...S.th, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(part => (
                  <tr key={part.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                    <td style={S.td}>
                      <div style={{ fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Tag size={12} /> {part.id}
                      </div>
                    </td>
                    <td style={S.td}>
                      <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.1rem' }}>{part.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginTop: '4px' }}>{part.category}</div>
                    </td>
                    <td style={S.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: part.stock < 10 ? '#ef4444' : 'var(--text-primary)' }}>{part.stock}</span>
                        <span className={`chip ${part.status === 'Healthy' ? 'chip-success' : ''}`} style={{ fontSize: '9px' }}>
                          {part.status === 'Healthy' ? <CheckCircle size={12} /> : <X size={12} />} {part.status}
                        </span>
                      </div>
                    </td>
                    <td style={S.td}><span style={{ fontWeight: 800 }}>Rs. {part.price}</span></td>
                    <td style={{ ...S.td, textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button className="btn btn-outline" style={{ padding: '8px' }} onClick={() => setModal('edit')}><Edit2 size={14} /></button>
                        <button className="btn btn-outline" style={{ padding: '8px', color: '#ef4444', borderColor: '#ef444420' }}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside>
          <div style={S.sidebarCard}>
            <h4 style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2.5rem', letterSpacing: '0.1em' }}>
              <ShieldCheck size={20} /> Integrity Audit
            </h4>
            
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, opacity: 0.5, marginBottom: '10px', textTransform: 'uppercase' }}>Inventory Health</p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>92%</p>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: '92%', height: '100%', background: 'var(--primary)' }}></div>
              </div>
            </div>

            <div style={{ padding: '1.25rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '20px', border: '1.5px solid rgba(239, 68, 68, 0.2)', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', marginBottom: '8px' }}>
                <TrendingDown size={16} /> <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' }}>Threshold Trigger</span>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Detected 4 critical component breaches. Maintenance reorder protocol manual engagement recommended.</p>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', background: '#fff', color: 'var(--bg-nav)' }}>Run SKU Full Audit <ArrowRight size={18} /></button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PartsManagement;
