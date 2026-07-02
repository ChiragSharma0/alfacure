import React from 'react';
import { Globe, Phone, MapPin, Mail } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  const handleLinkClick = (pageId, e) => {
    e.preventDefault();
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = pageId;
  };

  return (
    <footer
      className="footer-wrapper"
      style={{
        backgroundColor: 'var(--blue-dark)',
        color: 'rgba(255,255,255,0.7)',
        padding: '60px 0 24px 0',
        marginTop: 'auto',
        fontSize: '0.875rem'
      }}
    >
      <div className="container">
        <div className="footer-top">
          {/* Brand Col */}
          <div className="footer-brand">
            <h2
              style={{
                fontSize: '1.5rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '4px'
              }}
            >
              Alfacure Lifescience
            </h2>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--green-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Private Limited
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '16px', maxWidth: '320px', lineHeight: 1.55 }}>
              Exclusive export company of Realcade Lifescience Pvt. Ltd. Carrying quality beyond borders since 2013.
            </p>
            <div className="flex align-center" style={{ gap: '8px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
              <MapPin size={14} style={{ color: 'var(--green-light)', flexShrink: 0 }} />
              <span>Ahmedabad, Gujarat, India</span>
            </div>
          </div>

          {/* Company Col */}
          <div className="footer-col">
            <h4 style={{ color: '#ffffff' }}>Company</h4>
            <ul>
              <li><a href="#home" onClick={(e) => handleLinkClick('home', e)}>Home</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick('about', e)}>About Us</a></li>
              <li><a href="#gallery" onClick={(e) => handleLinkClick('gallery', e)}>Facility Gallery</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick('about', e)}>Our Vision</a></li>
            </ul>
          </div>

          {/* Products Col */}
          <div className="footer-col">
            <h4 style={{ color: '#ffffff' }}>Products</h4>
            <ul>
              <li><a href="#products" onClick={(e) => handleLinkClick('products', e)}>IV Fluids</a></li>
              <li><a href="#products" onClick={(e) => handleLinkClick('products', e)}>Antibiotic Injectables</a></li>
              <li><a href="#products" onClick={(e) => handleLinkClick('products', e)}>Antifungal Infusions</a></li>
              <li><a href="#products" onClick={(e) => handleLinkClick('products', e)}>Full Catalog</a></li>
            </ul>
          </div>

          {/* Support Col */}
          <div className="footer-col">
            <h4 style={{ color: '#ffffff' }}>Support</h4>
            <ul>
              <li><a href="#support" onClick={(e) => handleLinkClick('support', e)}>Contact Us</a></li>
              <li><a href="#support" onClick={(e) => handleLinkClick('support', e)}>Export Inquiries</a></li>
              <li><a href="#support" onClick={(e) => handleLinkClick('support', e)}>Request Quote</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick('about', e)}>Certifications</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>© 2025 Alfacure Lifescience Pvt. Ltd. All rights reserved.</p>
          <div className="flex align-center" style={{ gap: '16px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            <div className="flex align-center" style={{ gap: '6px' }}>
              <Phone size={12} style={{ color: 'var(--green-light)' }} />
              <span>+91 98795 00383</span>
            </div>
            <div className="flex align-center" style={{ gap: '6px' }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: 'var(--green-dark)',
                  borderRadius: '50%',
                  display: 'inline-block'
                }}
              />
              <span>WHO-GMP Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
