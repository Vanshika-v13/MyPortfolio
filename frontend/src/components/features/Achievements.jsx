import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Brain, Award, Code, Users, BookOpen, Rocket, HeartHandshake } from 'lucide-react';
import { useSectionAnimation } from '../../hooks/useSectionAnimation';

const achievements = [
  {
    id: 1,
    title: 'ACADEMICS',
    metric: '9.29',
    metricLabel: 'CGPA',
    description: 'Maintaining academic excellence while building production-level applications.',
    icon: GraduationCap,
    desktopPos: 'w-full lg:col-span-6 lg:col-start-4',
    zIndex: 5,
    animDirection: { y: -40, x: 0 },
    delay: 0.4,
  },
  {
    id: 2,
    title: 'PROBLEM SOLVING',
    metric: '140+',
    metricLabel: 'DSA Problems Solved',
    description: 'Strengthened algorithmic thinking through consistent practice across multiple domains.',
    icon: Brain,
    desktopPos: 'w-full lg:col-span-5 lg:col-start-1 lg:-translate-y-2',
    zIndex: 4,
    animDirection: { y: 0, x: -40 },
    delay: 0.55,
  },
  {
    id: 3,
    title: 'CERTIFICATIONS',
    metric: '03',
    metricLabel: 'Professional Certifications',
    description: 'Oracle Cloud Foundations, OCI Developer Professional, and freeCodeCamp Backend APIs.',
    icon: Award,
    desktopPos: 'w-full lg:col-span-5 lg:col-start-8 lg:-translate-y-2',
    zIndex: 3,
    animDirection: { y: 0, x: 40 },
    delay: 0.7,
  },
  {
    id: 4,
    title: 'ENGINEERING',
    metric: '03',
    metricLabel: 'Production-Level Projects',
    description: 'Built scalable applications using AI, WebSockets, Redis, JWT, RBAC and modern architectures.',
    icon: Code,
    desktopPos: 'w-full lg:col-span-5 lg:col-start-2 lg:-translate-y-4',
    zIndex: 2,
    animDirection: { y: 40, x: 0 },
    delay: 0.85,
  },
  {
    id: 5,
    title: 'COLLABORATION',
    metric: 'Agile',
    metricLabel: 'Team Experience',
    description: 'Contributed through shared ownership, code reviews and collaborative development workflows.',
    icon: Users,
    desktopPos: 'w-full lg:col-span-5 lg:col-start-7 lg:-translate-y-4',
    zIndex: 1,
    animDirection: { y: 40, x: 0 },
    delay: 0.85,
  },
];

const milestones = [
  { icon: BookOpen,       label: 'Consistent Learning' },
  { icon: Rocket,         label: 'Building Impact'     },
  { icon: HeartHandshake, label: 'Growing Together'    },
];

/* ─── Card sub-component ─────────────────────────────────── */
const AchievementCard = ({ achievement, isPlaying }) => {
  const Icon = achievement.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: achievement.animDirection.x, y: achievement.animDirection.y }}
      animate={isPlaying ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: achievement.animDirection.x, y: achievement.animDirection.y }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: achievement.delay }}
      className={`group flex flex-col gap-2 relative ${achievement.desktopPos}`}
      style={{
        zIndex: achievement.zIndex,
        padding: '18px 22px',
        backgroundColor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(0,229,255,0.12)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.35), 0 0 30px rgba(0,229,255,0.08)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '20px',
        transition: 'border-color 250ms ease, box-shadow 250ms ease, transform 250ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,229,255,0.25)';
        e.currentTarget.style.transform = 'translateY(-6px)';
        const accentDot = e.currentTarget.querySelector('.accent-dot');
        if (accentDot) {
          accentDot.style.backgroundColor = '#00E5FF';
          accentDot.style.boxShadow = '0 0 8px #00E5FF';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,229,255,0.12)';
        e.currentTarget.style.transform = 'translateY(0px)';
        const accentDot = e.currentTarget.querySelector('.accent-dot');
        if (accentDot) {
          accentDot.style.backgroundColor = '#1E4DFF';
          accentDot.style.boxShadow = '0 0 8px #1E4DFF';
        }
      }}
    >
      {/* Category row */}
      <div className="flex items-center gap-2">
        <div
          style={{
            padding: '6px',
            borderRadius: '6px',
            backgroundColor: 'rgba(0,229,255,0.08)',
            color: '#00E5FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={14} />
        </div>
        <span
          className="uppercase tracking-widest font-semibold"
          style={{ fontSize: '0.6rem', color: '#A9B4C7' }}
        >
          {achievement.title}
        </span>
        {/* Accent dot */}
        <div
          className="ml-auto accent-dot"
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#1E4DFF',
            boxShadow: '0 0 8px #1E4DFF',
            flexShrink: 0,
            transition: 'background-color 250ms ease, box-shadow 250ms ease',
          }}
        />
      </div>

      {/* Metric */}
      <div>
        <span
          className="font-bold tracking-tight block"
          style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', color: '#E6F1FF', lineHeight: 1.1 }}
        >
          {achievement.metric}
        </span>
        <span
          className="font-medium"
          style={{ fontSize: '0.75rem', color: '#00E5FF', display: 'block', marginTop: '2px' }}
        >
          {achievement.metricLabel}
        </span>
      </div>

      {/* Description */}
      <p
        className="leading-snug mt-1"
        style={{ fontSize: '0.75rem', color: '#A9B4C7', margin: 0 }}
      >
        {achievement.description}
      </p>
    </motion.div>
  );
};

