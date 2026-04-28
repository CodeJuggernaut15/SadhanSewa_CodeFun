import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Car, AlertCircle } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const CustomerContact = () => {
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    vehicleId: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.message) return;
    
    setStatus('sending');
    
    // Simulate API call for sending email
    setTimeout(() => {
      setStatus('success');
      addNotification(
        'Email Sent to Staff',
        `Regarding Booking: ${formData.subject || 'General Inquiry'}`
      );
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({ vehicleId: '', subject: '', message: '' });
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container page-transition" style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto', paddingBottom: '8rem' }}>
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <Mail size={16} /> Support Desk
          </div>
          <h1 className="page-title">Contact <span style={{ color: 'var(--primary)' }}>Staff</span></h1>
          <p className="page-subtitle">Send an email regarding your booked vehicle or general inquiries.</p>
        </div>
      </div>

      <div className="card glass-card">
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }} className="page-transition">
            <div className="icon-circle">
              <CheckCircle size={40} />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Message Sent!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Our staff will review your inquiry regarding the booked vehicle and get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ background: 'rgba(29, 158, 117, 0.05)', padding: '1rem', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center', border: '1px solid rgba(29, 158, 117, 0.2)' }}>
              <AlertCircle size={20} color="var(--primary)" />
              <p style={{ fontSize: '13px', margin: 0, color: 'var(--text-secondary)' }}>Your email will be routed to the Priority Service queue.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-secondary)' }}>BOOKED VEHICLE / SERVICE</label>
              <div style={{ position: 'relative' }}>
                <Car size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <select 
                  className="input" 
                  name="vehicleId" 
                  value={formData.vehicleId} 
                  onChange={handleChange}
                  style={{ paddingLeft: '45px', appearance: 'none' }}
                >
                  <option value="">Select a Vehicle...</option>
                  <option value="tesla-model-3">Tesla Model 3 - BA-PA-1234</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-secondary)' }}>SUBJECT</label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Change pickup time" 
                className="input" 
                required 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-secondary)' }}>MESSAGE</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?" 
                className="input" 
                style={{ minHeight: '150px', resize: 'vertical' }}
                required 
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : <><Send size={18} /> Send Email to Staff</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomerContact;
