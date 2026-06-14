import React from 'react';
import { Mail, ChevronUp } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Journey', href: '#journey' }
];

const socialLinks = [
  { icon: FaGithub,   label: 'GitHub',   href: 'https://github.com/Vanshika-v13' },
  { icon: FaLinkedin, label: 'LinkedIn',  href: 'https://www.linkedin.com/in/vanshika13/' },
  { icon: Mail,       label: 'Email',     href: 'mailto:vanshikaverma1310@gmail.com' }
];

const footerStyles = `
  /* ── Reset all link decorations inside the footer ── */
  .vv-footer a,
  .vv-footer a:hover,
  .vv-footer a:focus,
  .vv-footer a:active,
  .vv-footer a:visited {
    text-decoration: none;
    outline: none;
  }

  /* ── Social icon buttons ── */
  .vv-social-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(0, 229, 255, 0.12);
    color: #A9B4C7;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
    flex-shrink: 0;
    cursor: pointer;
    text-decoration: none !important;
  }
  .vv-social-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(0, 229, 255, 0.25);
    color: #E6F1FF;
    box-shadow: 0 0 20px rgba(0, 229, 255, 0.08);
    text-decoration: none !important;
  }
  .vv-social-btn svg {
    width: 18px;
    height: 18px;
    display: block;
  }

  /* ── Navigation links ── */
  .vv-nav-link {
    font-size: 15px;
    color: #A9B4C7;
    transition: color 0.2s ease;
    text-decoration: none !important;
  }
  .vv-nav-link:hover {
    color: #E6F1FF;
    text-decoration: none !important;
  }

  /* ── Connect email link ── */
  .vv-email-link {
    font-size: 15px;
    font-weight: 500;
    color: #E6F1FF;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s ease;
    text-decoration: none !important;
    margin-bottom: 6px;
  }
  .vv-email-link:hover {
    color: #00E5FF;
    text-decoration: none !important;
  }
  .vv-email-link:hover .vv-arrow {
    opacity: 1;
    transform: translate(2px, -2px);
  }
  .vv-arrow {
    opacity: 0.45;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  /* ── Micro-signature ── */
  .vv-signature {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: default;
  }
  .vv-sig-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(0, 229, 255, 0.8);
    box-shadow: 0 0 6px rgba(0, 229, 255, 0.15);
    flex-shrink: 0;
    transition: background 0.2s ease, box-shadow 0.2s ease;
  }
  .vv-signature:hover .vv-sig-dot {
    background: rgba(0, 229, 255, 1);
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.30);
  }
  .vv-sig-line1 {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: #A9B4C7;
    line-height: 1.3;
    transition: color 0.2s ease;
  }
  .vv-sig-line2 {
    font-size: 12px;
    font-weight: 400;
    color: #6B7A90;
    line-height: 1.3;
    transition: color 0.2s ease;
  }
  .vv-signature:hover .vv-sig-line1 {
    color: #E6F1FF;
  }
  .vv-signature:hover .vv-sig-line2 {
    color: #A9B4C7;
  }

  /* ── Scroll-to-top button ── */
  .vv-scroll-top {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(0, 229, 255, 0.12);
    color: #A9B4C7;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }
  .vv-scroll-top:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(0, 229, 255, 0.25);
    color: #E6F1FF;
  }

  /* ── Section heading labels ── */
  .vv-section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6B7A90;
    margin-bottom: 20px;
  }

  /* ── Connect section label (brighter) ── */
  .vv-connect-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #E6F1FF;
    margin: 0;
  }

  /* ── Connect email link ── */
  .vv-connect-email {
    font-size: 15px;
    font-weight: 500;
    color: #E6F1FF;
    text-decoration: none !important;
    transition: color 0.2s ease;
    display: inline-block;
  }
  .vv-connect-email:hover {
    color: #00E5FF;
    text-decoration: none !important;
  }
`;

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="vv-footer w-full pt-16 pb-8" style={{ background: '#050B14', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <style>{footerStyles}</style>

      {/* Subtle ambient glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', left: '-10%', bottom: 0, width: '40%', height: '60%', background: 'radial-gradient(ellipse at left bottom, rgba(30,77,255,0.06) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', right: '-5%', bottom: 0, width: '30%', height: '50%', background: 'radial-gradient(ellipse at right bottom, rgba(0,229,255,0.04) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Three-column upper grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand & Bio */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col">
            <h2 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', color: '#E6F1FF', marginBottom: '12px' }}>
              Vanshika Verma
            </h2>
            <p style={{ fontSize: '14px', color: '#A9B4C7', lineHeight: '1.65', marginBottom: '24px', maxWidth: '300px' }}>
              Full Stack Developer focused on backend engineering and scalable systems.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="vv-social-btn"
                >
                  <link.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
            <p className="vv-section-label">Navigation</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="vv-nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4 lg:col-span-3 lg:col-start-10 flex flex-col">
            <p className="vv-connect-label">Connect</p>

            <p style={{ fontSize: '15px', fontWeight: 500, color: '#E6F1FF', marginTop: '20px', marginBottom: '16px', lineHeight: 1.4 }}>
              Let's build something impactful.
            </p>

            <a
              href="mailto:vanshikaverma1310@gmail.com"
              className="vv-connect-email"
              style={{ marginBottom: '10px' }}
            >
              vanshikaverma1310@gmail.com
            </a>

            <p style={{ fontSize: '13px', color: '#6B7A90' }}>
              Greater Noida, India
            </p>
          </div>

        </div>

        {/* ── Gradient divider ── */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.10), transparent)',
          marginBottom: '28px'
        }} />

        {/* ── Bottom bar: copyright / scroll-top / micro-signature ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">

          {/* Left — copyright */}
          <p style={{ fontSize: '13px', color: '#6B7A90', lineHeight: 1 }}>
            © 2026 Vanshika Verma. All rights reserved.
          </p>

          {/* Center — scroll to top */}
          <button
            onClick={scrollToTop}
            className="vv-scroll-top"
            aria-label="Scroll to top"
          >
            <ChevronUp style={{ width: '16px', height: '16px' }} />
          </button>

          {/* Right — micro-signature */}
          <div className="vv-signature">
            <span className="vv-sig-dot" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span className="vv-sig-line1">Built with React</span>
              <span className="vv-sig-line2">Crafted with intent.</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
