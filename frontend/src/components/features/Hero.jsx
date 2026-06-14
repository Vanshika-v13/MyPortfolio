import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiMongodb } from 'react-icons/si';
import { ChevronDown } from 'lucide-react';

const TypewriterRole = () => {
  const roles = [
    "Full Stack Developer",
    "MERN Stack Developer",
    "Software Engineer",
    "Backend Enthusiast",
    "Problem Solver"
  ];
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timer;
    const currentRole = roles[currentRoleIndex];
    
    // Timings requested: Typing ~1s, Visible ~1.5s, Delete ~0.5s
    // To type a role in 1s, delay = 1000 / length
    // To delete a role in 0.5s, delay = 500 / length
    
    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        // Short pause before starting to type next word
        timer = setTimeout(() => {}, 100); 
      } else {
        const deleteDelay = 500 / currentRole.length;
        timer = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, deleteDelay);
      }
    } else {
      if (displayText === currentRole) {
        // Visible for 1.5s before starting to delete
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      } else {
        const typeDelay = 1000 / currentRole.length;
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, typeDelay);
      }
    }
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D9CFF] to-[#00D4FF]">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[3px] h-[1.1em] bg-[#00D4FF] ml-1 align-middle"
      />
    </span>
  );
};

const AmbientParticles = () => {
  const particles = ['<>', '{}', '[]', '()'];
  
  // Static array of particle config
  const particleConfigs = Array.from({ length: 15 }).map((_, i) => ({
    text: particles[i % particles.length],
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    rotation: Math.random() * 90 - 45,
    scale: Math.random() * 0.4 + 0.6,
  }));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.03]">
      {particleConfigs.map((config, i) => (
        <motion.div
          key={i}
          animate={{
            y: ["0%", "-3%", "0%"],
            x: ["0%", "2%", "0%"],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="absolute text-white font-mono text-2xl"
          style={{
            top: config.top,
            left: config.left,
            transform: `rotate(${config.rotation}deg) scale(${config.scale})`,
          }}
        >
          {config.text}
        </motion.div>
      ))}
    </div>
  );
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 lg:pt-32 lg:pb-24 flex items-center bg-[#050B14] overflow-hidden">
      
      {/* Aurora Blueprint Grid Background */}
      <div className="absolute inset-0 z-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Background Glows */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[#2D9CFF] rounded-full blur-[150px] opacity-[0.15] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#00D4FF] rounded-full blur-[150px] opacity-[0.1] pointer-events-none"></div>

      {/* Subtle Moving Particles */}
      <AmbientParticles />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center h-full">
          
          {/* LEFT SIDE CONTENT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-start space-y-6"
          >
            <div className="space-y-3">
              <p className="text-xl md:text-2xl font-medium text-[#A0AEC0]">
                Hello, I'm
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FFFFFF]">
                Vanshika Verma
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#FFFFFF] h-[1.2em]">
                And I'm a <TypewriterRole />
              </h2>
            </div>

            <p className="text-base md:text-lg text-[#A0AEC0] max-w-lg leading-[1.8] font-medium pt-2">
              Building scalable applications and reliable digital experiences through modern web technologies, efficient backend systems and clean engineering practices.
            </p>

            {/* Social Icons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="flex items-center gap-4 pt-4"
            >
              {[
                { icon: <FaGithub size={20} />, href: "https://github.com/Vanshika-v13" },
                { icon: <FaLinkedin size={20} />, href: "https://www.linkedin.com/in/vanshika13/" },
                { icon: <FaEnvelope size={20} />, href: "mailto:vanshikaverma1310@gmail.com" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white relative group overflow-hidden"
                  style={{
                    background: 'rgba(16,24,39,0.65)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="absolute inset-0 bg-[#00D4FF]/0 group-hover:bg-[#00D4FF]/10 transition-all duration-300"></div>
                  <span className="relative z-10 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.8)] group-hover:text-[#00D4FF] transition-all duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto"
            >
              <a 
                href="#contact"
                className="flex items-center justify-center px-8 h-[52px] rounded-[14px] font-semibold text-[#FFFFFF] transition-all duration-250 ease-out hover:-translate-y-[2px] shadow-[0_8px_24px_rgba(30,77,255,0.25)] hover:shadow-[0_12px_28px_rgba(0,229,255,0.4)]"
                style={{ background: 'linear-gradient(90deg, #00E5FF, #1E4DFF)' }}
              >
                Let's Connect
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE PHOTO */}
          {/* RIGHT SIDE PHOTO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end items-center mt-12 lg:mt-0 group translate-y-2"
          >
            {/* Engineering-Themed Background Details */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15] font-mono text-[#00E5FF] text-sm">
              <div className="absolute top-[5%] left-[10%]">{'<>'}</div>
              <div className="absolute top-[85%] left-[5%] text-[#1E4DFF]">{'{}'}</div>
              <div className="absolute top-[15%] right-[5%] text-[#1E4DFF]">{'[]'}</div>
              <div className="absolute bottom-[10%] right-[15%]">{'//'}</div>
              <div className="absolute top-[55%] -left-[10%]">{'()'}</div>
            </div>

            <div className="relative flex items-center justify-center w-[440px] h-[440px]">
              
              {/* Layer 5: Ultra-Subtle Outer Technical Ring (8-12% opacity, 1px stroke, no glow) */}
              <svg className="absolute w-[440px] h-[440px] z-10 pointer-events-none opacity-[0.1]" viewBox="0 0 440 440">
                <circle cx="220" cy="220" r="204" fill="none" stroke="#00E5FF" strokeWidth="1" strokeDasharray="4 8 1 8" />
                <circle cx="220" cy="220" r="208" fill="none" stroke="#1E4DFF" strokeWidth="1" strokeDasharray="2 20" />
                <path d="M 220 12 L 220 16 M 220 424 L 220 428 M 12 220 L 16 220 M 424 220 L 428 220" stroke="#00E5FF" strokeWidth="1.5" />
              </svg>

              {/* Layer 4: Segmented animated arcs with gradient */}
              <div className="absolute w-[440px] h-[440px] z-20 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 440 440">
                  <defs>
                    <linearGradient id="cyanToBlueRight" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00E5FF" />
                      <stop offset="100%" stopColor="#1E4DFF" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Primary - Clockwise */}
                <motion.svg 
                  animate={{ rotate: shouldReduceMotion ? 0 : 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 440 440"
                >
                  {/* Right Arc (2-5 o'clock) */}
                  <circle 
                    cx="220" cy="220" r="190" fill="none" 
                    stroke="url(#cyanToBlueRight)" strokeWidth="3" 
                    strokeDasharray="298 896" strokeLinecap="round" 
                    transform="rotate(-30 220 220)"
                    style={{ filter: "drop-shadow(0 0 6px rgba(0,229,255,0.4))" }}
                  />
                  
                  {/* Bottom Arc (6-7 o'clock) */}
                  <circle 
                    cx="220" cy="220" r="190" fill="none" 
                    stroke="#00E5FF" strokeWidth="2.5" 
                    strokeDasharray="100 1094" strokeLinecap="round" 
                    transform="rotate(90 220 220)"
                    style={{ filter: "drop-shadow(0 0 2px rgba(0,229,255,0.3))" }}
                  />
                </motion.svg>

                {/* Secondary - Counter-Clockwise */}
                <motion.svg 
                  animate={{ rotate: shouldReduceMotion ? 0 : -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 440 440"
                >
                  {/* Top Arc (11-1 o'clock) */}
                  <circle 
                    cx="220" cy="220" r="190" fill="none" 
                    stroke="#1E4DFF" strokeWidth="2.5" 
                    strokeDasharray="199 995" strokeLinecap="round" 
                    transform="rotate(-120 220 220)"
                    style={{ filter: "drop-shadow(0 0 2px rgba(30,77,255,0.3))" }}
                  />
                </motion.svg>
              </div>

              {/* Layer 3: Controlled ambient glow */}
              <div className="absolute w-[415px] h-[415px] bg-[#1E4DFF] rounded-full blur-[20px] opacity-[0.035] pointer-events-none z-20"></div>
              
              {/* Layer 2: Thin elegant border + Layer 1: Portrait image */}
              <div className="relative w-[375px] h-[375px] rounded-full border-[2px] border-[#1E4DFF]/55 z-30 flex items-center justify-center bg-[#050B14]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img 
                    src="/images/profile.png.jpeg" 
                    alt="Vanshika Verma" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Minimal Scroll Down Button */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <button
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="text-[#A9B4C7] hover:text-[#00E5FF] transition-colors duration-300 focus:outline-none p-2 animate-bounce hover:animate-none"
          aria-label="Scroll to About Section"
        >
          <ChevronDown className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </motion.div>
    </section>
  );
}
