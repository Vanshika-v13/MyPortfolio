import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const STATUS_LABELS = [
  "Production Ready",
  "Live Deployment",
  "Full Stack System",
  "Scalable Architecture",
  "Case Study",
  "Production Build"
];
const getStatusLabel = (id) => {
  if (!id) return STATUS_LABELS[0];
  const str = String(id);
  let sum = 0;
  for (let i = 0; i < str.length; i++) sum += str.charCodeAt(i);
  return STATUS_LABELS[sum % STATUS_LABELS.length];
};

export default function ProjectHero({ project }) {
  return (
    <section className="pt-32 pb-16 px-6 lg:px-8 bg-[var(--color-surface)] border-b border-[var(--color-surface-elevated)]/30">
      <div className="max-w-4xl mx-auto text-center">
        {project.featured && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-bg)] border border-[var(--color-surface-elevated)]/40 text-[var(--color-text-primary)] text-xs font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></span> {getStatusLabel(project.id || project._id || project.slug)}
          </motion.div>
        )}
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6 text-balance"
        >
          {project.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-10 text-balance max-w-3xl mx-auto"
        >
          {project.shortDescription || project.description}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--color-text-primary)] text-[var(--color-bg)] rounded-full font-medium transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
            >
              View Live Demo <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent text-[var(--color-text-primary)] border border-[var(--color-surface-elevated)] rounded-full font-medium transition-colors hover:bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
            >
              <FaGithub className="w-4 h-4" /> GitHub Repository
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
