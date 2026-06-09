import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { api } from '../utils/api';
import ResumeMenu from './ResumeMenu';

const PROFILE_PHOTO = `${process.env.PUBLIC_URL}/images/profile.jpg`;

const ROLES = [
  'Python Developer',
  'Full-Stack Developer',
  'React Developer',
];

const Hero = ({ onPortfolioLoaded }) => {
  const [portfolio, setPortfolio] = useState(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);

  useEffect(() => {
    api
      .getPortfolioInfo()
      .then((data) => {
        setPortfolio(data);
        onPortfolioLoaded?.(data);
      })
      .catch(console.error);
  }, [onPortfolioLoaded]);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < current.length) {
            setDisplayText(current.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else if (displayText.length > 0) {
          setDisplayText(current.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % ROLES.length);
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const name = portfolio?.name || 'Anuganti Vijay Kumar';
  const tagline = portfolio?.tagline || 'Building scalable full-stack applications';
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="animate-fade-in">
          <Badge variant="outline" className="border-primary/40 text-primary mb-6">
            <Sparkles className="w-3 h-3 mr-2" />
            {portfolio?.years_experience
              ? `${portfolio.years_experience}+ years experience · Available for opportunities`
              : 'Available for opportunities'}
          </Badge>

          <p className="text-muted-foreground text-lg mb-2">Hello, I&apos;m</p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight">
            {name.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {name.split(' ').slice(-1)}
            </span>
          </h1>

          <div className="h-10 md:h-12 mb-6">
            <span className="font-heading text-xl md:text-2xl text-primary font-semibold">
              {displayText}
              <span className="animate-pulse text-accent">|</span>
            </span>
          </div>

          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
            {tagline}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => scrollTo('projects')}
            >
              View My Work
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <ResumeMenu />
          </div>

          {portfolio && (
            <p className="mt-8 text-sm text-muted-foreground">
              {portfolio.location} · {portfolio.email}
            </p>
          )}
        </div>

        <div className="flex justify-center lg:justify-end animate-fade-in-up">
          <div className="relative group">
            {/* Ambient glow */}
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/40 via-accent/30 to-primary/20 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-glow-pulse" />

            {/* Rotating accent ring */}
            <div className="absolute -inset-[3px] rounded-[2rem] bg-gradient-to-r from-primary via-accent to-primary opacity-80 animate-spin [animation-duration:8s]" />

            {/* Photo frame */}
            <div className="relative w-72 h-[22rem] md:w-80 md:h-[26rem] rounded-[1.75rem] overflow-hidden border-[3px] border-slate-900/80 shadow-2xl shadow-primary/20 bg-card">
              {!photoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-accent">
                  <span className="text-5xl font-heading font-bold text-white">{initials}</span>
                </div>
              )}
              <img
                src={PROFILE_PHOTO}
                alt={name}
                className={`w-full h-full object-cover object-[center_15%] scale-[1.02] transition-all duration-700 group-hover:scale-105 ${
                  photoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setPhotoLoaded(true)}
              />

              {/* Cinematic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 mix-blend-soft-light pointer-events-none" />

              {/* Bottom identity strip */}
              <div className="absolute bottom-0 inset-x-0 p-5 pt-12">
                <p className="font-heading text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                  {name.split(' ').slice(-2).join(' ')}
                </p>
                <p className="text-sm text-white/80 mt-1">Python & Full-Stack Developer</p>
                {portfolio?.location && (
                  <p className="flex items-center gap-1.5 text-xs text-white/70 mt-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {portfolio.location}
                  </p>
                )}
              </div>
            </div>

            {/* Open to work badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
              <Badge className="bg-emerald-500/95 hover:bg-emerald-500 text-white border-0 shadow-lg shadow-emerald-500/30 px-4 py-1.5 text-xs font-semibold tracking-wide">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                Open to Work
              </Badge>
            </div>

            {/* Floating accent orbs */}
            <div className="absolute -top-3 -right-3 w-14 h-14 rounded-2xl bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="absolute top-1/2 -left-5 w-10 h-10 rounded-full bg-accent/25 backdrop-blur-sm border border-accent/40 shadow-md hidden md:block" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-muted-foreground/40 rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  onPortfolioLoaded: PropTypes.func,
};

export default Hero;
