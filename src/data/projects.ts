export interface Project {
  id: number;
  title: string;
  category: string;
  type: 'Content' | 'Coding Project';
  description: string;
  fullDescription: string;
  challenge: string;
  role: string;
  year: string;
  techStack: string[];
  liveUrl?: string;
  image: string;
  gallery: string[];
  className: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'ChronicAI',
    category: 'Full-stack app prototype',
    type: 'Coding Project',
    description: 'Context-aware patient record and care management platform for doctors and chronic disease patients.',
    fullDescription: 'ChronicAI is a comprehensive healthcare dashboard designed to bridge the gap between clinical data and patient care. Developed as an entry for a Kaggle Competition, it focuses on context-aware AI to synthesize patient history and provide actionable insights for chronic disease management.',
    challenge: "Vietnam faces a rapidly growing burden of chronic diseases, including cardiovascular disease, diabetes, and chronic respiratory conditions, which account for approximately 77% of all deaths nationwide.\n\nChronic diseases require continuous monitoring, repeated diagnostics, medication adjustments, and regular follow-ups. Yet Vietnam’s healthcare system struggles with fragmented medical data infrastructure, where patient information is scattered across disconnected sources such as hospital systems, laboratory reports, PDF documents, etc.\n\nClinicians thus lack a complete, longitudinal view of a patient’s medical history at the point of care, leading to overlooked contextual details, missed early signs of disease progression, and wasted consultation time on manual record reviews rather than treatment decisions.\n\nThis fragmentation contributes to poor disease control: for instance, only 38% of hypertensive patients and 28% of diabetics achieve target blood pressure or glycemic levels, heightening risks of complications and long-term costs. Delayed interventions, redundant testing, and inefficient follow-ups further burden providers and patients.\n\nAt its core, the issue is not a lack of data but the absence of contextual continuity. An integrated system to centralize and structure patient records into a coherent longitudinal narrative is essential for efficient, proactive chronic care.",
    role: 'Product Owner & Software Engineer',
    year: '2024',
    techStack: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Radix UI', 'FastAPI', 'LangGraph', 'SSE', 'PostgreSQL', 'pgvector', 'Supabase', 'RAG'],
    liveUrl: 'https://github.com/your-repo/chronic-ai', // Example link
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1600&auto=format&fit=crop'
    ],
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 2,
    title: 'Fintech Dashboard',
    category: 'Web App',
    type: 'Coding Project',
    description: 'A complex data visualization dashboard for financial analysts.',
    fullDescription: 'A high-performance trading and analytics dashboard built for real-time market monitoring. It features custom WebGL charts and a modular widget system for analysts to customize their workspace.',
    challenge: 'Rendering thousands of data points at 60fps in the browser while maintaining high interaction responsiveness.',
    role: 'Frontend Developer',
    year: '2023 - 2024',
    techStack: ['React', 'D3.js', 'Redux', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    gallery: [],
    className: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 3,
    title: 'Brand Identity',
    category: 'Marketing',
    type: 'Content',
    description: 'Strategic repositioning for a B2B SaaS company.',
    fullDescription: 'A full visual and verbal identity reboot for a logistics SaaS provider. This project involved deep market research, stakeholder interviews, and a complete design system rollout.',
    challenge: 'The brand felt dated and academic. We needed to transition it into a modern, tech-forward aesthetic that still communicated trust and reliability.',
    role: 'Marketing Strategist',
    year: '2023',
    techStack: ['Figma', 'Adobe Creative Suite', 'Storybook'],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop',
    gallery: [],
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 4,
    title: 'Mobile App Concept',
    category: 'Product Design',
    type: 'Coding Project',
    description: 'An exploratory concept for a habit-tracking application.',
    fullDescription: 'A minimalist habit-tracker that uses behavioral psychology to nudge users toward their goals. Features include gesture-based logging and mood-based color themes.',
    challenge: 'Creating a habit-tracker that doesn\'t feel like a "chore" list. We focused on micro-interactions and frictionless onboarding.',
    role: 'Product Designer',
    year: '2023',
    techStack: ['Flutter', 'Firebase', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=800&auto=format&fit=crop',
    gallery: [],
    className: 'md:col-span-1 md:row-span-1',
  }
];
