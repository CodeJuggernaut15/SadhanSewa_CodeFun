import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar, PackageSearch, Star, RefreshCcw, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const S = {
  page: { padding: '2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', gap: '1.5rem', alignItems: 'flex-end', marginBottom: '2rem', paddingBottom: '1.75rem', borderBottom: '1.5px solid var(--border-color)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1.5rem', alignItems: 'start' },
  column: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '18px', overflow: 'hidden', minHeight: '360px' },
  columnHead: { padding: '1.25rem 1.5rem', borderBottom: '1.5px solid var(--border-color)', background: 'rgba(0,0,0,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  item: { padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)' },
  label: { fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' },
};

const statusButton = {
  fontSize: '11px',
  fontWeight: 800,
  padding: '7px 10px',
  borderRadius: '8px',
  border: '1px solid var(--border-color)',
  background: 'var(--bg-main)',
  color: 'var(--text-secondary)',
  cursor: 'pointer'
};

const StaffIssues = () => {
  const { authFetch } = useAuth();
  const { addNotification } = useNotification();
  const [appointments, setAppointments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [appointmentsRes, requestsRes, reviewsRes] = await Promise.all([
        authFetch('/api/appointments'),
        authFetch('/api/part-requests'),
        authFetch('/api/reviews')
      ]);

      const [appointmentsJson, requestsJson, reviewsJson] = await Promise.all([
        appointmentsRes.json(),
        requestsRes.json(),
        reviewsRes.json()
      ]);

      if (appointmentsRes.ok && Array.isArray(appointmentsJson.data)) setAppointments(appointmentsJson.data);
      if (requestsRes.ok && Array.isArray(requestsJson.data)) setRequests(requestsJson.data);
      if (reviewsRes.ok && Array.isArray(reviewsJson.data)) setReviews(reviewsJson.data);
    } catch {
      addNotification('Error', 'Failed to load service queue.', 'error');
    } finally {
      setLoading(false);
    }
  }, [authFetch, addNotification]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateAppointment = async (id, status) => {
    try {
      const res = await authFetch(`/api/appointments/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Status update failed.');
      addNotification('Success', 'Appointment status updated.');
      await loadData();
    } catch (error) {
      addNotification('Error', error.message || 'Status update failed.', 'error');
    }
  };

  const updateRequest = async (id, status) => {
    try {
      const res = await authFetch(`/api/part-requests/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Request update failed.');
      addNotification('Success', 'Part request updated.');
      await loadData();
    } catch (error) {
      addNotification('Error', error.message || 'Request update failed.', 'error');
    }
  };

  const openAppointments = useMemo(() => appointments.filter(a => a.status !== 'Completed' && a.status !== 'Cancelled'), [appointments]);
  const openRequests = useMemo(() => requests.filter(r => r.status !== 'Completed' && r.status !== 'Rejected'), [requests]);

  return (
    <div style={S.page} className="page-transition">
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--primary)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            <AlertCircle size={16} /> Service Queue
          </div>
          <h1 style={{ fontSize: '2.45rem', margin: 0 }}>Staff <span style={{ color: 'var(--primary)' }}>Issues</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Track appointments, part requests, and customer reviews.</p>
        </div>
        <button className="btn btn-outline" onClick={loadData} disabled={loading}>
          <RefreshCcw size={18} /> Refresh
        </button>
      </div>

      <div style={S.grid}>
        <section style={S.column}>
          <div style={S.columnHead}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, display: 'flex', gap: '8px', alignItems: 'center' }}><Calendar size={18} color="var(--primary)" /> Appointments</h3>
            <span className="chip">{openAppointments.length}</span>
          </div>
          {openAppointments.length === 0 ? (
            <p style={{ padding: '1.5rem', color: 'var(--text-muted)' }}>No records found.</p>
          ) : openAppointments.map(item => (
            <div key={item.id} style={S.item}>
              <div style={{ fontWeight: 800, marginBottom: '4px' }}>{item.customerName}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.serviceType}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>{new Date(item.appointmentDate).toLocaleDateString()} at {item.appointmentTime}</div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '1rem', flexWrap: 'wrap' }}>
                {['Confirmed', 'Completed', 'Cancelled'].map(status => (
                  <button key={status} style={statusButton} onClick={() => updateAppointment(item.id, status)}>{status}</button>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section style={S.column}>
          <div style={S.columnHead}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, display: 'flex', gap: '8px', alignItems: 'center' }}><PackageSearch size={18} color="var(--primary)" /> Part Requests</h3>
            <span className="chip">{openRequests.length}</span>
          </div>
          {openRequests.length === 0 ? (
            <p style={{ padding: '1.5rem', color: 'var(--text-muted)' }}>No records found.</p>
          ) : openRequests.map(item => (
            <div key={item.id} style={S.item}>
              <div style={{ fontWeight: 800, marginBottom: '4px' }}>{item.partName}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.customerName}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>{item.description || item.category || 'No extra details'}</div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '1rem', flexWrap: 'wrap' }}>
                {['In Progress', 'Completed', 'Rejected'].map(status => (
                  <button key={status} style={statusButton} onClick={() => updateRequest(item.id, status)}>{status}</button>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section style={S.column}>
          <div style={S.columnHead}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, display: 'flex', gap: '8px', alignItems: 'center' }}><Star size={18} color="var(--primary)" /> Reviews</h3>
            <span className="chip">{reviews.length}</span>
          </div>
          {reviews.length === 0 ? (
            <p style={{ padding: '1.5rem', color: 'var(--text-muted)' }}>No records found.</p>
          ) : reviews.slice(0, 20).map(item => (
            <div key={item.id} style={S.item}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '4px' }}>
                <div style={{ fontWeight: 800 }}>{item.customerName}</div>
                <span style={{ color: '#f59e0b', fontWeight: 800 }}>{item.rating}/5</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.serviceName || 'General review'}</div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.comment || 'No comment added.'}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default StaffIssues;
