export interface ProfileData {
  name: string;
  title: string;
  about: string;
  email: string;
  github: string;
  githubUrl: string;
  linkedin: string;
  linkedinUrl: string;
  skills: { category: string; items: string[] }[];
  projects: { title: string; year: string; techStack: string[] }[];
}

export const profile: ProfileData = {
  name: 'JUNG, HYUNWOO',
  title: 'Full-Stack Developer',
  about:
    'Passionate full-stack developer with experience building scalable web applications, AI-powered platforms, and developer tools. Focused on clean architecture and great user experiences.',
  email: 'placeholder@email.com',
  github: 'Xv-Hyunwoo',
  githubUrl: 'https://github.com/Xv-Hyunwoo',
  linkedin: 'placeholder',
  linkedinUrl: 'https://linkedin.com/in/placeholder',
  skills: [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'Go', 'FastAPI'] },
    { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
    { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS'] },
    { category: 'AI/ML', items: ['Claude API', 'LangGraph', 'Vercel AI SDK'] },
  ],
  projects: [
    { title: 'macOS Desktop Portfolio', year: '2026', techStack: ['React', 'TypeScript', 'Vite'] },
    { title: 'AI Agent Platform', year: '2025', techStack: ['Next.js 15', 'Claude API', 'LangGraph'] },
    { title: 'DevOps Monitoring Dashboard', year: '2025', techStack: ['React', 'Go', 'Prometheus'] },
    { title: 'SaaS Management Platform', year: '2024', techStack: ['Next.js 14', 'tRPC', 'Stripe'] },
    { title: 'Component Design System', year: '2024', techStack: ['React', 'Storybook', 'Radix UI'] },
    { title: 'AI Analytics Dashboard', year: '2023', techStack: ['React', 'Python', 'D3.js'] },
  ],
};
