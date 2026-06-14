import React from 'react';
import { motion } from 'framer-motion';

const leftCards = [
  {
    title: "Full-Stack Development",
    subtitle: "Engineering & Architecture",
    description: "Designing and developing scalable web applications across the full technology stack with a strong focus on performance, usability, maintainable architecture, and real-world problem solving.",
    highlights: [
      "Building and deploying applications across diverse domains.",
      "Developing responsive interfaces using modern frontend technologies.",
      "Designing backend services, APIs, and scalable databases.",
      "Applying algorithmic thinking to optimize application performance."
    ]
  },
  {
    title: "Amity University (2023–2027)",
    subtitle: "B.Tech Computer Science",
    description: "Building a strong foundation in computer science while combining academic excellence with practical software engineering experience.",
    highlights: [
      "Maintaining a strong academic record with a CGPA of 9.29.",
      "Strengthening expertise in databases, algorithms, and system design.",
      "Applying theoretical concepts through real-world software projects.",
      "Collaborating on technical initiatives and development activities."
    ]
  }
];

const rightCards = [
  { title: "Academic Excellence", value: "9.29 CGPA" },
  { title: "Project Development", value: "Full-Stack Applications" },
  { title: "Problem Solving", value: "Algorithmic Logic" },
  { title: "Continuous Learning", value: "Adaptable & Driven" },
];

export default function Journey() {
  return (
    <section id="journey" className="relative min-h-[90vh] flex flex-col pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#050B14]">
      <style>
        {`
          .journey-card {
            background-color: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(0, 229, 255, 0.12);
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.35);
            transition: all 0.3s ease;
          }
          .journey-card:hover {
            border-color: rgba(0, 229, 255, 0.25);
            box-shadow: 0 10px 40px -10px rgba(0, 229, 255, 0.08), 0 10px 30px -10px rgba(0, 0, 0, 0.35);
          }
        `}
      </style>

      {/* Background Depth Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#071425_0%,transparent_100%)] opacity-100 z-0 pointer-events-none"></div>
      
      {/* Atmospheres */}
      {/* Left Ambient Glow */}
      <div className="absolute top-[-30%] left-[-20%] w-[1000px] h-[1000px] bg-[#1E4DFF] rounded-full blur-[350px] opacity-[0.10] z-0 pointer-events-none"></div>
      {/* Right Ambient Glow */}
      <div className="absolute bottom-[-30%] right-[-20%] w-[1000px] h-[1000px] bg-[#00E5FF] rounded-full blur-[350px] opacity-[0.08] z-0 pointer-events-none"></div>
      {/* Center Depth Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.03)_0%,transparent_100%)] z-0 pointer-events-none"></div>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 z-10 flex flex-col flex-grow">
        
        {/* Section Header */}
        <div className="relative flex justify-center mb-10 md:mb-14 w-full flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center relative z-10"
          >
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#E6F1FF] tracking-tight mb-3 uppercase">
              PROFESSIONAL JOURNEY
            </h2>
            <p className="text-[#00E5FF] text-xs md:text-sm font-medium tracking-wide uppercase">
              Growth Through Learning, Engineering, And Continuous Problem Solving.
            </p>
          </motion.div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full">
          
          {/* LEFT SIDE: Story Cards (65%) */}
          <div className="w-full lg:w-[65%] flex flex-col gap-6">
            {leftCards.map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="journey-card relative px-6 py-5 md:px-8 md:py-6 rounded-2xl"
              >
                <div className="mb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-[#E6F1FF] leading-tight">
                    {card.title}
                  </h3>
                  {card.subtitle && (
                    <p className="text-sm md:text-base font-medium text-[#00E5FF] mt-1">
                      {card.subtitle}
                    </p>
                  )}
                </div>

                <p className="text-sm md:text-base text-[#A9B4C7] mb-4 leading-relaxed">
                  {card.description}
                </p>

                <ul className="space-y-2">
                  {card.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00E5FF] opacity-80 flex-shrink-0"></span>
                      <span className="text-sm md:text-[15px] text-[#A9B4C7] leading-snug">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* RIGHT SIDE: Capability Cards (35%) */}
          <div className="w-full lg:w-[35%] flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h3 className="text-[#00E5FF] text-xs md:text-sm font-medium tracking-wide uppercase mb-2">
                  WHAT I BRING
                </h3>
                <p className="text-[#A9B4C7] text-sm leading-relaxed">
                  Key strengths developed through academics, projects, and practical engineering experience.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {rightCards.map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="journey-card relative p-5 rounded-xl flex flex-col justify-center"
                  >
                    <p className="text-[11px] font-semibold tracking-widest uppercase text-[#A9B4C7] opacity-80 mb-1.5">
                      {card.title}
                    </p>
                    <p className="text-[15px] font-medium text-[#E6F1FF]">
                      {card.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
