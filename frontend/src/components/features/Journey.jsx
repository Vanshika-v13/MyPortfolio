import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Layers, Terminal, Compass, Zap, GitBranch, Database, Layout } from 'lucide-react';

const skillsDeveloped = [
  { label: "System Design Thinking", icon: Layers },
  { label: "API Development", icon: Zap },
  { label: "Database Modeling", icon: Database },
  { label: "Responsive UI Development", icon: Layout },
  { label: "Debugging & Optimization", icon: Terminal },
  { label: "Collaborative Workflows", icon: GitBranch },
];

export default function Journey() {
  return (
    <section id="journey" className="relative py-24 md:py-32 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT SIDE: NARRATIVE */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-10"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
                My Journey
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)]">
                A continuous process of learning, building, and refining how I approach technology and problem-solving.
              </p>
            </div>
            
            <div className="space-y-6 text-base text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                My entry into software development was driven by a deep curiosity about how digital products operate at scale. Exploring beyond the surface level, I found myself captivated by the architecture that ensures systems are resilient, performant, and secure.
              </p>
              <p>
                As I progressed from learning core programming fundamentals to exploring frontend interactivity and backend system design, my focus shifted from just making things work to building them correctly. Every project has been an opportunity to understand new paradigms, tackle complex engineering challenges, and develop a structured approach to problem-solving.
              </p>
            </div>

            {/* Skills Developed */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-text-primary)] mb-6">
                Core Competencies Developed
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillsDeveloped.map((skill, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-surface-elevated)]"
                  >
                    <div className="p-2 rounded-lg bg-[var(--color-bg)]">
                      <skill.icon className="w-4 h-4 text-[var(--color-accent)]" />
                    </div>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      {skill.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Future Direction */}
            <div className="p-6 rounded-2xl bg-[var(--color-surface)] border-l-2 border-[var(--color-accent)]">
              <div className="flex items-center gap-3 mb-3">
                <Compass className="w-5 h-5 text-[var(--color-accent)]" />
                <h4 className="text-lg font-bold text-[var(--color-text-primary)]">Looking Forward</h4>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                I am continuously seeking opportunities to build scalable products, strengthen my expertise in backend engineering, and learn modern architectural patterns. My goal is to contribute to impactful solutions with a focus on code quality, user experience, and systems thinking.
              </p>
            </div>
            
          </motion.div>

          {/* RIGHT SIDE: VISUAL REPRESENTATION */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full h-[500px] flex items-center justify-center lg:justify-end"
          >
            {/* Abstract background glow */}
            <div className="absolute top-1/2 left-1/2 lg:left-3/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-[var(--color-accent-secondary)]/10 to-[var(--color-accent)]/5 blur-3xl pointer-events-none"></div>

            {/* Visual Node System */}
            <div className="relative w-full max-w-[400px] h-full flex flex-col items-center justify-center gap-6">
              
              {/* Layer 1: Foundation */}
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-48 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-surface-elevated)] shadow-subtle flex flex-col items-center justify-center gap-2 z-10"
              >
                <BookOpen className="w-6 h-6 text-[var(--color-text-secondary)]" />
                <div className="w-16 h-1 rounded-full bg-[var(--color-surface-elevated)]"></div>
              </motion.div>

              {/* Connecting line */}
              <div className="w-px h-8 bg-gradient-to-b from-[var(--color-surface-elevated)] to-transparent"></div>

              {/* Layer 2: Core Engineering */}
              <div className="flex gap-6 z-20">
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="w-32 p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-surface-elevated)] shadow-elevated flex items-center justify-center"
                >
                  <Terminal className="w-6 h-6 text-[var(--color-accent)]" />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="w-32 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-surface-elevated)] shadow-subtle flex items-center justify-center"
                >
                  <Database className="w-6 h-6 text-[var(--color-accent-secondary)]" />
                </motion.div>
              </div>

              {/* Connecting line */}
              <div className="w-px h-8 bg-gradient-to-t from-[var(--color-accent)]/30 to-transparent"></div>

              {/* Layer 3: System Complexity */}
              <motion.div 
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="w-64 p-5 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-accent)]/20 shadow-elevated flex flex-col items-center justify-center gap-3 z-30"
              >
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent-secondary)]"></div>
                  <div className="w-2 h-2 rounded-full bg-[var(--color-text-secondary)]"></div>
                </div>
                <div className="w-3/4 h-1 rounded-full bg-[var(--color-surface-elevated)]"></div>
                <div className="w-1/2 h-1 rounded-full bg-[var(--color-surface-elevated)]"></div>
              </motion.div>
              
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
