import React from 'react';
import { motion } from 'framer-motion';

const achievements = [
  {
    value: "9.29",
    label: "Academic Excellence",
    title: "CGPA"
  },
  {
    value: "4+",
    label: "Projects Built",
    title: "Projects"
  },
  {
    value: "8+",
    label: "Continuous Learning",
    title: "Certificates"
  },
  {
    value: "15+",
    label: "Technologies Used",
    title: "Technologies"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-32 bg-[var(--color-surface)]">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6">
            Achievements & Milestones
          </h2>
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Each milestone reflects continuous learning, practical experience, and a commitment to building better solutions.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {achievements.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="p-8 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-surface-elevated)] shadow-subtle hover:shadow-elevated hover:border-[var(--color-accent)]/30 flex flex-col items-center justify-center text-center transition-all group"
            >
              <h3 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-text-secondary)] mb-4">
                {item.title}
              </h3>
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                {item.value}
              </div>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-2">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
