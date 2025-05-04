import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export interface ContactInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  portfolio?: string;
  github?: string;
  leetcode?: string;
  codechef?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  link?: string;
  technologies: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  link?: string;
}

export interface SkillsByCategory {
  languages: SkillItem[];
  frontend: SkillItem[];
  backend: SkillItem[];
  frameworks: SkillItem[];
  database: SkillItem[];
  tools: SkillItem[];
  versionControl: SkillItem[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'frameworks' | 'database' | 'tools' | 'versionControl';
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
}

export interface ResumeData {
  contactInfo: ContactInfo;
  aboutContent: string;
  experienceItems: ExperienceItem[];
  educationItems: EducationItem[];
  skillItems: SkillItem[];
  projectItems: ProjectItem[];
  certificationItems: CertificationItem[];
  selectedTemplate: string;
}

export const templates: ResumeTemplate[] = [
  {
    id: "classic",
    name: "Classic",
    description: "A traditional resume layout with a clean, professional appearance"
  },
  {
    id: "modern",
    name: "Modern",
    description: "A contemporary design with a sleek, minimalist style"
  },
  {
    id: "creative",
    name: "Creative",
    description: "A bold, colorful design that showcases your personality"
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "A simple, clean design focusing on content"
  }
];

export const defaultResumeData: ResumeData = {
  contactInfo: {
    fullName: "John Doe",
    title: "Software Engineer",
    email: "johndoe@example.com",
    phone: "(123) 456-7890",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.com",
    portfolio: "portfolio.johndoe.com",
    github: "github.com/johndoe",
    leetcode: "leetcode.com/johndoe",
    codechef: "codechef.com/users/johndoe"
  },
  aboutContent: "Experienced software engineer with a passion for creating efficient and scalable applications. Skilled in React, TypeScript, and Node.js with a strong understanding of software development principles.",
  experienceItems: [
    {
      id: "exp1",
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      startDate: "Jan 2020",
      endDate: "Present",
      location: "San Francisco, CA",
      description: "Developed and maintained web applications using React and TypeScript. Led a team of 5 developers."
    },
    {
      id: "exp2",
      company: "Digital Innovations Ltd",
      position: "Software Developer",
      startDate: "Jun 2017",
      endDate: "Dec 2019",
      location: "Boston, MA",
      description: "Built RESTful APIs using Node.js and Express. Implemented CI/CD pipelines for automated testing and deployment."
    }
  ],
  educationItems: [
    {
      id: "edu1",
      institution: "University of Technology",
      degree: "Bachelor's",
      field: "Computer Science",
      startDate: "2013",
      endDate: "2017",
      location: "Boston, MA"
    }
  ],
  projectItems: [
    {
      id: "proj1",
      title: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB",
      startDate: "Jan 2021",
      endDate: "Jun 2021",
      link: "github.com/johndoe/ecommerce",
      technologies: "React, Node.js, Express, MongoDB"
    },
    {
      id: "proj2",
      title: "Portfolio Website",
      description: "Designed and developed a personal portfolio website",
      startDate: "Aug 2020",
      endDate: "Sep 2020",
      link: "johndoe.com",
      technologies: "React, Tailwind CSS, Framer Motion"
    }
  ],
  certificationItems: [
    {
      id: "cert1",
      name: "AWS Certified Developer",
      organization: "Amazon Web Services",
      issueDate: "May 2022",
      expiryDate: "May 2025",
      credentialId: "AWS-12345",
      link: "aws.amazon.com/verification"
    },
    {
      id: "cert2",
      name: "React Advanced Patterns",
      organization: "Frontend Masters",
      issueDate: "Jan 2021",
      link: "frontendmasters.com/certificates/12345"
    }
  ],
  skillItems: [
    { id: "skill1", name: "JavaScript", category: "languages" },
    { id: "skill2", name: "TypeScript", category: "languages" },
    { id: "skill3", name: "Python", category: "languages" },
    { id: "skill4", name: "React", category: "frontend" },
    { id: "skill5", name: "HTML/CSS", category: "frontend" },
    { id: "skill6", name: "Node.js", category: "backend" },
    { id: "skill7", name: "Express", category: "frameworks" },
    { id: "skill8", name: "MongoDB", category: "database" },
    { id: "skill9", name: "PostgreSQL", category: "database" },
    { id: "skill10", name: "Docker", category: "tools" },
    { id: "skill11", name: "Git", category: "versionControl" }
  ],
  selectedTemplate: "classic"
};

export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const exportToPDF = async (resumeRef: React.RefObject<HTMLDivElement>) => {
  if (!resumeRef.current) return false;

  try {
    const element = resumeRef.current;
    const originalDisplay = element.style.display;
    const originalPosition = element.style.position;
    const originalBackground = element.style.background;
    
    // Temporarily modify for better PDF rendering
    element.style.display = "inline-block";
    element.style.position = "relative";
    element.style.background = "white";
    
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 800,
      width: element.offsetWidth,
      height: element.offsetHeight
    });
    
    // Restore original styles
    element.style.display = originalDisplay;
    element.style.position = originalPosition;
    element.style.background = originalBackground;
    
    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF with proper dimensions
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    const pdf = new jsPDF({
      orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
    
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
};

export const groupSkillsByCategory = (skills: SkillItem[]): SkillsByCategory => {
  return skills.reduce((categories, skill) => {
    const category = skill.category;
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(skill);
    return categories;
  }, {} as SkillsByCategory);
};
