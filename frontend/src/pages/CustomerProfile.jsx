// This page is where customers can change their personal info.
// They can update their name, email, vehicle details, and password here.
import React from 'react';
import { 
  User, Mail, Phone, MapPin, 
  Car, Shield, Lock, Settings, 
  Camera, CheckCircle, Save, Plus 
} from 'lucide-react';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1000px', margin: '0 auto', paddingBottom: '8rem' },
  header: { marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  section: { marginBottom: '3rem' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '2.5rem' },
  fieldGroup: { marginBottom: '1.5rem' },
  label: { fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' },
  avatarContainer: { position: 'relative', width: '120px', height: '120px', marginBottom: '2.5rem' },
  avatar: { width: '100%', height: '100%', borderRadius: '32px', background: 'var(--primary)10', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cameraBtn: { position: 'absolute', bottom: '-10px', right: '-10px', width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary)', color: '#fff', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
};

const CustomerProfile = () => {
  return (
    <div style={S.page} className="page-transition">
      {/* Header: Shows the title and a brief description of the settings page. */}
      <div style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
          <Settings size={16} /> Identity Management
        </div>
        <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Account <span style={{ color: 'var(--primary)' }}>Settings</span></h1>
        <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Configure your personal profile and vehicle registry.</p>
      </div>

      <div style={S.section}>
        <div style={S.avatarContainer}>
          <div style={S.avatar}><User size={48} /></div>
          <div style={S.cameraBtn}><Camera size={18} /></div>
        </div>

        {/* Personal Details: Form to update name, email, phone, and address. */}
        <div style={S.card}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <User size={20} color="var(--primary)" /> Personal Credentials
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={S.fieldGroup}>
              <label style={S.label}>Legal Full Name</label>
              <input className="input" defaultValue="Prashiddhika Bhattarai" />
            </div>
            <div style={S.fieldGroup}>
              <label style={S.label}>Electronic Mail</label>
              <input className="input" defaultValue="prashiddhika@example.com" />
            </div>
            <div style={S.fieldGroup}>
              <label style={S.label}>Primary Contact Number</label>
              <input className="input" defaultValue="+977 9801234567" />
            </div>
            <div style={S.fieldGroup}>
              <label style={S.label}>Residential Address</label>
              <input className="input" defaultValue="Kathmandu, Nepal" />
            </div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }}><Save size={18} /> Sync Personal Details</button>
        </div>
      </div>

      {/* Vehicle Registry: Shows the cars the customer has registered in the system. */}
      <div style={S.section}>
        <div style={S.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
              <Car size={20} color="var(--primary)" /> Vehicle Registry
            </h3>
            <button className="btn btn-outline" style={{ fontSize: '12px', padding: '8px 16px' }}><Plus size={16} /> Register Vehicle</button>
          </div>
          
          <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '24px', border: '1.5px solid #e2e8f0', marginBottom: '1.5rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                   <h4 style={{ fontSize: '1.2rem', margin: '0 0 8px' }}>Tesla Model 3</h4>
                   <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>PLATE: BA-PA-1234 • YEAR: 2023</p>
                </div>
                <span className="chip chip-success">PRIMARY ASSET</span>
             </div>
             <div style={{ display: 'flex', gap: '12px', marginTop: '2rem' }}>
                <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>EDIT SPECS</button>
                <button style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>REMOVE ASSET</button>
             </div>
          </div>
        </div>
      </div>

      <div style={S.section}>
        <div style={S.card}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Lock size={20} color="var(--primary)" /> Security Protocols
          </h3>
          <div style={{ maxWidth: '500px' }}>
            <div style={S.fieldGroup}>
              <label style={S.label}>Current Access Code</label>
              <input className="input" type="password" placeholder="••••••••" />
            </div>
            <div style={S.fieldGroup}>
              <label style={S.label}>New Access Code</label>
              <input className="input" type="password" placeholder="Min. 8 characters" />
            </div>
            <div style={S.fieldGroup}>
              <label style={S.label}>Verify New Code</label>
              <input className="input" type="password" placeholder="Confirm code" />
            </div>
            <button className="btn btn-outline" style={{ marginTop: '1rem' }}><Shield size={18} /> Update Access Credentials</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
