import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUp } from 'lucide-react';

export default function ScrollControls() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    let observer;
    
    const initObserver = () => {
      const sections = document.querySelectorAll('section');
      if (sections.length === 0) return;
      
      const lastSection = sections[sections.length - 1];

      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          setIsAtBottom(entry.isIntersecting);
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.3
        }
      );

      observer.observe(lastSection);
    };

    // Small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(initObserver, 500);

    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const scrollToNext = () => {
    const sections = Array.from(document.querySelectorAll('section'));
    const currentScroll = window.scrollY;
    
    for (const section of sections) {
      if (section.offsetTop > currentScroll + 50) {
        section.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden md:block">
      <AnimatePresence mode="wait">
        {!isAtBottom ? (
          <motion.div
            key="scroll-down"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={scrollToNext}
              className="p-3 rounded-full bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-elevated)] shadow-subtle hover:shadow-elevated transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] group"
              aria-label="Scroll to Next Section"
            >
              <ChevronDown className="w-5 h-5 animate-bounce group-hover:animate-none" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="scroll-up"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-elevated)] shadow-subtle hover:shadow-elevated transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] group"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
