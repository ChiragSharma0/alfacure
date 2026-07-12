import React, { createContext, useContext, useEffect, useState } from 'react';

const CMSContext = createContext();

const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL || 'https://pub-9086758cc750456c9e924dc4e049f427.r2.dev';

// Builtin local defaults to load immediately and prevent rendering flashes
const defaultContent = {
  home: {
    heroTitle1: 'Premium Large Volume',
    heroTitle2: 'Parenteral Solutions',
    heroDesc: 'Alfacure Lifescience Pvt. Ltd. is an Ahmedabad-based pharmaceutical export company specializing in the commercialization and global distribution of life-saving Large Volume Parenteral (LVP) formulations, serving healthcare institutions across domestic and international markets through its strategic partnership with Realcade Lifescience Pvt. Ltd.',
    stats: [
      { value: '6', label: 'Pack Sizes', desc: '100 mL to 1000 mL' },
      { value: 'Global', label: 'Export Markets', desc: 'Germany, UAE, EU & UN' },
      { value: '2026', label: 'Established', desc: 'Ahmedabad-based enterprise' },
      { value: 'ISO', label: 'Certified', desc: 'ISO & CRISIL certified' }
    ],
    capabilities: [
      { title: 'Fluid & Electrolyte Solutions', desc: 'Comprehensive LVP solutions including Dextrose Injection, Sodium Chloride, DNS and Ringer Lactate infusions available in multiple volume configurations.' },
      { title: 'Anti-Infective Infusions', desc: 'High-efficacy antibacterial formulations including Ciprofloxacin, Ofloxacin, Levofloxacin, Moxifloxacin and Linezolid infusions.' },
      { title: 'Critical Care Products', desc: 'Mannitol, Paracetamol, Fluconazole, Metronidazole, Ornidazole and specialized electrolyte infusions for clinical applications.' }
    ],
    trustPoints: [
      'Specialized LVP export expertise',
      'Available in 100 mL to 1000 mL variants',
      'CTD / eCTD / ACTD dossier support',
      'Global regulatory documentation',
      'Complete batch traceability & CoA',
      'ISO & CRISIL certified'
    ]
  },
  about: {
    heroDesc: 'Alfacure Lifescience Pvt. Ltd. is a premier Ahmedabad-based pharmaceutical company specializing in the manufacturing, commercialization, and global distribution of life-saving therapeutics. With a strong focus on quality, sterility, and regulatory compliance, we deliver high-quality Large Volume Parenteral (LVP) solutions to healthcare institutions, distributors, and international partners across the world.',
    whatWeDo: [
      { title: 'Global Distribution', desc: 'Supplying Large Volume Parenterals (LVP), IV fluids, anti-infectives, and critical care formulations to healthcare institutions and distribution partners across domestic and international markets.' },
      { title: 'Regulatory & Documentation Support', desc: 'Providing end-to-end regulatory assistance including CTD, eCTD, and ACTD dossiers, product registrations, and country-specific compliance documentation.' },
      { title: 'Pharmaceutical Manufacturing', desc: 'Manufacturing premium sterile Large Volume Parenteral products under stringent quality control standards and advanced pharmaceutical protocols.' },
      { title: 'Strategic Partnerships', desc: 'Building long-term relationships with importers, distributors, hospitals, and healthcare organizations worldwide.' }
    ],
    whyAlfacure: [
      { title: 'Premium LVP Focus', desc: 'Premium Large Volume Parenteral (LVP) manufacturer established in Ahmedabad, Gujarat.' },
      { title: 'Certified Organisation', desc: 'ISO and CRISIL certified organization committed to quality, safety, and regulatory compliance.' },
      { title: 'Diverse Portfolio', desc: 'Comprehensive portfolio of sterile IV fluids, electrolytes, anti-infectives, and critical care products.' },
      { title: 'Regulatory Desk', desc: 'Dedicated Regulatory Affairs team supporting dossiers, registrations, and global market entry.' },
      { title: 'Supply & Logistics', desc: 'Reliable domestic supply network with expanding international export operations.' },
      { title: 'Global Mission', desc: 'Focused on delivering affordable, high-quality healthcare solutions worldwide.' }
    ],
    manufacturingSpecs: [
      { label: 'Established', desc: '2026' },
      { label: 'Certifications', desc: 'ISO & CRISIL Certified' },
      { label: 'Head Office', desc: 'Office 1122, Satyamev Shivalik, Bopal Ambili Junction, SP Ring Road, Ahmedabad – 380058' },
      { label: 'Specialization', desc: 'Large Volume Parenterals (LVP) & Sterile IV Solutions' },
      { label: 'Volume Range', desc: '100 mL, 250 mL, 300 mL, 400 mL, 500 mL & 1000 mL' },
      { label: 'Product Portfolio', desc: 'IV Fluids, Electrolytes, Mannitol, Antibiotics, Antifungals & Paracetamol Infusions' }
    ]
  },
  products: {
    heroTag: 'PRECISION FORMULATIONS & SYSTEMS',
    heroTitle: 'Products & Solutions',
    heroDesc: 'Explore our comprehensive range of sterile medical parenterals and high-precision Blow-Fill-Seal systems, engineered to meet the highest regulatory standards.',
    productsData: [],
    machineryItems: [
      { id: 'pt9000', name: 'PharmaFill 5000 Series', capacity: '5000 units/hr', automation: 'Fully Automatic', isoClass: 'Class 5', image: 'auto_capping.png', status: 'Active' },
      { id: 'sterilepack', name: 'SterilePack V3', capacity: '3200 units/hr', automation: 'Robotic Auto', isoClass: 'Class 5 (±0.01mm)', image: 'kinetic_sorting.png', status: 'Active' },
      { id: 'mediflow', name: 'MediFlow IV-200', capacity: '1200 Bags/hr', automation: 'Semi-Automatic', isoClass: 'Class 5 (4.5 kW)', image: 'clean_hub.png', status: 'Active' }
    ],
    industrySolutions: [
      { title: 'Pharmaceutical', desc: 'High-volume formulations and parenteral supply chains meeting international pharmacopeia guidelines for global markets.', bullets: ['WHO-GMP certified production', 'Comprehensive CTD export dossiers', 'Endotoxin-tested pyrogen-free liquids'] },
      { title: 'Hospitals', desc: 'Direct supply of critical large-volume infusions and sterile saline solutions for ICU, clinical wards, and surgery units.', bullets: ['Hanger-ready BFS plastic bottles', 'Double-port leak-proof closure caps', 'Compatible with automated infusion systems'] },
      { title: 'Contract Mfg.', desc: 'Flexible third-party manufacturing services with modular packaging sizes and customizable active concentration levels.', bullets: ['Custom formulation capabilities', 'Licensed manufacturing agreements', 'Scalable production batches'] }
    ]
  },
  gallery: {
    heroBadge: 'FACILITY GALLERY',
    heroTitle: 'Inside Our Manufacturing & Quality Facilities',
    heroDesc: 'Take a virtual tour of our state-of-the-art Blow-Fill-Seal (BFS) production halls and spectrometry validation clean hubs.',
    galleryItems: [
      { title: 'Automated Packaging Line', category: 'Packaging', description: 'Advanced leak-detection and terminal sterilization packaging units.', image: 'packaging_floor.png' }
    ],
    caseStudies: [
      { title: 'EU Infusion Batch Export', desc: 'Export validation process for 100,000 units of Paracetamol infusion.' }
    ]
  },
  certifications: {
    heroTitle1: 'Certifications &',
    heroTitle2: 'Regulatory Approvals',
    heroDesc: 'Every product we export is backed by internationally recognised certifications, rigorous quality controls, and full regulatory documentation.',
    qualityBadges: [
      { title: 'WHO-GMP', subtitle: 'Manufacturing Standard' },
      { title: 'ISO 9001:2015', subtitle: 'Quality Management' }
    ],
    certificates: [
      { name: 'WHO GMP Certificate', authority: 'FDA Gujarat', type: 'GMP Compliance' }
    ],
    regulatoryApprovals: [
      { country: 'Germany', standard: 'EU Compliance', status: 'Approved' }
    ]
  }
};

