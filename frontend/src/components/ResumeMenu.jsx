import React from 'react';
import { Download, Eye, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { downloadResume, viewResume } from '../constants/resume';

const ResumeMenu = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button size="lg" variant="outline" className="border-border hover:bg-card gap-2">
        <FileText className="w-4 h-4" />
        My Resume
      </Button>
    </PopoverTrigger>
    <PopoverContent align="start" className="w-56 p-2 bg-card border-border">
      <p className="text-xs font-medium text-muted-foreground px-2 py-1.5">Resume options</p>
      <div className="flex flex-col gap-1">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 hover:bg-primary/10 hover:text-primary"
          onClick={viewResume}
        >
          <Eye className="w-4 h-4" />
          View
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 hover:bg-accent/10 hover:text-accent"
          onClick={downloadResume}
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>
    </PopoverContent>
  </Popover>
);

export default ResumeMenu;
