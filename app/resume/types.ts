// types.ts
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  linkedin: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

export interface ResumeData {
  id: string;
  title: string;
  role: string;
  personalInfo: PersonalInfo;
  summary: string;
  skills: string[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[]; // Add this line
  lastUpdated: string;
  score: number;
}

export interface ResumeFormData {
  personalInfo: PersonalInfo;
  summary: string;
  skills: string[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[]; // Add this line
}

export interface ResumeFormProps {
  resumeData: ResumeFormData;
  setResumeData: (data: ResumeFormData | ((prev: ResumeFormData) => ResumeFormData)) => void;
}