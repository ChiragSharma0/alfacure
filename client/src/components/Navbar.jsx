import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About Us' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'support', label: 'Support' }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Update hash for deep linking
    window.location.hash = pageId;
  };

  return (
    <header className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container flex justify-between align-center" style={{ position: 'relative', width: '100%' }}>
        {/* Brand */}
        <a
          href="#about"
          className="flex align-center"
          style={{ gap: '10px' }}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('about');
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.45rem',
              color: 'var(--primary)',
              letterSpacing: '-0.02em'
            }}
          >
            Alfacure Lifescience
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links flex align-center" style={{ gap: '32px' }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              style={{
                fontWeight: 500,
                fontSize: '0.9375rem',
                color: currentPage === item.id ? 'var(--primary)' : 'var(--text-muted)',
                position: 'relative',
                padding: '6px 0',
                borderBottom: currentPage === item.id ? '2px solid var(--primary)' : '2px solid transparent'
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA / Search */}
        <div className="flex align-center" style={{ gap: '20px' }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center'
            }}
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          <button
            className="btn btn-primary"
            style={{ display: 'none', display: 'md-block' }} /* hidden on tiny mobile */
            onClick={() => handleNavClick('support')}
          >
            REQUEST QUOTE
          </button>

          {/* Mobile toggle button */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'var(--bg-white)',
              boxShadow: 'var(--shadow-lg)',
              borderBottom: '1px solid var(--border)',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              zIndex: 99
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                style={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: currentPage === item.id ? 'var(--primary)' : 'var(--secondary)',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--bg-light)'
                }}
              >
                {item.label}
              </a>
            ))}
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '8px' }}
              onClick={() => handleNavClick('support')}
            >
              REQUEST QUOTE
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
