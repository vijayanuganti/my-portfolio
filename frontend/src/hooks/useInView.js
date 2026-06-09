import { useEffect, useRef, useState } from 'react';

/**
 * Observes element visibility for scroll-triggered animations.
 * @param {Object} options - IntersectionObserver options
 * @returns {[React.RefObject, boolean]} ref and inView state
 */
export const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const once = options.once !== false;
  const threshold = options.threshold ?? 0.05;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);

    // Fallback: ensure content becomes visible if observer never fires
    const fallback = setTimeout(() => setIsInView(true), 1200);

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, [once, threshold]);

  return [ref, isInView];
};

export default useInView;
