import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import Logo from './Logo';

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
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'support', label: 'Contact' }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Update hash for deep linking
    window.location.hash = pageId;
  };

  return (
    <header
      className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}
      style={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${isScrolled ? 'var(--border)' : 'transparent'}`,
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container flex justify-between align-center" style={{ position: 'relative', width: '100%' }}>
        {/* Brand */}
        <a
          href="#home"
          className="flex align-center"
          style={{ gap: '10px' }}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
        >
          <Logo width="200" height="50" />
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
                fontWeight: 600,
                fontSize: '0.875rem',
                color: currentPage === item.id ? 'var(--green-dark)' : 'var(--blue-light)',
                position: 'relative',
                padding: '6px 0',
                borderBottom: currentPage === item.id ? '2px solid var(--green-dark)' : '2px solid transparent',
                transition: 'all 0.25s ease'
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex align-center" style={{ gap: '16px' }}>
          <button
            className="btn btn-primary btn-shine"
            style={{
              backgroundColor: 'var(--green-dark)',
              fontSize: '0.8rem',
              padding: '8px 20px',
              borderRadius: '6px'
            }}
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
              boxShadow: '0 12px 24px rgba(31, 61, 90, 0.1)',
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
                  color: currentPage === item.id ? 'var(--green-dark)' : 'var(--blue-dark)',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--bg-light)'
                }}
              >
                {item.label}
              </a>
            ))}
            <button
              className="btn btn-primary btn-shine"
              style={{
                width: '100%',
                marginTop: '8px',
                backgroundColor: 'var(--green-dark)',
                borderRadius: '6px'
              }}
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
