import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'motion/react';

type EvidenceTile = {
  title: string;
  meta?: string;
  span?: 'sm' | 'md' | 'lg';
};

type ProjectCard = {
  title: string;
  description: string;
  tag?: string;
};

type PhaseTheme = 'dark' | 'accent' | 'light';

type Phase = {
  id: string;
  navTitle: string;
  kicker: string;
  opening: string[];
  closing: string;
  theme: PhaseTheme;
  evidenceTitle?: string;
  evidence?: EvidenceTile[];
  projects?: ProjectCard[];
  hasSpline?: boolean;
};

const phases: Phase[] = [
  {
    id: '01',
    navTitle: 'Content & Education',
    kicker: 'PHASE /01',
    theme: 'dark',
    opening: [
      'I thought I could change how\nmillions of Vietnamese learn\nthrough educational content.',
      'I reached millions. But I could not respond to\nconfusion or meet learners where they were.',
    ],
    evidenceTitle: 'Visual Evidence',
    evidence: [
      { title: 'Video Thumbnails', meta: '10M+ total views', span: 'lg' },
      { title: 'TEDx Stage 01', meta: 'Image placeholder', span: 'sm' },
      { title: 'TEDx Stage 02', meta: 'Image placeholder', span: 'sm' },
      { title: 'U.S. Embassy Workshops', meta: 'Image placeholder', span: 'md' },
      { title: 'Red Pencil Club', meta: 'Image placeholder', span: 'sm' },
      { title: 'Award', meta: 'Image placeholder', span: 'sm' },
    ],
    closing: 'I could capture attention at scale. I could not personalize learning.',
  },
  {
    id: '02',
    navTitle: 'AI & Systems',
    kicker: 'PHASE /02',
    theme: 'accent',
    opening: [
      'So I turned to AI\nand software.',
      'Personalization at scale is\nnot a content problem.\nIt is a systems problem.',
    ],
    evidenceTitle: 'Signals of the Shift',
    evidence: [
      { title: 'LLM Research Article', meta: '300k views', span: 'md' },
      { title: 'VietAI Certification', meta: 'Top 2', span: 'sm' },
      { title: 'AI Meetup Facilitator', meta: 'Image placeholder', span: 'sm' },
    ],
    projects: [
      { title: 'Tutor Loop', description: 'Adaptive lesson flow for live learner feedback.', tag: 'prototype' },
      { title: 'Prompt Audit', description: 'Structured evaluation for model behavior drift.', tag: 'experiment' },
      { title: 'Knowledge Relay', description: 'Retrieval pipeline for grounded answers.', tag: 'system attempt' },
      { title: 'Study Signals', description: 'Interaction tracking for weak-point detection.' },
      { title: 'Feedback Engine', description: 'Iteration loop for response quality.', tag: 'prototype' },
    ],
    closing: 'I could build working prototypes. But I could not build systems that scale.',
  },
  {
    id: '03',
    navTitle: 'Adaptive Learning Systems',
    kicker: 'PHASE /03',
    theme: 'light',
    opening: [
      'Now I am trying to learn how\nto design adaptive systems that\nnot only personalize learning,\nbut continuously improve from\nuser interaction.',
      'SMU MITB (AI Track) is where\nI learn to make it real.',
    ],
    hasSpline: true,
    closing: 'Adaptive learning has to become real, measurable, and durable.',
  },
];

const widthClassMap: Record<NonNullable<EvidenceTile['span']>, string> = {
  sm: 'w-[260px] md:w-[300px]',
  md: 'w-[300px] md:w-[420px]',
  lg: 'w-[360px] md:w-[500px]',
};

const SPLINE_SCENE_URL = 'https://prod.spline.design/qB9mWdZXwu51oQKR/scene.splinecode';

