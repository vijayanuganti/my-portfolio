import React from 'react';
import { Home, FolderKanban, Wrench, Briefcase, Mail } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { cn } from '../lib/utils';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

const MobileBottomNav = () => {
  const activeId = useScrollSpy(SECTION_IDS, 120);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-lg safe-area-bottom"
      aria-label="Mobile section navigation"
    >
      <div className="flex items-stretch justify-around px-1 pt-1 pb-2">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              aria-label={label}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'flex flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-2 text-[10px] font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
                  isActive ? 'bg-primary/15' : 'bg-transparent'
                )}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.25 : 2} />
              </span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
