export interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
  order: number;
}

export interface SkillCategory {
  _id: string;
  category: string;
  icon: string;
  skills: string[];
  order: number;
}

export interface OpenSourceContribution {
  _id: string;
  repo: string;
  title: string;
  description: string;
  status: 'Merged' | 'Open' | 'Closed';
  url: string;
  order: number;
}

export interface Experience {
  _id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  order: number;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
}
