import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Award, Globe, FileCheck, CheckCircle,
  ArrowRight, Star, Microscope, Building2, ClipboardList,
  X, ZoomIn, Download, ExternalLink
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

/* ─── CERTIFICATE DATA ──────────────────────────────────────────────── */

const certificates = [
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
    image: '/assets/cert_who_gmp.png',
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
    image: '/assets/cert_iso_9001.png',
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
    image: '/assets/cert_schedule_m.png',
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
    image: '/assets/cert_export_licence.png',
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
    image: '/assets/cert_ffs_validation.png',
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
    image: '/assets/cert_drug_licence_unit2.png',
    description: 'Gujarat FDCA drug manufacturing licence for Unit 2 covering antibiotic and antifungal injectable formulations.',
  },
];

const qualityBadges = [
  { label: 'Pyrogen-Free', icon: <ShieldCheck size={20} />, desc: 'Tested LAL / rabbit pyrogen' },
  { label: 'Sterility Assured', icon: <CheckCircle size={20} />, desc: 'SAL 10⁻⁶ validated lines' },
  { label: 'Full Traceability', icon: <ClipboardList size={20} />, desc: 'Batch COA & documentation' },
  { label: 'IP / BP / USP', icon: <Star size={20} />, desc: 'Pharmacopoeia compliance' },
  { label: 'Cold-Chain Ready', icon: <Globe size={20} />, desc: 'Temperature-controlled logistics' },
  { label: 'CTD Dossier', icon: <FileCheck size={20} />, desc: 'Full registration support' },
];

const regulatoryApprovals = [
  { region: 'India', body: 'CDSCO', status: 'Active', note: 'Manufacturing Licence' },
  { region: 'West Africa', body: 'NAFDAC / FDFA', status: 'Active', note: 'Product Registration' },
  { region: 'East Africa', body: 'KEBS / TMDA', status: 'Active', note: 'Product Registration' },
  { region: 'Southeast Asia', body: 'FDA (PH) / HSA', status: 'Active', note: 'Dossier Submitted' },
  { region: 'Middle East', body: 'MOH Gulf States', status: 'Active', note: 'Product Registration' },
  { region: 'CIS / Central Asia', body: 'Various NRAs', status: 'Active', note: 'CTD Dossier Ready' },
];

/* ─── MODAL ─────────────────────────────────────────────────────────── */

