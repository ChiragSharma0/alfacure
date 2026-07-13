import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Home as HomeIcon,
  Info,
  Package,
  Award,
  Image as ImageIcon,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Lock,
  Mail,
  CheckCircle,
  BookOpen
} from 'lucide-react';
import productsData from '../../client/src/data/products.json';
import { blogs as initialBlogs } from '../../client/src/data/blogs.js';
import './App.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [view, setView] = useState('dashboard');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [r2PublicUrl, setR2PublicUrl] = useState('');

  // Auto-hide alerts
  useEffect(() => {
    if (alertMsg) {
      const timer = setTimeout(() => setAlertMsg(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMsg]);

  // Load content and config when logged in
  useEffect(() => {
    if (token) {
      fetchContent();
      fetchConfig();
    }
  }, [token]);

  const fetchConfig = async () => {
    try {
      const res = await fetch(`${API_BASE}/config`);
      if (res.ok) {
        const data = await res.json();
        if (data.r2PublicUrl) {
          setR2PublicUrl(data.r2PublicUrl);
        }
      }
    } catch (e) {
      console.error('Error fetching config:', e);
    }
  };

  const sanitizeFetchedContent = (data) => {
    const defaultContent = {
      home: {
        heroTitle1: 'Premium Large Volume',
        heroTitle2: 'Parenteral Solutions',
        heroDesc: 'Alfacure Lifescience Pvt. Ltd. is an Ahmedabad-based pharmaceutical export company specializing in the commercialization and global distribution of life-saving Large Volume Parenteral (LVP) formulations...',
        stats: [
          { value: '6', label: 'Pack Sizes', desc: '100 mL to 1000 mL' },
          { value: 'Global', label: 'Export Markets', desc: 'India, UAE, Asia & Africa' },
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
        heroDesc: 'Alfacure Lifescience Pvt. Ltd. is a premier Ahmedabad-based pharmaceutical company specializing in the export commercialization, and global distribution of life-saving therapeutics. With a strong focus on quality, sterility, and regulatory compliance, we deliver high-quality Large Volume Parenteral (LVP) solutions to healthcare institutions, distributors, and international partners across the world.',
        whatWeDo: [
          { title: 'Global Distribution', desc: 'Supplying Large Volume Parenterals (LVP), IV fluids, anti-infectives, and critical care formulations to healthcare institutions and distribution partners across domestic and international markets.' },
          { title: 'Regulatory & Documentation Support', desc: 'Providing end-to-end regulatory assistance including CTD, eCTD, and ACTD dossiers, product registrations, and country-specific compliance documentation.' },
          { title: 'Global Pharmaceutical Export', desc: 'Exporting and supplying premium sterile Large Volume Parenteral products under stringent quality control standards and advanced pharmaceutical protocols through our manufacturing partners.' },
          { title: 'Strategic Partnerships', desc: 'Building long-term relationships with importers, distributors, hospitals, and healthcare organizations worldwide.' }
        ],
        whyAlfacure: [
          { title: 'Premium LVP Focus', desc: 'Premium Large Volume Parenteral (LVP) exporter established in Ahmedabad, Gujarat.' },
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
          { title: 'Contract Export', desc: 'Flexible third-party export services with modular packaging sizes and customizable active concentration levels.', bullets: ['Custom formulation sourcing', 'Licensed export agreements', 'Scalable supply batches'] }
        ]
      },
      gallery: {
        heroBadge: 'FACILITY GALLERY',
        heroTitle: 'Inside Our Export & Quality Facilities',
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
            scope: 'Export of Sterile Pharmaceuticals',
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
          },
          {
            name: 'Priyam Joshi',
            role: 'Export Representative',
            location: 'Germany / Europe',
            phone: '+49 1525 9109949',
            email: 'export@alfacure.com',
          }
        ]
      },
      blogs: initialBlogs
    };

    const clean = {
      home: { ...defaultContent.home, ...data.home },
      about: { ...defaultContent.about, ...data.about },
      products: { ...defaultContent.products, ...data.products },
      gallery: { ...defaultContent.gallery, ...data.gallery },
      certifications: { ...defaultContent.certifications, ...data.certifications },
      contact: { ...defaultContent.contact, ...data.contact },
      blogs: data.blogs || defaultContent.blogs
    };

    // Migrate strengths
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

    // Verify certificates
    if (!data.certifications?.certificates || data.certifications.certificates.length === 0) {
      clean.certifications.certificates = defaultContent.certifications.certificates;
    }

    // Verify contact cards count
    if (!data.contact?.contactHubs || data.contact.contactHubs.length < 4) {
      clean.contact.contactHubs = defaultContent.contact.contactHubs;
    }

    return clean;
  };

  const fetchContent = async () => {
    setLoading(true);
    let data = {};
    try {
      const res = await fetch(`${API_BASE}/content`);
      if (res.ok) {
        data = await res.json();
      } else {
        console.warn('Backend failed to load content.json, falling back to local defaults');
        setAlertMsg({ type: 'warning', text: 'Storage offline. Using local template.' });
      }
    } catch (e) {
      console.error('Failed to contact backend:', e);
      setAlertMsg({ type: 'warning', text: 'Backend offline. Using local template.' });
    }

    const sanitized = sanitizeFetchedContent(data);
    setContent(sanitized);
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      setLoginError('Could not connect to authentication server');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setContent(null);
  };

  const handleSaveAll = async (updatedContent = content) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedContent)
      });
      if (res.status === 401) {
        handleLogout();
        setAlertMsg({ type: 'danger', text: 'Session expired. Please log in again.' });
        return;
      }
      if (res.ok) {
        setAlertMsg({ type: 'success', text: 'Changes saved successfully to R2!' });
        setContent(updatedContent);
      } else {
        setAlertMsg({ type: 'danger', text: 'Failed to save changes.' });
      }
    } catch (e) {
      setAlertMsg({ type: 'danger', text: 'Error saving content to the backend.' });
    }
    setLoading(false);
  };

  if (!token) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-header">
            <h2>Alfacure Admin CMS</h2>
            <p>Enter your administrator credentials</p>
          </div>
          {loginError && <div className="login-error">{loginError}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label"><Mail size={12} style={{ marginRight: '4px' }} /> Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="admin@alfacure.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label"><Lock size={12} style={{ marginRight: '4px' }} /> Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h2>Alfacure CMS</h2>
          <span>Site Administrator</span>
        </div>
        <nav className="sidebar-nav">
          <button className={`sidebar-btn ${view === 'dashboard' ? 'active' : ''}`} onClick={() => setView('dashboard')}>
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button className={`sidebar-btn ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>
            <HomeIcon size={18} /> Home Page
          </button>
          <button className={`sidebar-btn ${view === 'about' ? 'active' : ''}`} onClick={() => setView('about')}>
            <Info size={18} /> About Page
          </button>
          <button className={`sidebar-btn ${view === 'products' ? 'active' : ''}`} onClick={() => setView('products')}>
            <Package size={18} /> Products Page
          </button>
          <button className={`sidebar-btn ${view === 'certifications' ? 'active' : ''}`} onClick={() => setView('certifications')}>
            <Award size={18} /> Certifications
          </button>
          <button className={`sidebar-btn ${view === 'gallery' ? 'active' : ''}`} onClick={() => setView('gallery')}>
            <ImageIcon size={18} /> Facility Gallery
          </button>
          <button className={`sidebar-btn ${view === 'contact' ? 'active' : ''}`} onClick={() => setView('contact')}>
            <Mail size={18} /> Contact Page
          </button>
          <button className={`sidebar-btn ${view === 'blogs' ? 'active' : ''}`} onClick={() => setView('blogs')}>
            <BookOpen size={18} /> Blog Articles
          </button>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-btn" style={{ color: '#f87171' }}>
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <main className="main-content">
        <header className="top-bar">
          <div className="top-bar-title">
            <h1>{view.charAt(0).toUpperCase() + view.slice(1)} Section</h1>
          </div>
          <div className="top-bar-actions">
            <button onClick={() => fetchContent()} className="btn btn-secondary" disabled={loading}>
              Reload
            </button>
            <button onClick={() => handleSaveAll()} className="btn btn-success" disabled={loading}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </header>

        <div className="content-pane animate-fade-in">
          {alertMsg && (
            <div className={`cms-alert cms-alert-${alertMsg.type}`}>
              <CheckCircle size={18} />
              <span>{alertMsg.text}</span>
            </div>
          )}

          {loading && <div style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Syncing data...</div>}

          {content ? (
            <>
              {view === 'dashboard' && <DashboardView content={content} setView={setView} />}
              {view === 'home' && <HomeSectionEditor content={content} setContent={setContent} token={token} r2PublicUrl={r2PublicUrl} />}
              {view === 'about' && <AboutSectionEditor content={content} setContent={setContent} token={token} r2PublicUrl={r2PublicUrl} />}
              {view === 'products' && <ProductsSectionEditor content={content} setContent={setContent} token={token} r2PublicUrl={r2PublicUrl} />}
              {view === 'certifications' && <CertificationsSectionEditor content={content} setContent={setContent} token={token} r2PublicUrl={r2PublicUrl} />}
              {view === 'gallery' && <GallerySectionEditor content={content} setContent={setContent} token={token} r2PublicUrl={r2PublicUrl} />}
              {view === 'contact' && <ContactSectionEditor content={content} setContent={setContent} token={token} r2PublicUrl={r2PublicUrl} />}
              {view === 'blogs' && <BlogsSectionEditor content={content} setContent={setContent} token={token} r2PublicUrl={r2PublicUrl} />}
            </>
          ) : (
            <div style={{ color: 'var(--text-muted)' }}>Loading site data...</div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ==========================================================================
   Image Uploader Helper Component
   ========================================================================== */
function ImageUpload({ token, defaultKey, currentKey, onUploadSuccess, r2PublicUrl }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const [cacheBuster, setCacheBuster] = useState(Date.now());

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setMsg('');

    // Force rename the File object to defaultKey to overwrite cleanly and keep the same URL
    const renamedFile = new File([file], defaultKey, { type: file.type });

    const formData = new FormData();
    formData.append('image', renamedFile);
    formData.append('key', defaultKey);
    if (currentKey) {
      formData.append('oldKey', currentKey);
    }

    try {
      const res = await fetch(`${API_BASE}/images`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        setMsg('Uploaded successfully!');
        setFile(null);
        setCacheBuster(Date.now());
        if (onUploadSuccess) onUploadSuccess(data.key);
      } else {
        setMsg('Upload failed');
      }
    } catch (e) {
      setMsg('Upload error');
    }
    setUploading(false);
  };

  return (
    <div className="image-upload-widget">
      <div className="image-preview">
        {currentKey ? (
          <img
            src={`${r2PublicUrl}/${currentKey}?t=${cacheBuster}`}
            alt="Preview"
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentNode.innerHTML = 'Image File';
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
          />
        ) : (
          'No Image'
        )}
      </div>
      <div className="image-upload-controls">
        <div className="image-upload-meta">
          <strong>File Key:</strong> {defaultKey}
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
          />
          {file && (
            <button onClick={handleUpload} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} disabled={uploading}>
              <Upload size={12} /> Replace
            </button>
          )}
        </div>
        {msg && <span style={{ fontSize: '0.75rem', color: msg.includes('success') ? 'var(--success)' : 'var(--danger)' }}>{msg}</span>}
      </div>
    </div>
  );
}

/* ==========================================================================
   Dashboard View
   ========================================================================== */
function DashboardView({ content, setView }) {
  const getProductCount = () => {
    return content.products?.productsData?.length || 0;
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px' }}>Welcome to Alfacure CMS</h2>
        <p style={{ color: 'var(--text-muted)' }}>Manage your site formulations, BFS machinery details, certifications, and hero texts visually.</p>
      </div>

      <div className="dashboard-grid">
        <div className="dash-card" style={{ cursor: 'pointer' }} onClick={() => setView('products')}>
          <div className="dash-card-icon"><Package size={24} /></div>
          <div className="dash-card-info">
            <h3>Products & Formulations</h3>
            <p>{getProductCount()} Active items</p>
          </div>
        </div>
        <div className="dash-card" style={{ cursor: 'pointer' }} onClick={() => setView('certifications')}>
          <div className="dash-card-icon"><Award size={24} /></div>
          <div className="dash-card-info">
            <h3>Certificates & Approvals</h3>
            <p>{(content.certifications?.certificates || []).length} Registered</p>
          </div>
        </div>
        <div className="dash-card" style={{ cursor: 'pointer' }} onClick={() => setView('gallery')}>
          <div className="dash-card-icon"><ImageIcon size={24} /></div>
          <div className="dash-card-info">
            <h3>Facility Gallery</h3>
            <p>{(content.gallery?.galleryItems || []).length} Photos</p>
          </div>
        </div>
      </div>

      <div className="section-panel">
        <div className="panel-header">
          <h2>Cloud Integration Status</h2>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
          <div>
            <strong>Cloudflare R2 Bucket Connected</strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>All content edits compile directly to content.json inside the R2 static cloud environment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Home Section Editor
   ========================================================================== */
function HomeSectionEditor({ content, setContent, token, r2PublicUrl }) {
  const updateField = (field, val) => {
    setContent({
      ...content,
      home: {
        ...content.home,
        [field]: val
      }
    });
  };

  const updateStat = (index, field, val) => {
    const list = [...content.home.stats];
    list[index][field] = val;
    setContent({
      ...content,
      home: { ...content.home, stats: list }
    });
  };

  const updateCapability = (index, field, val) => {
    const list = [...content.home.capabilities];
    list[index][field] = val;
    setContent({
      ...content,
      home: { ...content.home, capabilities: list }
    });
  };

  const updateTrustPoint = (index, val) => {
    const list = [...content.home.trustPoints];
    list[index] = val;
    setContent({
      ...content,
      home: { ...content.home, trustPoints: list }
    });
  };

  const statLabels = [
    'Pack Sizes Counter',
    'Export Markets Counter',
    'Established Year Counter',
    'Certification Status Counter'
  ];

  const capabilityLabels = [
    'Fluid & Electrolyte Solutions Card',
    'Anti-Infective Infusions Card',
    'Critical Care Products Card'
  ];

  return (
    <div>
      <div className="section-panel">
        <div className="panel-header">
          <h2>Hero Banner Section</h2>
        </div>
        <div className="form-group">
          <label className="form-label">Hero Title Line 1</label>
          <input
            type="text"
            className="form-control"
            value={content.home.heroTitle1}
            onChange={e => updateField('heroTitle1', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Hero Title Line 2 (Highlighted Green)</label>
          <input
            type="text"
            className="form-control"
            value={content.home.heroTitle2}
            onChange={e => updateField('heroTitle2', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Hero Description</label>
          <textarea
            rows={4}
            className="form-control"
            value={content.home.heroDesc}
            onChange={e => updateField('heroDesc', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Background Video Poster Image</label>
          <ImageUpload
            token={token}
            defaultKey="production_floor.png"
            currentKey="production_floor.png"
            r2PublicUrl={r2PublicUrl}
          />
        </div>
      </div>

      <div className="section-panel">
        <div className="panel-header">
          <h2>Home Statistics counters</h2>
        </div>
        <div className="repeater-list">
          {content.home.stats.map((stat, idx) => (
            <div key={idx} className="repeater-item" style={{ borderLeft: '3px solid var(--primary)' }}>
              <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '12px' }}>
                {statLabels[idx] || `Stat Counter ${idx + 1}`}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Metric Value</label>
                  <input
                    type="text"
                    className="form-control"
                    value={stat.value}
                    onChange={e => updateStat(idx, 'value', e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Metric Label</label>
                  <input
                    type="text"
                    className="form-control"
                    value={stat.label}
                    onChange={e => updateStat(idx, 'label', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}>
                <label className="form-label">Counter Sub-Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={stat.desc}
                  onChange={e => updateStat(idx, 'desc', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-panel">
        <div className="panel-header">
          <h2>LVP Capabilities Cards</h2>
        </div>
        <div className="repeater-list">
          {content.home.capabilities.map((cap, idx) => (
            <div key={idx} className="repeater-item" style={{ borderLeft: '3px solid var(--success)' }}>
              <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '12px' }}>
                {capabilityLabels[idx] || `Capability Block ${idx + 1}`}
              </div>
              <div className="form-group">
                <label className="form-label">Card Header Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={cap.title}
                  onChange={e => updateCapability(idx, 'title', e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Card Description Block</label>
                <textarea
                  rows={3}
                  className="form-control"
                  value={cap.desc}
                  onChange={e => updateCapability(idx, 'desc', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-panel">
        <div className="panel-header">
          <h2>Why Alfacure - Quality Trust Points</h2>
        </div>
        <div className="tag-list-editor">
          {content.home.trustPoints.map((point, idx) => (
            <div key={idx} className="tag-item">
              <span className="form-label" style={{ width: '120px', flexShrink: 0, marginBottom: 0 }}>Point {idx + 1} Label</span>
              <input
                type="text"
                className="form-control"
                value={point}
                onChange={e => updateTrustPoint(idx, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="form-group" style={{ marginTop: '20px' }}>
          <label className="form-label">Why Alfacure Section Sidebar Image</label>
          <ImageUpload
            token={token}
            defaultKey="why_alfacure.png"
            currentKey="why_alfacure.png"
            r2PublicUrl={r2PublicUrl}
          />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   About Section Editor
   ========================================================================== */
function AboutSectionEditor({ content, setContent, token, r2PublicUrl }) {
  const updateField = (field, val) => {
    setContent({
      ...content,
      about: { ...content.about, [field]: val }
    });
  };

  const updateListField = (key, idx, field, val) => {
    const list = [...content.about[key]];
    list[idx][field] = val;
    setContent({
      ...content,
      about: { ...content.about, [key]: list }
    });
  };

  const whatWeDoLabels = [
    'Global Distribution Expertise',
    'Regulatory & Dossier Support Desk',
    'Pharmaceutical BFS Export',
    'Strategic Partner Relations'
  ];

  const whyAlfacureLabels = [
    'Strength 1: Corporate Foundation',
    'Strength 2: Quality Certifications',
    'Strength 3: Diverse LVP Portfolio',
    'Strength 4: Regulatory Desk Expertise',
    'Strength 5: Logistics & Supply Network',
    'Strength 6: Global Mission Statement'
  ];

  const specLabels = [
    'Established Year Standard',
    'Accreditation Standards',
    'Head Office Headquarters Location',
    'BFS Core Specialization Area',
    'Parenteral Bottle Volume Configurations',
    'Total Clinical Formulations Portfolio Summary'
  ];

  return (
    <div>
      <div className="section-panel">
        <div className="panel-header">
          <h2>About Intro Copy</h2>
        </div>
        <div className="form-group">
          <label className="form-label">Core Intro Block</label>
          <textarea
            rows={5}
            className="form-control"
            value={content.about.heroDesc}
            onChange={e => updateField('heroDesc', e.target.value)}
          />
        </div>
        <div className="form-group" style={{ marginTop: '16px' }}>
          <label className="form-label">About Us Hero Banner Image</label>
          <ImageUpload
            token={token}
            defaultKey="about_hero.png"
            currentKey="about_hero.png"
            r2PublicUrl={r2PublicUrl}
          />
        </div>
      </div>

      <div className="section-panel">
        <div className="panel-header">
          <h2>"What We Do" Cards</h2>
        </div>
        <div className="repeater-list">
          {content.about.whatWeDo.map((item, idx) => (
            <div key={idx} className="repeater-item" style={{ borderLeft: '3px solid var(--primary)' }}>
              <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '12px' }}>
                {whatWeDoLabels[idx] || `Expertise Card ${idx + 1}`}
              </div>
              <div className="form-group">
                <label className="form-label">Card Header Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.title}
                  onChange={e => updateListField('whatWeDo', idx, 'title', e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Detailed Paragraph Description</label>
                <textarea
                  rows={3}
                  className="form-control"
                  value={item.desc}
                  onChange={e => updateListField('whatWeDo', idx, 'desc', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-panel">
        <div className="panel-header">
          <h2>Why Partner with Alfacure</h2>
        </div>
        <div className="repeater-list">
          {content.about.whyAlfacure.map((item, idx) => (
            <div key={idx} className="repeater-item" style={{ borderLeft: '3px solid var(--success)' }}>
              <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '12px' }}>
                {whyAlfacureLabels[idx] || `Strength Highlight ${idx + 1}`}
              </div>
              <div className="form-group">
                <label className="form-label">Strength Header title</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.title}
                  onChange={e => updateListField('whyAlfacure', idx, 'title', e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Strength Description copy</label>
                <textarea
                  rows={2}
                  className="form-control"
                  value={item.desc}
                  onChange={e => updateListField('whyAlfacure', idx, 'desc', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-panel">
        <div className="panel-header">
          <h2>Company Technical Specs Table</h2>
        </div>
        <div className="repeater-list">
          {content.about.manufacturingSpecs.map((item, idx) => (
            <div key={idx} className="repeater-item">
              <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '12px' }}>
                {specLabels[idx] || `Specs Row ${idx + 1}`}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Specs Header Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.label}
                    onChange={e => updateListField('manufacturingSpecs', idx, 'label', e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Technical Standard Value Details</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.desc}
                    onChange={e => updateListField('manufacturingSpecs', idx, 'desc', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-panel">
        <div className="panel-header">
          <h2>Facility Strengths Section Images</h2>
        </div>
        <div className="form-group">
          <label className="form-label">Strength Image 1 (Clean Hub / Sterile Operations)</label>
          <ImageUpload
            token={token}
            defaultKey="clean_hub.png"
            currentKey="clean_hub.png"
            r2PublicUrl={r2PublicUrl}
          />
        </div>
        <div className="form-group" style={{ marginTop: '16px' }}>
          <label className="form-label">Strength Image 2 (Auto Capping / BFS Process)</label>
          <ImageUpload
            token={token}
            defaultKey="auto_capping.png"
            currentKey="auto_capping.png"
            r2PublicUrl={r2PublicUrl}
          />
        </div>
        <div className="form-group" style={{ marginTop: '16px' }}>
          <label className="form-label">Strength Image 3 (Spectrometric Lab / Quality Assurance)</label>
          <ImageUpload
            token={token}
            defaultKey="spectrometric_lab.png"
            currentKey="spectrometric_lab.png"
            r2PublicUrl={r2PublicUrl}
          />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Products Section Editor
   ========================================================================== */
function ProductsSectionEditor({ content, setContent, token, r2PublicUrl }) {
  const [activeTab, setActiveTab] = useState('info'); 
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalTab, setModalTab] = useState('core');

  const updateHeader = (field, val) => {
    setContent({
      ...content,
      products: { ...content.products, [field]: val }
    });
  };

  const saveProduct = (e) => {
    e.preventDefault();
    const list = [...(content.products.productsData || [])];
    if (editingProduct.isNew) {
      const newProd = { ...editingProduct, id: Date.now() };
      delete newProd.isNew;
      list.push(newProd);
    } else {
      const idx = list.findIndex(p => p.id === editingProduct.id);
      if (idx !== -1) {
        list[idx] = editingProduct;
      }
    }
    setContent({
      ...content,
      products: { ...content.products, productsData: list }
    });
    setEditingProduct(null);
  };

  const removeProduct = (id) => {
    if (window.confirm('Delete this formulation?')) {
      const list = (content.products.productsData || []).filter(p => p.id !== id);
      setContent({
        ...content,
        products: { ...content.products, productsData: list }
      });
    }
  };

  const openNewProductModal = () => {
    setEditingProduct({
      isNew: true,
      name: '',
      composition: '',
      category: 'infusions',
      packSizes: ['500 ml'],
      purpose: 'Export',
      composition_details: '',
      packaging: '',
      markets: '',
      active_ingredients: '',
      image: '',
      standards: [],
      advantages: [],
      workflow: [],
      faqs: [],
      factSheetPdf: '',
      ctdDossierPdf: '',
      quoteTitle: 'Request Technical Specs & Pricing',
      quoteDesc: 'Speak with a product relations manager to discuss custom volumes, lead times, and regulatory dossier options.',
      quoteBullets: ['Estimated Lead Time: 2-3 Weeks', 'WHO-GMP Dossier Support', '24/7 Supply Logistics']
    });
    setModalTab('overview');
  };

  const updateMachinery = (index, field, val) => {
    const list = [...content.products.machineryItems];
    list[index][field] = val;
    setContent({
      ...content,
      products: { ...content.products, machineryItems: list }
    });
  };

  const addMachineryItem = () => {
    const list = [...(content.products.machineryItems || []), {
      id: 'mach_' + Date.now(),
      name: 'New BFS Machinery System',
      capacity: '3000 units/hr',
      automation: 'Fully Automatic',
      isoClass: 'Class 5',
      image: '',
      status: 'Active'
    }];
    setContent({
      ...content,
      products: { ...content.products, machineryItems: list }
    });
  };

  const removeMachineryItem = (idx) => {
    if (window.confirm('Delete this machinery unit?')) {
      const list = content.products.machineryItems.filter((_, i) => i !== idx);
      setContent({
        ...content,
        products: { ...content.products, machineryItems: list }
      });
    }
  };

  const updateSolution = (index, field, val) => {
    const list = [...content.products.industrySolutions];
    list[index][field] = val;
    setContent({
      ...content,
      products: { ...content.products, industrySolutions: list }
    });
  };

  const updateSolutionBullet = (sIdx, bIdx, val) => {
    const list = [...content.products.industrySolutions];
    list[sIdx].bullets[bIdx] = val;
    setContent({
      ...content,
      products: { ...content.products, industrySolutions: list }
    });
  };

  const industrySolutionsLabels = [
    'Sector Category 1: Pharmaceutical Supply Chain',
    'Sector Category 2: ICU & Ward Direct Hospital Supply',
    'Sector Category 3: Contract Licensing Export'
  ];

  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '24px', gap: '10px' }}>
        <button className={`btn ${activeTab === 'info' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('info')}>Header Info</button>
        <button className={`btn ${activeTab === 'formulations' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('formulations')}>Parenteral Formulations</button>
        <button className={`btn ${activeTab === 'machinery' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('machinery')}>BFS Machinery Specs</button>
        <button className={`btn ${activeTab === 'solutions' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('solutions')}>Sector Solutions</button>
      </div>

      {activeTab === 'info' && (
        <div className="section-panel">
          <div className="panel-header">
            <h2>Products Section Headers</h2>
          </div>
          <div className="form-group">
            <label className="form-label">Hero Badge Tagline</label>
            <input type="text" className="form-control" value={content.products.heroTag} onChange={e => updateHeader('heroTag', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Hero Banner Title</label>
            <input type="text" className="form-control" value={content.products.heroTitle} onChange={e => updateHeader('heroTitle', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Hero Banner Description</label>
            <textarea rows={4} className="form-control" value={content.products.heroDesc} onChange={e => updateHeader('heroDesc', e.target.value)} />
          </div>

          <div className="form-group" style={{ marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
            <label className="form-label" style={{ fontWeight: 'bold' }}>Global Product Specification sheet (PDF)</label>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Upload a PDF that visitors can download by clicking "Download Specs".</p>
            <ImageUpload
              token={token}
              defaultKey="products_specs.pdf"
              currentKey="products_specs.pdf"
              onUploadSuccess={(key) => alert("Specification PDF uploaded successfully to CDN!")}
              r2PublicUrl={r2PublicUrl}
            />
          </div>
        </div>
      )}

      {activeTab === 'formulations' && (
        <div className="section-panel">
          <div className="panel-header">
            <h2>Parenteral Formulations Catalog</h2>
            <button className="btn btn-primary" onClick={openNewProductModal}><Plus size={16} /> Add Formulation</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '16px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <th style={{ padding: '12px' }}>Active Formulation Name</th>
                  <th style={{ padding: '12px' }}>Chemical Composition</th>
                  <th style={{ padding: '12px' }}>Category</th>
                  <th style={{ padding: '12px' }}>Pack Configurations</th>
                  <th style={{ padding: '12px' }}>Market Scope</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(content.products.productsData || []).map((prod) => (
                  <tr key={prod.id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{prod.name}</td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prod.composition}</td>
                    <td style={{ padding: '12px', textTransform: 'capitalize' }}>{prod.category || 'infusions'}</td>
                    <td style={{ padding: '12px' }}>{(prod.packSizes || []).join(', ')}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: prod.purpose === 'Export' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)', color: prod.purpose === 'Export' ? '#60a5fa' : '#34d399' }}>
                        {prod.purpose}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button className="btn btn-secondary btn-icon-only" onClick={() => { setEditingProduct(prod); setModalTab('overview'); }}><Edit2 size={12} /></button>
                        <button className="btn btn-danger btn-icon-only" onClick={() => removeProduct(prod.id)}><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'machinery' && (
        <div className="section-panel">
          <div className="panel-header">
            <h2>Blow-Fill-Seal (BFS) Machinery Systems</h2>
            <button className="btn btn-primary" onClick={addMachineryItem}><Plus size={16} /> Add Machine Unit</button>
          </div>
          <div className="repeater-list">
            {(content.products.machineryItems || []).map((mach, idx) => (
              <div key={mach.id || idx} className="repeater-item" style={{ borderLeft: '3px solid var(--primary)' }}>
                <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>BFS Machine Unit {idx + 1}</span>
                  <button className="btn btn-danger" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => removeMachineryItem(idx)}><Trash2 size={12} /> Remove</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Machine Model Name</label>
                    <input type="text" className="form-control" value={mach.name} onChange={e => updateMachinery(idx, 'name', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Flow Capacity (units/hr)</label>
                    <input type="text" className="form-control" value={mach.capacity} onChange={e => updateMachinery(idx, 'capacity', e.target.value)} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '12px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Automation Level</label>
                    <input type="text" className="form-control" value={mach.automation} onChange={e => updateMachinery(idx, 'automation', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Accuracy & ISO Class</label>
                    <input type="text" className="form-control" value={mach.isoClass} onChange={e => updateMachinery(idx, 'isoClass', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Technical Status</label>
                    <input type="text" className="form-control" value={mach.status} onChange={e => updateMachinery(idx, 'status', e.target.value)} />
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}>
                  <label className="form-label">Machine Photo Layout</label>
                  <ImageUpload
                    token={token}
                    defaultKey={`machinery_${mach.id || idx}.png`}
                    currentKey={mach.image}
                    onUploadSuccess={(key) => updateMachinery(idx, 'image', key)}
                    r2PublicUrl={r2PublicUrl}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'solutions' && (
        <div className="section-panel">
          <div className="panel-header">
            <h2>Industry Solutions Segment</h2>
          </div>
          <div className="repeater-list">
            {content.products.industrySolutions.map((sol, sIdx) => (
              <div key={sIdx} className="repeater-item" style={{ borderLeft: '3px solid var(--success)' }}>
                <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '12px' }}>
                  {industrySolutionsLabels[sIdx] || `Solutions Area ${sIdx + 1}`}
                </div>
                <div className="form-group">
                  <label className="form-label">Sector Name</label>
                  <input type="text" className="form-control" value={sol.title} onChange={e => updateSolution(sIdx, 'title', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Target Sector Description</label>
                  <textarea rows={3} className="form-control" value={sol.desc} onChange={e => updateSolution(sIdx, 'desc', e.target.value)} />
                </div>
                
                <div style={{ marginTop: '12px' }}>
                  <label className="form-label" style={{ marginBottom: '8px' }}>Bullet Highlights</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(sol.bullets || []).map((bullet, bIdx) => (
                      <div key={bIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span className="form-label" style={{ marginBottom: 0, width: '80px', flexShrink: 0 }}>Bullet {bIdx + 1}</span>
                        <input type="text" className="form-control" value={bullet} onChange={e => updateSolutionBullet(sIdx, bIdx, e.target.value)} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit formulation modal */}
      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '750px', width: '90%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '24px 32px 32px 32px' }}>
            <h3 style={{ margin: 0, paddingBottom: '12px' }}>{editingProduct.isNew ? 'New Formulation Spec' : 'Edit Formulation'}</h3>
            
            {/* Modal Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '16px', gap: '8px', overflowX: 'auto', paddingBottom: '8px', flexShrink: 0 }}>
              <button type="button" className={`btn ${modalTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setModalTab('overview')}>Overview</button>
              <button type="button" className={`btn ${modalTab === 'specs' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setModalTab('specs')}>Composition & Specs</button>
              <button type="button" className={`btn ${modalTab === 'advantages' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setModalTab('advantages')}>Core Advantages</button>
              <button type="button" className={`btn ${modalTab === 'workflow' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setModalTab('workflow')}>Process Workflow</button>
              <button type="button" className={`btn ${modalTab === 'documentation' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setModalTab('documentation')}>Documentation</button>
              <button type="button" className={`btn ${modalTab === 'faqs' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setModalTab('faqs')}>FAQs</button>
              <button type="button" className={`btn ${modalTab === 'quote' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setModalTab('quote')}>Request Quote</button>
            </div>

            <form onSubmit={saveProduct} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', margin: 0, gap: 0 }}>
              <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px', paddingBottom: '12px' }}>
              {modalTab === 'overview' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Formulation Name</label>
                      <input type="text" className="form-control" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Therapeutic Category</label>
                      <select className="form-control" value={editingProduct.category || 'infusions'} onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })} style={{ background: 'var(--bg-input)' }}>
                        <option value="infusions">Intravenous Infusions</option>
                        <option value="injections">Injectables</option>
                        <option value="electrolytes">Electrolytes & Fluid Replacers</option>
                        <option value="antimicrobials">Antimicrobials & Antibiotics</option>
                        <option value="other">Other Specialties</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Chemical Composition (Short Summary)</label>
                    <textarea rows={2} className="form-control" value={editingProduct.composition} onChange={e => setEditingProduct({ ...editingProduct, composition: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Market Scope (Export / Domestic)</label>
                    <select className="form-control" value={editingProduct.purpose} onChange={e => setEditingProduct({ ...editingProduct, purpose: e.target.value })} style={{ background: 'var(--bg-input)' }}>
                      <option value="Export">Export (BP/USP)</option>
                      <option value="Domestic">Domestic (IP)</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginTop: '12px' }}>
                    <label className="form-label">Product Image (Upload / Replace)</label>
                    {!editingProduct.isNew ? (
                      <ImageUpload
                        token={token}
                        defaultKey={`product_${editingProduct.id}.png`}
                        currentKey={editingProduct.image}
                        onUploadSuccess={(key) => setEditingProduct({ ...editingProduct, image: key })}
                        r2PublicUrl={r2PublicUrl}
                      />
                    ) : (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Save the formulation record first, then edit it to upload a custom image.</p>
                    )}
                  </div>
                </>
              )}

              {modalTab === 'specs' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Active Ingredients (comma separated)</label>
                      <input type="text" className="form-control" placeholder="e.g. Sodium Chloride, Water" value={editingProduct.active_ingredients || ''} onChange={e => setEditingProduct({ ...editingProduct, active_ingredients: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Primary Packaging</label>
                      <input type="text" className="form-control" placeholder="e.g. Sterile PE Bottle" value={editingProduct.packaging || ''} onChange={e => setEditingProduct({ ...editingProduct, packaging: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Export Markets</label>
                      <input type="text" className="form-control" placeholder="e.g. Germany, West Africa, ASEAN" value={editingProduct.markets || ''} onChange={e => setEditingProduct({ ...editingProduct, markets: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Pack Sizes (comma separated)</label>
                      <input type="text" className="form-control" value={(editingProduct.packSizes || []).join(', ')} onChange={e => setEditingProduct({ ...editingProduct, packSizes: e.target.value.split(',').map(s => s.trim()) })} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Detailed Composition (Detailed Breakdown)</label>
                    <input type="text" className="form-control" placeholder="e.g. Each 100ml contains: Sodium Chloride 0.9 gm" value={editingProduct.composition_details || ''} onChange={e => setEditingProduct({ ...editingProduct, composition_details: e.target.value })} />
                  </div>

                  <div style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label className="form-label" style={{ marginBottom: 0 }}>Accreditation Standards & Compliance</label>
                      <button type="button" className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', gap: '4px', alignItems: 'center' }} onClick={() => setEditingProduct({ ...editingProduct, standards: [...(editingProduct.standards || []), 'New Standard'] })}><Plus size={10} /> Add Standard</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {(editingProduct.standards || []).map((std, sIdx) => (
                        <div key={sIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <input type="text" className="form-control" value={std} onChange={e => {
                            const updated = [...editingProduct.standards];
                            updated[sIdx] = e.target.value;
                            setEditingProduct({ ...editingProduct, standards: updated });
                          }} />
                          <button type="button" className="btn btn-danger btn-icon-only" onClick={() => {
                            const updated = editingProduct.standards.filter((_, i) => i !== sIdx);
                            setEditingProduct({ ...editingProduct, standards: updated });
                          }}><Trash2 size={12} /></button>
                        </div>
                      ))}
                      {(editingProduct.standards || []).length === 0 && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No product-specific standards defined. Defaulting to global certifications list.</p>}
                    </div>
                  </div>
                </>
              )}

              {modalTab === 'advantages' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>Core Technical Advantages</label>
                    <button type="button" className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', gap: '4px', alignItems: 'center' }} onClick={() => setEditingProduct({ ...editingProduct, advantages: [...(editingProduct.advantages || []), { title: 'New Advantage Title', desc: 'Advantage Details' }] })}><Plus size={10} /> Add Advantage</button>
                  </div>
                  <div className="repeater-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(editingProduct.advantages || []).map((adv, aIdx) => (
                      <div key={aIdx} className="repeater-item" style={{ borderLeft: '3px solid var(--primary)', padding: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <strong>Advantage #{aIdx + 1}</strong>
                          <button type="button" className="btn btn-danger" style={{ padding: '2px 8px', fontSize: '0.7rem' }} onClick={() => {
                            const updated = editingProduct.advantages.filter((_, i) => i !== aIdx);
                            setEditingProduct({ ...editingProduct, advantages: updated });
                          }}>Remove</button>
                        </div>
                        <div className="form-group" style={{ marginBottom: '8px' }}>
                          <label className="form-label">Title / Caption</label>
                          <input type="text" className="form-control" value={adv.title || ''} onChange={e => {
                            const updated = [...editingProduct.advantages];
                            updated[aIdx] = { ...updated[aIdx], title: e.target.value };
                            setEditingProduct({ ...editingProduct, advantages: updated });
                          }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">Detail Description</label>
                          <textarea rows={2} className="form-control" value={adv.desc || ''} onChange={e => {
                            const updated = [...editingProduct.advantages];
                            updated[aIdx] = { ...updated[aIdx], desc: e.target.value };
                            setEditingProduct({ ...editingProduct, advantages: updated });
                          }} />
                        </div>
                      </div>
                    ))}
                    {(editingProduct.advantages || []).length === 0 && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No product-specific advantages defined. Defaulting to global benefits list.</p>}
                  </div>
                </div>
              )}

              {modalTab === 'workflow' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>Automated Production Workflow Stages</label>
                    <button type="button" className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', gap: '4px', alignItems: 'center' }} onClick={() => setEditingProduct({ ...editingProduct, workflow: [...(editingProduct.workflow || []), { step: 'Stage Title', desc: 'Stage Details' }] })}><Plus size={10} /> Add Stage</button>
                  </div>
                  <div className="repeater-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(editingProduct.workflow || []).map((wf, wIdx) => (
                      <div key={wIdx} className="repeater-item" style={{ borderLeft: '3px solid var(--success)', padding: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <strong>Workflow Stage #{wIdx + 1}</strong>
                          <button type="button" className="btn btn-danger" style={{ padding: '2px 8px', fontSize: '0.7rem' }} onClick={() => {
                            const updated = editingProduct.workflow.filter((_, i) => i !== wIdx);
                            setEditingProduct({ ...editingProduct, workflow: updated });
                          }}>Remove</button>
                        </div>
                        <div className="form-group" style={{ marginBottom: '8px' }}>
                          <label className="form-label">Stage Title / Label</label>
                          <input type="text" className="form-control" value={wf.step || ''} onChange={e => {
                            const updated = [...editingProduct.workflow];
                            updated[wIdx] = { ...updated[wIdx], step: e.target.value };
                            setEditingProduct({ ...editingProduct, workflow: updated });
                          }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">Stage Action Description</label>
                          <textarea rows={2} className="form-control" value={wf.desc || ''} onChange={e => {
                            const updated = [...editingProduct.workflow];
                            updated[wIdx] = { ...updated[wIdx], desc: e.target.value };
                            setEditingProduct({ ...editingProduct, workflow: updated });
                          }} />
                        </div>
                      </div>
                    ))}
                    {(editingProduct.workflow || []).length === 0 && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No product-specific workflow defined. Defaulting to global processing walkthrough.</p>}
                  </div>
                </div>
              )}

              {modalTab === 'documentation' && (
                <div>
                  <label className="form-label" style={{ marginBottom: '16px' }}>Technical Documentation & Fact Sheets</label>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Upload custom PDF specifications sheet and regulatory CTD dossier specifically for this formulation (Optional):</p>
                  
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label className="form-label">Formulation Fact Sheet PDF</label>
                    {!editingProduct.isNew ? (
                      <ImageUpload
                        token={token}
                        defaultKey={`factsheet_${editingProduct.id}.pdf`}
                        currentKey={editingProduct.factSheetPdf}
                        onUploadSuccess={(key) => setEditingProduct({ ...editingProduct, factSheetPdf: key })}
                        r2PublicUrl={r2PublicUrl}
                      />
                    ) : (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Save the formulation first to unlock custom PDF uploads.</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Regulatory CTD Dossier PDF</label>
                    {!editingProduct.isNew ? (
                      <ImageUpload
                        token={token}
                        defaultKey={`dossier_${editingProduct.id}.pdf`}
                        currentKey={editingProduct.ctdDossierPdf}
                        onUploadSuccess={(key) => setEditingProduct({ ...editingProduct, ctdDossierPdf: key })}
                        r2PublicUrl={r2PublicUrl}
                      />
                    ) : (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Save the formulation first to unlock custom PDF uploads.</p>
                    )}
                  </div>
                </div>
              )}

              {modalTab === 'faqs' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>Frequently Asked Questions (FAQs)</label>
                    <button type="button" className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', gap: '4px', alignItems: 'center' }} onClick={() => setEditingProduct({ ...editingProduct, faqs: [...(editingProduct.faqs || []), { q: 'Question?', a: 'Answer.' }] })}><Plus size={10} /> Add FAQ</button>
                  </div>
                  <div className="repeater-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(editingProduct.faqs || []).map((faq, fIdx) => (
                      <div key={fIdx} className="repeater-item" style={{ borderLeft: '3px solid var(--secondary)', padding: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <strong>FAQ #{fIdx + 1}</strong>
                          <button type="button" className="btn btn-danger" style={{ padding: '2px 8px', fontSize: '0.7rem' }} onClick={() => {
                            const updated = editingProduct.faqs.filter((_, i) => i !== fIdx);
                            setEditingProduct({ ...editingProduct, faqs: updated });
                          }}>Remove</button>
                        </div>
                        <div className="form-group" style={{ marginBottom: '8px' }}>
                          <label className="form-label">Question</label>
                          <input type="text" className="form-control" value={faq.q || ''} onChange={e => {
                            const updated = [...editingProduct.faqs];
                            updated[fIdx] = { ...updated[fIdx], q: e.target.value };
                            setEditingProduct({ ...editingProduct, faqs: updated });
                          }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">Answer Description</label>
                          <textarea rows={2} className="form-control" value={faq.a || ''} onChange={e => {
                            const updated = [...editingProduct.faqs];
                            updated[fIdx] = { ...updated[fIdx], a: e.target.value };
                            setEditingProduct({ ...editingProduct, faqs: updated });
                          }} />
                        </div>
                      </div>
                    ))}
                    {(editingProduct.faqs || []).length === 0 && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No product-specific FAQs defined. Defaulting to global list.</p>}
                  </div>
                </div>
              )}

              {modalTab === 'quote' && (
                <div>
                  <label className="form-label" style={{ marginBottom: '16px' }}>Request Quote Settings</label>
                  <div className="form-group">
                    <label className="form-label">Custom Tab Title</label>
                    <input type="text" className="form-control" placeholder="e.g. Request Technical Specs & Pricing" value={editingProduct.quoteTitle || ''} onChange={e => setEditingProduct({ ...editingProduct, quoteTitle: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Request Quote Description</label>
                    <textarea rows={3} className="form-control" placeholder="e.g. Speak with a product relations manager to discuss custom volumes..." value={editingProduct.quoteDesc || ''} onChange={e => setEditingProduct({ ...editingProduct, quoteDesc: e.target.value })} />
                  </div>
                  
                  <div style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label className="form-label" style={{ marginBottom: 0 }}>Technical Support Highlight Bullets</label>
                      <button type="button" className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', gap: '4px', alignItems: 'center' }} onClick={() => setEditingProduct({ ...editingProduct, quoteBullets: [...(editingProduct.quoteBullets || []), 'New Bullet Point'] })}><Plus size={10} /> Add Bullet</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {(editingProduct.quoteBullets || []).map((blt, bIdx) => (
                        <div key={bIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <input type="text" className="form-control" value={blt} onChange={e => {
                            const updated = [...editingProduct.quoteBullets];
                            updated[bIdx] = e.target.value;
                            setEditingProduct({ ...editingProduct, quoteBullets: updated });
                          }} />
                          <button type="button" className="btn btn-danger btn-icon-only" onClick={() => {
                            const updated = editingProduct.quoteBullets.filter((_, i) => i !== bIdx);
                            setEditingProduct({ ...editingProduct, quoteBullets: updated });
                          }}><Trash2 size={12} /></button>
                        </div>
                      ))}
                      {(editingProduct.quoteBullets || []).length === 0 && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No product-specific quote highlights defined. Defaulting to general logistics details.</p>}
                    </div>
                  </div>
                </div>
              )}

              </div>

              <div className="modal-footer" style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px', flexShrink: 0 }}>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingProduct(null)}>Cancel</button>
                <button type="submit" className="btn btn-success">Apply Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   Certifications Editor
   ========================================================================== */
function CertificationsSectionEditor({ content, setContent, token, r2PublicUrl }) {
  const [activeTab, setActiveTab] = useState('info'); 

  const updateHeader = (field, val) => {
    setContent({
      ...content,
      certifications: { ...content.certifications, [field]: val }
    });
  };

  const updateBadge = (index, field, val) => {
    const list = [...content.certifications.qualityBadges];
    list[index][field] = val;
    setContent({
      ...content,
      certifications: { ...content.certifications, qualityBadges: list }
    });
  };

  const updateCertificate = (index, field, val) => {
    const list = [...content.certifications.certificates];
    list[index][field] = val;
    setContent({
      ...content,
      certifications: { ...content.certifications, certificates: list }
    });
  };

  const addCertificate = () => {
    const list = [...(content.certifications.certificates || []), {
      id: Date.now(),
      title: 'New Certificate Document',
      certNo: 'CERT-NEW-',
      issuedBy: 'Accreditation Agency',
      issuedTo: 'Realcade Lifescience Pvt. Ltd.',
      scope: 'Sterile Parenterals',
      validFrom: '01 Jan 2026',
      validTo: '31 Dec 2029',
      tag: 'New Standard',
      tagColor: '#005bc4',
      status: 'Active',
      image: '',
      description: 'New official quality approval dossier certificate.'
    }];
    setContent({
      ...content,
      certifications: { ...content.certifications, certificates: list }
    });
  };

  const removeCertificate = (idx) => {
    if (window.confirm('Delete this certificate?')) {
      const list = content.certifications.certificates.filter((_, i) => i !== idx);
      setContent({
        ...content,
        certifications: { ...content.certifications, certificates: list }
      });
    }
  };

  const updateApproval = (index, field, val) => {
    const list = [...content.certifications.regulatoryApprovals];
    list[index][field] = val;
    setContent({
      ...content,
      certifications: { ...content.certifications, regulatoryApprovals: list }
    });
  };

  const addApproval = () => {
    const list = [...(content.certifications.regulatoryApprovals || []), {
      region: 'New Market Country',
      body: 'CDSCO / NRA Authority',
      status: 'Active',
      note: 'Dossier Filed'
    }];
    setContent({
      ...content,
      certifications: { ...content.certifications, regulatoryApprovals: list }
    });
  };

  const removeApproval = (idx) => {
    if (window.confirm('Delete this regulatory filing record?')) {
      const list = content.certifications.regulatoryApprovals.filter((_, i) => i !== idx);
      setContent({
        ...content,
        certifications: { ...content.certifications, regulatoryApprovals: list }
      });
    }
  };

  const badgeLabels = [
    'Quality Badge 1: WHO GMP',
    'Quality Badge 2: ISO Accreditation'
  ];

  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '24px', gap: '10px' }}>
        <button className={`btn ${activeTab === 'info' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('info')}>Header Info</button>
        <button className={`btn ${activeTab === 'badges' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('badges')}>Quality Badges</button>
        <button className={`btn ${activeTab === 'certificates' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('certificates')}>Dossier Records</button>
        <button className={`btn ${activeTab === 'approvals' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('approvals')}>Regulatory Matrix</button>
      </div>

      {activeTab === 'info' && (
        <div className="section-panel">
          <div className="panel-header">
            <h2>Certifications Section Headers</h2>
          </div>
          <div className="form-group">
            <label className="form-label">Hero Title Line 1</label>
            <input type="text" className="form-control" value={content.certifications.heroTitle1} onChange={e => updateHeader('heroTitle1', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Hero Title Highlight (Green)</label>
            <input type="text" className="form-control" value={content.certifications.heroTitle2} onChange={e => updateHeader('heroTitle2', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Hero Banner Description</label>
            <textarea rows={4} className="form-control" value={content.certifications.heroDesc} onChange={e => updateHeader('heroDesc', e.target.value)} />
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="section-panel">
          <div className="panel-header">
            <h2>Quality Accreditation Badges</h2>
          </div>
          <div className="repeater-list">
            {content.certifications.qualityBadges.map((badge, idx) => (
              <div key={idx} className="repeater-item" style={{ borderLeft: '3px solid var(--primary)' }}>
                <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '12px' }}>
                  {badgeLabels[idx] || `Badge ${idx + 1}`}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Badge Label Name</label>
                    <input type="text" className="form-control" value={badge.title} onChange={e => updateBadge(idx, 'title', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Detailed Accreditation Agency</label>
                    <input type="text" className="form-control" value={badge.subtitle} onChange={e => updateBadge(idx, 'subtitle', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'certificates' && (
        <div className="section-panel">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Official Dossier Certificates</h2>
            <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', gap: '4px', alignItems: 'center' }} onClick={addCertificate}>
              <Plus size={14} /> Add Certificate Card
            </button>
          </div>
          <div className="repeater-list">
            {(content.certifications.certificates || []).map((cert, idx) => (
              <div key={cert.id || idx} className="repeater-item" style={{ borderLeft: '3px solid var(--success)', marginBottom: '30px' }}>
                <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '16px', fontWeight: 'bold', fontSize: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Certificate Card #{idx + 1}: {cert.title || 'Untitled Document'}</span>
                  <button className="btn btn-danger" style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', gap: '4px', alignItems: 'center' }} onClick={() => removeCertificate(idx)}>
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Certificate Title</label>
                    <input type="text" className="form-control" value={cert.title || ''} onChange={e => updateCertificate(idx, 'title', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Certificate Number</label>
                    <input type="text" className="form-control" value={cert.certNo || ''} onChange={e => updateCertificate(idx, 'certNo', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Issued By Authority</label>
                    <input type="text" className="form-control" value={cert.issuedBy || ''} onChange={e => updateCertificate(idx, 'issuedBy', e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Issued To Entity</label>
                    <input type="text" className="form-control" value={cert.issuedTo || ''} onChange={e => updateCertificate(idx, 'issuedTo', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Valid From Date</label>
                    <input type="text" className="form-control" value={cert.validFrom || ''} onChange={e => updateCertificate(idx, 'validFrom', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Valid To Date</label>
                    <input type="text" className="form-control" value={cert.validTo || ''} onChange={e => updateCertificate(idx, 'validTo', e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px', marginTop: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Scope Area</label>
                    <input type="text" className="form-control" value={cert.scope || ''} onChange={e => updateCertificate(idx, 'scope', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tag Badge Text</label>
                    <input type="text" className="form-control" value={cert.tag || ''} onChange={e => updateCertificate(idx, 'tag', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tag Color Hex</label>
                    <input type="text" className="form-control" value={cert.tagColor || ''} onChange={e => updateCertificate(idx, 'tagColor', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Verification Status</label>
                    <input type="text" className="form-control" value={cert.status || ''} onChange={e => updateCertificate(idx, 'status', e.target.value)} />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '12px' }}>
                  <label className="form-label">Short Description</label>
                  <textarea rows={2} className="form-control" value={cert.description || ''} onChange={e => updateCertificate(idx, 'description', e.target.value)} />
                </div>

                <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}>
                  <label className="form-label" style={{ fontWeight: 'bold' }}>Upload Official Certificate Copy Image</label>
                  <ImageUpload
                    token={token}
                    defaultKey={`cert_${cert.id || idx}.png`}
                    currentKey={cert.image}
                    onUploadSuccess={(key) => updateCertificate(idx, 'image', key)}
                    r2PublicUrl={r2PublicUrl}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'approvals' && (
        <div className="section-panel">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Global Regulatory Countries Filing Matrix</h2>
            <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', gap: '4px', alignItems: 'center' }} onClick={addApproval}>
              <Plus size={14} /> Add Matrix Country
            </button>
          </div>
          <div className="repeater-list">
            {(content.certifications.regulatoryApprovals || []).map((appr, idx) => (
              <div key={idx} className="repeater-item" style={{ borderLeft: '3px solid var(--primary)' }}>
                <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Matrix Country Record {idx + 1}</span>
                  <button className="btn btn-danger" style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', gap: '4px', alignItems: 'center' }} onClick={() => removeApproval(idx)}>
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Importing Region Country</label>
                    <input type="text" className="form-control" value={appr.region || ''} onChange={e => updateApproval(idx, 'region', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Filing Pharmacopeia / Body</label>
                    <input type="text" className="form-control" value={appr.body || ''} onChange={e => updateApproval(idx, 'body', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Registration Status</label>
                    <input type="text" className="form-control" value={appr.status || ''} onChange={e => updateApproval(idx, 'status', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Filing Note / Type</label>
                    <input type="text" className="form-control" value={appr.note || ''} onChange={e => updateApproval(idx, 'note', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   Gallery Editor
   ========================================================================== */
function GallerySectionEditor({ content, setContent, token, r2PublicUrl }) {
  const [activeTab, setActiveTab] = useState('info'); 

  const updateHeader = (field, val) => {
    setContent({
      ...content,
      gallery: { ...content.gallery, [field]: val }
    });
  };

  const updateGalleryItem = (index, field, val) => {
    const list = [...content.gallery.galleryItems];
    list[index][field] = val;
    setContent({
      ...content,
      gallery: { ...content.gallery, galleryItems: list }
    });
  };

  const updateCaseStudy = (index, field, val) => {
    const list = [...content.gallery.caseStudies];
    list[index][field] = val;
    setContent({
      ...content,
      gallery: { ...content.gallery, caseStudies: list }
    });
  };

  const addCaseStudy = () => {
    const list = [...(content.gallery.caseStudies || []), {
      title: 'New Case Study',
      tag: 'NEW REGION',
      year: new Date().getFullYear().toString(),
      projCode: 'PROC-NEW-01',
      reduction: 'Metric Highlight 1',
      sensors: 'Metric Highlight 2',
      desc: 'Short description of the validation process or case study project.',
      thumbnail: '',
      videoUrl: ''
    }];
    setContent({
      ...content,
      gallery: { ...content.gallery, caseStudies: list }
    });
  };

  const removeCaseStudy = (idx) => {
    if (window.confirm('Delete this case study?')) {
      const list = content.gallery.caseStudies.filter((_, i) => i !== idx);
      setContent({
        ...content,
        gallery: { ...content.gallery, caseStudies: list }
      });
    }
  };



  const addGalleryItem = () => {
    const list = [...(content.gallery.galleryItems || []), {
      id: Date.now(),
      title: 'New Gallery Asset',
      category: 'machinery',
      image: '',
      tag: 'MACHINES',
      specs: ['Spec Highlight 1'],
      size: 'square'
    }];
    setContent({
      ...content,
      gallery: { ...content.gallery, galleryItems: list }
    });
  };

  const removeGalleryItem = (idx) => {
    if (window.confirm('Delete this gallery photo?')) {
      const list = content.gallery.galleryItems.filter((_, i) => i !== idx);
      setContent({
        ...content,
        gallery: { ...content.gallery, galleryItems: list }
      });
    }
  };

  const updateGalleryItemSpecs = (itemIdx, specIdx, val) => {
    const list = [...content.gallery.galleryItems];
    list[itemIdx].specs[specIdx] = val;
    setContent({
      ...content,
      gallery: { ...content.gallery, galleryItems: list }
    });
  };

  const addGalleryItemSpec = (itemIdx) => {
    const list = [...content.gallery.galleryItems];
    if (!list[itemIdx].specs) list[itemIdx].specs = [];
    list[itemIdx].specs.push('New Technical Spec');
    setContent({
      ...content,
      gallery: { ...content.gallery, galleryItems: list }
    });
  };

  const removeGalleryItemSpec = (itemIdx, specIdx) => {
    const list = [...content.gallery.galleryItems];
    list[itemIdx].specs = list[itemIdx].specs.filter((_, i) => i !== specIdx);
    setContent({
      ...content,
      gallery: { ...content.gallery, galleryItems: list }
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '24px', gap: '10px' }}>
        <button className={`btn ${activeTab === 'info' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('info')}>Header Info</button>
        <button className={`btn ${activeTab === 'photos' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('photos')}>Facility Photos</button>
        <button className={`btn ${activeTab === 'cases' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('cases')}>Technical Case Studies</button>
      </div>

      {activeTab === 'info' && (
        <div className="section-panel">
          <div className="panel-header">
            <h2>Gallery Headings</h2>
          </div>
          <div className="form-group">
            <label className="form-label">Hero Badge Text</label>
            <input type="text" className="form-control" value={content.gallery.heroBadge} onChange={e => updateHeader('heroBadge', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Hero Banner Title</label>
            <input type="text" className="form-control" value={content.gallery.heroTitle} onChange={e => updateHeader('heroTitle', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Hero Banner Description</label>
            <textarea rows={4} className="form-control" value={content.gallery.heroDesc} onChange={e => updateHeader('heroDesc', e.target.value)} />
          </div>
        </div>
      )}

      {activeTab === 'photos' && (
        <div className="section-panel">
          <div className="panel-header">
            <h2>Facility Photos List</h2>
            <button className="btn btn-primary" onClick={addGalleryItem}><Plus size={16} /> Add Photo</button>
          </div>
          <div className="repeater-list">
            {(content.gallery.galleryItems || []).map((item, idx) => (
              <div key={item.id || idx} className="repeater-item" style={{ borderLeft: '3px solid var(--primary)' }}>
                <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Facility Photo Showcase {idx + 1}</span>
                  <button className="btn btn-danger" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => removeGalleryItem(idx)}><Trash2 size={12} /> Remove</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Image Label Caption</label>
                    <input type="text" className="form-control" value={item.title} onChange={e => updateGalleryItem(idx, 'title', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Image Category Segment</label>
                    <select className="form-control" value={item.category} onChange={e => updateGalleryItem(idx, 'category', e.target.value)} style={{ background: 'var(--bg-input)' }}>
                      <option value="qc">Quality Control (qc)</option>
                      <option value="machinery">Precision Machinery (machinery)</option>
                      <option value="cleanrooms">Cleanroom Facilities (cleanrooms)</option>
                      <option value="installations">Client Installations (installations)</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '12px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Tag Overlay (e.g. QUALITY CONTROL, MACHINES)</label>
                    <input type="text" className="form-control" value={item.tag || ''} onChange={e => updateGalleryItem(idx, 'tag', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Grid Size Layout Aspect</label>
                    <select className="form-control" value={item.size || 'square'} onChange={e => updateGalleryItem(idx, 'size', e.target.value)} style={{ background: 'var(--bg-input)' }}>
                      <option value="square">Square</option>
                      <option value="horizontal">Horizontal (Wider Card)</option>
                      <option value="vertical">Vertical (Taller Card)</option>
                    </select>
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: '12px' }}>
                  <label className="form-label">Detailed Image Description</label>
                  <input type="text" className="form-control" value={item.description} onChange={e => updateGalleryItem(idx, 'description', e.target.value)} />
                </div>
                
                <div style={{ marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>Image Specs / Highlights</label>
                    <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => addGalleryItemSpec(idx)}><Plus size={10} /> Add Spec</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(item.specs || []).map((spec, sIdx) => (
                      <div key={sIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input type="text" className="form-control" value={spec} onChange={e => updateGalleryItemSpecs(idx, sIdx, e.target.value)} />
                        <button className="btn btn-danger btn-icon-only" onClick={() => removeGalleryItemSpec(idx, sIdx)}><Trash2 size={12} /></button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}>
                  <label className="form-label">Upload / Replace Image</label>
                  <ImageUpload
                    token={token}
                    defaultKey={`gallery_${item.id || idx}.png`}
                    currentKey={item.image}
                    onUploadSuccess={(key) => updateGalleryItem(idx, 'image', key)}
                    r2PublicUrl={r2PublicUrl}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'cases' && (
        <div className="section-panel">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Technical Export Case Studies</h2>
            <button className="btn btn-primary" onClick={addCaseStudy}>
              <Plus size={16} /> Add Case Study
            </button>
          </div>
          <div className="repeater-list">
            {(content.gallery.caseStudies || []).map((cs, idx) => (
              <div key={idx} className="repeater-item" style={{ borderLeft: '3px solid var(--success)', marginBottom: '30px' }}>
                <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Technical Case Study #{idx + 1}: {cs.title || 'Untitled Case'}</span>
                  <button className="btn btn-danger" style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', gap: '4px', alignItems: 'center' }} onClick={() => removeCaseStudy(idx)}>
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Validation Study Title</label>
                    <input type="text" className="form-control" value={cs.title || ''} onChange={e => updateCaseStudy(idx, 'title', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category Tag (e.g. AUTOMATION, LOGISTICS)</label>
                    <input type="text" className="form-control" value={cs.tag || ''} onChange={e => updateCaseStudy(idx, 'tag', e.target.value)} />
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Year</label>
                    <input type="text" className="form-control" value={cs.year || ''} onChange={e => updateCaseStudy(idx, 'year', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Project Code Reference</label>
                    <input type="text" className="form-control" value={cs.projCode || ''} onChange={e => updateCaseStudy(idx, 'projCode', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Main Metric (e.g. Reduced cycle by 40%)</label>
                    <input type="text" className="form-control" value={cs.reduction || ''} onChange={e => updateCaseStudy(idx, 'reduction', e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Secondary Metric / Sensor Stat (e.g. Continuous atmospheric sensors)</label>
                    <input type="text" className="form-control" value={cs.sensors || ''} onChange={e => updateCaseStudy(idx, 'sensors', e.target.value)} />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '12px' }}>
                  <label className="form-label">Detailed Validation Summary Description</label>
                  <textarea rows={3} className="form-control" value={cs.desc || ''} onChange={e => updateCaseStudy(idx, 'desc', e.target.value)} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontWeight: 'bold' }}>Thumbnail Cover Image (Upload / Replace)</label>
                    <ImageUpload
                      token={token}
                      defaultKey={`case_thumb_${idx}.png`}
                      currentKey={cs.thumbnail}
                      onUploadSuccess={(key) => updateCaseStudy(idx, 'thumbnail', key)}
                      r2PublicUrl={r2PublicUrl}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontWeight: 'bold' }}>Walkthrough Video File (Upload / Replace)</label>
                    <ImageUpload
                      token={token}
                      defaultKey={`case_video_${idx}.mp4`}
                      currentKey={cs.videoUrl}
                      onUploadSuccess={(key) => updateCaseStudy(idx, 'videoUrl', key)}
                      r2PublicUrl={r2PublicUrl}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   Contact Page Editor
   ========================================================================== */
function ContactSectionEditor({ content, setContent, token, r2PublicUrl }) {
  const updateContactField = (field, val) => {
    setContent({
      ...content,
      contact: {
        ...(content.contact || {}),
        [field]: val
      }
    });
  };

  const updateContactHub = (idx, field, val) => {
    const updated = [...(content.contact?.contactHubs || [])];
    updated[idx] = { ...updated[idx], [field]: val };
    setContent({
      ...content,
      contact: {
        ...(content.contact || {}),
        contactHubs: updated
      }
    });
  };

  const addContactHub = () => {
    const newCard = { name: 'New Contact Person', role: 'Sales Specialist', location: 'Ahmedabad, India', phone: '+91 ', email: 'info@alfacure.com' };
    setContent({
      ...content,
      contact: {
        ...(content.contact || {}),
        contactHubs: [...(content.contact?.contactHubs || []), newCard]
      }
    });
  };

  const removeContactHub = (idx) => {
    const updated = (content.contact?.contactHubs || []).filter((_, i) => i !== idx);
    setContent({
      ...content,
      contact: {
        ...(content.contact || {}),
        contactHubs: updated
      }
    });
  };

  return (
    <div className="section-panel">
      <div className="panel-header">
        <h2>Contact Details & Offices</h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="form-group">
          <label className="form-label">Domestic Phone Line</label>
          <input type="text" className="form-control" value={content.contact?.phoneDomestic || ''} onChange={e => updateContactField('phoneDomestic', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Export Phone Line</label>
          <input type="text" className="form-control" value={content.contact?.phoneExport || ''} onChange={e => updateContactField('phoneExport', e.target.value)} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="form-group">
          <label className="form-label">General Info Email</label>
          <input type="email" className="form-control" value={content.contact?.emailGeneral || ''} onChange={e => updateContactField('emailGeneral', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Export Dept Email</label>
          <input type="email" className="form-control" value={content.contact?.emailExport || ''} onChange={e => updateContactField('emailExport', e.target.value)} />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Head Office Address</label>
        <textarea rows={3} className="form-control" value={content.contact?.headOffice || ''} onChange={e => updateContactField('headOffice', e.target.value)} />
      </div>

      <div className="form-group">
        <label className="form-label">Partner Manufacturing Plant Address</label>
        <textarea rows={3} className="form-control" value={content.contact?.plantAddress || ''} onChange={e => updateContactField('plantAddress', e.target.value)} />
      </div>

      <div className="form-group">
        <label className="form-label">Google Maps Embed Link (src attribute)</label>
        <input type="text" className="form-control" value={content.contact?.mapLink || ''} onChange={e => updateContactField('mapLink', e.target.value)} />
      </div>

      <hr style={{ margin: '30px 0', borderColor: 'var(--border)' }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Direct Team / Contact Cards ({ (content.contact?.contactHubs || []).length })</h3>
        <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', gap: '4px', alignItems: 'center' }} onClick={addContactHub}>
          <Plus size={14} /> Add Contact Card
        </button>
      </div>

      <div className="repeater-list">
        {(content.contact?.contactHubs || []).map((hub, idx) => (
          <div key={idx} className="repeater-item" style={{ borderLeft: '3px solid var(--success)', padding: '20px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>Contact Card #{idx + 1}</strong>
              <button className="btn btn-danger" style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', gap: '4px', alignItems: 'center' }} onClick={() => removeContactHub(idx)}>
                <Trash2 size={12} /> Remove
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" value={hub.name || ''} onChange={e => updateContactHub(idx, 'name', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Role Designation</label>
                <input type="text" className="form-control" value={hub.role || ''} onChange={e => updateContactHub(idx, 'role', e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '12px' }}>
              <div className="form-group">
                <label className="form-label">Office / Region Location</label>
                <input type="text" className="form-control" value={hub.location || ''} onChange={e => updateContactHub(idx, 'location', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Line</label>
                <input type="text" className="form-control" value={hub.phone || ''} onChange={e => updateContactHub(idx, 'phone', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" value={hub.email || ''} onChange={e => updateContactHub(idx, 'email', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   Blogs Section Editor Component
   ========================================================================== */
function BlogsSectionEditor({ content, setContent, token, r2PublicUrl }) {
  const [editingBlog, setEditingBlog] = useState(null);
  const [modalTab, setModalTab] = useState('core'); // 'core' or 'content'

  const blogsList = content.blogs || [];

  const updateBlogField = (field, value) => {
    if (!editingBlog) return;
    setEditingBlog({ ...editingBlog, [field]: value });
  };

  const addContentBlock = () => {
    const updatedContent = [...(editingBlog.content || []), { heading: 'New Heading', body: 'Paragraph text' }];
    setEditingBlog({ ...editingBlog, content: updatedContent });
  };

  const removeContentBlock = (index) => {
    const updatedContent = (editingBlog.content || []).filter((_, idx) => idx !== index);
    setEditingBlog({ ...editingBlog, content: updatedContent });
  };

  const updateContentBlock = (index, field, value) => {
    const updatedContent = [...(editingBlog.content || [])];
    updatedContent[index] = { ...updatedContent[index], [field]: value };
    setEditingBlog({ ...editingBlog, content: updatedContent });
  };

  const openNewBlogModal = () => {
    setEditingBlog({
      isNew: true,
      id: Date.now(),
      slug: 'new-blog-post-' + Math.floor(Math.random() * 1000),
      title: '',
      category: 'Product Insights',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: 'Alfacure Lifescience',
      image: '',
      excerpt: '',
      content: []
    });
    setModalTab('core');
  };

  const saveBlogEdit = (e) => {
    e.preventDefault();
    if (!editingBlog) return;

    let updatedBlogs;
    if (editingBlog.isNew) {
      const { isNew, ...cleanBlog } = editingBlog;
      updatedBlogs = [...blogsList, cleanBlog];
    } else {
      updatedBlogs = blogsList.map(b => b.id === editingBlog.id ? editingBlog : b);
    }

    setContent({
      ...content,
      blogs: updatedBlogs
    });
    setEditingBlog(null);
  };

  const removeBlog = (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    const updatedBlogs = blogsList.filter(b => b.id !== id);
    setContent({
      ...content,
      blogs: updatedBlogs
    });
  };

  return (
    <div className="section-editor">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0 }}>Blog Articles Management</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Create, update, and manage your articles on the Alfacure news portal</p>
        </div>
        <button type="button" className="btn btn-success" onClick={openNewBlogModal}>
          <Plus size={16} style={{ marginRight: '4px' }} /> Add New Article
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-table-header)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '12px 16px', fontSize: '0.85rem', fontWeight: 600 }}>Title</th>
              <th style={{ padding: '12px 16px', fontSize: '0.85rem', fontWeight: 600 }}>Category</th>
              <th style={{ padding: '12px 16px', fontSize: '0.85rem', fontWeight: 600 }}>Publication Date</th>
              <th style={{ padding: '12px 16px', fontSize: '0.85rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogsList.map((blog) => (
              <tr key={blog.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 16px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>{blog.title || 'Untitled Article'}</td>
                <td style={{ padding: '14px 16px', fontSize: '0.85rem' }}>
                  <span className="badge badge-blue" style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px' }}>{blog.category}</span>
                </td>
                <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{blog.date}</td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button className="btn btn-secondary btn-icon-only" onClick={() => { setEditingBlog(blog); setModalTab('core'); }}><Edit2 size={12} /></button>
                    <button className="btn btn-danger btn-icon-only" onClick={() => removeBlog(blog.id)}><Trash2 size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {blogsList.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No blog articles defined yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingBlog && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '750px', width: '90%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '24px 32px 32px 32px' }}>
            <h3 style={{ margin: 0, paddingBottom: '12px' }}>{editingBlog.isNew ? 'New Blog Article' : 'Edit Blog Article'}</h3>
            
            {/* Modal Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '16px', gap: '8px', overflowX: 'auto', paddingBottom: '8px', flexShrink: 0 }}>
              <button type="button" className={`btn ${modalTab === 'core' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setModalTab('core')}>Core Details</button>
              <button type="button" className={`btn ${modalTab === 'content' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setModalTab('content')}>Body Content</button>
            </div>

            <form onSubmit={saveBlogEdit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', margin: 0, gap: 0 }}>
              <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px', paddingBottom: '12px' }}>
                {modalTab === 'core' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Article Title</label>
                      <input type="text" className="form-control" value={editingBlog.title} onChange={e => updateBlogField('title', e.target.value)} required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label className="form-label">Slug Link (URL Name)</label>
                        <input type="text" className="form-control" value={editingBlog.slug} onChange={e => updateBlogField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-'))} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Category</label>
                        <input type="text" className="form-control" value={editingBlog.category || 'Product Insights'} onChange={e => updateBlogField('category', e.target.value)} required />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label className="form-label">Publication Date</label>
                        <input type="text" className="form-control" value={editingBlog.date} onChange={e => updateBlogField('date', e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Author Name</label>
                        <input type="text" className="form-control" value={editingBlog.author || 'Alfacure Lifescience'} onChange={e => updateBlogField('author', e.target.value)} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Excerpt / Short Summary</label>
                      <textarea rows={3} className="form-control" value={editingBlog.excerpt} onChange={e => updateBlogField('excerpt', e.target.value)} required />
                    </div>
                    <div className="form-group" style={{ marginTop: '12px' }}>
                      <label className="form-label">Cover Image (Upload / Replace)</label>
                      {!editingBlog.isNew ? (
                        <ImageUpload
                          token={token}
                          defaultKey={`blog_${editingBlog.id}.png`}
                          currentKey={editingBlog.image}
                          onUploadSuccess={(key) => updateBlogField('image', key)}
                          r2PublicUrl={r2PublicUrl}
                        />
                      ) : (
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Save the article first, then edit it to upload a cover image.</p>
                      )}
                    </div>
                  </>
                )}

                {modalTab === 'content' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label className="form-label" style={{ marginBottom: 0 }}>Article Paragraph Sections</label>
                      <button type="button" className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', gap: '4px', alignItems: 'center' }} onClick={addContentBlock}><Plus size={10} /> Add Section</button>
                    </div>
                    <div className="repeater-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {(editingBlog.content || []).map((sec, sIdx) => (
                        <div key={sIdx} className="repeater-item" style={{ borderLeft: '3px solid var(--primary)', padding: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <strong>Section #{sIdx + 1}</strong>
                            <button type="button" className="btn btn-danger" style={{ padding: '2px 8px', fontSize: '0.7rem' }} onClick={() => removeContentBlock(sIdx)}>Remove</button>
                          </div>
                          <div className="form-group" style={{ marginBottom: '8px' }}>
                            <label className="form-label">Section Heading</label>
                            <input type="text" className="form-control" value={sec.heading || ''} onChange={e => updateContentBlock(sIdx, 'heading', e.target.value)} />
                          </div>
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Section Body Text</label>
                            <textarea rows={4} className="form-control" value={sec.body || ''} onChange={e => updateContentBlock(sIdx, 'body', e.target.value)} />
                          </div>
                        </div>
                      ))}
                      {(editingBlog.content || []).length === 0 && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No content paragraphs defined. Click Add Section above.</p>}
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer" style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px', flexShrink: 0 }}>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingBlog(null)}>Cancel</button>
                <button type="submit" className="btn btn-success">Apply Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
