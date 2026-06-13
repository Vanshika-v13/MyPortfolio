import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function KeyFeatures({ features }) {
  if (!features || features.length === 0) return null;

  return (
    <section>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-text-secondary)] mb-8 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-surface-elevated)]"
            >
              <CheckCircle2 className="w-6 h-6 text-[var(--color-accent)] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
