import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const chapters = [
  {
    id: '01',
    title: 'Marketing & Education',
    content: 'My journey began in the world of marketing. I learned to understand audiences, craft narratives, and drive engagement. But I realized that strategy without execution is just an idea. I wanted to build the platforms I was marketing.',
    style: 'font-serif text-2xl md:text-3xl leading-relaxed',
  },
  {
    id: '02',
    title: 'The Coding Journey',
    content: 'I dove into code. What started as a curiosity became an obsession. I learned to translate business logic into algorithms, and user needs into interfaces. It was a shift from talking about digital products to actually creating them.',
    style: 'font-mono text-lg md:text-xl leading-relaxed',
  },
  {
    id: '03',
    title: 'The Future',
    content: 'Now, I stand at the intersection of both worlds. Applying for the Master of IT in Business at SMU is the next step. I aim to leverage my dual background to lead technical teams and build products that are both strategically sound and technically robust.',
    style: 'font-sans text-2xl md:text-4xl font-medium leading-tight tracking-tight',
  }
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" ref={containerRef} className="relative bg-background">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          
          {/* Sticky Header */}
          <div className="md:w-1/3 md:sticky md:top-32 h-fit">
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">The Narrative</h2>
            <h3 className="font-display text-4xl md:text-5xl font-bold">Evolution of <br/>a Builder.</h3>
          </div>

          {/* Scrolling Content */}
          <div className="md:w-2/3 flex flex-col gap-32 md:gap-64 py-12 md:py-32">
            {chapters.map((chapter, index) => (
              <Chapter key={chapter.id} chapter={chapter} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

const Chapter: React.FC<{ chapter: any, index: number }> = ({ chapter, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-mono text-sm text-muted-foreground">{chapter.id}</span>
        <h4 className="font-display text-2xl font-semibold">{chapter.title}</h4>
      </div>
      <p className={`${chapter.style} text-foreground/90`}>
        {chapter.content}
      </p>
    </motion.div>
  );
}
