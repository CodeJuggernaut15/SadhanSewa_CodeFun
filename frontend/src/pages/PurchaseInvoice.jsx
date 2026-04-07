import React, { useState } from 'react';
import { ShoppingCart, Plus, Trash2, Truck, ShieldCheck, Mail, Send, ArrowRight, FileText, Package, ChevronRight, CheckCircle, Search, Clock } from 'lucide-react';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  layout: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '3.5rem' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', overflow: 'hidden' },
  sectionTitle: { fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' },
  th: { background: 'rgba(0,0,0,0.01)', padding: '1.25rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', borderBottom: '1.5px solid var(--border-color)' },
  td: { padding: '1.5rem 1.5rem', fontSize: '14px', borderBottom: '1.5px solid var(--border-color)', verticalAlign: 'middle' },
  summaryCard: { background: 'var(--bg-nav)', borderRadius: '32px', padding: '2.5rem', color: '#fff', position: 'sticky', top: '2.5rem' },
};

const PurchaseInvoice = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Nepal Auto Parts", detail: "Synthetic Engine Oil (5L)", qyt: 10, price: 4500 }
  ]);

  const total = items.reduce((acc, curr) => acc + (curr.qyt * curr.price), 0);

  return (
    <div style={S.page} className="page-transition">
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <FileText size={16} /> Asset Procurement Portal
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Purchase <span style={{ color: 'var(--primary)' }}>Manifest</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Formally initiating procurement orders for stock replenishment (Feature 4).</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-outline"><Mail size={18} /> Vendor Direct Order</button>
          <button className="btn btn-primary"><Send size={18} /> Finalize Session</button>
        </div>
      </div>

      <div style={S.layout}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={S.card}>
             <div style={{ padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.01)', borderBottom: '1.5px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={S.sectionTitle}>
                   <Truck size={20} color="var(--primary)" /> Vendor Context
                </h3>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)' }}>SESSION: PRQ-8821</span>
             </div>
             
             <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                   <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Primary Supplier</label>
                   <select className="input" style={{ appearance: 'auto' }}>
                      <option>Select active vendor...</option>
                      <option>Nepal Auto Parts</option>
                      <option>Prashi Tyres & Spares</option>
                   </select>
                </div>
                <div>
                   <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Expected Intake Date</label>
                   <input type="date" className="input" />
                </div>
             </div>
          </div>

          <div style={S.card}>
             <div style={{ padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.01)', borderBottom: '1.5px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={S.sectionTitle}>
                   <Package size={20} color="var(--primary)" /> Intake Line Items
                </h3>
                <button style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: 800, color: 'var(--primary)', cursor: 'pointer' }}>SYNC LOW STOCK ALERT</button>
             </div>
             
             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                   <tr>
                      <th style={S.th}>Component Details</th>
                      <th style={{ ...S.th, width: '120px' }}>Volume</th>
                      <th style={S.th}>Unit Cost</th>
                      <th style={{ ...S.th, textAlign: 'right' }}>Action</th>
                   </tr>
                </thead>
                <tbody>
                   {items.map(item => (
                      <tr key={item.id}>
                         <td style={S.td}>
                            <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.1rem' }}>{item.detail}</div>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginTop: '4px' }}>{item.name}</div>
                         </td>
                         <td style={S.td}>
                            <input className="input" type="number" style={{ width: '100%', textAlign: 'center', padding: '8px' }} defaultValue={item.qyt} />
                         </td>
                         <td style={S.td}>
                            <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>Rs. {item.price}</span>
                         </td>
                         <td style={{ ...S.td, textAlign: 'right' }}>
                            <button style={{ background: 'none', border: 'none', color: '#ef4444', opacity: 0.5, cursor: 'pointer' }}><Trash2 size={20} /></button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
             
             <div style={{ padding: '1.5rem 2rem', background: '#fcfcfd' }}>
                <button style={{ width: '100%', padding: '16px', border: '2px dashed var(--border-color)', background: 'transparent', borderRadius: '16px', color: 'var(--primary)', fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                   <Plus size={18} /> Incorporate Manual Line Item
                </button>
             </div>
          </div>
        </div>

        <aside>
           <div style={S.summaryCard}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <ShieldCheck size={24} /> Audit Summary
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                 <div>
                    <p style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, opacity: 0.5, marginBottom: '10px' }}>Net Manifest Total</p>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#fff' }}>Rs. {total}</h2>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '12px', borderRadius: '10px', overflow: 'hidden' }}>
                       <div style={{ width: '100%', height: '100%', background: 'var(--primary)' }}></div>
                    </div>
                 </div>

                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                       <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 800, textTransform: 'uppercase' }}>Asset Bulk</span>
                       <span style={{ fontSize: '14px', fontWeight: 800 }}>Rs. {total}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                       <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 800, textTransform: 'uppercase' }}>Intake Scale</span>
                       <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)' }}>+ {items.length} SKUs</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 800, textTransform: 'uppercase' }}>Current Flow</span>
                       <span style={{ fontSize: '10px', fontWeight: 800, background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '6px 12px', borderRadius: '8px' }}>DRAFT SESSION</span>
                    </div>
                 </div>

                 <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '14px', marginTop: '2.5rem' }}>
                    Finalize Procurement <ChevronRight size={20} />
                 </button>
                 
                 <p style={{ fontSize: '11px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.6 }}>
                    This action will synchronize the intake manifest across global telemetry nodes (Feature 4).
                 </p>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default PurchaseInvoice;
