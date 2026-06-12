import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { api } from '../utils/api';
import SectionHeader from './common/SectionHeader';
import ScrollReveal from './common/ScrollReveal';
import AnimatedProgress from './common/AnimatedProgress';
import AnimatedSkillRing from './common/AnimatedSkillRing';
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
      <section id="skills" className="py-16 md:py-20 px-4 sm:px-6 border-t border-border">
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
      <section id="skills" className="py-16 md:py-20 px-4 sm:px-6 border-t border-border">
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
      <section id="skills" className="py-16 md:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <SectionHeader title="Technical Skills" subtitle="No skills data in database yet." />
          <p className="mt-4">
            Run: <code className="text-primary">python seed_database.py --force</code> in the backend folder.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-16 md:py-20 px-4 sm:px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Technical Skills"
          subtitle="Proficiency across the full stack — from UI to cloud infrastructure"
        />

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {skills.map((category, catIndex) => {
            const items = category.skills || [];
            return (
              <ScrollReveal key={category.id || category.category} delay={catIndex * 80}>
                <Card className="card-glow p-5 md:p-8 bg-card border-border h-full">
                  <h3 className="font-heading text-xl font-bold text-primary mb-6">
                    {category.category}
                  </h3>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {items.slice(0, 3).map((skill, si) => (
                      <AnimatedSkillRing
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
                          <AnimatedProgress value={skill.proficiency} />
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
