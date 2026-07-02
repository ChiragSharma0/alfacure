import React from 'react';
import { Target, Eye, Briefcase, Globe, Factory, ShieldCheck, CheckCircle, ArrowRight, MapPin, Phone, Building2, Award, Users, Truck } from 'lucide-react';

export default function About({ setCurrentPage }) {

  const whatWeDo = [
    {
      icon: <Globe size={22} />,
      title: 'International Distribution',
      desc: 'Export of IV Fluids, antibiotic and antifungal injectables, and parenteral formulations to hospitals, distributors, and healthcare institutions worldwide.'
    },
    {
      icon: <Briefcase size={22} />,
      title: 'Regulatory & Documentation Support',
      desc: 'Handling export documentation, product dossiers, country-specific registrations, and compliance requirements for seamless market entry.'
    },
    {
      icon: <Factory size={22} />,
      title: 'Contract Manufacturing',
      desc: 'Facilitating overseas buyers to leverage Realcade\'s manufacturing capacity under private label or contract manufacturing agreements.'
    },
    {
      icon: <Users size={22} />,
      title: 'Global Business Development',
      desc: 'Building and managing long-term partnerships with importers, distributors, and government procurement bodies internationally.'
    }
  ];

  const whyAlfacure = [
    { icon: <Award size={18} />, text: 'Backed by a WHO-GMP Certified Manufacturer with over a decade of proven excellence' },
    { icon: <ShieldCheck size={18} />, text: 'State-of-the-art Aseptic FFS Technology ensuring sterility and precision in every product' },
    { icon: <Factory size={18} />, text: 'Two modern manufacturing units in Gujarat with high production capacity' },
    { icon: <Briefcase size={18} />, text: 'Strong product range across IV Fluids, antibiotics, and antifungal therapeutics' },
    { icon: <Truck size={18} />, text: 'Commitment to quality, affordability, and timely delivery in every international order' },
    { icon: <Users size={18} />, text: 'Experienced team handling global pharma trade, export compliance, and market development' }
  ];

  const manufacturingSpecs = [
    { label: 'Established', value: '2013' },
    { label: 'Certification', value: 'WHO-GMP Certified' },
    { label: 'Unit 1', value: 'Kadi, Mehsana, Gujarat' },
    { label: 'Unit 2', value: 'Valod, Tapi, Gujarat' },
    { label: 'Specialization', value: 'Sterile IV Fluids, Aseptic FFS Technology' },
    { label: 'Product Range', value: 'IV Fluids (100ml–1000ml), Antibiotics, Antifungals, Fluid Therapy' }
  ];

  return (
    <div className="page-container animate-fade-in" style={{ backgroundColor: 'var(--white)' }}>

      {/* ─── HERO ─── */}
      <section
        className="section"
        style={{
          backgroundColor: 'var(--bg-light)',
          padding: '100px 0 60px 0',
          borderBottom: '1px solid var(--border)',
          textAlign: 'left'
        }}
      >
        <div className="container">
          <div className="grid grid-cols-2 align-center" style={{ gap: '48px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green-dark)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px', display: 'inline-block' }}>
                ABOUT ALFACURE LIFESCIENCE
              </span>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--blue-dark)', marginBottom: '20px', lineHeight: 1.15 }}>
                Exclusive Export Company of{' '}
                <span style={{ color: 'var(--green-dark)' }}>Realcade Lifescience</span>
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--blue-light)', lineHeight: 1.65, marginBottom: '28px' }}>
                Alfacure Lifescience is the exclusive export company of Realcade Lifescience Pvt. Ltd., one of India's leading WHO-GMP certified sterile pharmaceutical manufacturers based in Gujarat, India. We carry Realcade's world-class pharmaceutical products beyond India's borders and into the hands of healthcare providers, hospitals, distributors, and government institutions across global markets.
              </p>
              <div className="flex" style={{ gap: '12px' }}>
                <button className="btn btn-primary btn-shine" style={{ backgroundColor: 'var(--green-dark)', borderRadius: '6px' }} onClick={() => setCurrentPage('products')}>
                  View Our Products
                </button>
                <button className="btn btn-outline" style={{ borderColor: 'var(--green-dark)', color: 'var(--green-dark)', borderRadius: '6px' }} onClick={() => setCurrentPage('support')}>
                  Contact Us
                </button>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', height: '340px', boxShadow: '0 20px 40px rgba(31,61,90,0.12)', border: '1px solid var(--border)' }}>
                <img src="/assets/production_floor.png" alt="Alfacure Lifescience Manufacturing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-16px',
                  left: '24px',
                  padding: '16px 24px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--blue-dark)',
                  color: '#ffffff',
                  boxShadow: '0 8px 20px rgba(31,61,90,0.3)'
                }}
              >
                <div style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1, color: 'var(--green-light)' }}>2013</div>
                <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>EST. GUJARAT, INDIA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VISION & MISSION ─── */}
      <section className="section" style={{ backgroundColor: 'var(--white)', padding: '80px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid grid-cols-2" style={{ gap: '40px' }}>
            {/* Vision */}
            <div
              className="card"
              style={{
                padding: '40px 32px',
                textAlign: 'left',
                borderTop: '3px solid var(--green-dark)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', borderRadius: '10px', backgroundColor: 'var(--primary-light)', color: 'var(--green-dark)' }}>
                <Eye size={24} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--blue-dark)' }}>Our Vision</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--blue-light)', lineHeight: 1.65 }}>
                To be a globally recognized pharmaceutical export company, known for delivering safe, effective, and affordable medicines manufactured to the highest international standards — making quality healthcare accessible worldwide.
              </p>
            </div>

            {/* Mission */}
            <div
              className="card"
              style={{
                padding: '40px 32px',
                textAlign: 'left',
                borderTop: '3px solid var(--blue-dark)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', borderRadius: '10px', backgroundColor: 'rgba(31,61,90,0.08)', color: 'var(--blue-dark)' }}>
                <Target size={24} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--blue-dark)' }}>Our Mission</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--blue-light)', lineHeight: 1.65 }}>
                To serve as the trusted global bridge for Realcade Lifescience Pvt. Ltd., ensuring that their WHO-GMP certified pharmaceutical products reach international markets with full regulatory compliance, reliability, and integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section className="section" style={{ backgroundColor: 'var(--bg-light)', padding: '80px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green-dark)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px', display: 'inline-block' }}>
              OUR SERVICES
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--blue-dark)', marginBottom: '12px' }}>What We Do</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--blue-light)', maxWidth: '640px', margin: '0 auto' }}>
              As the exclusive export arm of Realcade Lifescience, Alfacure Lifescience manages end-to-end international pharmaceutical business.
            </p>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '24px' }}>
            {whatWeDo.map((item, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: '32px 28px',
                  textAlign: 'left',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'var(--primary-light)', color: 'var(--green-dark)', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--blue-dark)', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--blue-light)', lineHeight: 1.55 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY ALFACURE ─── */}
      <section className="section" style={{ backgroundColor: 'var(--white)', padding: '80px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid grid-cols-2 align-center" style={{ gap: '64px' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green-dark)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px', display: 'inline-block' }}>
                OUR STRENGTHS
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--blue-dark)', marginBottom: '20px', lineHeight: 1.2 }}>
                Why Alfacure Lifescience?
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--blue-light)', lineHeight: 1.6, marginBottom: '28px' }}>
                With over a decade of manufacturing excellence and a clear commitment to quality and compliance, Alfacure Lifescience stands as a trusted partner for international pharmaceutical distribution.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {whyAlfacure.map((item, i) => (
                  <div key={i} className="flex" style={{ gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ color: 'var(--green-dark)', flexShrink: 0, marginTop: '2px' }}>{item.icon}</div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--blue-dark)', lineHeight: 1.5 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Gallery mosaic */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', border: '1px solid var(--border)' }}>
                <img src="/assets/clean_hub.png" alt="Cleanroom Facility" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', border: '1px solid var(--border)' }}>
                <img src="/assets/auto_capping.png" alt="Automated Capping" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', gridColumn: 'span 2', border: '1px solid var(--border)' }}>
                <img src="/assets/spectrometric_lab.png" alt="Quality Control Laboratory" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MANUFACTURING BACKBONE ─── */}
      <section className="section" style={{ backgroundColor: 'var(--blue-dark)', padding: '80px 0', color: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green-light)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '12px' }}>
              MANUFACTURING PARTNER
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
              Realcade Lifescience Pvt. Ltd.
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', maxWidth: '720px', margin: '0 auto' }}>
              Established in 2013, Realcade operates advanced manufacturing facilities in Kadi (Mehsana) and Valod (Tapi), Gujarat — specializing in sterile liquids using cutting-edge Aseptic Form-Fill-Seal (FFS) Technology.
            </p>
          </div>

          {/* Specs Table */}
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <tbody>
                {manufacturingSpecs.map((spec, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--green-light)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', width: '180px' }}>
                      {spec.label}
                    </td>
                    <td style={{ padding: '16px 20px', color: '#ffffff', fontWeight: 600 }}>
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── CONTACT INFO ─── */}
      <section className="section" style={{ backgroundColor: 'var(--white)', padding: '80px 0' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, var(--green-dark) 0%, var(--blue-dark) 100%)',
              borderRadius: '16px',
              padding: '56px 48px',
              color: '#ffffff',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} />

            <div className="grid grid-cols-2 align-center" style={{ gap: '48px', position: 'relative', zIndex: 2 }}>
              <div style={{ textAlign: 'left' }}>
                <h2 style={{ color: '#ffffff', fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>
                  Get in Touch
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  For export inquiries, product information, and partnership opportunities, reach out to us.
                </p>
                <button
                  className="btn btn-shine"
                  style={{ backgroundColor: '#ffffff', color: 'var(--blue-dark)', fontWeight: 700, border: 'none', cursor: 'pointer', padding: '12px 28px', borderRadius: '6px' }}
                  onClick={() => setCurrentPage('support')}
                >
                  Contact Our Team <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="flex align-center" style={{ gap: '12px' }}>
                  <Phone size={18} style={{ color: 'var(--green-light)', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600 }}>+91 98795 00383</span>
                </div>
                <div className="flex" style={{ gap: '12px', alignItems: 'flex-start' }}>
                  <MapPin size={18} style={{ color: 'var(--green-light)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                    Office 1122, Satyamev Shivalik, Bopal Ambili Junction, Sardar Patel Ring Road, Ahmedabad – 380058, Gujarat, India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
