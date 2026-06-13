import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectsGrid from '../portfolio/ProjectsGrid';
import CertificatesGrid from '../portfolio/CertificatesGrid';

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' }
];

export default function PortfolioShowcase() {
  const [activeTab, setActiveTab] = useState('projects');

  const handleKeyDown = (e, index) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % TABS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + TABS.length) % TABS.length;
    }
    
    if (nextIndex !== index) {
      e.preventDefault();
      setActiveTab(TABS[nextIndex].id);
      // Focus the new tab
      document.getElementById(`tab-${TABS[nextIndex].id}`)?.focus();
    }
  };

  return (
    <section id="portfolio" className="relative min-h-screen pt-4 pb-24 md:pt-10 md:pb-32 overflow-hidden bg-[#050B14]">
      
      {/* STRUCTURAL DEPTH BACKGROUND - CONNECTED TO HERO */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#050B14] overflow-hidden">
        {/* Top blend gradient to connect with Hero section smoothly */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#050B14] to-transparent z-10"></div>
        
        {/* Main base plane */}
        <div className="absolute inset-0 bg-[#050B14]"></div>

        {/* Ambient Glows for Depth */}
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-[#1E4DFF] opacity-[0.09] blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#00E5FF] opacity-[0.07] blur-[120px] rounded-full mix-blend-screen"></div>

        {/* Diagonal structural plane 1 - Engineered Depth */}
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[120%] bg-[#071425] transform rotate-[8deg] translate-x-[15%] border-l border-white/[0.02]"></div>
        
        {/* Diagonal structural plane 2 - Supporting surface */}
        <div className="absolute bottom-[-15%] left-[-5%] w-[70%] h-[70%] bg-[#071425] transform -rotate-[4deg] border-t border-r border-white/[0.015]"></div>
        
        {/* Extremely subtle structural intersection plane */}
        <div className="absolute top-[30%] left-[-20%] w-[140%] h-[40%] bg-[#071425] transform rotate-[15deg] opacity-60 mix-blend-overlay border-y border-white/[0.01]"></div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] mb-4 uppercase"
          >
            Portfolio Showcase
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#00E5FF] text-xs md:text-sm font-medium tracking-wide uppercase"
          >
            Selected Work & Certifications
          </motion.p>
        </div>

        {/* Custom Tab System */}
        <div className="flex justify-center mb-12">
          <div 
            className="relative flex items-center p-1 bg-[var(--color-surface)] rounded-full border border-[var(--color-surface-elevated)] shadow-subtle"
            role="tablist"
            aria-label="Portfolio sections"
          >
            {TABS.map((tab, index) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`relative px-6 py-2.5 text-sm font-medium rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] z-10 ${
                    isActive ? 'text-[var(--color-bg)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-[var(--color-text-primary)] rounded-full -z-10"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                id="panel-projects"
                role="tabpanel"
                aria-labelledby="tab-projects"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectsGrid />
              </motion.div>
            )}
            
            {activeTab === 'certificates' && (
              <motion.div
                key="certificates"
                id="panel-certificates"
                role="tabpanel"
                aria-labelledby="tab-certificates"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <CertificatesGrid />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
