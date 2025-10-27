export interface Skill {
  name: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface Project {
  id: string; // Use string for IDs for easier mocking
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Algorithm {
  id: string;
  name: string;
  language: string;
  codeSnippet: string;
  description: string;
}

export interface Experience {
  year: string;
  title: string;
  description: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  sentAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  profileImage: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  about: {
    short: string;
    long: string;
  };
  skills: Skill[];
  projects: Project[];
  algorithms: Algorithm[];
  experience: Experience[];
  contact: {
    email: string;
    whatsappNumber: string;
  },
  resumeUrl: string;
  profileImageUrl: string;
}

// Type for the context that will hold mock database
export interface DataContextType {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'sentAt'>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  addAlgorithm: (algorithm: Omit<Algorithm, 'id'>) => void;
  updateAlgorithm: (algorithm: Algorithm) => void;
  deleteAlgorithm: (algorithmId: string) => void;
}
