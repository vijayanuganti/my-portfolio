import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, X, Github, Linkedin, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const Header = ({ portfolio }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const github = portfolio?.github || 'https://github.com/vijayanuganti';
  const linkedin = portfolio?.linkedin || 'https://www.linkedin.com/in/vijju1403';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-lg border-b border-border shadow-lg shadow-primary/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-heading text-2xl font-bold"
          >
            <span className="text-foreground">VK</span>
            <span className="text-primary">.</span>
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </button>
            ))}
            <div className="flex items-center gap-2 ml-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a href={github} target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary">
                <Github className="w-5 h-5" />
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="p-2 text-foreground">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button type="button" className="text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-border">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-3 text-muted-foreground hover:text-primary"
              >
                {item.name}
              </button>
            ))}
            <div className="flex gap-4 mt-4 pt-4 border-t border-border">
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

Header.propTypes = {
  portfolio: PropTypes.object,
};

export default Header;
