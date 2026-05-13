import React, { useState } from 'react';
import { UserPlus, Hash, Smartphone, CarFront, Info, ShieldCheck, ClipboardCheck, ArrowRight, RotateCcw, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

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
  const { authFetch } = useAuth();
  const { addNotification } = useNotification();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    vehicleModel: '',
    licensePlate: '',
    manufactureYear: '',
    engineType: '',
    mileage: '',
    notes: ''
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const resetForm = () => {
    setForm({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      vehicleModel: '',
      licensePlate: '',
      manufactureYear: '',
      engineType: '',
      mileage: '',
      notes: ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = {
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        password: form.password,
        vehicleModel: form.vehicleModel.trim(),
        licensePlate: form.licensePlate.trim(),
        manufactureYear: form.manufactureYear ? Number(form.manufactureYear) : null,
        engineType: form.engineType || null,
        mileage: form.mileage ? Number(form.mileage) : 0
      };

      const res = await authFetch('/api/customers', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || json.detail || 'Customer registration failed.');
      }

      addNotification('Success', 'Customer and vehicle registered.');
      resetForm();
    } catch (error) {
      addNotification('Error', error.message || 'Customer registration failed.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={S.page} className="page-transition">
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <ClipboardCheck size={16} /> Operational Intake Terminal
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Customer <span style={{ color: 'var(--primary)' }}>Registration</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Register a customer and save their vehicle details.</p>
        </div>
        <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'var(--primary)10', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <UserPlus size={26} />
        </div>
      </div>

      <div style={S.card}>
        <form onSubmit={handleSubmit}>
          <h3 style={S.sectionTitle}>
            <ShieldCheck size={22} color="var(--primary)" /> Portfolio Information
          </h3>
          <div style={S.grid}>
            <div>
              <label style={S.label}>Customer Identity (Full Name)</label>
              <input className="input" required minLength={3} value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="e.g. Prashiddhika Bhattarai" />
            </div>
            <div>
              <label style={S.label}>Communication Link (Phone)</label>
              <input className="input" required value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="9800000000" />
            </div>
            <div>
              <label style={S.label}>Customer Email</label>
              <input className="input" required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="customer@example.com" />
            </div>
            <div>
              <label style={S.label}>Temporary Password</label>
              <input className="input" required minLength={8} type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="Customer@123" />
            </div>
          </div>

          <h3 style={{ ...S.sectionTitle, marginTop: '4rem' }}>
            <CarFront size={22} color="var(--primary)" /> Vehicle Profile Telemetry
          </h3>
          <div style={S.grid}>
            <div>
              <label style={S.label}>Registration Identifier (License Plate)</label>
              <input className="input" required value={form.licensePlate} onChange={(e) => update('licensePlate', e.target.value)} placeholder="e.g. Ba 1 Pa 1234" />
            </div>
            <div>
              <label style={S.label}>Structural Configuration</label>
              <input className="input" required value={form.vehicleModel} onChange={(e) => update('vehicleModel', e.target.value)} placeholder="e.g. Toyota Fortuner" />
            </div>
            <div>
              <label style={S.label}>Manufacture Year</label>
              <input className="input" type="number" min="1950" max="2035" value={form.manufactureYear} onChange={(e) => update('manufactureYear', e.target.value)} placeholder="2021" />
            </div>
            <div>
              <label style={S.label}>Engine Type</label>
              <select className="input" style={{ appearance: 'auto' }} value={form.engineType} onChange={(e) => update('engineType', e.target.value)}>
                <option value="">Select engine type</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div>
              <label style={S.label}>Mileage</label>
              <input className="input" type="number" min="0" value={form.mileage} onChange={(e) => update('mileage', e.target.value)} placeholder="25000" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={S.label}>Diagnostic Notes & Operational Observations</label>
              <textarea className="input" style={{ minHeight: '130px' }} value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Describe current vehicle health or specific customer requirements..." />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '4rem', paddingTop: '2rem', borderTop: '1.5px solid var(--border-color)' }}>
            <button type="button" className="btn btn-outline" onClick={resetForm} style={{ padding: '12px 30px' }}><RotateCcw size={18} /> Clear Session</button>
            <button type="submit" className="btn btn-primary" disabled={saving} style={{ padding: '12px 40px' }}>{saving ? 'Registering...' : <>Register & Synchronize <ArrowRight size={18} /></>}</button>
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
            After registration, the customer can sign in and staff can use the profile for sales invoices and service history.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffCustomerRegistration;
