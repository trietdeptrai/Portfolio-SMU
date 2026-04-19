import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const socialLinks = [
  { name: 'Gmail', url: 'mailto:triet2one@gmail.com' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/triet-nguyen-minh' },
  { name: 'Facebook', url: 'https://www.facebook.com/bryann510/' }
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-background py-18 md:py-32">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-4 sm:px-6">
        
        {/* Navigation & Headline */}
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-32 md:flex-row md:gap-8">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="max-w-4xl"
          >
            <h2 className="mb-5 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.28em] text-muted-foreground md:mb-8 md:text-sm md:tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" /> Let's Connect
            </h2>
            <h3 className="max-w-[20rem] font-display text-[2rem] font-semibold leading-[1.08] tracking-tight md:max-w-none md:text-5xl lg:text-6xl">
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
              className="group relative flex w-full items-center justify-between border-b border-border py-4 transition-colors duration-300 hover:border-lime-500/50 md:py-8"
            >
              <span className="font-display text-[2rem] font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-lime-600 md:text-5xl lg:text-6xl dark:group-hover:text-lime-400">
                {link.name}
              </span>
              <div className="translate-x-0 opacity-70 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:-translate-x-4 md:opacity-0">
                <ArrowUpRight className="h-6 w-6 text-lime-600 md:h-10 md:w-10 dark:text-lime-400" />
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
