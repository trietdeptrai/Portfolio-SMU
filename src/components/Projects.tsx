import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import ProjectShowcase from './ProjectShowcase';

import { projects } from '../data/projects';

export default function Projects() {
  const [activeProject, setActiveProject] = useState<any>(null);

  return (
    <section id="projects" className="py-24 md:py-32 bg-secondary/30 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-24">
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Proof of Capability</h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold">Selected Works.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[300px]">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => setActiveProject(project)} />
          ))}
        </div>
      </div>

      {/* Craftsmanship Banner */}
      <div className="max-w-7xl mx-auto px-6 mt-24 md:mt-32 pb-8 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative group overflow-hidden rounded-2xl bg-card border border-border/50 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 hover:border-lime-400/20 transition-colors duration-500"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 dark:from-lime-400/5 via-transparent to-black/5 dark:to-black/20 opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute -top-32 right-0 w-96 h-96 bg-lime-500/10 dark:bg-lime-400/15 blur-[120px] rounded-full translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] dark:opacity-[0.02] mix-blend-overlay" />

          {/* Left Content */}
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex flex-col mb-6">
              <span className="text-lime-600 dark:text-lime-400 font-mono text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-500 dark:bg-lime-400 animate-pulse shadow-[0_0_10px_rgba(132,204,22,0.4)] dark:shadow-[0_0_10px_rgba(163,230,53,0.8)]" />
                Proof of Capability
              </span>
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
                And<br className="hidden md:block" /> One more thing.
              </h3>
            </div>

            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl">
              You might not know this, but I build this entire portfolio myself (with the support of Antigravity). Hope you find it beautiful, I put a lot of effort into it.
            </p>
          </div>

          {/* Right Content / Tech Stack */}
          <div className="relative z-10 w-full md:w-auto flex flex-col font-mono text-[11px] sm:text-xs text-muted-foreground/80 space-y-4 md:space-y-6 pt-6 md:pt-0 border-t border-border/50 md:border-none">
            <div className="flex items-center gap-4 cursor-default transition-colors hover:text-lime-600 dark:hover:text-lime-400">
              <span className="w-6 text-right opacity-50 block">01</span>
              <div className="h-px w-6 bg-current opacity-20" />
              <span className="font-medium tracking-widest uppercase">React & TypeScript</span>
            </div>
            <div className="flex items-center gap-4 cursor-default transition-colors hover:text-cyan-600 dark:hover:text-cyan-400">
              <span className="w-6 text-right opacity-50 block">02</span>
              <div className="h-px w-6 bg-current opacity-20" />
              <span className="font-medium tracking-widest uppercase">Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-4 cursor-default transition-colors hover:text-purple-600 dark:hover:text-purple-400">
              <span className="w-6 text-right opacity-50 block">03</span>
              <div className="h-px w-6 bg-current opacity-20" />
              <span className="font-medium tracking-widest uppercase">Framer Motion</span>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectShowcase
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

const ProjectCard: React.FC<{ project: any; onClick: () => void }> = ({ project, onClick }) => {
  return (
    <motion.div
      layoutId={`project-card-${project.id}`}
      whileHover="hover"
      onClick={onClick}
      className={`relative group overflow-hidden rounded-2xl bg-card border border-border/50 cursor-pointer ${project.className}`}
    >
      {/* Background Image */}
      <motion.img
        layoutId={`project-image-${project.id}`}
        variants={{
          hover: { scale: (project.imageConfig?.scale || 1) * 1.05 }
        }}
        initial={{ scale: project.imageConfig?.scale || 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        src={project.image}
        alt={project.title}
        referrerPolicy="no-referrer"
        className={`absolute inset-0 w-full h-full ${project.imageConfig?.fit === 'contain' ? 'object-contain' : 'object-cover'
          }`}
        style={{ objectPosition: project.imageConfig?.position || 'center' }}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${project.imageConfig?.overlayStrength === 'strong'
          ? 'from-black/95 via-black/80 to-black/40 opacity-95'
          : 'from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90'
          }`}
      />

      {/* Type Tag */}
      {project.type && (
        <div className="absolute top-4 right-4 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1]">
          <span className="px-3 py-1.5 text-[10px] font-mono font-bold rounded-full bg-lime-400 text-black border border-lime-400/50 uppercase tracking-[0.15em] shadow-[0_0_20px_rgba(163,230,53,0.3)]">
            {project.type}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
        <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
          <span className="inline-flex px-2 py-1 rounded-md bg-black/40 backdrop-blur-md text-[10px] font-mono font-medium text-white/90 uppercase tracking-widest border border-white/5 mb-3">
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
