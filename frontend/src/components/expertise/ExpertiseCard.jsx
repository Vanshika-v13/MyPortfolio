import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ExpertiseCard({ title, icon, children, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-[16px] flex flex-col p-5 transition-colors duration-200 ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid',
        borderColor: isHovered ? 'rgba(0, 229, 255, 0.25)' : 'rgba(0, 229, 255, 0.12)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-5">
          {icon && (
            <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-[rgba(0,229,255,0.12)] text-[#A9B4C7] group-hover:text-[#00E5FF] group-hover:border-[rgba(0,229,255,0.25)] transition-colors duration-200 bg-[rgba(255,255,255,0.02)]">
              {icon}
            </div>
          )}
          <h3 className="text-sm md:text-base font-semibold tracking-wide text-[#E6F1FF]">
            {title}
          </h3>
        </div>
        <div className="flex-1 w-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
