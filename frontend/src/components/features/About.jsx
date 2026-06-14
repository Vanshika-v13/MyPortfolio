import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSectionAnimation } from '../../hooks/useSectionAnimation';

import { WorkspaceComposition } from './workspace/WorkspaceComposition';
const Background = ({ isPlaying }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={isPlaying ? { opacity: 1 } : { opacity: 0 }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#050B14]"
  >
    <style>{`
      @keyframes rotate-architectural {
        0% { transform: rotate(0deg) translate(0px, 0px) scale(1); }
        50% { transform: rotate(180deg) translate(20px, -20px) scale(1.03); }
        100% { transform: rotate(360deg) translate(0px, 0px) scale(1); }
      }
      .animate-architectural {
        animation: rotate-architectural 24s ease-in-out infinite;
        transform-origin: center center;
      }
    `}</style>

    {/* Layer 1 — Gradient Mesh Background (Asymmetric Lighting) */}
    <div 
      className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#1E4DFF] opacity-[0.08] blur-[180px] rounded-full mix-blend-screen pointer-events-none"
    />
    <div 
      className="absolute bottom-[-15%] right-[-10%] w-[80vw] h-[80vw] bg-[#00E5FF] opacity-[0.06] blur-[180px] rounded-full mix-blend-screen pointer-events-none"
    />

    {/* Layer 2 — Architectural Abstract Shapes (Animated, 2-4% Opacity) */}
    <div className="absolute inset-0 w-full h-full animate-architectural opacity-[0.28]">
      {/* Curved arcs & incomplete rings */}
      <div className="absolute top-[-10%] left-[5%] w-[800px] h-[800px] rounded-full border-[1.5px] border-dashed border-[rgba(0,229,255,0.08)] opacity-[0.21]" />
      <div className="absolute bottom-[10%] right-[5%] w-[700px] h-[700px] rounded-full border-[1.5px] border-[rgba(30,77,255,0.12)] border-t-transparent border-r-transparent opacity-[0.28]" />
      <div className="absolute top-[25%] left-[20%] w-[500px] h-[500px] rounded-full border-[2px] border-[rgba(0,229,255,0.06)] border-b-transparent opacity-[0.17]" />
      <div className="absolute bottom-[-5%] left-[15%] w-[400px] h-[400px] rounded-full border-[1px] border-[rgba(0,229,255,0.08)] border-l-transparent opacity-[0.21]" />
      {/* Additional architectural geometries */}
      <div className="absolute top-[40%] right-[15%] w-[350px] h-[350px] rounded-full border-[1.5px] border-[rgba(0,229,255,0.05)] border-r-transparent opacity-[0.24]" />
    </div>

    {/* Layer 3 — Premium Glass Noise Texture (0.8% Opacity) */}
    <div className="absolute inset-0 opacity-[0.0056] mix-blend-overlay">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilterAbout">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilterAbout)" />
      </svg>
    </div>

    {/* Layer 4 — Edge Vignette */}
    <div 
      className="absolute inset-0 opacity-100 pointer-events-none" 
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(5,11,20,0) 30%, rgba(5,11,20,0.85) 75%, #050B14 100%)'
      }} 
    />

    {/* Layer 7 — Transparent Contour Wave Patterns (1.2% Opacity, 20px blur) */}
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
      style={{ opacity: 0.0084, filter: 'blur(20px)' }}
    >
      <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M-100,150 C250,50 550,350 950,150 C1150,50 1450,250 1600,200" stroke="rgba(0, 229, 255, 0.5)" strokeWidth="1.5" />
        <path d="M-100,230 C250,130 550,430 950,230 C1150,130 1450,330 1600,280" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1.5" />
        <path d="M-100,310 C250,210 550,510 950,310 C1150,210 1450,410 1600,360" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1.5" />
        <path d="M-100,390 C250,290 550,590 950,390 C1150,290 1450,490 1600,440" stroke="rgba(0, 229, 255, 0.3)" strokeWidth="1.5" />
        <path d="M-100,470 C250,370 550,670 950,470 C1150,370 1450,570 1600,520" stroke="rgba(0, 229, 255, 0.2)" strokeWidth="1.5" />
      </svg>
    </div>
  </motion.div>
);

