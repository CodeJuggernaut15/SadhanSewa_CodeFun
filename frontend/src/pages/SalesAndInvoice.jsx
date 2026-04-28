// This is the Point of Sale (POS) page.
// Staff use this to sell parts to customers and create invoices.
import React, { useState } from 'react';
import { 
  ShoppingCart, Search, Trash2, Printer, Mail, 
  Heart, Plus, Minus, CheckCircle, User, 
  CreditCard, Package, ArrowRight, Zap, RefreshCcw
} from 'lucide-react';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1600px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3.5rem', alignItems: 'start' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', overflow: 'hidden' },
  partCard: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '20px', padding: '1.5rem', transition: 'all 0.3s ease', position: 'relative' },
  summaryCard: { background: 'var(--bg-nav)', borderRadius: '32px', padding: '2.5rem', color: '#fff', position: 'sticky', top: '2.5rem' },
  th: { background: 'rgba(0,0,0,0.01)', padding: '1.25rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', borderBottom: '1.5px solid var(--border-color)' },
  td: { padding: '1.5rem 1.5rem', fontSize: '14px', borderBottom: '1.5px solid var(--border-color)', verticalAlign: 'middle' },
};

const SalesAndInvoice = () => {
  // This is the list of parts we have in our shop to sell.
  const [partsInventory] = useState([
    { id: 1, name: 'Engine Oil (5L)', price: 4500, stock: 25, category: 'Maintenance', sku: 'EO-001' },
    { id: 2, name: 'Brake Pads - Rear', price: 1200, stock: 15, category: 'Braking', sku: 'BP-502' },
    { id: 3, name: 'Air Filter', price: 850, stock: 9, category: 'Maintenance', sku: 'AF-109' },
    { id: 4, name: 'LED Headlamp', price: 2100, stock: 40, category: 'Electrical', sku: 'LH-992' },
    { id: 5, name: 'Fuel Filter', price: 1450, stock: 12, category: 'Maintenance', sku: 'FF-301' },
    { id: 6, name: 'Spark Plug (Set)', price: 3200, stock: 4, category: 'Engine', sku: 'SP-104' },
  ]);

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Adds an item to the shopping cart.
  const addToCart = (part) => {
    const existing = cart.find(item => item.id === part.id);
    if (existing) {
      setCart(cart.map(item => item.id === part.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...part, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));
  
  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = subtotal > 5000 ? subtotal * 0.1 : 0; // Feature 16: Loyalty Discount
  const total = subtotal - discount;

  const filteredParts = partsInventory.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFinalize = () => {
    if (cart.length === 0) return;
    setLoading(true);
    // Simulate SMTP dispatch & DB update
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const resetSession = () => {
    setCart([]);
    setIsSuccess(false);
    setSearchTerm('');
  };

  return (
    <div style={S.page} className="page-transition">
      {/* Requirement 11: Success State & Email Notification Confirmation */}
      {isSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="icon-circle">
              <CheckCircle size={40} />
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Invoice Dispatched!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              The digital manifest #VX-8892 has been successfully transmitted via SMTP to <strong>bhattaraipracdka@gmail.com</strong>.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setIsSuccess(false)}><Printer size={18} /> Print Copy</button>
              <button className="btn btn-primary" onClick={resetSession}><RefreshCcw size={18} /> New Session</button>
            </div>
          </div>
        </div>
      )}

      {/* Header: Shows the title and buttons to finish or print the sale. */}
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <ShoppingCart size={16} /> Retail Settlement Interface
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Point of <span style={{ color: 'var(--primary)' }}>Sale (POS)</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Executing real-time parts liquidation and digital manifest generation.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-outline"><Printer size={18} /> Print Draft</button>
          <button className="btn btn-primary" onClick={handleFinalize} disabled={loading || cart.length === 0}>
            {loading ? 'Processing...' : <><CheckCircle size={18} /> Finalize Session</>}
          </button>
        </div>
      </div>

      <div style={S.layout}>
        <div>
          {/* Requirement 10: Multi-field Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
             <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 800 }}>Component <span style={{ color: 'var(--primary)' }}>Catalog</span></h3>
             <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input className="input" placeholder="Search by name, SKU, or category..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '10px 10px 10px 38px', width: '380px', fontSize: '13px' }} />
             </div>
          </div>

          {/* Component Catalog: A gallery of parts staff can click to add to the cart. */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '3.5rem' }}>
             {filteredParts.map(part => (
               <div key={part.id} style={S.partCard} className="hover:border-primary group card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                     <span className="chip chip-success" style={{ fontSize: '9px' }}>{part.category}</span>
                     <button onClick={() => addToCart(part)} style={{ background: 'var(--primary)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(29, 158, 117, 0.3)' }}>
                        <Plus size={18} />
                     </button>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{part.name}</h4>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '1rem' }}>SKU: {part.sku}</p>
                  <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '8px 0' }}>Rs. {part.price}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: part.stock < 10 ? '#ef4444' : 'var(--primary)' }}></div>
                     <span style={{ fontSize: '10px', fontWeight: 800, color: part.stock < 10 ? '#ef4444' : 'var(--text-muted)' }}>{part.stock < 10 ? 'LOW STOCK' : 'IN STOCK'}: {part.stock} UNITS</span>
                  </div>
               </div>
             ))}
          </div>

          {/* Active Manifest: A list of items currently in the cart for this sale. */}
          <div style={S.card}>
             <div style={{ padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.01)', borderBottom: '1.5px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Active Manifest Table</h3>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)' }}>{cart.length} LINE ITEMS</span>
             </div>
             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                   <tr>
                      <th style={S.th}>Description</th>
                      <th style={S.th}>Unit Cost</th>
                      <th style={S.th}>Volume</th>
                      <th style={{ ...S.th, textAlign: 'right' }}>Total</th>
                      <th style={{ ...S.th, textAlign: 'right' }}>Actions</th>
                   </tr>
                </thead>
                <tbody>
                   {cart.length === 0 ? (
                     <tr>
                        <td colSpan="5" style={{ padding: '4rem', textAlign: 'center' }}>
                           <Package size={48} style={{ opacity: 0.1, marginBottom: '1rem' }} />
                           <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Manifest session is currently empty.</p>
                        </td>
                     </tr>
                   ) : cart.map(item => (
                     <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={S.td}>
                           <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{item.name}</div>
                           <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{item.sku}</div>
                        </td>
                        <td style={S.td}>Rs. {item.price}</td>
                        <td style={S.td}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.03)', padding: '6px 12px', borderRadius: '10px', width: 'fit-content' }}>
                              <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><Minus size={14} /></button>
                              <span style={{ fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><Plus size={14} /></button>
                           </div>
                        </td>
                        <td style={{ ...S.td, textAlign: 'right', fontWeight: 800 }}>Rs. {item.price * item.quantity}</td>
                        <td style={{ ...S.td, textAlign: 'right' }}>
                           <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', opacity: 0.5, cursor: 'pointer' }}><Trash2 size={18} /></button>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>

        <aside>
          <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '1.5rem', marginBottom: '1.5rem' }}>
             <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary)10', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <User size={22} />
                </div>
                <div>
                   <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Client Context</h4>
                   <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Telemetry Syncing</p>
                </div>
             </div>
             <select className="input" style={{ appearance: 'auto' }}>
                <option>Prashiddhika Bhattarai [BA 1 PA 1234]</option>
                <option>Walk-in / Guest Client</option>
                <option>Add New Intake Profile</option>
             </select>
             {/* Requirement 16: Loyalty Active Visual */}
             <div style={{ marginTop: '1rem', padding: '12px', background: 'var(--primary)05', borderRadius: '10px', border: '1px solid var(--primary)20', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Heart size={14} fill="var(--primary)" color="var(--primary)" />
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)' }}>LOYALTY ACTIVE: 10% SMART DISCOUNT</span>
             </div>
          </div>

          <div style={S.summaryCard}>
             <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '4px' }}>Review Checkout</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '2rem' }}>Smart loyalty logic detected high-volume intent. A 10% efficiency discount has been applied to the gross total.</p>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', opacity: 0.7 }}>
                   <span>Gross Subtotal</span>
                   <span style={{ fontWeight: 800 }}>Rs. {subtotal}</span>
                </div>
                {/* Requirement 16: Applied Discount Display */}
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--primary-light)' }}>
                     <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={14} fill="var(--primary-light)" /> Smart Reward (-10%)</span>
                     <span style={{ fontWeight: 800 }}>- Rs. {discount}</span>
                  </div>
                )}
             </div>

             <div style={{ margin: '2rem 0', paddingTop: '2rem', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, opacity: 0.5, marginBottom: '10px' }}>Payable Manifest Total</p>
                <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--primary-light)' }}>Rs. {total}</h2>
             </div>

             <label style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Settlement Logic</label>
             <div style={{ display: 'flex', gap: '10px', marginBottom: '2.5rem' }}>
                {['Cash', 'Digital', 'Credit'].map(m => (
                   <button key={m} onClick={() => setPaymentMethod(m)} style={{ flex: 1, padding: '12px', borderRadius: '12px', fontSize: '12px', fontWeight: 800, border: '1.5px solid rgba(255,255,255,0.05)', background: paymentMethod === m ? 'var(--primary)' : 'rgba(255,255,255,0.02)', color: '#fff', cursor: 'pointer', transition: 'all 0.2s' }}>{m}</button>
                ))}
             </div>

             <button className="btn btn-primary" onClick={handleFinalize} disabled={loading || cart.length === 0} style={{ width: '100%', background: 'var(--primary)', color: '#fff', padding: '16px', fontSize: '14px' }}>
                {loading ? 'Processing...' : <><Mail size={18} /> Finalize & Dispatch <ArrowRight size={18} /></>}
             </button>
             <p style={{ fontSize: '11px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginTop: '1.5rem', lineHeight: 1.6 }}>Feature 11: Real-time manifest dispatch to customer email via SMTP protocol.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SalesAndInvoice;
