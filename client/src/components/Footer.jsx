import React from 'react';
import { Globe, Share2 } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  const handleLinkClick = (pageId, e) => {
    e.preventDefault();
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = pageId;
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-top">
          {/* Brand Col */}
          <div className="footer-brand">
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>Alfacure</h2>
            <p>
              World-class parenterals for life-saving innovation. Engineered for sterility, formulated for efficacy.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon" aria-label="Share">
                <Share2 size={18} />
              </a>
              <a href="#" className="social-icon" aria-label="Website">
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Company Col */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#about" onClick={(e) => handleLinkClick('about', e)}>Our Story</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick('about', e)}>Leadership</a></li>
              <li><a href="#gallery" onClick={(e) => handleLinkClick('gallery', e)}>Careers</a></li>
              <li><a href="#gallery" onClick={(e) => handleLinkClick('gallery', e)}>Press Room</a></li>
            </ul>
          </div>

          {/* Resources Col */}
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#about" onClick={(e) => handleLinkClick('about', e)}>Global Presence</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick('about', e)}>Certifications</a></li>
              <li><a href="#products" onClick={(e) => handleLinkClick('products', e)}>White Papers</a></li>
              <li><a href="#gallery" onClick={(e) => handleLinkClick('gallery', e)}>Case Studies</a></li>
            </ul>
          </div>

          {/* Support Col */}
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#support" onClick={(e) => handleLinkClick('support', e)}>Service Portal</a></li>
              <li><a href="#support" onClick={(e) => handleLinkClick('support', e)}>Privacy Policy</a></li>
              <li><a href="#support" onClick={(e) => handleLinkClick('support', e)}>Terms of Service</a></li>
              <li><a href="#support" onClick={(e) => handleLinkClick('support', e)}>Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Alfacure Lifescience Pvt. Ltd. All rights reserved.</p>
          <div className="footer-status">
            <span className="status-dot"></span>
            <span>System Status: Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
