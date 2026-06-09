import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { GraduationCap, Target } from 'lucide-react';
import { api } from '../utils/api';
import SectionHeader from './common/SectionHeader';
import ScrollReveal from './common/ScrollReveal';

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getAbout()
      .then(setAbout)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto h-64 bg-card animate-pulse rounded-xl" />
      </section>
    );
  }

  if (error || !about) {
    return (
      <section id="about" className="py-20 px-6 text-center text-destructive">
        {error || 'About section unavailable'}
      </section>
    );
  }

  const educationList =
    about.education_history?.length > 0
      ? about.education_history
      : about.education
        ? [
            {
              institution: about.education.institution,
              degree: about.education.degree,
              score: `CGPA: ${about.education.cgpa}`,
              period: '',
            },
          ]
        : [];

  return (
    <section id="about" className="py-20 px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="About Me"
          subtitle="Python developer specializing in healthcare dashboards and full-stack web applications"
        />

        <div className="grid lg:grid-cols-2 gap-10">
          <ScrollReveal>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>{about.summary}</p>
              {about.passion && <p>{about.passion}</p>}
              {about.motto && (
                <blockquote className="border-l-4 border-primary pl-4 text-foreground font-medium italic">
                  &ldquo;{about.motto}&rdquo;
                </blockquote>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <Card className="card-glow p-6 bg-card border-border mb-6">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-6 h-6 text-primary" />
                <h3 className="font-heading text-xl font-bold">Education</h3>
              </div>
              <div className="space-y-5">
                {educationList.map((edu, i) => (
                  <div key={i} className={i > 0 ? 'pt-4 border-t border-border' : ''}>
                    <h4 className="text-lg font-semibold text-foreground">{edu.degree}</h4>
                    <p className="text-muted-foreground mt-1">{edu.institution}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {edu.score && (
                        <Badge variant="outline">{edu.score}</Badge>
                      )}
                      {edu.period && (
                        <Badge variant="secondary">{edu.period}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {about.strengths?.length > 0 && (
              <Card className="card-glow p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-accent" />
                  <h3 className="font-heading text-xl font-bold">Interests & Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {about.strengths.map((s, i) => (
                    <li key={i} className="flex gap-2 text-muted-foreground">
                      <span className="text-accent">▸</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
