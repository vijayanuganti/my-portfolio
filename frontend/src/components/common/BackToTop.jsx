import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '../ui/button';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      size="icon"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:scale-110 transition-transform"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
};

export default BackToTop;
