import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Journey', href: '#journey' }
];

const socialLinks = [
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com/vanshikaverma' },
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/vanshikaverma' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@vanshikaverma.com' }
];

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Using dynamic year but could be hardcoded to 2026 based on requirements. Let's hardcode 2026 as per reqs: "© 2026 Vanshika Verma. All rights reserved."

  return (
    <footer className="w-full bg-[var(--color-surface)] border-t border-[var(--color-surface-elevated)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Bio */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Vanshika Verma
            </h2>
            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-6">
              Full Stack Developer focused on backend engineering and scalable systems.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="p-2.5 rounded-full bg-[var(--color-bg)] border border-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface)]"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-text-primary)] mb-6">
              Navigation
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-base text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center group focus:outline-none focus:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4 lg:col-span-3 lg:col-start-10 flex flex-col">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-text-primary)] mb-6">
              Connect
            </h3>
            <a 
              href="mailto:hello@vanshikaverma.com"
              className="text-base font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-2 group mb-2 focus:outline-none focus:underline"
            >
              hello@vanshikaverma.com
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </a>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Available for new opportunities.
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[var(--color-surface-elevated)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            © 2026 Vanshika Verma. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[var(--color-text-secondary)]">
            <span className="opacity-50">Crafted with intention.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
