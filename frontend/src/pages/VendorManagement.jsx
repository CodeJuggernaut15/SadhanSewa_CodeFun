import React, { useState } from 'react';
import {
  Truck, Package, Search, Mail, Plus, MapPin,
  PhoneCall, Activity, ArrowRight, ExternalLink,
  Globe, ChevronRight, Edit2, Trash2, X, Check,
  UserPlus, CheckCircle, RefreshCcw, ShieldCheck
} from 'lucide-react';

const INITIAL_VENDORS = [
  { id: 1, name: 'Nepal Auto Parts', location: 'Kathmandu', contact: '+977-1-4234567', category: 'Engine Components', status: 'Active', email: 'supply@nepalauto.com', orders: 34, spent: 'Rs. 1,24,000' },
  { id: 2, name: 'Prashi Tyres & Spares', location: 'Itahari', contact: '+977-21-509876', category: 'Wheels & Tyres', status: 'Inactive', email: 'info@prashityres.com', orders: 12, spent: 'Rs. 48,500' },
  { id: 3, name: 'Kriti Lubricants', location: 'Pokhara', contact: '+977-61-445566', category: 'Oil & Lubricants', status: 'Active', email: 'sales@kritilubs.com', orders: 58, spent: 'Rs. 2,10,800' }
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

const VendorManagement = () => {
  const [vendors, setVendors] = useState(INITIAL_VENDORS);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // 'add' | 'edit'
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const filtered = vendors.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) || 
    v.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModal(null);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div style={S.page} className="page-transition">
      {isSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="icon-circle">
              <Truck size={40} />
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Supplier Integrated!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              The procurement channel has been successfully validated and added to the Global Fiscal Manifest.
            </p>
            <button className="btn btn-primary" onClick={() => setIsSuccess(false)} style={{ padding: '12px 40px' }}><RefreshCcw size={18} /> Continue Operations</button>
          </div>
        </div>
      )}

      {modal && (
        <div className="success-overlay" style={{ background: 'rgba(0,0,0,0.6)' }}>
          <div className="success-card" style={{ maxWidth: '500px', textAlign: 'left', background: '#fff', color: 'var(--text-primary)' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{modal === 'add' ? 'Integrate New Supplier' : 'Update Supplier Manifest'}</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '8px' }}>Company Identity</label>
                <input className="input" required placeholder="e.g. Nepal Auto Parts" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '8px' }}>Asset Category</label>
                  <input className="input" required placeholder="Engine, Tyres, etc." />
                </div>
                <div>
                  <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '8px' }}>Global Status</label>
                  <select className="input" style={{ appearance: 'auto' }}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '8px' }}>Contact Terminal (Email)</label>
                <input className="input" type="email" required placeholder="supply@vendor.com" />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setModal(null)} style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>{loading ? 'Processing...' : 'Complete Manifest'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <Globe size={16} /> Global Procurement Network
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Supplier <span style={{ color: 'var(--primary)' }}>Ecosystem</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Managing strategic procurement channels and logistic partner relations.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('add')}><Plus size={18} /> Add New Supplier</button>
      </div>

      <div style={S.layout}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                className="input" 
                placeholder="Search suppliers by name, category, or location..." 
                style={{ padding: '14px 14px 14px 50px' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="btn btn-outline" style={{ padding: '14px 24px' }}>Filter Results</button>
          </div>

          <div style={S.card}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={S.th}>Supplier Personnel</th>
                  <th style={S.th}>Functional Category</th>
                  <th style={S.th}>Gross Yield</th>
                  <th style={S.th}>Status</th>
                  <th style={{ ...S.th, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(vendor => (
                  <tr key={vendor.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                    <td style={S.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary)10', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                          {vendor.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1rem' }}>{vendor.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{vendor.location}</div>
                        </div>
                      </div>
                    </td>
                    <td style={S.td}>
                      <div className="chip" style={{ background: 'none', padding: 0 }}>
                        <Package size={14} color="var(--primary)" opacity={0.6} />
                        <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>{vendor.category}</span>
                      </div>
                    </td>
                    <td style={S.td}>
                      <div style={{ fontWeight: 800, color: 'var(--primary)' }}>{vendor.spent}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>{vendor.orders} MANIFESTS</div>
                    </td>
                    <td style={S.td}>
                      <span className={`chip ${vendor.status === 'Active' ? 'chip-success' : ''}`}>
                        {vendor.status === 'Active' ? <CheckCircle size={12} /> : <X size={12} />} {vendor.status}
                      </span>
                    </td>
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
              <Activity size={20} /> Network Pulse
            </h4>
            
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1.5px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, opacity: 0.5, marginBottom: '10px' }}>Active Procurement Flow</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800 }}>186</span>
                <span className="chip chip-success" style={{ padding: '4px 10px' }}>+12%</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--primary)15', borderRadius: '20px', border: '1.5px solid var(--primary)30', marginBottom: '2.5rem' }}>
              <h5 style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem' }}>Financial Liability</h5>
              <div>
                <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Rs. 85,000</p>
                <p style={{ fontSize: '10px', opacity: 0.6, textTransform: 'uppercase', fontWeight: 800, marginTop: '4px' }}>Unsettled Vendor Balance</p>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', background: '#fff', color: 'var(--bg-nav)' }}>Initialize Supply Audit <ArrowRight size={18} /></button>
          </div>

          <div style={{ marginTop: '2.5rem', background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '1.5rem' }}>
            <h5 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="var(--primary)" /> Secure Supply
            </h5>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>All supply partners undergo mandatory structural integrity verification every 90 days.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default VendorManagement;