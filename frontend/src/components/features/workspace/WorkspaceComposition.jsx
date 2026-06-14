import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { TerminalSimulation } from './TerminalSimulation';
import { MechanicalKeyboard } from './MechanicalKeyboard';
import { TabletDashboard } from './TabletDashboard';
import { DeskLamp } from './DeskLamp';
import { TechBadge, DataLines } from './TechBadges';

export const WorkspaceComposition = () => {
  const containerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  
  // Mouse tracking for parallax and lighting
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax transforms based on mouse position
  // Assume mouse values range from -0.5 to 0.5 across the container
  const laptopRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [2, -2]);
  const laptopRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-2, 2]);
  const laptopTranslateZ = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalize to -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Launch sequence handler
  const handleViewportEnter = () => {
    if (!isActive) {
      setTimeout(() => setIsActive(true), 400); // Slight delay for scroll
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true, margin: "-100px" }}
      className="relative w-full max-w-[650px] aspect-[16/10] flex items-center justify-center group perspective-[1200px]"
    >
      {/* Dynamic Ambient Background Glow based on mouse */}
      <motion.div 
        style={{ 
          x: useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]),
          y: useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]),
        }}
        className="absolute inset-0 bg-gradient-to-br from-[#1E4DFF]/10 via-transparent to-[#00E5FF]/5 mix-blend-screen pointer-events-none rounded-full blur-[80px]" 
      />
      
      {/* Background SVG Data Lines */}
      <DataLines isActive={isActive} />

      <motion.div 
        className="w-full h-full relative" 
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Main Laptop Structure with Parallax */}
        <motion.div 
          style={{
            rotateX: laptopRotateX,
            rotateY: laptopRotateY,
            z: laptopTranslateZ,
          }}
          className="absolute left-[15%] right-[15%] top-[10%] bottom-[30%] flex flex-col items-center z-20 shadow-[0_30px_60px_rgba(0,0,0,0.6)] rounded-t-[16px] rounded-b-[4px]"
        >
          {/* Breathing Animation Wrapper */}
          <motion.div
            animate={{ y: isActive ? [0, -4, 0] : 0 }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-b from-[#111724] to-[#080B12] rounded-t-[16px] rounded-b-[4px] p-[10px] pb-[16px] border border-[#2A344A] relative flex flex-col"
          >
             {/* Glass Reflection Highlight */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent rounded-t-[16px] rounded-b-[4px] pointer-events-none" />

             {/* Lamp Reflection on Right Bezel */}
             <motion.div 
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 2 }}
                className="absolute right-[1px] top-[1px] bottom-[16px] w-[8px] bg-gradient-to-l from-[#00E5FF]/[0.4] to-transparent mix-blend-screen rounded-tr-[15px] pointer-events-none blur-[1px] z-20" 
             />
             <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#03060A] border border-[#1A2235]" />
             
             {/* Monitor / Screen */}
             <div className="w-full h-full bg-[#0A1929] rounded-[6px] overflow-hidden relative border border-[rgba(0,229,255,0.12)] shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_0_15px_rgba(0,229,255,0.15)] p-2 md:p-3">
                 
                 {/* Powered-on screen ambience & Soft Bloom */}
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.12)_0%,transparent_70%)] pointer-events-none z-0" 
                 />
                 
                 {/* Boot Animation Overlay */}
                 {!isActive && (
                    <div className="absolute inset-0 bg-[#050B14] z-50 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin opacity-50" />
                    </div>
                 )}

                 <div className="relative z-10 w-full h-full">
                     <TerminalSimulation isActive={isActive} />
                 </div>
                 
                 {/* Dynamic Screen Glare / Reflection responding to mouse */}
                 <motion.div 
                    style={{
                        background: useTransform(smoothMouseX, [-0.5, 0.5], [
                            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.05) 50%, transparent 54%)',
                            'linear-gradient(105deg, transparent 60%, rgba(255,255,255,0.02) 65%, rgba(255,255,255,0.05) 70%, transparent 74%)'
                        ])
                    }}
                    className="absolute inset-0 pointer-events-none z-20 mix-blend-screen" 
                 />
             </div>
             
             {/* Sticky Note */}
             <motion.div 
                whileHover={{ rotate: -4, y: -2, scale: 1.05 }}
                animate={{ rotate: [-6, -8, -6], y: isActive ? [0, -2, 0] : 0 }} 
                transition={{ 
                    rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }} 
                className="absolute -left-5 top-14 w-12 h-14 shadow-[4px_8px_15px_rgba(0,0,0,0.5)] transform -rotate-6 flex flex-col p-1.5 z-30 rounded-sm border border-[#FFD166]/40 cursor-pointer overflow-hidden"
             >
                 {/* Paper Texture Background */}
                 <div className="absolute inset-0 bg-gradient-to-br from-[#FFD166] to-[#E6B84D] z-[-1]" />
                 <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
                 
                 <span className="text-[5px] text-black/80 font-[800] mb-1 border-b border-black/10 pb-0.5" style={{ fontFamily: 'var(--font-caveat, cursive)' }}>TODO</span>
                 <span className="text-[4px] text-black/80 flex items-center gap-0.5 mb-0.5 font-[600]" style={{ fontFamily: 'var(--font-caveat, cursive)' }}><span className="w-0.5 h-0.5 bg-black/60 rounded-full"/> Refactor Auth</span>
                 <span className="text-[4px] text-black/80 flex items-center gap-0.5 font-[600]" style={{ fontFamily: 'var(--font-caveat, cursive)' }}><span className="w-0.5 h-0.5 bg-black/60 rounded-full"/> Update Cache</span>
             </motion.div>
          </motion.div>
          
          {/* Laptop Base */}
          <div className="w-[110%] h-[24px] bg-gradient-to-b from-[#151B28] to-[#0A0F1A] rounded-b-[12px] rounded-t-[2px] mt-[-2px] border border-[#2A344A] shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative flex justify-center perspective-[1000px] z-30">
             <div className="w-[80%] h-[12px] mt-[2px] bg-[#0A0F1A] rounded-[2px] border-t border-[#050B14] shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] flex items-center justify-center">
                 <div className="w-[20%] h-[4px] bg-[#151B28] rounded-[1px] absolute bottom-[4px] border-t border-[#2A344A]/50" />
             </div>
          </div>
        </motion.div>

        {/* Tablet */}
        <div className="absolute left-[3%] top-[30%] w-[24%] aspect-[3/4.2] bg-gradient-to-br from-[#111724] to-[#080B12] rounded-[8px] p-[5px] border border-[#2A344A] shadow-[0_15px_30px_rgba(0,0,0,0.5)] transform -rotate-12 z-10 transition-transform duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-[-8deg]">
            <div className="w-full h-full bg-[#050B14] rounded-[4px] overflow-hidden relative border border-[rgba(0,229,255,0.12)]">
                 <TabletDashboard />
            </div>
            <div className="absolute top-[50%] right-[2px] -translate-y-1/2 w-[2px] h-[2px] rounded-full bg-[#03060A]" />
        </div>

        {/* Notebook */}
        <div className="absolute left-[8%] bottom-[8%] w-[18%] aspect-[3/4.5] bg-gradient-to-br from-[#111724] to-[#0A0F1A] rounded-r-[6px] border-l-4 border-l-[#1E4DFF]/70 border border-[#2A344A] shadow-[0_12px_25px_rgba(0,0,0,0.6)] transform rotate-12 z-20 p-2 overflow-hidden flex flex-col gap-1.5 transition-transform hover:rotate-6 hover:-translate-y-1">
            <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-[#E6F1FF]/10" />
            <div className="w-[60%] h-[2px] bg-[#2A344A]/50 rounded-full mt-1" />
            <div className="w-[80%] h-[2px] bg-[#2A344A]/50 rounded-full" />
            <div className="w-[70%] h-[2px] bg-[#2A344A]/50 rounded-full" />
            <div className="w-[40%] h-[2px] bg-[#2A344A]/50 rounded-full mt-2" />
        </div>

        {/* Mechanical Keyboard */}
        <MechanicalKeyboard isActive={isActive} />

        {/* Mouse */}
        <motion.div 
            animate={{ x: isActive ? [0, 2, -1, 0] : 0, y: isActive ? [0, -1, 1, 0] : 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute right-[22%] bottom-[15%] w-[7%] aspect-[2/3.2] bg-gradient-to-br from-[#1A2235] to-[#0A0F1A] rounded-[40%] border border-[#2A344A] shadow-[0_12px_20px_rgba(0,0,0,0.6)] transform -rotate-12 z-30 flex justify-center pt-2 relative overflow-hidden cursor-pointer hover:border-[#00E5FF]/40"
        >
            <div className="w-[2.5px] h-[7px] bg-[#00E5FF]/60 rounded-full shadow-[0_0_5px_#00E5FF]" />
            <div className="absolute bottom-2 left-1 w-[2px] h-[10px] bg-[#2A344A]/40 rounded-full" />
            <div className="absolute bottom-2 right-1 w-[2px] h-[10px] bg-[#2A344A]/40 rounded-full" />
        </motion.div>

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

        {/* Structural Desk Lamp */}
        <DeskLamp isActive={isActive} />

        {/* Floating Tech Badges */}
        <TechBadge 
            isActive={isActive}
            label="MongoDB" 
            style={{ top: '2%', left: '8%' }} 
            delay={1.5}
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 1.5c-.37 0-.72.18-.93.49C8.3 6.07 7 10.73 7 13.5c0 3.04 2.24 5.5 5 5.5s5-2.46 5-5.5c0-2.77-1.3-7.43-4.07-11.51-.21-.31-.56-.49-.93-.49zM12 4c1.8 3.1 3 6.9 3 9.5 0 1.93-1.34 3.5-3 3.5s-3-1.57-3-3.5c0-2.6 1.2-6.4 3-9.5z" /></svg>} 
        />
        <TechBadge 
            isActive={isActive}
            label="Redis" 
            style={{ bottom: '26%', left: '-4%' }} 
            delay={1.7}
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2L2 7l10 5 10-5-10-5zm0 6L4.5 11l7.5 3.5 7.5-3.5L12 8zm0 6l-7.5 3.5L12 21l7.5-3.5L12 14z" /></svg>} 
        />
        <TechBadge 
            isActive={isActive}
            label="Docker" 
            style={{ bottom: '15%', right: '14%' }} 
            delay={1.9}
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M2 3h4v4H2V3zm6 0h4v4H8V3zm6 0h4v4H8V3zm6 0h4v4h-4V3zM2 9h4v4H2V9zm6 0h4v4H8V9zm6 0h4v4h-4V9zm6 0h4v4h-4V9zM2 15h4v4H2v-4zm6 0h4v4H8v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" /></svg>} 
        />
      </motion.div>
    </motion.div>
  );
};