export default function About() {
  const isPlaying = useSectionAnimation('about');

  const stats = [
    { value: '10+', label: 'Projects Done' },
    { value: '15+', label: 'Tech Tools' },
    { value: '500+', label: 'Coding Problems' },
    { value: '3+', label: 'Major Certs' }
  ];

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen bg-[#050B14] flex flex-col overflow-hidden pt-20 pb-12 md:pt-28 md:pb-16"
    >
      <Background isPlaying={isPlaying} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col flex-grow box-border">
        
        {/* SECTION HEADER */}
        <div className="relative flex justify-center mb-10 md:mb-14 w-full flex-shrink-0">
          {/* Header Architectural Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none flex items-center justify-center overflow-hidden z-0" style={{ opacity: 0.014, filter: 'blur(10px)' }}>
            <div className="absolute w-[400px] h-[400px] rounded-full border-[2px] border-[#00E5FF] border-t-transparent border-r-transparent" />
            <div className="absolute w-[500px] h-[500px] rounded-full border-[1px] border-[#1E4DFF] border-b-transparent" />
            <div className="absolute w-[300px] h-[300px] rounded-full border-[3px] border-dashed border-[#00E5FF] border-l-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={isPlaying ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="text-center relative z-10"
          >
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#FFFFFF] tracking-tight mb-1 uppercase">
              ABOUT ME
            </h2>
            <p className="text-[#00E5FF] text-xs md:text-sm font-medium tracking-wide uppercase">
              Building Real Digital Products
            </p>
          </motion.div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full flex-grow overflow-hidden">
          
          {/* LEFT SIDE: WORKSTATION COMPOSITION */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isPlaying ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="col-span-1 lg:col-span-6 flex justify-center items-center w-full h-full relative"
          >
            <WorkspaceComposition />
          </motion.div>

          {/* RIGHT SIDE: CONTENT & CALL TO ACTIONS */}
          {/* Plain wrapper — no motion here; each child animates independently to avoid transform composition conflicts */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-center w-full h-full py-2">

            {/* Heading & Paragraph — enter from right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isPlaying ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mb-4"
            >
              <h3 className="text-xl md:text-2xl font-[800] tracking-tight mb-1 text-[#E6F1FF]">
                WHO I AM
              </h3>
              <p className="text-[#A9B4C7] leading-[1.8] max-w-[600px] text-xs md:text-sm font-[400] mb-2">
                I'm a B.Tech Computer Science student at Amity University, Uttar Pradesh (Class of 2027), passionate about building scalable web applications and solving real-world problems through technology. My foundation in Data Structures & Algorithms, Object-Oriented Programming, and Full Stack Development allows me to create efficient, user-centric digital experiences with a strong focus on performance and usability.
              </p>
              <p className="text-[#A9B4C7] leading-[1.8] max-w-[600px] text-xs md:text-sm font-[400]">
                Currently, I'm expanding my expertise in the MERN Stack while exploring AI-powered integrations to build smarter and more impactful web solutions. I enjoy turning ideas into practical products, continuously learning modern technologies, and writing clean, maintainable code that delivers meaningful results.
              </p>
            </motion.div>

            {/* Premium CTA Buttons — enter from bottom, independent origin */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isPlaying ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: 0.15 }}
              className="flex items-center gap-4 mb-5 flex-shrink-0"
            >
              {/* RESUME BUTTON: Glassmorphism Secondary */}
              <a 
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 h-[46px] rounded-[12px] font-semibold text-[#E6F1FF] transition-all duration-300 hover:-translate-y-[2px] text-xs md:text-sm backdrop-blur-[14px]"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(0,229,255,0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,229,255,0.5)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0,229,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,229,255,0.25)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                </svg>
                Resume
              </a>

              {/* MY PROJECTS BUTTON: Gradient Primary */}
              <button
                onClick={() => {
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="flex items-center justify-center gap-2 px-6 h-[46px] rounded-[12px] font-semibold text-white transition-all duration-300 hover:scale-[1.03] text-xs md:text-sm"
                style={{
                  background: 'linear-gradient(135deg, #1E4DFF, #00E5FF)',
                  boxShadow: '0 0 30px rgba(0,229,255,0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(0,229,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0,229,255,0.25)';
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm6.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
                </svg>
                My Projects
              </button>
            </motion.div>

            {/* Stats Cards — enter from bottom with stagger, independent origin */}
            <div className="grid grid-cols-4 gap-2 w-full max-w-[520px]">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isPlaying ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 * (i + 1) }}
                  whileHover={{ 
                    y: -2, 
                    boxShadow: '0 4px 15px rgba(0,229,255,0.08)',
                    transition: { duration: 0.2 } 
                  }}
                  className="relative py-2.5 px-2 rounded-[12px] flex flex-col justify-center text-center group transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(0,229,255,0.1)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(0,229,255,0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(0,229,255,0.1)';
                  }}
                >
                  <h4 className="text-lg md:text-2xl font-[800] text-[#E6F1FF] mb-0.5 group-hover:text-[#00E5FF] transition-colors duration-200">{stat.value}</h4>
                  <p className="text-[10px] font-[600] text-[#6B7A90] uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
