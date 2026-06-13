import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowRight, Server, Database, Globe } from 'lucide-react';

export default function Architecture({ project }) {
  // If the project doesn't have architecture details, return null
  if (!project.architecture && !project.systemDesign) return null;

  return (
    <section>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-accent)] mb-8 text-center">
          System Architecture
        </h2>
        
        {/* Abstract Architecture Diagram */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full py-16 px-6 md:px-12 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-surface-elevated)] overflow-hidden mb-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4"
        >
          {/* Client Node */}
          <div className="flex flex-col items-center z-10">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-surface-elevated)] shadow-elevated flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-[var(--color-text-secondary)]" />
            </div>
            <span className="text-sm font-medium text-[var(--color-text-primary)]">Client</span>
          </div>

          {/* Connection */}
          <div className="hidden md:flex flex-grow items-center justify-center relative">
            <div className="w-full h-px bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-accent)]/50 to-[var(--color-surface)]"></div>
            <ArrowRight className="absolute text-[var(--color-accent)]/50 w-5 h-5" />
          </div>

          {/* API/Server Node */}
          <div className="flex flex-col items-center z-10">
            <div className="w-20 h-20 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-accent)]/30 shadow-elevated flex items-center justify-center mb-4 relative">
              <div className="absolute inset-0 rounded-2xl bg-[var(--color-accent)]/5 animate-pulse"></div>
              <Server className="w-10 h-10 text-[var(--color-accent)]" />
            </div>
            <span className="text-sm font-medium text-[var(--color-text-primary)]">API Gateway</span>
          </div>

          {/* Connection */}
          <div className="hidden md:flex flex-grow items-center justify-center relative">
            <div className="w-full h-px bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-accent-secondary)]/50 to-[var(--color-surface)]"></div>
            <ArrowRight className="absolute text-[var(--color-accent-secondary)]/50 w-5 h-5" />
          </div>

          {/* Database Node */}
          <div className="flex flex-col items-center z-10">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-surface-elevated)] shadow-elevated flex items-center justify-center mb-4">
              <Database className="w-8 h-8 text-[var(--color-accent-secondary)]" />
            </div>
            <span className="text-sm font-medium text-[var(--color-text-primary)]">Database</span>
          </div>
        </motion.div>

        {/* Text Details */}
        <div className="prose prose-invert max-w-3xl mx-auto text-[var(--color-text-secondary)]">
          <p className="text-lg leading-relaxed">
            {project.architecture || project.systemDesign || "The architecture focuses on clear separation of concerns, ensuring that the frontend presentation layer remains decoupled from the backend business logic and data persistence."}
          </p>
        </div>
      </div>
    </section>
  );
}
