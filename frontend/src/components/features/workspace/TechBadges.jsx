import React from 'react';
import { motion } from 'framer-motion';

export const TechBadge = ({ icon, label, style, delay = 0, isActive }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
        opacity: isActive ? 1 : 0, 
        y: isActive ? [0, -5, 0] : 20,
    }}
    transition={{ 
        opacity: { duration: 0.5, delay },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay }
    }}
    className="absolute z-30 px-3.5 py-1.5 rounded-[12px] flex items-center gap-2 text-[#E6F1FF] text-[11px] font-[700] shadow-[0_12px_24px_rgba(0,0,0,0.4)] border border-[rgba(0,229,255,0.2)] hover:border-[rgba(0,229,255,0.5)] hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all duration-300 backdrop-blur-[16px] bg-[rgba(10,15,26,0.8)] cursor-default group"
    style={style}
  >
    <div className="w-4 h-4 flex items-center justify-center text-[#00E5FF] group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <span className="tracking-wide text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">{label}</span>
    {/* Subtle Inner Glow */}
    <div className="absolute inset-0 rounded-[12px] shadow-[inset_0_0_10px_rgba(0,229,255,0.1)] pointer-events-none" />
  </motion.div>
);

export const DataLines = ({ isActive }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ filter: 'drop-shadow(0 0 4px rgba(0,229,255,0.5))' }}>
        <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0,229,255,0)" />
                <stop offset="50%" stopColor="rgba(0,229,255,0.4)" />
                <stop offset="100%" stopColor="rgba(0,229,255,0)" />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>

        <motion.path 
            d="M 12 5 C 20 5, 30 50, 50 80" 
            fill="none" 
            stroke="url(#lineGrad1)" 
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: isActive ? 1 : 0, opacity: isActive ? 0.6 : 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.path 
            d="M 2 70 C 15 70, 30 85, 50 80" 
            fill="none" 
            stroke="url(#lineGrad1)" 
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: isActive ? 1 : 0, opacity: isActive ? 0.6 : 0 }}
            transition={{ duration: 1.5, delay: 0.7 }}
        />
        <motion.path 
            d="M 80 85 C 70 85, 60 80, 50 80" 
            fill="none" 
            stroke="url(#lineGrad1)" 
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: isActive ? 1 : 0, opacity: isActive ? 0.6 : 0 }}
            transition={{ duration: 1.5, delay: 0.9 }}
        />

        {/* Animated Particles removed — they produced visible glowing dots near the workspace illustration */}
      </svg>
    </div>
  );
};
