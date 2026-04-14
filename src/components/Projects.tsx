import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Redesign',
    category: 'UX/UI & Frontend',
    description: 'A complete overhaul of a legacy e-commerce platform, focusing on conversion rate optimization and modern aesthetics.',
    role: 'Lead Designer & Frontend Developer. Conducted user research, wireframing, and implemented the final design in React.',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1600&auto=format&fit=crop',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 2,
    title: 'Fintech Dashboard',
    category: 'Web App',
    description: 'A complex data visualization dashboard for financial analysts.',
    role: 'Frontend Developer. Built complex D3.js charts and managed state with Redux.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    className: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 3,
    title: 'Brand Identity',
    category: 'Marketing',
    description: 'Strategic repositioning for a B2B SaaS company.',
    role: 'Marketing Strategist. Developed the core messaging and visual guidelines.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop',
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 4,
    title: 'Mobile App Concept',
    category: 'Product Design',
    description: 'An exploratory concept for a habit-tracking application.',
    role: 'Product Designer. Focused on micro-interactions and gamification.',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=800&auto=format&fit=crop',
    className: 'md:col-span-1 md:row-span-1',
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-24">
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Proof of Capability</h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold">Selected Works.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[300px]">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ProjectCard: React.FC<{ project: any }> = ({ project }) => {
  return (
    <motion.div 
      whileHover="hover"
      className={`relative group overflow-hidden rounded-2xl bg-card border border-border/50 ${project.className}`}
    >
      {/* Background Image */}
      <motion.img 
        variants={{
          hover: { scale: 1.05 }
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        src={project.image} 
        alt={project.title}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
        <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
          <span className="font-mono text-xs uppercase tracking-wider text-white/70 mb-2 block">
            {project.category}
          </span>
          <h4 className="font-display text-2xl md:text-3xl font-bold mb-2">
            {project.title}
          </h4>
          <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
            {project.description}
          </p>
          
          {/* Hidden details revealed on hover */}
          <motion.div 
            variants={{
              hover: { opacity: 1, height: 'auto', marginTop: 16 }
            }}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-white/20">
              <span className="text-xs font-bold uppercase tracking-wider text-white/60 block mb-1">Role & Process</span>
              <p className="text-sm text-white/90">{project.role}</p>
            </div>
            <button className="mt-6 flex items-center gap-2 text-sm font-medium hover:text-white/70 transition-colors">
              View Case Study <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
