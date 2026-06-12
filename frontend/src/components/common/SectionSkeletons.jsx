import React from 'react';
import { Skeleton } from '../ui/skeleton';
import SectionHeader from './SectionHeader';

export const ProjectsSectionSkeleton = () => (
  <section id="projects" className="py-16 md:py-20 px-4 sm:px-6 border-t border-border" aria-busy="true" aria-label="Loading projects">
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Featured Projects"
        subtitle="Production systems with measurable impact — filter by stack"
      />
      <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-md" />
        ))}
      </div>
      <div className="space-y-8">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5 md:p-8 space-y-4">
            <div className="flex gap-3">
              <Skeleton className="h-8 w-10" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
            <Skeleton className="h-8 w-3/4 max-w-md" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 max-w-lg" />
            <div className="flex flex-wrap gap-2 pt-2">
              {[1, 2, 3, 4, 5].map((j) => (
                <Skeleton key={j} className="h-6 w-16 rounded-full" />
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <Skeleton className="h-9 w-28 rounded-md" />
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const SkillsSectionSkeleton = () => (
  <section id="skills" className="py-16 md:py-20 px-4 sm:px-6 border-t border-border" aria-busy="true" aria-label="Loading skills">
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Technical Skills"
        subtitle="Proficiency across the full stack — from UI to cloud infrastructure"
      />
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5 md:p-8 space-y-6">
            <Skeleton className="h-6 w-48" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex flex-col items-center gap-2">
                  <Skeleton className="h-20 w-20 rounded-full" />
                  <Skeleton className="h-3 w-14" />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
