import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ExpertiseCard({ title, children, className = '' }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  // Performance optimization for spotlight
  useEffect(() => {
    let animationFrameId;
    
    const handleMouseMove = (e) => {
      if (!cardRef.current || !isHovered) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Throttle via requestAnimationFrame
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x, y });
      });
    };
    
    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden rounded-3xl bg-[var(--color-surface)] border border-[var(--color-surface-elevated)] p-8 md:p-10 shadow-subtle hover:shadow-elevated transition-all duration-300 ${className}`}
    >
      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--color-accent), transparent 40%)`,
          mixBlendMode: 'soft-light',
          opacity: isHovered ? 0.15 : 0 // Extremely subtle
        }}
      />
      
      {/* Background Connection Lines Effect */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <svg width="100%" height="100%" className="opacity-[0.03]">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-text-secondary)] mb-8">
          {title}
        </h3>
        <div className="w-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
