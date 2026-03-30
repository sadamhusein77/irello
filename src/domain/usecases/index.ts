// Domain Layer - Use Cases
// Business logic independent of frameworks

import type { User, Project, Skill, Experience, ContactFormData, ContactResponse, SkillCategory } from '../entities';
import type { IUserRepository, IProjectRepository, ISkillRepository, IExperienceRepository, IContactRepository } from '../repositories';

// User Use Cases
export class GetUserProfileUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<User> {
    return this.userRepository.getProfile();
  }
}

// Project Use Cases
export class GetAllProjectsUseCase {
  private projectRepository: IProjectRepository;

  constructor(projectRepository: IProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(): Promise<Project[]> {
    return this.projectRepository.getAllProjects();
  }
}

export class GetFeaturedProjectsUseCase {
  private projectRepository: IProjectRepository;

  constructor(projectRepository: IProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(): Promise<Project[]> {
    return this.projectRepository.getFeaturedProjects();
  }
}

// Skill Use Cases
export class GetAllSkillsUseCase {
  private skillRepository: ISkillRepository;

  constructor(skillRepository: ISkillRepository) {
    this.skillRepository = skillRepository;
  }

  async execute(): Promise<Skill[]> {
    return this.skillRepository.getAllSkills();
  }
}

export class GetSkillsByCategoryUseCase {
  private skillRepository: ISkillRepository;

  constructor(skillRepository: ISkillRepository) {
    this.skillRepository = skillRepository;
  }

  async execute(category: SkillCategory): Promise<Skill[]> {
    return this.skillRepository.getSkillsByCategory(category);
  }
}

// Experience Use Cases
export class GetAllExperiencesUseCase {
  private experienceRepository: IExperienceRepository;

  constructor(experienceRepository: IExperienceRepository) {
    this.experienceRepository = experienceRepository;
  }

  async execute(): Promise<Experience[]> {
    return this.experienceRepository.getAllExperiences();
  }
}

// Contact Use Cases
export class SendContactMessageUseCase {
  private contactRepository: IContactRepository;

  constructor(contactRepository: IContactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(data: ContactFormData): Promise<ContactResponse> {
    // Validate input
    if (!data.name || !data.email || !data.message) {
      return { success: false, message: 'All fields are required' };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { success: false, message: 'Invalid email format' };
    }

    return this.contactRepository.sendMessage(data);
  }
}
