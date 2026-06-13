import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TerminalSimulation = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [lines, setLines] = useState([]);

  const sequence = [
    { text: "MongoDB Connected ✓", color: "text-[#4CFF88]" },
    { text: "Redis Cache Hit ✓", color: "text-[#4DA3FF]" },
    { text: "Server Running ✓", color: "text-[#4CFF88]" },
    { text: "JWT Verified ✓", color: "text-[#4DA3FF]" },
    { text: "API Response 200 OK ✓", color: "text-[#4CFF88]" },
    { text: "Docker Container Running ✓", color: "text-[#4DA3FF]" }
  ];

  useEffect(() => {
    if (lineIndex >= sequence.length) {
      const timeout = setTimeout(() => {
        setLines([]);
        setLineIndex(0);
        setCharIndex(0);
      }, 5000);
      return () => clearTimeout(timeout);
    }

    const currentItem = sequence[lineIndex];

    if (charIndex < currentItem.text.length) {
      const timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, Math.random() * 20 + 10);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, currentItem]);
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, charIndex]);

  const currentItem = sequence[lineIndex];
  const currentText = currentItem ? currentItem.text.substring(0, charIndex) : '';

  return (
    <div className="font-mono text-[10px] sm:text-[11px] md:text-[12px] leading-[1.8] flex flex-col text-left w-full h-full tracking-tight">
      {lines.map((line, i) => (
        <div key={i} className={line.color}>{line.text}</div>
      ))}
      {lineIndex < sequence.length && (
        <div className="flex">
          <span className={currentItem.color}>
            {currentText}
          </span>
          <span className="w-1.5 h-3 bg-[#00E5FF] ml-1 animate-pulse mt-[4px]"></span>
        </div>
      )}
      {lineIndex >= sequence.length && (
        <div className="flex">
          <span className="w-1.5 h-3 bg-[#00E5FF] ml-1 animate-pulse mt-[4px]"></span>
        </div>
      )}
    </div>
  );
};

const Background = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
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
      className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#1E4DFF] opacity-[0.014] blur-[180px] rounded-full mix-blend-screen"
    />
    <div 
      className="absolute bottom-[-15%] left-[-10%] w-[80vw] h-[80vw] bg-[#1E4DFF] opacity-[0.035] blur-[180px] rounded-full mix-blend-screen"
    />
    <div 
      className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-[#00E5FF] opacity-[0.007] blur-[180px] rounded-full mix-blend-screen"
    />
    <div 
      className="absolute bottom-[-15%] right-[-10%] w-[80vw] h-[80vw] bg-[#00E5FF] opacity-[0.014] blur-[180px] rounded-full mix-blend-screen"
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
      className="absolute inset-0 opacity-100" 
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(5,11,20,0) 30%, rgba(5,11,20,0.85) 75%, #050B14 100%)'
      }} 
    />

    {/* Layer 5 — Ambient Lighting Behind Content */}
    <div 
      className="absolute top-[35%] left-[15%] w-[450px] h-[450px] bg-[#1E4DFF] opacity-[0.028] blur-[200px] rounded-full mix-blend-screen"
    />
    <div 
      className="absolute top-[40%] right-[15%] w-[450px] h-[450px] bg-[#00E5FF] opacity-[0.028] blur-[180px] rounded-full mix-blend-screen"
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

const TechBadge = ({ icon, label, style }) => (
  <motion.div
    animate={{ y: [0, -4, 0] }}
    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
    className="absolute z-30 px-3.5 py-1.5 rounded-[12px] flex items-center gap-2 text-[#E6F1FF] text-[11px] font-semibold shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-[rgba(0,229,255,0.15)] hover:border-[rgba(0,229,255,0.4)] transition-all duration-300 backdrop-blur-[12px] bg-gradient-to-br from-white/[0.03] to-transparent hover:-translate-y-[2px]"
    style={style}
  >
    <div className="w-4 h-4 flex items-center justify-center text-[#00E5FF]">
      {icon}
    </div>
    <span className="tracking-wide">{label}</span>
  </motion.div>
);

