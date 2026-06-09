import React from 'react';
import { Badge } from './ui/badge';
import { Code2, BarChart3, Beaker, Database, Hash, TrendingUp, FileCode2, Palette, Plug, FileText, Paintbrush, Zap, Package, Terminal } from 'lucide-react';
import '../styles/TechStack.css';

const TechStack = () => {
  const technologies = [
    { name: 'Python', Icon: Code2 },
    { name: 'Dash', Icon: BarChart3 },
    { name: 'Flask', Icon: Beaker },
    { name: 'Pandas', Icon: Database },
    { name: 'NumPy', Icon: Hash },
    { name: 'Plotly', Icon: TrendingUp },
    { name: 'TypeScript', Icon: FileCode2 },
    { name: 'Bootstrap', Icon: Palette },
    { name: 'REST APIs', Icon: Plug },
    { name: 'HTML5', Icon: FileText },
    { name: 'CSS3', Icon: Paintbrush },
    { name: 'JavaScript', Icon: Zap },
    { name: 'Git', Icon: Package },
    { name: 'VS Code', Icon: Terminal },
  ];

  return (
    <section id="tech-stack" className="py-20 px-6 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-bold mb-4 text-foreground">Tech Stack</h2>
          <p className="text-muted-foreground text-lg">Technologies I work with daily</p>
        </div>
        <div className="relative overflow-hidden">
          <div className="tech-stack-scroll flex gap-4">
            {[...technologies, ...technologies].map((tech, index) => (
              <div
                key={index}
                className="flex-shrink-0 card-glow bg-card border-border rounded-lg px-6 py-4 flex items-center gap-3 hover:border-primary/40 transition-all duration-300"
              >
                <tech.Icon className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;