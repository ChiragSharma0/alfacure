import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function Support({ setCurrentPage }) {
  const { content } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const contactHubs = content?.contact?.contactHubs || [
    {
      name: 'Dhruvi Chavda',
      role: 'Managing Director',
      location: 'Ahmedabad, India',
      phone: '+91 76219 30091',
      email: 'info@alfacure.com',
    },
    {
      name: 'Rahul Joshi',
      role: 'Managing Director',
      location: 'Ahmedabad, India',
      phone: '+91 98795 00383',
      email: 'export@alfacure.com',
    },
    {
      name: 'Dhara Panchal',
      role: 'Executive Manager',
      location: 'United Arab Emirates',
      phone: '+971 55 601 2891',
      email: 'export@alfacure.com',
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'general', company: '', message: '' });
    }, 4000);
  };

  return (
    <div className="page-container animate-fade-in" style={{ backgroundColor: 'var(--bg-light)', paddingBottom: '80px' }}>

      {/* 1. Header */}
      <section className="section" style={{ backgroundColor: 'var(--bg-white)', padding: '100px 0 60px 0', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
        <div className="container">
          <span className="badge badge-blue" style={{ marginBottom: '12px' }}>GET IN TOUCH</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '20px', color: 'var(--secondary)' }}>Contact & Support</h1>
          <p style={{ fontSize: '1.05rem', maxWidth: '800px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Have questions about our product portfolio, export services, regulatory documentation, or international business opportunities? Get in touch with our team.          </p>
        </div>
      </section>

      {/* 2. Main Two Column Grid */}
      <div className="container" style={{ marginTop: '48px' }}>
        <div className="grid grid-cols-2" style={{ gap: '48px', alignItems: 'start' }}>

          {/* Left Column: Office Contacts */}
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--secondary)' }}>Contact Information</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {contactHubs.map((hub, idx) => (
                <div key={idx} className="card" style={{ padding: '24px', backgroundColor: 'var(--bg-white)', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid var(--border)', boxShadow: 'none', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{hub.name}</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '4px 8px', borderRadius: '4px' }}>{hub.role}</span>
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                    <div className="flex align-center" style={{ gap: '10px' }}>
                      <MapPin size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                      <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{hub.location}</span>
                    </div>
                    <div className="flex align-center" style={{ gap: '10px' }}>
                      <Phone size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                      <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{hub.phone}</span>
                    </div>
                    {hub.email && (
                      <div className="flex align-center" style={{ gap: '10px' }}>
                        <Mail
                          size={14}
                          style={{ color: 'var(--primary)', flexShrink: 0 }}
                        />
                        <span
                          style={{
                            color: 'var(--secondary)',
                            fontWeight: 700
                          }}
                        >
                          {hub.email}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quality SLA Card */}
            <div className="card" style={{ padding: '20px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-white)', display: 'flex', gap: '16px', flexDirection: 'row', alignItems: 'center', boxShadow: 'none', borderRadius: '8px' }}>
              <div style={{ display: 'flex', padding: '12px', backgroundColor: 'var(--primary-light)', borderRadius: '50%', color: 'var(--primary)', flexShrink: 0 }}>
                <ShieldCheck size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9375rem', color: 'var(--secondary)', fontWeight: 700, marginBottom: '4px' }}>Dossier & Documentation Support</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  Alfacure provides regulatory and documentation support, including Certificates of Analysis (COA), export documentation, and product dossiers for international business requirements.                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="card" style={{ backgroundColor: 'var(--bg-white)', padding: '36px', textAlign: 'left', border: '1px solid var(--border)', boxShadow: 'none', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 700, marginBottom: '24px', color: 'var(--secondary)' }}>Send an Inquiry</h2>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', marginBottom: '20px' }}>
                  <CheckCircle size={40} />
                </div>
                <h3 style={{ marginBottom: '8px', color: 'var(--secondary)' }}>Inquiry Submitted!</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Thank you for reaching out. A business development representative will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2" style={{ gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ padding: '8px 12px', fontSize: '0.8125rem' }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Work Email</label>
                    <input
                      type="email"
                      required
                      className="form-control"
                      placeholder="name@healthcare.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ padding: '8px 12px', fontSize: '0.8125rem' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2" style={{ gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Company / Hospital</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="Hospital Group or Distributor"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={{ padding: '8px 12px', fontSize: '0.8125rem' }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Subject</label>
                    <select
                      className="form-control"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      style={{ padding: '8px 12px', fontSize: '0.8125rem' }}
                    >
                      <option value="general">General Business Inquiries</option>
                      <option value="quote">  Request Product Information & Pricing</option>
                      <option value="export">  Export Documentation Support</option>
                      <option value="contract">Contract Manufacturing Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Details</label>
                  <textarea
                    required
                    className="form-control"
                    placeholder="Please share your requirements, product interests, and any additional details. Our team will get back to you shortly."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ padding: '8px 12px', fontSize: '0.8125rem', minHeight: '110px' }}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
