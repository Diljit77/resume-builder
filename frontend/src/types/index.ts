export interface User {
  _id: string;
  email: string;
  fullName: string;

}
export interface User {
  _id: string;
  email: string;
  fullName: string;
}

export interface Education {
  school: string;
  degree: string;
  year: string;
  location?: string;
  gpa?: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
  location?: string;
  technologies?: string[];
  achievements?: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  link?: string;
  duration?: string;
  technologies?: string[];
  features?: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Resume {
  _id: string;
  userId: string;
  personal: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    ig?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  summary?: string;
  education: Education[];
  experience: Experience[];
  skills: SkillCategory[];
  projects?: Project[];
  certifications?: Certification[];
  languages?: Language[];
  achievements?: string[];
}