import React, { useCallback, useEffect, useState } from 'react';
import { Bell, Mail, Package, CheckCircle, Clock, Settings, Activity, RefreshCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1250px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1.5px solid var(--border-color)' },
  alertCard: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '18px', padding: '1.5rem', display: 'flex', gap: '1.25rem' },
  iconBox: { width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  badge: { padding: '6px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' },
};

const iconByType = {
  LowStock: Package,
  CreditReminder: Mail,
  System: Bell
};

const colorByType = {
  LowStock: '#ef4444',
  CreditReminder: '#f59e0b',
  System: '#1D9E75'
};

const NotificationCenter = () => {
  const { authFetch } = useAuth();
  const { addNotification } = useNotification();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNotifications = useCallback(async () => {
    const res = await authFetch('/api/notifications');
    const json = await res.json();
    if (res.ok && Array.isArray(json.data)) setAlerts(json.data);
  }, [authFetch]);

  useEffect(() => {
    loadNotifications().catch(() => addNotification('Error', 'Failed to load notifications.', 'error'));
  }, [loadNotifications, addNotification]);

  const syncNotifications = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/notifications/sync', { method: 'POST' });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Sync failed.');
      addNotification('Success', `${json.data} notification(s) created.`);
      await loadNotifications();
    } catch (error) {
      addNotification('Error', error.message || 'Sync failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    await authFetch(`/api/notifications/${id}/read`, { method: 'PUT' });
    await loadNotifications();
  };

  const markAllRead = async () => {
    await authFetch('/api/notifications/read-all', { method: 'PUT' });
    await loadNotifications();
  };

  const unread = alerts.filter(a => !a.isRead).length;
  const lowStock = alerts.filter(a => a.type === 'LowStock' && !a.isRead).length;
  const credit = alerts.filter(a => a.type === 'CreditReminder' && !a.isRead).length;

  return (
    <div style={S.page} className="page-transition">
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <Activity size={16} /> Notification Center
          </div>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>System <span style={{ color: 'var(--primary)' }}>Alerts</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Check low stock alerts and pending credit reminders.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-outline" onClick={markAllRead}>
            <CheckCircle size={18} /> Mark All Read
          </button>
          <button className="btn btn-primary" onClick={syncNotifications} disabled={loading}>
            {loading ? 'Checking...' : <><RefreshCcw size={18} /> Check Alerts</>}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {alerts.length === 0 ? (
            <div style={S.alertCard}>No notifications found.</div>
          ) : alerts.map(alert => {
            const Icon = iconByType[alert.type] || Bell;
            const color = colorByType[alert.type] || '#1D9E75';
            return (
              <div key={alert.id} style={S.alertCard}>
                <div style={{ ...S.iconBox, background: `${color}15`, color }}>
                  <Icon size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{alert.type}</span>
                      <span style={{ ...S.badge, background: alert.isRead ? 'rgba(0,0,0,0.04)' : `${color}15`, color }}>
                        {alert.isRead ? 'Read' : 'New'}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                      <Clock size={13} /> {new Date(alert.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '6px' }}>{alert.title}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>{alert.message}</p>
                  {!alert.isRead && (
                    <button className="btn btn-outline" onClick={() => markRead(alert.id)} style={{ padding: '8px 18px', fontSize: '12px' }}>
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <aside style={{ background: 'var(--bg-nav)', borderRadius: '24px', padding: '2rem', color: '#fff', height: 'fit-content' }}>
          <h4 style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Settings size={18} /> Summary
          </h4>
          {[
            ['Unread Alerts', unread],
            ['Low Stock', lowStock],
            ['Credit Reminders', credit]
          ].map(([label, value]) => (
            <div key={label} style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, opacity: 0.55, marginBottom: '4px' }}>{label}</p>
              <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{value}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default NotificationCenter;
