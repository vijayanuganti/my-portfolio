import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Observes element visibility for scroll-triggered animations.
 * Fires once by default to avoid re-trigger jitter on scroll-up/down.
 * @param {Object} options - IntersectionObserver options
 * @returns {[React.RefObject, boolean]} ref and inView state
 */
export const useInView = (options = {}) => {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isInView, setIsInView] = useState(prefersReducedMotion);
  const once = options.once !== false;
  const threshold = options.threshold ?? 0.12;
  const rootMargin = options.rootMargin ?? '0px 0px -8% 0px';

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsInView(true);
      return undefined;
    }

    const el = ref.current;
    if (!el) return undefined;

    let revealed = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          revealed = true;
          setIsInView(true);
          if (once) observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [once, threshold, rootMargin, prefersReducedMotion]);

  return [ref, isInView];
};

export default useInView;
