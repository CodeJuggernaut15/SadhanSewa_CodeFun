// This is where all the system alerts live. 
// It keeps everyone informed about inventory, payments, and system health.
import React from 'react';
import { Bell, AlertTriangle, Mail, ShieldAlert, Package, CheckCircle, Clock, Settings, ArrowRight, Zap, Activity, Info } from 'lucide-react';

const S = {
  page: {
    padding: '3rem 2.5rem',
    maxWidth: '1350px',
    margin: '0 auto',
    paddingBottom: '8rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '3.5rem',
    paddingBottom: '2.5rem',
    borderBottom: '1.5px solid var(--border-color)',
  },
  alertCard: {
    background: 'var(--bg-card)',
    border: '1.5px solid var(--border-color)',
    borderRadius: '24px',
    padding: '2rem',
    display: 'flex',
    gap: '2rem',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  iconBox: {
    width: '64px',
    height: '64px',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
  },
  badge: {
    padding: '6px 14px',
    borderRadius: '8px',
    fontSize: '10px',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  sidebarCard: {
    background: 'var(--bg-nav)',
    borderRadius: '32px',
    padding: '2.5rem',
    color: '#fff',
    position: 'sticky',
    top: '2.5rem',
    boxShadow: '0 30px 60px -12px rgba(15, 23, 42, 0.2)',
  },
};

const NotificationCenter = () => {
  // A few sample alerts to show how the system categorizes information.
  // We've got everything from low-priority updates to critical security audits.
  const alerts = [
    { id: 1, type: "Inventory", priority: "High", title: "Automatic Reorder Threshold: Synthetic Oil", desc: "System detected 4 units remaining. Procurement manifest PRQ-8821 suggested for replenish.", icon: Package, color: '#ef4444', time: '10:15 AM' },
    { id: 2, type: "Liquidity", priority: "Critical", title: "Automated Credit Reminder Dispatched", desc: "Escalated reminder sent to Manish K. for Rs. 15,400 overdue balance.", icon: Mail, color: '#f59e0b', time: '09:30 AM' },
    { id: 3, type: "Telemetry", priority: "Normal", title: "Vehicle Profile Synchronization Complete", desc: "Successfully synchronized 248 diagnostic profiles across service nodes.", icon: CheckCircle, color: '#1D9E75', time: '08:45 AM' },
    { id: 4, type: "Security", priority: "Critical", title: "System Audit: Admin Role Verification", desc: "Mandatory bi-weekly security audit of administrative access privileges.", icon: ShieldAlert, color: '#ef4444', time: 'Yesterday' }
  ];

  return (
    <div style={S.page} className="page-transition">
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <Activity size={16} /> Notification & Event Protocol
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>System <span style={{ color: 'var(--primary)' }}>Alerts</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Automated maintenance logs and high-priority business escalations.</p>
        </div>
        <button className="btn btn-outline">
          <Settings size={18} /> Global Trigger Settings
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3.5rem' }}>
        {/* List of alerts: Each one has a priority, a description, and actions the user can take. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
           {alerts.map(alert => (
             <div key={alert.id} style={S.alertCard} className="hover:border-primary group">
                <div style={{ ...S.iconBox, background: `${alert.color}10`, color: alert.color }}>
                   <alert.icon size={28} />
                </div>
                <div style={{ flex: 1 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                         <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{alert.type}</span>
                         <span style={{
                           ...S.badge,
                           background: alert.priority === 'Critical' ? '#ef4444' : alert.priority === 'High' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(0,0,0,0.03)',
                           color: alert.priority === 'Critical' ? '#fff' : alert.priority === 'High' ? '#ef4444' : 'var(--text-secondary)'
                         }}>
                            {alert.priority} Priority
                         </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                         <Clock size={14} /> {alert.time}
                      </div>
                   </div>
                   <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '8px' }}>{alert.title}</h4>
                   <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>{alert.desc}</p>
                   
                   <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="btn btn-primary" style={{ padding: '8px 24px', fontSize: '12px' }}>Acknowledge</button>
                      <button className="btn btn-outline" style={{ padding: '8px 24px', fontSize: '12px' }}>Dispatch Protocol</button>
                   </div>
                </div>
             </div>
           ))}
        </div>

        <aside>
          <div style={S.sidebarCard}>
             <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Zap size={20} /> System Pulse
             </h4>
             
             {[
               { l: 'Inventory Health', v: '06', d: 'RELOAD REQUIRED', p: 60, c: '#ef4444' },
               { l: 'Liquidity Risk', v: 'Rs. 54,000', d: 'OVERDUE > 45D', p: 35, c: '#ef4444' }
             ].map((s, i) => (
               <div key={i} style={{ marginBottom: '2rem' }}>
                  <p style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, opacity: 0.5, marginBottom: '10px' }}>{s.l}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                     <span style={{ fontSize: '2rem', fontWeight: 800 }}>{s.v}</span>
                     <span style={{ fontSize: '9px', fontWeight: 800, opacity: 0.6, letterSpacing: '0.05em' }}>{s.d}</span>
                  </div>
                  <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginTop: '12px', overflow: 'hidden' }}>
                     <div style={{ width: `${s.p}%`, height: '100%', background: s.c }}></div>
                  </div>
               </div>
             ))}

             <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1.5px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                   "Automatic email dispatch is currently synchronization with the Customer Hub."
                </p>
                <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   System Integrity Logs <ArrowRight size={14} />
                </button>
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NotificationCenter;
