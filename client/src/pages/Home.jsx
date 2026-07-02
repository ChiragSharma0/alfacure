import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, Globe, Beaker, Factory, CheckCircle, ChevronRight, Droplets, Pill, Syringe } from 'lucide-react';

export default function Home({ setCurrentPage }) {
  const [visibleStats, setVisibleStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisibleStats(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { value: '71+', label: 'Formulations', desc: 'Sterile parenteral products' },
    { value: '25+', label: 'Countries', desc: 'Global export reach' },
    { value: '99.9%', label: 'Sterility', desc: 'Assurance level guaranteed' },
    { value: '2013', label: 'Established', desc: 'Over a decade of excellence' }
  ];

  const capabilities = [
    {
      icon: <Droplets size={24} />,
      title: 'IV Fluid Solutions',
      desc: 'Comprehensive range of large volume parenterals including Normal Saline, Dextrose, and Ringer Lactate in 100ml to 1000ml configurations.',
      link: 'products'
    },
    {
      icon: <Pill size={24} />,
      title: 'Antibiotic Injectables',
      desc: 'WHO-GMP certified antibiotic formulations including Ciprofloxacin, Levofloxacin, Metronidazole, and Moxifloxacin infusions.',
      link: 'products'
    },
    {
      icon: <Syringe size={24} />,
      title: 'Antifungal Formulations',
      desc: 'Sterile antifungal infusions such as Fluconazole prepared under aseptic Form-Fill-Seal technology for maximum safety.',
      link: 'products'
    }
  ];

  const trustPoints = [
    'WHO-GMP Certified Manufacturing',
    'Aseptic Form-Fill-Seal (FFS) Technology',
    'Complete CTD Export Dossier Support',
    'Temperature-Controlled Logistics',
    'Pyrogen-Free Sterile Formulations',
    'Full Batch Traceability & COA'
  ];

  return (
    <div className="page-container animate-fade-in" style={{ backgroundColor: 'var(--white)' }}>

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
          poster="/assets/production_floor.png"
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
          <source src="https://assets.mixkit.co/videos/preview/mixkit-medicine-dripping-from-a-pipette-40156-large.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(31,61,90,0.88) 0%, rgba(77,111,90,0.72) 50%, rgba(31,61,90,0.85) 100%)',
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
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#7FA18A' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7FA18A', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Carrying Quality Beyond Borders
              </span>
            </div>

            <h1
              className="animate-fade-in-up"
              style={{
                fontSize: '3.25rem',
                fontWeight: 800,
                lineHeight: 1.12,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: '24px',
                animationDelay: '0.1s'
              }}
            >
              World-Class Sterile <br />
              <span style={{ color: '#7FA18A' }}>Pharmaceutical Solutions</span>
            </h1>

            <p
              className="animate-fade-in-up"
              style={{
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.65,
                marginBottom: '40px',
                maxWidth: '560px',
                animationDelay: '0.2s'
              }}
            >
              Alfacure Lifescience is the exclusive export company of Realcade Lifescience Pvt. Ltd., delivering WHO-GMP certified parenteral formulations to healthcare providers across 25+ countries.
            </p>

            <div
              className="animate-fade-in-up flex"
              style={{ gap: '16px', flexWrap: 'wrap', animationDelay: '0.3s' }}
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
                onClick={() => setCurrentPage('products')}
              >
                Explore Our Products <ArrowRight size={16} style={{ marginLeft: '4px' }} />
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
                onClick={() => setCurrentPage('about')}
              >
                About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section
        style={{
          backgroundColor: 'var(--blue-dark)',
          padding: '0',
          position: 'relative',
          zIndex: 3,
          marginTop: '-1px'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0'
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '32px 24px',
                  textAlign: 'center',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  opacity: visibleStats ? 1 : 0,
                  transform: visibleStats ? 'translateY(0)' : 'translateY(16px)',
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`
                }}
              >
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#7FA18A', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '8px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>
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
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green-dark)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px', display: 'inline-block' }}>
              WHAT WE SUPPLY
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--blue-dark)', marginBottom: '16px' }}>
              Sterile Formulation Categories
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--blue-light)', maxWidth: '600px', margin: '0 auto' }}>
              Our product range covers critical therapeutic categories — all manufactured under stringent GMP and aseptic FFS conditions.
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '28px' }}>
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: '36px 28px',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  borderTop: '3px solid var(--green-dark)',
                  cursor: 'pointer'
                }}
                onClick={() => setCurrentPage(cap.link)}
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
                  {cap.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--blue-dark)', marginBottom: '12px' }}>
                  {cap.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--blue-light)', lineHeight: 1.6, flexGrow: 1 }}>
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
      <section className="section" style={{ backgroundColor: 'var(--bg-light)', padding: '80px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid grid-cols-2 align-center" style={{ gap: '64px' }}>
            {/* Left — Image Stack */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  height: '380px',
                  border: '1px solid var(--border)',
                  boxShadow: '0 20px 40px rgba(31,61,90,0.12)'
                }}
              >
                <img
                  src="/assets/production_floor.png"
                  alt="Alfacure WHO-GMP Manufacturing Facility"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              {/* Floating Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '24px',
                  padding: '20px 28px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--green-dark)',
                  boxShadow: '0 10px 25px rgba(77,111,90,0.35)',
                  color: '#ffffff',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>WHO</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>
                  GMP CERTIFIED
                </div>
              </div>
            </div>

            {/* Right — Content */}
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green-dark)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '12px' }}>
                WHY ALFACURE
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--blue-dark)', marginBottom: '20px', lineHeight: 1.2 }}>
                Trusted by Healthcare Providers Worldwide
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--blue-light)', lineHeight: 1.65, marginBottom: '32px' }}>
                Backed by Realcade Lifescience's state-of-the-art aseptic FFS manufacturing facilities in Gujarat, India, we deliver pharmaceutical-grade infusions with guaranteed sterility, traceability, and international regulatory compliance.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {trustPoints.map((point, i) => (
                  <div
                    key={i}
                    className="flex align-center"
                    style={{ gap: '10px', fontSize: '0.8rem', color: 'var(--blue-dark)', fontWeight: 500 }}
                  >
                    <CheckCircle size={16} style={{ color: 'var(--green-dark)', flexShrink: 0 }} />
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
                onClick={() => setCurrentPage('about')}
              >
                Learn More About Us <ArrowRight size={14} style={{ marginLeft: '4px' }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MANUFACTURING BACKBONE ─── */}
      <section className="section" style={{ backgroundColor: 'var(--blue-dark)', padding: '80px 0', color: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green-light)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '12px' }}>
              OUR MANUFACTURING BACKBONE
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
              Realcade Lifescience Pvt. Ltd.
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', maxWidth: '640px', margin: '0 auto' }}>
              Established in 2013, operating advanced manufacturing facilities specializing in sterile liquids using cutting-edge Aseptic Form-Fill-Seal technology.
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '24px' }}>
            {[
              { label: 'Unit 1', location: 'Kadi, Mehsana, Gujarat', specs: ['Sterile IV Fluid Production', 'FFS Aseptic Lines', 'WHO-GMP Validated'] },
              { label: 'Unit 2', location: 'Valod, Tapi, Gujarat', specs: ['Antibiotic Injectables', 'Antifungal Formulations', 'Expanded Capacity'] },
              { label: 'Capabilities', location: 'Production Range', specs: ['100ml to 1000ml Volumes', 'Domestic & Export Markets', 'IP, BP, USP Pharmacopeia'] }
            ].map((unit, i) => (
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
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--green-light)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {unit.label}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '20px' }}>
                  {unit.location}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {unit.specs.map((spec, j) => (
                    <div key={j} className="flex align-center" style={{ gap: '8px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
                      <CheckCircle size={14} style={{ color: 'var(--green-light)', flexShrink: 0 }} />
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
          <div
            style={{
              background: 'linear-gradient(135deg, var(--green-dark) 0%, var(--blue-dark) 100%)',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '64px 48px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} />
            <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />

            <h2 style={{ color: '#ffffff', fontSize: '2.25rem', fontWeight: 700, marginBottom: '16px', position: 'relative', zIndex: 2 }}>
              Ready to Partner with Us?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', marginBottom: '36px', maxWidth: '560px', margin: '0 auto 36px auto', position: 'relative', zIndex: 2 }}>
              For export inquiries, product information, and partnership opportunities — reach out to our global business development team.
            </p>
            <div className="flex" style={{ gap: '16px', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
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
                onClick={() => setCurrentPage('support')}
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
                onClick={() => setCurrentPage('products')}
              >
                View Product Catalog
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
