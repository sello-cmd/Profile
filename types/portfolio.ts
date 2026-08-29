import { z } from "zod";

export type ProjectDomain = "all" | "web-saas" | "systems-iot" | "interactive-tools";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  domain: "web-saas" | "systems-iot" | "interactive-tools";
  categoryLabel: string;
  tags: string[];
  metrics: ProjectMetric[];
  challenges: string[];
  architectureHighlights: string[];
  demoUrl?: string;
  githubUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  featured: boolean;
  image: string;
  deliverables?: string[];
}

export interface ServicePillar {
  id: string;
  title: string;
  badge: string;
  description: string;
  turnaround: string;
  typicalStack: string[];
  deliverables: string[];
  iconName: "Globe" | "Layers" | "Cpu" | "Terminal" | "Workflow" | "Shield";
  accentColor: string;
}

export interface TechSkill {
  name: string;
  icon?: string;
  proficiency: "Production Master" | "Advanced" | "Proficient";
  category: "languages" | "frontend" | "backend-cloud" | "iot-systems" | "tools";
  description?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: TechSkill[];
}

export type TechArsenalCategory = SkillCategory;

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  achievements: string[];
  technologies: string[];
  highlightMetric?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  badge: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "sean" | "system";
  text: string;
  timestamp: string;
  options?: string[];
}

// Zod Schema for Inquiry Form
export const InquiryFormSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name (at least 2 characters)"),
  email: z.string().email("Please provide a valid business or personal email"),
  company: z.string().optional(),
  handle: z.string().optional(),
  projectTypes: z.array(z.string()).min(1, "Please select at least one project scope"),
  budget: z.string().min(1, "Please select an estimated budget range"),
  timeline: z.string().min(1, "Please select a target timeline"),
  scope: z.string().min(15, "Please share a brief summary of your project or problem (min 15 characters)"),
});

export type InquiryFormData = z.infer<typeof InquiryFormSchema>;

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
