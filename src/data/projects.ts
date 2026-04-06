import type { FileSystemNode } from '../types';

export const fileSystemData: Record<string, FileSystemNode> = {
  desktop: {
    id: 'desktop',
    name: 'Desktop',
    type: 'folder',
    parentId: null,
    children: ['folder-2021', 'folder-2022', 'folder-2023', 'folder-2024', 'folder-2025', 'folder-2026'],
  },

  // 2021
  'folder-2021': {
    id: 'folder-2021',
    name: '2021',
    type: 'folder',
    parentId: 'desktop',
    children: ['project-2021-1', 'project-2021-2'],
  },
  'project-2021-1': {
    id: 'project-2021-1',
    name: 'Portfolio Website v1.pdf',
    type: 'file',
    parentId: 'folder-2021',
    projectData: {
      title: 'Portfolio Website v1',
      description: 'First personal portfolio website built with vanilla HTML, CSS, and JavaScript. Focused on clean design and responsive layout.',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
      content: `<div class="pdf-content">
        <h1>Portfolio Website v1</h1>
        <p class="pdf-subtitle">Personal Portfolio - 2021</p>
        <hr />
        <h2>Overview</h2>
        <p>My first portfolio website, designed to showcase early projects and experiments with web development. Built entirely from scratch without frameworks.</p>
        <h2>Tech Stack</h2>
        <ul>
          <li>HTML5 - Semantic markup</li>
          <li>CSS3 - Custom properties, Grid, Flexbox</li>
          <li>JavaScript - Vanilla ES6+</li>
          <li>GSAP - Scroll animations</li>
        </ul>
        <h2>Key Features</h2>
        <ul>
          <li>Fully responsive design</li>
          <li>Smooth scroll animations</li>
          <li>Dark/light mode toggle</li>
          <li>Contact form with validation</li>
        </ul>
      </div>`,
    },
  },
  'project-2021-2': {
    id: 'project-2021-2',
    name: 'Todo App.pdf',
    type: 'file',
    parentId: 'folder-2021',
    projectData: {
      title: 'Todo Application',
      description: 'A full-stack todo application with user authentication and real-time updates.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      content: `<div class="pdf-content">
        <h1>Todo Application</h1>
        <p class="pdf-subtitle">Full-Stack Project - 2021</p>
        <hr />
        <h2>Overview</h2>
        <p>A collaborative todo application with real-time synchronization across multiple clients.</p>
        <h2>Tech Stack</h2>
        <ul>
          <li>React - Frontend UI</li>
          <li>Node.js + Express - Backend API</li>
          <li>MongoDB - Database</li>
          <li>Socket.io - Real-time updates</li>
        </ul>
      </div>`,
    },
  },

  // 2022
  'folder-2022': {
    id: 'folder-2022',
    name: '2022',
    type: 'folder',
    parentId: 'desktop',
    children: ['project-2022-1', 'project-2022-2'],
  },
  'project-2022-1': {
    id: 'project-2022-1',
    name: 'E-Commerce Platform.pdf',
    type: 'file',
    parentId: 'folder-2022',
    projectData: {
      title: 'E-Commerce Platform',
      description: 'Full-featured e-commerce platform with payment integration and admin dashboard.',
      techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
      content: `<div class="pdf-content">
        <h1>E-Commerce Platform</h1>
        <p class="pdf-subtitle">Full-Stack E-Commerce - 2022</p>
        <hr />
        <h2>Overview</h2>
        <p>A complete e-commerce solution with product management, cart, checkout, and order tracking.</p>
        <h2>Tech Stack</h2>
        <ul>
          <li>Next.js - SSR & SSG</li>
          <li>TypeScript - Type safety</li>
          <li>Stripe - Payment processing</li>
          <li>PostgreSQL - Database</li>
          <li>Prisma - ORM</li>
        </ul>
        <h2>Key Features</h2>
        <ul>
          <li>Product catalog with search & filters</li>
          <li>Shopping cart & wishlist</li>
          <li>Secure checkout with Stripe</li>
          <li>Admin dashboard for order management</li>
          <li>Email notifications</li>
        </ul>
      </div>`,
    },
  },
  'project-2022-2': {
    id: 'project-2022-2',
    name: 'Chat Application.pdf',
    type: 'file',
    parentId: 'folder-2022',
    projectData: {
      title: 'Real-time Chat Application',
      description: 'Real-time messaging application with group chats, file sharing, and video calls.',
      techStack: ['React', 'Firebase', 'WebRTC', 'Tailwind CSS'],
      content: `<div class="pdf-content">
        <h1>Real-time Chat Application</h1>
        <p class="pdf-subtitle">Communication Platform - 2022</p>
        <hr />
        <h2>Overview</h2>
        <p>A modern chat application supporting one-on-one and group messaging with rich media support.</p>
        <h2>Tech Stack</h2>
        <ul>
          <li>React - Frontend</li>
          <li>Firebase - Backend & Real-time DB</li>
          <li>WebRTC - Video calls</li>
          <li>Tailwind CSS - Styling</li>
        </ul>
      </div>`,
    },
  },

  // 2023
  'folder-2023': {
    id: 'folder-2023',
    name: '2023',
    type: 'folder',
    parentId: 'desktop',
    children: ['project-2023-1', 'project-2023-2'],
  },
  'project-2023-1': {
    id: 'project-2023-1',
    name: 'AI Dashboard.pdf',
    type: 'file',
    parentId: 'folder-2023',
    projectData: {
      title: 'AI Analytics Dashboard',
      description: 'Analytics dashboard with AI-powered insights and data visualization.',
      techStack: ['React', 'Python', 'FastAPI', 'D3.js', 'OpenAI'],
      content: `<div class="pdf-content">
        <h1>AI Analytics Dashboard</h1>
        <p class="pdf-subtitle">Data Analytics Platform - 2023</p>
        <hr />
        <h2>Overview</h2>
        <p>An intelligent analytics dashboard that uses AI to generate insights from complex datasets.</p>
        <h2>Tech Stack</h2>
        <ul>
          <li>React + TypeScript - Frontend</li>
          <li>Python + FastAPI - Backend</li>
          <li>D3.js - Data visualization</li>
          <li>OpenAI API - AI-powered insights</li>
          <li>Redis - Caching</li>
        </ul>
      </div>`,
    },
  },
  'project-2023-2': {
    id: 'project-2023-2',
    name: 'Mobile Fitness App.pdf',
    type: 'file',
    parentId: 'folder-2023',
    projectData: {
      title: 'Mobile Fitness App',
      description: 'Cross-platform fitness tracking application with workout plans and progress analytics.',
      techStack: ['React Native', 'TypeScript', 'Supabase', 'Expo'],
      content: `<div class="pdf-content">
        <h1>Mobile Fitness App</h1>
        <p class="pdf-subtitle">Health & Fitness - 2023</p>
        <hr />
        <h2>Overview</h2>
        <p>A comprehensive fitness tracking app with personalized workout plans and detailed progress tracking.</p>
        <h2>Tech Stack</h2>
        <ul>
          <li>React Native + Expo - Cross-platform</li>
          <li>TypeScript - Type safety</li>
          <li>Supabase - Backend</li>
          <li>Reanimated - Animations</li>
        </ul>
      </div>`,
    },
  },

  // 2024
  'folder-2024': {
    id: 'folder-2024',
    name: '2024',
    type: 'folder',
    parentId: 'desktop',
    children: ['project-2024-1', 'project-2024-2'],
  },
  'project-2024-1': {
    id: 'project-2024-1',
    name: 'SaaS Platform.pdf',
    type: 'file',
    parentId: 'folder-2024',
    projectData: {
      title: 'SaaS Management Platform',
      description: 'Multi-tenant SaaS platform with subscription management and team collaboration.',
      techStack: ['Next.js 14', 'TypeScript', 'tRPC', 'Drizzle ORM', 'Stripe'],
      content: `<div class="pdf-content">
        <h1>SaaS Management Platform</h1>
        <p class="pdf-subtitle">Enterprise SaaS - 2024</p>
        <hr />
        <h2>Overview</h2>
        <p>A scalable SaaS platform with multi-tenancy, role-based access, and subscription billing.</p>
        <h2>Tech Stack</h2>
        <ul>
          <li>Next.js 14 - App Router</li>
          <li>tRPC - Type-safe API</li>
          <li>Drizzle ORM - Database</li>
          <li>Stripe - Billing</li>
          <li>Resend - Email</li>
        </ul>
      </div>`,
    },
  },
  'project-2024-2': {
    id: 'project-2024-2',
    name: 'Design System.pdf',
    type: 'file',
    parentId: 'folder-2024',
    projectData: {
      title: 'Component Design System',
      description: 'Comprehensive design system with 50+ components, documentation, and Figma integration.',
      techStack: ['React', 'Storybook', 'Tailwind CSS', 'Radix UI', 'Chromatic'],
      content: `<div class="pdf-content">
        <h1>Component Design System</h1>
        <p class="pdf-subtitle">UI Component Library - 2024</p>
        <hr />
        <h2>Overview</h2>
        <p>A production-grade design system with accessible, composable components.</p>
        <h2>Tech Stack</h2>
        <ul>
          <li>React - Component library</li>
          <li>Storybook - Documentation</li>
          <li>Tailwind CSS - Styling</li>
          <li>Radix UI - Accessibility</li>
          <li>Chromatic - Visual testing</li>
        </ul>
      </div>`,
    },
  },

  // 2025
  'folder-2025': {
    id: 'folder-2025',
    name: '2025',
    type: 'folder',
    parentId: 'desktop',
    children: ['project-2025-1', 'project-2025-2'],
  },
  'project-2025-1': {
    id: 'project-2025-1',
    name: 'AI Agent Platform.pdf',
    type: 'file',
    parentId: 'folder-2025',
    projectData: {
      title: 'AI Agent Platform',
      description: 'Platform for building, deploying, and managing AI agents with tool use capabilities.',
      techStack: ['Next.js 15', 'Claude API', 'LangGraph', 'Vercel AI SDK'],
      content: `<div class="pdf-content">
        <h1>AI Agent Platform</h1>
        <p class="pdf-subtitle">AI/ML Platform - 2025</p>
        <hr />
        <h2>Overview</h2>
        <p>A platform for creating and orchestrating AI agents with advanced tool use and multi-step reasoning.</p>
        <h2>Tech Stack</h2>
        <ul>
          <li>Next.js 15 - Frontend & API</li>
          <li>Claude API - AI backbone</li>
          <li>LangGraph - Agent orchestration</li>
          <li>Vercel AI SDK - Streaming</li>
        </ul>
      </div>`,
    },
  },
  'project-2025-2': {
    id: 'project-2025-2',
    name: 'DevOps Dashboard.pdf',
    type: 'file',
    parentId: 'folder-2025',
    projectData: {
      title: 'DevOps Monitoring Dashboard',
      description: 'Real-time infrastructure monitoring with alerting and incident management.',
      techStack: ['React', 'Go', 'Prometheus', 'Grafana', 'Kubernetes'],
      content: `<div class="pdf-content">
        <h1>DevOps Monitoring Dashboard</h1>
        <p class="pdf-subtitle">Infrastructure Monitoring - 2025</p>
        <hr />
        <h2>Overview</h2>
        <p>A comprehensive monitoring solution for cloud-native applications running on Kubernetes.</p>
        <h2>Tech Stack</h2>
        <ul>
          <li>React - Dashboard UI</li>
          <li>Go - Backend services</li>
          <li>Prometheus - Metrics</li>
          <li>Grafana - Visualization</li>
          <li>Kubernetes - Orchestration</li>
        </ul>
      </div>`,
    },
  },

  // 2026
  'folder-2026': {
    id: 'folder-2026',
    name: '2026',
    type: 'folder',
    parentId: 'desktop',
    children: ['project-2026-1'],
  },
  'project-2026-1': {
    id: 'project-2026-1',
    name: 'macOS Portfolio.pdf',
    type: 'file',
    parentId: 'folder-2026',
    projectData: {
      title: 'macOS Desktop Portfolio',
      description: 'This very portfolio! A macOS Sequoia desktop simulator built as an interactive portfolio website.',
      techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
      content: `<div class="pdf-content">
        <h1>macOS Desktop Portfolio</h1>
        <p class="pdf-subtitle">Interactive Portfolio - 2026</p>
        <hr />
        <h2>Overview</h2>
        <p>A high-fidelity macOS Sequoia desktop simulator serving as an interactive portfolio. Features working Finder, window management, and document viewer.</p>
        <h2>Tech Stack</h2>
        <ul>
          <li>React + TypeScript - UI Framework</li>
          <li>Vite - Build tool</li>
          <li>Tailwind CSS - Styling</li>
          <li>Framer Motion - Animations</li>
          <li>Zustand - State management</li>
          <li>react-rnd - Window management</li>
        </ul>
        <h2>Key Features</h2>
        <ul>
          <li>Pixel-perfect macOS Sequoia UI</li>
          <li>Functional Finder with file navigation</li>
          <li>Draggable, resizable windows</li>
          <li>Dock with magnification effect</li>
          <li>PDF-style project viewer</li>
        </ul>
      </div>`,
    },
  },
};
