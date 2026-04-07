import React, { useState } from 'react';
import {
  Calendar, Clock, Wrench, Star, ArrowRight,
  ShieldCheck, ShoppingCart, Plus, Car,
  CheckCircle, ChevronRight,
  Package, MessageSquare,
  TrendingUp, Users, Send, Activity
} from 'lucide-react';

const APPOINTMENTS = [
  { id: 1, customer: 'Prashiddhika B.', initials: 'PB', vehicle: 'Toyota Fortuner', plate: 'Ba 1 Pa 1234', service: 'Full Engine Service', date: 'Apr 10, 2026', time: '10:30 AM', status: 'Confirmed', mechanic: 'Rajan K.' },
  { id: 2, customer: 'Kriti Bista', initials: 'KB', vehicle: 'Honda Civic', plate: 'Pr 3-001', service: 'Brake Pad Replacement', date: 'Apr 12, 2026', time: '02:15 PM', status: 'Pending', mechanic: 'Suman T.' },
  { id: 3, customer: 'Aarav Sharma', initials: 'AS', vehicle: 'Suzuki Swift', plate: 'Ba 2 Cha 4521', service: 'Oil & Filter Change', date: 'Apr 15, 2026', time: '09:00 AM', status: 'Confirmed', mechanic: 'Rajan K.' },
];

const REVIEWS = [
  { id: 1, name: 'Rohan Adhikari', initials: 'RA', date: 'Mar 28, 2026', rating: 5, service: 'Brake Pad Replacement', text: 'The AI diagnostics caught a brake issue I had no idea about. Staff was professional and the invoice was emailed instantly. Best vehicle service in Kathmandu.', helpful: 12, avatarBg: 'var(--primary)10', avatarColor: 'var(--primary)' },
  { id: 2, name: 'Sita Maharjan', initials: 'SM', date: 'Mar 15, 2026', rating: 4, service: 'Full Engine Service', text: 'Quick turnaround on the engine service. The invoice email feature is super convenient. Would have given 5 stars but wait time was a bit long.', helpful: 8, avatarBg: '#fce7f3', avatarColor: '#9d174d' },
];

const RATING_DIST = [
  { stars: 5, count: 48, pct: 68 },
  { stars: 4, count: 14, pct: 20 },
  { stars: 3, count: 6, pct: 8 },
];

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: '3.5rem', alignItems: 'start' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', overflow: 'hidden' },
  sidebarCard: { background: 'var(--bg-nav)', borderRadius: '32px', padding: '2.5rem', color: '#fff', position: 'sticky', top: '2.5rem' },
};

