// ── Type definitions for the Neon Noir portfolio ──

export interface Experience {
  id: string;
  company: string;
  logo?: string;
  role: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  location: string;
  locationType: 'Remote' | 'On-site' | 'Hybrid';
  startDate: string;
  endDate: string | 'Present';
  achievements: string[];
  techStack: string[];
  current?: boolean;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  images: string[];
  techStack: string[];
  features: string[];
  category: ('Full-Stack' | 'Frontend' | 'Backend' | 'AI/ML' | 'Open Source')[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  status: 'Live' | 'In Progress' | 'Archived';
}

export interface Skill {
  name: string;
  icon: string;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Tools';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerLogo: string;
  issuerColor: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verifyUrl: string;
  badge?: string;
  premium?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  type: 'Research Paper' | 'Blog Post' | 'Conference Talk' | 'Technical Article';
  platform: string;
  authors: string[];
  date: string;
  abstract: string;
  readTime?: string;
  doi?: string;
  url: string;
  tags: string[];
}

export interface NavLink {
  label: string;
  href: string;
}
