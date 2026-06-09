import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { Star, Quote } from 'lucide-react';
import { api } from '../utils/api';
import SectionHeader from './common/SectionHeader';
import ScrollReveal from './common/ScrollReveal';

const TestimonialCard = ({ item }) => (
  <Card className="card-glow p-6 md:p-8 bg-card border-border h-full flex flex-col">
    <Quote className="w-8 h-8 text-primary/40 mb-4" />
    <p className="text-muted-foreground leading-relaxed flex-1 mb-6">&ldquo;{item.content}&rdquo;</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-white">
        {item.avatar_initials || item.name.slice(0, 2)}
      </div>
      <div>
        <p className="font-semibold text-foreground">{item.name}</p>
        <p className="text-sm text-muted-foreground">
          {item.role} · {item.company}
        </p>
        <div className="flex gap-0.5 mt-1">
          {Array.from({ length: item.rating || 5 }).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-accent text-accent" />
          ))}
        </div>
      </div>
    </div>
  </Card>
);

TestimonialCard.propTypes = {
  item: PropTypes.object.isRequired,
};

const Testimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTestimonials().then(setItems).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-56 bg-card animate-pulse rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  if (!items.length) return null;

  return (
    <section id="testimonials" className="py-20 px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Recommendations"
          subtitle="What colleagues and leaders say about working with me"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <ScrollReveal key={item.id || i} delay={i * 100}>
              <TestimonialCard item={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
