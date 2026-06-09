import React, { useEffect, useState } from 'react';

const LoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timers = [
      setTimeout(() => setProgress(30), 100),
      setTimeout(() => setProgress(60), 300),
      setTimeout(() => setProgress(85), 600),
      setTimeout(() => setProgress(100), 900),
      setTimeout(() => setVisible(false), 1200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-slate-800">
      <div
        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default LoadingBar;