export default function About() {
  const stats = [
    { value: '140+', label: 'DSA Problems' },
    { value: '3+', label: 'Major Projects' },
    { value: '9.29', label: 'CGPA' }
  ];

  return (
    <section 
      id="about" 
      className="relative w-full h-screen min-h-screen max-h-screen bg-[#050B14] flex flex-col justify-center items-center overflow-hidden"
    >
      <Background />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-between h-full py-4 lg:py-6 box-border">
        
        {/* SECTION HEADER */}
        <div className="relative flex justify-center mb-2 lg:mb-4 w-full flex-shrink-0">
          {/* Header Architectural Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none flex items-center justify-center overflow-hidden z-0" style={{ opacity: 0.014, filter: 'blur(10px)' }}>
            <div className="absolute w-[400px] h-[400px] rounded-full border-[2px] border-[#00E5FF] border-t-transparent border-r-transparent" />
            <div className="absolute w-[500px] h-[500px] rounded-full border-[1px] border-[#1E4DFF] border-b-transparent" />
            <div className="absolute w-[300px] h-[300px] rounded-full border-[3px] border-dashed border-[#00E5FF] border-l-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full flex-grow overflow-hidden">
          
          {/* LEFT SIDE: WORKSTATION COMPOSITION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-6 flex justify-center items-center w-full h-full relative"
          >
            {/* Developer Workspace Integration */}
            <div className="relative flex items-center justify-center w-full max-w-[620px] aspect-[16/10] group">
              
              {/* Realistic Workstation Asset with Masking */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/src/assets/workstation.png" 
                  alt="Developer Workstation"
                  className="w-full h-full object-contain pointer-events-none select-none transition-transform duration-700 group-hover:scale-[1.01]"
                  style={{
                    maskImage: 'radial-gradient(circle at 50% 50%, black 50%, rgba(0, 0, 0, 0.6) 70%, transparent 95%)',
                    WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 50%, rgba(0, 0, 0, 0.6) 70%, transparent 95%)',
                  }}
                />
                
                {/* Ambient lights overlay falling onto the workstation */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E4DFF]/15 via-transparent to-[#00E5FF]/10 mix-blend-screen pointer-events-none" />
                <div className="absolute inset-0 bg-[#00E5FF]/5 mix-blend-color-dodge pointer-events-none" />
              </div>

              {/* Floating Tech Badges (Matched to reference positions) */}
              <TechBadge 
                label="React"
                style={{ top: '2%', left: '8%' }}
                icon={
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-current">
                    <circle cx="50" cy="50" r="8" fill="currentColor" />
                    <ellipse cx="50" cy="50" rx="38" ry="14" strokeWidth="2" />
                    <ellipse cx="50" cy="50" rx="38" ry="14" strokeWidth="2" transform="rotate(60 50 50)" />
                    <ellipse cx="50" cy="50" rx="38" ry="14" strokeWidth="2" transform="rotate(120 50 50)" />
                  </svg>
                }
              />
              <TechBadge 
                label="Node.js"
                style={{ top: '8%', left: '42%' }}
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 2c-.37 0-.73.19-.94.51L6.15 9.76c-.2.31-.2.71 0 1.02l4.91 7.25c.21.32.57.51.94.51s.73-.19.94-.51l4.91-7.25c.2-.31.2-.71 0-1.02L12.94 2.51c-.21-.32-.57-.51-.94-.51zm0 1.83l3.96 5.85-3.96 5.85-3.96-5.85L12 3.83z" />
                  </svg>
                }
              />
              <TechBadge 
                label="MongoDB"
                style={{ top: '15%', right: '10%' }}
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 1.5c-.37 0-.72.18-.93.49C8.3 6.07 7 10.73 7 13.5c0 3.04 2.24 5.5 5 5.5s5-2.46 5-5.5c0-2.77-1.3-7.43-4.07-11.51-.21-.31-.56-.49-.93-.49zM12 4c1.8 3.1 3 6.9 3 9.5 0 1.93-1.34 3.5-3 3.5s-3-1.57-3-3.5c0-2.6 1.2-6.4 3-9.5z" />
                  </svg>
                }
              />
              <TechBadge 
                label="Redis"
                style={{ top: '48%', right: '3%' }}
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 6L4.5 11l7.5 3.5 7.5-3.5L12 8zm0 6l-7.5 3.5L12 21l7.5-3.5L12 14z" />
                  </svg>
                }
              />
              <TechBadge 
                label="Docker"
                style={{ bottom: '25%', left: '4%' }}
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M2 3h4v4H2V3zm6 0h4v4H8V3zm6 0h4v4h-4V3zM2 9h4v4H2V9zm6 0h4v4H8V9zm6 0h4v4h-4V9zm6 0h4v4h-4V9zM2 15h4v4H2v-4zm6 0h4v4H8v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
                  </svg>
                }
              />
              <TechBadge 
                label="JWT"
                style={{ bottom: '5%', left: '38%' }}
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3 0 1.09-.59 2.04-1.46 2.56L15 17h-6l1.46-4.44C9.59 12.04 9 11.09 9 10c0-1.66 1.34-3 3-3z" />
                  </svg>
                }
              />
              
              {/* Interactive Terminal aligned inside the monitor screen (70-80% scale focal point) */}
              <div 
                className="absolute z-20 overflow-hidden"
                style={{
                  top: '18%',
                  left: '12.8%',
                  width: '63.5%',
                  height: '35%',
                  transform: 'perspective(1000px) rotateX(2.5deg) rotateY(1deg) rotateZ(0deg)',
                }}
              >
                <div className="w-full h-full p-2.5 md:p-3.5 pl-5 md:pl-6 bg-[#050b14]/85 backdrop-blur-[2px] rounded-[4px] border border-[#00E5FF]/10 overflow-hidden">
                  <TerminalSimulation />
                </div>
              </div>

            </div>
          </motion.div>

          {/* RIGHT SIDE: CONTENT & CALL TO ACTIONS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-6 flex flex-col justify-center w-full h-full py-2"
          >
            {/* Heading & Paragraph */}
            <div className="mb-4">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#2D9CFF] to-[#00E5FF]">
                Who I Am
              </h3>
              <p className="text-[#A9B4C7] leading-relaxed max-w-[550px] text-xs md:text-sm">
                I am a Computer Science student at Amity University (CGPA 9.29) focused on building scalable full-stack applications and robust backend systems. My experience spans React, Next.js, Node.js, MongoDB, REST APIs, and modern deployment workflows. I enjoy solving real-world problems through clean architecture, performance optimization, and user-focused engineering.
              </p>
            </div>

            {/* Micro Highlights */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-[#A9B4C7] text-xs font-medium">
              <span className="flex items-center gap-1"><span className="text-[#00E5FF] text-[8px]">●</span> Full Stack Development</span>
              <span className="flex items-center gap-1"><span className="text-[#00E5FF] text-[8px]">●</span> Backend Engineering</span>
              <span className="flex items-center gap-1"><span className="text-[#00E5FF] text-[8px]">●</span> Problem Solving</span>
              <span className="flex items-center gap-1"><span className="text-[#00E5FF] text-[8px]">●</span> Scalable Systems</span>
            </div>

            {/* Premium CTA Buttons Redesign (Placed ABOVE Stats Cards) */}
            <div className="flex items-center gap-4 mb-5 flex-shrink-0">
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
              <a 
                href="#projects"
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
              </a>
            </div>

            {/* Stats Cards (Placed BELOW CTA buttons) */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-[500px]">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  whileHover={{ 
                    y: -2, 
                    boxShadow: '0 4px 15px rgba(0,229,255,0.08)',
                    transition: { duration: 0.2 } 
                  }}
                  className="relative py-2.5 px-3 rounded-[12px] flex flex-col justify-center text-center group transition-all duration-300"
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
                  <h4 className="text-lg md:text-xl font-bold text-[#FFFFFF] mb-0.5 group-hover:text-[#00E5FF] transition-colors duration-200">{stat.value}</h4>
                  <p className="text-[10px] font-medium text-[#A9B4C7] uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
