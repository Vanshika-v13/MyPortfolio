import React from 'react';
import { motion } from 'framer-motion';
import { useSectionAnimation } from '../../hooks/useSectionAnimation';

// External Icons (SimpleIcons via react-icons)
import { FaJava, FaGithub, FaCss3Alt } from 'react-icons/fa';
import { 
  SiJavascript, SiPython, SiCplusplus, SiC,
  SiHtml5, SiReact, SiNextdotjs, SiTailwindcss, SiBootstrap, SiRedux,
  SiMongodb, SiMysql, SiNodedotjs,
  SiGit, SiPostman, SiRender, SiDocker
} from 'react-icons/si';

// Conceptual Icons (Lucide)
import { Code2, Globe, Database, Wrench, ServerCog, Braces } from 'lucide-react';

import ExpertiseCard from '../expertise/ExpertiseCard';
import TechItem from '../expertise/TechItem';

const Background = ({ isPlaying }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={isPlaying ? { opacity: 1 } : { opacity: 0 }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#050B14]"
  >
    {/* Secondary Depth Layer */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#071425_0%,transparent_100%)] opacity-80" />

    {/* Left Ambient Glow */}
    <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] bg-[#1E4DFF] rounded-full blur-[300px] opacity-[0.09] mix-blend-screen" />
    
    {/* Right Ambient Glow */}
    <div className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] bg-[#00E5FF] rounded-full blur-[300px] opacity-[0.06] mix-blend-screen" />

    {/* Center Depth Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.03)_0%,transparent_60%)]" />

    {/* Premium Glass Noise Texture (1-2% Opacity) */}
    <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilterSkills">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilterSkills)" />
      </svg>
    </div>
  </motion.div>
);

export default function Expertise() {
  const isPlaying = useSectionAnimation('expertise');

  const containerVariants = {
    hidden: {},
    visible: {}
  };

  // Top Cards
  const topCardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2, delay: 0.4, ease: "easeOut" }
    }
  };

  // Bottom Card
  const bottomCardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2, delay: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="expertise" 
      className="relative w-full min-h-[90vh] bg-[#050B14] flex flex-col overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24"
    >
      <Background isPlaying={isPlaying} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 flex flex-col items-center">
        
        {/* Section Header (Matching About & Projects) */}
        <div className="relative flex justify-center mb-2 md:mb-4 w-full flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={isPlaying ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="text-center relative z-10"
          >
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold text-[#FFFFFF] tracking-tight mb-1 uppercase">
              TECHNICAL EXPERTISE
            </h2>
            <p className="text-[#00E5FF] text-xs md:text-sm font-medium tracking-wide uppercase">
              Technologies & Tools I Work With
            </p>
          </motion.div>
        </div>

        {/* Hierarchy Tree & Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isPlaying ? "visible" : "hidden"}
          className="flex flex-col items-center w-full max-w-5xl mx-auto relative z-10 -mt-2"
        >
          {/* Vertical Line Descending from Header */}
          <div className="hidden lg:flex flex-col items-center relative z-20">
            {/* Top Node */}
            <motion.div 
              variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: { scale: 1, opacity: 1, transition: { duration: 0.1, ease: "easeOut" } }
              }}
              className="w-[6px] h-[6px] rounded-full bg-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,1)] relative z-20 mb-[-3px]"
            />
            {/* Vertical Line */}
            <motion.div 
              variants={{
                hidden: { scaleY: 0, opacity: 0, originY: 0 },
                visible: { scaleY: 1, opacity: 1, transition: { duration: 0.15, delay: 0.1, ease: "easeInOut" } }
              }}
              className="w-px h-[24px] bg-gradient-to-b from-[rgba(0,229,255,0.4)] to-[rgba(0,229,255,0.15)] relative z-10"
            />
          </div>

          <div className="w-full relative pt-[16px] pb-[16px]">
            {/* Top Tree Connections */}
            <motion.div 
              variants={{
                hidden: { clipPath: 'inset(0% 50% 0% 50%)', opacity: 0 },
                visible: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, transition: { duration: 0.15, delay: 0.25, ease: "easeInOut" } }
              }}
              className="hidden lg:block absolute top-0 left-[calc(16.666%-8px)] right-[calc(16.666%-8px)] h-[16px] border-t border-l border-r border-[rgba(0,229,255,0.2)] rounded-t-[12px] z-0" 
            />
            <motion.div 
              variants={{
                hidden: { scaleY: 0, opacity: 0, originY: 0 },
                visible: { scaleY: 1, opacity: 1, transition: { duration: 0.15, delay: 0.25, ease: "easeInOut" } }
              }}
              className="hidden lg:block absolute top-0 left-1/2 w-px h-[16px] bg-[rgba(0,229,255,0.2)] -translate-x-1/2 z-0" 
            />

            {/* Bottom Tree Connections */}
            <motion.div 
              variants={{
                hidden: { clipPath: 'inset(0% 50% 0% 50%)', opacity: 0 },
                visible: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, transition: { duration: 0.1, delay: 0.6, ease: "easeInOut" } }
              }}
              className="hidden lg:block absolute bottom-0 left-[calc(16.666%-8px)] right-[calc(16.666%-8px)] h-[16px] border-b border-l border-r border-[rgba(0,229,255,0.2)] rounded-b-[12px] z-0" 
            />
            <motion.div 
              variants={{
                hidden: { scaleY: 0, opacity: 0, originY: 1 },
                visible: { scaleY: 1, opacity: 1, transition: { duration: 0.1, delay: 0.6, ease: "easeInOut" } }
              }}
              className="hidden lg:block absolute bottom-0 left-1/2 w-px h-[16px] bg-[rgba(0,229,255,0.2)] -translate-x-1/2 z-0" 
            />

            {/* Level 1: Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
              
              {/* Languages & Programming */}
              <motion.div variants={topCardVariants} className="w-full">
                <ExpertiseCard title="Languages & Programming" icon={<Code2 className="w-4 h-4" />}>
                  <div className="grid grid-cols-2 gap-2">
                    <TechItem icon={SiC} name="C" iconColor="#A8B9CC" />
                    <TechItem icon={SiJavascript} name="JavaScript" iconColor="#F7DF1E" />
                    <TechItem icon={SiCplusplus} name="C++" iconColor="#00599C" />
                    <TechItem icon={SiHtml5} name="HTML" iconColor="#E34F26" />
                    <TechItem icon={FaJava} name="Java" iconColor="#ED8B00" />
                    <TechItem icon={FaCss3Alt} name="CSS" iconColor="#1572B6" />
                    <TechItem icon={SiPython} name="Python" iconColor="#3776AB" />
                  </div>
                </ExpertiseCard>
              </motion.div>

              {/* Web Development */}
              <motion.div variants={topCardVariants} className="w-full">
                <ExpertiseCard title="Web Development" icon={<Globe className="w-4 h-4" />}>
                  <div className="grid grid-cols-2 gap-2">
                    <TechItem icon={SiReact} name="React" iconColor="#61DAFB" />
                    <TechItem icon={SiTailwindcss} name="Tailwind CSS" iconColor="#06B6D4" />
                    <TechItem icon={SiNextdotjs} name="Next.js" iconColor="#FFFFFF" />
                    <TechItem icon={SiBootstrap} name="Bootstrap" iconColor="#7952B3" />
                    <TechItem icon={SiRedux} name="Redux" iconColor="#764ABC" />
                    <TechItem icon={Code2} name="DOM Manipulation" iconColor="#E6F1FF" />
                  </div>
                </ExpertiseCard>
              </motion.div>

              {/* Databases & Backend */}
              <motion.div variants={topCardVariants} className="w-full">
                <ExpertiseCard title="Databases & Backend" icon={<Database className="w-4 h-4" />}>
                  <div className="grid grid-cols-2 gap-2">
                    <TechItem icon={SiMongodb} name="MongoDB" iconColor="#47A248" />
                    <TechItem icon={ServerCog} name="API Development" iconColor="#E6F1FF" />
                    <TechItem icon={SiMysql} name="MySQL" iconColor="#4479A1" />
                    <TechItem icon={SiNodedotjs} name="Node.js" iconColor="#339933" />
                    <TechItem icon={Braces} name="REST APIs" iconColor="#00E5FF" />
                  </div>
                </ExpertiseCard>
              </motion.div>

            </div>
          </div>

          {/* Vertical Line Descending to Level 2 */}
          <motion.div 
            variants={{
              hidden: { scaleY: 0, opacity: 0, originY: 0 },
              visible: { scaleY: 1, opacity: 1, transition: { duration: 0.1, delay: 0.7, ease: "easeInOut" } }
            }}
            className="hidden lg:flex flex-col items-center relative z-20 w-px h-[24px] bg-gradient-to-t from-[rgba(0,229,255,0.4)] to-[rgba(0,229,255,0.2)]"
          >
            <div className="absolute top-0 left-1/2 w-[6px] h-[6px] rounded-full bg-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,1)] -translate-x-1/2 -translate-y-[3px] z-20" />
          </motion.div>

          {/* Level 2: Systems & Tools */}
          <div className="w-full lg:w-[65%] relative z-10">
            <motion.div variants={bottomCardVariants} className="w-full relative z-10">
              <ExpertiseCard title="Systems & Tools" icon={<Wrench className="w-4 h-4" />} className="!py-3">
                <div className="flex flex-wrap justify-center gap-2">
                  <TechItem icon={SiGit} name="Git" iconColor="#F05032" />
                  <TechItem icon={FaGithub} name="GitHub" iconColor="#FFFFFF" />
                  <TechItem icon={SiDocker} name="Docker" iconColor="#2496ED" />
                  <TechItem icon={SiRender} name="Render" iconColor="#FFFFFF" />
                  <TechItem icon={SiPostman} name="Postman" iconColor="#FF6C37" />
                </div>
              </ExpertiseCard>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
