import React, { useState } from 'react';
import {
  Truck, Package, Search, Mail, Plus, MapPin,
  PhoneCall, Activity, ArrowRight, ExternalLink,
  Globe, ChevronRight, Edit2, Trash2, X, Check,
} from 'lucide-react';

/*  Data */
const INITIAL_VENDORS = [
  {
    id: 1,
    name: 'Nepal Auto Parts',
    location: 'Kathmandu',
    contact: '+977-1-4234567',
    category: 'Engine Components',
    status: 'Active',
    email: 'supply@nepalauto.com',
    orders: 34,
    spent: 'Rs. 1,24,000',
    initials: 'NA',
    avatarBg: '#dbeafe',
    avatarColor: '#1e40af',
  },
  {
    id: 2,
    name: 'Prashi Tyres & Spares',
    location: 'Itahari',
    contact: '+977-21-509876',
    category: 'Wheels & Tyres',
    status: 'Inactive',
    email: 'info@prashityres.com',
    orders: 12,
    spent: 'Rs. 48,500',
    initials: 'PT',
    avatarBg: '#f3f4f6',
    avatarColor: '#6b7280',
  },
  {
    id: 3,
    name: 'Kriti Lubricants',
    location: 'Pokhara',
    contact: '+977-61-445566',
    category: 'Oil & Lubricants',
    status: 'Active',
    email: 'sales@kritilubs.com',
    orders: 58,
    spent: 'Rs. 2,10,800',
    initials: 'KL',
    avatarBg: '#d1fae5',
    avatarColor: '#065f46',
  },
  {
    id: 4,
    name: 'Bikash Electricals',
    location: 'Birgunj',
    contact: '+977-51-523344',
    category: 'Electrical Parts',
    status: 'Active',
    email: 'orders@bikashelec.com',
    orders: 27,
    spent: 'Rs. 96,300',
    initials: 'BE',
    avatarBg: '#fef3c7',
    avatarColor: '#92400e',
  },
];

