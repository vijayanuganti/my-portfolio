import React from 'react';
import PropTypes from 'prop-types';
import ScrollReveal from './ScrollReveal';

const SectionHeader = ({ title, subtitle, id }) => (
  <ScrollReveal className="mb-12 md:mb-16">
    <div id={id}>
      <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl">{subtitle}</p>
      )}
      <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
    </div>
  </ScrollReveal>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  id: PropTypes.string,
};

export default SectionHeader;
