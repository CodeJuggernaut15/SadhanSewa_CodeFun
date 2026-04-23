import React, { useState } from 'react';
import { UserPlus, Shield, Key, Filter, Search, MoreVertical, Briefcase, ChevronRight, Activity, ArrowRight, CheckCircle, RefreshCcw, UserCheck } from 'lucide-react';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  layout: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '3.5rem', alignItems: 'start' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', overflow: 'hidden' },
  avatar: { width: '44px', height: '44px', borderRadius: '12px', background: 'var(--bg-nav)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '15px' },
  th: { background: 'rgba(0,0,0,0.01)', padding: '1.25rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', borderBottom: '1.5px solid var(--border-color)' },
  td: { padding: '1.5rem 1.5rem', fontSize: '14px', borderBottom: '1.5px solid var(--border-color)', verticalAlign: 'middle' },
  sidebarCard: { background: 'var(--bg-nav)', borderRadius: '32px', padding: '2.5rem', color: '#fff', position: 'sticky', top: '2.5rem' },
};

const StaffManagement = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const staffMembers = [
    { id: 1, name: "Bishal Tamang", role: "Inventory Lead", status: "Active", access: "Admin", email: "bishal@autovault.com", phone: "+977 9841234567" },
    { id: 2, name: "Paushan Chaudhary", role: "Customer Specialist", status: "Active", access: "Staff", email: "paushan@autovault.com", phone: "+977 9801234567" },
    { id: 3, name: "Kriti Bista", role: "Sales Associate", status: "On Leave", access: "Staff", email: "kriti@autovault.com", phone: "+977 9811234567" }
  ];

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div style={S.page} className="page-transition">
      {isSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="icon-circle">
              <UserCheck size={40} />
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Personnel Registered!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              The new personnel has been successfully integrated into the system with active functional credentials and security privileges.
            </p>
            <button className="btn btn-primary" onClick={() => setIsSuccess(false)} style={{ padding: '12px 40px' }}><RefreshCcw size={18} /> Continue Audit</button>
          </div>
        </div>
      )}

      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <Shield size={16} /> Executive Personnel Control
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>System <span style={{ color: 'var(--primary)' }}>Staff</span> Catalog</h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Managing functional credentials and privilege hierarchies (Feature 2).</p>
        </div>
        <button className="btn btn-primary" onClick={handleRegister} disabled={loading}>
          {loading ? 'Processing...' : <><UserPlus size={18} /> Register Personnel</>}
        </button>
      </div>

      <div style={S.layout}>
        <div style={S.card}>
          <div style={{ padding: '1.25rem 2rem', background: 'rgba(0,0,0,0.01)', borderBottom: '1.5px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input className="input" placeholder="Filter personnel by identity..." style={{ padding: '10px 10px 10px 38px', width: '320px', fontSize: '13px' }} />
             </div>
             <button style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={14} /> SECURITY RANK
             </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={S.th}>Staff Personnel</th>
                <th style={S.th}>Functional Role</th>
                <th style={S.th}>Access Logic</th>
                <th style={S.th}>Status</th>
                <th style={{ ...S.th, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffMembers.map(member => (
                <tr key={member.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                  <td style={S.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                       <div style={S.avatar}>{member.name[0]}</div>
                       <div>
                          <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1rem' }}>{member.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{member.email}</div>
                       </div>
                    </div>
                  </td>
                  <td style={S.td}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Briefcase size={14} color="var(--primary)" opacity={0.6} />
                        <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>{member.role}</span>
                     </div>
                  </td>
                  <td style={S.td}>
                    <span className={`chip ${member.access === 'Admin' ? 'chip-success' : ''}`} style={{ padding: '6px 12px' }}>
                       <Key size={12} /> {member.access} LEVEL
                    </span>
                  </td>
                  <td style={S.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: member.status === 'Active' ? 'var(--primary)' : '#f59e0b' }}></div>
                       <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{member.status}</span>
                    </div>
                  </td>
                  <td style={{ ...S.td, textAlign: 'right' }}>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><MoreVertical size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside>
          <div style={S.sidebarCard}>
             <h4 style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2.5rem', letterSpacing: '0.1em' }}>
                <Activity size={20} /> Integrity Audit
             </h4>
             
             <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1.5px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, opacity: 0.5, marginBottom: '10px' }}>Last Authentication</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <span style={{ fontSize: '14px', fontWeight: 800 }}>Admin @nelson</span>
                   <span className="chip chip-success" style={{ padding: '4px 10px', borderRadius: '6px' }}>ACTIVE</span>
                </div>
             </div>

             <div style={{ padding: '1.5rem', background: 'var(--primary)15', borderRadius: '20px', border: '1.5px solid var(--primary)30', marginBottom: '2.5rem' }}>
                <h5 style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem' }}>Personnel Split</h5>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                   <div>
                      <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>04</p>
                      <p style={{ fontSize: '10px', opacity: 0.6, textTransform: 'uppercase', fontWeight: 800, marginTop: '4px' }}>Lead Admins</p>
                   </div>
                   <div>
                      <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>18</p>
                      <p style={{ fontSize: '10px', opacity: 0.6, textTransform: 'uppercase', fontWeight: 800, marginTop: '4px' }}>Ops Staff</p>
                   </div>
                </div>
             </div>

             <button className="btn btn-primary" style={{ width: '100%', background: '#fff', color: 'var(--bg-nav)' }}>Verify Global Permissions <ArrowRight size={18} /></button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StaffManagement;
