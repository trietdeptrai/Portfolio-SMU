import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-8">Let's Connect</h2>
            
            <a 
              href="mailto:triet2one@gmail.com"
              className="group relative inline-block"
            >
              <h3 className="font-display text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter hover:text-primary/70 transition-colors duration-300">
                triet2one<br className="md:hidden"/>@gmail.com
              </h3>
              <div className="absolute -right-4 -top-4 md:-right-8 md:-top-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300">
                <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 text-primary/50" />
              </div>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24 flex flex-col md:flex-row items-center gap-8 text-muted-foreground"
          >
            <p className="font-serif italic text-xl">
              "Strategy without execution is hallucination."
            </p>
            <div className="hidden md:block w-12 h-px bg-border" />
            <div className="flex gap-6 font-mono text-sm uppercase tracking-wider">
              <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors">Resume</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
    </section>
  );
}