export function CMSProvider({ children }) {
  const [content, setContent] = useState(defaultContent); // Load default data instantly
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from R2 bucket public URL
    fetch(`${R2_PUBLIC_URL}/content.json`)
      .then(res => {
        if (!res.ok) throw new Error('Public R2 fetch failed');
        return res.json();
      })
      .then(data => {
        // Deep merge data on top of defaults to prevent fields vanishing
        const merged = {
          home: { ...defaultContent.home, ...data.home },
          about: { ...defaultContent.about, ...data.about },
          products: { ...defaultContent.products, ...data.products },
          gallery: { ...defaultContent.gallery, ...data.gallery },
          certifications: { ...defaultContent.certifications, ...data.certifications }
        };
        setContent(merged);
        setLoading(false);
      })
      .catch(err => {
        console.warn('R2 content fetch failed. Falling back to local server API:', err);

        // Fallback to local server API
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        fetch(`${API_URL}/api/content`)
          .then(res => {
            if (!res.ok) throw new Error('Server API fetch failed');
            return res.json();
          })
          .then(data => {
            const merged = {
              home: { ...defaultContent.home, ...data.home },
              about: { ...defaultContent.about, ...data.about },
              products: { ...defaultContent.products, ...data.products },
              gallery: { ...defaultContent.gallery, ...data.gallery },
              certifications: { ...defaultContent.certifications, ...data.certifications }
            };
            setContent(merged);
            setLoading(false);
          })
          .catch(serverErr => {
            console.error('All content fetch attempts failed. Staying on builtin default data.', serverErr);
            setLoading(false);
          });
      });
  }, []);

  return (
    <CMSContext.Provider value={{ content, loading, R2_PUBLIC_URL }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  return useContext(CMSContext);
}
