import { useEffect } from 'react';

/**
 * Applies a subtle GPU-accelerated scale + translate on scroll for hero imagery.
 */
export const useHeroParallax = (ref, enabled = true) => {
  useEffect(() => {
    if (!enabled || !ref.current) return undefined;

    let raf = 0;

    const update = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = Math.min(Math.max(1 - rect.bottom / viewH, 0), 1);
      const scale = 1 - progress * 0.06;
      const translateY = progress * 24;

      el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      if (ref.current) ref.current.style.transform = '';
    };
  }, [ref, enabled]);
};

export default useHeroParallax;
