import React from 'react';
import { Package, Search, Filter, Plus, Edit2, Trash2, ShieldCheck, Box, TrendingDown, ArrowRight, Clock, Tag } from 'lucide-react';

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
  const parts = [
    { id: "P-001", name: "Engine Air Filter", category: "Filtration", stock: 12, price: 850, status: "Healthy" },
    { id: "P-042", name: "Brake Pads (Premium)", category: "Braking", stock: 4, price: 2400, status: "Critical" },
    { id: "P-109", name: "Synthetic Oil (5L)", category: "Lubricants", stock: 28, price: 4500, status: "Healthy" },
    { id: "P-067", name: "Spark Plugs (Platinum)", category: "Ignition", stock: 8, price: 320, status: "Healthy" }
  ];

  return (
    <div style={S.page} className="page-transition">
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <Box size={16} /> Asset Logistics Console
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Inventory <span style={{ color: 'var(--primary)' }}>Control</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Granular tracking of vehicle components and supply chain integrity (Feature 3).</p>
        </div>
        <button className="btn btn-primary"><Plus size={18} /> Register Component</button>
      </div>

      <div style={S.layout}>
        <div style={S.card}>
          <div style={{ padding: '1.25rem 2rem', background: 'rgba(0,0,0,0.01)', borderBottom: '1.5px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input className="input" placeholder="Scan SKU or component name..." style={{ padding: '10px 10px 10px 38px', width: '320px', fontSize: '13px' }} />
             </div>
             <button style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={14} /> CATALOG FILTERS
             </button>
          </div>

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
              {parts.map(part => (
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
                        <span style={{ fontSize: '9px', fontWeight: 800, background: part.status === 'Healthy' ? 'var(--primary)10' : '#ef444410', color: part.status === 'Healthy' ? 'var(--primary)' : '#ef4444', padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>{part.status}</span>
                     </div>
                  </td>
                  <td style={S.td}><span style={{ fontWeight: 800 }}>Rs. {part.price}</span></td>
                  <td style={{ ...S.td, textAlign: 'right' }}>
                     <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', color: 'var(--text-muted)' }}><Edit2 size={16} /></button>
                        <button style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', color: '#ef4444' }}><Trash2 size={16} /></button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside>
          <div style={S.sidebarCard}>
             <h4 style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2.5rem', letterSpacing: '0.1em' }}>
                <ShieldCheck size={20} /> Integrity Audit
             </h4>
             
             {[
               { l: 'Inventory Health', v: '92%', c: 'var(--primary)', p: 92 },
               { l: 'Asset Valuation', v: 'Rs. 8.2M', c: '#3b82f6', p: 100 }
             ].map((s, i) => (
               <div key={i} style={{ marginBottom: '2rem' }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, opacity: 0.5, marginBottom: '10px', textTransform: 'uppercase' }}>{s.l}</p>
                  <p style={{ fontSize: '2rem', fontWeight: 800, color: s.c, marginBottom: '12px' }}>{s.v}</p>
                  {s.p < 100 && (
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                       <div style={{ width: `${s.p}%`, height: '100%', background: s.c }}></div>
                    </div>
                  )}
               </div>
             ))}

             <div style={{ padding: '1.25rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '20px', border: '1.5px solid rgba(239, 68, 68, 0.2)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', marginBottom: '8px' }}>
                   <TrendingDown size={16} /> <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' }}>Threshold Trigger</span>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Detected 4 critical component breaches. Maintenance reorder protocol manual engagement recommended (Feature 15).</p>
             </div>

             <button className="btn btn-primary" style={{ width: '100%', background: '#fff', color: 'var(--bg-nav)' }}>Run SKU Full Audit <ArrowRight size={18} /></button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PartsManagement;
