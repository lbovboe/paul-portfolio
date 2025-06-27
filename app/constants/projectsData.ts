// Define the structure for project data
export interface Project {
  title: string;
  description: string;
  projectUrl: string;
  imageUrl: string;
  technologies?: string[];
  category: string;
  status: 'Live' | 'In Development' | 'Completed';
  gradient: string;
  accentColor: string;
}

// Array of project data with placeholder images
export const projects: Project[] = [
  {
    title: 'Ace Coding Academy',
    description:
      'An interactive educational platform designed to help students master coding skills. Features comprehensive learning paths for multiple programming languages, interactive coding challenges, detailed programming notes, and curated tech news. The platform includes progress tracking, hands-on exercises, and stays up-to-date with the latest developments in technology and programming trends. Perfect for both beginners and intermediate learners looking to enhance their coding expertise.',
    projectUrl: 'https://acecodingacademy.com',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&crop=center',
    category: 'Education Platform',
    status: 'Live',
    gradient: 'from-blue-400 via-sky-400 to-cyan-400',
    accentColor: 'blue',
    technologies: [
      'Next.js',
      'React',
      'PWA',
      'TypeScript',
      'Three.js',
      'TailwindCSS',
      'Framer Motion',
      'Node.js',
      'Prisma',
      'MongoDB',
      'S3',
      'Vercel',
    ],
  },
  {
    title: 'AI Email Generator',
    description:
      'An intelligent email generation platform powered by advanced language models and prompt engineering techniques. Users can create professional email templates for various purposes including business communications, cold outreach, customer support, and personal correspondence. The platform leverages OpenAI API integration with fine-tuned prompts to generate contextually appropriate, well-structured emails. Features include template customization, tone adjustment, multiple email categories, and instant generation capabilities for enhanced productivity.',
    projectUrl: 'https://email-generator-zeta.vercel.app/',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&crop=center',
    category: 'AI Tool',
    status: 'Live',
    gradient: 'from-purple-400 via-violet-400 to-indigo-400',
    accentColor: 'purple',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'OpenAI API',
      'Prompt Engineering',
      'TailwindCSS',
      'Node.js',
      'AI/ML',
      'LLM Integration',
      'Vercel',
    ],
  },
  {
    title: 'Pickagoo Delivery Platform',
    description:
      'A comprehensive delivery management platform featuring multi-role access (customers, drivers, admins). Includes complete order lifecycle management, SingPass integration for verification, and enterprise-level features. Key functionalities: authentication, real-time order tracking, notifications, driver-customer matching, reviews & ratings, credibility scoring system, bulk order processing via Excel, and specialized company contract management for corporate clients.',
    projectUrl: 'https://pickagoo.com',
    imageUrl:
      'https://images.unsplash.com/photo-1704652838446-edc4448d6261?q=80&w=800&h=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Delivery Platform',
    status: 'Live',
    gradient: 'from-cyan-400 via-blue-400 to-indigo-400',
    accentColor: 'cyan',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'TailwindCSS',
      'Framer Motion',
      'Node.js',
      'Prisma',
      'MongoDB',
      'Redis',
      'S3',
      'Twilio',
      'Firebase Cloud Messaging',
      'SingPass',
      'Vercel',
    ],
  },
  {
    title: '最爱小说网',
    description:
      'A free online novel reading website allowing users to read a wide range of novels. Built with Next.js, React, and TypeScript, it leverages the Cheerio JavaScript library for web scraping to aggregate and serve novel content. Hosted on Vercel, the platform provides a seamless and fast reading experience for users seeking Chinese web novels.',
    projectUrl: 'https://novel-xiaoshuo.vercel.app/',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop&crop=center',
    category: 'Novel Website',
    status: 'Live',
    gradient: 'from-cyan-400 via-blue-400 to-indigo-400',
    accentColor: 'cyan',
    technologies: [
      'Next.js',
      'React',
      'PWA',
      'TypeScript',
      'Web Scraping',
      'Cheerio',
      'Vercel',
      'TailwindCSS',
      'Framer Motion',
      'Node.js',
      'MongoDB',
    ],
  },
  {
    title: 'UI Academy',
    description:
      'A documentation site that serves as a comprehensive resource for reusable React components, animation, and utilities built with TypeScript and Tailwind CSS. Users can easily copy and paste components for rapid development. Features include pre-built customizable components, context providers, custom hooks, and utility functions, all with a TypeScript-first approach for better code quality and productivity.',
    projectUrl: 'https://ui-academy.vercel.app/',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&crop=center',
    category: 'Component Library Documentation',
    status: 'Live',
    gradient: 'from-blue-400 via-sky-400 to-cyan-400',
    accentColor: 'blue',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'TailwindCSS',
      'Framer Motion',
      'Component Library',
      'Documentation',
      'Vercel',
    ],
  },
  {
    title: 'Agentic Weather Chatbot',
    description:
      'An intelligent conversational AI system that leverages advanced language models and sophisticated prompt engineering to provide contextually aware weather information and insights. The chatbot utilizes function calling capabilities to orchestrate multiple weather APIs, tools, and services, delivering personalized responses based on user location, preferences, and historical interaction patterns. Features include multi-turn conversations, real-time weather data integration, predictive analytics for weather trends, natural language processing for complex queries, and adaptive learning from user interactions to improve response accuracy and relevance over time.',
    projectUrl: 'https://weather-chatbot-demo.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop&crop=center',
    category: 'AI Weather Assistant',
    status: 'In Development',
    gradient: 'from-indigo-400 via-blue-400 to-sky-400',
    accentColor: 'indigo',
    technologies: [
      'OpenAI API',
      'LLM Integration',
      'Prompt Engineering',
      'Function Calling',
      'Tool Orchestration',
      'Context Management',
      'TypeScript',
      'Node.js',
      'Weather APIs',
      'Natural Language Processing',
      'AI/ML',
      'Vercel',
    ],
  },
];
