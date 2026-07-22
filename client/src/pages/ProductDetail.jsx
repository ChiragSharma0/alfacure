import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { ChevronRight, CheckCircle, Shield, Phone, ArrowUpRight, Check, ChevronDown, ChevronUp } from 'lucide-react';
import productsData from '../data/products.json';
import { useCMS } from '../context/CMSContext';

/* ─── MACHINE DATA ── */
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
    ]
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
    ]
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
    ]
  }
};

const formulationStandards = [
  'ISO Certified',
  'CRISIL Certified',
  'CTD / eCTD / ACTD Documentation',
  'Certificate of Pharmaceutical Product (COPP)',
  'Free Sale Certificate (FSC)',
  'Certificate of Analysis (CoA)'
];

const formulationAdvantages = [
  {
    title: 'Comprehensive Product Portfolio',
    desc: 'A complete range of Large Volume Parenterals including fluid replenishers, electrolytes, antimicrobials, antibiotics, antifungals, and critical care solutions.'
  },
  {
    title: 'Regulatory Expertise',
    desc: 'Dedicated Regulatory Affairs support with CTD, eCTD, ACTD dossiers, validation data, and country-specific registration assistance.'
  },
  {
    title: 'Global Supply Network',
    desc: 'Serving healthcare institutions, distributors, and international partners with reliable pharmaceutical solutions.'
  }
];

const formulationWorkflow = [
  {
    step: 'Manufacturing',
    desc: 'Production of sterile Large Volume Parenteral solutions under strict quality standards.'
  },
  {
    step: 'Quality Control',
    desc: 'Comprehensive quality checks and batch verification processes.'
  },
  {
    step: 'Regulatory Affairs',
    desc: 'Preparation of CTD, eCTD, and ACTD dossiers for market authorization.'
  },
  {
    step: 'Certification',
    desc: 'Issuance of CoA, COPP, FSC, and other compliance documents.'
  },
  {
    step: 'Distribution',
    desc: 'Supply and export to healthcare institutions and global distribution partners.'
  }
];

const formulationFaqs = [
  { q: 'What is the expected shelf life and storage conditions?', a: 'All Alfacure parenteral solutions have a shelf life of 36 months when stored below 30°C. Protect from direct heat and do not freeze.' },
  { q: 'Does the formulation support electrolyte balancing?', a: 'Yes, our infusions (like Ringer Lactate and Saline) are specially balanced to match plasma osmolarity levels for clinical care.' },
  { q: 'How is sterility integrity maintained during transport?', a: 'We pack all PE bottles in protective carton cases. Batch codes are printed directly on the bottles to ensure traceability.' }
];

