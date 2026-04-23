import React, { useState } from 'react';
import {
  Calendar as CalendarIcon, Clock, Wrench, Star, ArrowRight,
  ShieldCheck, ShoppingCart, Plus, Car,
  CheckCircle, ChevronRight,
  Package, MessageSquare,
  TrendingUp, Users, Send, Activity, RefreshCcw, MapPin,
  ChevronLeft, Info, Search, Filter, Trash2
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

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: '3.5rem', alignItems: 'start' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', overflow: 'hidden' },
  sidebarCard: { background: 'var(--bg-nav)', borderRadius: '32px', padding: '2.5rem', color: '#fff', position: 'sticky', top: '2.5rem' },
  calendarGrid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginTop: '1.5rem' },
  calDay: { aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', fontSize: '13px', fontWeight: 600, border: '1px solid var(--border-color)', position: 'relative' },
};

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAction = (msg) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(msg);
      setIsSuccess(true);
    }, 1200);
  };

  const CalendarView = () => (
    <div style={{ ...S.card, padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>April 2026</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline" style={{ padding: '8px' }}><ChevronLeft size={18} /></button>
          <button className="btn btn-outline" style={{ padding: '8px' }}><ChevronRight size={18} /></button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '8px' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <span key={d} style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{d}</span>
        ))}
      </div>
      <div style={S.calendarGrid}>
        {Array.from({ length: 30 }, (_, i) => {
          const day = i + 1;
          const hasApp = day === 10 || day === 12 || day === 15;
          return (
            <div key={day} style={{ 
              ...S.calDay, 
              background: hasApp ? 'var(--primary)05' : 'transparent',
              borderColor: hasApp ? 'var(--primary)30' : 'var(--border-color)',
              color: hasApp ? 'var(--primary)' : 'var(--text-primary)',
              cursor: 'pointer'
            }}>
              {day}
              {hasApp && <span style={{ position: 'absolute', bottom: '6px', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--primary)' }}></span>}
            </div>
          );
        })}
      </div>
    </div>
  );

  const AppointmentView = () => (
    <div className="page-transition">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
        <CalendarView />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <div style={{ ...S.card, padding: '2rem', background: 'var(--primary)05', border: '1.5px dashed var(--primary)30', textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary)', color: '#fff', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={24} /></div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Request New Session</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Synchronize with our certified engineering team for a diagnostic audit.</p>
              <button className="btn btn-primary" onClick={() => handleAction('Your request for a new service appointment has been successfully queued.')}>Initialize Booking</button>
           </div>
           {APPOINTMENTS.slice(0, 2).map(app => (
             <div key={app.id} style={{ ...S.card, padding: '1.5rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="chip chip-success" style={{ fontSize: '9px' }}>{app.status}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{app.date}</span>
               </div>
               <h5 style={{ fontSize: '1rem', margin: '0 0 4px' }}>{app.service}</h5>
               <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>Mechanic: {app.mechanic}</p>
             </div>
           ))}
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 800 }}>Upcoming Manifests</h3>
      {APPOINTMENTS.map(app => (
        <div key={app.id} style={{ ...S.card, padding: '1.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary)10', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Wrench size={20} /></div>
              <div>
                 <h4 style={{ margin: 0, fontSize: '1rem' }}>{app.service}</h4>
                 <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>{app.date} @ {app.time} · {app.vehicle}</p>
              </div>
           </div>
           <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px' }}>Reschedule</button>
              <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px', color: '#ef4444' }}>Cancel</button>
           </div>
        </div>
      ))}
    </div>
  );

  const PartsRequestView = () => (
    <div className="page-transition">
      <div style={{ ...S.card, padding: '3.5rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Request Unavailable Asset</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '15px' }}>Can't find what you're looking for in the shop? Submit a sourcing request.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
           <div>
              <label style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Asset Identity / Name</label>
              <input className="input" placeholder="e.g. 2024 Performance Clutch Plate" />
           </div>
           <div>
              <label style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Asset Category</label>
              <select className="input" style={{ appearance: 'auto' }}>
                 <option>Transmission</option>
                 <option>Suspension</option>
                 <option>Engine Components</option>
              </select>
           </div>
        </div>
        <textarea className="input" style={{ minHeight: '120px', marginBottom: '2.5rem' }} placeholder="Specify technical requirements or manufacturer SKU if known..." />
        <button className="btn btn-primary" onClick={() => handleAction('Your custom part sourcing request has been submitted to procurement.')} style={{ width: '100%', padding: '16px' }}>Submit Sourcing Request</button>
      </div>

      <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 800 }}>Request Manifest Status</h3>
      <div style={S.card}>
         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
               <tr>
                  <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Asset</th>
                  <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Category</th>
                  <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Status</th>
               </tr>
            </thead>
            <tbody>
               <tr style={{ borderTop: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1.5rem' }}><div style={{ fontWeight: 800 }}>Custom Performance Muffler</div></td>
                  <td style={{ padding: '1.5rem' }}><span style={{ fontSize: '12px' }}>Exhaust</span></td>
                  <td style={{ padding: '1.5rem' }}><span className="chip chip-warning">Sourcing In Progress</span></td>
               </tr>
            </tbody>
         </table>
      </div>
    </div>
  );

  const ReviewsView = () => (
    <div className="page-transition">
      <div style={{ ...S.card, padding: '3.5rem', marginBottom: '2.5rem' }}>
         <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Rate Your Experience</h3>
         <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '15px' }}>Your feedback helps us refine our vehicle service engineering.</p>
         <div style={{ display: 'flex', gap: '15px', marginBottom: '2.5rem', justifyContent: 'center' }}>
            {[1,2,3,4,5].map(s => <Star key={s} size={40} fill={s <= 4 ? '#f59e0b' : 'none'} color={s <= 4 ? '#f59e0b' : 'var(--border-color)'} style={{ cursor: 'pointer' }} />)}
         </div>
         <div style={{ marginBottom: '2rem' }}>
            <label style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Linked Service Instance</label>
            <select className="input" style={{ appearance: 'auto' }}>
               <option>Full Engine Service (Apr 10)</option>
               <option>Brake Replacement (Mar 12)</option>
            </select>
         </div>
         <textarea className="input" style={{ minHeight: '120px', marginBottom: '2.5rem' }} placeholder="Tell us about the service quality and staff professionalism..." />
         <button className="btn btn-primary" onClick={() => handleAction('Your review has been successfully published to our service manifest.')} style={{ width: '100%', padding: '16px' }}>Submit Professional Feedback</button>
      </div>

      <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 800 }}>Past Feedback</h3>
      {REVIEWS.map(r => (
        <div key={r.id} style={{ ...S.card, padding: '2rem', marginBottom: '1rem' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{r.service}</h4>
              <div style={{ display: 'flex', gap: '4px' }}>
                 {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= r.rating ? '#f59e0b' : 'none'} color={s <= r.rating ? '#f59e0b' : 'var(--border-color)'} />)}
              </div>
           </div>
           <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{r.text}</p>
           <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1.5rem' }}>Published on {r.date}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div style={S.page} className="page-transition">
      {isSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="icon-circle"><CheckCircle size={40} /></div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Operation Confirmed</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>{successMsg}</p>
            <button className="btn btn-primary" onClick={() => setIsSuccess(false)} style={{ padding: '12px 40px' }}><RefreshCcw size={18} /> Continue</button>
          </div>
        </div>
      )}

      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <CalendarIcon size={16} /> Service Orchestration
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Lifecycle <span style={{ color: 'var(--primary)' }}>Hub</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Orchestrating vehicle service manifest and consumer intelligence.</p>
        </div>
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.03)', padding: '6px', borderRadius: '18px', border: '1.5px solid var(--border-color)' }}>
          {[
            { id: 'appointments', label: 'Bookings', i: CalendarIcon },
            { id: 'requests', label: 'Parts Requests', i: Package },
            { id: 'reviews', label: 'Reviews', i: Star }
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '10px 22px', borderRadius: '14px', border: 'none', background: activeTab === t.id ? 'var(--primary)' : 'transparent', color: activeTab === t.id ? '#fff' : 'var(--text-muted)', fontWeight: 800, fontSize: '12px', cursor: 'pointer', transition: '0.3s' }}>
              <t.i size={16} /> {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={S.layout}>
        <div style={{ flex: 1 }}>
          {activeTab === 'appointments' && <AppointmentView />}
          {activeTab === 'requests' && <PartsRequestView />}
          {activeTab === 'reviews' && <ReviewsView />}
        </div>

        <aside>
           <div style={S.sidebarCard}>
              <h4 style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2.5rem', letterSpacing: '0.1em' }}><Activity size={20} /> Integrity Scan</h4>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '1.5rem', border: '1.5px solid rgba(255,255,255,0.1)', marginBottom: '2.5rem' }}>
                 <p style={{ fontSize: '9px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase' }}>Next Sync Points</p>
                 <h5 style={{ fontSize: '1.1rem', margin: '0 0 6px' }}>850 Points</h5>
                 <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>Loyalty status: **Gold Tier**</p>
              </div>
              <div style={{ padding: '1.5rem', background: 'var(--primary)15', borderRadius: '24px', border: '1.5px solid var(--primary)30' }}>
                 <h5 style={{ fontSize: '1rem', margin: '0 0 1rem' }}>Need Assistance?</h5>
                 <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '1.5rem' }}>Our engineering support team is available 24/7 for technical consultation.</p>
                 <button className="btn btn-primary" style={{ width: '100%', background: '#fff', color: 'var(--bg-nav)' }}>Open Support Ticket</button>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default Appointments;