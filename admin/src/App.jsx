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
  CheckCircle
} from 'lucide-react';
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

    // Setup initial structure pre-populated with live site JSON data & defaults
    const sanitized = {
      home: {
        heroTitle1: data?.home?.heroTitle1 || 'Premium Large Volume',
        heroTitle2: data?.home?.heroTitle2 || 'Parenteral Solutions',
        heroDesc: data?.home?.heroDesc || 'Alfacure Lifescience Pvt. Ltd. is an Ahmedabad-based pharmaceutical export company specializing in the commercialization and global distribution of life-saving Large Volume Parenteral (LVP) formulations...',
        stats: data?.home?.stats || [
          { value: '6', label: 'Pack Sizes', desc: '100 mL to 1000 mL' },
          { value: 'Global', label: 'Export Markets', desc: 'Germany, UAE, EU & UN' },
          { value: '2026', label: 'Established', desc: 'Ahmedabad-based enterprise' },
          { value: 'ISO', label: 'Certified', desc: 'ISO & CRISIL certified' }
        ],
        capabilities: data?.home?.capabilities || [
          { title: 'Fluid & Electrolyte Solutions', desc: 'Comprehensive LVP solutions including Dextrose Injection, Sodium Chloride, DNS and Ringer Lactate infusions available in multiple volume configurations.' },
          { title: 'Anti-Infective Infusions', desc: 'High-efficacy antibacterial formulations including Ciprofloxacin, Ofloxacin, Levofloxacin, Moxifloxacin and Linezolid infusions.' },
          { title: 'Critical Care Products', desc: 'Mannitol, Paracetamol, Fluconazole, Metronidazole, Ornidazole and specialized electrolyte infusions for clinical applications.' }
        ],
        trustPoints: data?.home?.trustPoints || [
          'Specialized LVP export expertise',
          'Available in 100 mL to 1000 mL variants',
          'CTD / eCTD / ACTD dossier support',
          'Global regulatory documentation',
          'Complete batch traceability & CoA',
          'ISO & CRISIL certified'
        ]
      },
      about: {
        heroDesc: data?.about?.heroDesc || 'Alfacure Lifescience Pvt. Ltd. is a premier Ahmedabad-based pharmaceutical company specializing in the manufacturing, commercialization, and global distribution of life-saving therapeutics. With a strong focus on quality, sterility, and regulatory compliance, we deliver high-quality Large Volume Parenteral (LVP) solutions to healthcare institutions, distributors, and international partners across the world.',
        whatWeDo: data?.about?.whatWeDo || [
          { title: 'Global Distribution', desc: 'Supplying Large Volume Parenterals (LVP), IV fluids, anti-infectives, and critical care formulations to healthcare institutions and distribution partners across domestic and international markets.' },
          { title: 'Regulatory & Documentation Support', desc: 'Providing end-to-end regulatory assistance including CTD, eCTD, and ACTD dossiers, product registrations, and country-specific compliance documentation.' },
          { title: 'Pharmaceutical Manufacturing', desc: 'Manufacturing premium sterile Large Volume Parenteral products under stringent quality control standards and advanced pharmaceutical protocols.' },
          { title: 'Strategic Partnerships', desc: 'Building long-term relationships with importers, distributors, hospitals, and healthcare organizations worldwide.' }
        ],
        whyAlfacure: data?.about?.whyAlfacure || [
          { title: 'Premium LVP Focus', desc: 'Premium Large Volume Parenteral (LVP) manufacturer established in Ahmedabad, Gujarat.' },
          { title: 'Certified Organisation', desc: 'ISO and CRISIL certified organization committed to quality, safety, and regulatory compliance.' },
          { title: 'Diverse Portfolio', desc: 'Comprehensive portfolio of sterile IV fluids, electrolytes, anti-infectives, and critical care products.' },
          { title: 'Regulatory Desk', desc: 'Dedicated Regulatory Affairs team supporting dossiers, registrations, and global market entry.' },
          { title: 'Supply & Logistics', desc: 'Reliable domestic supply network with expanding international export operations.' },
          { title: 'Global Mission', desc: 'Focused on delivering affordable, high-quality healthcare solutions worldwide.' }
        ],
        manufacturingSpecs: data?.about?.manufacturingSpecs || [
          { label: 'Established', desc: '2026' },
          { label: 'Certifications', desc: 'ISO & CRISIL Certified' },
          { label: 'Head Office', desc: 'Office 1122, Satyamev Shivalik, Bopal Ambili Junction, SP Ring Road, Ahmedabad – 380058' },
          { label: 'Specialization', desc: 'Large Volume Parenterals (LVP) & Sterile IV Solutions' },
          { label: 'Volume Range', desc: '100 mL, 250 mL, 300 mL, 400 mL, 500 mL & 1000 mL' },
          { label: 'Product Portfolio', desc: 'IV Fluids, Electrolytes, Mannitol, Antibiotics, Antifungals & Paracetamol Infusions' }
        ]
      },
      products: {
        heroTag: data?.products?.heroTag || 'PRECISION FORMULATIONS & SYSTEMS',
        heroTitle: data?.products?.heroTitle || 'Products & Solutions',
        heroDesc: data?.products?.heroDesc || 'Explore our comprehensive range of sterile medical parenterals and high-precision Blow-Fill-Seal systems, engineered to meet the highest regulatory standards.',
        productsData: data?.products?.productsData || [],
        machineryItems: data?.products?.machineryItems || [
          { id: 'pt9000', name: 'PharmaFill 5000 Series', capacity: '5000 units/hr', automation: 'Fully Automatic', isoClass: 'Class 5', image: 'auto_capping.png', status: 'Active' },
          { id: 'sterilepack', name: 'SterilePack V3', capacity: '3200 units/hr', automation: 'Robotic Auto', isoClass: 'Class 5 (±0.01mm)', image: 'kinetic_sorting.png', status: 'Active' },
          { id: 'mediflow', name: 'MediFlow IV-200', capacity: '1200 Bags/hr', automation: 'Semi-Automatic', isoClass: 'Class 5 (4.5 kW)', image: 'clean_hub.png', status: 'Active' }
        ],
        industrySolutions: data?.products?.industrySolutions || [
          { title: 'Pharmaceutical', desc: 'High-volume formulations and parenteral supply chains meeting international pharmacopeia guidelines for global markets.', bullets: ['WHO-GMP certified production', 'Comprehensive CTD export dossiers', 'Endotoxin-tested pyrogen-free liquids'] },
          { title: 'Hospitals', desc: 'Direct supply of critical large-volume infusions and sterile saline solutions for ICU, clinical wards, and surgery units.', bullets: ['Hanger-ready BFS plastic bottles', 'Double-port leak-proof closure caps', 'Compatible with automated infusion systems'] },
          { title: 'Contract Mfg.', desc: 'Flexible third-party manufacturing services with modular packaging sizes and customizable active concentration levels.', bullets: ['Custom formulation capabilities', 'Licensed manufacturing agreements', 'Scalable production batches'] }
        ]
      },
      gallery: {
        heroBadge: data?.gallery?.heroBadge || 'FACILITY GALLERY',
        heroTitle: data?.gallery?.heroTitle || 'Inside Our Manufacturing & Quality Facilities',
        heroDesc: data?.gallery?.heroDesc || 'Take a virtual tour of our state-of-the-art Blow-Fill-Seal (BFS) production halls and spectrometry validation clean hubs.',
        galleryItems: data?.gallery?.galleryItems || [
          { title: 'Automated Packaging Line', category: 'Packaging', description: 'Advanced leak-detection and terminal sterilization packaging units.', image: 'packaging_floor.png' }
        ],
        caseStudies: data?.gallery?.caseStudies || [
          { title: 'EU Infusion Batch Export', desc: 'Export validation process for 100,000 units of Paracetamol infusion.' }
        ]
      },
      certifications: {
        heroTitle1: data?.certifications?.heroTitle1 || 'Certifications &',
        heroTitle2: data?.certifications?.heroTitle2 || 'Regulatory Approvals',
        heroDesc: data?.certifications?.heroDesc || 'Every product we export is backed by internationally recognised certifications, rigorous quality controls, and full regulatory documentation.',
        qualityBadges: data?.certifications?.qualityBadges || [
          { title: 'WHO-GMP', subtitle: 'Manufacturing Standard' },
          { title: 'ISO 9001:2015', subtitle: 'Quality Management' }
        ],
        certificates: data?.certifications?.certificates || [
          { name: 'WHO GMP Certificate', authority: 'FDA Gujarat', type: 'GMP Compliance' }
        ],
        regulatoryApprovals: data?.certifications?.regulatoryApprovals || [
          { country: 'Germany', standard: 'EU Compliance', status: 'Approved' }
        ]
      }
    };
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

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setMsg('');

    const formData = new FormData();
    formData.append('image', file);
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
            src={`${r2PublicUrl}/${currentKey}`}
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
    'Pharmaceutical BFS Manufacturing',
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
          <h2>Manufacturing Technical Specs Table</h2>
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
      packSizes: ['500 ml'],
      purpose: 'Export'
    });
  };

  const updateMachinery = (index, field, val) => {
    const list = [...content.products.machineryItems];
    list[index][field] = val;
    setContent({
      ...content,
      products: { ...content.products, machineryItems: list }
    });
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

  const machineryLabels = [
    'BFS Machine 1: Primary Capping Filler',
    'BFS Machine 2: Sorting Robotic Package',
    'BFS Machine 3: IV Bag Fluid Filler'
  ];

  const industrySolutionsLabels = [
    'Sector Category 1: Pharmaceutical Supply Chain',
    'Sector Category 2: ICU & Ward Direct Hospital Supply',
    'Sector Category 3: Contract Licensing Manufacturing'
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
                  <th style={{ padding: '12px' }}>Pack Configurations</th>
                  <th style={{ padding: '12px' }}>Market Scope</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {content.products.productsData.map((prod) => (
                  <tr key={prod.id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{prod.name}</td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prod.composition}</td>
                    <td style={{ padding: '12px' }}>{prod.packSizes.join(', ')}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: prod.purpose === 'Export' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)', color: prod.purpose === 'Export' ? '#60a5fa' : '#34d399' }}>
                        {prod.purpose}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button className="btn btn-secondary btn-icon-only" onClick={() => setEditingProduct(prod)}><Edit2 size={12} /></button>
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
          </div>
          <div className="repeater-list">
            {content.products.machineryItems.map((mach, idx) => (
              <div key={mach.id || idx} className="repeater-item" style={{ borderLeft: '3px solid var(--primary)' }}>
                <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '12px' }}>
                  {machineryLabels[idx] || `BFS Machine Unit ${idx + 1}`}
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
          <div className="modal-content">
            <h3>{editingProduct.isNew ? 'New Formulation Spec' : 'Edit Formulation'}</h3>
            <form onSubmit={saveProduct}>
              <div className="form-group">
                <label className="form-label">Active Formulation Name</label>
                <input type="text" className="form-control" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Chemical Composition Description</label>
                <textarea rows={3} className="form-control" value={editingProduct.composition} onChange={e => setEditingProduct({ ...editingProduct, composition: e.target.value })} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Market Scope Channel</label>
                  <select className="form-control" value={editingProduct.purpose} onChange={e => setEditingProduct({ ...editingProduct, purpose: e.target.value })} style={{ background: 'var(--bg-input)' }}>
                    <option value="Export">Export (BP/USP)</option>
                    <option value="Domestic">Domestic (IP)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Volume Configurations (comma separated)</label>
                  <input type="text" className="form-control" value={editingProduct.packSizes.join(', ')} onChange={e => setEditingProduct({ ...editingProduct, packSizes: e.target.value.split(',').map(s => s.trim()) })} required />
                </div>
              </div>
              <div className="modal-footer">
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

  const updateApproval = (index, field, val) => {
    const list = [...content.certifications.regulatoryApprovals];
    list[index][field] = val;
    setContent({
      ...content,
      certifications: { ...content.certifications, regulatoryApprovals: list }
    });
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
          <div className="panel-header">
            <h2>Official Dossier Certificates</h2>
          </div>
          <div className="repeater-list">
            {content.certifications.certificates.map((cert, idx) => (
              <div key={idx} className="repeater-item" style={{ borderLeft: '3px solid var(--success)' }}>
                <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '12px' }}>
                  Dossier Certificate File {idx + 1}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" value={cert.name} onChange={e => updateCertificate(idx, 'name', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Licensing Authority</label>
                    <input type="text" className="form-control" value={cert.authority} onChange={e => updateCertificate(idx, 'authority', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Compliance Category</label>
                    <input type="text" className="form-control" value={cert.type} onChange={e => updateCertificate(idx, 'type', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'approvals' && (
        <div className="section-panel">
          <div className="panel-header">
            <h2>Global Regulatory Countries Filing Matrix</h2>
          </div>
          <div className="repeater-list">
            {content.certifications.regulatoryApprovals.map((appr, idx) => (
              <div key={idx} className="repeater-item" style={{ borderLeft: '3px solid var(--primary)' }}>
                <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '12px' }}>
                  Matrix Country Record {idx + 1}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Importing Region Country</label>
                    <input type="text" className="form-control" value={appr.country} onChange={e => updateApproval(idx, 'country', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Filing Pharmacopeia Standard</label>
                    <input type="text" className="form-control" value={appr.standard} onChange={e => updateApproval(idx, 'standard', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Registration status</label>
                    <input type="text" className="form-control" value={appr.status} onChange={e => updateApproval(idx, 'status', e.target.value)} />
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
          <div className="panel-header">
            <h2>Technical Export Case Studies</h2>
          </div>
          <div className="repeater-list">
            {content.gallery.caseStudies.map((cs, idx) => (
              <div key={idx} className="repeater-item" style={{ borderLeft: '3px solid var(--success)' }}>
                <div className="panel-sub-header" style={{ marginTop: 0, marginBottom: '12px' }}>
                  Technical Case Record {idx + 1}
                </div>
                <div className="form-group">
                  <label className="form-label">Technical Validation Study Title</label>
                  <input type="text" className="form-control" value={cs.title} onChange={e => updateCaseStudy(idx, 'title', e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Detailed Validation Summary</label>
                  <textarea rows={3} className="form-control" value={cs.desc} onChange={e => updateCaseStudy(idx, 'desc', e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
