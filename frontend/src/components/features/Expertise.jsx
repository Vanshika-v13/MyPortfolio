import React from 'react';
import { motion } from 'framer-motion';

// External Icons (SimpleIcons via react-icons)
import { FaJava, FaGithub, FaCode } from 'react-icons/fa';
import { 
  SiJavascript, SiPython, SiCplusplus,
  SiReact, SiVite, SiTailwindcss, SiFramer, SiReactrouter,
  SiNodedotjs, SiExpress, SiJsonwebtokens,
  SiMongodb, SiMysql,
  SiGit, SiPostman, SiRender, SiVercel
} from 'react-icons/si';

// Conceptual Icons (Lucide)
import { 
  Network, Blocks, Database, Cpu, Globe, ServerCog
} from 'lucide-react';

import ExpertiseCard from '../expertise/ExpertiseCard';
import TechItem from '../expertise/TechItem';

export default function Expertise() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="expertise" className="relative py-24 md:py-32 bg-[var(--color-bg)]">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6"
          >
            Technical Expertise
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed text-balance"
          >
            A collection of technologies and concepts I use to design, build, and maintain modern applications.
          </motion.p>
        </div>

        {/* 2-Column Responsive Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Programming Languages */}
          <motion.div variants={itemVariants}>
            <ExpertiseCard title="Programming Languages" className="h-full">
              <div className="grid grid-cols-2 gap-4">
                <TechItem icon={FaJava} name="Java" />
                <TechItem icon={SiJavascript} name="JavaScript" />
                <TechItem icon={SiPython} name="Python" />
                <TechItem icon={SiCplusplus} name="C++" />
              </div>
            </ExpertiseCard>
          </motion.div>

          {/* Frontend Development */}
          <motion.div variants={itemVariants}>
            <ExpertiseCard title="Frontend Development" className="h-full">
              <div className="flex flex-col gap-4">
                <TechItem icon={SiReact} name="React" label="UI Framework" />
                <div className="grid grid-cols-2 gap-4">
                  <TechItem icon={SiVite} name="Vite" label="Build Tool" />
                  <TechItem icon={SiTailwindcss} name="Tailwind CSS" label="Styling" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <TechItem icon={SiFramer} name="Framer Motion" label="Animation" />
                  <TechItem icon={SiReactrouter} name="React Router" label="Routing" />
                </div>
              </div>
            </ExpertiseCard>
          </motion.div>

          {/* Backend Development */}
          <motion.div variants={itemVariants}>
            <ExpertiseCard title="Backend Development" className="h-full">
              <div className="flex flex-col gap-4">
                <TechItem icon={SiNodedotjs} name="Node.js" label="Runtime" />
                <div className="grid grid-cols-2 gap-4">
                  <TechItem icon={SiExpress} name="Express.js" label="Framework" />
                  <TechItem icon={ServerCog} name="REST APIs" label="Architecture" />
                </div>
                <TechItem icon={SiJsonwebtokens} name="JWT" label="Authentication" />
              </div>
            </ExpertiseCard>
          </motion.div>

          {/* Databases */}
          <motion.div variants={itemVariants}>
            <ExpertiseCard title="Databases" className="h-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full content-start">
                <TechItem icon={SiMongodb} name="MongoDB" label="NoSQL Document" />
                <TechItem icon={SiMysql} name="MySQL" label="Relational" />
              </div>
            </ExpertiseCard>
          </motion.div>

          {/* Tools & Platforms */}
          <motion.div variants={itemVariants}>
            <ExpertiseCard title="Tools & Platforms" className="h-full">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase text-[var(--color-text-secondary)] mb-3">Version Control</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <TechItem icon={SiGit} name="Git" />
                    <TechItem icon={FaGithub} name="GitHub" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-[var(--color-text-secondary)] mb-3">Testing & Dev</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <TechItem icon={SiPostman} name="Postman" />
                    <TechItem icon={FaCode} name="VS Code" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-[var(--color-text-secondary)] mb-3">Deployment</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <TechItem icon={SiVercel} name="Vercel" />
                    <TechItem icon={SiRender} name="Render" />
                  </div>
                </div>
              </div>
            </ExpertiseCard>
          </motion.div>

          {/* Core Computer Science */}
          <motion.div variants={itemVariants}>
            <ExpertiseCard title="Core Computer Science" className="h-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TechItem icon={Network} name="DSA" label="Data Structures & Algorithms" />
                <TechItem icon={Blocks} name="OOP" label="Object-Oriented Programming" />
                <TechItem icon={Database} name="DBMS" label="Database Management Systems" />
                <TechItem icon={Cpu} name="OS" label="Operating Systems" />
                <TechItem icon={Globe} name="CN" label="Computer Networks" className="sm:col-span-2" />
              </div>
            </ExpertiseCard>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
