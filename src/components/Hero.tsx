import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row overflow-hidden pt-16 md:pt-0">
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0 bg-background">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-100"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-background/50 dark:bg-background/60" />
        <div className="absolute inset-0 bg-linear-to-b from-background/10 via-transparent to-background/90" />
      </div>

      {/* Left: Business / Marketing */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex-1 relative z-10 flex flex-col justify-center items-center md:items-end text-center md:text-right p-8 md:p-16 lg:p-24 border-b md:border-b-0 md:border-r border-border/50 transition-colors hover:bg-background/10"
      >
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6">
          Educator & <br />
          <span className="italic text-muted-foreground">Story-teller.</span>
        </h1>
        <p className="text-lg max-w-md text-muted-foreground">
          I had an education and marketing background. 10M+ views on social media and two-times TEDx speaker.
        </p>
      </motion.div>

      {/* Right: Technical / Coding */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="flex-1 relative z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left p-8 md:p-16 lg:p-24 transition-colors hover:bg-background/10"
      >
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tighter">
          Digital <br />
          <span className="text-primary/70">Builder_</span>
        </h1>
        <p className="max-w-md text-muted-foreground font-mono text-sm">
          &gt; Now, I'm transitioning into a builder, still with a focus on Education. <br />
          &gt; Utilizing my marketing mindset and educational knowledge to create meaningful digital experiences.
        </p>
      </motion.div>

      {/* Center element bridging them */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8, type: 'spring' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-24 h-24 rounded-full bg-background border border-border shadow-xl"
      >
        <span className="font-display font-bold text-xl">&amp;</span>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-linear-to-b from-muted-foreground to-transparent"
        />
      </motion.div>

    </section>
  );
}