/* Styles*/
const S = {
  page: {
    fontFamily: "'DM Sans', sans-serif",
    padding: '2rem',
    maxWidth: '1300px',
    margin: '0 auto',
    paddingBottom: '4rem',
  },

  /* header */
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
    borderBottom: '0.5px solid #e5e7eb',
  },
  headerLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#1D9E75',
    fontWeight: 700,
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '0.5rem',
  },
  h1: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
    fontWeight: 800,
    lineHeight: 1.15,
    marginBottom: '0.3rem',
  },
  sub: { fontSize: '14px', color: '#6b7280' },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    background: '#1D9E75',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    whiteSpace: 'nowrap',
  },

  /* toolbar */
  toolbar: {
    display: 'flex',
    gap: '10px',
    marginBottom: '1.5rem',
    alignItems: 'center',
  },
  searchWrap: {
    flex: 1,
    position: 'relative',
    maxWidth: '340px',
  },
  searchIcon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  searchInput: {
    width: '100%',
    padding: '9px 12px 9px 34px',
    border: '0.5px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '13px',
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
  },
  filterBtn: {
    padding: '8px 14px',
    border: '0.5px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'all 0.15s',
  },

  /* stats row */
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    marginBottom: '1.5rem',
  },
  statCard: {
    background: '#fff',
    border: '0.5px solid #e5e7eb',
    borderRadius: '10px',
    padding: '1rem 1.2rem',
  },
  statNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.4rem',
    fontWeight: 800,
    color: '#1D9E75',
    lineHeight: 1,
    marginBottom: '3px',
  },
  statLbl: { fontSize: '11px', color: '#6b7280', fontWeight: 500 },

  /* layout */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0,1fr) 280px',
    gap: '1.5rem',
  },
  vendorList: { display: 'flex', flexDirection: 'column', gap: '10px' },

  /* vendor row card */
  vCard: {
    background: '#fff',
    border: '0.5px solid #e5e7eb',
    borderRadius: '12px',
    padding: '1.2rem 1.4rem',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    transition: 'box-shadow 0.2s',
    position: 'relative',
  },
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '14px',
    flexShrink: 0,
  },
  vName: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '0.95rem',
    marginBottom: '2px',
  },
  vCat: { fontSize: '11px', fontWeight: 600, color: '#1D9E75' },
  vMeta: {
    display: 'flex',
    gap: '16px',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    color: '#6b7280',
  },
  statusBadge: {
    fontSize: '10px',
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: '999px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    flexShrink: 0,
  },
  actionBtns: { display: 'flex', gap: '6px', flexShrink: 0 },
  iconBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '7px',
    border: '0.5px solid #e5e7eb',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 0.15s',
  },

  /* sidebar */
  sidebar: { display: 'flex', flexDirection: 'column', gap: '12px' },
  darkCard: {
    background: '#0a1628',
    borderRadius: '12px',
    padding: '1.4rem',
    color: '#fff',
  },
  darkTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 800,
    color: '#1D9E75',
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    marginBottom: '1.2rem',
  },
  pulseStat: {
    background: '#111827',
    border: '0.5px solid #1f2937',
    borderRadius: '8px',
    padding: '0.9rem 1rem',
    marginBottom: '8px',
  },
  pulseNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.6rem',
    fontWeight: 800,
    marginBottom: '2px',
  },
  pulseLbl: {
    fontSize: '10px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#6b7280',
  },
  reorderBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px',
    background: '#1D9E75',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    marginTop: '10px',
  },
  infoCard: {
    background: '#fff',
    border: '0.5px solid #e5e7eb',
    borderRadius: '12px',
    padding: '1.2rem 1.4rem',
  },
  infoTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 800,
    marginBottom: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
  },

  /* modal overlay */
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    borderRadius: '14px',
    padding: '1.8rem',
    width: '100%',
    maxWidth: '480px',
    position: 'relative',
  },
  modalTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.1rem',
    fontWeight: 800,
    marginBottom: '1.2rem',
  },
  mLabel: {
    display: 'block',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#374151',
    marginBottom: '4px',
  },
  mInput: {
    width: '100%',
    padding: '8px 12px',
    border: '0.5px solid #d1d5db',
    borderRadius: '7px',
    fontSize: '13px',
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
  mRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  mBtnRow: { display: 'flex', gap: '8px', marginTop: '4px' },
  mCancelBtn: {
    flex: 1,
    padding: '9px',
    border: '0.5px solid #e5e7eb',
    borderRadius: '8px',
    background: '#fff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
  },
  mSaveBtn: {
    flex: 1,
    padding: '9px',
    border: 'none',
    borderRadius: '8px',
    background: '#1D9E75',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
  },
};

