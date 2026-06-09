import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { api } from '../utils/api';
import SectionHeader from './common/SectionHeader';
import { getTechIcon } from '../constants/techIcons';

/** Supports API objects { name, proficiency, icon } and legacy string skills. */
export const normalizeSkill = (skill) => {
  if (typeof skill === 'string') {
    return { name: skill, proficiency: 85, icon: 'default' };
  }
  return {
    name: skill?.name ?? 'Skill',
    proficiency: skill?.proficiency ?? 80,
    icon: skill?.icon ?? 'default',
  };
};

const SkillRing = ({ proficiency, name, gradientId }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (proficiency / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80" aria-hidden>
          <circle cx="40" cy="40" r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-700" />
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
            className="transition-all duration-1000"
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

SkillRing.propTypes = {
  proficiency: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gradientId: PropTypes.string.isRequired,
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getSkills()
      .then((data) => {
        const normalized = (Array.isArray(data) ? data : []).map((cat) => ({
          ...cat,
          skills: (cat.skills || []).map(normalizeSkill),
        }));
        setSkills(normalized);
      })
      .catch((e) => {
        const msg = e.response?.data?.detail || e.message || 'Failed to load skills';
        setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="skills" className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-card rounded-xl animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-destructive">
          <p>Failed to load skills: {error}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Check that the backend is running and REACT_APP_BACKEND_URL points to it.
          </p>
        </div>
      </section>
    );
  }

  if (!skills.length) {
    return (
      <section id="skills" className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <SectionHeader title="Technical Skills" subtitle="No skills data in database yet." />
          <p className="mt-4">Run: <code className="text-primary">python seed_database.py --force</code> in the backend folder.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Technical Skills"
          subtitle="Proficiency across the full stack — from UI to cloud infrastructure"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((category, catIndex) => {
            const items = category.skills || [];
            return (
              <Card
                key={category.id || category.category}
                className="card-glow p-6 md:p-8 bg-card border-border fade-in-up"
                style={{ animationDelay: `${catIndex * 0.1}s` }}
              >
                <h3 className="font-heading text-xl font-bold text-primary mb-6">
                  {category.category}
                </h3>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {items.slice(0, 3).map((skill, si) => (
                    <SkillRing
                      key={`${skill.name}-ring-${si}`}
                      name={skill.name}
                      proficiency={skill.proficiency}
                      gradientId={`skill-grad-${catIndex}-${si}`}
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  {items.map((skill) => {
                    const Icon = getTechIcon(skill.icon);
                    return (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-accent shrink-0" />
                            <span className="text-sm font-medium text-foreground">{skill.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                        </div>
                        <Progress value={skill.proficiency} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
