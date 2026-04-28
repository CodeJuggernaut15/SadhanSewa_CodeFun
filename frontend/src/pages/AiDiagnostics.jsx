// This page uses AI to check if a vehicle has any problems. 
// It predicts when parts might fail so they can be fixed early.
import React, { useState } from 'react';
import {
  ShieldAlert, Activity, Gauge, Zap, BrainCircuit,
  AlertTriangle, CheckCircle2, Clock, Wrench,
  ThermometerSun, Battery, Disc, Droplets, ChevronRight, Search
} from 'lucide-react';

// This is a list of components being checked by the AI.
// It shows their health and what might happen in the future.
const DIAGNOSTICS = [
  { id: 1, component: 'Brake System', icon: Disc, health: 15, status: 'Critical', trend: 'Rapid Wear', prediction: 'Failure expected within 250 KM. Immediate inspection required.', lastChecked: '3 days ago', mileage: '42,810 KM', badgeBg: '#fee2e2', badgeColor: '#991b1b', barColor: '#ef4444', iconBg: '#fee2e2', iconColor: '#dc2626' },
  { id: 2, component: 'Battery Voltage', icon: Battery, health: 45, status: 'Warning', trend: 'Degrading', prediction: 'Potential startup failure in cold weather within 2 weeks.', lastChecked: '1 week ago', mileage: '42,810 KM', badgeBg: '#fef3c7', badgeColor: '#92400e', barColor: '#f59e0b', iconBg: '#fef3c7', iconColor: '#d97706' },
  { id: 3, component: 'Engine Oil Viscosity', icon: Droplets, health: 85, status: 'Healthy', trend: 'Normal', prediction: 'Next oil change recommended in 4,200 KM. No action needed.', lastChecked: 'Today', mileage: '42,810 KM', badgeBg: '#d1fae5', badgeColor: '#065f46', barColor: '#10b981', iconBg: '#d1fae5', iconColor: '#059669' },
  { id: 4, component: 'Coolant Temperature', icon: ThermometerSun, health: 72, status: 'Good', trend: 'Stable', prediction: 'System operating within safe range. Monitor during summer.', lastChecked: 'Today', mileage: '42,810 KM', badgeBg: '#dbeafe', badgeColor: '#1e40af', barColor: '#3b82f6', iconBg: '#dbeafe', iconColor: '#2563eb' }
];

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  grid: { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3.5rem' },
  diagCard: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', padding: '2rem', transition: 'all 0.4s ease' },
  aiBox: { display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'rgba(29, 158, 117, 0.03)', border: '1.5px solid rgba(29, 158, 117, 0.08)', borderRadius: '20px', padding: '1.5rem' },
  sidebarCard: { background: 'var(--bg-nav)', borderRadius: '32px', padding: '2.5rem', color: '#fff', position: 'sticky', top: '2.5rem' },
};

const AiDiagnostics = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={S.page} className="page-transition">
      {/* Header: Shows the title and status of the AI system. */}
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <Activity size={16} /> Advanced Vehicle Telemetry
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>AI <span style={{ color: 'var(--primary)' }}>Diagnostics</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Predictive maintenance powered by real-time failure analysis.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
           <div style={{ background: 'rgba(29, 158, 117, 0.1)', color: 'var(--primary)', padding: '10px 20px', borderRadius: '12px', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', animation: 'pulse 2s infinite' }} />
              SYSTEM ACTIVE
           </div>
        </div>
      </div>

      <div style={S.grid}>
        {/* Diagnostics List: Shows each part's health and what the AI predicts. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {DIAGNOSTICS.map(item => (
            <div key={item.id} style={S.diagCard} className="hover:border-primary group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                 <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ background: `${item.barColor}15`, color: item.barColor, width: 54, height: 54, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <item.icon size={26} />
                    </div>
                    <div>
                       <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{item.component}</h3>
                       <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>TREND: {item.trend}</p>
                    </div>
                 </div>
                 <span style={{ background: item.badgeBg, color: item.badgeColor, padding: '6px 14px', borderRadius: '8px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' }}>{item.status}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>
                 <span>Reliability Score</span>
                 <span style={{ color: item.barColor }}>{item.health}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(0,0,0,0.03)', borderRadius: '10px', marginBottom: '2rem', overflow: 'hidden' }}>
                 <div style={{ width: `${item.health}%`, height: '100%', background: item.barColor, borderRadius: '10px' }} />
              </div>

              <div style={S.aiBox}>
                 <BrainCircuit size={24} color="var(--primary)" style={{ flexShrink: 0 }} />
                 <div>
                    <h4 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', marginBottom: '6px', textTransform: 'uppercase' }}>AI Analysis & Prediction</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>{item.prediction}</p>
                 </div>
              </div>
            </div>
          ))}
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={S.sidebarCard}>
             <h4 style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2rem', letterSpacing: '0.1em' }}>Telemetry Summary</h4>
             {[
               { l: 'Data points analyzed', v: '1.4k', c: 'var(--primary)' },
               { l: 'Prediction Accuracy', v: '99.9%', c: '#3b82f6' },
               { l: 'Critical Escalations', v: '03', c: '#ef4444' }
             ].map((s, i) => (
               <div key={i} style={{ marginBottom: '1.5rem', borderBottom: '1.5px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem' }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, opacity: 0.5, marginBottom: '8px' }}>{s.l}</p>
                  <p style={{ fontSize: '2rem', fontWeight: 800, color: s.c }}>{s.v}</p>
               </div>
             ))}
             <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Generate Health Report</button>
          </div>
          <div style={{ background: '#fef3c7', padding: '2rem', borderRadius: '24px', border: '1.5px solid #fde68a' }}>
             <ShieldAlert size={24} color="#d97706" style={{ marginBottom: '1rem' }} />
             <h4 style={{ fontSize: '1.1rem', color: '#92400e', marginBottom: '0.5rem' }}>Proactive Intervention</h4>
             <p style={{ fontSize: '13px', color: '#92400e', lineHeight: 1.5 }}>System identifies risks before failure. Automated alerts ensure 100% mission readiness.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AiDiagnostics;