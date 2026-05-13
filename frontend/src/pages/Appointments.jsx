import React, { useCallback, useEffect, useState } from 'react';
import {
  Calendar as CalendarIcon, Clock, Wrench, Star,
  CheckCircle, Package, Activity, RefreshCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1200px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1.5px solid var(--border-color)' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '20px', padding: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' },
  label: { fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' },
  listItem: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1rem' },
};

const emptyAppointment = {
  serviceType: '',
  appointmentDate: '',
  appointmentTime: '',
  mechanicName: '',
  notes: ''
};

const emptyRequest = {
  partName: '',
  category: '',
  description: ''
};

const emptyReview = {
  serviceName: '',
  rating: 5,
  comment: ''
};

const Appointments = () => {
  const { authFetch } = useAuth();
  const { addNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [partRequests, setPartRequests] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [appointmentForm, setAppointmentForm] = useState(emptyAppointment);
  const [requestForm, setRequestForm] = useState(emptyRequest);
  const [reviewForm, setReviewForm] = useState(emptyReview);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
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
    if (requestsRes.ok && Array.isArray(requestsJson.data)) setPartRequests(requestsJson.data);
    if (reviewsRes.ok && Array.isArray(reviewsJson.data)) setReviews(reviewsJson.data);
  }, [authFetch]);

  useEffect(() => {
    loadData().catch(() => addNotification('Error', 'Failed to load service data.', 'error'));
  }, [loadData, addNotification]);

  const submitAppointment = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const res = await authFetch('/api/appointments', {
        method: 'POST',
        body: JSON.stringify({
          ...appointmentForm,
          appointmentDate: appointmentForm.appointmentDate,
          appointmentTime: `${appointmentForm.appointmentTime}:00`
        })
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Booking failed.');
      setAppointmentForm(emptyAppointment);
      addNotification('Success', 'Appointment booked.');
      await loadData();
    } catch (error) {
      addNotification('Error', error.message || 'Booking failed.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const submitPartRequest = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const res = await authFetch('/api/part-requests', {
        method: 'POST',
        body: JSON.stringify(requestForm)
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Request failed.');
      setRequestForm(emptyRequest);
      addNotification('Success', 'Part request submitted.');
      await loadData();
    } catch (error) {
      addNotification('Error', error.message || 'Request failed.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const submitReview = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const res = await authFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({ ...reviewForm, rating: Number(reviewForm.rating) })
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Review failed.');
      setReviewForm(emptyReview);
      addNotification('Success', 'Review submitted.');
      await loadData();
    } catch (error) {
      addNotification('Error', error.message || 'Review failed.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={S.page} className="page-transition">
      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <CalendarIcon size={16} /> Customer Services
          </div>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Appointments & Requests</h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Book service, request unavailable parts, and submit reviews.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
        {[
          ['appointments', 'Bookings'],
          ['requests', 'Part Requests'],
          ['reviews', 'Reviews']
        ].map(([id, label]) => (
          <button
            key={id}
            className={activeTab === id ? 'btn btn-primary' : 'btn btn-outline'}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'appointments' && (
        <div style={S.grid}>
          <form style={S.card} onSubmit={submitAppointment}>
            <h3 style={{ marginBottom: '1.5rem' }}><Wrench size={20} /> Book Appointment</h3>
            <label style={S.label}>Service Type</label>
            <input className="input" required value={appointmentForm.serviceType} onChange={(e) => setAppointmentForm({ ...appointmentForm, serviceType: e.target.value })} placeholder="Full engine service" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label style={S.label}>Date</label>
                <input className="input" required type="date" value={appointmentForm.appointmentDate} onChange={(e) => setAppointmentForm({ ...appointmentForm, appointmentDate: e.target.value })} />
              </div>
              <div>
                <label style={S.label}>Time</label>
                <input className="input" required type="time" value={appointmentForm.appointmentTime} onChange={(e) => setAppointmentForm({ ...appointmentForm, appointmentTime: e.target.value })} />
              </div>
            </div>
            <label style={{ ...S.label, marginTop: '1rem' }}>Notes</label>
            <textarea className="input" value={appointmentForm.notes} onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })} placeholder="Describe the issue" />
            <button className="btn btn-primary" disabled={saving} style={{ marginTop: '1.5rem', width: '100%' }}>{saving ? 'Saving...' : 'Book Appointment'}</button>
          </form>

          <div>
            {appointments.length === 0 ? (
              <div style={S.card}>No appointments found.</div>
            ) : appointments.map(item => (
              <div key={item.id} style={S.listItem}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <h4 style={{ margin: 0 }}>{item.serviceType}</h4>
                  <span className="chip chip-success">{item.status}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  {new Date(item.appointmentDate).toLocaleDateString()} at {String(item.appointmentTime).slice(0, 5)}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{item.vehicleName || 'Vehicle not selected'} {item.licensePlate}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div style={S.grid}>
          <form style={S.card} onSubmit={submitPartRequest}>
            <h3 style={{ marginBottom: '1.5rem' }}><Package size={20} /> Request Part</h3>
            <label style={S.label}>Part Name</label>
            <input className="input" required value={requestForm.partName} onChange={(e) => setRequestForm({ ...requestForm, partName: e.target.value })} placeholder="Performance clutch plate" />
            <label style={{ ...S.label, marginTop: '1rem' }}>Category</label>
            <input className="input" value={requestForm.category} onChange={(e) => setRequestForm({ ...requestForm, category: e.target.value })} placeholder="Transmission" />
            <label style={{ ...S.label, marginTop: '1rem' }}>Description</label>
            <textarea className="input" value={requestForm.description} onChange={(e) => setRequestForm({ ...requestForm, description: e.target.value })} placeholder="Add model or SKU if known" />
            <button className="btn btn-primary" disabled={saving} style={{ marginTop: '1.5rem', width: '100%' }}>{saving ? 'Saving...' : 'Submit Request'}</button>
          </form>

          <div>
            {partRequests.length === 0 ? (
              <div style={S.card}>No part requests found.</div>
            ) : partRequests.map(item => (
              <div key={item.id} style={S.listItem}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <h4 style={{ margin: 0 }}>{item.partName}</h4>
                  <span className="chip chip-warning">{item.status}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>{item.category || 'No category'}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div style={S.grid}>
          <form style={S.card} onSubmit={submitReview}>
            <h3 style={{ marginBottom: '1.5rem' }}><Star size={20} /> Submit Review</h3>
            <label style={S.label}>Service Name</label>
            <input className="input" value={reviewForm.serviceName} onChange={(e) => setReviewForm({ ...reviewForm, serviceName: e.target.value })} placeholder="Brake replacement" />
            <label style={{ ...S.label, marginTop: '1rem' }}>Rating</label>
            <select className="input" style={{ appearance: 'auto' }} value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}>
              {[1, 2, 3, 4, 5].map(rate => <option key={rate} value={rate}>{rate}</option>)}
            </select>
            <label style={{ ...S.label, marginTop: '1rem' }}>Comment</label>
            <textarea className="input" value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} placeholder="Write your feedback" />
            <button className="btn btn-primary" disabled={saving} style={{ marginTop: '1.5rem', width: '100%' }}>{saving ? 'Saving...' : 'Submit Review'}</button>
          </form>

          <div>
            {reviews.length === 0 ? (
              <div style={S.card}>No reviews found.</div>
            ) : reviews.map(item => (
              <div key={item.id} style={S.listItem}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <h4 style={{ margin: 0 }}>{item.serviceName || 'Service Review'}</h4>
                  <span style={{ color: '#f59e0b', fontWeight: 800 }}>{item.rating}/5</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>{item.comment || 'No comment added.'}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ ...S.card, marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Activity size={22} color="var(--primary)" />
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>These records are saved to the backend and can be reviewed later.</p>
      </div>
    </div>
  );
};

export default Appointments;
