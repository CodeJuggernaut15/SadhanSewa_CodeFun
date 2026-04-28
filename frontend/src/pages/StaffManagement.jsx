import React, { useState, useEffect, useCallback } from 'react';
import { 
  UserPlus, Shield, Key, Filter, Search, MoreVertical, 
  Briefcase, ChevronRight, Activity, ArrowRight, CheckCircle, 
  RefreshCcw, UserCheck, X, Eye, EyeOff, Trash2, AlertTriangle, Phone, Mail
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  layout: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '3.5rem', alignItems: 'start' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', overflow: 'hidden' },
  avatar: { width: '44px', height: '44px', borderRadius: '12px', background: 'var(--bg-nav)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '15px' },
  th: { background: 'rgba(0,0,0,0.01)', padding: '1.25rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', borderBottom: '1.5px solid var(--border-color)' },
  td: { padding: '1.5rem 1.5rem', fontSize: '14px', borderBottom: '1.5px solid var(--border-color)', verticalAlign: 'middle' },
  sidebarCard: { background: 'var(--bg-nav)', borderRadius: '32px', padding: '2.5rem', color: '#fff', position: 'sticky', top: '2.5rem' },
  modal: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(4px)' },
  modalContent: { background: 'var(--bg-card)', width: '100%', maxWidth: '500px', borderRadius: '32px', padding: '3rem', boxShadow: 'var(--shadow-float)', position: 'relative' },
  label: { fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '10px', display: 'block' },
};

const StaffManagement = () => {
  const { authFetch } = useAuth();
  const { addNotification } = useNotification();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/users');
      const json = await res.json();
      if (res.ok) {
        setUsers(json.data);
      }
    } catch (err) {
      addNotification('Error', 'Failed to fetch users catalog.', 'error');
    } finally {
      setLoading(false);
    }
  }, [authFetch, addNotification]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleStatus = async (id) => {
    try {
      const res = await authFetch(`/api/users/${id}/toggle-status`, { method: 'PUT' });
      if (res.ok) {
        addNotification('Success', 'User status updated successfully.');
        fetchUsers();
      }
    } catch (err) {
      addNotification('Error', 'Failed to update user status.', 'error');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to permanently remove this user?')) return;
    try {
      const res = await authFetch(`/api/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        addNotification('Success', 'User removed from system.');
        fetchUsers();
      }
    } catch (err) {
      addNotification('Error', 'Failed to delete user.', 'error');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegistering(true);
    try {
      const res = await authFetch('/api/auth/create-staff', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      if (res.ok) {
        addNotification('Success', `Staff member ${formData.fullName} registered.`);
        setIsModalOpen(false);
        setFormData({ fullName: '', email: '', phone: '', password: '' });
        fetchUsers();
      } else {
        addNotification('Error', json.detail || json.message || json.title || 'Registration failed.', 'error');
      }
    } catch (err) {
      addNotification('Error', 'Connection error during registration.', 'error');
    } finally {
      setRegistering(false);
    }
  };

  const filteredStaff = users.filter(u => 
    (u.role === 'Staff' || u.role === 'Admin') && 
    (u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={S.page} className="page-transition">
      {/* Registration Modal */}
      {isModalOpen && (
        <div style={S.modal} onClick={() => setIsModalOpen(false)}>
          <div style={S.modalContent} onClick={e => e.stopPropagation()} className="page-transition">
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', right: '2rem', top: '2rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={24} /></button>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'rgba(29, 158, 117, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <UserPlus size={28} />
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Register <span style={{ color: 'var(--primary)' }}>Personnel</span></h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>Create a new functional staff account.</p>
            </div>

            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={S.label}>Full Identity Name</label>
                <input className="input" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="e.g. John Doe" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={S.label}>Email Address</label>
                  <input className="input" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                </div>
                <div>
                  <label style={S.label}>Phone Number</label>
                  <input className="input" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+977..." />
                </div>
              </div>
              <div>
                <label style={S.label}>Security Password</label>
                <div style={{ position: 'relative' }}>
                  <input className="input" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="••••••••" style={{ paddingRight: '44px' }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', padding: '16px', marginTop: '1rem' }} disabled={registering}>
                {registering ? 'Creating Account...' : <><Shield size={18} /> Finalize Registration</>}
              </button>
            </form>
          </div>
        </div>
      )}

      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <Shield size={16} /> Executive Personnel Control
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>System <span style={{ color: 'var(--primary)' }}>Staff</span> Catalog</h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Managing functional credentials and privilege hierarchies.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} /> Register Personnel
        </button>
      </div>

      <div style={S.layout}>
        <div style={S.card}>
          <div style={{ padding: '1.25rem 2rem', background: 'rgba(0,0,0,0.01)', borderBottom: '1.5px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input className="input" placeholder="Filter personnel by identity..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ padding: '10px 10px 10px 38px', width: '320px', fontSize: '13px' }} />
             </div>
             <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }}></div> {users.filter(u => u.isActive).length} ACTIVE
                </div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }}></div> {users.filter(u => !u.isActive).length} DEACTIVATED
                </div>
             </div>
          </div>

          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}><RefreshCcw className="spin" size={32} /></div>
          ) : (
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
                {filteredStaff.length === 0 ? (
                  <tr><td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>No staff members match the query.</td></tr>
                ) : filteredStaff.map(member => (
                  <tr key={member.userId} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                    <td style={S.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                         <div style={S.avatar}>{member.fullName[0]}</div>
                         <div>
                            <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1rem' }}>{member.fullName}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{member.email}</div>
                         </div>
                      </div>
                    </td>
                    <td style={S.td}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Briefcase size={14} color="var(--primary)" opacity={0.6} />
                          <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>{member.role === 'Admin' ? 'System Overseer' : 'Service Associate'}</span>
                       </div>
                    </td>
                    <td style={S.td}>
                      <span className={`chip ${member.role === 'Admin' ? 'chip-success' : ''}`} style={{ padding: '6px 12px' }}>
                         <Key size={12} /> {member.role} LEVEL
                      </span>
                    </td>
                    <td style={S.td}>
                      <button 
                        onClick={() => handleToggleStatus(member.userId)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: member.isActive ? 'var(--primary)' : '#ef4444' }}></div>
                          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{member.isActive ? 'Active' : 'Deactivated'}</span>
                        </div>
                      </button>
                    </td>
                    <td style={{ ...S.td, textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button onClick={() => handleDeleteUser(member.userId)} style={{ background: 'none', border: 'none', color: '#ef4444', opacity: 0.5, cursor: 'pointer' }} className="hover:opacity-100">
                          <Trash2 size={18} />
                        </button>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><MoreVertical size={20} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <aside>
          <div style={S.sidebarCard}>
             <h4 style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2.5rem', letterSpacing: '0.1em' }}>
                <Activity size={20} /> Integrity Audit
             </h4>
             
             <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1.5px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, opacity: 0.5, marginBottom: '10px' }}>Global Asset Oversight</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <span style={{ fontSize: '14px', fontWeight: 800 }}>Node Activity</span>
                   <span className="chip chip-success" style={{ padding: '4px 10px', borderRadius: '6px' }}>SYNCHRONIZED</span>
                </div>
             </div>

             <div style={{ padding: '1.5rem', background: 'var(--primary)15', borderRadius: '20px', border: '1.5px solid var(--primary)30', marginBottom: '2.5rem' }}>
                <h5 style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem' }}>Personnel Distribution</h5>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                   <div>
                      <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{users.filter(u => u.role === 'Admin').length.toString().padStart(2, '0')}</p>
                      <p style={{ fontSize: '10px', opacity: 0.6, textTransform: 'uppercase', fontWeight: 800, marginTop: '4px' }}>Lead Admins</p>
                   </div>
                   <div>
                      <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{users.filter(u => u.role === 'Staff').length.toString().padStart(2, '0')}</p>
                      <p style={{ fontSize: '10px', opacity: 0.6, textTransform: 'uppercase', fontWeight: 800, marginTop: '4px' }}>Ops Staff</p>
                   </div>
                </div>
             </div>

             <button className="btn btn-primary" style={{ width: '100%', background: '#fff', color: 'var(--bg-nav)' }} onClick={fetchUsers}>
                <RefreshCcw size={18} /> Refresh Audit Cycle
             </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StaffManagement;
