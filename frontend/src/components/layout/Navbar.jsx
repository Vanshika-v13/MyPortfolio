import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#portfolio' },
  { label: 'Skills', href: '#expertise' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
  { label: 'Resume', href: '#resume' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = navItems.map(item => item.href.substring(1));
      let current = '';
      
      // If we are at the very top, we might not be in any of the nav sections, but could default to 'home' if it existed.
      // We will check which section is currently active
      for (const section of sections) {
        if (section === 'resume') continue; 
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is near or above the middle of viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      
      // Edge case: if we scrolled all the way to the bottom, active section should be the last one
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        current = 'contact';
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
      style={{
        background: isScrolled ? 'rgba(5,11,20,0.65)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Brand */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-shrink-0 font-bold text-2xl tracking-[0.02em] text-[#FFFFFF]"
        >
          <a href="#home" className="transition-all duration-300 hover:text-[#00D4FF] drop-shadow-[0_0_4px_rgba(0,212,255,0.2)] hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]">
            VV.
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item, i) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              
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
                    className={`text-sm font-medium transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.5)] ${
                      isActive ? 'text-[#00D4FF]' : 'text-[#A0AEC0] hover:text-[#00D4FF]'
                    }`}
                  >
                    {item.label}
                  </a>
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
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00D4FF] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 shadow-[0_0_4px_rgba(0,212,255,0.5)]"></span>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 lg:hidden">
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
          className="lg:hidden absolute top-full left-0 w-full shadow-2xl"
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
              
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-base font-medium transition-colors ${
                      isActive ? 'text-[#00D4FF]' : 'text-[#A0AEC0] hover:text-[#00D4FF]'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </motion.header>
  );
}
