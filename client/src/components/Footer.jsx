import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkStyle = {
    color: '#94a3b8',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    fontSize: 'inherit',
    textAlign: 'left',
    textDecoration: 'none',
  };

  return (
    <footer
      className="footer-wrapper"
      style={{
        backgroundColor: 'var(--blue-dark)',
        color: 'rgba(255,255,255,0.7)',
        padding: '60px 0 24px 0',
        marginTop: 'auto',
        fontSize: '0.875rem',
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
                marginBottom: '4px',
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
              <li><a style={linkStyle} onClick={() => handleClick('/')}>Home</a></li>
              <li><a style={linkStyle} onClick={() => handleClick('/about')}>About Us</a></li>
              <li><a style={linkStyle} onClick={() => handleClick('/gallery')}>Facility Gallery</a></li>
              <li><a style={linkStyle} onClick={() => handleClick('/certifications')}>Certifications</a></li>
            </ul>
          </div>

          {/* Products Col */}
          <div className="footer-col">
            <h4 style={{ color: '#ffffff' }}>Products</h4>
            <ul>
              <li><a style={linkStyle} onClick={() => handleClick('/products')}>IV Fluids</a></li>
              <li><a style={linkStyle} onClick={() => handleClick('/products')}>Antibiotic Injectables</a></li>
              <li><a style={linkStyle} onClick={() => handleClick('/products')}>Antifungal Infusions</a></li>
              <li><a style={linkStyle} onClick={() => handleClick('/products')}>Full Catalog</a></li>
            </ul>
          </div>

          {/* Support Col */}
          <div className="footer-col">
            <h4 style={{ color: '#ffffff' }}>Legal & Support</h4>
            <ul>
              <li><a style={linkStyle} onClick={() => handleClick('/support')}>Contact Us</a></li>
              <li><a style={linkStyle} onClick={() => handleClick('/support')}>Export Inquiries</a></li>
              <li><a style={linkStyle} onClick={() => handleClick('/legal')}>Terms of Use</a></li>
              <li><a style={linkStyle} onClick={() => handleClick('/legal')}>Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', margin: 0 }}>
              © 2025 Alfacure Lifescience Pvt. Ltd. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem' }}>
              <a
                style={{ ...linkStyle, color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}
                onClick={() => handleClick('/legal')}
              >
                Terms of Use
              </a>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <a
                style={{ ...linkStyle, color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}
                onClick={() => handleClick('/legal')}
              >
                Privacy Policy
              </a>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <a
                style={{ ...linkStyle, color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}
                onClick={() => handleClick('/certifications')}
              >
                Certifications
              </a>
            </div>
          </div>
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
                  display: 'inline-block',
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
