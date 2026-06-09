import {
  Code2,
  Database,
  Cloud,
  GitBranch,
  Server,
  Layers,
  Box,
  Terminal,
  Globe,
  Cpu,
} from 'lucide-react';

/** Maps tech icon keys to Lucide components */
export const TECH_ICON_MAP = {
  react: Code2,
  typescript: Code2,
  javascript: Code2,
  java: Terminal,
  html: Globe,
  css: Layers,
  bootstrap: Layers,
  tailwind: Layers,
  nextjs: Globe,
  redux: Box,
  fastapi: Server,
  python: Terminal,
  dash: Server,
  nodejs: Server,
  flask: Server,
  api: Globe,
  mongodb: Database,
  postgresql: Database,
  mysql: Database,
  redis: Database,
  pandas: Database,
  plotly: Layers,
  aws: Cloud,
  docker: Box,
  cicd: GitBranch,
  linux: Cpu,
  git: GitBranch,
  vscode: Code2,
  postman: Globe,
  jira: Layers,
  award: Code2,
  default: Code2,
};

export const getTechIcon = (key) => TECH_ICON_MAP[key] || TECH_ICON_MAP.default;

export const PROJECT_FILTERS = ['All', 'Frontend', 'Backend', 'Full Stack'];
