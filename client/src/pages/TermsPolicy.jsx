import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

/* ─── DATA ─────────────────────────────────────────────────────────── */

const sections = [
  {
    id: 'terms',
    label: 'Terms of Use',
    content: [
      {
        heading: '1. Acceptance of Terms',
        body: `By accessing and using the Alfacure Lifescience website (the "Site"), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must not use this Site. These terms apply to all visitors, users, and others who access or use the Site.`,
      },
      {
        heading: '2. Use of Site Content',
        body: `All content on this Site — including text, images, product descriptions, certifications, and downloadable documents — is provided for informational purposes only. The content is the intellectual property of Alfacure Lifescience Pvt. Ltd. and may not be reproduced, distributed, or transmitted in any form without prior written permission.`,
      },
      {
        heading: '3. Product & Medical Information Disclaimer',
        body: `Product information on this Site is intended for licensed healthcare professionals, hospitals, distributors, and regulatory professionals only. Nothing on this Site constitutes medical advice, diagnosis, or treatment recommendations for end consumers. Always consult a qualified healthcare provider. Products may not be available or approved in all jurisdictions.`,
      },
      {
        heading: '4. Export Compliance',
        body: `Alfacure Lifescience exports pharmaceutical products in compliance with applicable Indian export laws, the Drugs and Cosmetics Act, and the regulations of destination countries. Any party seeking to import our products is solely responsible for ensuring compliance with their local regulatory requirements.`,
      },
      {
        heading: '5. Limitation of Liability',
        body: `To the fullest extent permitted by law, Alfacure Lifescience Pvt. Ltd. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this Site or its content. Our liability in connection with any product or service shall not exceed the value of the relevant transaction.`,
      },
      {
        heading: '6. Third-Party Links',
        body: `This Site may contain links to third-party websites for your convenience. We do not control, endorse, or assume any responsibility for the content, privacy policies, or practices of any third-party sites. We encourage you to review the terms and privacy policies of any third-party site you visit.`,
      },
      {
        heading: '7. Modifications',
        body: `We reserve the right to modify these Terms of Use at any time. Changes take effect immediately upon posting to the Site. Your continued use of the Site following any changes constitutes your acceptance of the revised terms. We recommend reviewing this page periodically.`,
      },
      {
        heading: '8. Governing Law',
        body: `These Terms of Use are governed by and construed in accordance with the laws of the Republic of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat, India.`,
      },
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    content: [
      {
        heading: '1. Information We Collect',
        body: `We collect information you voluntarily provide when you submit an inquiry, request a quote, or contact us — including your name, company name, email address, phone number, country, and the nature of your inquiry. We may also collect anonymised technical data (browser type, IP address, pages visited) via standard analytics tools for site improvement.`,
      },
      {
        heading: '2. How We Use Your Information',
        body: `Information you provide is used to: respond to your inquiries and quote requests; process export and business development communications; send relevant product updates or regulatory news (with your consent); comply with legal obligations; and improve the quality of our services and website experience.`,
      },
      {
        heading: '3. Data Sharing',
        body: `We do not sell, rent, or trade your personal information to third parties. We may share your data with trusted service providers who assist in our operations (e.g., email platforms, CRM tools) under strict confidentiality agreements. We may also disclose information when required by law or to protect the rights and safety of Alfacure Lifescience and its stakeholders.`,
      },
      {
        heading: '4. Data Retention',
        body: `We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable laws and regulations. Inquiry and correspondence records are typically retained for 5 years in accordance with Indian business record-keeping requirements.`,
      },
      {
        heading: '5. Security',
        body: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
      },
      {
        heading: '6. Cookies',
        body: `Our Site uses essential cookies to ensure proper functionality and may use analytical cookies to understand how visitors interact with the Site. You can control cookie settings through your browser preferences. Disabling certain cookies may affect Site functionality.`,
      },
      {
        heading: '7. Your Rights',
        body: `Depending on your jurisdiction, you may have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your data; withdraw consent where processing is consent-based; lodge a complaint with your local data protection authority. To exercise any of these rights, please contact us at the details below.`,
      },
      {
        heading: '8. Contact for Privacy Matters',
        body: `If you have any questions or concerns about our Privacy Policy or the handling of your personal data, please contact: Alfacure Lifescience Pvt. Ltd., Ahmedabad, Gujarat, India — Email: info@alfacurelifescience.com — Phone: +91 98795 00383`,
      },
    ],
  },
  {
    id: 'cookie',
    label: 'Cookie Policy',
    content: [
      {
        heading: 'What Are Cookies?',
        body: `Cookies are small text files placed on your device when you visit a website. They help websites function properly, remember your preferences, and provide site owners with anonymised analytics. Cookies do not contain personally identifiable information.`,
      },
      {
        heading: 'Cookies We Use',
        body: `Essential cookies: required for the Site to function correctly (e.g., session management). Analytical cookies: help us understand how visitors use the Site (e.g., page views, traffic sources) via anonymised analytics. We do not use advertising or tracking cookies.`,
      },
      {
        heading: 'Managing Cookies',
        body: `You can control and/or delete cookies through your browser settings. You can delete all cookies that are already on your device and set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit the Site.`,
      },
    ],
  },
  {
    id: 'regulatory',
    label: 'Regulatory Disclaimer',
    content: [
      {
        heading: 'Product Availability',
        body: `Products listed on this Site may not be approved or registered in all countries. Alfacure Lifescience and Realcade Lifescience Pvt. Ltd. make no representations that the products described are available or suitable for use in your country. It is the responsibility of the importing entity to confirm local regulatory status.`,
      },
      {
        heading: 'Not for Direct Consumer Use',
        body: `This website is intended solely for licensed pharmaceutical distributors, healthcare institutions, government procurement agencies, and regulatory professionals. Products described on this Site are prescription-only or hospital-use pharmaceutical preparations and must not be purchased by or administered without professional medical supervision.`,
      },
      {
        heading: 'Accuracy of Information',
        body: `While we strive to ensure all product specifications, certifications, and regulatory information are accurate and up to date, pharmaceutical regulations and product registrations are subject to change. We recommend contacting our business development team for the most current regulatory status of any product in your target market.`,
      },
    ],
  },
];

/* ─── COMPONENT ────────────────────────────────────────────────────── */

export default function TermsPolicy() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('terms');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeSection = sections.find((s) => s.id === activeTab);

  return (
    <div className="page-container animate-fade-in" style={{ backgroundColor: 'var(--bg-light)' }}>
      <SEO
        title="Terms of Use & Privacy Policy"
        description="Terms of Use and Privacy Policy for Alfacure Lifescience Pvt. Ltd. website. Information about use of site content, product disclaimers, export compliance, and data privacy."
        canonical="https://alfacurelifescience.com/legal"
      />
      {/* ── HERO ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--blue-dark) 0%, #12263a 100%)',
          padding: '90px 0 64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', border: '1px solid rgba(127,161,138,0.12)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            className="animate-fade-in-up"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', border: '1px solid rgba(127,161,138,0.35)', backgroundColor: 'rgba(77,111,90,0.18)', marginBottom: '24px' }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#7FA18A' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7FA18A', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Legal & Compliance
            </span>
          </div>

          <h1 className="animate-fade-in-up" style={{ fontSize: '2.75rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '18px' }}>
            Terms, Policies &<br />
            <span style={{ color: '#49a867ff' }}>Regulatory Notices</span>
          </h1>
          <p className="animate-fade-in-up" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.72)', maxWidth: '580px', lineHeight: 1.65 }}>
            This page outlines the legal terms governing your use of our website, how we handle your personal data, and important regulatory disclaimers applicable to our pharmaceutical products.
          </p>
          <p className="animate-fade-in-up" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.42)', marginTop: '20px' }}>
            Last updated: July 2025
          </p>
        </div>
      </section>

      {/* ── TAB NAV ── */}
      <section style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 'var(--header-height)', zIndex: 10 }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                style={{
                  padding: '18px 24px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === s.id ? '2px solid var(--green-dark)' : '2px solid transparent',
                  color: activeTab === s.id ? 'var(--green-dark)' : 'var(--blue-light)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCORDION CONTENT ── */}
      <section style={{ padding: '64px 0 100px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--blue-dark)', marginBottom: '8px' }}>
              {activeSection.label}
            </h2>
            <div style={{ height: '3px', width: '48px', backgroundColor: 'var(--green-dark)', borderRadius: '2px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeSection.content.map((item, i) => {
              const key = `${activeTab}-${i}`;
              const isOpen = !!openItems[key];
              return (
                <div
                  key={key}
                  style={{
                    backgroundColor: 'var(--white)',
                    borderRadius: '10px',
                    border: `1px solid ${isOpen ? 'var(--green-dark)' : 'var(--border)'}`,
                    overflow: 'hidden',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <button
                    onClick={() => toggleItem(key)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--blue-dark)' }}>
                      {item.heading}
                    </span>
                    <span style={{ flexShrink: 0, color: 'var(--green-dark)' }}>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 24px 24px',
                        fontSize: '0.9rem',
                        color: 'var(--blue-light)',
                        lineHeight: 1.75,
                        borderTop: '1px solid var(--border)',
                        paddingTop: '20px',
                      }}
                    >
                      {item.body}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick contact strip */}
          <div
            style={{
              marginTop: '56px',
              padding: '28px 32px',
              borderRadius: '12px',
              backgroundColor: 'var(--primary-light)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: 'var(--blue-dark)', marginBottom: '4px' }}>
                Questions about our policies?
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--blue-light)' }}>
                Contact our compliance team at{' '}
                <a href="mailto:info@alfacurelifescience.com" style={{ color: 'var(--green-dark)', fontWeight: 600 }}>
                  info@alfacurelifescience.com
                </a>
              </div>
            </div>
            <button
              className="btn btn-primary btn-shine"
              style={{ backgroundColor: 'var(--green-dark)', borderRadius: '6px', flexShrink: 0 }}
              onClick={() => navigate('/support')}
            >
              Contact Us <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
