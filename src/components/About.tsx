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
      'I thought I could change how millions of Vietnamese learn through educational content.',
      'I reached millions. But I could not respond to confusion or meet learners where they were.',
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
      'So I turned to AI and software.',
      'Personalization at scale is not a content problem. It is a systems problem.',
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
      'Now I am trying to learn how to design adaptive systems that not only personalize learning, but continuously improve from user interaction.',
      'SMU MITB (AI Track) is where I learn to make it real.',
    ],
    hasSpline: true,
    closing: 'Adaptive learning has to become real, measurable, and durable.',
  },
];

const spanClassMap: Record<NonNullable<EvidenceTile['span']>, string> = {
  sm: 'md:col-span-4',
  md: 'md:col-span-6',
  lg: 'md:col-span-8',
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
            className={`max-w-4xl font-display text-[2.55rem] font-bold leading-[0.94] tracking-tight md:text-[4.6rem] ${
              isAccent ? 'text-lime-400' : isLight ? 'text-black' : 'text-white'
            }`}
          >
            {phase.opening[0]}
          </h3>

          {phase.opening[1] ? (
            <p
              className={`mt-7 max-w-3xl text-lg leading-tight md:text-[2rem] ${
                isLight ? 'text-black/62' : 'text-white/58'
              }`}
            >
              {phase.opening[1]}
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

            {phase.evidence?.length ? <EvidenceGrid tiles={phase.evidence} theme={phase.theme} /> : null}
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

const EvidenceGrid = ({ tiles, theme }: { tiles: EvidenceTile[]; theme: PhaseTheme }) => {
  return (
    <div className="mt-5 grid gap-3 md:grid-cols-12">
      {tiles.map((tile) => (
        <EvidenceTileCard key={tile.title} tile={tile} theme={theme} />
      ))}
    </div>
  );
};

const EvidenceTileCard = ({ tile, theme }: { tile: EvidenceTile; theme: PhaseTheme }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.015, 1, 0.99]);
  const darkCard = theme !== 'light';

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className={`${spanClassMap[tile.span ?? 'sm']} min-h-40 border p-5 transition-colors duration-300 hover:translate-y-[-1px] ${
        darkCard
          ? 'border-white/10 bg-white/[0.035] hover:border-white/18'
          : 'border-black/10 bg-black/[0.025] hover:border-black/18'
      }`}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className={`font-mono text-[10px] uppercase tracking-[0.24em] ${darkCard ? 'text-white/45' : 'text-black/42'}`}>
            Placeholder
          </span>
          <span className={`h-2 w-2 rounded-full ${theme === 'accent' ? 'bg-lime-400' : darkCard ? 'bg-white/50' : 'bg-black/45'}`} />
        </div>

        <div className="mt-8">
          <p className={`font-display text-xl leading-none md:text-2xl ${darkCard ? 'text-white' : 'text-black'}`}>{tile.title}</p>
          {tile.meta ? (
            <p className={`mt-3 text-sm leading-6 ${darkCard ? 'text-white/55' : 'text-black/52'}`}>{tile.meta}</p>
          ) : null}
        </div>
      </div>
    </motion.div>
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
