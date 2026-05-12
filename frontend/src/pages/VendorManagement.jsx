import React, { useState, useEffect, useCallback } from 'react';
import {
  Truck, Package, Search, Plus, MapPin,
  PhoneCall, Activity, ArrowRight,
  Globe, Edit2, Trash2, X,
  CheckCircle, RefreshCcw, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  layout: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '3.5rem', alignItems: 'start' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', overflow: 'hidden' },
  th: { background: 'rgba(0,0,0,0.01)', padding: '1.25rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', borderBottom: '1.5px solid var(--border-color)' },
  td: { padding: '1.5rem 1.5rem', fontSize: '14px', borderBottom: '1.5px solid var(--border-color)', verticalAlign: 'middle' },
  sidebarCard: { background: 'var(--bg-nav)', borderRadius: '32px', padding: '2.5rem', color: '#fff', position: 'sticky', top: '2.5rem' },
};

const emptyForm = {
  name: '',
  location: '',
  contact: '',
  email: '',
  category: '',
  status: 'Active',
};

const VendorManagement = () => {
  const { authFetch } = useAuth();
  const { addNotification } = useNotification();

  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // 'add' | 'edit'
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState(null);

  // load all vendors from backend
  const loadVendors = useCallback(async () => {
    setListLoading(true);
    setError(null);
    try {
      const res = await authFetch('/api/vendors');
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || json.detail || 'Failed to load vendors.');
        setVendors([]);
        return;
      }
      setVendors(Array.isArray(json.data) ? json.data : []);
    } catch {
      setError('Network error while loading vendors.');
      setVendors([]);
    } finally {
      setListLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    loadVendors();
  }, [loadVendors]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModal('add');
  };

  const openEdit = (v) => {
    setEditingId(v.id);
    setForm({
      name: v.name,
      location: v.location || '',
      contact: v.contact || '',
      email: v.email || '',
      category: v.category || '',
      status: v.status,
    });
    setModal('edit');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      name: form.name.trim(),
      location: form.location.trim() || null,
      contact: form.contact.trim() || null,
      email: form.email.trim() || null,
      category: form.category.trim() || null,
      status: form.status,
    };
    try {
      const url = modal === 'edit' ? `/api/vendors/${editingId}` : '/api/vendors';
      const method = modal === 'edit' ? 'PUT' : 'POST';
      const res = await authFetch(url, { method, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok) {
        addNotification('Error', json.message || json.detail || 'Save failed.', 'error');
        setLoading(false);
        return;
      }
      setModal(null);
      setIsSuccess(true);
      await loadVendors();
    } catch {
      addNotification('Error', 'Request failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this vendor? This will fail if the vendor has parts or invoices linked.')) return;
    try {
      const res = await authFetch(`/api/vendors/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) {
        addNotification('Error', json.message || json.detail || 'Delete failed.', 'error');
        return;
      }
      addNotification('Success', 'Vendor removed.');
      await loadVendors();
    } catch {
      addNotification('Error', 'Delete request failed.', 'error');
    }
  };

  const filtered = vendors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    (v.category && v.category.toLowerCase().includes(search.toLowerCase())) ||
    (v.location && v.location.toLowerCase().includes(search.toLowerCase()))
  );

  const activeCount = vendors.filter(v => v.status === 'Active').length;
  const inactiveCount = vendors.filter(v => v.status !== 'Active').length;

  return (
    <div style={S.page} className="page-transition">

      {/* success screen after save */}
      {isSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="icon-circle">
              <Truck size={40} />
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Vendor Saved!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              The vendor has been saved successfully.
            </p>
            <button className="btn btn-primary" onClick={() => setIsSuccess(false)} style={{ padding: '12px 40px' }}>
              <RefreshCcw size={18} /> Continue
            </button>
          </div>
        </div>
      )}

      {/* add / edit modal */}
      {modal && (
        <div className="success-overlay" style={{ background: 'rgba(0,0,0,0.6)' }}>
          <div className="success-card" style={{ maxWidth: '500px', textAlign: 'left', background: '#fff', color: 'var(--text-primary)' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
              {modal === 'add' ? 'Add New Vendor' : 'Update Vendor'}
            </h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

              <div>
                <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '6px' }}>Vendor Name *</label>
                <input className="input" name="name" required placeholder="e.g. Nepal Auto Parts" value={form.name} onChange={handleChange} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '6px' }}>Category</label>
                  <input className="input" name="category" placeholder="Engine, Tyres…" value={form.category} onChange={handleChange} />
                </div>
                <div>
                  <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '6px' }}>Status</label>
                  <select className="input" name="status" value={form.status} onChange={handleChange} style={{ appearance: 'auto' }}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '6px' }}>Location</label>
                <input className="input" name="location" placeholder="e.g. Kathmandu" value={form.location} onChange={handleChange} />
              </div>

              <div>
                <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '6px' }}>Contact</label>
                <input className="input" name="contact" placeholder="+977-1-4234567" value={form.contact} onChange={handleChange} />
              </div>

              <div>
                <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '6px' }}>Email</label>
                <input className="input" type="email" name="email" placeholder="supply@vendor.com" value={form.email} onChange={handleChange} />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setModal(null)} style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={loading}>
                  {loading ? 'Saving…' : modal === 'add' ? 'Add Vendor' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* page header */}
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <Globe size={16} /> Vendor Management
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Supplier <span style={{ color: 'var(--primary)' }}>Ecosystem</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Manage procurement partners and their details.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add New Vendor</button>
      </div>

      <div style={S.layout}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

          {/* search bar */}
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              className="input"
              placeholder="Search by name, category, or location…"
              style={{ padding: '14px 14px 14px 50px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* error state */}
          {error && (
            <div style={{ color: '#ef4444', padding: '1rem', background: '#fef2f2', borderRadius: '12px', border: '1px solid #fecaca' }}>
              {error}
            </div>
          )}

          {/* vendor table */}
          <div style={S.card}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={S.th}>Vendor</th>
                  <th style={S.th}>Category</th>
                  <th style={S.th}>Contact</th>
                  <th style={S.th}>Status</th>
                  <th style={{ ...S.th, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listLoading ? (
                  <tr>
                    <td colSpan={5} style={{ ...S.td, textAlign: 'center', color: 'var(--text-muted)' }}>Loading vendors…</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ ...S.td, textAlign: 'center', color: 'var(--text-muted)' }}>No vendors found.</td>
                  </tr>
                ) : filtered.map(vendor => (
                  <tr key={vendor.id}>
                    <td style={S.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {/* avatar with first letter */}
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary)20', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem' }}>
                          {vendor.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1rem' }}>{vendor.name}</div>
                          {vendor.location && (
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <MapPin size={10} /> {vendor.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={S.td}>
                      <div className="chip" style={{ background: 'none', padding: 0 }}>
                        <Package size={14} color="var(--primary)" opacity={0.6} />
                        <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>{vendor.category || '—'}</span>
                      </div>
                    </td>
                    <td style={S.td}>
                      {vendor.contact && (
                        <div style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                          <PhoneCall size={13} /> {vendor.contact}
                        </div>
                      )}
                      {vendor.email && (
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>{vendor.email}</div>
                      )}
                    </td>
                    <td style={S.td}>
                      <span className={`chip ${vendor.status === 'Active' ? 'chip-success' : ''}`}>
                        {vendor.status === 'Active' ? <CheckCircle size={12} /> : <X size={12} />} {vendor.status}
                      </span>
                    </td>
                    <td style={{ ...S.td, textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button className="btn btn-outline" style={{ padding: '8px' }} onClick={() => openEdit(vendor)}>
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="btn btn-outline"
                          style={{ padding: '8px', color: '#ef4444', borderColor: '#ef444420' }}
                          onClick={() => handleDelete(vendor.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* sidebar stats */}
        <aside>
          <div style={S.sidebarCard}>
            <h4 style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2.5rem', letterSpacing: '0.1em' }}>
              <Activity size={20} /> Network Pulse
            </h4>

            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1.5px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, opacity: 0.5, marginBottom: '10px' }}>Total Vendors</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800 }}>{vendors.length}</span>
                <span className="chip chip-success" style={{ padding: '4px 10px' }}>{activeCount} Active</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--primary)15', borderRadius: '20px', border: '1.5px solid var(--primary)30', marginBottom: '2.5rem' }}>
              <h5 style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem' }}>Inactive Vendors</h5>
              <div>
                <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{inactiveCount}</p>
                <p style={{ fontSize: '10px', opacity: 0.6, textTransform: 'uppercase', fontWeight: 800, marginTop: '4px' }}>Need Review</p>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', background: '#fff', color: 'var(--bg-nav)' }} onClick={openAdd}>
              Add Vendor <ArrowRight size={18} />
            </button>
          </div>

          <div style={{ marginTop: '2.5rem', background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '1.5rem' }}>
            <h5 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="var(--primary)" /> Note
            </h5>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Vendors with linked parts or purchase invoices cannot be deleted. Set them to Inactive instead.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default VendorManagement;
