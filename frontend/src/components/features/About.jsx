import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TerminalSimulation = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [lines, setLines] = useState([]);

  const sequence = [
    { text: "> npm run dev", color: "text-[#E6F1FF]" },
    { text: "Connecting MongoDB...", color: "text-[#A9B4C7]" },
    { text: "MongoDB Connected ✓", color: "text-[#4CFF88]" },
    { text: "Redis Connected...", color: "text-[#A9B4C7]" },
    { text: "Redis Cache Hit ✓", color: "text-[#4DA3FF]" },
    { text: "JWT Verified ✓", color: "text-[#FFD166]" },
    { text: "API Response 200 OK ✓", color: "text-[#4CFF88]" },
    { text: "Build Successful ✓", color: "text-[#4DA3FF]" },
    { text: "Deployment Ready ✓", color: "text-[#4CFF88]" },
    { text: "Watching for changes...", color: "text-[#A9B4C7]" }
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

const TabletDashboard = () => (
  <div className="flex flex-col w-full h-full p-1.5 md:p-2 bg-[#050B14]/90 rounded-[4px] text-[4.5px] md:text-[5.5px] font-sans text-[#A9B4C7] gap-1.5">
    <div className="flex justify-between items-center pb-1 border-b border-[rgba(0,229,255,0.12)]">
      <span className="text-[#E6F1FF] font-bold">System Architecture</span>
      <span className="flex items-center gap-1 text-[#4CFF88]"><span className="w-1 h-1 rounded-full bg-[#4CFF88] animate-pulse"></span> Live</span>
    </div>

    <div className="grid grid-cols-2 gap-1.5">
      <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)] hover:border-[rgba(0,229,255,0.2)] transition-colors">
        <span className="text-[#00E5FF] font-semibold block mb-0.5 tracking-wide">API Health</span>
        <div className="flex flex-col gap-0.5">
          <span className="text-[#4CFF88] flex items-center gap-1"><span className="w-0.5 h-0.5 rounded-full bg-[#4CFF88]"></span> Online</span>
          <span className="opacity-80">99.9% Uptime</span>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)] hover:border-[rgba(0,229,255,0.2)] transition-colors">
        <span className="text-[#00E5FF] font-semibold block mb-0.5 tracking-wide">Database</span>
        <div className="flex flex-col gap-0.5">
          <span className="text-[#E6F1FF]">MongoDB</span>
          <span className="text-[#4CFF88]">Connected ✓</span>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)] hover:border-[rgba(0,229,255,0.2)] transition-colors">
        <span className="text-[#00E5FF] font-semibold block mb-0.5 tracking-wide">Cache Layer</span>
        <div className="flex flex-col gap-0.5">
          <span className="text-[#4DA3FF]">Redis Active</span>
          <span className="opacity-80">92% Hit Rate</span>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)] hover:border-[rgba(0,229,255,0.2)] transition-colors">
        <span className="text-[#00E5FF] font-semibold block mb-0.5 tracking-wide">Authentication</span>
        <div className="flex flex-col gap-0.5 justify-center h-full">
          <span className="text-[#FFD166] flex items-center gap-1">
            <svg width="5" height="5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3 0 1.09-.59 2.04-1.46 2.56L15 17h-6l1.46-4.44C9.59 12.04 9 11.09 9 10c0-1.66 1.34-3 3-3z"/></svg>
            JWT Secured
          </span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-1.5">
      <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)]">
        <span className="text-[#00E5FF] font-semibold block mb-0.5 tracking-wide">Server</span>
        <span className="text-[#4DA3FF]">Express Running</span>
      </div>
      <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)]">
        <span className="text-[#00E5FF] font-semibold block mb-0.5 tracking-wide">Deployment</span>
        <span className="text-[#4CFF88]">Prod Ready</span>
      </div>
    </div>

    <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)]">
      <span className="text-[#00E5FF] font-semibold block mb-1 tracking-wide">Active Services</span>
      <div className="flex flex-col gap-0.5">
        <div className="flex justify-between items-center"><span className="text-[#E6F1FF]">Weather API</span><span className="text-[#4CFF88]">●</span></div>
        <div className="flex justify-between items-center"><span className="text-[#E6F1FF]">E-Commerce API</span><span className="text-[#4CFF88]">●</span></div>
        <div className="flex justify-between items-center"><span className="text-[#E6F1FF]">Portfolio API</span><span className="text-[#4CFF88]">●</span></div>
      </div>
    </div>

    <div className="bg-[rgba(255,255,255,0.02)] p-1.5 rounded-[3px] border border-[rgba(0,229,255,0.08)] flex justify-between items-center mt-auto">
      <div className="flex flex-col">
        <span className="text-[#00E5FF] font-semibold tracking-wide">Git Status</span>
        <span className="opacity-80">Last Commit: Successful</span>
      </div>
      <div className="flex items-center gap-0.5 text-[#E6F1FF] bg-[#1A2235] px-1 py-0.5 rounded-[2px] border border-[#2A344A]">
        <svg width="4" height="4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5.5l7-7-1.41-1.41L10 11.67l-2.59-2.58L6 10.5l4 4z"/></svg>
        main
      </div>
    </div>
  </div>
);

