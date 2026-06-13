import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Grid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text-primary)] px-6">
      <Helmet>
        <title>Page Not Found | Vanshika Verma</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full text-center flex flex-col items-center"
      >
        <h1 className="text-8xl md:text-9xl font-bold text-[var(--color-surface-elevated)] mb-6">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-[var(--color-text-primary)]">
          Page Not Found
        </h2>
        <p className="text-base text-[var(--color-text-secondary)] mb-10 leading-relaxed max-w-md mx-auto">
          It looks like the page you are looking for has been moved or doesn't exist. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-text-primary)] text-[var(--color-bg)] rounded-xl font-medium transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
          >
            <ArrowLeft className="w-4 h-4" /> Return Home
          </button>
          
          <button
            onClick={() => navigate('/#portfolio')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-[var(--color-text-primary)] border border-[var(--color-surface-elevated)] rounded-xl font-medium hover:bg-[var(--color-surface)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
          >
            <Grid className="w-4 h-4" /> View Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
}