export default function About() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activePhase, setActivePhase] = useState(phases[0].id);

  useEffect(() => {
    const elements = phases
      .map((phase) => sectionRefs.current[phase.id])
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target) {
          setActivePhase(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-18% 0px -42% 0px',
        threshold: [0.2, 0.35, 0.55, 0.75],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-[240px_minmax(0,1fr)] md:gap-16">
        <aside className="h-fit md:sticky md:top-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-muted-foreground">The Narrative</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-none text-foreground md:text-4xl">
            My Story
          </h2>
          <p className="mt-5 max-w-[15rem] text-sm leading-6 text-muted-foreground">
            A three-phase journey of solving one problem
          </p>

          <nav className="mt-10 space-y-5 border-l border-border/80 pl-4" aria-label="About phases">
            {phases.map((phase) => {
              const isActive = phase.id === activePhase;

              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() =>
                    sectionRefs.current[phase.id]?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }
                  className="group flex w-full items-start gap-3 text-left"
                >
                  <span
                    className={`mt-[6px] h-2.5 w-2.5 rounded-full border transition-colors duration-300 ${
                      isActive ? 'border-lime-400 bg-lime-400' : 'border-border bg-transparent group-hover:border-foreground/50'
                    }`}
                  />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{phase.id}</p>
                    <p
                      className={`mt-1 font-display text-base leading-tight transition-colors duration-300 ${
                        isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                      }`}
                    >
                      {phase.navTitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="space-y-8 md:space-y-10">
          {phases.map((phase) => (
            <PhasePanel
              key={phase.id}
              phase={phase}
              setRef={(node) => {
                sectionRefs.current[phase.id] = node;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const PhasePanel = ({ phase, setRef }: { phase: Phase; setRef: (node: HTMLElement | null) => void }) => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 35%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.45, 1, 1, 0.72]);
  const y = useTransform(scrollYProgress, [0, 1], [38, -12]);

  useEffect(() => {
    setRef(ref.current);
  }, [setRef]);

  const isLight = phase.theme === 'light';
  const isAccent = phase.theme === 'accent';

  return (
    <motion.article
      id={phase.id}
      ref={ref}
      style={{ opacity, y }}
      className={`relative overflow-hidden border ${
        isLight
          ? 'border-black/10 bg-[#f5f1ea] text-black'
          : 'border-white/10 bg-[#101010] text-white'
      }`}
    >
      <div className={`absolute inset-0 ${isLight ? 'bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_60%)]' : 'bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]'}`} />
      <div className={`relative px-6 py-8 md:px-10 md:py-10 ${phase.hasSpline ? 'pb-6 md:pb-8' : 'pb-8 md:pb-10'}`}>
        <div className="flex items-start justify-between gap-6">
          <span
            className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] ${
              isLight
                ? 'border-black/15 text-black/70'
                : 'border-white/12 text-white/72'
            }`}
          >
            {phase.kicker}
          </span>
          <span
            className={`mt-1 h-3.5 w-3.5 rounded-full ${
              isAccent ? 'bg-lime-400' : isLight ? 'bg-black/55' : 'bg-white/72'
            }`}
          />
        </div>

        <div className="mt-14 max-w-5xl">
          <h3
            className={`max-w-4xl font-display text-3xl font-semibold leading-[1.1] tracking-[-0.01em] md:text-5xl ${
              isAccent ? 'text-lime-400' : isLight ? 'text-black' : 'text-white'
            }`}
          >
            {phase.opening[0].split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i !== phase.opening[0].split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h3>

          {phase.opening[1] ? (
            <p
              className={`mt-6 max-w-3xl text-base leading-snug md:text-xl ${
                isLight ? 'text-black/62' : 'text-white/58'
              }`}
            >
              {phase.opening[1].split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i !== phase.opening[1].split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          ) : null}
        </div>

        {phase.evidence?.length || phase.projects?.length ? (
          <div className="mt-12">
            {phase.evidenceTitle ? (
              <p className={`${isLight ? 'text-black/55' : 'text-white/50'} font-mono text-[11px] uppercase tracking-[0.24em]`}>
                {phase.evidenceTitle}
              </p>
            ) : null}

            {phase.evidence?.length ? <EvidenceMarquee tiles={phase.evidence} theme={phase.theme} /> : null}
            {phase.projects?.length ? <ProjectGrid projects={phase.projects} /> : null}
          </div>
        ) : null}

        {phase.hasSpline ? <SplinePanel /> : null}

        <div className={`mt-12 border-t ${isLight ? 'border-black/10' : 'border-white/10'} pt-5`}>
          <p className={`max-w-3xl text-base md:text-[1.05rem] ${isLight ? 'text-black/65' : 'text-white/62'}`}>
            {phase.closing}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

const EvidenceMarquee = ({ tiles, theme }: { tiles: EvidenceTile[]; theme: PhaseTheme }) => {
  // Duplicate tiles to ensure seamless infinite scroll
  // Four copies guarantee it covers ultra-wide screens even if the original array is short
  const marqueeTiles = [...tiles, ...tiles, ...tiles, ...tiles];

  return (
    <div 
      className="mt-6 flex overflow-hidden" 
      style={{ 
        maskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)'
      }}
    >
      <div className="flex w-max flex-nowrap gap-3 pr-3 pt-1 pb-1 hover:[animation-play-state:paused] animate-marquee">
        {marqueeTiles.map((tile, idx) => (
          <EvidenceTileCard key={`${tile.title}-${idx}`} tile={tile} theme={theme} />
        ))}
      </div>
    </div>
  );
};

const EvidenceTileCard = ({ tile, theme }: { tile: EvidenceTile; theme: PhaseTheme }) => {
  const darkCard = theme !== 'light';

  return (
    <div
      className={`${widthClassMap[tile.span ?? 'sm']} shrink-0 flex flex-col justify-between min-h-40 border p-5 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg ${
        darkCard
          ? 'border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.05] shadow-black/50'
          : 'border-black/10 bg-black/[0.025] hover:border-black/20 hover:bg-black/[0.05] shadow-black/5'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`font-mono text-[10px] uppercase tracking-[0.24em] ${darkCard ? 'text-white/45' : 'text-black/42'}`}>
          Evidence
        </span>
        <span className={`h-2 w-2 rounded-full ${theme === 'accent' ? 'bg-lime-400' : darkCard ? 'bg-white/50' : 'bg-black/45'}`} />
      </div>

      <div className="mt-8 select-none">
        <p className={`font-display text-xl leading-none md:text-2xl ${darkCard ? 'text-white' : 'text-black'}`}>{tile.title}</p>
        {tile.meta ? (
          <p className={`mt-3 text-sm leading-6 ${darkCard ? 'text-white/55' : 'text-black/52'}`}>{tile.meta}</p>
        ) : null}
      </div>
    </div>
  );
};

const ProjectGrid = ({ projects }: { projects: ProjectCard[] }) => {
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      {projects.map((project) => (
        <article
          key={project.title}
          className="min-h-44 border border-white/10 bg-black/20 p-4 transition-colors duration-300 hover:border-lime-400/40"
        >
          {project.tag ? (
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/42">{project.tag}</p>
          ) : null}
          <h4 className="mt-3 font-display text-xl leading-none text-white">{project.title}</h4>
          <p className="mt-5 text-sm leading-6 text-white/55">{project.description}</p>
        </article>
      ))}
    </div>
  );
};

const SplinePanel = () => {
  return (
    <div className="mt-12 overflow-hidden border border-black/10 bg-white/55">
      <div className="flex items-center justify-between border-b border-black/10 px-5 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-black/52">System Diagram</p>
        <p className="text-sm text-black/45">Interactive 3D</p>
      </div>
      <div className="h-[360px] w-full md:h-[500px]">
        <Spline scene={SPLINE_SCENE_URL} className="h-full w-full" />
      </div>
    </div>
  );
};
