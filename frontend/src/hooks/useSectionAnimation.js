import { useState, useEffect, useRef } from 'react';

// Tracks which sections have EVER played their animation (persists for the lifetime of the page).
const hasEverPlayed = new Set();

export function useSectionAnimation(sectionId) {
  const [hasPlayed, setHasPlayed] = useState(() => hasEverPlayed.has(sectionId));
  const observerRef = useRef(null);

  useEffect(() => {
    // If already played before (e.g. component re-mounted), immediately mark as played.
    if (hasEverPlayed.has(sectionId)) {
      setHasPlayed(true);
      return;
    }

    const element = document.getElementById(sectionId);
    if (!element) return;

    // Use IntersectionObserver with a LOW threshold (0.1 = 10% visible)
    // so animation starts as soon as ~10% of the section enters the viewport.
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Mark as played — NEVER reset this.
            hasEverPlayed.add(sectionId);
            setHasPlayed(true);
            // Disconnect immediately: we only need the first trigger.
            observerRef.current?.disconnect();
          }
        }
      },
      {
        threshold: 0.1,      // Fire when 10% of section is visible
        rootMargin: '0px',   // No extra margin needed — threshold handles timing
      }
    );

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionId]);

  return hasPlayed;
}
