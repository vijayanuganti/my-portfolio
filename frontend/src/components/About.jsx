import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { GraduationCap, Target, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { api } from '../utils/api';
import SectionHeader from './common/SectionHeader';
import ScrollReveal from './common/ScrollReveal';
import { useMediaQuery } from '../hooks/useMediaQuery';

const AboutSummary = ({ about }) => (
  <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
    <p>{about.summary}</p>
    {about.passion && <p>{about.passion}</p>}
    {about.motto && (
      <blockquote className="border-l-4 border-primary pl-4 text-foreground font-medium italic">
        &ldquo;{about.motto}&rdquo;
      </blockquote>
    )}
  </div>
);

const EducationCard = ({ educationList, className = '' }) => (
  <Card className={`card-glow p-5 md:p-6 bg-card border-border ${className}`}>
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
            {edu.score && <Badge variant="outline">{edu.score}</Badge>}
            {edu.period && <Badge variant="secondary">{edu.period}</Badge>}
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const StrengthsCard = ({ strengths }) => {
  if (!strengths?.length) return null;
  return (
    <Card className="card-glow p-5 md:p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-border mt-6">
      <div className="flex items-center gap-3 mb-4">
        <Target className="w-6 h-6 text-accent" />
        <h3 className="font-heading text-xl font-bold">Interests & Strengths</h3>
      </div>
      <ul className="space-y-3">
        {strengths.map((s, i) => (
          <li key={i} className="flex gap-2 text-muted-foreground">
            <span className="text-accent">▸</span>
            {s}
          </li>
        ))}
      </ul>
    </Card>
  );
};

const AwardsList = ({ awards }) => (
  <div className="space-y-3">
    {awards.map((item, i) => (
      <Card
        key={item.id || i}
        className="card-glow p-4 bg-card border-border hover:border-primary/40 transition-colors"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-heading font-bold text-foreground">{item.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{item.issuer}</p>
            {item.date && <p className="text-xs text-accent mt-1">{item.date}</p>}
          </div>
        </div>
      </Card>
    ))}
  </div>
);

const About = () => {
  const [about, setAbout] = useState(null);
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    api
      .getAbout()
      .then(setAbout)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    api.getCertifications().then(setAwards).catch(console.error);
  }, [isMobile]);

  if (loading) {
    return (
      <section id="about" className="py-16 md:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-7xl mx-auto h-64 bg-card animate-pulse rounded-xl" />
      </section>
    );
  }

  if (error || !about) {
    return (
      <section id="about" className="py-16 md:py-20 px-4 sm:px-6 text-center text-destructive">
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
    <section id="about" className="py-16 md:py-20 px-4 sm:px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="About Me"
          subtitle="Python developer specializing in healthcare dashboards and full-stack web applications"
        />

        {/* Mobile: tabbed About / Education / Awards */}
        <div className="md:hidden">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full grid grid-cols-3 h-auto p-1 mb-6">
              <TabsTrigger value="about" className="text-xs sm:text-sm py-2">
                About
              </TabsTrigger>
              <TabsTrigger value="education" className="text-xs sm:text-sm py-2">
                Education
              </TabsTrigger>
              <TabsTrigger value="awards" className="text-xs sm:text-sm py-2">
                Awards
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <ScrollReveal>
                <AboutSummary about={about} />
                <StrengthsCard strengths={about.strengths} />
              </ScrollReveal>
            </TabsContent>

            <TabsContent value="education">
              <ScrollReveal>
                <EducationCard educationList={educationList} />
              </ScrollReveal>
            </TabsContent>

            <TabsContent value="awards">
              <ScrollReveal>
                {awards.length > 0 ? (
                  <AwardsList awards={awards} />
                ) : (
                  <p className="text-muted-foreground text-center py-8 text-sm">
                    No awards listed yet.
                  </p>
                )}
              </ScrollReveal>
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop: two-column layout */}
        <div className="hidden md:grid lg:grid-cols-2 gap-10">
          <ScrollReveal>
            <AboutSummary about={about} />
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <EducationCard educationList={educationList} className="mb-6" />
            <StrengthsCard strengths={about.strengths} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
