import React, { useState, useEffect, useCallback } from 'react';
import {
  Package, Search, Plus, Edit2, Trash2, ShieldCheck,
  Box, TrendingDown, ArrowRight, Tag, CheckCircle, RefreshCcw, X
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
  sku: '',
  category: '',
  price: '',
  stock: '',
  lowStockThreshold: '10',
  vendorId: '',
};

const PartsManagement = () => {
  const { authFetch } = useAuth();
  const { addNotification } = useNotification();
  const [parts, setParts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadParts = useCallback(async () => {
    setListLoading(true);
    setError(null);
    try {
      const res = await authFetch('/api/parts');
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || json.detail || 'Failed to load parts.');
        setParts([]);
        return;
      }
      setParts(Array.isArray(json.data) ? json.data : []);
    } catch (e) {
      setError('Network error while loading parts.');
      setParts([]);
    } finally {
      setListLoading(false);
    }
  }, [authFetch]);

  const loadVendors = useCallback(async () => {
    try {
      const res = await authFetch('/api/vendors/dropdown');
      const json = await res.json();
      if (res.ok && Array.isArray(json.data)) setVendors(json.data);
    } catch {
      /* optional for parts form */
    }
  }, [authFetch]);

  useEffect(() => {
    loadParts();
    loadVendors();
  }, [loadParts, loadVendors]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModal('add');
  };

  const openEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      sku: p.sku,
      category: p.category || '',
      price: String(p.price),
      stock: String(p.stock),
      lowStockThreshold: String(p.lowStockThreshold),
      vendorId: p.vendorId != null ? String(p.vendorId) : '',
    });
    setModal('edit');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload = {
      name: form.name.trim(),
      sku: form.sku.trim(),
      category: form.category.trim() || null,
      price: Number(form.price),
      stock: Number(form.stock),
      lowStockThreshold: Number(form.lowStockThreshold) || 10,
      vendorId: form.vendorId ? Number(form.vendorId) : null,
    };
    try {
      const url = modal === 'edit' ? `/api/parts/${editingId}` : '/api/parts';
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
      await loadParts();
    } catch {
      addNotification('Error', 'Request failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this part? This cannot be undone if the part is not on any invoice.')) return;
    try {
      const res = await authFetch(`/api/parts/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) {
        addNotification('Error', json.message || json.detail || 'Delete failed.', 'error');
        return;
      }
      addNotification('Success', 'Part removed.');
      await loadParts();
    } catch {
      addNotification('Error', 'Delete request failed.', 'error');
    }
  };

  const filtered = parts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    String(p.sku).toLowerCase().includes(search.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
  );

  const criticalCount = parts.filter((p) => p.stock < p.lowStockThreshold).length;

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
              The part was saved to the database.
            </p>
            <button type="button" className="btn btn-primary" onClick={() => setIsSuccess(false)} style={{ padding: '12px 40px' }}>
              <RefreshCcw size={18} /> Continue
            </button>
          </div>
        </div>
      )}

      {modal && (
        <div className="success-overlay" style={{ background: 'rgba(0,0,0,0.6)' }}>
          <div className="success-card" style={{ maxWidth: '500px', textAlign: 'left', background: '#fff', color: 'var(--text-primary)' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{modal === 'add' ? 'Register New Part' : 'Update Part'}</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Name</label>
                <input className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Part name" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>SKU</label>
                  <input className="input" required value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="Unique SKU" disabled={modal === 'edit'} />
                </div>
                <div>
                  <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Category</label>
                  <input className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Optional" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Price</label>
                  <input className="input" type="number" min="0" step="0.01" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div>
                  <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Stock</label>
                  <input className="input" type="number" min="0" required value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                </div>
                <div>
                  <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Low stock</label>
                  <input className="input" type="number" min="0" required value={form.lowStockThreshold} onChange={(e) => setForm({ ...form, lowStockThreshold: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="chip" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Vendor (optional)</label>
                <select className="input" value={form.vendorId} onChange={(e) => setForm({ ...form, vendorId: e.target.value })}>
                  <option value="">— None —</option>
                  {vendors.map((v) => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setModal(null)} style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <Box size={16} /> Asset Logistics Console
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Inventory <span style={{ color: 'var(--primary)' }}>Control</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Parts from the API (Admin).</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Register Part</button>
      </div>

      {error && (
        <div style={{ marginBottom: '1rem', padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', color: '#b91c1c' }}>
          {error}
        </div>
      )}

      <div style={S.layout}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                className="input"
                placeholder="Search by SKU, name, or category..."
                style={{ padding: '14px 14px 14px 50px' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-outline" style={{ padding: '14px 24px' }} onClick={loadParts} disabled={listLoading}>Refresh</button>
          </div>

          <div style={S.card}>
            {listLoading ? (
              <p style={{ padding: '2rem' }}>Loading parts…</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={S.th}>SKU</th>
                    <th style={S.th}>Part</th>
                    <th style={S.th}>Stock</th>
                    <th style={S.th}>Unit price</th>
                    <th style={{ ...S.th, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ ...S.td, textAlign: 'center', color: 'var(--text-muted)' }}>No parts found.</td>
                    </tr>
                  ) : (
                    filtered.map((part) => {
                      const healthy = part.stock >= part.lowStockThreshold;
                      return (
                        <tr key={part.id}>
                          <td style={S.td}>
                            <div style={{ fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Tag size={12} /> {part.sku}
                            </div>
                          </td>
                          <td style={S.td}>
                            <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{part.name}</div>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>{part.category || '—'}{part.vendorName ? ` · ${part.vendorName}` : ''}</div>
                          </td>
                          <td style={S.td}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: healthy ? 'var(--text-primary)' : '#ef4444' }}>{part.stock}</span>
                              <span className={`chip ${healthy ? 'chip-success' : ''}`} style={{ fontSize: '9px' }}>
                                {healthy ? <CheckCircle size={12} /> : <X size={12} />} {healthy ? 'OK' : 'Low'}
                              </span>
                            </div>
                          </td>
                          <td style={S.td}><span style={{ fontWeight: 800 }}>Rs. {Number(part.price).toLocaleString()}</span></td>
                          <td style={{ ...S.td, textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button type="button" className="btn btn-outline" style={{ padding: '8px' }} onClick={() => openEdit(part)}><Edit2 size={14} /></button>
                              <button type="button" className="btn btn-outline" style={{ padding: '8px', color: '#ef4444', borderColor: '#ef444420' }} onClick={() => handleDelete(part.id)}><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <aside>
          <div style={S.sidebarCard}>
            <h4 style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2rem', letterSpacing: '0.1em' }}>
              <ShieldCheck size={20} /> Summary
            </h4>
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, opacity: 0.5, marginBottom: '10px', textTransform: 'uppercase' }}>Total SKUs</p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>{parts.length}</p>
            </div>
            <div style={{ padding: '1.25rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '20px', border: '1.5px solid rgba(239, 68, 68, 0.2)', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', marginBottom: '8px' }}>
                <TrendingDown size={16} /> <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' }}>Below threshold</span>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{criticalCount} part(s) have stock below their low-stock threshold.</p>
            </div>
            <button type="button" className="btn btn-primary" style={{ width: '100%', background: '#fff', color: 'var(--bg-nav)' }} onClick={loadParts}>
              Refresh data <ArrowRight size={18} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PartsManagement;
