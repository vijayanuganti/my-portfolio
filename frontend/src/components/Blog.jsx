import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { api } from '../utils/api';
import SectionHeader from './common/SectionHeader';
import ScrollReveal from './common/ScrollReveal';

const BlogCard = ({ post }) => (
  <Card className="card-glow p-6 bg-card border-border hover:border-primary/40 transition-all group h-full flex flex-col">
    <div className="flex flex-wrap gap-2 mb-4">
      {post.tags?.map((tag) => (
        <Badge key={tag} variant="secondary" className="text-xs">
          {tag}
        </Badge>
      ))}
    </div>
    <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
      {post.title}
    </h3>
    <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <span className="flex items-center gap-1">
        <Calendar className="w-3 h-3" />
        {post.date}
      </span>
      <span className="flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {post.read_time}
      </span>
    </div>
    <a
      href={post.url || '#'}
      className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 hover:gap-2 transition-all"
    >
      Read article <ArrowRight className="w-4 h-4" />
    </a>
  </Card>
);

BlogCard.propTypes = {
  post: PropTypes.object.isRequired,
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBlogPosts().then(setPosts).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-52 bg-card animate-pulse rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  if (!posts.length) return null;

  return (
    <section id="blog" className="py-20 px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Articles & Insights"
          subtitle="Thoughts on full-stack development, migration, and best practices"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <ScrollReveal key={post.id || i} delay={i * 80}>
              <BlogCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
