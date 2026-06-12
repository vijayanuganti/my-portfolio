import React from 'react';
import PropTypes from 'prop-types';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const AnimatedSkillRing = ({ proficiency, name, gradientId }) => {
  const [ref, isInView] = useInView({ once: true, threshold: 0.15 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const active = prefersReducedMotion || isInView;
  const offset = circumference - (active ? proficiency / 100 : 0) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80" aria-hidden>
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-slate-700"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 1s ease-out',
            }}
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
          {proficiency}%
        </span>
      </div>
      <span className="text-xs text-muted-foreground text-center max-w-[80px]">{name}</span>
    </div>
  );
};

AnimatedSkillRing.propTypes = {
  proficiency: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gradientId: PropTypes.string.isRequired,
};

export default AnimatedSkillRing;
