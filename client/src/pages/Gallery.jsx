import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { Play, X, Eye, Info, Share2, Globe } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import Vid1 from "../assets/videos/lv_0_20260711213052 (1).mp4"
console.log(Vid1);

export default function Gallery() {
  const navigate = useNavigate();
  const { content, R2_PUBLIC_URL } = useCMS();

  const resolveImage = (img) => {
    if (!img) return '';
    if (img.startsWith('http') || img.startsWith('/')) return img;
    return `${R2_PUBLIC_URL}/${img}`;
  };
  const [activeTab, setActiveTab] = useState('all');
  const [videoModal, setVideoModal] = useState({ isOpen: false, title: '', videoUrl: '' });

  const tabs = [
    { id: 'all', label: 'All Assets' },
    { id: 'machinery', label: 'Precision Machinery' },
    { id: 'cleanrooms', label: 'Cleanroom Facilities' },
    { id: 'qc', label: 'Quality Control' },
    { id: 'installations', label: 'Client Installations' }
  ];

  const galleryItems = [
    {
      id: 1,
      title: 'Spectrometric Validation Lab',
      category: 'qc',
      image: '/assets/spectrometric_lab.png',
      tag: 'QUALITY CONTROL',
      specs: ['ICP-MS Spectrometer', 'LAL Endotoxin Audits', 'ISO Class 5 Cleanhoods'],
      size: 'vertical'
    },
    {
      id: 2,
      title: 'Auto-Capping Matrix v4',
      category: 'machinery',
      image: '/assets/auto_capping.png',
      tag: 'MACHINES',
      specs: ['BFS Technology', 'Robotic Head Welding', 'Grade A Aseptic Zone'],
      size: 'square'
    },
    {
      id: 3,
      title: 'Kinetic Sorting Array',
      category: 'machinery',
      image: '/assets/kinetic_sorting.png',
      tag: 'MACHINES',
      specs: ['High-resolution Defect Scan', 'Leaker Detection Probe', 'Non-Destructive Scale Weight'],
      size: 'vertical'
    },
    {
      id: 4,
      title: 'HEPA-Integrated Clean Hub',
      category: 'cleanrooms',
      image: '/assets/clean_hub.png',
      tag: 'FACILITIES',
      specs: ['HEPA H14 Airflow', 'Positive Differential Pressure', 'Aseptic Gowning Hub'],
      size: 'horizontal'
    },
    {
      id: 5,
      title: 'Munich Regional Logistics Center',
      category: 'installations',
      image: '/assets/logistics_center.png',
      tag: 'INSTALLATIONS',
      specs: ['Temp range 15-25°C', 'Autonomous Carts Integration', 'Barcoded Batch Dispatch'],
      size: 'horizontal'
    }
  ];

  const caseStudies = [
    {
      title: 'BioSync Integrated Pipeline',
      tag: 'AUTOMATION',
      year: '2026',
      projCode: 'PROC-BFS-01',
      reduction: 'Reduced cycle time by 40%',
      sensors: 'Increased sterilization accuracy',
      desc: 'A full-stack automation project for a major biotech partner, integrating 12 robotic units with real-time AI quality checking.',
      thumbnail: '/assets/biosync_video.png',
      videoUrl: Vid1
    },
    {
      title: 'Cold-Chain Distribution Hub',
      tag: 'LOGISTICS',
      year: '2025',
      projCode: 'PROC-DIST-03',
      reduction: '50,000 sq ft logistics',
      sensors: 'Continuous atmospheric sensors',
      desc: 'Design and implementation of a temperature-controlled logistics center. Featuring autonomous ground vehicles and continuous atmospheric monitoring sensors.',
      thumbnail: '/assets/cold_chain_video.png',
      videoUrl: Vid1
    }
  ];



  const resolveVideo = (vid) => {
    if (!vid) return '';
    if (vid.startsWith('http') || vid.startsWith('/')) return vid;
    return `${R2_PUBLIC_URL}/${vid}`;
  };

  const openVideo = (title, videoUrl) => {
    const resolvedUrl = resolveVideo(videoUrl);
    console.log("Video URL:", resolvedUrl);
    setVideoModal({ isOpen: true, title, videoUrl: resolvedUrl });
  };

  const closeVideo = () => {
    setVideoModal({ isOpen: false, title: '', videoUrl: '' });
  };

  return (
    <div className="page-container animate-fade-in" style={{ backgroundColor: '#ffffff', paddingBottom: '80px' }}>
      <SEO
        title="Gallery — Manufacturing Facilities & Quality Control"
        description="View our gallery of precision machinery, cleanroom facilities, quality control laboratories and client installations at Alfacure Lifescience's pharmaceutical manufacturing partner."
        canonical="https://alfacurelifescience.com/gallery"
      />
      {/* 1. Hero Header */}
      <section
        className="section"
        style={{
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
          padding: '70px 0 50px',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '32px',
              alignItems: 'center'
            }}
          >
            {/* Left Side */}
            <div style={{ textAlign: 'left' }}>
              <span
                className="badge badge-blue"
                style={{ marginBottom: '14px' }}
              >
                {content?.gallery?.heroBadge || 'FACILITY GALLERY'}
              </span>

              <h1
                style={{
                  fontSize: '2.25rem',
                  fontWeight: 800,
                  color: 'var(--secondary)',
                  marginBottom: '16px',
                  lineHeight: 1.2
                }}
              >
                {content?.gallery?.heroTitle || 'Inside Our Export & Quality Facilities'}
              </h1>

              <p
                style={{
                  maxWidth: '700px',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                  marginBottom: '24px'
                }}
              >
                {content?.gallery?.heroDesc ||
                  'Explore our partner production units, quality-control laboratories, cleanroom environments, and export infrastructure through a curated collection of images.'}
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}
              >
                {[
                  
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: '8px 14px',
                      background: '#ffffff',
                      border: '1px solid var(--border)',
                      borderRadius: '999px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--secondary)'
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side */}
           
          </div>
        </div>
      </section>

      {/* 2. Media Filter & Grid */}
      <section className="section" style={{ padding: '40px 0 80px 0' }}>
        <div className="container">

          {/* Navigation Tabs */}

          {/* Grid Layout */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              justifyContent: 'flex-start'
            }}
          >
            {(content?.gallery?.galleryItems || galleryItems).map((item) => {
              let flexBasis = 'calc(33.333% - 16px)';
              let height = '340px';
              if (item.size === 'horizontal') {
                flexBasis = 'calc(50% - 12px)';
                height = '280px';
              } else if (item.size === 'square') {
                flexBasis = 'calc(33.333% - 16px)';
                height = '340px';
              } else if (item.size === 'vertical') {
                flexBasis = 'calc(33.333% - 16px)';
                height = '440px';
              }

              return (
                <div
                  key={item.id}
                  className="card animate-fade-in"
                  style={{
                    flex: `1 1 ${flexBasis}`,
                    height: height,
                    minWidth: '280px',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                    boxShadow: 'none',
                    borderRadius: '8px'
                  }}
                >
                  <img
                    src={resolveImage(item.image)}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.src = '/assets/production_floor.png';
                    }}
                  />

                  {/* Text details overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(180deg, rgba(10,25,49,0) 0%, rgba(10,25,49,0.95) 100%)',
                      padding: '24px',
                      color: '#ffffff',
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--primary-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.tag}
                    </span>
                    <h3 style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: 700, margin: '2px 0' }}>
                      {item.title}
                    </h3>

                    {/* Specs labels */}
                    <div className="flex" style={{ gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                      {(item.specs || []).map((sp, idx) => (
                        <span key={idx} style={{ fontSize: '0.6rem', fontWeight: 600, backgroundColor: 'rgba(255, 255, 255, 0.15)', color: 'var(--primary-light)', padding: '2px 6px', borderRadius: '3px' }}>
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Operational Process Walkthroughs */}
      <section className="section" style={{ backgroundColor: '#f8fafc', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '60px 0' }}>
        <div className="container">
          <div className="flex justify-between align-center" style={{ marginBottom: '40px', textAlign: 'left', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <h2 className="section-title" style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>Operational Walkthroughs</h2>
              <p className="section-desc">Deep dives into our most complex system deployments. Each case study features an immersive video walkthrough.</p>
            </div>
            <button className="btn btn-outline" onClick={() => navigate('/products')}>
              Browse Product Range
            </button>
          </div>

          {/* Two Case Studies Grid */}
          <div className="grid grid-cols-2" style={{ gap: '32px' }}>
            {(content?.gallery?.caseStudies || caseStudies).map((cs, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', border: '1px solid var(--border)', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden' }}>

                {/* Video Area */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => openVideo(cs.title, cs.videoUrl)}>
                  <img
                    src={resolveImage(cs.thumbnail)}
                    alt={cs.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = '/assets/production_floor.png';
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,91,196,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 16px rgba(0, 91, 196, 0.3)',
                        transition: 'transform 0.2s'
                      }}
                      className="play-btn"
                    >
                      <Play size={20} fill="currentColor" style={{ marginLeft: '4px' }} />
                    </div>
                  </div>
                </div>

                {/* Content Block */}
                <div style={{ padding: '28px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="flex justify-between align-center" style={{ marginBottom: '16px' }}>
                      <div className="flex" style={{ gap: '6px' }}>
                        <span className="badge" style={{ backgroundColor: '#f1f5f9', color: 'var(--text-muted)', fontWeight: 700 }}>{cs.tag}</span>
                        <span className="badge" style={{ backgroundColor: '#f1f5f9', color: 'var(--text-muted)', fontWeight: 700 }}>{cs.year}</span>
                      </div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary)' }}>
                        {cs.projCode}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '12px' }}>{cs.title}</h3>
                    <p style={{ fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '20px', color: 'var(--text-muted)' }}>{cs.desc}</p>

                    {/* Performance Tags */}
                    <div className="flex" style={{ gap: '8px', marginBottom: '24px' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--success)', padding: '4px 8px', borderRadius: '4px' }}>
                        {cs.reduction}
                      </span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, backgroundColor: 'rgba(0,91,196,0.1)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '4px' }}>
                        {cs.sensors}
                      </span>
                    </div>
                  </div>

                  <button
                    className="btn-link"
                    style={{ fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0, justifyContent: 'flex-start', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => {
                      navigate('/support');
                      window.location.hash = 'support';
                    }}
                  >
                    Send Inquiries About Process <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Experience precision firsthand / CTA */}
      <section className="section" style={{ background: 'var(--primary)', color: 'var(--bg-white)', padding: '70px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ color: '#ffffff', fontSize: '2.25rem', fontWeight: 800, marginBottom: '16px' }}>Experience the Precision Firsthand</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.05rem', marginBottom: '32px', lineHeight: '1.6' }}>
            Can't visit our facility in person? Join our next interactive virtual tour led by our Chief Engineers. Experience live demonstrations of our sterile formulations cleanroom.
          </p>
          <div className="flex" style={{ gap: '12px', justifyContent: 'center' }}>
            <button className="btn btn-white" onClick={() => navigate('/support')}>Schedule a Virtual Factory Tour</button>
            <button className="btn btn-white-outline" onClick={() => navigate('/support')}>Contact Sales Team</button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoModal.isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10,25,49,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '24px'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              width: '100%',
              maxWidth: '800px',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(0,0,0,0.15)',
              position: 'relative'
            }}
          >
            {/* Modal Header */}
            <div className="flex justify-between align-center" style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--secondary)' }}>{videoModal.title}</h3>
              <button onClick={closeVideo} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}>
                <X size={20} />
              </button>
            </div>

            {/* Video Player */}
            <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
              <video
                src={videoModal.videoUrl}
                controls
                autoPlay
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Arrow Right Helper
function ArrowRight({ size = 18, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}
