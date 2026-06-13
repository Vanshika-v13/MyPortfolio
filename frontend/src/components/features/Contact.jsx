import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@vanshikaverma.com', href: 'mailto:hello@vanshikaverma.com' },
  { icon: FaLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/vanshikaverma', href: 'https://linkedin.com/in/vanshikaverma' },
  { icon: FaGithub, label: 'GitHub', value: 'github.com/vanshikaverma', href: 'https://github.com/vanshikaverma' },
  { icon: MapPin, label: 'Location', value: 'India', href: null },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
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
      // Simulate API call to /api/v1/contact
      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: () => {
      setFormData({ name: '', email: '', subject: '', message: '' });
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
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* LEFT SIDE: CONTACT FORM */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
                Let's Build Something Meaningful
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                Whether it's discussing opportunities, collaborating on ideas, or simply connecting over technology, I'd love to hear from you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[var(--color-text-primary)]">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border ${errors.name ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : 'border-[var(--color-surface-elevated)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/20'} text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/50 focus:outline-none focus:ring-4 transition-all`}
                    placeholder="Jane Doe"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[var(--color-text-primary)]">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border ${errors.email ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : 'border-[var(--color-surface-elevated)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/20'} text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/50 focus:outline-none focus:ring-4 transition-all`}
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-[var(--color-text-primary)] flex items-center gap-2">
                  Subject <span className="text-xs text-[var(--color-text-secondary)] font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-surface-elevated)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/20 transition-all"
                  placeholder="What is this regarding?"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-[var(--color-text-primary)]">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border ${errors.message ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : 'border-[var(--color-surface-elevated)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/20'} text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/50 focus:outline-none focus:ring-4 transition-all resize-none`}
                  placeholder="Your message here..."
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              {/* Submit Area */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--color-text-primary)] text-[var(--color-bg)] rounded-xl font-medium transition-all hover:bg-[var(--color-text-primary)]/90 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
                >
                  <AnimatePresence mode="wait">
                    {mutation.isPending ? (
                      <motion.span 
                        key="sending"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        Sending Message...
                      </motion.span>
                    ) : (
                      <motion.span 
                        key="send"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" /> Send Message
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
                    <div className="flex items-center gap-3 p-4 mt-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm font-medium">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                    </div>
                  </motion.div>
                )}
                {mutation.isError && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-3 p-4 mt-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm font-medium">Something went wrong while sending your message. Please try again.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* RIGHT SIDE: CONTACT INFO */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-12"
          >
            {/* Availability */}
            <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-surface-elevated)] shadow-subtle">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <h3 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-text-primary)]">Availability Status</h3>
              </div>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Open to internships, collaborations, and opportunities where I can continue building impactful solutions.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-text-primary)] mb-6">
                Connect Directly
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, idx) => {
                  const Content = (
                    <div className="flex items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-[var(--color-surface)] border border-transparent hover:border-[var(--color-surface-elevated)] transition-all">
                      <div className="p-3 rounded-lg bg-[var(--color-surface)] group-hover:bg-[var(--color-bg)] group-hover:text-[var(--color-accent)] transition-colors border border-[var(--color-surface-elevated)]">
                        <info.icon className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-0.5">{info.label}</p>
                        <p className="text-base font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{info.value}</p>
                      </div>
                    </div>
                  );
                  return info.href ? (
                    <a key={idx} href={info.href} target={info.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="block">
                      {Content}
                    </a>
                  ) : (
                    <div key={idx}>{Content}</div>
                  );
                })}
              </div>
            </div>

            {/* Endorsement Section */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg)] border border-[var(--color-surface-elevated)] shadow-subtle hover:shadow-elevated transition-shadow group">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2 group-hover:text-[var(--color-accent)] transition-colors">
                Open to Endorsements
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                If we've worked together, collaborated on projects, or connected professionally, I'd be grateful for your endorsement.
              </p>
              <a 
                href="https://linkedin.com/in/vanshikaverma" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--color-bg)] border border-[var(--color-surface-elevated)] text-[var(--color-text-primary)] rounded-lg text-sm font-medium hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all"
              >
                <FaLinkedin className="w-4 h-4" /> View LinkedIn
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
