import React, { createContext, useContext, useEffect, useState } from 'react';
import productsData from '../data/products.json';
import { blogs as initialBlogs } from '../data/blogs';

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
      { title: 'Comprehensive Regulatory Support', desc: 'Dedicated Regulatory Affairs team supporting dossiers, registrations, and global market entry.' },
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
    productsData: productsData,
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
      { title: 'Spectrometric Validation Lab', category: 'qc', description: 'Advanced spectrometry clean rooms.', image: 'spectrometric_lab.png', tag: 'QUALITY CONTROL', specs: ['ICP-MS Spectrometer', 'LAL Endotoxin Audits', 'ISO Class 5 Cleanhoods'], size: 'vertical' },
      { title: 'Auto-Capping Matrix v4', category: 'machinery', description: 'Robotic head welding filling machines.', image: 'auto_capping.png', tag: 'MACHINES', specs: ['BFS Technology', 'Robotic Head Welding', 'Grade A Aseptic Zone'], size: 'square' },
      { title: 'HEPA-Integrated Clean Hub', category: 'cleanrooms', description: 'Modular HEPA filtration layouts.', image: 'clean_hub.png', tag: 'FACILITIES', specs: ['HEPA H14 Airflow', 'Positive Pressure', 'Aseptic Gowning Hub'], size: 'horizontal' }
    ],
    caseStudies: [
      { title: 'BioSync Integrated Pipeline', desc: 'A full-stack automation project for a major biotech partner, integrating 12 robotic units with real-time AI quality checking.', tag: 'AUTOMATION', year: '2026', projCode: 'PROC-BFS-01', reduction: 'Reduced cycle time by 40%', sensors: 'Increased sterilization accuracy', thumbnail: 'biosync_video.png', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'Cold-Chain Distribution Hub', desc: 'Design and implementation of a temperature-controlled logistics center. Featuring autonomous ground vehicles and continuous atmospheric monitoring sensors.', tag: 'LOGISTICS', year: '2025', projCode: 'PROC-DIST-03', reduction: '50,000 sq ft logistics', sensors: 'Continuous atmospheric sensors', thumbnail: 'cold_chain_video.png', videoUrl: 'https://www.w3schools.com/html/movie.mp4' }
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
      {
        id: 1,
        title: 'WHO-GMP Certificate',
        certNo: 'GMP/IN/2024/0847',
        issuedBy: 'World Health Organization',
        issuedTo: 'Realcade Lifescience Pvt. Ltd.',
        scope: 'Sterile Parenteral IV Fluids',
        validFrom: '01 Jan 2024',
        validTo: '31 Dec 2026',
        tag: 'WHO-GMP',
        tagColor: '#034e1c',
        status: 'Active',
        image: 'cert_who_gmp.png',
        description: 'International WHO Good Manufacturing Practice certification for sterile parenteral manufacturing.',
      },
      {
        id: 2,
        title: 'ISO 9001:2015 Certificate',
        certNo: 'ICB/ISO/9001/IN/2023/4421',
        issuedBy: 'ICB Global Certification',
        issuedTo: 'Realcade Lifescience Pvt. Ltd.',
        scope: 'Manufacture & Export of Sterile Pharmaceuticals',
        validFrom: '15 Mar 2023',
        validTo: '14 Mar 2026',
        tag: 'ISO 9001',
        tagColor: '#1f3d5a',
        status: 'Active',
        image: 'cert_iso_9001.png',
        description: 'Quality Management System certification confirming consistent product quality and continual improvement.',
      },
      {
        id: 3,
        title: 'Manufacturing Licence — Schedule M',
        certNo: 'MFG/GJ/2022/STERILE/1047',
        issuedBy: 'CDSCO — Govt. of India',
        issuedTo: 'Realcade Lifescience Pvt. Ltd., Unit 1',
        scope: 'Sterile Large Volume Parenterals',
        validFrom: '22 Apr 2022',
        validTo: 'Permanent (subject to renewal)',
        tag: 'CDSCO',
        tagColor: '#5a3d1f',
        status: 'Active',
        image: 'cert_schedule_m.png',
        description: 'Central Drugs Standard Control Organisation manufacturing licence under the revised Schedule M.',
      },
      {
        id: 4,
        title: 'Export Licence — DGFT',
        certNo: 'DGFT/EXP/PH/2023/GJ/0392',
        issuedBy: 'DGFT — Ministry of Commerce, India',
        issuedTo: 'Alfacure Lifescience Pvt. Ltd.',
        scope: 'Sterile Parenteral Formulations — All Countries',
        validFrom: '01 Jul 2023',
        validTo: '30 Jun 2026',
        tag: 'Export',
        tagColor: '#3d1f5a',
        status: 'Active',
        image: 'cert_export_licence.png',
        description: 'DGFT export licence authorising Alfacure to export sterile pharmaceutical products globally.',
      },
      {
        id: 5,
        title: 'Process Validation — Aseptic FFS',
        certNo: 'PV/FFS/2024/RL/003',
        issuedBy: 'QA Department — Realcade Lifescience',
        issuedTo: 'Realcade Lifescience Pvt. Ltd.',
        scope: 'Aseptic BFS Fill-Finish Lines — SAL 10⁻⁶',
        validFrom: '08 Feb 2024',
        validTo: '07 Feb 2027',
        tag: 'Validation',
        tagColor: '#1a5a4a',
        status: 'Active',
        image: 'cert_ffs_validation.png',
        description: 'Internal process validation certificate for Aseptic Form-Fill-Seal manufacturing lines achieving SAL 10⁻⁶.',
      },
      {
        id: 6,
        title: 'Drug Manufacturing Licence — Unit 2',
        certNo: 'MFG/GJ/TAPI/2023/0218',
        issuedBy: 'Gujarat State Licensing Authority — FDCA',
        issuedTo: 'Realcade Lifescience Pvt. Ltd., Unit 2',
        scope: 'Antibiotic Injectables & Antifungal Infusions',
        validFrom: '10 Jan 2023',
        validTo: '09 Jan 2027',
        tag: 'State Licence',
        tagColor: '#1f3a5a',
        status: 'Active',
        image: 'cert_drug_licence_unit2.png',
        description: 'Gujarat FDCA drug manufacturing licence for Unit 2 covering antibiotic and antifungal injectable formulations.',
      }
    ],
    regulatoryApprovals: [
      { region: 'India', body: 'CDSCO', status: 'Active', note: 'Manufacturing Licence' },
      { region: 'West Africa', body: 'NAFDAC / FDFA', status: 'Active', note: 'Product Registration' },
      { region: 'East Africa', body: 'KEBS / TMDA', status: 'Active', note: 'Product Registration' },
      { region: 'Southeast Asia', body: 'FDA (PH) / HSA', status: 'Active', note: 'Dossier Submitted' },
      { region: 'Middle East', body: 'MOH Gulf States', status: 'Active', note: 'Product Registration' },
      { region: 'CIS / Central Asia', body: 'Various NRAs', status: 'Active', note: 'CTD Dossier Ready' }
    ]
  },
  contact: {
    phoneDomestic: '+91 79 4005 1047',
    phoneExport: '+91 99099 26115',
    emailGeneral: 'info@alfacure.com',
    emailExport: 'export@alfacure.com',
    headOffice: 'Office 1122, Satyamev Shivalik, Bopal Ambili Junction, SP Ring Road, Ahmedabad – 380058, Gujarat, India',
    plantAddress: 'Realcade Lifescience Pvt. Ltd., Survey No. 248, Opp. GIDC, Kalol-Mehsana Highway, Chhatral, Gandhinagar - 382729, Gujarat, India',
    mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.976077531766!2d72.44524451496738!3d23.02467368495204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84af593f4fff%3A0xe54e3d368e7ec8d2!2sSatyamev%20Shivalik!5e0!3m2!1sen!2sin!4v1679901243102!5m2!1sen!2sin',
    contactHubs: [
      {
        name: 'Dhruvi Chavda',
        role: 'Managing Director',
        location: 'Ahmedabad, India',
        phone: '+91 76219 30091',
        email: 'info@alfacure.com',
      },
      {
        name: 'Rahul Joshi',
        role: 'Managing Director',
        location: 'Ahmedabad, India',
        phone: '+91 98795 00383',
        email: 'export@alfacure.com',
      },
      {
        name: 'Dhara Panchal',
        role: 'Executive Manager',
        location: 'United Arab Emirates',
        phone: '+971 55 601 2891',
        email: 'export@alfacure.com',
      }
    ]
  },
  blogs: initialBlogs
};

