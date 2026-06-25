import React, { useState } from 'react';
import { Layers, ChevronDown, Search } from 'lucide-react';
import productsData from '../data/products.json';

export default function Products({ setCurrentPage, setSelectedProductId }) {
  const [catalogTab, setCatalogTab] = useState('formulations'); // 'formulations' or 'machinery'
  const [selectedPurpose, setSelectedPurpose] = useState('all');
  const [selectedTherapeutic, setSelectedTherapeutic] = useState('all');
  const [selectedPackSize, setSelectedPackSize] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Formulations' },
    { id: 'infusions', label: 'Infusions' },
    { id: 'injections', label: 'Injections' },
    { id: 'electrolytes', label: 'Electrolytes' },
    { id: 'antimicrobials', label: 'Antimicrobials' }
  ];

  const getTherapeuticCategory = (product) => {
    const name = product.name.toLowerCase();
    if (
      name.includes('metronidazole') ||
      name.includes('ciprofloxacin') ||
      name.includes('ofloxacin') ||
      name.includes('levofloxacin') ||
      name.includes('linezolid') ||
      name.includes('fluconazole') ||
      name.includes('moxifloxacin') ||
      name.includes('ornidazole') ||
      name.includes('tinidazole')
    ) {
      return 'antimicrobials';
    }
    if (
      name.includes('electrolytes') ||
      name.includes('ringer') ||
      name.includes('lactate') ||
      name.includes('saline') ||
      name.includes('sodium chloride') ||
      name.includes('dextrose') ||
      name.includes('glucose') ||
      name.includes('mannitol') ||
      name.includes('glycerin')
    ) {
      return 'electrolytes';
    }
    if (name.includes('infusion') || name.includes('infusions') || name.includes('irrigation')) {
      return 'infusions';
    }
    if (name.includes('injection') || name.includes('injections')) {
      return 'injections';
    }
    return 'other';
  };

  // Filters logic for Formulations
  const filteredProducts = productsData.filter(prod => {
    // 1. Purpose Filter (Domestic vs Export)
    if (selectedPurpose !== 'all' && prod.purpose !== selectedPurpose) return false;

    // 2. Therapeutic Category Filter
    if (selectedTherapeutic !== 'all') {
      const cat = getTherapeuticCategory(prod);
      if (selectedTherapeutic === 'infusions' && !prod.name.toLowerCase().includes('infusion') && !prod.name.toLowerCase().includes('irrigation')) {
        return false;
      }
      if (selectedTherapeutic === 'injections' && !prod.name.toLowerCase().includes('injection')) {
        return false;
      }
      if (selectedTherapeutic === 'electrolytes' && cat !== 'electrolytes') {
        return false;
      }
      if (selectedTherapeutic === 'antimicrobials' && cat !== 'antimicrobials') {
        return false;
      }
    }

    // 3. Pack Size Filter
    if (selectedPackSize !== 'all') {
      const hasSize = prod.packSizes.some(size => size.toLowerCase().includes(selectedPackSize.toLowerCase()));
      if (!hasSize) return false;
    }

    // 4. Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchName = prod.name.toLowerCase().includes(query);
      const matchComposition = prod.composition.toLowerCase().includes(query);
      if (!matchName && !matchComposition) return false;
    }

    return true;
  });

  const machineryItems = [
    {
      id: 'pt9000',
      name: 'PharmaFill 5000 Series',
      capacity: '5000 units/hr',
      automation: 'Fully Automatic',
      isoClass: 'Class 5',
      image: '/assets/auto_capping.png',
      status: 'Active'
    },
    {
      id: 'sterilepack',
      name: 'SterilePack V3',
      capacity: '3200 units/hr',
      automation: 'Robotic Auto',
      isoClass: 'Class 5 (±0.01mm)',
      image: '/assets/kinetic_sorting.png',
      status: 'Active'
    },
    {
      id: 'mediflow',
      name: 'MediFlow IV-200',
      capacity: '1200 Bags/hr',
      automation: 'Semi-Automatic',
      isoClass: 'Class 5 (4.5 kW)',
      image: '/assets/clean_hub.png',
      status: 'Active'
    }
  ];

  const handleInspectProduct = (id) => {
    setSelectedProductId(id);
    setCurrentPage('detail');
    window.location.hash = 'detail';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const industrySolutions = [
    {
      icon: <span style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>🔬</span>,
      title: 'Pharmaceutical',
      desc: 'High-volume formulations and parenteral supply chains meeting international pharmacopeia guidelines for global markets.',
      bullets: ['WHO-GMP certified production', 'Comprehensive CTD export dossiers', 'Endotoxin-tested pyrogen-free liquids']
    },
    {
      icon: <span style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>🏥</span>,
      title: 'Hospitals',
      desc: 'Direct supply of critical large-volume infusions and sterile saline solutions for ICU, clinical wards, and surgery units.',
      bullets: ['Hanger-ready BFS plastic bottles', 'Double-port leak-proof closure caps', 'Compatible with automated infusion systems']
    },
    {
      icon: <span style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>🏭</span>,
      title: 'Contract Mfg.',
      desc: 'Flexible third-party manufacturing services with modular packaging sizes and customizable active concentration levels.',
      bullets: ['Custom formulation capabilities', 'Licensed manufacturing agreements', 'Scalable production batches']
    }
  ];

  return (
    <div className="page-container animate-fade-in" style={{ backgroundColor: '#ffffff', paddingBottom: '80px' }}>

      {/* 1. Header / Intro Banner */}
      <section className="section" style={{ backgroundColor: '#f4f7fc', padding: '100px 0 60px 0', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
        <div className="container">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px', display: 'inline-block' }}>
            PRECISION FORMULATIONS & SYSTEMS
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '20px' }}>Products & Solutions</h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '32px', maxWidth: '680px' }}>
            Explore our comprehensive range of sterile medical parenterals and high-precision Blow-Fill-Seal systems, engineered to meet the highest regulatory standards.
          </p>
          <div className="flex" style={{ gap: '16px' }}>
            <button className="btn btn-primary" onClick={() => {
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              View Catalog →
            </button>
            <button className="btn btn-outline" onClick={() => setCurrentPage('support')}>
              Download Specs
            </button>
          </div>
        </div>
      </section>

      {/* 2. Catalog Section */}
      <section id="catalog" className="section" style={{ padding: '60px 0' }}>
        <div className="container">

          {/* Catalog Selection Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '40px', gap: '32px' }}>
            <button
              onClick={() => setCatalogTab('formulations')}
              style={{
                padding: '16px 8px',
                border: 'none',
                background: 'none',
                fontSize: '1rem',
                fontWeight: 700,
                color: catalogTab === 'formulations' ? 'var(--primary)' : 'var(--text-light)',
                borderBottom: catalogTab === 'formulations' ? '3px solid var(--primary)' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Parenteral Formulations ({productsData.length})
            </button>
            <button
              onClick={() => setCatalogTab('machinery')}
              style={{
                padding: '16px 8px',
                border: 'none',
                background: 'none',
                fontSize: '1rem',
                fontWeight: 700,
                color: catalogTab === 'machinery' ? 'var(--primary)' : 'var(--text-light)',
                borderBottom: catalogTab === 'machinery' ? '3px solid var(--primary)' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              BFS Machinery Systems ({machineryItems.length})
            </button>
          </div>

          {/* Filters Bar (Only for formulations) */}
          {catalogTab === 'formulations' ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '24px',
                marginBottom: '40px',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '20px'
              }}
            >
              {/* Category pills on the left */}
              <div className="flex" style={{ gap: '6px', flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedTherapeutic(cat.id)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: 'none',
                      backgroundColor: selectedTherapeutic === cat.id ? 'var(--primary)' : '#f1f5f9',
                      color: selectedTherapeutic === cat.id ? '#ffffff' : 'var(--text-muted)',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Dropdowns on the right */}
              <div className="flex align-center" style={{ gap: '16px', flexWrap: 'wrap' }}>
                {/* Search bar inside filter row */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search formulations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ fontSize: '0.75rem', padding: '6px 12px 6px 28px', width: '180px', borderRadius: '4px' }}
                  />
                  <Search size={12} style={{ position: 'absolute', left: '8px', color: 'var(--text-light)' }} />
                </div>

                <div className="flex align-center" style={{ gap: '6px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>Size:</span>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={selectedPackSize}
                      onChange={(e) => setSelectedPackSize(e.target.value)}
                      style={{
                        padding: '6px 28px 6px 12px',
                        borderRadius: '4px',
                        border: '1px solid var(--border)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        outline: 'none',
                        appearance: 'none'
                      }}
                    >
                      <option value="all">All Sizes</option>
                      <option value="100 ml">100 ml</option>
                      <option value="500 ml">500 ml</option>
                      <option value="1000 ml">1000 ml</option>
                    </select>
                    <ChevronDown size={12} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-light)' }} />
                  </div>
                </div>

                <div className="flex align-center" style={{ gap: '6px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>Market:</span>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={selectedPurpose}
                      onChange={(e) => setSelectedPurpose(e.target.value)}
                      style={{
                        padding: '6px 28px 6px 12px',
                        borderRadius: '4px',
                        border: '1px solid var(--border)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        outline: 'none',
                        appearance: 'none'
                      }}
                    >
                      <option value="all">All Markets</option>
                      <option value="Domestic">Domestic (IP)</option>
                      <option value="Export">Export (BP/USP)</option>
                    </select>
                    <ChevronDown size={12} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-light)' }} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '20px', textAlign: 'left' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Showing primary automation fillers and aseptic machines engineered by our technical systems desk.
              </p>
            </div>
          )}

          {/* 3-Column Catalog Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {catalogTab === 'formulations' ? (
              filteredProducts.slice(0, 18).map((product) => (
                <div
                  key={product.id}
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    position: 'relative',
                    border: '1px solid var(--border)',
                    backgroundColor: '#ffffff',
                    boxShadow: 'none',
                    borderRadius: '8px',
                    textAlign: 'left',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: 700, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '4px 8px', borderRadius: '12px' }}>
                      ● Approved
                    </span>
                  </div>

                  <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                    <svg width="60" height="110" viewBox="0 0 100 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="35" y="10" width="30" height="20" rx="3" fill="#005bc4" fillOpacity="0.2" stroke="#005bc4" strokeWidth="2" />
                      <rect x="42" y="30" width="16" height="20" fill="#005bc4" fillOpacity="0.1" stroke="#005bc4" strokeWidth="2" />
                      <path d="M20 70C20 58.9543 28.9543 50 40 50H60C71.0457 50 80 58.9543 80 70V160C80 165.523 75.5228 170 70 170H30C24.4772 170 20 165.523 20 160V70Z" fill="white" stroke="#005bc4" strokeWidth="2" />
                      <line x1="30" y1="120" x2="70" y2="120" stroke="#005bc4" strokeWidth="1.5" strokeDasharray="3 3" />
                    </svg>
                  </div>

                  <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', color: 'var(--secondary)', marginBottom: '16px', fontWeight: 700, minHeight: '44px', display: 'flex', alignItems: 'center' }}>
                        {product.name}
                      </h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '24px' }}>
                        <div className="flex justify-between" style={{ fontSize: '0.8rem', paddingBottom: '6px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Packaging</span>
                          <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{product.packSizes.join(', ')}</span>
                        </div>
                        <div className="flex justify-between" style={{ fontSize: '0.8rem', paddingBottom: '6px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Standard</span>
                          <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{product.purpose === 'Domestic' ? 'IP Pharmacopeia' : 'BP/USP Compliant'}</span>
                        </div>
                        <div className="flex justify-between" style={{ fontSize: '0.8rem' }}>
                          <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Market</span>
                          <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{product.purpose}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-outline"
                      style={{ width: '100%', padding: '10px', fontSize: '0.8rem', fontWeight: 700, border: '1px solid var(--primary)', color: 'var(--primary)' }}
                      onClick={() => handleInspectProduct(product.id)}
                    >
                      View Specs
                    </button>
                  </div>
                </div>
              ))
            ) : (
              machineryItems.map((mach) => (
                <div
                  key={mach.id}
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    position: 'relative',
                    border: '1px solid var(--border)',
                    backgroundColor: '#ffffff',
                    boxShadow: 'none',
                    borderRadius: '8px',
                    textAlign: 'left',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: 700, backgroundColor: 'rgba(0, 91, 196, 0.1)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '12px' }}>
                      ● {mach.status}
                    </span>
                  </div>

                  <div style={{ height: '200px', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
                    <img src={mach.image} alt={mach.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--secondary)', marginBottom: '16px', fontWeight: 700 }}>
                        {mach.name}
                      </h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '24px' }}>
                        <div className="flex justify-between" style={{ fontSize: '0.8rem', paddingBottom: '6px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Capacity</span>
                          <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{mach.capacity}</span>
                        </div>
                        <div className="flex justify-between" style={{ fontSize: '0.8rem', paddingBottom: '6px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Automation</span>
                          <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{mach.automation}</span>
                        </div>
                        <div className="flex justify-between" style={{ fontSize: '0.8rem' }}>
                          <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Accuracy</span>
                          <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{mach.isoClass}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-outline"
                      style={{ width: '100%', padding: '10px', fontSize: '0.8rem', fontWeight: 700 }}
                      onClick={() => handleInspectProduct(mach.id)}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {catalogTab === 'formulations' && filteredProducts.length === 0 && (
            <div style={{ padding: '80px 0', color: 'var(--text-light)', textAlign: 'center' }}>
              No formulations match the selected criteria. Try adjusting your search query.
            </div>
          )}
        </div>
      </section>

      {/* 3. Tailored Healthcare Solutions */}
      <section className="section" style={{ backgroundColor: '#f8fafc', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '60px 0' }}>
        <div className="container">
          <div className="section-title-wrapper" style={{ marginBottom: '48px' }}>
            <h2 className="section-title" style={{ fontSize: '2rem', color: 'var(--secondary)', fontWeight: 700 }}>Tailored Industry Solutions</h2>
            <p className="section-desc">Providing specialized sterile fluid ranges designed for the specific clinical requirements of your organization.</p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '24px' }}>
            {industrySolutions.map((sol, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: '36px 28px',
                  textAlign: 'left',
                  borderTop: '4px solid var(--primary)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#ffffff',
                  boxShadow: 'none',
                  border: '1px solid var(--border)',
                  borderTop: '4px solid var(--primary)',
                  borderRadius: '6px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', padding: '12px', backgroundColor: 'var(--primary-light)', borderRadius: '50%', width: 'fit-content', marginBottom: '20px' }}>
                    {sol.icon}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--secondary)', marginBottom: '12px', fontWeight: 700 }}>{sol.title}</h3>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--text-muted)', marginBottom: '20px' }}>{sol.desc}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                    {sol.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex align-center" style={{ gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        <span style={{ color: 'var(--success)' }}>✔</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="btn-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, justifyContent: 'flex-start', fontSize: '0.8rem', fontWeight: 700 }}
                  onClick={() => setCurrentPage('support')}
                >
                  Explore Sector →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Need a custom solution CTA Banner */}
      <section className="section" style={{ background: 'var(--primary)', color: '#ffffff', padding: '70px 0' }}>
        <div className="container flex justify-between align-center" style={{ gap: '48px', textAlign: 'left', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '680px' }}>
            <h2 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '12px', fontWeight: 700 }}>Need a custom supply solution?</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: '1.5' }}>
              Our team of regulatory experts and QA chemists is ready to help you formulate and package sterile fluids according to your custom hospital specs.
            </p>
          </div>

          <div className="flex" style={{ gap: '12px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-white"
              onClick={() => setCurrentPage('support')}
            >
              Consult with an Expert
            </button>
            <button
              className="btn btn-white-outline"
              onClick={() => setCurrentPage('support')}
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
