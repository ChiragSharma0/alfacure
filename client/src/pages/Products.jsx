import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, ChevronDown, Search } from 'lucide-react';
import productsData from '../data/products.json';
import { useCMS } from '../context/CMSContext';

export default function Products() {
  const navigate = useNavigate();
  const { content, getAssetUrl, resolveImage } = useCMS();

  const activeProductsData = content?.products?.productsData || productsData;
  const activeMachineryItems = content?.products?.machineryItems || [];

  const [catalogTab, setCatalogTab] = useState('formulations');
  const [selectedPurpose, setSelectedPurpose] = useState('all');
  const [selectedTherapeutic, setSelectedTherapeutic] = useState('all');
  const [selectedPackSize, setSelectedPackSize] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'infusions', label: 'Infusions' },
    { id: 'injections', label: 'Injections' },
    { id: 'electrolytes', label: 'Electrolytes' },
    { id: 'antimicrobials', label: 'Antimicrobials' }
  ];

  const getTherapeuticCategory = (product) => {
    // If the category is explicitly saved on the product in the CMS, use it!
    if (product.category) return product.category;

    const name = product.name.toLowerCase();
    if (
      name.includes('metronidazole') || name.includes('ciprofloxacin') ||
      name.includes('ofloxacin') || name.includes('levofloxacin') ||
      name.includes('linezolid') || name.includes('fluconazole') ||
      name.includes('moxifloxacin') || name.includes('ornidazole') ||
      name.includes('tinidazole')
    ) return 'antimicrobials';
    if (
      name.includes('electrolytes') || name.includes('ringer') ||
      name.includes('lactate') || name.includes('saline') ||
      name.includes('sodium chloride') || name.includes('dextrose') ||
      name.includes('glucose') || name.includes('mannitol') ||
      name.includes('glycerin')
    ) return 'electrolytes';
    if (name.includes('infusion') || name.includes('irrigation')) return 'infusions';
    if (name.includes('injection')) return 'injections';
    return 'other';
  };

  const filteredProducts = activeProductsData.filter(prod => {
    if (selectedPurpose !== 'all' && prod.purpose !== selectedPurpose) return false;
    if (selectedTherapeutic !== 'all') {
      const cat = getTherapeuticCategory(prod);
      if (selectedTherapeutic === 'infusions' && !prod.name.toLowerCase().includes('infusion') && !prod.name.toLowerCase().includes('irrigation') && cat !== 'infusions') return false;
      if (selectedTherapeutic === 'injections' && !prod.name.toLowerCase().includes('injection') && cat !== 'injections') return false;
      if (selectedTherapeutic === 'electrolytes' && cat !== 'electrolytes') return false;
      if (selectedTherapeutic === 'antimicrobials' && cat !== 'antimicrobials') return false;
    }
    if (selectedPackSize !== 'all') {
      const hasSize = (prod.packSizes || []).some(size => size.toLowerCase().includes(selectedPackSize.toLowerCase()));
      if (!hasSize) return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!prod.name.toLowerCase().includes(query) && !(prod.composition || '').toLowerCase().includes(query)) return false;
    }
    return true;
  });

  const fallbackMachineryItems = [
    { id: 'pt9000', name: 'PharmaFill 5000 Series', capacity: '5000 units/hr', automation: 'Fully Automatic', isoClass: 'Class 5', image: 'auto_capping.png', status: 'Active' },
    { id: 'sterilepack', name: 'SterilePack V3', capacity: '3200 units/hr', automation: 'Robotic Auto', isoClass: 'Class 5 (±0.01mm)', image: 'kinetic_sorting.png', status: 'Active' },
    { id: 'mediflow', name: 'MediFlow IV-200', capacity: '1200 Bags/hr', automation: 'Semi-Automatic', isoClass: 'Class 5 (4.5 kW)', image: 'clean_hub.png', status: 'Active' }
  ];

  const actualMachineryItems = activeMachineryItems.length > 0 ? activeMachineryItems : fallbackMachineryItems;

  const industrySolutions = [
    {
      icon: <span style={{ fontSize: '1.25rem' }}>🔬</span>,
      title: 'Pharmaceutical',
      desc: 'High-volume formulations and parenteral supply chains meeting international pharmacopeia guidelines for global markets.',
      bullets: ['WHO-GMP certified production', 'Comprehensive CTD export dossiers', 'Endotoxin-tested pyrogen-free liquids']
    },
    {
      icon: <span style={{ fontSize: '1.25rem' }}>🏥</span>,
      title: 'Hospitals',
      desc: 'Direct supply of critical large-volume infusions and sterile saline solutions for ICU, clinical wards, and surgery units.',
      bullets: ['Hanger-ready BFS plastic bottles', 'Double-port leak-proof closure caps', 'Compatible with automated infusion systems']
    },
    {
      icon: <span style={{ fontSize: '1.25rem' }}>🏭</span>,
      title: 'Contract Mfg.',
      desc: 'Flexible third-party manufacturing services with modular packaging sizes and customizable active concentration levels.',
      bullets: ['Custom formulation capabilities', 'Licensed manufacturing agreements', 'Scalable production batches']
    }
  ];

  return (
    <div className="page-container animate-fade-in" style={{ backgroundColor: '#ffffff', paddingBottom: '80px' }}>

      {/* ── HEADER ── */}
      <section style={{ backgroundColor: '#f4f7fc', padding: '100px 0 60px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px', display: 'inline-block' }}>
            {content?.products?.heroTag || 'PRECISION FORMULATIONS & SYSTEMS'}
          </span>
          <h1 style={{ fontWeight: 800, color: 'var(--secondary)', marginBottom: '20px' }} className="products-hero-title">
            {content?.products?.heroTitle || 'Products & Solutions'}
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '32px', maxWidth: '680px' }}>
            {content?.products?.heroDesc || 'Explore our comprehensive range of sterile medical parenterals and high-precision Blow-Fill-Seal systems, engineered to meet the highest regulatory standards.'}
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => {
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              View Catalog →
            </button>
            <button className="btn btn-outline" onClick={() => window.open(getAssetUrl('products_specs.pdf', '/assets/brochure.pdf'), '_blank')}>
              Download Specs
            </button>
          </div>
        </div>
      </section>

      {/* ── CATALOG ── */}
      <section id="catalog" style={{ padding: '60px 0' }}>
        <div className="container">

          {/* Catalog Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '40px', gap: '0', overflowX: 'auto' }}>
            {[
              { id: 'formulations', label: `Parenteral Formulations (${activeProductsData.length})` },
              { id: 'machinery', label: `BFS Machinery Systems (${actualMachineryItems.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCatalogTab(tab.id)}
                style={{
                  padding: '16px 20px',
                  border: 'none',
                  background: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: catalogTab === tab.id ? 'var(--primary)' : 'var(--text-light)',
                  borderBottom: catalogTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters — only for formulations */}
          {catalogTab === 'formulations' ? (
            <div className="products-filter-bar">
              {/* Category pills */}
              <div className="flex" style={{ gap: '6px', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedTherapeutic(cat.id)}
                    style={{
                      padding: '8px 14px',
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

              {/* Dropdowns + search */}
              <div className="products-filter-controls">
                {/* Search */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ fontSize: '0.75rem', padding: '6px 12px 6px 28px', width: '160px', borderRadius: '4px' }}
                  />
                  <Search size={12} style={{ position: 'absolute', left: '8px', color: 'var(--text-light)' }} />
                </div>

                {/* Size */}
                <div style={{ position: 'relative' }}>
                  <select
                    value={selectedPackSize}
                    onChange={e => setSelectedPackSize(e.target.value)}
                    style={{ padding: '6px 28px 6px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'transparent', cursor: 'pointer', appearance: 'none' }}
                  >
                    <option value="all">All Sizes</option>
                    <option value="100 ml">100 ml</option>
                    <option value="500 ml">500 ml</option>
                    <option value="1000 ml">1000 ml</option>
                  </select>
                  <ChevronDown size={12} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-light)' }} />
                </div>

                {/* Market */}
                <div style={{ position: 'relative' }}>
                  <select
                    value={selectedPurpose}
                    onChange={e => setSelectedPurpose(e.target.value)}
                    style={{ padding: '6px 28px 6px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'transparent', cursor: 'pointer', appearance: 'none' }}
                  >
                    <option value="all">All Markets</option>
                    <option value="Domestic">Domestic (IP)</option>
                    <option value="Export">Export (BP/USP)</option>
                  </select>
                  <ChevronDown size={12} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-light)' }} />
                </div>
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Showing primary automation fillers and aseptic machines engineered by our technical systems desk.
              </p>
            </div>
          )}

          {/* Product Grid */}
          <div className="products-grid">
            {catalogTab === 'formulations' ? (
              filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="card"
                  style={{ display: 'flex', flexDirection: 'column', position: 'relative', border: '1px solid var(--border)', backgroundColor: '#ffffff', boxShadow: 'none', textAlign: 'left', overflow: 'hidden' }}
                >
                  <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: 700, backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--success)', padding: '4px 8px', borderRadius: '12px' }}>
                      ● Approved
                    </span>
                  </div>

                  <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
                    {product.image ? (
                      <img src={resolveImage(product.image)} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '12px' }} />
                    ) : (
                      <svg width="60" height="110" viewBox="0 0 100 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="35" y="10" width="30" height="20" rx="3" fill="#005bc4" fillOpacity="0.2" stroke="#005bc4" strokeWidth="2" />
                        <rect x="42" y="30" width="16" height="20" fill="#005bc4" fillOpacity="0.1" stroke="#005bc4" strokeWidth="2" />
                        <path d="M20 70C20 58.9543 28.9543 50 40 50H60C71.0457 50 80 58.9543 80 70V160C80 165.523 75.5228 170 70 170H30C24.4772 170 20 165.523 20 160V70Z" fill="white" stroke="#005bc4" strokeWidth="2" />
                        <line x1="30" y1="120" x2="70" y2="120" stroke="#005bc4" strokeWidth="1.5" strokeDasharray="3 3" />
                      </svg>
                    )}
                  </div>

                  <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1rem', color: 'var(--secondary)', marginBottom: '12px', fontWeight: 700, minHeight: '40px', display: 'flex', alignItems: 'center' }}>
                        {product.name}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--border)', paddingTop: '12px', marginBottom: '16px' }}>
                        <div className="flex justify-between" style={{ fontSize: '0.78rem', paddingBottom: '5px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Packaging</span>
                          <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{(product.packSizes || []).join(', ')}</span>
                        </div>
                        <div className="flex justify-between" style={{ fontSize: '0.78rem', paddingBottom: '5px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Standard</span>
                          <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{product.purpose === 'Domestic' ? 'IP Pharmacopeia' : 'BP/USP'}</span>
                        </div>
                        <div className="flex justify-between" style={{ fontSize: '0.78rem' }}>
                          <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Market</span>
                          <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{product.purpose}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-outline"
                      style={{ width: '100%', padding: '10px', fontSize: '0.8rem', fontWeight: 700, border: '1px solid var(--primary)', color: 'var(--primary)' }}
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      View Specs
                    </button>
                  </div>
                </div>
              ))
            ) : (
              actualMachineryItems.map(mach => (
                <div
                  key={mach.id}
                  className="card"
                  style={{ display: 'flex', flexDirection: 'column', position: 'relative', border: '1px solid var(--border)', backgroundColor: '#ffffff', boxShadow: 'none', textAlign: 'left', overflow: 'hidden' }}
                >
                  <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: 700, backgroundColor: 'rgba(0,91,196,0.1)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '12px' }}>
                      ● {mach.status}
                    </span>
                  </div>
                  <div style={{ height: '180px', overflow: 'hidden', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
                    <img src={resolveImage(mach.image)} alt={mach.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', color: 'var(--secondary)', marginBottom: '12px', fontWeight: 700 }}>{mach.name}</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--border)', paddingTop: '12px', marginBottom: '16px' }}>
                        <div className="flex justify-between" style={{ fontSize: '0.78rem', paddingBottom: '5px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Capacity</span>
                          <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{mach.capacity}</span>
                        </div>
                        <div className="flex justify-between" style={{ fontSize: '0.78rem', paddingBottom: '5px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Automation</span>
                          <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{mach.automation}</span>
                        </div>
                        <div className="flex justify-between" style={{ fontSize: '0.78rem' }}>
                          <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Accuracy</span>
                          <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{mach.isoClass}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-outline"
                      style={{ width: '100%', padding: '10px', fontSize: '0.8rem', fontWeight: 700 }}
                      onClick={() => navigate(`/products/${mach.id}`)}
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
              No formulations match the selected criteria. Try adjusting your filters.
            </div>
          )}
        </div>
      </section>

      {/* ── TAILORED SOLUTIONS ── */}
      <section style={{ backgroundColor: '#f8fafc', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '60px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--secondary)', fontWeight: 700, marginBottom: '12px' }}>Tailored Industry Solutions</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto' }}>Providing specialized sterile fluid ranges designed for the specific clinical requirements of your organization.</p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '24px' }}>
            {(content?.products?.industrySolutions || industrySolutions).map((sol, i) => {
              const displayIcon = (sol.icon && typeof sol.icon !== 'string')
                ? sol.icon
                : (i === 0 ? <span style={{ fontSize: '1.25rem' }}>🔬</span> : i === 1 ? <span style={{ fontSize: '1.25rem' }}>🏥</span> : <span style={{ fontSize: '1.25rem' }}>🏭</span>);

              return (
                <div
                  key={i}
                  className="card"
                  style={{ padding: '32px 24px', textAlign: 'left', borderTop: '4px solid var(--primary)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#ffffff', boxShadow: 'none', border: '1px solid var(--border)', borderTop: '4px solid var(--primary)' }}
                >
                  <div>
                    <div style={{ display: 'flex', padding: '10px', backgroundColor: 'var(--primary-light)', borderRadius: '50%', width: 'fit-content', marginBottom: '16px' }}>
                      {displayIcon}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--secondary)', marginBottom: '10px', fontWeight: 700 }}>{sol.title}</h3>
                    <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--text-muted)', marginBottom: '16px' }}>{sol.desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '20px', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                      {sol.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex align-center" style={{ gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <span style={{ color: 'var(--success)' }}>✔</span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    className="btn-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, justifyContent: 'flex-start', fontSize: '0.8rem', fontWeight: 700 }}
                    onClick={() => navigate('/support')}
                  >
                    Explore Sector →
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--primary)', color: '#ffffff', padding: '60px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '620px' }}>
            <h2 style={{ color: '#ffffff', marginBottom: '12px', fontWeight: 700 }}>Need a custom supply solution?</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Our team of regulatory experts and QA chemists is ready to help you formulate and package sterile fluids according to your custom hospital specs.
            </p>
          </div>
          <div className="hero-buttons">
            <button className="btn btn-white" onClick={() => navigate('/support')}>Consult with an Expert</button>
            <button className="btn btn-white-outline" onClick={() => navigate('/support')}>Contact Sales</button>
          </div>
        </div>
      </section>
    </div>
  );
}
