import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

export default function Navbar({ isDark, toggleDark }: { isDark: boolean; toggleDark: () => void }) {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="font-display font-bold text-xl tracking-tighter">
        MT.
      </div>
      
      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#about" className="hover:text-primary/70 transition-colors">About</a>
          <a href="#projects" className="hover:text-primary/70 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-primary/70 transition-colors">Contact</a>
        </div>
        
        <button 
          onClick={toggleDark}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </motion.nav>
  );
}
