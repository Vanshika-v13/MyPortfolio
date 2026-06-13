import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useProjects } from '../../hooks/usePortfolioData';

export default function ProjectNavigation({ currentSlug }) {
  const { data: projects } = useProjects();
  const navigate = useNavigate();

  if (!projects || projects.length < 2) return null;

  const currentIndex = projects.findIndex(
    (p) => p.slug === currentSlug || p.id === currentSlug || p._id === currentSlug
  );
  if (currentIndex === -1) return null;

  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div
      className="py-10"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(7,20,37,0.6)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Previous */}
        <button
          onClick={() => navigate(`/projects/${prevProject.slug || prevProject._id || prevProject.id}`)}
          className="group flex flex-col items-start text-left focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/40 rounded-lg p-2 -m-2 transition-all"
          aria-label={`Go to ${prevProject.title}`}
        >
          <span
            className="flex items-center gap-1.5 text-xs font-medium mb-1.5 transition-colors"
            style={{ color: '#6B7A90' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous
          </span>
          <span
            className="text-lg font-semibold text-[#A9B4C7] transition-colors group-hover:text-[#E6F1FF] line-clamp-1"
          >
            {prevProject.title}
          </span>
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-10 bg-[rgba(255,255,255,0.08)]" />

        {/* Next */}
        <button
          onClick={() => navigate(`/projects/${nextProject.slug || nextProject._id || nextProject.id}`)}
          className="group flex flex-col items-end text-right focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/40 rounded-lg p-2 -m-2 transition-all"
          aria-label={`Go to ${nextProject.title}`}
        >
          <span
            className="flex items-center gap-1.5 text-xs font-medium mb-1.5 transition-colors"
            style={{ color: '#6B7A90' }}
          >
            Next
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <span
            className="text-lg font-semibold text-[#A9B4C7] transition-colors group-hover:text-[#E6F1FF] line-clamp-1"
          >
            {nextProject.title}
          </span>
        </button>

      </div>
    </div>
  );
}
