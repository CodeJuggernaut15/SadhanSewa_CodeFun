import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Filter, Plus, 
  ShoppingCart, Star, Info, ChevronRight, 
  CheckCircle, Tag, ArrowRight 
} from 'lucide-react';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  layout: { display: 'grid', gridTemplateColumns: '280px minmax(0, 1fr)', gap: '3.5rem' },
  filterCard: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '2rem', position: 'sticky', top: '2.5rem' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' },
  productCard: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '1.5rem', transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden' },
  imgPlaceholder: { width: '100%', height: '200px', background: '#f1f5f9', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#94a3b8' },
  price: { fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' },
};

const CustomerShop = () => {
  const [cartCount, setCartCount] = useState(0);

  const parts = [
    { id: 1, name: 'Premium Brake Pads', category: 'Braking', price: '2,400', rating: 4.8, stock: 'In Stock' },
    { id: 2, name: 'Synthetic Oil (5L)', category: 'Lubricants', price: '4,500', rating: 4.9, stock: 'In Stock' },
    { id: 3, name: 'Engine Air Filter', category: 'Filtration', price: '850', rating: 4.5, stock: 'Limited' },
    { id: 4, name: 'LED Headlight Bulb', category: 'Electrical', price: '1,800', rating: 4.7, stock: 'In Stock' },
    { id: 5, name: 'Spark Plug Platinum', category: 'Ignition', price: '320', rating: 4.6, stock: 'In Stock' },
    { id: 6, name: 'Coolant (2L)', category: 'Cooling', price: '950', rating: 4.4, stock: 'In Stock' },
  ];

  return (
    <div style={S.page} className="page-transition">
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <ShoppingBag size={16} /> Global Parts Catalog
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Genuine <span style={{ color: 'var(--primary)' }}>Components</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Explore 100% verified vehicle assets for your specific model.</p>
        </div>
        <button className="btn btn-primary" style={{ position: 'relative' }}>
          <ShoppingCart size={18} /> View Manifest
          {cartCount > 0 && (
            <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 800, width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>{cartCount}</span>
          )}
        </button>
      </div>

      <div style={S.layout}>
        <aside>
          <div style={S.filterCard}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Filter Catalog</h4>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>Search SKU/Name</label>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input className="input" placeholder="Keyword..." style={{ paddingLeft: '40px', fontSize: '13px' }} />
              </div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>Component Class</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Braking', 'Lubricants', 'Electrical', 'Ignition', 'Filtration'].map(cat => (
                  <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ accentColor: 'var(--primary)' }} /> {cat}
                  </label>
                ))}
              </div>
            </div>

            <button className="btn btn-outline" style={{ width: '100%' }}>Clear All Filters</button>
          </div>
        </aside>

        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
             <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Showing 1–6 of 42 active assets</p>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--primary)15', padding: '6px 12px', borderRadius: '10px', border: '1px solid var(--primary)30' }}>
                   <Tag size={14} color="var(--primary)" />
                   <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>Loyalty: 10% OFF (Orders {'>'} Rs. 5,000)</span>
                </div>
                <select className="input" style={{ width: '180px', fontSize: '13px', appearance: 'auto' }}>
                   <option>Most Relevant</option>
                   <option>Price: Low to High</option>
                   <option>Highest Rated</option>
                </select>
             </div>
          </div>

          <div style={S.productGrid}>
            {parts.map(part => {
              const originalPrice = parseInt(part.price.replace(',', ''));
              const discountedPrice = Math.floor(originalPrice * 0.9);
              return (
                <div key={part.id} style={S.productCard} className="hover:border-primary group">
                   <div style={S.imgPlaceholder}><ShoppingBag size={48} /></div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{part.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 800, color: '#f59e0b' }}>
                         <Star size={14} fill="#f59e0b" /> {part.rating}
                      </div>
                   </div>
                   <p style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>{part.category}</p>
                   
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <div>
                         <span style={{ fontSize: '10px', fontWeight: 800, color: part.stock === 'In Stock' ? 'var(--primary)' : '#f59e0b', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{part.stock}</span>
                         <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            <div style={S.price}>Rs. {discountedPrice.toLocaleString()}</div>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>Rs. {part.price}</span>
                         </div>
                      </div>
                      <button className="btn btn-primary" style={{ padding: '10px', borderRadius: '12px' }} onClick={() => setCartCount(prev => prev + 1)}>
                         <Plus size={20} />
                      </button>
                   </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '4rem', padding: '3rem', background: 'var(--bg-nav)', borderRadius: '32px', color: '#fff', textAlign: 'center' }}>
             <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Can't find a specific part?</h3>
             <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
                Submit a special request to our procurement team and we will source it for you through our global vendor network.
             </p>
             <button className="btn btn-primary" style={{ background: '#fff', color: 'var(--bg-nav)', padding: '12px 40px' }}>Request Custom Component <ArrowRight size={18} /></button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerShop;
