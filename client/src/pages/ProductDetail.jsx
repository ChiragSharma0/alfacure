import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle, Shield, Clock, Phone, AlertCircle, ArrowUpRight, Check, ChevronDown, ChevronUp } from 'lucide-react';
import productsData from '../data/products.json';

export default function ProductDetail({ selectedProductId, setCurrentPage, setSelectedProductId }) {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    volume: 'low',
    notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Check if it's a machine or formulation
  const isMachine = ['pt9000', 'sterilepack', 'mediflow'].includes(selectedProductId);

  // 1. Machine details mapping
  const machines = {
    pt9000: {
      name: 'PharmaFill 5000 Series',
      subtitle: 'High-Speed Aseptic BFS Filler',
      desc: 'An industry-leading automated filling system designed for medical-grade precision. Engineered for continuous 24/7 operation with a modular architecture that supports advanced BFS sterile filling with minimal downtime.',
      specs: [
        { label: 'Dimensions (L × W × H)', val: '1,450 × 1,100 × 1,980 mm' },
        { label: 'Power Consumption', val: '7.5 kW (Peak), 4.2 kW (Nominal)' },
        { label: 'Dosing Accuracy', val: '±1.5% - 2.5% (Material Dependent)' },
        { label: 'Material Construction', val: 'SS 316L (Contact Parts), SS 304 (Chassis)' },
        { label: 'Compliance', val: '21 CFR Part 11, GAMP 5' },
        { label: 'Operating Noise', val: '< 72 dB(A)' }
      ],
      standards: ['ISO 14644-1', 'CE, UL Listed', 'Pharmacopeia Standard', 'GMP Compliant', 'Global Medical Standards', 'OSHA Compliant'],
      advantages: [
        { title: 'Laser-Cut Tooling', desc: 'Micron-level tolerance dosing discs ensure zero leakage and consistent weight across 100k+ cycles.' },
        { title: 'Real-time Analytics', desc: 'Embedded sensors monitor pressure and temperature, providing predictive maintenance alerts via OPC UA.' },
        { title: 'Sterile Hygiene', desc: 'Fully enclosed design with WIP (Wash-In-Place) options for rapid sanitization and cross-contamination prevention.' }
      ],
      workflow: [
        { step: 'Raw Material', desc: 'Powder/liquid loading via vacuum conveyor' },
        { step: 'Processing', desc: 'Compression into precise dosing slugs / filtration' },
        { step: 'Filling', desc: 'High-speed sterile Blow-Fill-Seal encapsulation' },
        { step: 'Inspection', desc: 'Vision systems for particulate and leak detection' },
        { step: 'Packaging', desc: 'Automatic counting, capping, and secondary bagging' }
      ],
      faqs: [
        { q: 'What is the expected maintenance cycle for dosing discs?', a: 'Under normal operating conditions, dosing discs should be inspected every 500 operating hours. Standard replacement cycles for seals are 2,000 hours of continuous operations.' },
        { q: 'Does the system support hygroscopic materials?', a: 'Yes, the fully enclosed chamber supports humidity-controlled air flow to prevent moisture absorption in hygroscopic pharmaceutical powders.' },
        { q: 'How is data integrity maintained for regulatory compliance?', a: 'All telemetry logs and operational audits are saved in an encrypted SQL format compliant with FDA 21 CFR Part 11, supporting electronic signatures.' }
      ],
      complementary: [
        { name: 'BP-300 Blister Packer', desc: 'High-speed secondary packaging with integrated vision inspection.', id: 'sterilepack' },
        { name: 'MX-500 V-Blender', desc: 'Precision homogenization for sensitive pharmaceutical dry powders.', id: 'mediflow' },
        { name: 'QC-Scanner Pro', desc: 'Non-destructive capsule analyzer for weight and shell integrity.', id: 'pt9000' }
      ],
      imageType: 'machine'
    },
    sterilepack: {
      name: 'SterilePack V3',
      subtitle: 'Robotic Aseptic Packaging Line',
      desc: 'Advanced robotic packing and sealing unit. Features sub-millimeter positioning accuracy to ensure secure double-port capping for large volume parenterals.',
      specs: [
        { label: 'Throughput Speed', val: '3,200 units/hr' },
        { label: 'Robotic Tolerance', val: '± 0.01 mm' },
        { label: 'Chassis Material', val: 'SS 316L Electro-polished' },
        { label: 'Sterile Zone Class', val: 'ISO Class 5 (Class A)' },
        { label: 'Air Supply', val: 'HEPA H14 Laminar Flow' },
        { label: 'Power Consumption', val: '5.8 kW' }
      ],
      standards: ['ISO 14644-1', 'CE Listed', 'GMP Compliant', 'EMC Directive', 'OSHA Compliant'],
      advantages: [
        { title: 'Sub-micron Robotics', desc: 'Robotic arm positioning with ultra-fine precision ensures perfectly hermetic port-welding.' },
        { title: 'Intelligent Sorting', desc: 'Dynamic load cells filter out under-weight containers in real time without stopping the line.' },
        { title: 'Cleanroom Integration', desc: 'Designed with smooth organic lines to prevent turbulence in laminar airflow systems.' }
      ],
      workflow: [
        { step: 'Container Feed', desc: 'Inlet conveyor feed of BFS sterile bottles' },
        { step: 'Aseptic Welding', desc: 'High-frequency thermal sealing of port caps' },
        { step: 'Inspection', desc: 'Laser vision check for cap seal integrity' },
        { step: 'Logistics', desc: 'Automatic robotic sorting into transport crates' },
        { step: 'Coding', desc: 'Laser jet etching of batch number and expiration date' }
      ],
      faqs: [
        { q: 'How long does the cleanroom sanitization process take?', a: 'The SterilePack V3 is compatible with Vaporized Hydrogen Peroxide (VHP) sanitization. A full cycle takes approximately 45 minutes.' },
        { q: 'What port sizes are supported?', a: 'Standard configurations support 20mm and 32mm ports. Custom heads are available upon request.' }
      ],
      complementary: [
        { name: 'PharmaFill 5000 Series', desc: 'High-Speed Aseptic BFS Filler.', id: 'pt9000' },
        { name: 'MediFlow IV-200', desc: 'Semi-Automatic infusion bag sealer.', id: 'mediflow' },
        { name: 'QC-Scanner Pro', desc: 'Non-destructive container weight audit scanner.', id: 'pt9000' }
      ],
      imageType: 'robotic'
    },
    mediflow: {
      name: 'MediFlow IV-200',
      subtitle: 'Parenteral Bag Sealing Station',
      desc: 'Semi-automatic high-precision sealing station for parenteral infusion fluids. Delivers robust heat seals for medical-grade PE and PP bags.',
      specs: [
        { label: 'Sealing Speed', val: '1,200 bags/hr' },
        { label: 'Sealing Temperature', val: '120°C - 180°C Adjustable' },
        { label: 'Bag Material Support', val: 'PE, PP, Co-extruded Polymers' },
        { label: 'Power Requirements', val: '4.5 kW' },
        { label: 'Pneumatic Pressure', val: '6 Bar' },
        { label: 'Seal Width', val: '10 mm Dual Line' }
      ],
      standards: ['CE Compliant', 'ISO 9001', 'UL Standard Components', 'GMP Cleanroom Fit'],
      advantages: [
        { title: 'Dual-Line Sealing', desc: 'Provides double hermetic heat seal barriers, reducing leak rates to near zero.' },
        { title: 'Microprocessor Control', desc: 'Digital temp PID controller locks temperature settings to ±0.5°C tolerance.' },
        { title: 'Ergonomic Footprint', desc: 'Compact steel frame fits easily in clinical research labs or batch production cells.' }
      ],
      workflow: [
        { step: 'Bag Placement', desc: 'Manual positioning of pre-filled parenteral bag' },
        { step: 'Clamping', desc: 'Pneumatic jaws lock container securely' },
        { step: 'Heat Welding', desc: 'Micro-controlled heating cycle' },
        { step: 'Cooling Stage', desc: 'Rapid pneumatic cool down under load' },
        { step: 'Discharge', desc: 'Secure gravity discharge into batch bins' }
      ],
      faqs: [
        { q: 'Can it seal multi-layer medical films?', a: 'Yes, the high-pressure pneumatic clamps support laminates and co-extruded films up to 0.4mm thickness.' },
        { q: 'What is the warm-up time?', a: 'The heating elements reach operating temperature in under 8 minutes.' }
      ],
      complementary: [
        { name: 'PharmaFill 5000 Series', desc: 'High-Speed Aseptic BFS Filler.', id: 'pt9000' },
        { name: 'SterilePack V3', desc: 'Robotic Aseptic Packaging Line.', id: 'sterilepack' },
        { name: 'QC-Scanner Pro', desc: 'Non-destructive container weight audit scanner.', id: 'pt9000' }
      ],
      imageType: 'station'
    }
  };

  // 2. Formulation details mapping (dynamic based on selectedProductId)
  const product = !isMachine
    ? productsData.find(p => p.id === Number(selectedProductId)) || productsData[0]
    : null;

  // Helper to parse composition string from JSON
  const parseComposition = (compositionRaw) => {
    let dosageUnit = "Each 100 ml";
    let ingredients = [];

    if (!compositionRaw) return { dosageUnit, ingredients };

    if (compositionRaw.includes(":")) {
      const parts = compositionRaw.split(":");
      dosageUnit = parts[0].trim();
      const ingList = parts[1].split(",");
      ingredients = ingList.map(ing => {
        const trimmed = ing.trim();
        const match = trimmed.match(/(.*?)\s+([0-9.]+\s*(?:gm|mg|gm\.|mg\.)|q\.s\.|Eq\..*|Eq.*)$/i);
        if (match) {
          return { name: match[1].trim(), qty: match[2].trim() };
        }
        return { name: trimmed, qty: "q.s." };
      });
    } else {
      ingredients = [{ name: compositionRaw, qty: "Refer to label" }];
    }

    return { dosageUnit, ingredients };
  };

  const dosageData = product ? parseComposition(product.composition) : { dosageUnit: '', ingredients: [] };

  // Formulation Specs Table
  const formulationSpecs = product ? [
    { label: 'Formulation Standard', val: product.purpose === 'Domestic' ? 'IP Pharmacopeia' : 'BP/USP Compliant' },
    { label: 'Packaging Format', val: 'Sterile BFS PE Container' },
    { label: 'Sterility Assurance Level', val: 'SAL 10⁻⁶ (Guaranteed)' },
    { label: 'pH Range Specification', val: product.name.toLowerCase().includes('dextrose') ? '3.5 - 5.5' : '4.5 - 7.0' },
    { label: 'Osmolarity Class', val: product.name.toLowerCase().includes('dextrose') || product.name.toLowerCase().includes('0.9%') ? 'Isotonic' : 'Therapeutic Infusion' },
    { label: 'Product Shelf Life', val: '36 Months' }
  ] : [];

  const formulationStandards = ['WHO-GMP', 'ISO 9001:2015', 'CE Certified', 'FDA 21 CFR Part 11', 'Global Pharmacopeia', 'ISO 13485 (MD)'];

  const formulationAdvantages = [
    { title: 'High-Purity Formulation', desc: 'Prepared with pyrogen-free active ingredients and tested exhaustively via LAL gel clot methods.' },
    { title: 'Batch Traceability', desc: 'Barcoded shipping containers and digital records ensure full compliance with global distribution networks.' },
    { title: 'Aseptic BFS Process', desc: 'Constructed using modern Blow-Fill-Seal molding machines to achieve complete container hermetic isolation.' }
  ];

  const formulationWorkflow = [
    { step: 'Formulation Blending', desc: 'High-purity chemical reactions in sealed pressure vessels' },
    { step: 'Laminar Filtration', desc: 'Grade A area HEPA filtration to eliminate micron particulates' },
    { step: 'BFS Mold Forming', desc: 'Liquid molded and containerized in one continuous loop' },
    { step: 'Verification Inspections', desc: 'Automated weight check and light-obscuration particle scan' },
    { step: 'Logistics Shipping', desc: 'Temperature-controlled storage and logistics tracking' }
  ];

  const formulationFaqs = [
    { q: 'What is the expected shelf life and storage conditions?', a: 'All Alfacure parenteral solutions have a shelf life of 36 months when stored below 30°C. Protect from direct heat and do not freeze.' },
    { q: 'Does the formulation support electrolyte balancing?', a: 'Yes, our infusions (like Ringer Lactate and Saline) are specially balanced to match plasma osmolarity levels for clinical care.' },
    { q: 'How is sterility integrity maintained during transport?', a: 'We pack all PE bottles in protective carton cases. Batch codes are printed directly on the bottles to ensure traceability.' }
  ];

  // Complementary formulations
  const relatedFormulations = product
    ? productsData.filter(p => p.purpose === product.purpose && p.id !== product.id).slice(0, 3)
    : [];

  // Determine active view fields based on type
  const activeName = isMachine ? machines[selectedProductId].name : product.name;
  const activeSubtitle = isMachine ? machines[selectedProductId].subtitle : 'Sterile Parenteral Infusion';
  const activeDesc = isMachine ? machines[selectedProductId].desc : `Alfacure Lifescience large-volume parenteral formulation prepared under absolute aseptic conditions. Formulated using pure USP/IP pharmaceutical ingredients, packaged in durable non-pyrogenic BFS containers.`;
  const activeSpecs = isMachine ? machines[selectedProductId].specs : formulationSpecs;
  const activeStandards = isMachine ? machines[selectedProductId].standards : formulationStandards;
  const activeAdvantages = isMachine ? machines[selectedProductId].advantages : formulationAdvantages;
  const activeWorkflow = isMachine ? machines[selectedProductId].workflow : formulationWorkflow;
  const activeFaqs = isMachine ? machines[selectedProductId].faqs : formulationFaqs;

  const sidebarLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: isMachine ? 'Technical Specs' : 'Composition & Specs' },
    { id: 'advantages', label: 'Core Advantages' },
    { id: 'workflow', label: 'Process Workflow' },
    { id: 'documentation', label: 'Documentation' },
    { id: 'faq', label: 'Technical FAQ' },
    { id: 'quote', label: 'Request Quote' }
  ];

  const handleSidebarClick = (id, e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', volume: 'low', notes: '' });
    }, 4000);
  };

  const handleSelectRelated = (id) => {
    setSelectedProductId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-container animate-fade-in" style={{ backgroundColor: '#ffffff', paddingBottom: '80px' }}>

      {/* Breadcrumbs */}
      <div style={{ borderBottom: '1px solid var(--border)', backgroundColor: '#f8fafc', padding: '16px 0' }}>
        <div className="container flex align-center" style={{ gap: '8px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <span>{isMachine ? 'SOLUTIONS' : 'FORMULATIONS'}</span>
          <ChevronRight size={12} />
          <span>{isMachine ? 'BFS SYSTEMS' : `${product?.purpose} CATALOG`}</span>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--primary)' }}>
            {isMachine ? selectedProductId.toUpperCase() : `RL-${String(product?.id).padStart(3, '0')}`}
          </span>
        </div>
      </div>

      {/* Main Product Title / Summary Block */}
      <section className="section" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border)', padding: '60px 0', textAlign: 'left' }}>
        <div className="container">
          <div className="grid grid-cols-12 align-center" style={{ gap: '64px' }}>

            {/* Left Col */}
            <div style={{ gridColumn: 'span 8' }}>
              <div className="flex" style={{ gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span className="badge badge-blue">
                  {isMachine ? 'BFS Machinery' : `ID: RL-${String(product?.id).padStart(3, '0')}`}
                </span>
                <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700 }}>
                  {isMachine ? 'FDA Compliant' : `${product?.purpose} Market`}
                </span>
                <span className="badge" style={{ backgroundColor: '#e6f4ea', color: '#137333', fontWeight: 700 }}>
                  Sterility Assured
                </span>
              </div>

              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px', lineHeight: '1.2', color: 'var(--secondary)' }}>
                {activeName}
              </h1>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '24px' }}>
                {activeSubtitle}
              </h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                {activeDesc}
              </p>
            </div>

            {/* Right Col - Vector SVG Display */}
            <div style={{ gridColumn: 'span 4' }}>
              <div className="card" style={{ padding: '24px', border: '1px solid var(--border)', backgroundColor: '#ffffff', boxShadow: 'none' }}>
                <div style={{ padding: '32px', backgroundColor: '#f8fafc', borderRadius: '6px', textAlign: 'center' }}>
                  {isMachine ? (
                    <svg width="120" height="200" viewBox="0 0 100 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }}>
                      <rect x="15" y="40" width="70" height="110" rx="4" fill="#005bc4" fillOpacity="0.1" stroke="#005bc4" strokeWidth="2.5" />
                      <circle cx="50" cy="95" r="25" fill="white" stroke="#005bc4" strokeWidth="2" />
                      <line x1="35" y1="95" x2="65" y2="95" stroke="#005bc4" strokeWidth="2" />
                      <line x1="50" y1="80" x2="50" y2="110" stroke="#005bc4" strokeWidth="2" />
                      <rect x="30" y="20" width="40" height="20" rx="2" fill="#005bc4" fillOpacity="0.2" stroke="#005bc4" strokeWidth="2" />
                    </svg>
                  ) : (
                    <svg width="120" height="200" viewBox="0 0 100 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }}>
                      <rect x="35" y="10" width="30" height="20" rx="3" fill="#005bc4" fillOpacity="0.2" stroke="#005bc4" strokeWidth="2" />
                      <rect x="42" y="30" width="16" height="20" fill="#005bc4" fillOpacity="0.1" stroke="#005bc4" strokeWidth="2" />
                      <path d="M20 70C20 58.9543 28.9543 50 40 50H60C71.0457 50 80 58.9543 80 70V160C80 165.523 75.5228 170 70 170H30C24.4772 170 20 165.523 20 160V70Z" fill="white" stroke="#005bc4" strokeWidth="2.5" />
                      <line x1="30" y1="120" x2="70" y2="120" stroke="#005bc4" strokeWidth="1.5" strokeDasharray="3 3" />
                      <path d="M45 85H55M50 80V90" stroke="#005bc4" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  )}

                  <div style={{ marginTop: '20px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {isMachine ? 'Fully Enclosed BFS Unit' : 'Sterile PE Container'}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container" style={{ marginTop: '60px' }}>
        <div style={{ display: 'flex', gap: '48px', position: 'relative' }}>

          {/* Sticky Left Navigation (mockup style) */}
          <aside style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '120px', height: 'fit-content', textAlign: 'left' }}>
            <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {sidebarLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleSidebarClick(link.id, e)}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-light)',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                  className="sidebar-nav-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </aside>

          {/* Right Scrollable Column */}
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '60px', minWidth: 0 }}>

            {/* 1. Overview */}
            <section id="overview" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '24px' }}>Overview & Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                <div>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    {isMachine ? (
                      'The system is engineered for sterile cleanroom applications, offering micro-precision filling at scale. Utilizes automated intermittent motion mechanisms and sterile chambers to reduce contamination risk during secondary and tertiary pharmaceutical processing.'
                    ) : (
                      `This parenteral formulation is manufactured under sterile Class A HEPA filters to guarantee a pyrogen-free product with a Sterility Assurance Level (SAL) of 10⁻⁶. Formulated for direct clinical intravenous injection.`
                    )}
                  </p>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                    {isMachine ? (
                      'Built to satisfy the regulatory standards of high-output facilities, featuring automated changeover mechanisms to minimize batch configuration times and maintain operational speed.'
                    ) : (
                      'Blow-Fill-Seal (BFS) container technology forms, fills, and seals the non-toxic PE container in one uninterrupted continuous cycle, ensuring the product has zero human contact.'
                    )}
                  </p>
                </div>

                {/* Highlights Panel */}
                <div style={{ padding: '24px', backgroundColor: '#f8fafc', border: '1px solid var(--border)', borderRadius: '6px' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--secondary)', marginBottom: '16px' }}>
                    Key Parameters
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(isMachine ? ['Fully Automatic BFS line', 'ISO Class 5 zone', 'WIP Sanitization Option', 'OPC UA Telemetry'] : ['Sterile PE Bottle', 'WHO-GMP Compliant', 'Conforms to IP/BP/USP', 'Pyrogen-Free Fluid']).map((pt, idx) => (
                      <li key={idx} className="flex align-center" style={{ gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <CheckCircle size={14} style={{ color: 'var(--success)', flexShrink: 0 }} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. Specs Table */}
            <section id="specs" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '24px' }}>
                {isMachine ? 'Technical Specifications' : 'Formulation Specifications'}
              </h2>

              {!isMachine && product && (
                <div style={{ backgroundColor: 'var(--primary-light)', padding: '16px 20px', borderRadius: '4px', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '24px' }}>
                  Composition Base Reference: {dosageData.dosageUnit}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                <div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)' }}>
                        <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'left' }}>Parameter</th>
                        <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'right' }}>Specification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeSpecs.map((spec, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--border)', backgroundColor: idx % 2 === 1 ? '#f8fafc' : 'transparent' }}>
                          <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--secondary)' }}>{spec.label}</td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: 'var(--text-main)' }}>{spec.val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Standards badges panel */}
                <div>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '16px' }}>
                    Compliance & Standards
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {activeStandards.map((std, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary)' }}>
                        <span style={{ color: 'var(--primary)' }}>✔</span>
                        <span>{std}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Composition details table (Only for Formulations) */}
              {!isMachine && dosageData.ingredients.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '20px' }}>Active Ingredients Breakdown</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border)', textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.05em' }}>
                        <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'left' }}>Ingredient Component</th>
                        <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'right' }}>Strength / Vol</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dosageData.ingredients.map((ing, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--border)', backgroundColor: idx % 2 === 1 ? '#f8fafc' : 'transparent' }}>
                          <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--secondary)' }}>{ing.name}</td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: 'var(--primary)' }}>{ing.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* 3. Core Advantages */}
            <section id="advantages" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '24px' }}>Core Technical Advantages</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {activeAdvantages.map((adv, idx) => (
                  <div key={idx} style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '24px', backgroundColor: '#ffffff' }}>
                    <div style={{ display: 'inline-flex', padding: '8px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '50%', marginBottom: '16px' }}>
                      <Shield size={18} />
                    </div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '12px' }}>{adv.title}</h4>
                    <p style={{ fontSize: '0.75rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>{adv.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Process Workflow */}
            <section id="workflow" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '24px' }}>Automated Production Workflow</h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '12px',
                  position: 'relative',
                  borderTop: '2px solid var(--primary)',
                  paddingTop: '24px',
                  marginTop: '16px'
                }}
              >
                {activeWorkflow.map((step, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    {/* Node Dot */}
                    <div style={{ position: 'absolute', top: '-33px', left: '0', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: '4px solid #ffffff' }} />
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                      Step 0{idx + 1}
                    </span>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{step.step}</h4>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Documentation */}
            <section id="documentation" style={{ textAlign: 'left', backgroundColor: '#f8fafc', padding: '32px', border: '1px solid var(--border)', borderRadius: '6px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '20px' }}>Technical Documentation</h2>
              <div className="flex" style={{ gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 calc(50% - 12px)', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: '#ffffff' }}>
                  <div style={{ color: 'var(--primary)' }}><CheckCircle size={32} /></div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '4px' }}>
                      {isMachine ? 'Product Brochure 2024' : 'Formulation Fact Sheet'}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>High-resolution PDF (4.2 MB)</span>
                  </div>
                </div>

                <div style={{ flex: '1 1 calc(50% - 12px)', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: '#ffffff' }}>
                  <div style={{ color: 'var(--primary)' }}><CheckCircle size={32} /></div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '4px' }}>
                      {isMachine ? 'Technical Datasheet' : 'Regulatory CTD Dossier'}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Engineering Specs (1.8 MB)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Collapsible FAQ */}
            <section id="faq" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '24px' }}>Technical FAQ</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}
                  >
                    <button
                      onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: 'none',
                        background: activeFAQ === idx ? '#f8fafc' : 'transparent',
                        textAlign: 'left',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--secondary)' }}>
                        {faq.q}
                      </span>
                      {activeFAQ === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {activeFAQ === idx && (
                      <div style={{ padding: '20px', borderTop: '1px solid var(--border)', backgroundColor: '#ffffff', fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Quote Form Banner */}
            <section id="quote" style={{ textAlign: 'left', background: 'var(--primary)', color: '#ffffff', padding: '40px', borderRadius: '8px', boxShadow: 'none' }}>
              <div className="grid grid-cols-2" style={{ gap: '40px', alignItems: 'center' }}>
                <div>
                  <h2 style={{ color: '#ffffff', fontSize: '1.85rem', marginBottom: '16px', fontWeight: 700 }}>Request Technical Specs & Pricing</h2>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    Speak with a product relations manager to discuss custom volumes, lead times, and regulatory dossier options.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.8rem', fontWeight: 600 }}>
                    <div className="flex align-center" style={{ gap: '8px' }}><Check size={14} /> <span>Estimated Lead Time: 2-3 Weeks</span></div>
                    <div className="flex align-center" style={{ gap: '8px' }}><Check size={14} /> <span>WHO-GMP Dossier Support</span></div>
                    <div className="flex align-center" style={{ gap: '8px' }}><Check size={14} /> <span>24/7 Supply Logistics</span></div>
                  </div>
                </div>

                {/* Form card */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', padding: '24px', color: 'var(--secondary)' }}>
                  {formSubmitted ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', marginBottom: '12px' }}>
                        <CheckCircle size={28} />
                      </div>
                      <h3 style={{ marginBottom: '6px' }}>Inquiry Received</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>We will send pricing details within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit}>
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          style={{ padding: '8px 12px', fontSize: '0.8125rem' }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Work Email</label>
                        <input
                          type="email"
                          required
                          className="form-control"
                          placeholder="name@healthcare.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{ padding: '8px 12px', fontSize: '0.8125rem' }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Supply Cycle Requirement</label>
                        <select
                          className="form-control"
                          value={formData.volume}
                          onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                          style={{ padding: '8px 12px', fontSize: '0.8125rem' }}
                        >
                          <option value="low">Standard Supply (Under 5,000 units)</option>
                          <option value="medium">Medium Demand (5,000 - 20,000 units)</option>
                          <option value="high">High Distribution Cycle (20,000+ units)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Notes & Specifications</label>
                        <textarea
                          className="form-control"
                          placeholder="Tell us about your logistics and regulatory details..."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          style={{ padding: '8px 12px', fontSize: '0.8125rem', minHeight: '70px' }}
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px' }}>
                        Send Inquiry
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Bottom Complementary / Related Solutions section */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', marginTop: '60px', backgroundColor: '#f8fafc', padding: '60px 0' }}>
        <div className="container">
          <div className="section-title-wrapper" style={{ marginBottom: '32px', textAlign: 'left' }}>
            <h2 className="section-title" style={{ fontSize: '1.5rem', color: 'var(--secondary)' }}>
              {isMachine ? 'Complementary Systems' : 'Related Formulations'}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {isMachine ? (
              machines[selectedProductId].complementary.map((sol, idx) => (
                <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--border)', backgroundColor: '#ffffff', textAlign: 'left' }}>
                  <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', marginBottom: '8px', display: 'inline-block' }}>SYSTEMS</span>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{sol.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '16px' }}>{sol.desc}</p>
                    </div>
                    <button
                      className="btn-link"
                      style={{ fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}
                      onClick={() => handleSelectRelated(sol.id)}
                    >
                      View Specs <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              relatedFormulations.map((sol) => (
                <div key={sol.id} className="card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--border)', backgroundColor: '#ffffff', textAlign: 'left' }}>
                  <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', marginBottom: '8px', display: 'inline-block' }}>{sol.purpose}</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px', minHeight: '36px', display: 'flex', alignItems: 'center' }}>{sol.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '16px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{sol.composition}</p>
                    </div>
                    <button
                      className="btn-link"
                      style={{ fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}
                      onClick={() => handleSelectRelated(sol.id)}
                    >
                      View Formulation Specs <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
