// Domain Layer - Entities
// Core business objects that are independent of any framework or database

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  socialLinks?: SocialLinks;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string;
  proficiency?: number; // 1-100
}

export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'other';

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  isCurrentRole?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export * from './kanban';

export interface ContactResponse {
  success: boolean;
  message: string;
}
