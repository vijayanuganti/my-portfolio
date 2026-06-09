import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import GitHubStats from '../components/GitHubStats';
import Testimonials from '../components/Testimonials';
import Certifications from '../components/Certifications';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { api } from '../utils/api';

const Home = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    api.trackVisit('/').catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header portfolio={portfolio} />

      <Hero onPortfolioLoaded={setPortfolio} />

      <ErrorBoundary fallbackMessage="Tech stack failed to load.">
        <TechStack />
      </ErrorBoundary>

      <ErrorBoundary fallbackMessage="Projects failed to load.">
        <Projects />
      </ErrorBoundary>

      <ErrorBoundary fallbackMessage="About section failed to load.">
        <About />
      </ErrorBoundary>

      <ErrorBoundary fallbackMessage="Skills failed to load.">
        <Skills />
      </ErrorBoundary>

      <ErrorBoundary fallbackMessage="Experience failed to load.">
        <Experience />
      </ErrorBoundary>

      <ErrorBoundary fallbackMessage="GitHub stats failed to load.">
        <GitHubStats />
      </ErrorBoundary>

      <ErrorBoundary fallbackMessage="Testimonials failed to load.">
        <Testimonials />
      </ErrorBoundary>

      <ErrorBoundary fallbackMessage="Certifications failed to load.">
        <Certifications />
      </ErrorBoundary>

      <ErrorBoundary fallbackMessage="Blog failed to load.">
        <Blog />
      </ErrorBoundary>

      <ErrorBoundary fallbackMessage="Contact form failed to load.">
        <Contact portfolio={portfolio} />
      </ErrorBoundary>

      <Footer portfolio={portfolio} />
    </div>
  );
};

export default Home;
