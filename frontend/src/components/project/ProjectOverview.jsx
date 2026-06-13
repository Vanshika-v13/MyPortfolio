import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectOverview({ project }) {
  return (
    <section>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-accent)] mb-4">
          Project Overview
        </h2>
        <div className="prose prose-invert max-w-none text-[var(--color-text-secondary)]">
          <p className="text-lg leading-relaxed mb-6">
            {project.description}
          </p>
          {project.problemStatement && (
            <>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mt-8 mb-4">The Problem</h3>
              <p className="text-base leading-relaxed mb-6">
                {project.problemStatement}
              </p>
            </>
          )}
          {project.targetAudience && (
            <>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mt-8 mb-4">Target Audience</h3>
              <p className="text-base leading-relaxed mb-6">
                {project.targetAudience}
              </p>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
