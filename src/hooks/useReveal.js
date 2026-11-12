import { useEffect, useRef } from 'react';
import { onSiteReady, prefersReducedMotion } from '../lib/ready';

// Marks an element with data-in once it scrolls into view (one time only).
export default function useReveal({ threshold = 0.08 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      el.dataset.in = '1';
      return undefined;
    }

    let observer;
    const stop = onSiteReady(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.dataset.in = '1';
            observer.disconnect();
          }
        },
        { threshold, rootMargin: '0px 0px -6% 0px' },
      );
      observer.observe(el);
    });

    return () => {
      stop();
      observer?.disconnect();
    };
  }, [threshold]);

  return ref;
}
