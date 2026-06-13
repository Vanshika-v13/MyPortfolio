import React from 'react';
import { motion } from 'framer-motion';
import { LayoutTemplate, Server, Database, Wrench } from 'lucide-react';

export default function TechStack({ technologies }) {
  if (!technologies || technologies.length === 0) return null;

  // Since the current API might just return an array of strings like ["React", "Node.js"], 
  // we'll attempt to categorize them or display them cleanly in groups.
  // Ideally, the backend would return categories, but if not, we display what we have.
  
  // We'll group them manually for demonstration if they are strings, 
  // or use the objects if the backend provides them as { category, name, icon }.
  // Assuming a mixed approach for robustness.

  const renderCategory = (title, icon, items) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-2 text-[var(--color-text-secondary)] mb-2">
          {icon}
          <h3 className="text-sm font-semibold tracking-wider uppercase">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {items.map((tech, idx) => {
            const name = typeof tech === 'string' ? tech : tech.name;
            return (
              <span key={idx} className="px-4 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-surface-elevated)] text-[var(--color-text-primary)] text-sm font-medium">
                {name}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-surface-elevated)]"
      >
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8">Technology Stack</h2>
        
        {/* If the technologies are just strings, we just display them nicely. 
            If they have categories, we group them. We'll assume a flat list for now but style it cleanly. */}
        <div className="flex flex-wrap gap-4">
          {technologies.map((tech, idx) => {
            const name = typeof tech === 'string' ? tech : tech.name;
            return (
              <div key={idx} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-bg)] border border-[var(--color-surface-elevated)] shadow-subtle hover:shadow-elevated transition-shadow">
                <span className="text-[var(--color-text-primary)] font-medium text-sm">{name}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
