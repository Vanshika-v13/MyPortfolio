import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { Mail, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok) {
        // Attach server response to the error so we can display it
        const err = new Error(json?.message || 'Submission failed');
        err.status = response.status;
        err.serverErrors = json?.errors || null;
        throw err;
      }

      return json;
    },
    onSuccess: () => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      mutation.mutate(formData);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  return (
    <section id="contact" className="relative min-h-[90vh] flex flex-col pt-24 pb-16 md:pt-32 md:pb-24 bg-[#050B14]" style={{ overflow: 'visible' }}>
      <style>
        {`
          /* ── Input Fields ── */
          .contact-input {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(0, 229, 255, 0.12);
            color: #E6F1FF;
            box-shadow: 0 0 20px rgba(0, 229, 255, 0.05);
            transition: all 0.25s ease;
          }
          .contact-input::placeholder {
            color: #6B7A90;
          }
          .contact-input:hover {
            border-color: rgba(0, 229, 255, 0.25);
            background: rgba(255, 255, 255, 0.055);
          }
          .contact-input:focus {
            outline: none;
            border-color: rgba(0, 229, 255, 0.4);
            background: rgba(255, 255, 255, 0.06);
            box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.08), 0 0 20px rgba(0, 229, 255, 0.05);
          }

          /* ── Cards — Premium Glassmorphism Depth ── */
          .contact-card {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(0, 229, 255, 0.12);
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.09),
              inset 1px 0 0 rgba(255, 255, 255, 0.04),
              inset 0 -1px 0 rgba(0, 0, 0, 0.28),
              0 4px 24px -4px rgba(0, 0, 0, 0.5),
              0 1px 0 rgba(0, 229, 255, 0.06),
              0 0 0 rgba(0, 229, 255, 0);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }
          .contact-card:hover {
            border-color: rgba(0, 229, 255, 0.25);
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.12),
              inset 1px 0 0 rgba(255, 255, 255, 0.05),
              inset 0 -1px 0 rgba(0, 0, 0, 0.3),
              0 8px 32px -8px rgba(0, 0, 0, 0.55),
              0 0 24px -6px rgba(0, 229, 255, 0.14);
          }

          /* ── Button — Premium 3D SaaS Gradient ── */
          .contact-btn {
            background: linear-gradient(135deg, #1E4DFF, #00E5FF);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: #ffffff;
            font-weight: 600;
            letter-spacing: 0.08em;
            box-shadow:
              0 8px 22px rgba(0, 229, 255, 0.10),
              inset 0 1px 0 rgba(255, 255, 255, 0.15);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .contact-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow:
              0 14px 28px rgba(0, 229, 255, 0.14),
              inset 0 1px 0 rgba(255, 255, 255, 0.18);
          }
          .contact-btn:active:not(:disabled) {
            transform: translateY(0);
            box-shadow:
              0 6px 14px rgba(0, 229, 255, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.10);
          }

          /* ── Success notification — AI system response card ── */
          .contact-success {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(0, 229, 255, 0.10);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.20);
          }

          /* ── Blueprint SVG wrapper clips nothing ── */
          .contact-bg-svg {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
          }
        `}
      </style>

      {/* ── Layer 1: Depth base — subtle center vignette ── */}
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #071425 0%, transparent 100%)',
          zIndex: 0,
        }}
      />

      {/* ── Layer 2: Soft blue glow — upper-left area ── */}
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: '-5%',
          left: '-10%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(ellipse at center, #1E4DFF 0%, transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.18,
          zIndex: 0,
        }}
      />

      {/* ── Layer 3: Soft cyan glow — lower-right area ── */}
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          bottom: '-8%',
          right: '-8%',
          width: '650px',
          height: '650px',
          background: 'radial-gradient(ellipse at center, #00C4E0 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.13,
          zIndex: 0,
        }}
      />

      {/* ── Layer 4: Secondary blue mid-left fill — adds depth without banding ── */}
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: '40%',
          left: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, #0B2A6B 0%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: 0.25,
          zIndex: 0,
        }}
      />

      {/* ── Engineering Blueprint Background ── */}
      {/* Curved paths, orbital arcs, technical geometry — 5–10% opacity */}
      <svg
        className="contact-bg-svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Primary flow curve — horizontal sweep */}
        <path
          d="M-100,200 C400,100 600,600 1200,300 S1800,400 2200,100"
          fill="none"
          stroke="#E6F1FF"
          strokeWidth="0.7"
          opacity="0.032"
        />
        {/* Secondary flow curve — lower plane */}
        <path
          d="M-200,800 C300,900 700,700 1300,800 S1900,900 2500,700"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="0.7"
          opacity="0.028"
        />
        {/* Blueprint arc — top right orbital ring (double-line effect) */}
        <circle cx="85%" cy="15%" r="400" fill="none" stroke="#00E5FF" strokeWidth="0.7" opacity="0.038" />
        <circle cx="85%" cy="15%" r="402" fill="none" stroke="#00E5FF" strokeWidth="0.5" opacity="0.022" />
        {/* Blueprint arc — bottom left orbital ring */}
        <circle cx="15%" cy="85%" r="500" fill="none" stroke="#1E4DFF" strokeWidth="0.7" opacity="0.032" />
        {/* Engineering dash-tick path — right side accent */}
        <path
          d="M1600,0 C1500,300 1700,500 1500,800"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="0.6"
          strokeDasharray="6 12"
          opacity="0.028"
        />
        {/* Short angular connector — upper area, left of center */}
        <path
          d="M200,50 L350,120 L420,300"
          fill="none"
          stroke="#E6F1FF"
          strokeWidth="0.6"
          opacity="0.022"
        />
        {/* Gentle arc — mid-section engineering sweep */}
        <path
          d="M0,500 Q800,350 1920,550"
          fill="none"
          stroke="#1E4DFF"
          strokeWidth="0.7"
          opacity="0.028"
        />
      </svg>

      {/* ── Content Wrapper ── */}
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
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#E6F1FF] tracking-tight mb-2 uppercase">
              CONTACT
            </h2>
            <p className="text-[#00E5FF] text-xs md:text-sm font-medium tracking-wide uppercase">
              LET'S BUILD SOMETHING IMPACTFUL TOGETHER
            </p>
          </motion.div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start w-full">
          
          {/* LEFT SIDE: CONTACT FORM (60%) */}
          <div className="w-full lg:w-[60%] flex flex-col gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col w-full"
            >
              <form onSubmit={handleSubmit} className="space-y-3 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-[#E6F1FF]">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="contact-input w-full px-4 py-3 rounded-xl"
                      placeholder="Jane Doe"
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-[#E6F1FF]">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="contact-input w-full px-4 py-3 rounded-xl"
                      placeholder="jane@example.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-[#E6F1FF]">
                    Phone Number <span className="text-xs text-[#6B7A90] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="contact-input w-full px-4 py-3 rounded-xl"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-[#E6F1FF]">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="contact-input w-full px-4 py-3 rounded-xl resize-none"
                    placeholder="How can we collaborate?"
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                {/* Submit Area */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="contact-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <AnimatePresence mode="wait">
                      {mutation.isPending ? (
                        <motion.span 
                          key="sending"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 uppercase tracking-wide text-sm"
                        >
                          Sending Message...
                        </motion.span>
                      ) : (
                        <motion.span 
                          key="send"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 uppercase tracking-wide text-sm"
                        >
                          Send Message
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

                {/* Status Messages */}
                <AnimatePresence>
                  {mutation.isSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="contact-success flex items-center gap-3 p-4 mt-4 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#00E5FF' }} />
                        <p className="text-sm font-medium" style={{ color: '#A9B4C7' }}>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                      </div>
                    </motion.div>
                  )}
                  {mutation.isError && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-2 p-4 mt-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          <p className="text-sm font-medium">
                            {mutation.error?.status === 429
                              ? 'Too many requests. Please wait a moment before trying again.'
                              : mutation.error?.status === 400
                              ? 'Please check your inputs and try again.'
                              : 'Something went wrong. Please try again or reach out directly via email.'}
                          </p>
                        </div>
                        {/* Field-level errors from backend validation */}
                        {mutation.error?.serverErrors?.length > 0 && (
                          <ul className="ml-8 text-xs text-red-300 space-y-0.5 list-disc">
                            {mutation.error.serverErrors.map((e, i) => (
                              <li key={i}>{e.message}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>

          {/* RIGHT SIDE: PROFESSIONAL CONTACT PANEL (40%) */}
          <div className="w-full lg:w-[40%] flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-3">
                <h3 className="text-[#00E5FF] text-xs md:text-sm font-medium tracking-wide uppercase mb-1">
                  PROFESSIONAL INFORMATION
                </h3>
              </div>
              
              {/* Contact Cards */}
              <div className="flex flex-col gap-2 mb-4">
                {[
                  { icon: Mail, label: 'EMAIL', value: 'vanshikaverma1310@gmail.com', href: 'mailto:vanshikaverma1310@gmail.com' },
                  { icon: Phone, label: 'PHONE', value: '+91 76685 96099', href: 'tel:+917668596099' },
                  { icon: FaLinkedin, label: 'LINKEDIN', value: 'linkedin.com/in/vanshika13', href: 'https://www.linkedin.com/in/vanshika13/' },
                  { icon: FaGithub, label: 'GITHUB', value: 'github.com/Vanshika-v13', href: 'https://github.com/Vanshika-v13' }
                ].map((info, idx) => (
                  <motion.a
                    key={idx}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="contact-card flex items-center gap-4 px-4 py-3 rounded-xl group"
                  >
                    <div className="p-2.5 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(0,229,255,0.08)] group-hover:border-[rgba(0,229,255,0.2)] transition-colors">
                      <info.icon className="w-4 h-4 text-[#A9B4C7] group-hover:text-[#00E5FF] transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-[#A9B4C7] opacity-80 mb-0.5">{info.label}</p>
                      <p className="text-sm font-medium text-[#E6F1FF] group-hover:text-[#00E5FF] transition-colors">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* CURRENT STATUS CARD */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="contact-card p-4 rounded-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(0,229,255,0.12)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                }}
              >
                {/* Ambient glow — soft blended radial, integrated with background lighting */}
                <div
                  className="pointer-events-none"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 70% 50%, rgba(30,77,255,0.08), transparent 60%)',
                    borderRadius: 'inherit',
                  }}
                />
                {/* Subtle secondary cyan wash — far edge only */}
                <div
                  className="pointer-events-none"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 90% 20%, rgba(0,229,255,0.04), transparent 55%)',
                    borderRadius: 'inherit',
                  }}
                />
                {/* Edge highlight — very subtle top bar */}
                <div
                  className="pointer-events-none"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '10%',
                    right: '10%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.12), rgba(30,77,255,0.08), transparent)',
                  }}
                />
                
                <div className="relative z-10">
                  <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[#A9B4C7] opacity-80 mb-3">
                    CURRENT STATUS
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#00E5FF' }}></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: '#00E5FF' }}></span>
                    </div>
                    <span className="text-[#E6F1FF] text-sm font-semibold tracking-wide">
                      OPEN TO INTERNSHIPS
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A9B4C7] leading-relaxed">
                    Actively exploring Internship opportunities in Full-Stack Development, Software Engineering, AI Applications, and Modern Web Technologies. Open to collaboration, learning, and building impactful products.
                  </p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
