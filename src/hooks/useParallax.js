import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/ready';

// Moves an element at a fraction of the scroll speed while it is on screen.
export default function useParallax(speed = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const host = el.parentElement || el;
      const rect = host.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -100 || rect.top > vh + 100) return;
      const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
      el.style.setProperty('--py', `${offset.toFixed(1)}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return ref;
}