/* ─── Main Section ───────────────────────────────────────── */
const Achievements = () => {
  const isPlaying = useSectionAnimation('achievements');

  return (
    <section
      id="achievements"
      className="relative w-full min-h-[90vh] flex flex-col justify-center overflow-hidden bg-[#050B14] pt-10 pb-28 md:pt-10 md:pb-36"
    >
      {/* ── Organic Atmospheric Background System ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* 1. Base Layer: Deep Navy */}
        <div className="absolute inset-0 bg-[#050B14]"></div>

        {/* 2. Surface Depth Layer: Large faint center lift for subtle section separation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[80%] h-[80%] bg-[#091526] rounded-[100%] blur-[180px] opacity-80"></div>
        </div>

        {/* 3. Left Directional Lighting: Soft blue environmental glow behind text block */}
        <div className="absolute top-[20%] left-[0%] w-[45%] h-[60%] bg-[#1E4DFF] rounded-[100%] blur-[150px] opacity-[0.08] mix-blend-screen"></div>

        {/* 4. Right Surface Depth: Subtle cyan reflected light behind card cluster for visible contrast */}
        <div className="absolute top-[10%] right-[0%] w-[55%] h-[80%] bg-[#00E5FF] rounded-[100%] blur-[160px] opacity-[0.06] mix-blend-screen"></div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full flex flex-col flex-grow justify-center">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center w-full">

          {/* ════ Left Column (40%) ════ */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center py-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isPlaying ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Section label */}
              <p className="text-[#00E5FF] text-xs md:text-sm font-medium tracking-wide uppercase mb-2">
                Engineering Milestones
              </p>

              {/* Heading — matches clamp used in About / Skills sections */}
              <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold text-[#FFFFFF] tracking-tight uppercase leading-tight mb-4">
                Achievements<br />Beyond Building<br />Products
              </h2>

              {/* Paragraph */}
              <p className="text-[#A9B4C7] leading-[1.8] text-xs md:text-sm font-[400] max-w-[440px] mb-8">
                From maintaining academic excellence to building production-ready
                applications and strengthening problem-solving skills, these milestones
                reflect my commitment to continuous growth as a software engineer.
              </p>

              {/* Milestone highlights */}
              <div className="flex flex-col gap-4">
                {milestones.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '7px',
                        backgroundColor: 'rgba(0,229,255,0.08)',
                        color: '#00E5FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={13} />
                    </div>
                    <span className="text-sm md:text-[15px] font-[500] text-[#A9B4C7] mt-[3px] leading-snug tracking-wide">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ════ Right Column (60%) — structured card composition ════ */}
          <div className="w-full lg:w-[60%] relative flex items-center justify-center">
            
            {/*
              Mobile  → flex column (single stack)
              Tablet  → 2-col grid
              Desktop → 12-column grid to maintain structure and balance
            */}
            <div
              className="
                flex flex-col gap-5
                md:grid md:grid-cols-2 md:gap-5
                lg:grid lg:grid-cols-12 lg:gap-y-6 lg:gap-x-4
                relative z-10 w-full lg:py-12 lg:max-w-[700px]
              "
            >
              {achievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  isPlaying={isPlaying}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Achievements;
