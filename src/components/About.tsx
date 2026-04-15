import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';

type Chapter = {
  id: string;
  title: string;
  summary: string;
  content: string;
  caption: string;
  image: string;
  imageAlt: string;
};

const chapters: Chapter[] = [
  {
    id: '01',
    title: 'Marketing & Education',
    summary: 'Graduated first class (GPA 4.0) with a degree in Marketing Management from Staffordshire University. During my study, I worked as a marketer and content-creator in the educational space. t multiple reknowned education-related companies, such as Alpha Books (one of the leading book publishers in Vietnam), Spiderum (a media agency with over 1 million followers on social media), and the U.S. Embassy in Hanoi.',
    content:
      'My journey began in the world of marketing and education. I learned to understand audiences, craft narratives, and create momentum around ideas. That foundation taught me how to communicate with clarity, but it also made me want to move beyond strategy and start building the products behind the message.',
    caption: 'Classrooms, campaigns, and the discipline of making ideas resonate.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'People collaborating around a table in a workshop setting.',
  },
  {
    id: '02',
    title: 'The Coding Journey',
    summary: 'Then I shifted from explaining digital products to creating them line by line.',
    content:
      'I dove into code. What started as curiosity became a real commitment to building. I learned to translate business logic into systems, user needs into interfaces, and rough ideas into working experiences. The transition felt natural: the storyteller in me stayed, but now it had tools to turn intention into execution.',
    caption: 'From curiosity to prototypes, interfaces, and working systems.',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'A developer working at a laptop with code on screen.',
  },
  {
    id: '03',
    title: 'The Future',
    summary: 'Now I want to deepen the technical side of that bridge and grow into product leadership.',
    content:
      "Now, I stand at the intersection of strategy and execution. Applying for SMU's MITB AI track feels like the right next step because it sharpens both how I think and how I build. I want to combine my background in communication, education, and product thinking with stronger technical depth so I can lead teams and create meaningful digital experiences.",
    caption: 'A more intentional path toward AI, product thinking, and technical leadership.',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Students walking through a bright campus courtyard.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mb-20 max-w-4xl md:mb-28">
          <h2 className="mb-8 font-display text-4xl font-bold text-foreground md:text-5xl lg:text-7xl">
            <TypewriterHook text="Hello, I'm Triet." />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 1 }}
            className="max-w-3xl font-serif text-xl leading-relaxed text-muted-foreground md:text-3xl md:leading-normal"
          >
            An <span className="italic text-foreground">educator, marketer & builder</span> aspiring to
            attend SMU&apos;s MITB AI track. Below is the story of how I ended up here.
          </motion.p>
        </div>

        <div className="grid gap-16 md:grid-cols-[280px_minmax(0,1fr)] md:gap-20">
          <aside className="md:sticky md:top-28 h-fit">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
              The Narrative
            </p>
            <h3 className="max-w-xs font-display text-4xl font-bold leading-none md:text-5xl">
              Evolution of a Builder.
            </h3>
            <p className="mt-6 max-w-xs text-sm leading-6 text-muted-foreground">
              A three-part editorial chapter layout. The journey stays vertical so each step has room to land.
            </p>

            <div className="mt-10 border-l border-border/70 pl-5">
              {chapters.map((chapter) => (
                <div key={chapter.id} className="mb-7 last:mb-0">
                  <p className="font-mono text-xs text-muted-foreground">{chapter.id}</p>
                  <p className="mt-1 font-display text-lg leading-tight">{chapter.title}</p>
                </div>
              ))}
            </div>
          </aside>

          <div className="space-y-20 md:space-y-28">
            {chapters.map((chapter, index) => (
              <ChapterBlock key={chapter.id} chapter={chapter} reverse={index % 2 === 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const ChapterBlock: React.FC<{ chapter: Chapter; reverse?: boolean }> = ({ chapter, reverse = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 35%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0.35, 1, 1, 0.55]);
  const y = useTransform(scrollYProgress, [0, 1], [48, -24]);
  const imageScale = useTransform(scrollYProgress, [0, 0.55, 1], [1.08, 1, 0.98]);

  return (
    <motion.article
      ref={ref}
      style={{ opacity, y }}
      className="border-t border-border/60 pt-10 md:pt-12"
    >
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className={`space-y-6 md:col-span-5 ${reverse ? 'md:order-2' : ''}`}>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-muted-foreground">{chapter.id}</span>
            <div className="h-px flex-1 bg-border/70" />
          </div>

          <div>
            <p className="max-w-sm font-mono text-xs uppercase leading-5 tracking-[0.24em] text-muted-foreground">
              {chapter.summary}
            </p>
            <h4 className="mt-4 max-w-md font-display text-3xl font-semibold leading-none md:text-5xl">
              {chapter.title}
            </h4>
          </div>

          <p className="max-w-xl font-serif text-xl leading-relaxed text-foreground/88 md:text-2xl">
            {chapter.content}
          </p>
        </div>

        <figure className={`md:col-span-7 ${reverse ? 'md:order-1' : ''}`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-secondary/40">
            <motion.img
              src={chapter.image}
              alt={chapter.imageAlt}
              referrerPolicy="no-referrer"
              style={{ scale: imageScale }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/30 via-transparent to-transparent" />
          </div>
          <figcaption className="mt-4 max-w-lg border-t border-border/60 pt-4 text-sm leading-6 text-muted-foreground">
            {chapter.caption}
          </figcaption>
        </figure>
      </div>
    </motion.article>
  );
};

const TypewriterHook = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowCursor(false), 1200);
      }
    }, 60);

    return () => clearInterval(typingInterval);
  }, [isInView, text]);

  return (
    <span ref={ref} className="relative inline-block">
      {displayText}
      <span className="invisible absolute left-0 top-0 select-none">{text}</span>
      <motion.span
        animate={showCursor ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ repeat: showCursor ? Infinity : 0, duration: 0.8, ease: 'linear' }}
        className="ml-2 inline-block h-[0.9em] w-[4px] translate-y-1 bg-primary"
        style={{ display: showCursor ? 'inline-block' : 'none' }}
      />
    </span>
  );
};
