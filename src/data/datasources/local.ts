// Data Layer - Local Data Sources
// Mock data for development

import type { User, Project, Skill, Experience } from '../../domain/entities';

export const mockUser: User = {
  id: '1',
  name: 'Your Name',
  email: 'hello@irello.dev',
  bio: "I'm a passionate developer with experience building modern web applications. I love creating intuitive user interfaces and solving complex problems.",
  location: 'Jakarta, Indonesia',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
};

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-featured online store with cart, checkout, and payment integration.',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    featured: true,
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates.',
    tags: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    featured: true,
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'Personal portfolio with dark mode and animations.',
    tags: ['Next.js', 'Framer Motion', 'TypeScript'],
    featured: false,
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: '4',
    title: 'Weather Dashboard',
    description: 'Real-time weather tracking with forecasts and alerts.',
    tags: ['React', 'OpenWeather API', 'Chart.js'],
    featured: false,
    githubUrl: '#',
    liveUrl: '#',
  },
];

export const mockSkills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend', proficiency: 90 },
  { name: 'TypeScript', category: 'frontend', proficiency: 85 },
  { name: 'Next.js', category: 'frontend', proficiency: 80 },
  { name: 'Vue.js', category: 'frontend', proficiency: 75 },
  { name: 'CSS/SCSS', category: 'frontend', proficiency: 85 },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 80 },
  // Backend
  { name: 'Node.js', category: 'backend', proficiency: 80 },
  { name: 'Python', category: 'backend', proficiency: 75 },
  { name: 'PostgreSQL', category: 'backend', proficiency: 70 },
  { name: 'MongoDB', category: 'backend', proficiency: 75 },
  { name: 'REST API', category: 'backend', proficiency: 85 },
  // Tools
  { name: 'Git', category: 'tools', proficiency: 90 },
  { name: 'Docker', category: 'tools', proficiency: 65 },
  { name: 'AWS', category: 'tools', proficiency: 60 },
  { name: 'Figma', category: 'tools', proficiency: 70 },
  // Other
  { name: 'Agile/Scrum', category: 'other', proficiency: 80 },
  { name: 'Problem Solving', category: 'other', proficiency: 85 },
];

export const mockExperiences: Experience[] = [
  {
    id: '1',
    company: 'Tech Company',
    role: 'Senior Developer',
    period: '2022 - Present',
    description: 'Leading development of modern web applications. Managing a team of 5 developers.',
    isCurrentRole: true,
  },
  {
    id: '2',
    company: 'Startup Inc',
    role: 'Full Stack Developer',
    period: '2020 - 2022',
    description: 'Built scalable applications from scratch. Implemented microservices architecture.',
  },
  {
    id: '3',
    company: 'Digital Agency',
    role: 'Frontend Developer',
    period: '2018 - 2020',
    description: 'Created responsive websites for clients. Collaborated with design team.',
  },
];
