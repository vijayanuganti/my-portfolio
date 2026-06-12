import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from '../ui/progress';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../lib/utils';

const AnimatedProgress = ({ value, className }) => {
  const [ref, isInView] = useInView({ once: true, threshold: 0.15 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const displayValue = prefersReducedMotion || isInView ? value : 0;

  return (
    <div ref={ref}>
      <Progress
        value={displayValue}
        className={cn(
          'h-2',
          !prefersReducedMotion && 'transition-all duration-1000 ease-out',
          className
        )}
      />
    </div>
  );
};

AnimatedProgress.propTypes = {
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default AnimatedProgress;
