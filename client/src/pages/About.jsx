import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target, Eye, Briefcase, Globe, Factory, ShieldCheck,
  ArrowRight, MapPin, Phone, Award, Users, Truck
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function About() {
  const navigate = useNavigate();
  const { content, R2_PUBLIC_URL } = useCMS();

  const getAssetUrl = (fileName, defaultPath) => {
    if (content && Object.keys(content).length > 0) {
      return `${R2_PUBLIC_URL}/${fileName}`;
    }
    return defaultPath;
  };

  const whatWeDo = [
    {
      icon: <Globe size={22} />,
      title: 'Global Distribution',
      desc: 'Supplying Large Volume Parenterals (LVP), IV fluids, anti-infectives, and critical care formulations to healthcare institutions and distribution partners across domestic and international markets.'
    },
    {
      icon: <Briefcase size={22} />,
      title: 'Regulatory & Documentation Support',
      desc: 'Providing end-to-end regulatory assistance including CTD, eCTD, and ACTD dossiers, product registrations, and country-specific compliance documentation.'
    },
    {
      icon: <Factory size={22} />,
      title: 'Global Pharmaceutical Export',
      desc: 'Exporting and supplying premium sterile Large Volume Parenteral products under stringent quality control standards and advanced pharmaceutical protocols through our manufacturing partners.'
    },
    {
      icon: <Users size={22} />,
      title: 'Strategic Partnerships',
      desc: 'Building long-term relationships with importers, distributors, hospitals, and healthcare organizations worldwide.'
    }
  ];

  const whyAlfacure = [
    {
      icon: <Award size={18} />,
      text: 'Premium Large Volume Parenteral (LVP) exporter established in Ahmedabad, Gujarat.'
    },
    {
      icon: <ShieldCheck size={18} />,
      text: 'ISO and CRISIL certified organization committed to quality, safety, and regulatory compliance.'
    },
    {
      icon: <Factory size={18} />,
      text: 'Comprehensive portfolio of sterile IV fluids, electrolytes, anti-infectives, and critical care products.'
    },
    {
      icon: <Briefcase size={18} />,
      text: 'Dedicated Regulatory Affairs team supporting dossiers, registrations, and global market entry.'
    },
    {
      icon: <Truck size={18} />,
      text: 'Reliable domestic supply network with expanding international export operations.'
    },
    {
      icon: <Users size={18} />,
      text: 'Focused on delivering affordable, high-quality healthcare solutions worldwide.'
    }
  ];

  const manufacturingSpecs = [
    { label: 'Established', value: '2026' },
    { label: 'Certifications', value: 'ISO & CRISIL Certified' },
    { label: 'Head Office', value: 'Ahmedabad, Gujarat, India' },
    {
      label: 'Specialization',
      value: 'Large Volume Parenterals (LVP) & Sterile IV Solutions'
    },
    {
      label: 'Volume Range',
      value: '100 mL, 250 mL, 300 mL, 400 mL, 500 mL & 1000 mL'
    },
    {
      label: 'Product Portfolio',
      value:
        'IV Fluids, Electrolytes, Mannitol, Antibiotics, Antifungals & Paracetamol Infusions'
    }
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
                ABOUT ALFACURE LIFESCIENCE
              </span>

              <h1
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'var(--blue-dark)',
                  marginBottom: '20px',
                  lineHeight: 1.15
                }}
              >
                Premium Exporter & Supplier of{' '}
                <span style={{ color: 'var(--green-dark)' }}>
                  Large Volume Parenterals (LVP)
                </span>
              </h1>

              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--blue-light)',
                  lineHeight: 1.65,
                  marginBottom: '28px'
                }}
              >
                {content?.about?.heroDesc || 'Alfacure Lifescience Pvt. Ltd. is a premier Ahmedabad-based pharmaceutical company specializing in the export commercialization, and global distribution of life-saving therapeutics. With a strong focus on quality, sterility, and regulatory compliance, we deliver high-quality Large Volume Parenteral (LVP) solutions to healthcare institutions, distributors, and international partners across the world.'}
              </p>

              <div className="flex" style={{ gap: '12px' }}>
                <button
                  className="btn btn-primary btn-shine"
                  style={{
                    backgroundColor: 'var(--green-dark)',
                    borderRadius: '6px'
                  }}
                  onClick={() => navigate('/products')}
                >
                  View Our Products
                </button>

                <button
                  className="btn btn-outline"
                  style={{
                    borderColor: 'var(--green-dark)',
                    color: 'var(--green-dark)',
                    borderRadius: '6px'
                  }}
                  onClick={() => navigate('/support')}
                >
                  Contact Us
                </button>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  height: '340px',
                  boxShadow: '0 20px 40px rgba(31,61,90,0.12)',
                  border: '1px solid var(--border)'
                }}
              >
                <img
                  src={getAssetUrl('about_hero.png', '/assets/production_floor.png')}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/production_floor.png';
                  }}
                  alt="Alfacure Lifescience"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
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
                <div
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    lineHeight: 1,
                    color: 'var(--green-light)'
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 800,
                      lineHeight: 1,
                      color: 'var(--green-light)'
                    }}
                  >
                    100–1000 mL
                  </div>

                  <div
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.7)',
                      marginTop: '4px'
                    }}
                  >
                    LARGE VOLUME PARENTERALS
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.7)',
                    marginTop: '4px'
                  }}
                >
                  EST. AHMEDABAD, INDIA
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VISION & MISSION ─── */}
      <section
        className="section"
        style={{
          backgroundColor: 'var(--white)',
          padding: '80px 0',
          borderBottom: '1px solid var(--border)'
        }}
      >
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '52px',
                  height: '52px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--green-dark)'
                }}
              >
                <Eye size={24} />
              </div>

              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--blue-dark)'
                }}
              >
                Our Vision
              </h2>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--blue-light)',
                  lineHeight: 1.65
                }}
              >
                To be a globally recognized pharmaceutical company, known for
                delivering safe, effective, and affordable healthcare solutions
                produced to the highest international standards — making quality
                healthcare accessible worldwide.
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '52px',
                  height: '52px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(31,61,90,0.08)',
                  color: 'var(--blue-dark)'
                }}
              >
                <Target size={24} />
              </div>

              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--blue-dark)'
                }}
              >
                Our Mission
              </h2>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--blue-light)',
                  lineHeight: 1.65
                }}
              >
                To deliver premium Large Volume Parenteral (LVP) products and
                life-saving therapeutics to domestic and international markets while
                maintaining the highest standards of quality, regulatory compliance,
                reliability, and patient care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section
        className="section"
        style={{
          backgroundColor: 'var(--bg-light)',
          padding: '80px 0',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
              OUR EXPERTISE
            </span>

            <h2
              style={{
                fontSize: '2.25rem',
                fontWeight: 700,
                color: 'var(--blue-dark)',
                marginBottom: '12px'
              }}
            >
              What We Do
            </h2>

            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--blue-light)',
                maxWidth: '640px',
                margin: '0 auto'
              }}
            >
              Alfacure Lifescience delivers premium Large Volume Parenteral (LVP)
              solutions supported by strong regulatory expertise, global distribution
              capabilities, and a commitment to quality healthcare.
            </p>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '24px' }}>
            {(content?.about?.whatWeDo || whatWeDo).map((item, i) => (
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
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--green-dark)',
                    flexShrink: 0
                  }}
                >
                  {i === 0 && <Globe size={22} />}
                  {i === 1 && <Briefcase size={22} />}
                  {i === 2 && <Factory size={22} />}
                  {i === 3 && <Users size={22} />}
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--blue-dark)',
                      marginBottom: '8px'
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--blue-light)',
                      lineHeight: 1.55
                    }}
                  >
                    {item.desc}
                  </p>
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
          backgroundColor: 'var(--white)',
          padding: '80px 0',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <div className="container">
          <div className="grid grid-cols-2 align-center" style={{ gap: '64px' }}>
            <div style={{ textAlign: 'left' }}>
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
                OUR STRENGTHS
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
                Why Alfacure Lifescience?
              </h2>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--blue-light)',
                  lineHeight: 1.6,
                  marginBottom: '28px'
                }}
              >
                Alfacure Lifescience combines pharmaceutical expertise, regulatory
                excellence, and a diverse portfolio of Large Volume Parenteral
                solutions to support healthcare institutions and business partners
                across domestic and international markets.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(content?.about?.whyAlfacure || whyAlfacure).map((item, i) => (
                  <div
                    key={i}
                    className="flex"
                    style={{ gap: '12px', alignItems: 'flex-start' }}
                  >
                    <div
                      style={{
                        color: 'var(--green-dark)',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      {i === 0 && <Award size={18} />}
                      {i === 1 && <ShieldCheck size={18} />}
                      {i === 2 && <Factory size={18} />}
                      {i === 3 && <Briefcase size={18} />}
                      {i === 4 && <Truck size={18} />}
                      {i === 5 && <Users size={18} />}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                      {item.title ? (
                        <>
                          <strong style={{ fontSize: '0.88rem', color: 'var(--blue-dark)', fontWeight: 700 }}>
                            {item.title}
                          </strong>
                          <span style={{ fontSize: '0.82rem', color: 'var(--blue-light)', lineHeight: 1.5, marginTop: '2px' }}>
                            {item.desc}
                          </span>
                        </>
                      ) : (
                        <span style={{ fontSize: '0.85rem', color: 'var(--blue-dark)', lineHeight: 1.5 }}>
                          {item.text}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Gallery mosaic */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}
            >
              <div
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  height: '180px',
                  border: '1px solid var(--border)'
                }}
              >
                <img
                  src={getAssetUrl('clean_hub.png', '/assets/clean_hub.png')}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/clean_hub.png';
                  }}
                  alt="Sterile Pharmaceutical Operations"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              <div
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  height: '180px',
                  border: '1px solid var(--border)'
                }}
              >
                <img
                  src={getAssetUrl('auto_capping.png', '/assets/auto_capping.png')}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/auto_capping.png';
                  }}
                  alt="Pharmaceutical Manufacturing Process"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              <div
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  height: '180px',
                  gridColumn: 'span 2',
                  border: '1px solid var(--border)'
                }}
              >
                <img
                  src={getAssetUrl('spectrometric_lab.png', '/assets/spectrometric_lab.png')}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/spectrometric_lab.png';
                  }}
                  alt="Quality Assurance and Regulatory Standards"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
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
              REGULATORY EXCELLENCE
            </span>

            <h2
              style={{
                fontSize: '2.25rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '16px'
              }}
            >
              Comprehensive Regulatory Support
            </h2>

            <p
              style={{
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '720px',
                margin: '0 auto'
              }}
            >
              Alfacure Lifescience provides complete regulatory and documentation
              support to ensure smooth product registration and faster market entry
              across domestic and international markets.
            </p>
          </div>

          {/* Specs Table */}
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.9rem'
              }}
            >
              <tbody>
                {(content?.about?.manufacturingSpecs || manufacturingSpecs).map((spec, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <td
                      style={{
                        padding: '16px 20px',
                        fontWeight: 700,
                        color: 'var(--green-light)',
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        letterSpacing: '0.05em',
                        width: '220px'
                      }}
                    >
                      {spec.label}
                    </td>

                    <td
                      style={{
                        padding: '16px 20px',
                        color: '#ffffff',
                        fontWeight: 600
                      }}
                    >
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
                  onClick={() => navigate('/support')}
                >
                  Contact Our Team <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="flex align-center" style={{ gap: '12px' }}>
                  <Phone size={18} style={{ color: 'var(--green-light)', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600 }}>{content?.contact?.phoneExport || '+91 98795 00383'}</span>
                </div>
                <div className="flex" style={{ gap: '12px', alignItems: 'flex-start' }}>
                  <MapPin size={18} style={{ color: 'var(--green-light)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {content?.contact?.headOffice || 'Office 1122, Satyamev Shivalik, Bopal Ambili Junction, Sardar Patel Ring Road, Ahmedabad – 380058, Gujarat, India'}
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
