import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

// 24 keys layout for better performance
const KEYS_LAYOUT = [
  // Row 1 (8 keys)
  { width: '10%' }, { width: '10%' }, { width: '10%' }, { width: '10%' }, { width: '10%' }, { width: '10%' }, { width: '10%' }, { width: '14%' },
  // Row 2 (7 keys)
  { width: '12%' }, { width: '10%' }, { width: '10%' }, { width: '10%' }, { width: '10%' }, { width: '10%' }, { width: '10%' },
  // Row 3 (6 keys)
  { width: '14%' }, { width: '10%' }, { width: '10%' }, { width: '10%' }, { width: '10%' }, { width: '14%' },
  // Row 4 (Spacebar row)
  { width: '12%' }, { width: '40%', isSpace: true }, { width: '12%' }, { width: '12%' }
];

const Key = ({ index, width, isSpace, controls }) => {
  return (
    <motion.div 
      animate={controls}
      whileHover={{ y: 1, scale: 0.98, backgroundColor: "rgba(0, 229, 255, 0.15)", borderColor: "rgba(0, 229, 255, 0.4)" }}
      transition={{ duration: 0.1 }}
      className={`h-[20%] bg-gradient-to-b from-[#1A2235] to-[#111724] rounded-[2px] border border-[#2A344A]/60 shadow-[0_2px_2px_rgba(0,0,0,0.4)] relative overflow-hidden group cursor-pointer transition-colors ${isSpace ? 'mx-auto' : ''}`}
      style={{ width }}
    >
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      {/* Ripple/glow effect via css variables from parent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 229, 255, 0.2) 0%, transparent 60%)'
        }}
      />
    </motion.div>
  );
};

export const MechanicalKeyboard = ({ isActive }) => {
  const keyboardRef = useRef(null);
  const keyControls = KEYS_LAYOUT.map(() => useAnimation());

  // Mouse reactive glow using CSS variables
  const handleMouseMove = (e) => {
    if (!keyboardRef.current) return;
    const rect = keyboardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set CSS variables for child keys to use in their radial gradients
    // This avoids React state updates on every frame
    const keys = keyboardRef.current.children;
    for(let i=0; i<keys.length; i++) {
        const key = keys[i];
        const keyRect = key.getBoundingClientRect();
        const keyX = e.clientX - keyRect.left;
        const keyY = e.clientY - keyRect.top;
        key.style.setProperty('--mouse-x', `${keyX}px`);
        key.style.setProperty('--mouse-y', `${keyY}px`);
    }
  };

  useEffect(() => {
    if (!isActive) return;

    const handleKeyPress = () => {
      // Pick a random key (excluding spacebar mostly)
      const randomIndex = Math.floor(Math.random() * (KEYS_LAYOUT.length - 4));
      
      keyControls[randomIndex].start({
        backgroundColor: ["#1A2235", "rgba(0, 229, 255, 0.3)", "#1A2235"],
        borderColor: ["rgba(42, 52, 74, 0.6)", "rgba(0, 229, 255, 0.6)", "rgba(42, 52, 74, 0.6)"],
        y: [0, 1.5, 0],
        transition: { duration: 0.15 }
      });
    };

    const handleEnterPress = () => {
      // Flash a specific key (like the Enter key on row 2 right side)
      const enterIndex = 14; 
      keyControls[enterIndex].start({
        backgroundColor: ["#1A2235", "rgba(76, 255, 136, 0.4)", "#1A2235"],
        borderColor: ["rgba(42, 52, 74, 0.6)", "rgba(76, 255, 136, 0.6)", "rgba(42, 52, 74, 0.6)"],
        y: [0, 2, 0],
        transition: { duration: 0.2 }
      });
    };

    window.addEventListener('terminal-keypress', handleKeyPress);
    window.addEventListener('terminal-enterpress', handleEnterPress);

    return () => {
      window.removeEventListener('terminal-keypress', handleKeyPress);
      window.removeEventListener('terminal-enterpress', handleEnterPress);
    };
  }, [isActive, keyControls]);

  return (
    <div 
      className="absolute left-[28%] bottom-[12%] w-[42%] h-[12%] bg-gradient-to-b from-[#111724] to-[#080B12] rounded-[6px] p-[3px] border border-[#2A344A] shadow-[0_15px_30px_rgba(0,0,0,0.6)] transform rotate-[1deg] z-30"
      onMouseMove={handleMouseMove}
    >
      {/* Subtle cyan highlight from lamp */}
      <div className="absolute top-[0px] right-[0px] w-[50%] h-[2px] bg-gradient-to-l from-[#00E5FF]/[0.6] to-transparent rounded-tr-[6px] pointer-events-none z-10 shadow-[0_0_10px_rgba(0,229,255,0.4)] transition-opacity duration-1000" style={{ opacity: isActive ? 1 : 0.3 }} />
      <div className="absolute top-[0px] right-[0px] w-[2px] h-[60%] bg-gradient-to-b from-[#00E5FF]/[0.6] to-transparent rounded-tr-[6px] pointer-events-none z-10 shadow-[0_0_10px_rgba(0,229,255,0.4)] transition-opacity duration-1000" style={{ opacity: isActive ? 1 : 0.3 }} />
      
      <div 
        ref={keyboardRef}
        className="w-full h-full flex flex-wrap justify-start items-center gap-[2.5px] bg-[#050B14]/50 rounded-[4px] p-[2.5px] shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]"
      >
        {KEYS_LAYOUT.map((key, i) => (
          <Key key={i} index={i} width={key.width} isSpace={key.isSpace} controls={keyControls[i]} />
        ))}
      </div>
    </div>
  );
};
