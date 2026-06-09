import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Github, Users, BookOpen } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { api } from '../utils/api';
import SectionHeader from './common/SectionHeader';
import ScrollReveal from './common/ScrollReveal';

const StatCard = ({ label, value, icon: Icon }) => (
  <Card className="card-glow p-6 text-center bg-card border-border">
    <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
    <p className="text-3xl font-heading font-bold text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground mt-1">{label}</p>
  </Card>
);

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired,
};

const GitHubStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getGitHubStats()
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="github" className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto h-80 bg-card animate-pulse rounded-xl" />
      </section>
    );
  }

  if (error) {
    return (
      <section id="github" className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>GitHub stats unavailable: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-20 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="GitHub Activity"
          subtitle={`Open source & contributions — @${stats.username}`}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <ScrollReveal delay={0}>
            <StatCard label="Public Repos" value={stats.public_repos} icon={BookOpen} />
          </ScrollReveal>
          <ScrollReveal delay={50}>
            <StatCard label="Followers" value={stats.followers} icon={Users} />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <StatCard label="Following" value={stats.following} icon={Users} />
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <StatCard label="Profile" value="↗" icon={Github} />
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-glow p-4 bg-card border-border overflow-hidden">
              <img
                src={stats.stats_cards.stats}
                alt="GitHub stats"
                className="w-full rounded-lg"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </Card>
            <Card className="card-glow p-4 bg-card border-border overflow-hidden">
              <img
                src={stats.stats_cards.top_langs}
                alt="Top languages"
                className="w-full rounded-lg"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </Card>
          </div>
          <div className="mt-6 flex justify-center">
            <Card className="card-glow p-4 bg-card border-border max-w-2xl w-full overflow-hidden">
              <img
                src={stats.stats_cards.streak}
                alt="GitHub streak"
                className="w-full rounded-lg"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </Card>
          </div>
          {stats.html_url && (
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <a href={stats.html_url} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View GitHub Profile
                </a>
              </Button>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GitHubStats;
