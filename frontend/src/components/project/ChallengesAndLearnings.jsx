import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Lightbulb } from 'lucide-react';

export default function ChallengesAndLearnings({ project }) {
  const hasChallenges = project.challenges && project.challenges.length > 0;
  const hasLearnings = project.learnings && project.learnings.length > 0;

  if (!hasChallenges && !hasLearnings) return null;

  return (
    <section>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Challenges */}
        {hasChallenges && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-[var(--color-surface-elevated)] pb-4">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Challenges Faced</h2>
            </div>
            <ul className="space-y-6">
              {project.challenges.map((challenge, idx) => (
                <li key={idx} className="text-[var(--color-text-secondary)] text-base leading-relaxed">
                  <span className="block font-semibold text-[var(--color-text-primary)] mb-1">
                    {typeof challenge === 'string' ? "Engineering Challenge" : challenge.title}
                  </span>
                  {typeof challenge === 'string' ? challenge : challenge.description}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Learnings */}
        {hasLearnings && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-[var(--color-surface-elevated)] pb-4">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Key Learnings</h2>
            </div>
            <ul className="space-y-6">
              {project.learnings.map((learning, idx) => (
                <li key={idx} className="text-[var(--color-text-secondary)] text-base leading-relaxed">
                  <span className="block font-semibold text-[var(--color-text-primary)] mb-1">
                    {typeof learning === 'string' ? "Growth Insight" : learning.title}
                  </span>
                  {typeof learning === 'string' ? learning : learning.description}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

      </div>
    </section>
  );
}
