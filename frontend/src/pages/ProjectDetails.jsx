import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { FaGithub, FaCode } from 'react-icons/fa';
import { 
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss, 
  SiRedux, SiFirebase, SiSocketdotio, SiVite, SiJavascript, 
  SiPython, SiTypescript, SiPostgresql, SiMysql, SiDocker
} from 'react-icons/si';
import { Helmet } from 'react-helmet-async';

import { useProject } from '../hooks/usePortfolioData';
import Navbar from '../components/layout/Navbar';
import ProjectDetailsSkeleton from './ProjectDetailsSkeleton';
import './ProjectDetails.css';

const getTechIcon = (techName) => {
  if (!techName) return <FaCode />;
  const name = techName.toLowerCase();
  if (name.includes('react')) return <SiReact />;
  if (name.includes('node')) return <SiNodedotjs />;
  if (name.includes('mongo')) return <SiMongodb />;
  if (name.includes('express')) return <SiExpress />;
  if (name.includes('tailwind')) return <SiTailwindcss />;
  if (name.includes('redux')) return <SiRedux />;
  if (name.includes('firebase')) return <SiFirebase />;
  if (name.includes('socket')) return <SiSocketdotio />;
  if (name.includes('vite')) return <SiVite />;
  if (name.includes('javascript') || name === 'js') return <SiJavascript />;
  if (name.includes('python')) return <SiPython />;
  if (name.includes('typescript') || name === 'ts') return <SiTypescript />;
  if (name.includes('postgres')) return <SiPostgresql />;
  if (name.includes('mysql')) return <SiMysql />;
  if (name.includes('docker')) return <SiDocker />;
  return <FaCode />;
};

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: project, isLoading, isError } = useProject(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <ProjectDetailsSkeleton />;

  if (isError || !project) {
    return (
      <div className="pd-page">
        <Navbar />
        <main className="pd-not-found">
          <h1>Project Not Found</h1>
          <p>The project you are looking for does not exist or could not be loaded.</p>
          <Link to="/" className="pd-not-found-btn">Return Home</Link>
        </main>
      </div>
    );
  }

  const features = (project.features || []).slice(0, 6);
  const rawTechs = project.technologies || project.techStack || [];
  const technologies = rawTechs.map(t => (typeof t === 'string' ? t : t.name)).slice(0, 8);

  const getImpactStatement = () => {
    if (project.impactStatement) return project.impactStatement;
    if (project.shortDescription) return project.shortDescription;
    if (project.description) {
      const firstSentence = project.description.split(/(?<=[.?!])\s+/)[0];
      if (firstSentence && firstSentence.length <= 150) {
        return firstSentence;
      }
    }
    return 'A specialized engineering solution.';
  };

  const impactStatement = getImpactStatement();
  
  let mainDescription = project.description || '';
  if (mainDescription.startsWith(impactStatement) && mainDescription !== impactStatement) {
    mainDescription = mainDescription.substring(impactStatement.length).trim();
  } else if (mainDescription === impactStatement) {
    mainDescription = '';
  }

  // Title Splitting System (Primary White, Secondary Gradient)
  const titleParts = project.title.split(/\s+[—\-]\s+/);
  const primaryTitle = titleParts[0];
  const secondaryTitle = titleParts[1] || '';

  // Specific Entry Animations
  const leftAnim = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const rightAnim = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const bottomAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  // Reusable Tech Stack Component
  const TechStackList = ({ className }) => (
    <motion.div
      className={`pd-tech-section ${className}`}
      variants={bottomAnim}
      initial="hidden"
      animate="visible"
    >
      <div className="pd-tags">
        {technologies.map((tech, i) => (
          <div key={i} className="pd-tag">
            <span className="pd-tag-icon">{getTechIcon(tech)}</span>
            <span className="pd-tag-label">{tech}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="pd-page">
      <Helmet>
        <title>{project.title} | Vanshika Verma</title>
        <meta name="description" content={impactStatement} />
      </Helmet>

      {/* Navigation remains visible at top */}
      <Navbar />

      {/* Premium Engineering Background System (8 Layers) */}
      <div className="pd-bg-system">
        <div className="pd-bg-layer-1" /> {/* Base */}
        <div className="pd-bg-layer-8" /> {/* Noise Texture */}
        <div className="pd-bg-layer-2" /> {/* Blueprint Grid */}
        
        {/* Layer 3 & 5: Engineering Lines, Circuit Paths & Nodes */}
        <div className="pd-bg-layer-3">
          <div className="pd-circuit-path pd-circuit-title" />
          <div className="pd-circuit-path pd-circuit-screenshot" />
          
          {Array.from({ length: 25 }, (_, i) => (
            <div 
              key={`node-${i}`} 
              className="pd-bg-random-node"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Layer 4: Faded Symbols */}
        <div className="pd-bg-layer-4">
          <span className="pd-bg-symbol pd-bg-sym-1">{'{ }'}</span>
          <span className="pd-bg-symbol pd-bg-sym-2">{'< >'}</span>
          <span className="pd-bg-symbol pd-bg-sym-3">{'[ ]'}</span>
          <span className="pd-bg-symbol pd-bg-sym-4">{'( )'}</span>
        </div>

        {/* Layer 7: Bottom Waveform */}
        <div className="pd-bg-layer-7">
          <svg className="pd-wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0, 229, 255, 0.4)" />
                <stop offset="50%" stopColor="rgba(30, 77, 255, 0.4)" />
                <stop offset="100%" stopColor="rgba(138, 43, 226, 0.4)" />
              </linearGradient>
              <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(138, 43, 226, 0.3)" />
                <stop offset="50%" stopColor="rgba(0, 229, 255, 0.3)" />
                <stop offset="100%" stopColor="rgba(30, 77, 255, 0.3)" />
              </linearGradient>
            </defs>
            <path fill="url(#waveGrad1)" d="M0,160 L0,320 L1440,320 L1440,160 C1120,60,1060,320,740,160 C420,0,320,300,0,160 Z" opacity="0.25" />
            <path fill="url(#waveGrad2)" d="M0,200 L0,320 L1440,320 L1440,200 C1220,260,1160,100,840,200 C520,300,220,100,0,200 Z" opacity="0.35" />
          </svg>
        </div>

        {/* Layer 6: Localized Lighting */}
        <div className="pd-bg-layer-6">
          <div className="pd-glow-spotlight-blue" />
          <div className="pd-glow-spotlight-cyan" />
        </div>
      </div>

      <main className="pd-content">
        <div className="pd-layout">
          {/* ── LEFT: Info Column (42%) ─────── */}
          <motion.div 
            className="pd-left"
            variants={leftAnim}
            initial="hidden"
            animate="visible"
          >
            <button 
              onClick={() => navigate(-1)} 
              className="pd-back" 
              aria-label="Go back"
            >
              <ArrowLeft size={14} />
              Back to Projects
            </button>

            <div className="pd-title-container">
              <h1 className="pd-title-primary">{primaryTitle}</h1>
              {secondaryTitle && <h2 className="pd-title-secondary">{secondaryTitle}</h2>}
              <div className="pd-title-line" />
            </div>

            {impactStatement && (
              <div className="pd-impact-container">
                <p className="pd-impact">{impactStatement}</p>
              </div>
            )}

            {mainDescription && (
              <p className="pd-description">{mainDescription}</p>
            )}

            {(project.liveUrl || project.githubUrl) && (
              <div className="pd-actions">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd-btn pd-btn-live"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd-btn pd-btn-source"
                  >
                    <FaGithub size={14} style={{ marginRight: '8px' }} />
                    Source Code
                  </a>
                )}
              </div>
            )}

            {/* Desktop Tech Stack */}
            {technologies.length > 0 && <TechStackList className="pd-desktop-only" />}
          </motion.div>

          {/* ── RIGHT: Visuals Column (58%) ───────── */}
          <div className="pd-right">
            <motion.div
              className="pd-screenshot-wrapper"
              variants={rightAnim}
              initial="hidden"
              animate="visible"
            >
              <div className="pd-screenshot-frame">
                {project.detailsImage || project.thumbnail ? (
                  <img
                    src={project.detailsImage || project.thumbnail}
                    alt={`${project.title} preview`}
                    className="pd-screenshot-img"
                  />
                ) : (
                  <div className="pd-no-screenshot">System Preview Unavailable</div>
                )}
              </div>
            </motion.div>

            {/* Mobile Tech Stack (Ordered after screenshot) */}
            {technologies.length > 0 && <TechStackList className="pd-mobile-only" />}

            {features.length > 0 && (
              <motion.div
                className="pd-features-section"
                variants={bottomAnim}
                initial="hidden"
                animate="visible"
              >
                <div className="pd-features-grid">
                  {features.map((feature, idx) => {
                    const title = typeof feature === 'string' ? feature : (feature.title || 'Feature');
                    return (
                      <div key={idx} className="pd-feature-item">
                        <span className="pd-feature-check">✓</span>
                        <span className="pd-feature-title">{title}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
