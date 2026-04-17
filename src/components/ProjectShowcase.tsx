import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';

interface ProjectShowcaseProps {
  project: any;
  onClose: () => void;
}

export default function ProjectShowcase({ project, onClose }: ProjectShowcaseProps) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-md p-0 md:p-12 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        layoutId={`project-card-${project.id}`}
        className="w-full max-w-6xl min-h-screen md:min-h-[90vh] bg-background md:rounded-3xl overflow-hidden relative shadow-2xl flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all border border-white/10 hover:scale-110"
        >
          <X size={24} />
        </button>

        {/* Hero Section */}
        <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden shrink-0">
          <motion.img 
            layoutId={`project-image-${project.id}`}
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-100" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col justify-end">
            <span 
              className="text-white/70 font-mono text-sm uppercase tracking-widest mb-4 block"
            >
              {project.category}
            </span>
            <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              {project.title}
            </h2>
            
            {project.type && (
               <span className="px-4 py-2 w-max text-xs font-mono font-bold rounded-full bg-lime-400 text-black border border-lime-400/50 uppercase tracking-[0.15em] shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                 {project.type}
               </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="px-8 py-16 md:px-16 md:py-24 bg-background grow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            
            {/* Sidebar Data */}
            <div className="col-span-1 space-y-12">
              <div>
                <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Role & Process</h4>
                <p className="text-foreground font-medium">{project.role}</p>
                <p className="text-muted-foreground mt-2">2023 - 2024</p>
              </div>
              
              <div>
                <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Tech Stack / Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Framer Motion', 'Figma', 'Tailwind'].map(tool => (
                    <span key={tool} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full border border-border/50">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/70 transition-colors group">
                  Visit Live Project <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-1 md:col-span-2 space-y-12 prose prose-invert max-w-none">
              <div>
                <h3 className="text-3xl font-display font-bold mb-6 text-foreground">Overview</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.description} This dedicated case study page provides a deeper look at the challenge, the architectural decisions, and the metrics that defined success.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                  By applying rigorous user-centric design principles and pairing them with robust front-end architecture, the final product exceeded expectations. <strong className="text-foreground border-b border-lime-400 pb-1">(Note: This is dummy content. You can fully customize this layout directly inside <code className="bg-secondary px-1 text-sm rounded">src/components/ProjectShowcase.tsx</code>)</strong>
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-display font-bold mb-6 text-foreground">The Challenge</h3>
                <div className="bg-secondary/30 border border-border/50 p-8 rounded-2xl">
                  <p className="text-xl text-foreground italic font-display">
                    "How might we design a seamlessly engaging experience while maintaining complex data fidelity and high performance?"
                  </p>
                </div>
              </div>

              {/* Mock Gallery */}
              <div className="pt-8">
                <h3 className="text-3xl font-display font-bold mb-6 text-foreground">Visuals & Process</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="aspect-video bg-secondary/50 rounded-xl overflow-hidden relative group border border-border/50">
                      <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Process" />
                   </div>
                   <div className="aspect-video bg-secondary/50 rounded-xl overflow-hidden relative group border border-border/50">
                      <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Code" />
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
