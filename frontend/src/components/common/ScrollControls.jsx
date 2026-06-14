import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollControls() {
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll-up button when user has scrolled down past the Hero section
      if (window.scrollY > 400) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 hidden md:block">
      <AnimatePresence>
        {showScrollUp && (
          <motion.div
            key="scroll-up"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={scrollToTop}
              className="text-[#A9B4C7] hover:text-[#00E5FF] transition-colors duration-300 focus:outline-none p-2"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
