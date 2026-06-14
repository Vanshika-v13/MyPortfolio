import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#portfolio' },
  { label: 'Skills', href: '#expertise' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
  { label: 'Resume', href: '/resume.pdf', external: true },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Smart nav handler: scroll on homepage, navigate+state on project pages
  const handleNavClick = (item) => {
    if (item.external) return; // let Resume <a> handle itself
    const sectionId = item.href.substring(1); // strip the "#"
    if (location.pathname === '/') {
      // Already on homepage — smooth scroll directly
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // On a project detail or other page — navigate home and signal scroll target
      navigate('/', { state: { scrollTo: sectionId } });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Use actual navbar height as threshold
      // Add a 10px buffer so the active section changes as soon as it clears the navbar
      const navbarHeight = 58;

      const sections = navItems.map(item => item.href.substring(1));
      let current = '';

      for (const section of sections) {
        if (section === 'resume') continue;
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is "active" when its top edge is above the navbar bottom threshold
          // and its bottom edge is still below it (i.e. section is in view past navbar)
          if (rect.top <= navbarHeight && rect.bottom > navbarHeight) {
            current = section;
          }
        }
      }

      // Edge case: scrolled to very bottom → activate contact
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        current = 'contact';
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 transition-all duration-300 py-3"
      style={{
        background: 'rgba(5,11,20,0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Brand */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-shrink-0 font-[800] text-2xl tracking-[0.04em] flex items-center"
        >
          <button
            onClick={() => handleNavClick({ href: '#home' })}
            className="group flex items-baseline transition-all duration-300 hover:brightness-110 bg-transparent border-none cursor-pointer p-0"
          >
            <span className="text-[#E6F1FF]">Vanshika</span>
            <span className="text-[#00E5FF] transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(0,229,255,0.8)]">.</span>
          </button>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          <ul className="flex items-center gap-4 lg:gap-8">
          {navItems.map((item, i) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              
              // Resume is an external link — keep as <a>
              if (item.external) {
                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
                    className="relative group py-2"
                  >
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.5)] text-[#A0AEC0] hover:text-[#00D4FF]"
                    >
                      {item.label}
                    </a>
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00D4FF] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 shadow-[0_0_4px_rgba(0,212,255,0.5)]" />
                  </motion.li>
                );
              }

              return (
                <motion.li 
                  key={item.label} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
                  className="relative group py-2"
                >
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`text-sm font-medium transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.5)] bg-transparent border-none cursor-pointer p-0 ${
                      isActive ? 'text-[#00D4FF]' : 'text-[#A0AEC0] hover:text-[#00D4FF]'
                    }`}
                  >
                    {item.label}
                  </button>
                  {/* Smooth active underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#00D4FF] shadow-[0_0_4px_rgba(0,212,255,0.5)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {/* Hover underline (shows only when not active) */}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00D4FF] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 shadow-[0_0_4px_rgba(0,212,255,0.5)]" />
                  )}
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-2 text-[#A0AEC0] hover:text-[#FFFFFF] focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden absolute top-full left-0 w-full shadow-2xl"
          style={{
            background: 'rgba(5,11,20,0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)'
          }}
        >
          <ul className="px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              
              if (item.external) {
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base font-medium transition-colors text-[#A0AEC0] hover:text-[#00D4FF]"
                    >
                      {item.label}
                    </a>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`block w-full text-left text-base font-medium transition-colors bg-transparent border-none cursor-pointer p-0 ${
                      isActive ? 'text-[#00D4FF]' : 'text-[#A0AEC0] hover:text-[#00D4FF]'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </motion.header>
  );
}