const BookingListView = () => (
  <div className="page-transition">
    <button className="btn btn-outline" style={{ width: '100%', borderStyle: 'dashed', marginBottom: '2rem', padding: '1.5rem', fontSize: '13px' }}>
      <Plus size={18} color="var(--primary)" /> Initialize New Structural Service Appointment (Feature 8)
    </button>

    {APPOINTMENTS.map(app => (
      <div key={app.id} style={{ ...S.card, padding: '2rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary)10', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{app.initials}</div>
            <div>
              <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{app.customer}</h4>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}><span style={{ color: 'var(--primary)', fontWeight: 700 }}>{app.vehicle}</span> · {app.plate}</p>
            </div>
          </div>
          <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', background: app.status === 'Confirmed' ? 'var(--primary)10' : '#f59e0b10', color: app.status === 'Confirmed' ? 'var(--primary)' : '#f59e0b', padding: '6px 14px', borderRadius: '8px' }}>{app.status}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', background: 'rgba(0,0,0,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1.5px solid var(--border-color)', marginBottom: '1.5rem' }}>
           {[
             { l: 'TEMPORAL SYNC', v: `${app.date} @ ${app.time}`, i: Clock },
             { l: 'SERVICE PROTOCOL', v: app.service, i: Wrench },
             { l: 'ASSIGNED ENGINEER', v: app.mechanic, i: Activity }
           ].map((det, i) => (
             <div key={i}>
                <p style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>{det.l}</p>
                <p style={{ fontSize: '12px', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><det.i size={14} color="var(--primary)" /> {det.v}</p>
             </div>
           ))}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-outline" style={{ flex: 1 }}>Modify</button>
          <button className="btn btn-primary" style={{ flex: 2 }}>Execute Full Audit <ChevronRight size={18} /></button>
        </div>
      </div>
    ))}
  </div>
);

const PartRequestForm = () => (
  <div style={S.card} className="page-transition">
    <div style={{ background: 'var(--bg-nav)', padding: '2rem 2.5rem', display: 'flex', gap: '20px', alignItems: 'center' }}>
       <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Package size={28} /></div>
       <div>
          <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#fff' }}>Component Sourcing Terminal</h3>
          <p style={{ fontSize: '13px', margin: '4px 0 0', color: 'rgba(255,255,255,0.5)' }}>External procurement request for specialized vehicle assets.</p>
       </div>
    </div>
    <div style={{ padding: '3.5rem' }}>
       <div style={{ marginBottom: '2rem' }}>
          <label style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Structural Component Identity</label>
          <input className="input" placeholder="e.g. 2024 Toyota RAV4 Performance Air Intake" />
       </div>
       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <div>
             <label style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Manufacturer Code</label>
             <input className="input" placeholder="SKU Connectivity" />
          </div>
          <div>
             <label style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Liquidity Budget (Rs.)</label>
             <input className="input" type="number" placeholder="Estimated Manifest Value" />
          </div>
       </div>
       <button className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>Submit Multi-tier Request (Feature 4) <ArrowRight size={20} /></button>
    </div>
  </div>
);

const ServiceReviewView = () => (
  <div className="page-transition">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
       {[
         { l: 'ECOSYSTEM RATING', v: '4.6 / 5', i: Star, c: '#f59e0b' },
         { l: 'VALIDATED REVIEWS', v: '71 ENTRIES', i: Users, c: 'var(--primary)' },
         { l: 'RETENTION YIELD', v: '68%', i: Activity, c: 'var(--primary)' }
       ].map((s, i) => (
         <div key={i} style={{ ...S.card, padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.c}10`, color: s.c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><s.i size={22} /></div>
            <div>
               <h4 style={{ fontSize: '1.25rem', margin: 0 }}>{s.v}</h4>
               <p style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-muted)', margin: '4px 0 0', textTransform: 'uppercase' }}>{s.l}</p>
            </div>
         </div>
       ))}
    </div>

    <div style={{ ...S.card, padding: '3.5rem', marginBottom: '2rem' }}>
       <h3 style={{ fontSize: '1.25rem', marginBottom: '2.5rem', fontWeight: 800 }}>Publish Experience Feedback (Feature 14)</h3>
       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
          <div>
             <label style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Service Category</label>
             <select className="input" style={{ appearance: 'auto' }}>
                <option>Brake Pad Replacement</option>
                <option>Full Engine Service</option>
             </select>
          </div>
          <div>
             <label style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Aesthetic Satisfaction</label>
             <div style={{ display: 'flex', gap: '10px' }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={28} fill={s <= 4 ? '#f59e0b' : 'none'} color={s <= 4 ? '#f59e0b' : 'var(--border-color)'} />)}
             </div>
          </div>
       </div>
       <textarea className="input" style={{ minHeight: '140px', marginBottom: '2.5rem' }} placeholder="Provide granular feedback regarding platform efficiency or service quality..." />
       <button className="btn btn-primary" style={{ width: '100%', padding: '16px' }}><MessageSquare size={18} /> Broadcast Review</button>
    </div>

    {REVIEWS.map(r => (
      <div key={r.id} style={{ ...S.card, padding: '2rem', marginBottom: '1rem' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
               <div style={{ width: 44, height: 44, borderRadius: 50, background: 'var(--primary)10', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{r.initials}</div>
               <div>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>{r.name}</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)' }}>{r.date}</p>
               </div>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
               {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= r.rating ? '#f59e0b' : 'none'} color={s <= r.rating ? '#f59e0b' : 'var(--border-color)'} />)}
            </div>
         </div>
         <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{r.text}</p>
      </div>
    ))}
  </div>
);

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div style={S.page} className="page-transition">
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <Calendar size={16} /> Operational Lifecycle Hub
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Service <span style={{ color: 'var(--primary)' }}>Schedule</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Managing vehicle service workflows and consumer feedback loops (Feature 8/14).</p>
        </div>

        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.03)', padding: '6px', borderRadius: '18px', border: '1.5px solid var(--border-color)' }}>
          {[
            { id: 'bookings', label: 'Bookings', i: Calendar },
            { id: 'requests', label: 'Part Requests', i: Package },
            { id: 'reviews', label: 'Ecosystem Reviews', i: Star }
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '10px 22px', borderRadius: '14px', border: 'none', background: activeTab === t.id ? 'var(--primary)' : 'transparent', color: activeTab === t.id ? '#fff' : 'var(--text-muted)', fontWeight: 800, fontSize: '12px', cursor: 'pointer', transition: 'all 0.3s' }}>
              <t.i size={16} /> {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={S.layout}>
        <div>
          {activeTab === 'bookings' && <BookingListView />}
          {activeTab === 'requests' && <PartRequestForm />}
          {activeTab === 'reviews' && <ServiceReviewView />}
        </div>

        <aside>
          <div style={S.sidebarCard}>
             <h4 style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2.5rem', letterSpacing: '0.1em' }}><Clock size={20} /> Next Protocol</h4>
             <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '1.5rem', border: '1.5px solid rgba(255,255,255,0.1)', marginBottom: '2.5rem' }}>
                <p style={{ fontSize: '9px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase' }}>Confirmed Session</p>
                <h5 style={{ fontSize: '1.1rem', margin: '0 0 6px' }}>Full Engine Service</h5>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>Apr 10 · 10:30 AM</p>
             </div>

             <div style={{ padding: '1.75rem', background: 'var(--primary)15', borderRadius: '24px', border: '1.5px solid var(--primary)30' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                   <p style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>4.6</p>
                   <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '8px' }}>
                      {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="var(--primary)" color="var(--primary)" />)}
                   </div>
                </div>
                {RATING_DIST.map(r => (
                  <div key={r.stars} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                     <span style={{ fontSize: '11px', fontWeight: 800, width: '24px' }}>{r.stars}★</span>
                     <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{ width: `${r.pct}%`, height: '100%', background: 'var(--primary)' }}></div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Appointments;