function parseComposition(compositionRaw) {
  let dosageUnit = 'Each 100 ml';
  let ingredients = [];
  if (!compositionRaw) return { dosageUnit, ingredients };
  if (compositionRaw.includes(':')) {
    const parts = compositionRaw.split(':');
    dosageUnit = parts[0].trim();
    ingredients = parts[1].split(',').map(ing => {
      const trimmed = ing.trim();
      const match = trimmed.match(/(.*?)\s+([0-9.]+\s*(?:gm|mg|gm\.|mg\.)|q\.s\.|Eq\..*|Eq.*)$/i);
      if (match) return { name: match[1].trim(), qty: match[2].trim() };
      return { name: trimmed, qty: 'q.s.' };
    });
  } else {
    ingredients = [{ name: compositionRaw, qty: 'Refer to label' }];
  }
  return { dosageUnit, ingredients };
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', volume: 'low', notes: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { content, resolveImage } = useCMS();
  const activeProductsData = content?.products?.productsData || productsData;
  const activeMachineryList = content?.products?.machineryItems || [];

  const isMachine = ['pt9000', 'sterilepack', 'mediflow'].includes(id) || activeMachineryList.some(m => m.id === id);
  const product = !isMachine ? activeProductsData.find(p => p.id === Number(id)) || activeProductsData[0] : null;
  const machine = isMachine ? (activeMachineryList.find(m => m.id === id) || machines[id] || machines.pt9000) : null;

  const dosageData = product ? parseComposition(product.composition) : { dosageUnit: '', ingredients: [] };
  const formulationSpecs = product ? [
    {
      label: 'Therapeutic Category',
      val: product.category || 'Large Volume Parenteral'
    },
    {
      label: 'Available Volumes',
      val: (product.packSizes || []).join(', ')
    },
    {
      label: 'Active Ingredients',
      val: product.active_ingredients || 'Refer to Chemical Composition'
    },
    {
      label: 'Primary Packaging Spec',
      val: product.packaging || 'Sterile PE Bottle'
    },
    {
      label: 'Regulatory Support',
      val: 'CTD / eCTD / ACTD Documentation'
    },
    {
      label: 'Certification Support',
      val: 'COPP, FSC & CoA'
    },
    {
      label: 'Market Coverage',
      val: product.markets || (product.purpose === 'Domestic' ? 'Domestic Distribution' : 'Domestic & International Markets')
    },
    {
      label: 'Composition Details',
      val: product.composition_details || product.composition
    },
    {
      label: 'Exporter',
      val: 'Alfacure Lifescience Pvt. Ltd.'
    }
  ] : [];

  const activeName = isMachine ? machine.name : (product?.name || '');
  const activeSubtitle = isMachine ? (machine.subtitle || 'BFS Machinery System') : 'Large Volume Parenteral (LVP)';
  const activeDesc = isMachine ? (machine.desc || 'Premium automated Blow-Fill-Seal system for sterile container fluid packaging.') : 'Premium Large Volume Parenteral formulation developed for modern healthcare institutions and supported by comprehensive regulatory documentation, quality assurance, and global distribution capabilities.';

  const customMachineSpecs = machine ? [
    { label: 'Flow Capacity', val: machine.capacity || 'N/A' },
    { label: 'Automation Level', val: machine.automation || 'N/A' },
    { label: 'Accuracy & ISO Class', val: machine.isoClass || 'N/A' },
    { label: 'Operational Status', val: machine.status || 'Active' }
  ] : [];

  const activeSpecs = isMachine ? (machine.specs || customMachineSpecs) : formulationSpecs;
  const activeStandards = isMachine ? (machine.standards || ['ISO 14644-1', 'CE Listed', 'GMP Compliant']) : (product?.standards && product.standards.length > 0 ? product.standards : formulationStandards);
  const activeAdvantages = isMachine ? (machine.advantages || formulationAdvantages) : (product?.advantages && product.advantages.length > 0 ? product.advantages : formulationAdvantages);
  const activeWorkflow = isMachine ? (machine.workflow || formulationWorkflow) : (product?.workflow && product.workflow.length > 0 ? product.workflow : formulationWorkflow);
  const activeFaqs = isMachine ? (machine.faqs || formulationFaqs) : (product?.faqs && product.faqs.length > 0 ? product.faqs : formulationFaqs);
  const relatedFormulations = product ? activeProductsData.filter(p => p.purpose === product.purpose && p.id !== product.id).slice(0, 3) : [];

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const PRODUCT_SCRIPT_URL = import.meta.env.VITE_PRODUCT_SCRIPT_URL;

    const payload = {
      ...formData,
      product: activeName,
      type: isMachine ? 'machinery' : 'formulation'
    };

    try {
      const response = await fetch(PRODUCT_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({ name: '', email: '', volume: 'low', notes: '' });
        }, 4000);
      } else {
        alert("Failed to submit inquiry.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const scrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sidebarLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: isMachine ? 'Technical Specs' : 'Composition & Specs' },
    { id: 'advantages', label: 'Core Advantages' },
    { id: 'workflow', label: 'Process Workflow' },
    { id: 'documentation', label: 'Documentation' },
    { id: 'faq', label: 'FAQs' },
    { id: 'quote', label: 'Request Quote' }
  ];

  return (
    <div className="page-container animate-fade-in" style={{ backgroundColor: '#ffffff', paddingBottom: '80px' }}>
      <SEO
        title={product ? `${product.name} — Product Detail` : 'Product'}
        description={product ? `${product.category} — ${product.description?.substring(0, 150)}` : 'Alfacure Lifescience product detail page.'}
        canonical={`https://alfacurelifescience.com/products/${id}`}
      />
      {/* Breadcrumbs */}
      <div style={{ borderBottom: '1px solid var(--border)', backgroundColor: '#f8fafc', padding: '14px 0' }}>
        <div className="container flex align-center" style={{ gap: '8px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/products')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', fontWeight: 700, fontSize: '0.78rem', padding: 0 }}>
            {isMachine ? 'SOLUTIONS' : 'FORMULATIONS'}
          </button>
          <ChevronRight size={12} />
          <span>{isMachine ? 'BFS SYSTEMS' : `${product?.purpose} CATALOG`}</span>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--primary)' }}>
            {isMachine ? id.toUpperCase() : `RL-${String(product?.id).padStart(3, '0')}`}
          </span>
        </div>
      </div>

      {/* Product Summary */}
      <section style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <div className="product-detail-hero">
            {/* Left */}
            <div>
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
              <h1 style={{ fontWeight: 800, marginBottom: '12px', lineHeight: 1.2, color: 'var(--secondary)' }} className="product-detail-title">
                {activeName}
              </h1>
              <h3 style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '20px' }}>
                {activeSubtitle}
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
                {activeDesc}
              </p>
            </div>

            {/* Right — Custom image or SVG illustration */}
            <div>
              <div className="card" style={{ padding: '24px', border: '1px solid var(--border)', backgroundColor: '#ffffff', boxShadow: 'none' }}>
                <div style={{ padding: '32px', backgroundColor: '#f8fafc', borderRadius: '6px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {isMachine ? (
                    machine?.image ? (
                      <img src={resolveImage(machine.image)} alt={machine.name} style={{ maxWidth: '100%', maxHeight: '160px', objectFit: 'contain', borderRadius: '4px' }} />
                    ) : (
                      <svg width="100" height="160" viewBox="0 0 100 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="15" y="40" width="70" height="110" rx="4" fill="#005bc4" fillOpacity="0.1" stroke="#005bc4" strokeWidth="2.5" />
                        <circle cx="50" cy="95" r="25" fill="white" stroke="#005bc4" strokeWidth="2" />
                        <line x1="35" y1="95" x2="65" y2="95" stroke="#005bc4" strokeWidth="2" />
                        <line x1="50" y1="80" x2="50" y2="110" stroke="#005bc4" strokeWidth="2" />
                        <rect x="30" y="20" width="40" height="20" rx="2" fill="#005bc4" fillOpacity="0.2" stroke="#005bc4" strokeWidth="2" />
                      </svg>
                    )
                  ) : (
                    product?.image ? (
                      <img src={resolveImage(product.image)} alt={product.name} style={{ maxWidth: '100%', maxHeight: '160px', objectFit: 'contain', borderRadius: '4px' }} />
                    ) : (
                      <svg width="100" height="160" viewBox="0 0 100 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="35" y="10" width="30" height="20" rx="3" fill="#005bc4" fillOpacity="0.2" stroke="#005bc4" strokeWidth="2" />
                        <rect x="42" y="30" width="16" height="20" fill="#005bc4" fillOpacity="0.1" stroke="#005bc4" strokeWidth="2" />
                        <path d="M20 70C20 58.9543 28.9543 50 40 50H60C71.0457 50 80 58.9543 80 70V160C80 165.523 75.5228 170 70 170H30C24.4772 170 20 165.523 20 160V70Z" fill="white" stroke="#005bc4" strokeWidth="2.5" />
                        <line x1="30" y1="120" x2="70" y2="120" stroke="#005bc4" strokeWidth="1.5" strokeDasharray="3 3" />
                      </svg>
                    )
                  )}
                  <div style={{ marginTop: '16px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {isMachine ? 'BFS Machinery Unit' : 'Sterile Parenteral Fluid'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content — sidebar + scrollable sections */}
      <div className="container" style={{ marginTop: '48px' }}>
        <div className="product-detail-layout">

          {/* Sticky Sidebar */}
          <aside className="product-detail-sidebar">
            <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {sidebarLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-light)',
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px', minWidth: 0 }}>

            {/* Overview */}
            <section id="overview" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '24px' }}>Overview & Details</h2>
              <div className="product-overview-grid">
                <div>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '16px' }}>
                    {isMachine
                      ? 'The system is engineered for sterile cleanroom applications, offering micro-precision filling at scale. Utilizes automated intermittent motion mechanisms and sterile chambers to reduce contamination risk during secondary and tertiary pharmaceutical processing.'
                      : 'This parenteral formulation is manufactured under sterile Class A HEPA filters to guarantee a pyrogen-free product with a Sterility Assurance Level (SAL) of 10⁻⁶. Formulated for direct clinical intravenous injection.'}
                  </p>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                    {isMachine
                      ? 'Built to satisfy the regulatory standards of high-output facilities, featuring automated changeover mechanisms to minimize batch configuration times and maintain operational speed.'
                      : 'Blow-Fill-Seal (BFS) container technology forms, fills, and seals the non-toxic PE container in one uninterrupted continuous cycle, ensuring the product has zero human contact.'}
                  </p>
                </div>
                <div style={{ padding: '24px', backgroundColor: '#f8fafc', border: '1px solid var(--border)', borderRadius: '6px' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--secondary)', marginBottom: '16px' }}>
                    Key Parameters
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {(isMachine
                      ? ['Fully Automatic BFS line', 'ISO Class 5 zone', 'WIP Sanitization Option', 'OPC UA Telemetry']
                      : ['Sterile PE Bottle', 'WHO-GMP Compliant', 'Conforms to IP/BP/USP', 'Pyrogen-Free Fluid']
                    ).map((pt, idx) => (
                      <li key={idx} className="flex align-center" style={{ gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <CheckCircle size={14} style={{ color: 'var(--success)', flexShrink: 0 }} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Specs */}
            <section id="specs" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '24px' }}>
                {isMachine ? 'Technical Specifications' : 'Formulation Specifications'}
              </h2>
              {!isMachine && product && (
                <div style={{ backgroundColor: 'var(--primary-light)', padding: '14px 18px', borderRadius: '4px', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '24px' }}>
                  Composition Base Reference: {dosageData.dosageUnit}
                </div>
              )}
              <div className="product-overview-grid">
                <div style={{ overflowX: 'auto' }}>
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
                <div>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '14px' }}>
                    Compliance & Standards
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {activeStandards.map((std, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary)' }}>
                        <span style={{ color: 'var(--primary)' }}>✔</span>
                        <span>{std}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {!isMachine && dosageData.ingredients.length > 0 && (
                <div style={{ marginTop: '36px', overflowX: 'auto' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '16px' }}>Active Ingredients Breakdown</h3>
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

            {/* Advantages */}
            <section id="advantages" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '24px' }}>Core Technical Advantages</h2>
              <div className="grid grid-cols-3" style={{ gap: '20px' }}>
                {activeAdvantages.map((adv, idx) => (
                  <div key={idx} style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '24px', backgroundColor: '#ffffff' }}>
                    <div style={{ display: 'inline-flex', padding: '8px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '50%', marginBottom: '14px' }}>
                      <Shield size={18} />
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '10px' }}>{adv.title}</h4>
                    <p style={{ fontSize: '0.78rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>{adv.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Workflow */}
            <section id="workflow" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '24px' }}>Automated Production Workflow</h2>
              <div className="product-workflow-grid">
                {activeWorkflow.map((step, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-33px', left: '0', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: '4px solid #ffffff' }} />
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                      Step 0{idx + 1}
                    </span>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>{step.step}</h4>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Documentation */}
            <section id="documentation" style={{ textAlign: 'left', backgroundColor: '#f8fafc', padding: '28px', border: '1px solid var(--border)', borderRadius: '6px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '18px' }}>Technical Documentation</h2>
              <div className="flex" style={{ gap: '20px', flexWrap: 'wrap' }}>
                {!isMachine ? (
                  <>
                    <div style={{ flex: '1 1 calc(50% - 10px)', minWidth: '200px', display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: '#ffffff' }}>
                      <div style={{ color: 'var(--primary)' }}><CheckCircle size={28} /></div>
                      <div style={{ flexGrow: 1 }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '4px' }}>Formulation Fact Sheet</h4>
                        {product?.factSheetPdf ? (
                          <a href={resolveImage(product.factSheetPdf)} download className="btn-link" style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }} target="_blank" rel="noreferrer">
                            Download PDF Document
                          </a>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>PDF — Available on request</span>
                        )}
                      </div>
                    </div>
                    <div style={{ flex: '1 1 calc(50% - 10px)', minWidth: '200px', display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: '#ffffff' }}>
                      <div style={{ color: 'var(--primary)' }}><CheckCircle size={28} /></div>
                      <div style={{ flexGrow: 1 }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '4px' }}>Regulatory CTD Dossier</h4>
                        {product?.ctdDossierPdf ? (
                          <a href={resolveImage(product.ctdDossierPdf)} download className="btn-link" style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }} target="_blank" rel="noreferrer">
                            Download PDF Document
                          </a>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>PDF — Available on request</span>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  [
                    'Product Brochure 2024',
                    'Technical Datasheet'
                  ].map((doc, i) => (
                    <div key={i} style={{ flex: '1 1 calc(50% - 10px)', minWidth: '200px', display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: '#ffffff' }}>
                      <div style={{ color: 'var(--primary)' }}><CheckCircle size={28} /></div>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '4px' }}>{doc}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>PDF — Available on request</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '24px' }}>Technical FAQ</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeFaqs.map((faq, idx) => (
                  <div key={idx} style={{ border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                    <button
                      onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                      style={{ width: '100%', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', border: 'none', background: activeFAQ === idx ? '#f8fafc' : 'transparent', textAlign: 'left', cursor: 'pointer' }}
                    >
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--secondary)' }}>{faq.q}</span>
                      {activeFAQ === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {activeFAQ === idx && (
                      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', backgroundColor: '#ffffff', fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Quote Form */}
            <section id="quote" style={{ textAlign: 'left', background: 'var(--primary)', color: '#ffffff', padding: '36px', borderRadius: '8px' }}>
              <div className="product-quote-grid">
                <div>
                  <h2 style={{ color: '#ffffff', fontSize: '1.6rem', marginBottom: '14px', fontWeight: 700 }}>
                    {!isMachine ? (product?.quoteTitle || 'Request Technical Specs & Pricing') : 'Request Technical Specs & Pricing'}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {!isMachine ? (product?.quoteDesc || 'Speak with a product relations manager to discuss custom volumes, lead times, and regulatory dossier options.') : 'Speak with a product relations manager to discuss custom volumes, lead times, and regulatory dossier options.'}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', fontWeight: 600 }}>
                    {(!isMachine && product?.quoteBullets && product.quoteBullets.length > 0 ? product.quoteBullets : ['Estimated Lead Time: 2-3 Weeks', 'WHO-GMP Dossier Support', '24/7 Supply Logistics']).map((blt, idx) => (
                      <div key={idx} className="flex align-center" style={{ gap: '8px' }}>
                        <Check size={14} /> <span>{blt}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', padding: '24px', color: 'var(--secondary)' }}>
                  {formSubmitted ? (
                    <div style={{ textAlign: 'center', padding: '32px 0' }}>
                      <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--success)', marginBottom: '12px' }}>
                        <CheckCircle size={28} />
                      </div>
                      <h3 style={{ marginBottom: '6px' }}>Inquiry Received</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>We will send pricing details within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit}>
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" required className="form-control" placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ padding: '8px 12px', fontSize: '0.8rem' }} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Work Email</label>
                        <input type="email" required className="form-control" placeholder="name@healthcare.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ padding: '8px 12px', fontSize: '0.8rem' }} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Supply Cycle Requirement</label>
                        <select className="form-control" value={formData.volume} onChange={e => setFormData({ ...formData, volume: e.target.value })} style={{ padding: '8px 12px', fontSize: '0.8rem' }}>
                          <option value="low">Standard Supply (Under 5,000 units)</option>
                          <option value="medium">Medium Demand (5,000 - 20,000 units)</option>
                          <option value="high">High Distribution Cycle (20,000+ units)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Notes & Specifications</label>
                        <textarea className="form-control" placeholder="Tell us about your logistics and regulatory details..." value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} style={{ padding: '8px 12px', fontSize: '0.8rem', minHeight: '70px' }} />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px' }}>Send Inquiry</button>
                    </form>
                  )}
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Related */}
      <section style={{ borderTop: '1px solid var(--border)', marginTop: '60px', backgroundColor: '#f8fafc', padding: '56px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.5rem', color: 'var(--secondary)', marginBottom: '28px', fontWeight: 700 }}>
            {isMachine ? 'Complementary Systems' : 'Related Formulations'}
          </h2>
          <div className="grid grid-cols-3" style={{ gap: '24px' }}>
            {isMachine ? (
              machine.complementary.map((sol, idx) => (
                <div key={idx} className="card" style={{ border: '1px solid var(--border)', backgroundColor: '#ffffff', textAlign: 'left' }}>
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'inline-block' }}>SYSTEMS</span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--secondary)' }}>{sol.name}</h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4, flexGrow: 1 }}>{sol.desc}</p>
                    <button className="btn-link" style={{ fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => navigate(`/products/${sol.id}`)}>
                      View Specs <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              relatedFormulations.map(sol => (
                <div key={sol.id} className="card" style={{ border: '1px solid var(--border)', backgroundColor: '#ffffff', textAlign: 'left' }}>
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'inline-block' }}>{sol.purpose}</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--secondary)' }}>{sol.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{sol.composition}</p>
                    <button className="btn-link" style={{ fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => navigate(`/products/${sol.id}`)}>
                      View Formulation <ArrowUpRight size={12} />
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
