import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const TypewriterText = () => {
  const words = "Welcome to My Digital Space".split(" ");
  let charCount = 0;
  
  return (
    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#2D9CFF] to-[#00D4FF] drop-shadow-[0_0_15px_rgba(45,156,255,0.4)] flex flex-wrap justify-center gap-x-3 md:gap-x-5 leading-tight pb-2">
      {words.map((word, wIdx) => {
        return (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {word.split('').map((char, cIdx) => {
              let currentDelay = 0;
              if (charCount < 11) {
                currentDelay = charCount * (0.55 / 11);
              } else {
                currentDelay = 0.55 + (charCount - 11) * (0.60 / 12);
              }
              charCount++;
              return (
                <motion.span
                  key={cIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.01, delay: currentDelay }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
};

const BackgroundGlows = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    {/* Layer 1: Base Background */}
    <div className="absolute inset-0 bg-[#050B14]"></div>
    
    {/* Layer 2: Aurora Mesh Gradients */}
    <div 
      className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]"
      style={{ background: 'radial-gradient(circle, rgba(45,156,255,0.35) 0%, transparent 70%)' }}
    ></div>
    <div 
      className="absolute top-[30%] right-[-10%] w-[40%] h-[60%] rounded-full blur-[120px]"
      style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.25) 0%, transparent 70%)' }}
    ></div>
    <div 
      className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] rounded-full blur-[120px]"
      style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)' }}
    ></div>
  </div>
);

const FlowFieldLines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.12]">
      <motion.svg
        animate={{
          x: ["0%", "-5%", "0%"],
          y: ["0%", "2%", "0%"],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute w-[110%] h-[110%] -top-[5%] -left-[5%]"
      >
        <path d="M-10,10 Q30,40 70,5 T110,30" fill="none" stroke="#2D9CFF" strokeWidth="0.15" />
        <path d="M-10,15 Q30,45 70,10 T110,35" fill="none" stroke="#00D4FF" strokeWidth="0.15" />
        <path d="M-10,20 Q30,50 70,15 T110,40" fill="none" stroke="#2D9CFF" strokeWidth="0.15" />
        <path d="M-10,25 Q30,55 70,20 T110,45" fill="none" stroke="#00D4FF" strokeWidth="0.15" />
        <path d="M-10,30 Q30,60 70,25 T110,50" fill="none" stroke="#2D9CFF" strokeWidth="0.15" />
      </motion.svg>
      <motion.svg
        animate={{
          x: ["0%", "5%", "0%"],
          y: ["0%", "-2%", "0%"],
        }}
        transition={{
          duration: 25,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute w-[110%] h-[110%] -top-[5%] -left-[5%]"
      >
        <path d="M-10,60 Q40,30 80,70 T110,20" fill="none" stroke="#00D4FF" strokeWidth="0.15" />
        <path d="M-10,65 Q40,35 80,75 T110,25" fill="none" stroke="#2D9CFF" strokeWidth="0.15" />
        <path d="M-10,70 Q40,40 80,80 T110,30" fill="none" stroke="#00D4FF" strokeWidth="0.15" />
        <path d="M-10,75 Q40,45 80,85 T110,35" fill="none" stroke="#2D9CFF" strokeWidth="0.15" />
        <path d="M-10,80 Q40,50 80,90 T110,40" fill="none" stroke="#00D4FF" strokeWidth="0.15" />
      </motion.svg>
    </div>
  );
};

export default function WelcomeScreen({ onEnter }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has already seen the welcome screen this session
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setIsVisible(false);
      if (onEnter) onEnter();
    }
    
    // Prevent scrolling while welcome screen is active
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, onEnter]);

  const handleEnterClick = () => {
    sessionStorage.setItem('hasSeenWelcome', 'true');
    setIsVisible(false);
    if (onEnter) onEnter();
  };

  if (!isVisible) return null;

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  const links = [
    { icon: <FaGithub className="w-4 h-4 md:w-5 md:h-5" />, href: "https://github.com" },
    { icon: <FaLinkedin className="w-4 h-4 md:w-5 md:h-5" />, href: "https://linkedin.com" },
    { icon: <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#00D4FF]" />, href: "mailto:contact@example.com" }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="welcome-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050B14] overflow-hidden"
        >
          {/* Background & Effects */}
          <BackgroundGlows />
          <FlowFieldLines />

          {/* Mouse Reactive Glow */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle, rgba(45,156,255,0.15) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />

          {/* Main Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center justify-center h-full">
            
            {/* Static Container */}
            <div className="flex flex-col items-center justify-center text-center space-y-10 w-full">
              {/* Top Icon Links */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                {links.map((link, i) => (
                  <motion.a
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={linkVariants}
                    whileHover={{ 
                      y: -3, 
                      boxShadow: '0 15px 35px rgba(45,156,255,0.2), inset 0 1px 1px rgba(255,255,255,0.1)' 
                    }}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full text-white relative overflow-hidden"
                    style={{
                      background: 'rgba(16,24,39,0.4)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)'
                    }}
                  >
                    {/* Hover Background Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2D9CFF]/0 via-[#2D9CFF]/10 to-[#00D4FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                    
                    <span className="relative z-10 group-hover:text-[#00D4FF] transition-colors duration-300 flex items-center justify-center">
                      {link.icon}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Main Heading */}
              <div className="w-full max-w-4xl mx-auto pt-4 md:pt-8">
                <TypewriterText />
              </div>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65, ease: "easeOut" }}
                className="flex flex-col items-center gap-8"
              >
                <div className="flex flex-wrap items-center justify-center gap-3 text-[#A0AEC0] text-base md:text-xl font-medium tracking-wide">
                  <span>MERN Stack Developer</span>
                  <span className="text-[#2D9CFF] text-2xl leading-none hidden md:inline">•</span>
                  <span className="text-[#2D9CFF] text-xl leading-none md:hidden">•</span>
                  <span>Problem Solver</span>
                  <span className="text-[#00D4FF] text-2xl leading-none hidden md:inline">•</span>
                  <span className="text-[#00D4FF] text-xl leading-none md:hidden">•</span>
                  <span>Creative Builder</span>
                </div>

                <button
                  onClick={handleEnterClick}
                  className="group relative px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D4FF] focus:ring-offset-[#050B14] text-white overflow-hidden"
                  style={{
                    background: 'rgba(16,24,39,0.65)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                  }}
                  aria-label="Enter Portfolio"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2D9CFF]/0 via-[#00D4FF]/20 to-[#00D4FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                  <span className="relative z-10">Enter Portfolio</span>
                </button>
              </motion.div>
              
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
