import React from 'react';
import PropTypes from 'prop-types';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../lib/utils';

const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  as: Component = 'div',
}) => {
  const [ref, isInView] = useInView({ once: true });
  const prefersReducedMotion = usePrefersReducedMotion();

  const hiddenTransform = {
    up: 'translate3d(0, 20px, 0) scale(0.98)',
    down: 'translate3d(0, -20px, 0) scale(0.98)',
    left: 'translate3d(20px, 0, 0) scale(0.98)',
    right: 'translate3d(-20px, 0, 0) scale(0.98)',
    none: 'scale(0.98)',
  }[direction];

  const visible = prefersReducedMotion || isInView;

  return (
    <Component
      ref={ref}
      className={cn('reveal-on-scroll', className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0, 0) scale(1)' : hiddenTransform,
        transitionProperty: 'opacity, transform',
        transitionDuration: prefersReducedMotion ? '0ms' : '700ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms`,
        willChange: visible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </Component>
  );
};

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right', 'none']),
  as: PropTypes.elementType,
};

export default ScrollReveal;
