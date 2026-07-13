import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import HeroImage from "../assets/images/hero.webp"
import MapImage from '../assets/images/map.webp'
import {
  ArrowRight,
  Globe,
  MapPin,
  CheckCircle,
  ChevronRight,
  Droplets,
  Pill,
  Syringe
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function Home() {
  const navigate = useNavigate();
  const { content, R2_PUBLIC_URL } = useCMS();
  const [visibleStats, setVisibleStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisibleStats(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      value: '6',
      label: 'Pack Sizes',
      desc: '100 mL to 1000 mL'
    },
    {
      value: 'Global',
      label: 'Export Markets',
      desc: 'India, UAE, Asia & Africa'
    },
    {
      value: '2026',
      label: 'Established',
      desc: 'Ahmedabad-based enterprise'
    },
    {
      value: 'ISO',
      label: 'Certified',
      desc: 'ISO & CRISIL certified'
    }
  ];

  const capabilities = [
    {
      icon: <Droplets size={24} />,
      title: 'Fluid & Electrolyte Solutions',
      desc:
        'Comprehensive LVP solutions including Dextrose Injection, Sodium Chloride, DNS and Ringer Lactate infusions available in multiple volume configurations.',
      link: 'products'
    },

    {
      icon: <Pill size={24} />,
      title: 'Anti-Infective Infusions',
      desc:
        'High-efficacy antibacterial formulations including Ciprofloxacin, Ofloxacin, Levofloxacin, Moxifloxacin and Linezolid infusions.',
      link: 'products'
    },

    {
      icon: <Syringe size={24} />,
      title: 'Critical Care Products',
      desc:
        'Mannitol, Paracetamol, Fluconazole, Metronidazole, Ornidazole and specialized electrolyte infusions for clinical applications.',
      link: 'products'
    }
  ];

  const trustPoints = [
    'Specialized LVP export expertise',
    'Available in 100 mL to 1000 mL variants',
    'CTD / eCTD / ACTD dossier support',
    'Global regulatory documentation',
    'Complete batch traceability & CoA',
    'ISO & CRISIL certified'
  ];

  const getAssetUrl = (fileName, defaultPath) => {
    if (content && Object.keys(content).length > 0) {
      return `${R2_PUBLIC_URL}/${fileName}`;
    }
    return defaultPath;
  };

  return (
    <div
      className="page-container animate-fade-in"
      style={{ backgroundColor: 'var(--white)' }}
    >
      <SEO
        title="Premium Large Volume Parenteral Solutions"
        description="Alfacure Lifescience Pvt. Ltd. — Ahmedabad-based pharmaceutical export company specializing in LVP formulations, IV fluids, anti-infective infusions and critical care products for global healthcare institutions."
        canonical="https://alfacurelifescience.com/"
      />
      {/* ─── HERO SECTION ─── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          padding: '120px 0 80px 0'
        }}
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={getAssetUrl('production_floor.png', '/assets/production_floor.png')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-medicine-dripping-from-a-pipette-40156-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(31,61,90,0.88) 0%, rgba(77,111,90,0.72) 50%, rgba(31,61,90,0.85) 100%)',
            zIndex: 1
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '720px' }}>
            <div
              className="animate-fade-in-up"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(127, 161, 138, 0.5)',
                backgroundColor: 'rgba(77, 111, 90, 0.2)',
                marginBottom: '24px'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#7FA18A'
                }}
              />

              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#7FA18A',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase'
                }}
              >
                Carrying Quality Beyond Borders
              </span>
            </div>

            <h1
              className="hero-title animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              {content?.home?.heroTitle1 || 'Premium Large Volume'}
              <br />
              <span style={{ color: '#64a178ff' }}>
                {content?.home?.heroTitle2 || 'Parenteral Solutions'}
              </span>
            </h1>

            <p
              className="hero-text animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              {content?.home?.heroDesc || 'Alfacure Lifescience Pvt. Ltd. is an Ahmedabad-based pharmaceutical export company specializing in the commercialization and global distribution of life-saving Large Volume Parenteral (LVP) formulations, serving healthcare institutions across domestic and international markets through its strategic partnership with Realcade Lifescience Pvt. Ltd.'}
            </p>

            <div
              className="hero-buttons animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <button
                className="btn btn-primary btn-shine"
                style={{
                  backgroundColor: 'var(--green-dark)',
                  padding: '14px 32px',
                  fontSize: '0.9rem',
                  borderRadius: '6px',
                  boxShadow: '0 4px 14px rgba(77, 111, 90, 0.4)'
                }}
                onClick={() => navigate('/products')}
              >
                Explore Our Products

                <ArrowRight
                  size={16}
                  style={{ marginLeft: '4px' }}
                />
              </button>

              <button
                className="btn"
                style={{
                  backgroundColor: 'transparent',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  color: '#ffffff',
                  padding: '14px 32px',
                  fontSize: '0.9rem',
                  borderRadius: '6px'
                }}
                onClick={() => navigate('/about')}
              >
                About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}

      <section style={{
        backgroundColor: 'var(--blue-dark)',
        padding: '0',
        position: 'relative',
        zIndex: 3,
        marginTop: '-1px'
      }}
      >
        <div className="container">
          <div className="stats-grid">
            {(content?.home?.stats || stats).map((stat, i) => (
              <div
                key={i}
                className="stat-card"
                style={{
                  borderRight:
                    i < 3
                      ? '1px solid rgba(255,255,255,0.1)'
                      : 'none',

                  opacity: visibleStats ? 1 : 0,

                  transform: visibleStats
                    ? 'translateY(0)'
                    : 'translateY(16px)',

                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15
                    }s`
                }}
              >
                <div
                  style={{
                    fontSize: '2.25rem',
                    fontWeight: 800,
                    color: '#7FA18A',
                    lineHeight: 1
                  }}
                >
                  {stat.value}
                </div>

                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.9)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginTop: '8px'
                  }}
                >
                  {stat.label}
                </div>

                <div
                  style={{
                    fontSize: '0.7rem',
                    color: 'rgba(255,255,255,0.45)',
                    marginTop: '4px'
                  }}
                >
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>








      {/* ─── CAPABILITIES ─── */}
      <section className="section" style={{ backgroundColor: 'var(--white)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--green-dark)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '12px',
                display: 'inline-block'
              }}
            >
              WHAT WE SUPPLY
            </span>

            <h2
              style={{
                fontSize: '2.25rem',
                fontWeight: 700,
                color: 'var(--blue-dark)',
                marginBottom: '16px'
              }}
            >
              Large Volume Parenteral Portfolio
            </h2>

            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--blue-light)',
                maxWidth: '650px',
                margin: '0 auto'
              }}
            >
              Our product portfolio spans critical therapeutic categories, including fluid replenishment,
              anti-infectives, electrolyte solutions and specialty formulations available in pack sizes
              ranging from 100 mL to 1000 mL.
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '28px' }}>
            {(content?.home?.capabilities || capabilities).map((cap, i) => (
              <div
                key={i}
                className="card"
                onClick={() => navigate('/products')}
                style={{
                  padding: '36px 28px',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  borderTop: '3px solid var(--green-dark)',
                  cursor: 'pointer'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '52px',
                    height: '52px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--green-dark)',
                    marginBottom: '20px'
                  }}
                >
                  {i === 0 && <Droplets size={24} />}
                  {i === 1 && <Pill size={24} />}
                  {i === 2 && <Syringe size={24} />}
                </div>

                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--blue-dark)',
                    marginBottom: '12px'
                  }}
                >
                  {cap.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--blue-light)',
                    lineHeight: 1.6,
                    flexGrow: 1
                  }}
                >
                  {cap.desc}
                </p>

                <div
                  className="flex align-center"
                  style={{
                    gap: '6px',
                    marginTop: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--green-dark)'
                  }}
                >
                  View Range <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY ALFACURE ─── */}
      <section
        className="section"
        style={{
          backgroundColor: 'var(--bg-light)',
          padding: '80px 0',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <div className="container">
          <div className="grid grid-cols-2 align-center" style={{ gap: '64px' }}>
            {/* Left */}
            <div style={{ position: 'relative' }}>
              <div
                className="about-image"
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  boxShadow: '0 20px 40px rgba(31,61,90,0.12)'
                }}
              >
                <img
                  src={HeroImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/production_floor.png';
                  }}
                  alt="Alfacure Lifescience Export Operations"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '24px',
                  padding: '20px 28px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--green-dark)',
                  boxShadow: '0 10px 25px rgba(77,111,90,0.35)',
                  color: '#fff',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>
                  ISO
                </div>

                <div
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.8)',
                    marginTop: '4px'
                  }}
                >
                  CERTIFIED
                </div>
              </div>
            </div>

            {/* Right */}
            <div style={{ textAlign: 'left' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--green-dark)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  marginBottom: '12px'
                }}
              >
                WHY ALFACURE
              </span>

              <h2
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--blue-dark)',
                  marginBottom: '20px',
                  lineHeight: 1.2
                }}
              >
                Trusted Partner for Global Pharmaceutical Exports
              </h2>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--blue-light)',
                  lineHeight: 1.65,
                  marginBottom: '32px'
                }}
              >
                Alfacure Lifescience Pvt. Ltd. specializes in the export and
                commercialization of Large Volume Parenteral products. Through our
                strategic partnership with Realcade Lifescience Pvt. Ltd., we provide
                high-quality pharmaceutical solutions backed by comprehensive
                regulatory support and international documentation.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px'
                }}
              >
                {(content?.home?.trustPoints || trustPoints).map((point, i) => (
                  <div
                    key={i}
                    className="flex align-center"
                    style={{
                      gap: '10px',
                      fontSize: '0.8rem',
                      color: 'var(--blue-dark)',
                      fontWeight: 500
                    }}
                  >
                    <CheckCircle
                      size={16}
                      style={{
                        color: 'var(--green-dark)',
                        flexShrink: 0
                      }}
                    />

                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-primary btn-shine"
                style={{
                  marginTop: '32px',
                  padding: '12px 28px',
                  backgroundColor: 'var(--green-dark)',
                  borderRadius: '6px'
                }}
                onClick={() => navigate('/about')}
              >
                Learn More About Us
                <ArrowRight size={14} style={{ marginLeft: '4px' }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MANUFACTURING BACKBONE ─── */}
      <section
        className="section"
        style={{
          backgroundColor: 'var(--blue-dark)',
          padding: '80px 0',
          color: '#ffffff'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--green-light)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '12px'
              }}
            >
              OUR MARKETS
            </span>

            <h2
              style={{
                fontSize: '2.25rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '16px'
              }}
            >
              Expanding Across Global Healthcare Networks
            </h2>

            <p
              style={{
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '700px',
                margin: '0 auto'
              }}
            >
            Alfacure Lifescience Pvt. Ltd. serves domestic and international
            markets through a strong export network, delivering high-quality
            pharmaceutical formulations with complete regulatory support.
          </p>
        </div>

        {/* Global Export World Map */}
        <div 
          style={{ 
            maxWidth: '900px', 
            margin: '0 auto 48px auto', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            border: '1px solid rgba(127, 161, 138, 0.15)',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.3)',
            backgroundColor: 'rgba(255, 255, 255, 0.02)'
          }}
        >
          <img 
            src={MapImage} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/export_map.png';
            }}
            alt="Alfacure Global Export Map" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block' 
            }} 
          />
        </div>

        <div className="grid grid-cols-3" style={{ gap: '24px' }}>
            {[
              {
                label: 'Indian Market',
                title: 'India (Primary Market)',
                specs: [
                  'Robust domestic supply network',
                  'Leading supplier of critical IV fluids',
                  'Strategic hospital partnerships'
                ]
              },
              {
                label: 'Middle East',
                title: 'United Arab Emirates (UAE Main)',
                specs: [
                  'Strategic export operations',
                  'Reliable supply chain',
                  'Healthcare distribution support'
                ]
              },
              {
                label: 'Asia & Africa',
                title: 'Global Export Network',
                specs: [
                  'Nepal, Philippines, Thailand (Asia)',
                  'Ghana, Kenya (Africa), & more',
                  'CTD / eCTD dossier support'
                ]
              }
            ].map((market, i) => (
              <div
                key={i}
                style={{
                  padding: '32px 28px',
                  borderRadius: '10px',
                  border: '1px solid rgba(127, 161, 138, 0.25)',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  textAlign: 'left'
                }}
              >
                <div
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    color: 'var(--green-light)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}
                >
                  {market.label}
                </div>

                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '20px'
                  }}
                >
                  {market.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {market.specs.map((spec, j) => (
                    <div
                      key={j}
                      className="flex align-center"
                      style={{
                        gap: '8px',
                        fontSize: '0.8rem',
                        color: 'rgba(255,255,255,0.7)'
                      }}
                    >
                      <CheckCircle
                        size={14}
                        style={{
                          color: 'var(--green-light)',
                          flexShrink: 0
                        }}
                      />

                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="section" style={{ backgroundColor: 'var(--white)', padding: '80px 0' }}>
        <div className="container">
          <div className="cta-banner">
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} />
            <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />

            <h2 style={{ color: '#ffffff', fontSize: '2.25rem', fontWeight: 700, marginBottom: '16px', position: 'relative', zIndex: 2 }}>
              Ready to Partner with Us?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', marginBottom: '36px', maxWidth: '560px', margin: '0 auto 36px auto', position: 'relative', zIndex: 2 }}>
              For export inquiries, product information, and partnership opportunities — reach out to our global business development team.
            </p>
            <div className="flex contact-buttn" style={{ gap: '16px', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
              <button
                className="btn btn-shine"
                style={{
                  backgroundColor: '#ffffff',
                  color: 'var(--blue-dark)',
                  padding: '14px 32px',
                  fontWeight: 700,
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/support')}
              >
                Contact Us
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: 'transparent',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  color: '#ffffff',
                  padding: '14px 32px',
                  fontWeight: 700,
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/products')}
              >
                View Product Catalog
              </button>
            </div>
          </div>
        </div>
      </section>
    </div >
  );
}
