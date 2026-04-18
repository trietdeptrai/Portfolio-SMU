import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const socialLinks = [
  { name: 'Gmail', url: 'mailto:triet2one@gmail.com' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/triet-nguyen-minh' },
  { name: 'Facebook', url: 'https://www.facebook.com/bryann510/' }
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col">
        
        {/* Navigation & Headline */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8 mb-20 md:mb-32">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="max-w-4xl"
          >
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" /> Let's Connect
            </h2>
            <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
              If you are looking for a <span className="font-serif italic font-medium text-[#14532d] dark:text-lime-400">creative</span> and <span className="font-serif italic font-medium text-[#14532d] dark:text-lime-400">ambitious</span> candidate, I think we need to talk.
            </h3>
          </motion.div>
        </div>

        {/* Links List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col border-t border-border"
        >
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url}
              target={link.name !== 'Gmail' ? '_blank' : undefined}
              rel={link.name !== 'Gmail' ? 'noopener noreferrer' : undefined}
              className="group relative flex items-center justify-between w-full py-6 md:py-8 border-b border-border hover:border-lime-500/50 transition-colors duration-300"
            >
              <span className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors duration-300">
                {link.name}
              </span>
              <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10 text-lime-600 dark:text-lime-400" />
              </div>
            </a>
          ))}
        </motion.div>

      </div>

      {/* Subtle Glow Background */}
      <div className="absolute bottom-0 right-0 max-w-full overflow-hidden pointer-events-none -z-10">
        <div className="w-[600px] h-[600px] bg-lime-500/5 dark:bg-lime-400/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
      </div>
    </section>
  );
}
