import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiMongodb } from 'react-icons/si';
import heroImage from '../../assets/myPhoto_.jpeg';

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
                { icon: <FaGithub size={20} />, href: "https://github.com" },
                { icon: <FaLinkedin size={20} />, href: "https://linkedin.com" },
                { icon: <FaEnvelope size={20} />, href: "mailto:contact@example.com" }
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
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end items-center mt-12 lg:mt-0"
          >
            {/* Background Glows behind the image */}
            <div className="absolute inset-0 m-auto w-[80%] h-[80%] bg-[#2D9CFF] rounded-full blur-[100px] opacity-[0.2] pointer-events-none"></div>
            <div className="absolute top-10 left-10 w-[60%] h-[60%] bg-[#00D4FF] rounded-full blur-[80px] opacity-[0.15] pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-[60%] h-[60%] bg-[#6C63FF] rounded-full blur-[80px] opacity-[0.15] pointer-events-none"></div>

            {/* Aurora Glass Frame */}
            <div 
              className="relative z-10 max-w-[400px] w-full"
              style={{
                background: 'rgba(16,24,39,0.65)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
              }}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#2D9CFF]/30 rounded-tl-[24px] pointer-events-none z-20"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00D4FF]/30 rounded-tr-[24px] pointer-events-none z-20"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00D4FF]/30 rounded-bl-[24px] pointer-events-none z-20"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#2D9CFF]/30 rounded-br-[24px] pointer-events-none z-20"></div>

              {/* Light Reflection overlay inside the frame, clipped to frame */}
              <div className="absolute inset-0 pointer-events-none rounded-[24px] overflow-hidden z-20">
                <motion.div
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 7,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.04)] to-transparent skew-x-[-20deg]"
                />
              </div>

              <img 
                src={heroImage} 
                alt="Vanshika Verma" 
                className="w-full h-auto object-cover rounded-[16px] relative z-10"
              />
              
              {/* Optional Tech Badges (Static after load) */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl flex items-center justify-center border border-[rgba(255,255,255,0.08)] bg-[rgba(16,24,39,0.85)] backdrop-blur-md shadow-lg">
                <FaReact size={24} className="text-[#00D4FF]" />
              </div>
              <div className="absolute top-1/4 -right-5 w-10 h-10 rounded-xl flex items-center justify-center border border-[rgba(255,255,255,0.08)] bg-[rgba(16,24,39,0.85)] backdrop-blur-md shadow-lg">
                <FaNodeJs size={20} className="text-[#68A063]" />
              </div>
              <div className="absolute bottom-1/4 -left-5 w-10 h-10 rounded-xl flex items-center justify-center border border-[rgba(255,255,255,0.08)] bg-[rgba(16,24,39,0.85)] backdrop-blur-md shadow-lg">
                <SiMongodb size={20} className="text-[#4DB33D]" />
              </div>
              <div className="absolute -bottom-4 right-10 w-12 h-12 rounded-xl flex items-center justify-center border border-[rgba(255,255,255,0.08)] bg-[rgba(16,24,39,0.85)] backdrop-blur-md shadow-lg">
                <FaDocker size={24} className="text-[#2496ED]" />
              </div>
              <div className="absolute -bottom-4 left-10 w-12 h-12 rounded-xl flex items-center justify-center border border-[rgba(255,255,255,0.08)] bg-[rgba(16,24,39,0.85)] backdrop-blur-md shadow-lg">
                <FaGithub size={24} className="text-white" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
