// This page is for staff to register new customers and their vehicles.
// It's like a digital form that saves customer details to the system.
import React from 'react';
import { UserPlus, Hash, Smartphone, CarFront, Info, ShieldCheck, ClipboardCheck, ArrowRight, RotateCcw, Activity } from 'lucide-react';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1200px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '3.5rem', overflow: 'hidden' },
  sectionTitle: { fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2.5rem', color: 'var(--text-primary)' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' },
  label: { fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '10px', display: 'block' },
  guidance: { marginTop: '3rem', background: '#fff', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' },
};

const StaffCustomerRegistration = () => {
  return (
    <div style={S.page} className="page-transition">
      {/* Header: Tells the staff they are in the customer registration area. */}
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <ClipboardCheck size={16} /> Operational Intake Terminal
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Customer <span style={{ color: 'var(--primary)' }}>Registration</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Staff-facilitated profile creation and vehicle telemetry synchronization (Feature 6).</p>
        </div>
        <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'var(--primary)10', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <UserPlus size={26} />
        </div>
      </div>

      {/* Registration Form: Where the actual information is typed in. */}
      <div style={S.card}>
        <form>
           {/* Section 1: Basic customer details like name and phone. */}
          <h3 style={S.sectionTitle}>
            <ShieldCheck size={22} color="var(--primary)" /> Portfolio Information
          </h3>
          <div style={S.grid}>
            <div>
              <label style={S.label}>Customer Identity (Full Name)</label>
              <input className="input" placeholder="e.g. Prashiddhika Bhattarai" />
            </div>
            <div>
              <label style={S.label}>Communication Link (Phone)</label>
              <input className="input" placeholder="+977" />
            </div>
          </div>

           {/* Section 2: Vehicle details like license plate and type. */}
          <h3 style={{ ...S.sectionTitle, marginTop: '4rem' }}>
            <CarFront size={22} color="var(--primary)" /> Vehicle Profile Telemetry
          </h3>
          <div style={S.grid}>
            <div>
              <label style={S.label}>Registration Identifier (License Plate)</label>
              <input className="input" placeholder="e.g. Ba 1 Pa 1234" />
            </div>
            <div>
              <label style={S.label}>Structural Configuration</label>
              <select className="input" style={{ appearance: 'auto' }}>
                <option>Luxury Sedan</option>
                <option>Performance SUV</option>
                <option>Standard Bike</option>
                <option>Heavy Duty Truck</option>
              </select>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={S.label}>Diagnostic Notes & Operational Observations</label>
              <textarea className="input" style={{ minHeight: '130px' }} placeholder="Describe current vehicle health or specific customer requirements..." />
            </div>
          </div>

          {/* Form Actions: Buttons to clear the form or save the data. */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '4rem', paddingTop: '2rem', borderTop: '1.5px solid var(--border-color)' }}>
            <button type="button" className="btn btn-outline" style={{ padding: '12px 30px' }}><RotateCcw size={18} /> Clear Session</button>
            <button type="submit" className="btn btn-primary" style={{ padding: '12px 40px' }}>Register & Synchronize <ArrowRight size={18} /></button>
          </div>
        </form>
      </div>

      <div style={S.guidance}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary)10', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Info size={24} />
        </div>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>Administrative Protocol</h4>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Finalizing this registration will initialize a digital service ticket and activate automatic SMS/Email status updates (Feature 11). 
            Profiles are synchronized across all operational nodes in real-time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffCustomerRegistration;