/* ─────────────────────────────────────────────────
   Add / Edit Modal
───────────────────────────────────────────────── */
const VendorModal = ({ vendor, onClose, onSave }) => {
  const [form, setForm] = useState(
    vendor || { name: '', location: '', contact: '', category: '', email: '', status: 'Active' }
  );
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <X size={18} color="#9ca3af" />
        </button>

        <h3 style={S.modalTitle}>{vendor ? 'Edit Vendor' : 'Add New Vendor'}</h3>

        <label style={S.mLabel}>Vendor Name</label>
        <input style={S.mInput} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Nepal Auto Parts" />

        <div style={S.mRow}>
          <div>
            <label style={S.mLabel}>Location</label>
            <input style={S.mInput} value={form.location} onChange={e => set('location', e.target.value)} placeholder="City" />
          </div>
          <div>
            <label style={S.mLabel}>Category</label>
            <input style={S.mInput} value={form.category} onChange={e => set('category', e.target.value)} placeholder="Parts category" />
          </div>
        </div>

        <label style={S.mLabel}>Contact Number</label>
        <input style={S.mInput} value={form.contact} onChange={e => set('contact', e.target.value)} placeholder="+977-..." />

        <label style={S.mLabel}>Email Address</label>
        <input style={S.mInput} value={form.email} onChange={e => set('email', e.target.value)} placeholder="vendor@email.com" />

        <label style={S.mLabel}>Status</label>
        <select style={{ ...S.mInput, marginBottom: '14px' }} value={form.status} onChange={e => set('status', e.target.value)}>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <div style={S.mBtnRow}>
          <button style={S.mCancelBtn} onClick={onClose}>Cancel</button>
          <button style={S.mSaveBtn} onClick={() => onSave(form)}>
            <Check size={14} style={{ display: 'inline', marginRight: '5px' }} />
            {vendor ? 'Save Changes' : 'Add Vendor'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* Main component */
const VendorManagement = () => {
  const [vendors, setVendors]     = useState(INITIAL_VENDORS);
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('all');
  const [hovered, setHovered]     = useState(null);
  const [modal, setModal]         = useState(null); // null | 'add' | vendor obj

  const filtered = vendors.filter(v => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSave = (form) => {
    if (modal === 'add') {
      const avatars = ['#dbeafe:#1e40af', '#d1fae5:#065f46', '#fef3c7:#92400e', '#fce7f3:#9d174d'];
      const [bg, color] = avatars[vendors.length % avatars.length].split(':');
      setVendors(prev => [
        ...prev,
        {
          ...form,
          id: Date.now(),
          orders: 0,
          spent: 'Rs. 0',
          initials: form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
          avatarBg: bg,
          avatarColor: color,
        },
      ]);
    } else {
      setVendors(prev => prev.map(v => v.id === modal.id ? { ...v, ...form } : v));
    }
    setModal(null);
  };

  const handleDelete = (id) =>
    setVendors(prev => prev.filter(v => v.id !== id));

  const activeCount   = vendors.filter(v => v.status === 'Active').length;
  const totalOrders   = vendors.reduce((a, v) => a + v.orders, 0);

  return (
    <div style={S.page}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>

      {/* ══ HEADER ══ */}
      <div style={S.header}>
        <div>
          <div style={S.headerLabel}>
            <Globe size={14} /> Vendor Relations
          </div>
          <h1 style={S.h1}>
            Supplier <span style={{ color: '#1D9E75' }}>Ecosystem</span>
          </h1>
          <p style={S.sub}>Manage procurement channels, vendor contacts, and logistics flow.</p>
        </div>
        <button style={S.addBtn} onClick={() => setModal('add')}>
          <Plus size={15} /> Add Vendor
        </button>
      </div>

      {/* ══ STATS ══ */}
      <div style={S.statsRow}>
        {[
          { label: 'Total Vendors',   value: vendors.length },
          { label: 'Active Vendors',  value: activeCount },
          { label: 'Total Orders',    value: totalOrders },
          { label: 'Unsettled Balance', value: 'Rs. 85k' },
        ].map((s, i) => (
          <div key={i} style={S.statCard}>
            <p style={S.statNum}>{s.value}</p>
            <p style={S.statLbl}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* ══ TOOLBAR ══ */}
      <div style={S.toolbar}>
        <div style={S.searchWrap}>
          <Search size={14} color="#9ca3af" style={S.searchIcon} />
          <input
            style={S.searchInput}
            placeholder="Search vendors…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {['all', 'Active', 'Inactive'].map(f => (
          <button
            key={f}
            style={{
              ...S.filterBtn,
              background: statusFilter === f ? '#1D9E75' : '#fff',
              color: statusFilter === f ? '#fff' : '#6b7280',
              borderColor: statusFilter === f ? '#1D9E75' : '#e5e7eb',
            }}
            onClick={() => setStatus(f)}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
        <span style={{ fontSize: '12px', color: '#9ca3af', marginLeft: 'auto' }}>
          {filtered.length} vendor{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ══ MAIN GRID ══ */}
      <div style={S.grid}>

        {/* Vendor list */}
        <div style={S.vendorList}>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af', fontSize: '13px', border: '0.5px dashed #e5e7eb', borderRadius: '12px' }}>
              No vendors match your search.
            </div>
          )}

          {filtered.map(v => (
            <div
              key={v.id}
              style={{
                ...S.vCard,
                boxShadow: hovered === v.id ? '0 4px 20px rgba(0,0,0,0.07)' : 'none',
                borderColor: hovered === v.id ? '#d1fae5' : '#e5e7eb',
              }}
              onMouseEnter={() => setHovered(v.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Avatar */}
              <div style={{ ...S.avatar, background: v.avatarBg, color: v.avatarColor }}>
                {v.initials}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={S.vName}>{v.name}</p>
                <p style={S.vCat}>{v.category}</p>
              </div>

              {/* Meta */}
              <div style={S.vMeta}>
                <span style={S.metaItem}><MapPin size={12} /> {v.location}</span>
                <span style={S.metaItem}><PhoneCall size={12} /> {v.contact}</span>
                <span style={S.metaItem}><Mail size={12} /> {v.email}</span>
                <span style={S.metaItem}><Package size={12} /> {v.orders} orders</span>
              </div>

              {/* Status badge */}
              <span style={{
                ...S.statusBadge,
                background: v.status === 'Active' ? '#d1fae5' : '#f3f4f6',
                color: v.status === 'Active' ? '#065f46' : '#6b7280',
              }}>
                {v.status}
              </span>

              {/* Actions */}
              <div style={S.actionBtns}>
                <button
                  style={S.iconBtn}
                  title="Edit"
                  onClick={() => setModal(v)}
                >
                  <Edit2 size={13} color="#6b7280" />
                </button>
                <button
                  style={{ ...S.iconBtn, borderColor: '#fee2e2' }}
                  title="Delete"
                  onClick={() => handleDelete(v.id)}
                >
                  <Trash2 size={13} color="#dc2626" />
                </button>
                <button style={{ ...S.iconBtn, background: '#f0fdf4', borderColor: '#bbf7d0' }} title="View catalog">
                  <ExternalLink size={13} color="#1D9E75" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside style={S.sidebar}>

          {/* Supply chain pulse */}
          <div style={S.darkCard}>
            <h4 style={S.darkTitle}>
              <Activity size={16} /> Supply Chain Pulse
            </h4>

            <div style={S.pulseStat}>
              <p style={{ ...S.pulseNum, color: '#1D9E75' }}>186</p>
              <p style={S.pulseLbl}>Active SKUs in Flow</p>
            </div>
            <div style={S.pulseStat}>
              <p style={{ ...S.pulseNum, color: '#f59e0b' }}>Rs. 85k</p>
              <p style={S.pulseLbl}>Unsettled Balance</p>
            </div>
            <div style={S.pulseStat}>
              <p style={{ ...S.pulseNum, color: '#3b82f6' }}>{totalOrders}</p>
              <p style={S.pulseLbl}>Total Purchase Orders</p>
            </div>

            <button style={S.reorderBtn}>
              <Mail size={14} /> Request Reorder <ArrowRight size={14} />
            </button>
          </div>

          {/* Category breakdown */}
          <div style={S.infoCard}>
            <h5 style={S.infoTitle}>
              <Package size={14} color="#1D9E75" /> Categories
            </h5>
            {[...new Set(vendors.map(v => v.category))].map((cat, i) => {
              const count = vendors.filter(v => v.category === cat).length;
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '0.5px solid #f9fafb' }}>
                  <span style={{ fontSize: '12.5px', color: '#374151' }}>{cat}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#1D9E75' }}>{count}</span>
                </div>
              );
            })}
          </div>

          {/* Quick contact */}
          <div style={S.infoCard}>
            <h5 style={S.infoTitle}>
              <Truck size={14} color="#1D9E75" /> Quick Contact
            </h5>
            {vendors.filter(v => v.status === 'Active').slice(0, 3).map((v, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ ...S.avatar, width: '28px', height: '28px', fontSize: '10px', borderRadius: '6px', background: v.avatarBg, color: v.avatarColor }}>
                  {v.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, marginBottom: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name}</p>
                  <p style={{ fontSize: '10px', color: '#9ca3af' }}>{v.contact}</p>
                </div>
                <PhoneCall size={13} color="#1D9E75" style={{ flexShrink: 0 }} />
              </div>
            ))}
          </div>

        </aside>
      </div>

      {/* ══ MODAL ══ */}
      {modal !== null && (
        <VendorModal
          vendor={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default VendorManagement;