const WorkspaceComposition = () => (
  <div className="relative w-full max-w-[650px] aspect-[16/10] flex items-center justify-center group perspective-[1200px]">
    
    <div className="absolute inset-0 bg-gradient-to-br from-[#1E4DFF]/10 via-transparent to-[#00E5FF]/5 mix-blend-screen pointer-events-none rounded-full blur-[80px]" />
    
    <div className="w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-[1.02]" style={{ transformStyle: 'preserve-3d' }}>
      
      {/* Laptop */}
      <div className="absolute left-[15%] right-[15%] top-[10%] bottom-[30%] flex flex-col items-center z-20 shadow-[0_30px_60px_rgba(0,0,0,0.6)] rounded-t-[16px] rounded-b-[4px]">
        <div className="w-full h-full bg-gradient-to-b from-[#111724] to-[#080B12] rounded-t-[16px] rounded-b-[4px] p-[10px] pb-[16px] border border-[#2A344A] relative flex flex-col">
           <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#03060A] border border-[#1A2235]" />
           
           <div className="w-full h-full bg-[#050B14] rounded-[6px] overflow-hidden relative border border-[rgba(0,229,255,0.1)] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] p-2 md:p-3">
               <TerminalSimulation />
           </div>
           
           <motion.div animate={{ rotate: [-8, -10, -8] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-4 top-12 w-12 h-14 bg-gradient-to-br from-[#FFD166] to-[#E6B84D] shadow-[2px_4px_10px_rgba(0,0,0,0.4)] transform -rotate-6 flex flex-col p-1.5 z-30 rounded-sm border border-[#FFD166]/50">
               <span className="text-[5px] text-black/80 font-bold mb-1 border-b border-black/10 pb-0.5">TODO</span>
               <span className="text-[4px] text-black/70 flex items-center gap-0.5 mb-0.5"><span className="w-0.5 h-0.5 bg-black/50 rounded-full"/> Refactor Auth</span>
               <span className="text-[4px] text-black/70 flex items-center gap-0.5"><span className="w-0.5 h-0.5 bg-black/50 rounded-full"/> Update Cache</span>
           </motion.div>
        </div>
        
        <div className="w-[110%] h-[24px] bg-gradient-to-b from-[#151B28] to-[#0A0F1A] rounded-b-[12px] rounded-t-[2px] mt-[-2px] border border-[#2A344A] shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative flex justify-center perspective-[1000px] z-30">
           <div className="w-[80%] h-[12px] mt-[2px] bg-[#0A0F1A] rounded-[2px] border-t border-[#050B14] shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] flex items-center justify-center">
               <div className="w-[20%] h-[4px] bg-[#151B28] rounded-[1px] absolute bottom-[4px] border-t border-[#2A344A]/50" />
           </div>
        </div>
      </div>

      {/* Tablet */}
      <div className="absolute left-[3%] top-[30%] w-[24%] aspect-[3/4.2] bg-gradient-to-br from-[#111724] to-[#080B12] rounded-[8px] p-[5px] border border-[#2A344A] shadow-[0_15px_30px_rgba(0,0,0,0.5)] transform -rotate-12 z-10 transition-transform duration-500 hover:scale-105 hover:-translate-y-2">
          <div className="w-full h-full bg-[#050B14] rounded-[4px] overflow-hidden relative border border-[rgba(0,229,255,0.12)]">
               <TabletDashboard />
          </div>
          <div className="absolute top-[50%] right-[2px] -translate-y-1/2 w-[2px] h-[2px] rounded-full bg-[#03060A]" />
      </div>

      {/* Floating Code Card */}
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[5%] top-[18%] w-[22%] bg-[rgba(255,255,255,0.03)] backdrop-blur-md rounded-[6px] p-2 border border-[rgba(0,229,255,0.12)] shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-10">
        <div className="flex gap-1 mb-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="font-mono text-[4.5px] md:text-[5px] text-[#A9B4C7] leading-tight">
          <span className="text-[#FFD166]">const</span> checkAuth = (<span className="text-[#00E5FF]">req, res, next</span>) {'=>'} {'{'}
          <br/>&nbsp;&nbsp;<span className="text-[#FFD166]">const</span> token = req.headers.authorization;
          <br/>&nbsp;&nbsp;<span className="text-[#FFD166]">if</span>(!token) <span className="text-[#FFD166]">return</span> res.status(<span className="text-[#4DA3FF]">401</span>);
          <br/>&nbsp;&nbsp;verifyJWT(token);
          <br/>{'}'};
        </div>
      </motion.div>

      {/* Notebook */}
      <div className="absolute left-[8%] bottom-[8%] w-[18%] aspect-[3/4.5] bg-gradient-to-br from-[#111724] to-[#0A0F1A] rounded-r-[6px] border-l-4 border-l-[#1E4DFF]/70 border border-[#2A344A] shadow-[0_12px_25px_rgba(0,0,0,0.6)] transform rotate-12 z-20 p-2 overflow-hidden flex flex-col gap-1.5">
          <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-[#E6F1FF]/10" />
          <div className="w-[60%] h-[2px] bg-[#2A344A]/50 rounded-full mt-1" />
          <div className="w-[80%] h-[2px] bg-[#2A344A]/50 rounded-full" />
          <div className="w-[70%] h-[2px] bg-[#2A344A]/50 rounded-full" />
          <div className="w-[40%] h-[2px] bg-[#2A344A]/50 rounded-full mt-2" />
      </div>

      {/* Mechanical Keyboard */}
      <div className="absolute left-[28%] bottom-[12%] w-[42%] h-[12%] bg-gradient-to-b from-[#111724] to-[#080B12] rounded-[6px] p-[3px] border border-[#2A344A] shadow-[0_15px_30px_rgba(0,0,0,0.6)] transform rotate-[1deg] z-30">
          <div className="w-full h-full flex flex-wrap justify-center items-center gap-[2px] bg-[#050B14]/50 rounded-[4px] p-[2px] shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]">
             {Array.from({length: 48}).map((_, i) => (
                 <div key={i} className="w-[6.5%] h-[20%] bg-gradient-to-b from-[#1A2235] to-[#111724] rounded-[1.5px] border border-[#2A344A]/60 shadow-[0_2px_2px_rgba(0,0,0,0.4)] relative overflow-hidden group hover:border-[#00E5FF]/40 transition-colors">
                   <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                 </div>
             ))}
          </div>
      </div>

      {/* Mouse */}
      <div className="absolute right-[22%] bottom-[15%] w-[7%] aspect-[2/3.2] bg-gradient-to-br from-[#1A2235] to-[#0A0F1A] rounded-[40%] border border-[#2A344A] shadow-[0_12px_20px_rgba(0,0,0,0.6)] transform -rotate-12 z-30 flex justify-center pt-2 relative overflow-hidden">
          <div className="w-[2.5px] h-[7px] bg-[#00E5FF]/60 rounded-full shadow-[0_0_5px_#00E5FF]" />
          <div className="absolute bottom-2 left-1 w-[2px] h-[10px] bg-[#2A344A]/40 rounded-full" />
          <div className="absolute bottom-2 right-1 w-[2px] h-[10px] bg-[#2A344A]/40 rounded-full" />
      </div>

      {/* Coffee Mug */}
      <div className="absolute right-[8%] top-[45%] w-[11%] aspect-square z-10 transform rotate-[-5deg]">
         <div className="absolute top-1/2 -right-[6px] -translate-y-1/2 w-4 h-6 border-[3px] border-[#151B28] rounded-r-full shadow-[2px_0_5px_rgba(0,0,0,0.3)]" />
         <div className="w-full h-full bg-gradient-to-br from-[#1A2235] to-[#0A0F1A] rounded-full border border-[#2A344A] shadow-[0_15px_25px_rgba(0,0,0,0.6)] flex items-center justify-center relative z-10">
             <div className="w-[82%] h-[82%] rounded-full bg-[#050B14] border border-[#0A0F1A] shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] relative flex items-center justify-center overflow-hidden">
                <div className="w-[85%] h-[85%] rounded-full bg-[#1A0F0A] opacity-90 shadow-[inset_0_0_8px_rgba(0,0,0,0.9)]" />
                <motion.div animate={{ y: [-2, -8], opacity: [0, 0.4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }} className="absolute top-[20%] w-[20%] h-[40%] bg-white blur-[4px] rounded-full" />
             </div>
         </div>
      </div>

      {/* Desk Lamp */}
      <div className="absolute right-[2%] top-[8%] w-[22%] h-[35%] z-40 pointer-events-none">
         <div className="absolute bottom-0 right-[10%] w-[35px] h-[6px] bg-gradient-to-b from-[#1A2235] to-[#0A0F1A] rounded-[2px] border border-[#2A344A] shadow-[0_5px_10px_rgba(0,0,0,0.5)]" />
         <div className="absolute bottom-[4px] right-[25px] w-[5px] h-[70px] bg-gradient-to-r from-[#1A2235] to-[#111724] transform rotate-12 origin-bottom border-x border-[#2A344A]" />
         <div className="absolute top-[15px] right-[40px] w-[4px] h-[55px] bg-gradient-to-r from-[#1A2235] to-[#111724] transform -rotate-[40deg] origin-top border-x border-[#2A344A]" />
         <div className="absolute top-[45px] left-[15px] w-[45px] h-[12px] bg-gradient-to-b from-[#151B28] to-[#0A0F1A] rounded-[8px] transform -rotate-[20deg] border border-[#2A344A] shadow-[0_5px_15px_rgba(0,0,0,0.5)] relative overflow-hidden">
             <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-[#FFD166] blur-[1px] shadow-[0_0_10px_#FFD166]" />
         </div>
         <div className="absolute top-[55px] left-[-80px] w-[180px] h-[250px] bg-gradient-to-b from-[#FFD166]/[0.04] to-transparent transform -rotate-[20deg] blur-[15px] pointer-events-none mix-blend-screen" style={{ clipPath: 'polygon(45% 0, 55% 0, 100% 100%, 0 100%)' }} />
      </div>

      {/* Floating Tech Badges */}
      <TechBadge label="MongoDB" style={{ top: '2%', left: '8%' }} icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 1.5c-.37 0-.72.18-.93.49C8.3 6.07 7 10.73 7 13.5c0 3.04 2.24 5.5 5 5.5s5-2.46 5-5.5c0-2.77-1.3-7.43-4.07-11.51-.21-.31-.56-.49-.93-.49zM12 4c1.8 3.1 3 6.9 3 9.5 0 1.93-1.34 3.5-3 3.5s-3-1.57-3-3.5c0-2.6 1.2-6.4 3-9.5z" /></svg>} />
      <TechBadge label="Redis" style={{ bottom: '30%', left: '-2%' }} icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2L2 7l10 5 10-5-10-5zm0 6L4.5 11l7.5 3.5 7.5-3.5L12 8zm0 6l-7.5 3.5L12 21l7.5-3.5L12 14z" /></svg>} />
      <TechBadge label="Docker" style={{ bottom: '20%', right: '2%' }} icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M2 3h4v4H2V3zm6 0h4v4H8V3zm6 0h4v4h-4V3zM2 9h4v4H2V9zm6 0h4v4H8V9zm6 0h4v4h-4V9zm6 0h4v4h-4V9zM2 15h4v4H2v-4zm6 0h4v4H8v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" /></svg>} />
    </div>
  </div>
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
      className="relative w-full min-h-[90vh] bg-[#050B14] flex flex-col overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24"
    >
      <Background />

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full flex-grow overflow-hidden">
          
          {/* LEFT SIDE: WORKSTATION COMPOSITION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-6 flex justify-center items-center w-full h-full relative"
          >
            <WorkspaceComposition />
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
            <div className="mb-3">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1.5 text-transparent bg-clip-text bg-gradient-to-r from-[#2D9CFF] to-[#00E5FF]">
                Who I Am
              </h3>
              <p className="text-[#A9B4C7] leading-relaxed max-w-[550px] text-xs md:text-sm">
                I am a Computer Science student at Amity University (CGPA 9.29) focused on building scalable full-stack applications and robust backend systems. My experience spans React, Next.js, Node.js, MongoDB, REST APIs, and modern deployment workflows. I enjoy solving real-world problems through clean architecture, performance optimization, and user-focused engineering.
              </p>
            </div>

            {/* Micro Highlights */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-[#A9B4C7] text-xs font-medium">
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
