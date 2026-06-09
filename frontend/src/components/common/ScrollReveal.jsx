import React from 'react';
import PropTypes from 'prop-types';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../lib/utils';

const ScrollReveal = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const [ref, isInView] = useInView({ once: true });

  const directionClass = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    none: '',
  }[direction];

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isInView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${directionClass}`,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right', 'none']),
};

export default ScrollReveal;