const sanitizeFetchedContent = (data) => {
  if (!data) return defaultContent;
  
  const clean = {
    home: { ...defaultContent.home, ...data.home },
    about: { ...defaultContent.about, ...data.about },
    products: { ...defaultContent.products, ...data.products },
    gallery: { ...defaultContent.gallery, ...data.gallery },
    certifications: { ...defaultContent.certifications, ...data.certifications },
    contact: { ...defaultContent.contact, ...data.contact },
    blogs: data.blogs || defaultContent.blogs,
    uploadedImages: { ...data.uploadedImages }
  };

  // Migrate strengths to ensure the 4th item title is updated and we have valid properties
  if (data.about?.whyAlfacure) {
    clean.about.whyAlfacure = defaultContent.about.whyAlfacure.map((defItem, idx) => {
      const dbItem = data.about?.whyAlfacure?.[idx];
      return {
        title: dbItem?.title || defItem.title,
        desc: dbItem?.desc || defItem.desc
      };
    });
    if (clean.about.whyAlfacure[3] && (clean.about.whyAlfacure[3].title === 'Regulatory Desk' || clean.about.whyAlfacure[3].title === 'Regulatory Affairs')) {
      clean.about.whyAlfacure[3].title = 'Comprehensive Regulatory Support';
    }
  }

  // Migrate certificates to verify all items are present
  if (!data.certifications?.certificates || data.certifications.certificates.length === 0) {
    clean.certifications.certificates = defaultContent.certifications.certificates;
  }

  // Migrate contact hubs to verify we have cards
  if (!data.contact?.contactHubs || data.contact.contactHubs.length < 3) {
    clean.contact.contactHubs = defaultContent.contact.contactHubs;
  }

  return clean;
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
        setContent(sanitizeFetchedContent(data));
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
            setContent(sanitizeFetchedContent(data));
            setLoading(false);
          })
          .catch(serverErr => {
            console.error('All content fetch attempts failed. Staying on builtin default data.', serverErr);
            setLoading(false);
          });
      });
  }, []);

  const getAssetUrl = (fileName, defaultPath) => {
    if (content && content.uploadedImages && content.uploadedImages[fileName]) {
      return `${R2_PUBLIC_URL}/${fileName}`;
    }
    return defaultPath;
  };

  const resolveImage = (img) => {
    if (!img) return '';
    if (img.startsWith('http') || img.startsWith('/')) return img;
    if (content && content.uploadedImages && content.uploadedImages[img]) {
      return `${R2_PUBLIC_URL}/${img}`;
    }
    // Safe local asset path fallback
    const cleanImgName = img.replace('/assets/', '');
    return `/assets/${cleanImgName}`;
  };

  return (
    <CMSContext.Provider value={{ content, loading, R2_PUBLIC_URL, getAssetUrl, resolveImage }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  return useContext(CMSContext);
}
