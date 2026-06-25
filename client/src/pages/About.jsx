import React, { useState } from 'react';
import { Compass, ShieldCheck, Cpu, Leaf, MapPin, ArrowRight } from 'lucide-react';

export default function About({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('europe');

  const timelineEvents = [
    {
      year: '2012',
      title: 'The Foundation',
      desc: 'Founded with a single vision: to apply advanced sterile Blow-Fill-Seal (BFS) automation to the delicate requirements of parenteral infusions manufacturing.',
      image: '/assets/Screenshot 2026-06-21 114234.png',
      align: 'right'
    },
    {
      year: '2016',
      title: 'First Sterile IV Line',
      desc: 'Achieved WHO-GMP certification, launching our first fully automated, zero-contact IV fluid packaging line adopted by major clinical networks.',
      image: '/assets/Screenshot 2026-06-21 114234.png',
      align: 'left'
    },
    {
      year: '2023',
      title: 'Global Expansion',
      desc: 'Opened strategic export channels, expanding our supply of life-saving infusions and injections to over 25 countries worldwide.',
      image: '/assets/Screenshot 2026-06-21 114234.png',
      align: 'right'
    }
  ];

  const stats = [
    { value: '500+', label: 'CLINICAL PARTNERS', desc: 'Hospitals and distributors globally' },
    { value: '99.9%', label: 'STERILITY ASSURANCE', desc: 'Guaranteed by automated BFS lines' },
    { value: '14', label: 'APPROVED FORMULARY RANGES', desc: 'Therapeutic injection categories' },
    { value: '24/7', label: 'LOGISTICS SUPPORT', desc: 'Secure temperature-controlled shipping' }
  ];

  const principles = [
    {
      icon: <span style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 'bold' }}>💡</span>,
      title: 'Innovation',
      desc: 'Pioneering R&D to solve the next generation of pharma challenges.'
    },
    {
      icon: <Compass size={20} style={{ color: 'var(--primary)' }} />,
      title: 'Precision',
      desc: 'Micron-level accuracy in every sterile formulation.'
    },
    {
      icon: <ShieldCheck size={20} style={{ color: 'var(--primary)' }} />,
      title: 'Quality',
      desc: 'Rigorous testing exceeding all international standards.'
    },
    {
      icon: <Cpu size={20} style={{ color: 'var(--primary)' }} />,
      title: 'Reliability',
      desc: 'Formulated for clinical trust and chemical stability.'
    },
    {
      icon: <Leaf size={20} style={{ color: 'var(--primary)' }} />,
      title: 'Sustainability',
      desc: 'Eco-friendly Blow-Fill-Seal packaging with recyclable polymers.'
    }
  ];

  const complianceItems = [
    { name: 'ISO 9001', label: 'Quality Management' },
    { name: 'GMP', label: 'Good Manufacturing Practice' },
    { name: 'CE', label: 'European Conformity' },
    { name: 'FDA 21', label: 'Part 11 Compliance' }
  ];

  const regions = {
    europe: {
      title: 'Europe Region',
      locations: ['Zurich, CH (Global HQ)', 'Berlin, DE (Service)', 'Munich, DE (Logistics)']
    },
    americas: {
      title: 'Americas Region',
      locations: ['New Jersey, USA (Manufacturing)', 'São Paulo, BR (Field Support)']
    },
    apac: {
      title: 'Asia Pacific Region',
      locations: ['Singapore (R&D / Assembly)', 'Shanghai, CN (Support Hub)']
    },
    support: {
      title: 'Global Support',
      locations: ['24/7 Remote Telemetry Diagnostics', 'On-Demand Field Service (45 countries)']
    }
  };

  const leaders = [
    {
      name: 'Dr. Markus Vögele',
      role: 'CHIEF EXECUTIVE OFFICER',
      desc: 'A doctorate in Mechanical Engineering with 25 years of experience leading global industrial manufacturing firms.',
      image: '/assets/ceo_headshot.png'
    },
    {
      name: 'Elena Rossi',
      role: 'CHIEF TECHNOLOGY OFFICER',
      desc: 'Pioneer in AI-driven predictive maintenance and automated sterilization systems for medical assembly lines.',
      image: '/assets/cto_headshot.png'
    },
    {
      name: 'Tan Wei Ming',
      role: 'HEAD OF MANUFACTURING',
      desc: 'Specializing in Lean Manufacturing and global supply chain logistics across APAC and European markets.',
      image: '/assets/mfg_headshot.png'
    }
  ];

  return (
    <div className="page-container animate-fade-in" style={{ backgroundColor: '#ffffff' }}>

      {/* 1. Hero Section */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', padding: '140px 0 100px 0', borderBottom: '1px solid var(--border)', textAlign: 'left', minHeight: '520px', display: 'flex', alignItems: 'center' }}>
        {/* Full-width Video Background */}
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

        {/* Semi-transparent Light Overlay for maximum legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.81) 0%, rgba(255, 255, 255, 0.28) 50%, rgba(255, 255, 255, 0.12) 100%)',
            zIndex: 1
          }}
        >
        </div>


        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="grid grid-cols-12">
            <div style={{ gridColumn: 'span 7' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>
                PIONEERING PRECISION
              </span>
              <h1 style={{ fontSize: '3.125rem', fontWeight: 800, lineHeight: '1.15', color: 'var(--secondary)', marginBottom: '24px', letterSpacing: '-0.02em' }}>
                Engineering Excellence in Medical Technology
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '36px', lineHeight: '1.6', maxWidth: '520px' }}>
                Alfacure Lifescience formulates and supplies high-performance sterile parenterals for the world's leading healthcare systems, ensuring global health standards through formulation mastery.
              </p>

              <div className="flex" style={{ gap: '16px' }}>
                <button className="btn btn-primary" onClick={() => setCurrentPage('products')}>
                  OUR CAPABILITIES
                </button>
                <button className="btn btn-outline" onClick={() => setCurrentPage('gallery')}>
                  VIEW FACILITY
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Legacy of Innovation (Timeline) */}
      <section className="section" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-title-wrapper" style={{ marginBottom: '64px' }}>
            <h2 className="section-title" style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--secondary)' }}>Our Legacy of Innovation</h2>
            <div style={{ width: '40px', height: '3px', backgroundColor: 'var(--primary)', margin: '12px auto 0 auto' }}></div>
          </div>

          <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', padding: '20px 0' }}>
            {/* Center vertical line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                width: '1px',
                background: 'var(--primary)',
                transform: 'translateX(-50%)',
                opacity: 0.3
              }}
            ></div>

            {timelineEvents.map((event, idx) => (
              <div
                key={event.year}
                className="grid grid-cols-2"
                style={{
                  marginBottom: '64px',
                  position: 'relative',
                  alignItems: 'center'
                }}
              >
                {/* Center dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: '2px solid var(--primary)',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2
                  }}
                ></div>

                {/* Content Column */}
                <div style={{ textAlign: event.align === 'right' ? 'right' : 'left', paddingRight: event.align === 'right' ? '48px' : '0', paddingLeft: event.align === 'right' ? '0' : '48px', gridColumn: event.align === 'right' ? 1 : 2 }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'rgba(0, 91, 196, 0.15)', lineHeight: 1, marginBottom: '8px' }}>
                    {event.year}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--secondary)', marginBottom: '10px', fontWeight: 700 }}>{event.title}</h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>{event.desc}</p>
                </div>

                {/* Image Column */}
                <div style={{ paddingLeft: event.align === 'right' ? '48px' : '0', paddingRight: event.align === 'right' ? '0' : '48px', gridColumn: event.align === 'right' ? 2 : 1 }}>
                  <div style={{ height: '150px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <img
                      src={event.image}
                      alt={event.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Uncompromising Production Quality */}
      <section className="section" style={{ backgroundColor: '#0a1931', color: '#e2e8f0', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '100px 0' }}>
        <div className="container">
          <div className="grid grid-cols-2 align-center" style={{ gap: '64px' }}>

            {/* Left Image Stack */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  height: '360px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <img
                  src="/assets/production_floor.png"
                  alt="Alfacure Sterile Production Floor"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Blue Overlay Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-24px',
                  left: '24px',
                  padding: '24px 36px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--primary)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                  textAlign: 'left',
                  color: '#ffffff'
                }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>14+</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px' }}>
                  YEARS OF MASTERY
                </div>
              </div>
            </div>

            {/* Right Stats and Details */}
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ color: '#ffffff', fontSize: '2.25rem', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.01em' }}>
                Uncompromising Production Quality
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '36px' }}>
                Our facilities operate at the highest tier of GMP compliance, utilizing automated quality control systems that check 1,200 data points per second.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2" style={{ gap: '24px 32px' }}>
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary-light)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '4px 0' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {stat.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Principles of Performance */}
      <section className="section" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-title-wrapper" style={{ marginBottom: '48px' }}>
            <h2 className="section-title" style={{ fontSize: '2.25rem', color: 'var(--secondary)' }}>Principles of Performance</h2>
            <p className="section-desc" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>The five pillars that guide every formulation we mix and every sterile batch we release.</p>
          </div>

          <div className="grid grid-cols-5" style={{ gap: '20px' }}>
            {principles.map((pr, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: '24px 20px',
                  textAlign: 'left',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--border)',
                  backgroundColor: '#ffffff',
                  boxShadow: 'none'
                }}
              >
                <div style={{ display: 'flex', padding: '10px', backgroundColor: 'var(--primary-light)', borderRadius: '6px', width: 'fit-content', marginBottom: '20px' }}>
                  {pr.icon}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{pr.title}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Certified Compliance */}
      <section className="section" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border)', padding: '80px 0' }}>
        <div className="container flex justify-between align-center" style={{ gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'left', maxWidth: '400px' }}>
            <h3 style={{ fontSize: '1.85rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '12px' }}>Certified Compliance</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              We adhere to the world's most stringent manufacturing and safety standards to protect your production integrity.
            </p>
          </div>

          <div className="flex" style={{ gap: '24px', flexWrap: 'wrap', flexGrow: 1, justifyContent: 'flex-end' }}>
            {complianceItems.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  width: '120px',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    border: '1px solid var(--border)',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: 'var(--primary)'
                  }}
                >
                  {c.name}
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Our Global Footprint */}
      <section className="section" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-title-wrapper" style={{ marginBottom: '48px' }}>
            <h2 className="section-title" style={{ fontSize: '2.25rem', color: 'var(--secondary)' }}>Our Global Footprint</h2>
            <p className="section-desc" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Strategic centers across three continents to provide localized manufacturing and rapid technical response.</p>
          </div>

          {/* Footprint Box */}
          <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '36px', maxWidth: '900px', margin: '0 auto', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

              {/* Graphic Map representing global footprint */}
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '240px', backgroundColor: '#ffffff', borderRadius: '6px' }}>
                <div style={{ position: 'absolute', width: '180px', height: '180px', borderRadius: '50%', border: '4px dashed rgba(0, 91, 196, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.7rem', fontWeight: 600 }}>Interactive Map Representation</span>
                </div>
                {/* Dots mimicking the screenshot */}
                <div style={{ position: 'absolute', top: '35%', left: '25%', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
                <div style={{ position: 'absolute', top: '25%', left: '30%', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
                <div style={{ position: 'absolute', top: '40%', left: '35%', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '72%', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
                <div style={{ position: 'absolute', top: '60%', left: '78%', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
              </div>

              {/* Region Links */}
              <div className="grid grid-cols-4" style={{ gap: '20px', borderTop: '1px solid var(--border)', paddingTop: '24px', textAlign: 'left' }}>
                {Object.keys(regions).map((key) => (
                  <div key={key}>
                    <h4
                      onClick={() => setActiveTab(key)}
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      {regions[key].title.split(' ')[0]}
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {regions[key].locations.map((loc, i) => (
                        <li key={i}>{loc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. Executive Leadership */}
      <section className="section" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-title-wrapper" style={{ marginBottom: '48px' }}>
            <h2 className="section-title" style={{ fontSize: '2.25rem', color: 'var(--secondary)' }}>Executive Leadership</h2>
            <p className="section-desc" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Guided by decades of expertise in industrial automation and pharmaceutical science.</p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '24px' }}>
            {leaders.map((leader, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <div style={{ height: '260px', overflow: 'hidden', borderRadius: '6px', marginBottom: '16px', border: '1px solid var(--border)' }}>
                  <img
                    src={leader.image}
                    alt={leader.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <h3 style={{ fontSize: '1rem', color: 'var(--secondary)', fontWeight: 700, marginBottom: '2px' }}>{leader.name}</h3>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                  {leader.role}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{leader.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Optimize Your Supply Chain CTA */}
      <section className="section" style={{ backgroundColor: '#ffffff', padding: '60px 0 100px 0' }}>
        <div className="container">
          <div
            style={{
              background: 'var(--primary)',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '60px 48px',
              textAlign: 'center'
            }}
          >
            <h2 style={{ color: '#ffffff', fontSize: '2.25rem', fontWeight: 700, marginBottom: '16px' }}>Optimize Your Supply Chain</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', marginBottom: '32px', maxWidth: '640px', margin: '0 auto' }}>
              Consult with our relations team to design a custom supply cycle tailored to your specific pharmaceutical requirements.
            </p>
            <div className="flex" style={{ gap: '16px', justifyContent: 'center' }}>
              <button className="btn btn-white" onClick={() => setCurrentPage('support')}>REQUEST A CONSULTATION</button>
              <button className="btn btn-white-outline" onClick={() => setCurrentPage('products')}>DOWNLOAD TECHNICAL SPECS</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