function CertModal({ cert, onClose }) {
  if (!cert) return null;
  const { resolveImage } = useCMS();

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(13,3,68,0.82)',
        backdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          overflow: 'hidden',
          maxWidth: '860px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 32px 64px rgba(13,3,68,0.4)',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 28px',
            borderBottom: '1px solid var(--border)',
            backgroundColor: 'var(--bg-light)',
            flexShrink: 0,
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: cert.tagColor,
                backgroundColor: `${cert.tagColor}14`,
                padding: '3px 10px',
                borderRadius: '4px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '6px',
              }}
            >
              {cert.tag}
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--blue-dark)', margin: 0 }}>
              {cert.title}
            </h3>
            <div style={{ fontSize: '0.78rem', color: 'var(--blue-light)', marginTop: '2px' }}>
              Cert No: <strong style={{ color: 'var(--blue-dark)' }}>{cert.certNo}</strong>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              color: 'var(--blue-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-light)'; e.currentTarget.style.color = 'var(--blue-dark)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--blue-light)'; }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Certificate Image */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            minHeight: '320px',
          }}
        >
          <img
            src={resolveImage(cert.image)}
            alt={cert.title}
            style={{
              maxWidth: '100%',
              maxHeight: '500px',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            }}
          />
        </div>

        {/* Meta row */}
        <div
          style={{
            padding: '20px 28px',
            borderTop: '1px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            backgroundColor: 'var(--bg-light)',
            flexShrink: 0,
          }}
        >
          {[
            { label: 'Issued By', value: cert.issuedBy },
            { label: 'Valid', value: `${cert.validFrom} – ${cert.validTo}` },
            { label: 'Scope', value: cert.scope },
          ].map((m) => (
            <div key={m.label}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--blue-light)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--blue-dark)', lineHeight: 1.4 }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────── */

export default function Certifications() {
  const navigate = useNavigate();
  const { content, resolveImage } = useCMS();
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <div className="page-container animate-fade-in" style={{ backgroundColor: 'var(--white)' }}>

      {/* ── HERO ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--blue-dark) 0%, #1a4a2e 100%)',
          padding: '100px 0 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '340px', height: '340px', borderRadius: '50%', border: '1px solid rgba(127,161,138,0.15)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '260px', height: '260px', borderRadius: '50%', border: '1px solid rgba(127,161,138,0.10)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            className="animate-fade-in-up"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', border: '1px solid rgba(127,161,138,0.4)', backgroundColor: 'rgba(77,111,90,0.2)', marginBottom: '24px' }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#7FA18A' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7FA18A', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Quality & Compliance
            </span>
          </div>
          <h1 className="animate-fade-in-up" style={{ fontSize: '3rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            {content?.certifications?.heroTitle1 || 'Certifications &'}<br />
            <span style={{ color: '#49a867ff' }}>{content?.certifications?.heroTitle2 || 'Regulatory Approvals'}</span>
          </h1>
          <p className="animate-fade-in-up" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.78)', maxWidth: '600px', lineHeight: 1.65 }}>
            {content?.certifications?.heroDesc || 'Every product we export is backed by internationally recognised certifications, rigorous quality controls, and full regulatory documentation.'}
          </p>
        </div>
      </section>

      {/* ── QUALITY BADGES BAR ── */}
      <section style={{ backgroundColor: 'var(--blue-dark)', padding: '0' }}>
        <div className="container">
          <div className="cert-badges-grid">
            {(content?.certifications?.qualityBadges || qualityBadges).map((b, i) => (
              <div
                key={i}
                style={{
                  padding: '24px 16px',
                  textAlign: 'center',
                  borderRight: i < qualityBadges.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}
              >
                <div style={{ color: '#7FA18A', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>{b.icon}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>{b.label}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATE CARDS ── */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green-dark)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '12px' }}>
              OFFICIAL DOCUMENTS
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--blue-dark)', marginBottom: '16px' }}>
              Our Certificates & Licences
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--blue-light)', maxWidth: '560px', margin: '0 auto' }}>
              Click <strong>View Certificate</strong> on any card to see the full official document.
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '24px' }}>
            {(content?.certifications?.certificates || certificates).map((cert) => (
              <div
                key={cert.id}
                className="card"
                style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    height: '180px',
                    overflow: 'hidden',
                    backgroundColor: '#f0f0f0',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedCert(cert)}
                >
                  <img
                    src={resolveImage(cert.image)}
                    alt={cert.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.4s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                  {/* Zoom hint overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(13,3,68,0)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.3s ease',
                    }}
                    className="cert-thumb-overlay"
                  >
                    <ZoomIn size={28} style={{ color: '#ffffff', opacity: 0, transition: 'opacity 0.3s ease' }} className="cert-zoom-icon" />
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Tag */}
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: cert.tagColor,
                      backgroundColor: `${cert.tagColor}14`,
                      padding: '3px 10px',
                      borderRadius: '4px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '10px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {cert.tag}
                  </span>

                  <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--blue-dark)', marginBottom: '6px', lineHeight: 1.3 }}>
                    {cert.title}
                  </h3>

                  <div style={{ fontSize: '0.75rem', color: 'var(--blue-light)', marginBottom: '12px' }}>
                    Cert No: <span style={{ fontWeight: 600, color: 'var(--blue-dark)' }}>{cert.certNo}</span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--blue-light)', lineHeight: 1.55, flexGrow: 1, marginBottom: '16px' }}>
                    {cert.description}
                  </p>

                  {/* Meta chips */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                    {[
                      { label: 'Issued by', value: cert.issuedBy },
                      { label: 'Valid', value: `${cert.validFrom} – ${cert.validTo}` },
                    ].map((m) => (
                      <div key={m.label} style={{ display: 'flex', gap: '6px', fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--blue-light)', minWidth: '60px' }}>{m.label}:</span>
                        <span style={{ fontWeight: 600, color: 'var(--blue-dark)' }}>{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Status + CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(3,78,28,0.10)',
                        color: 'var(--green-dark)',
                      }}
                    >
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--green-dark)' }} />
                      {cert.status}
                    </span>

                    <button
                      className="btn btn-primary btn-shine"
                      style={{
                        backgroundColor: 'var(--green-dark)',
                        fontSize: '0.78rem',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        gap: '6px',
                      }}
                      onClick={() => setSelectedCert(cert)}
                    >
                      <ZoomIn size={13} /> View Certificate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGULATORY APPROVALS TABLE ── */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--white)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green-dark)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '12px' }}>
              GLOBAL REACH
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--blue-dark)', marginBottom: '16px' }}>
              Regulatory Approvals by Region
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--blue-light)', maxWidth: '560px', margin: '0 auto' }}>
              Our products are registered or in active registration with regulatory authorities across 25+ countries.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--blue-dark)', color: '#ffffff' }}>
                  {['Region', 'Regulatory Body', 'Status', 'Details'].map((h) => (
                    <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(content?.certifications?.regulatoryApprovals || regulatoryApprovals).map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', backgroundColor: i % 2 === 0 ? 'var(--white)' : 'var(--bg-light)' }}>
                    <td style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--blue-dark)' }}>{row.region}</td>
                    <td style={{ padding: '14px 20px', color: 'var(--blue-light)' }}>{row.body}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700, backgroundColor: 'rgba(3,78,28,0.10)', color: 'var(--green-dark)' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--green-dark)' }} />
                        {row.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', color: 'var(--blue-light)' }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          <div className="cta-banner">
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} />
            <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
            <h2 style={{ color: '#ffffff', fontSize: '2rem', fontWeight: 700, marginBottom: '16px', position: 'relative', zIndex: 2 }}>
              Need Compliance Documentation?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 36px', position: 'relative', zIndex: 2 }}>
              We provide full CTD dossiers, certificates of analysis, GMP certificates and regulatory submission support for all markets.
            </p>
            <div className="hero-buttons" style={{ justifyContent: 'center', position: 'relative', zIndex: 2 }}>
              <button
                className="btn btn-shine"
                style={{ backgroundColor: '#ffffff', color: 'var(--blue-dark)', fontWeight: 700, border: 'none', padding: '14px 32px', borderRadius: '6px' }}
                onClick={() => navigate('/support')}
              >
                Request Documentation <ArrowRight size={14} style={{ marginLeft: '4px' }} />
              </button>
              <button
                className="btn"
                style={{ backgroundColor: 'transparent', border: '1.5px solid rgba(255,255,255,0.4)', color: '#ffffff', padding: '14px 32px', borderRadius: '6px' }}
                onClick={() => navigate('/products')}
              >
                View Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />

    </div>
  );
}
