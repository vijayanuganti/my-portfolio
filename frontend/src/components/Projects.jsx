import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github, Star } from 'lucide-react';
import { api } from '../utils/api';
import SectionHeader from './common/SectionHeader';
import ScrollReveal from './common/ScrollReveal';
import { PROJECT_FILTERS, getTechIcon } from '../constants/techIcons';
import { ProjectsSectionSkeleton } from './common/SectionSkeletons';

const ProjectCard = ({ project, index, noReveal = false }) => {
  const card = (
    <Card className="card-glow group bg-card border-border overflow-hidden hover:border-primary/40 transition-all duration-300 h-full">
      <div className="p-5 md:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-3xl font-bold text-muted-foreground/30">
            {String(project.id).padStart(2, '0')}
          </span>
          {project.featured && (
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <Star className="w-3 h-3 mr-1 fill-primary" />
              Featured
            </Badge>
          )}
          <Badge variant="outline">{project.category}</Badge>
        </div>

        <h3 className="font-heading text-xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {project.tagline && (
          <p className="text-sm text-primary/90 font-medium mb-3 leading-snug">
            {project.tagline}
          </p>
        )}

        <p className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base">
          {project.description}
        </p>

        <ul className="space-y-2 mb-6">
          {project.features?.slice(0, 4).map((f, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground">
              <span className="text-accent mt-0.5 shrink-0">▸</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
          {(project.tech_icons || project.technologies).map((tech, idx) => {
            const key = project.tech_icons?.[idx] || 'default';
            const Icon = getTechIcon(key);
            const label = project.technologies[idx] || tech;
            return (
              <Badge key={idx} variant="secondary" className="bg-slate-800/80 gap-1">
                <Icon className="w-3 h-3" />
                {label}
              </Badge>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3">
          {project.live_url && (
            <Button size="sm" asChild>
              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1" />
                Live Demo
              </a>
            </Button>
          )}
          {project.github_url && (
            <Button size="sm" variant="outline" asChild>
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-1" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  if (noReveal) return card;

  return (
    <ScrollReveal delay={index * 80}>
      {card}
    </ScrollReveal>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  noReveal: PropTypes.bool,
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    api
      .getProjects()
      .then(setProjects)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setActiveSlide(0);
  }, [filter]);

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.filter_category === filter);
  }, [projects, filter]);

  if (loading) {
    return <ProjectsSectionSkeleton />;
  }

  if (error) {
    return (
      <section id="projects" className="py-16 md:py-20 px-4 sm:px-6 text-center text-destructive">
        Failed to load projects: {error}
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 md:py-20 px-4 sm:px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Featured Projects"
          subtitle="Production systems with measurable impact — filter by stack"
        />

        <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
          {PROJECT_FILTERS.map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? 'default' : 'outline'}
              className={filter === f ? 'bg-primary' : ''}
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No projects in this category.</p>
        ) : (
          <>
            {/* Desktop: vertical stack */}
            <div className="hidden md:block space-y-10">
              {filtered.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {/* Mobile: horizontal snap carousel */}
            <ScrollReveal className="md:hidden">
              <div
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide overscroll-x-contain"
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const slideWidth = el.offsetWidth * 0.88 + 16;
                  setActiveSlide(Math.round(el.scrollLeft / slideWidth));
                }}
              >
                {filtered.map((project, index) => (
                  <div
                    key={project.id}
                    className="snap-center shrink-0 w-[88vw] max-w-md"
                  >
                    <ProjectCard project={project} index={index} noReveal />
                  </div>
                ))}
              </div>
              {filtered.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-3">
                  {filtered.map((project, i) => (
                    <span
                      key={project.id}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeSlide ? 'w-5 bg-primary' : 'w-1.5 bg-muted-foreground/30'
                      }`}
                      aria-hidden
                    />
                  ))}
                </div>
              )}
            </ScrollReveal>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
