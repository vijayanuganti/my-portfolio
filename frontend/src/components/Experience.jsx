import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Briefcase, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '../utils/api';
import SectionHeader from './common/SectionHeader';
import ScrollReveal from './common/ScrollReveal';
import { useMediaQuery } from '../hooks/useMediaQuery';

const TimelineItem = ({ exp, isLast, index }) => (
  <ScrollReveal delay={index * 100}>
    <div className="relative flex gap-4 md:gap-8 pb-10 md:pb-12">
      {!isLast && (
        <div className="absolute left-5 md:left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent/30" />
      )}
      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center text-xl z-10 shadow-lg shadow-primary/20">
        {exp.company_logo || '🏢'}
      </div>
      <Card className="flex-1 card-glow p-5 md:p-8 bg-card border-border">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h3 className="font-heading text-lg md:text-2xl font-bold text-foreground">{exp.role}</h3>
            <div className="flex flex-wrap items-center gap-2 text-muted-foreground mt-2 text-sm">
              <Briefcase className="w-4 h-4" />
              <span className="font-medium text-foreground">{exp.company}</span>
              <span>·</span>
              <MapPin className="w-4 h-4" />
              <span>{exp.location}</span>
            </div>
          </div>
          <Badge variant="outline" className="w-fit shrink-0">
            <Calendar className="w-3 h-3 mr-2" />
            {exp.duration}
          </Badge>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">
            Responsibilities & Impact
          </h4>
          <ul className="space-y-2">
            {[
              ...(exp.responsibilities || []),
              ...(exp.achievements || []),
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-muted-foreground text-sm leading-relaxed">
                <span className="text-accent shrink-0">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {exp.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </Card>
    </div>
  </ScrollReveal>
);

TimelineItem.propTypes = {
  exp: PropTypes.object.isRequired,
  isLast: PropTypes.bool,
  index: PropTypes.number,
};

const MOBILE_VISIBLE_COUNT = 2;

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    api
      .getExperience()
      .then((data) => setExperiences(Array.isArray(data) ? data : [data]))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const showCollapse = isMobile && experiences.length > MOBILE_VISIBLE_COUNT;
  const visibleExperiences =
    showCollapse && !expanded
      ? experiences.slice(0, MOBILE_VISIBLE_COUNT)
      : experiences;

  if (loading) {
    return (
      <section id="experience" className="py-16 md:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-3xl mx-auto h-96 bg-card animate-pulse rounded-xl" />
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-16 md:py-20 px-4 sm:px-6 text-center text-destructive">
        Failed to load experience: {error}
      </section>
    );
  }

  return (
    <section id="experience" className="py-16 md:py-20 px-4 sm:px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Work Experience"
          subtitle="Healthcare data applications and full-stack web development"
        />
        <div className="mt-4">
          {visibleExperiences.map((exp, index) => (
            <TimelineItem
              key={exp.id || index}
              exp={exp}
              index={index}
              isLast={index === visibleExperiences.length - 1}
            />
          ))}
        </div>

        {showCollapse && (
          <div className="flex justify-center -mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded((v) => !v)}
              className="gap-2"
            >
              {expanded ? (
                <>
                  Show Less
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  View More ({experiences.length - MOBILE_VISIBLE_COUNT} more)
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
