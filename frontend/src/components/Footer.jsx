import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { api } from '../utils/api';

const Footer = ({ portfolio }) => {
  const [visits, setVisits] = useState(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    api.getVisitStats().then(setVisits).catch(() => {});
  }, []);

  const github = portfolio?.github || 'https://github.com/vijayanuganti';
  const linkedin = portfolio?.linkedin || 'https://www.linkedin.com/in/vijju1403';
  const email = portfolio?.email || 'vijayanuganti504@gmail.com';

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4">
              <span className="text-foreground">VK</span>
              <span className="text-primary">.</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Senior Full Stack Developer building scalable applications with React, FastAPI,
              and cloud-native architecture.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['#about', '#skills', '#projects', '#experience', '#contact'].map((href) => (
                <li key={href}>
                  <a href={href} className="text-muted-foreground hover:text-primary transition-colors capitalize">
                    {href.replace('#', '')}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${email}`}
                className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {year} {portfolio?.name || 'Anuganti Vijay Kumar'}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> React & FastAPI
            {visits && (
              <span className="text-xs ml-2 opacity-70">· {visits.total_visits} visits</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  portfolio: PropTypes.object,
};

export default Footer;
