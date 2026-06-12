import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { Award } from 'lucide-react';
import { api } from '../utils/api';
import SectionHeader from './common/SectionHeader';

const AwardCard = ({ item }) => (
  <Card className="card-glow p-6 bg-card border-border hover:border-primary/40 transition-colors group">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
        <Award className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{item.issuer}</p>
        {item.date && <p className="text-xs text-accent mt-2">{item.date}</p>}
      </div>
    </div>
  </Card>
);

AwardCard.propTypes = {
  item: PropTypes.object.isRequired,
};

const Certifications = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCertifications().then(setAwards).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="hidden md:block py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-28 bg-card animate-pulse rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  if (!awards.length) return null;

  return (
    <section id="awards" className="hidden md:block py-20 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Awards & Activities"
          subtitle="Leadership, competitions, and extracurricular achievements"
        />
        <div className="grid sm:grid-cols-2 gap-4">
          {awards.map((item, i) => (
            <AwardCard key={item.id || i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
