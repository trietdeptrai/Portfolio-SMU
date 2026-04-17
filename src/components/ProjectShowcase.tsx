import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';

import { Project } from '../data/projects';

interface ProjectShowcaseProps {
  project: Project;
  onClose: () => void;
}

const highlightMetrics = (text: string) => {
  // Regex to match percentages (e.g., 77%, 38.5%)
  const parts = text.split(/(\d+(?:\.\d+)?%)/g);
  return parts.map((part, i) => 
    part.match(/\d+(?:\.\d+)?%/) ? (
      <span key={i} className="text-lime-400 font-bold">{part}</span>
    ) : part
  );
};

export default function ProjectShowcase({ project, onClose }: ProjectShowcaseProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
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
            className={`absolute inset-0 w-full h-full ${
              project.imageConfig?.fit === 'contain' ? 'object-contain' : 'object-cover'
            }`}
            style={{ 
              objectPosition: project.imageConfig?.position || 'center',
              transform: `scale(${project.imageConfig?.scale || 1})`
            }}
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
                <p className="text-muted-foreground mt-2">{project.year}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Tech Stack / Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tool => (
                    <span key={tool} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full border border-border/50">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {project.liveUrl && (
                <div>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/70 transition-colors group">
                    Visit Live Project <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="col-span-1 md:col-span-2 space-y-12 prose prose-invert max-w-none">
              <div>
                <h3 className="text-3xl font-display font-bold mb-6 text-foreground">Overview</h3>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-display font-bold mb-6 text-foreground">The Challenge</h3>
                <div className="bg-secondary/30 border border-border/50 p-8 rounded-2xl">
                  <p className="text-xl text-foreground italic font-display whitespace-pre-line leading-relaxed">
                    "{highlightMetrics(project.challenge)}"
                  </p>
                </div>
              </div>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="pt-8">
                  <h3 className="text-3xl font-display font-bold mb-6 text-foreground">Visuals & Process</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.gallery.map((img, idx) => (
                      <div 
                        key={idx} 
                        className="aspect-video bg-secondary/50 rounded-xl overflow-hidden relative group border border-border/50 cursor-zoom-in"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img 
                          src={img} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          alt={`${project.title} progress ${idx + 1}`} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>

    {/* Lightbox for Gallery Images — rendered via portal to escape parent stacking context */}
    {createPortal(
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-[10000] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/20 hover:scale-110"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Full view"
              className="max-w-[95vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}
