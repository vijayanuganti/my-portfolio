import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently in view (scroll-position based, stable against jitter).
 * @param {string[]} sectionIds - DOM element ids to track
 * @param {number} [offset=100] - pixels from top to account for fixed header
 */
export const useScrollSpy = (sectionIds, offset = 100) => {
  const [activeId, setActiveId] = useState(sectionIds[0] || '');

  useEffect(() => {
    if (!sectionIds.length) return undefined;

    let raf = 0;

    const update = () => {
      const scrollY = window.scrollY + offset;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds, offset]);

  return activeId;
};

export default useScrollSpy;
