import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/usePortfolioData';

/* ─── Skeleton ─────────────────────────────────────────────────────────── */
function ProjectSkeleton() {
  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden animate-pulse"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(0,229,255,0.08)',
      }}
    >
      <div className="w-full aspect-video bg-[rgba(255,255,255,0.05)]" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-[rgba(255,255,255,0.06)] rounded-md w-2/3" />
        <div className="h-3.5 bg-[rgba(255,255,255,0.04)] rounded w-full" />
        <div className="h-3.5 bg-[rgba(255,255,255,0.04)] rounded w-4/5" />
        <div className="flex gap-2 pt-3">
          <div className="h-8 bg-[rgba(255,255,255,0.05)] rounded-lg w-24" />
          <div className="h-8 bg-[rgba(255,255,255,0.05)] rounded-lg w-20" />
        </div>
      </div>
    </div>
  );
}

/* ─── Card ──────────────────────────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const navigate = useNavigate();
  
  const handleDetails = (e) => {
    e.stopPropagation();
    if (project.slug) {
      sessionStorage.setItem("portfolioScrollPosition", window.scrollY.toString());
      navigate(`/project/${project.slug}`);
    }
  };

  const handleLiveDemo = (e) => {
    e.stopPropagation();
    if (project.liveUrl) window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -5 }}
      className="group flex flex-col rounded-2xl overflow-hidden transition-[border-color,box-shadow] duration-300"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(0,229,255,0.12)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,229,255,0.28)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,229,255,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,229,255,0.12)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
      }}
    >
      {/* ── Thumbnail ─────────────────────────────────────────────────── */}
      <div className="relative w-full aspect-video overflow-hidden" style={{ background: 'rgba(5,11,20,0.6)' }}>
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#6B7A90] text-xs tracking-wide">No Preview</span>
          </div>
        )}
        {/* Darkening veil on hover */}
        <div className="absolute inset-0 bg-[#050B14] opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-[#E6F1FF] font-semibold text-base leading-snug mb-2 transition-colors duration-200 group-hover:text-[#00E5FF]">
          {project.title}
        </h3>

        <p className="text-[#A9B4C7] text-sm leading-relaxed line-clamp-2 flex-grow mb-5">
          {project.shortDescription || project.description}
        </p>

        {/* ── Action row ────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 mt-auto">
          {project.liveUrl && (
            <button
              onClick={handleLiveDemo}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/40"
              style={{
                color: '#00E5FF',
                border: '1px solid rgba(0,229,255,0.25)',
                background: 'transparent',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,229,255,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </button>
          )}

          <button
            onClick={handleDetails}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
            style={{
              color: '#A9B4C7',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#E6F1FF';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#A9B4C7';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.background = 'transparent';
            }}
            aria-label={`View details of ${project.title}`}
          >
            Details
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Grid ──────────────────────────────────────────────────────────────── */
export default function ProjectsGrid() {
  const { data: projects, isLoading, isError } = useProjects();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError || !projects || projects.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 text-center px-4 rounded-2xl"
        style={{
          border: '1px dashed rgba(0,229,255,0.15)',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <p className="text-[#A9B4C7] text-base">
          No projects available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard
          key={project._id || project.id || project.slug}
          project={project}
          index={index}
        />
      ))}
    </div>
  );
}
