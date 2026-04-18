import React, { useCallback, useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useAnimationFrame, useScroll, useTransform, useInView } from 'motion/react';
import { GitHubCalendar } from 'react-github-calendar';

type EvidenceTile = {
  title: string;
  meta?: string;
  span?: 'sm' | 'md' | 'lg';
  image?: string;
};

type ProjectCard = {
  title: string;
  description: string;
  tag?: string;
  image?: string;
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
  projectsTitle?: string;
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
      { title: 'Content Creation', meta: '1.5M + views (and many more 100k+ posts)', span: 'lg', image: 'assets/phase1/1.5M.png' },
      { title: 'TEDx Stage 01', meta: 'I talked about three steps to accept our dark side, taken from my own experiences', span: 'sm', image: 'assets/phase1/TEDx.jpg' },
      { title: 'TEDx Stage 02', meta: 'I talked about the connection between authenticity and learning science, and how being authentic can also make you a better learner', span: 'sm', image: 'assets/phase1/TEDx2.jpg' },
      { title: 'U.S. Embassy Workshops: Hero Journey', meta: 'I talked about the concept of Hero Journey and how it can be used to understand and overcome challenges in our lives', span: 'md', image: 'assets/phase1/US.jpg' },
      { title: 'U.S. Embassy Workshops: Lessons from Benjamin Franklin', meta: 'I talked about three topics: Benjamin Franklin\'s 13 virtues, how he learned, and how he created a great network', span: 'sm', image: 'assets/phase1/Benjamin.jpg' },
      { title: 'BUV Learning and Relearning award 2024', meta: 'I was awarđe the Learning and Relearning award for my contribution to the academic culture at BUV', span: 'sm', image: 'assets/phase1/Award.jpg' },
    ],
    closing: 'I could not personalize learning.',
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
    evidenceTitle: 'Signals of the Shift (see the projects section for more detail)',
    evidence: [
      { title: 'Youtube video about Large Language Models', meta: '300k views (most-viewed video in Vietnamese about LLM)', span: 'md', image: 'assets/phase2/LLM.png' },
      { title: 'VietAI Certification - Foundation of Machine Learning', meta: 'Graduated with distinction, top 2 of the whole cohort, certified by Dr Thang Luong (Director of research at Google Deepmind)', span: 'sm', image: 'assets/phase2/VietAI.png' },
      { title: 'AI & Deep Learning Meetup Facilitator', meta: 'Facilitated one of the biggest AI meetup in Danang, shared my lessons and (more importantly) learned from other builders', span: 'sm', image: 'assets/phase2/MeetUp.jpg' },
      { title: 'AI & Deep Learning Meetup Hackathon winner', meta: 'Won 1st place in the AI & Deep Learning Meetup Hackathon, built a prototype of an form analyzer that gives feedback to users based on their workout videos', span: 'sm', image: 'assets/phase2/Hackathon.jpg' },
      { title: 'Python Developer Certification - FreeCodeCamp', meta: 'Completed 100% of the curriculum, built 5 projects, and earned the certification', span: 'sm', image: 'assets/phase2/FreeCodeCamp.png' },
    ],
    projectsTitle: 'Applied Prototypes',
    projects: [
      { title: 'Chronic AI', description: 'Context-aware patient record and care management platform for chronic disease patients', tag: 'prototype', image: 'assets/projects/ChronicAI.png' },
      { title: 'SafeForm AI', description: 'AI-powered form analyzer that gives feedback to users based on their workout videos', tag: 'prototype', image: 'assets/projects/SafeFormAI.png' },
      { title: 'Vietnamese Voice Forge', description: 'Vietnamese Style paraphrasing (Modern Vietnamese to Ancient Vietnamese and Modern Vietnamese to local Vietnamese)', tag: 'NLP practice project', image: 'assets/projects/NLP.png' },
      { title: 'Study with Triet', description: 'an aesthetic pomodoro website', tag: 'web app', image: 'assets/projects/StudyWithTriet.png' },
      { title: 'Xgboost-houseprice-predictor', description: 'Predicting house prices using XGBoost', tag: 'ML practice project', image: 'assets/projects/XGboost.png' },
    ],
    closing: 'I could build working prototypes. But I could not build systems that scale.',
  },
  {
    id: '03',
    navTitle: 'Adaptive Learning Systems',
    kicker: 'PHASE /03',
    theme: 'light',
    opening: [
      'Building adaptive learning systems.\nBuilding scalable systems for millions of users.',
      'SMU MITB (AI Track) is where I learn to make it real.',
    ],
    hasSpline: true,
    closing: '',
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
            <TypewriterHook text="Hello, I'm Triet." />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-5 max-w-[15rem] text-sm leading-6 text-muted-foreground"
          >
            An <span className="italic text-foreground">educator, marketer & builder</span> aspiring to
            attend SMU&apos;s MITB AI track. Below is the story of how I got here.
          </motion.p>

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
                    className={`mt-[6px] h-2.5 w-2.5 rounded-full border transition-colors duration-300 ${isActive ? 'border-lime-400 bg-lime-400' : 'border-border bg-transparent group-hover:border-foreground/50'
                      }`}
                  />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{phase.id}</p>
                    <p
                      className={`mt-1 font-display text-base leading-tight transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
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
            <React.Fragment key={phase.id}>
              <PhasePanel
                phase={phase}
                setRef={(node) => {
                  sectionRefs.current[phase.id] = node;
                }}
              />
            </React.Fragment>
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
      className={`relative overflow-hidden border ${isLight
        ? 'border-black/10 bg-[#f5f1ea] text-black'
        : 'border-white/10 bg-[#101010] text-white'
        }`}
    >
      <div className={`absolute inset-0 ${isLight ? 'bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_60%)]' : 'bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]'}`} />
      <div className={`relative px-6 py-8 md:px-10 md:py-10 ${phase.hasSpline ? 'pb-6 md:pb-8' : 'pb-8 md:pb-10'}`}>
        <div className="flex items-start justify-between gap-6">
          <span
            className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] ${isLight
              ? 'border-black/15 text-black/70'
              : 'border-white/12 text-white/72'
              }`}
          >
            {phase.kicker}
          </span>
          <span
            className={`mt-1 h-3.5 w-3.5 rounded-full ${isAccent ? 'bg-lime-400' : isLight ? 'bg-black/55' : 'bg-white/72'
              }`}
          />
        </div>

        <div className="mt-14 max-w-5xl">
          <h3
            className={`max-w-4xl font-display text-3xl font-semibold leading-[1.1] tracking-[-0.01em] md:text-5xl ${isAccent ? 'text-lime-400' : isLight ? 'text-black' : 'text-white'
              }`}
          >
            {phase.opening[0].split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i !== phase.opening[0].split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h3>
        </div>

        {phase.evidence?.length || phase.projects?.length ? (
          <div className="mt-12">
            {phase.evidenceTitle ? (
              <p className={`${isLight ? 'text-black/55' : 'text-white/50'} font-mono text-[11px] uppercase tracking-[0.24em]`}>
                {phase.evidenceTitle}
              </p>
            ) : null}

            {phase.evidence?.length ? <EvidenceMarquee tiles={phase.evidence} theme={phase.theme} /> : null}

            {phase.projectsTitle ? (
              <p className={`mt-10 ${isLight ? 'text-black/55' : 'text-white/50'} font-mono text-[11px] uppercase tracking-[0.24em]`}>
                {phase.projectsTitle}
              </p>
            ) : null}
            {phase.projects?.length ? <ProjectMarquee projects={phase.projects} /> : null}
          </div>
        ) : null}

        {phase.hasSpline ? <SplinePanel /> : null}

        {phase.id === '02' ? <GitHubGraph /> : null}

        <div className={`mt-12 border-t ${isLight ? 'border-black/10' : 'border-white/10'} pt-6`}>
          {phase.opening[1] ? (
            phase.id === '03' ? (
              <div className="mt-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="relative overflow-hidden rounded-2xl bg-black py-10 px-6 md:py-12 md:px-10"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.15),transparent_50%)]" />
                  <div className="relative z-10 max-w-4xl">
                    <span className="inline-block rounded-full bg-lime-400/10 border border-lime-400/20 px-3 py-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-lime-400 mb-5">
                      The Destination
                    </span>
                    <h4 className="font-display text-[1.75rem] sm:text-4xl lg:text-[3.25rem] font-medium tracking-tight text-white leading-[1.1]">
                      SMU MITB <span className="text-white/40 font-light block sm:inline">(AI Track)</span><br className="hidden sm:block" /> is where I learn to make it <span className="text-lime-400 italic">real.</span>
                    </h4>
                  </div>
                </motion.div>

                {/* Cinematic Campus Parallax Reveal */}
                <CampusParallax />
              </div>
            ) : (
              <p
                className={`max-w-3xl text-base leading-snug md:text-xl ${isLight ? 'text-black/75' : 'text-lime-400/80'
                  }`}
              >
                {phase.opening[1].split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i !== phase.opening[1].split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            )
          ) : null}
          {phase.closing ? (
            <p className={`${phase.opening[1] ? (phase.id === '03' ? '' : 'mt-3') : ''} max-w-3xl text-base md:text-[1.05rem] ${isLight ? 'text-black/65' : 'text-white/62'}`}>
              {phase.closing}
            </p>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
};

const EvidenceMarquee = ({ tiles, theme }: { tiles: EvidenceTile[]; theme: PhaseTheme }) => {
  const marqueeTiles = [...tiles, ...tiles, ...tiles, ...tiles];
  const scrollBindings = useInfiniteScroll({ direction: 'forward', speedPxPerSecond: 42 });

  return (
    <div
      ref={scrollBindings.containerRef}
      className="media-scroll-row mt-6 overflow-x-auto pb-4"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)'
      }}
      onPointerEnter={scrollBindings.handlePointerEnter}
      onPointerLeave={scrollBindings.handlePointerLeave}
      onPointerDown={scrollBindings.handleManualIntent}
      onTouchStart={scrollBindings.handleManualIntent}
      onWheel={scrollBindings.handleManualIntent}
      onScroll={scrollBindings.handleScroll}
    >
      <div className="w-max min-w-full">
        <div ref={scrollBindings.trackRef} className="flex w-max flex-nowrap gap-3 pr-3 pt-1 pb-1">
        {marqueeTiles.map((tile, idx) => (
          <React.Fragment key={`${tile.title}-${idx}`}>
            <EvidenceTileCard tile={tile} theme={theme} />
          </React.Fragment>
        ))}
        </div>
      </div>
    </div>
  );
};

const EvidenceTileCard = ({ tile, theme }: { tile: EvidenceTile; theme: PhaseTheme }) => {
  const darkCard = theme !== 'light';
  const hasImage = Boolean(tile.image);

  return (
    <div
      className={`${widthClassMap[tile.span ?? 'sm']} shrink-0 group relative overflow-hidden flex flex-col border transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg ${darkCard
        ? 'border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.05] shadow-black/50'
        : 'border-black/10 bg-black/[0.025] hover:border-black/20 hover:bg-black/[0.05] shadow-black/5'
        }`}
    >
      {/* Image area — takes up most of the card */}
      {hasImage ? (
        <div className="relative w-full flex-1 min-h-44 md:min-h-52">
          <img
            src={tile.image}
            alt={tile.title}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle top-left label on top of image */}
          <div className="absolute top-3 left-4 z-10">
            <span className="rounded-full bg-black/40 backdrop-blur-sm px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">
              Evidence
            </span>
          </div>
        </div>
      ) : (
        /* No-image card: keep the old top label layout */
        <div className="flex items-center justify-between p-5 pb-0">
          <span className={`font-mono text-[10px] uppercase tracking-[0.24em] transition-colors ${darkCard ? 'text-white/45 group-hover:text-white/70' : 'text-black/42 group-hover:text-black/70'}`}>
            Evidence
          </span>
          <span className={`h-2 w-2 rounded-full ${theme === 'accent' ? 'bg-lime-400' : darkCard ? 'bg-white/50' : 'bg-black/45'}`} />
        </div>
      )}

      {/* Text area — anchored at the bottom, outside the image */}
      <div className={`select-none px-5 py-4 ${!hasImage ? 'mt-auto' : ''}`}>
        <p className={`font-display text-lg leading-tight md:text-xl ${darkCard ? 'text-white' : 'text-black'}`}>{tile.title}</p>
        {tile.meta ? (
          <p className={`mt-1.5 text-sm leading-6 ${darkCard ? 'text-white/55' : 'text-black/52'}`}>{tile.meta}</p>
        ) : null}
      </div>
    </div>
  );
};

const ProjectMarquee = ({ projects }: { projects: ProjectCard[] }) => {
  const marqueeProjects = [...projects, ...projects, ...projects, ...projects];
  const scrollBindings = useInfiniteScroll({ direction: 'reverse', speedPxPerSecond: 38 });

  return (
    <div
      ref={scrollBindings.containerRef}
      className="media-scroll-row mt-6 overflow-x-auto pb-4"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)'
      }}
      onPointerEnter={scrollBindings.handlePointerEnter}
      onPointerLeave={scrollBindings.handlePointerLeave}
      onPointerDown={scrollBindings.handleManualIntent}
      onTouchStart={scrollBindings.handleManualIntent}
      onWheel={scrollBindings.handleManualIntent}
      onScroll={scrollBindings.handleScroll}
    >
      <div className="w-max min-w-full">
        <div ref={scrollBindings.trackRef} className="flex w-max flex-nowrap gap-3 pr-3 pt-1 pb-1">
        {marqueeProjects.map((project, idx) => (
          <React.Fragment key={`${project.title}-${idx}`}>
            <ProjectCardItem
              project={project}
              isFeatured={idx % projects.length === 0}
            />
          </React.Fragment>
        ))}
        </div>
      </div>
    </div>
  );
};

const useInfiniteScroll = ({
  direction,
  speedPxPerSecond,
}: {
  direction: 'forward' | 'reverse';
  speedPxPerSecond: number;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const loopWidthRef = useRef(0);
  const isHoveringRef = useRef(false);
  const pauseUntilRef = useRef(0);
  const isAdjustingRef = useRef(false);
  const initializedRef = useRef(false);

  const normalizeScrollLeft = useCallback((value: number, loopWidth: number) => {
    if (loopWidth <= 0) return value;
    const wrapped = value % loopWidth;
    return wrapped < 0 ? wrapped + loopWidth : wrapped;
  }, []);

  const setWrappedScrollLeft = useCallback((value: number) => {
    const container = containerRef.current;
    const loopWidth = loopWidthRef.current;
    if (!container || loopWidth <= 0) return;

    isAdjustingRef.current = true;
    container.scrollLeft = normalizeScrollLeft(value, loopWidth);
    requestAnimationFrame(() => {
      isAdjustingRef.current = false;
    });
  }, [normalizeScrollLeft]);

  const refreshMeasurements = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const loopWidth = track.scrollWidth / 2;
    if (!Number.isFinite(loopWidth) || loopWidth <= 0) return;

    loopWidthRef.current = loopWidth;
    const nextScrollLeft = initializedRef.current ? container.scrollLeft : loopWidth / 2;
    setWrappedScrollLeft(nextScrollLeft);
    initializedRef.current = true;
  }, [setWrappedScrollLeft]);

  useEffect(() => {
    refreshMeasurements();

    const resizeObserver = new ResizeObserver(() => {
      refreshMeasurements();
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (trackRef.current) resizeObserver.observe(trackRef.current);

    return () => resizeObserver.disconnect();
  }, [refreshMeasurements]);

  useAnimationFrame((time, delta) => {
    const container = containerRef.current;
    const loopWidth = loopWidthRef.current;

    if (!container || loopWidth <= 0 || isHoveringRef.current || time < pauseUntilRef.current) {
      return;
    }

    const directionMultiplier = direction === 'forward' ? 1 : -1;
    const nextScrollLeft = container.scrollLeft + (directionMultiplier * speedPxPerSecond * delta) / 1000;
    setWrappedScrollLeft(nextScrollLeft);
  });

  const handleManualIntent = useCallback(() => {
    pauseUntilRef.current = performance.now() + 1400;
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    const loopWidth = loopWidthRef.current;
    if (!container || loopWidth <= 0 || isAdjustingRef.current) return;

    handleManualIntent();

    if (container.scrollLeft <= 0) {
      setWrappedScrollLeft(loopWidth - 1);
      return;
    }

    if (container.scrollLeft >= loopWidth) {
      setWrappedScrollLeft(container.scrollLeft - loopWidth);
    }
  }, [handleManualIntent, setWrappedScrollLeft]);

  const handlePointerEnter = useCallback(() => {
    isHoveringRef.current = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    isHoveringRef.current = false;
    pauseUntilRef.current = performance.now() + 600;
  }, []);

  return {
    containerRef,
    trackRef,
    handleManualIntent,
    handlePointerEnter,
    handlePointerLeave,
    handleScroll,
  };
};

const ProjectCardItem = ({ project, isFeatured }: { project: ProjectCard; isFeatured: boolean }) => {
  const hasImage = Boolean(project.image);

  return (
    <article
      className={`shrink-0 group relative flex flex-col overflow-hidden border transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:border-lime-400/40 ${isFeatured ? 'w-[340px] md:w-[480px]' : 'w-[280px] md:w-[340px]'
        } border-white/10 bg-white/[0.035] shadow-black/50 hover:bg-white/[0.05]`}
    >
      {/* Image Layer */}
      {hasImage ? (
        <div className="relative w-full flex-1 min-h-[180px] md:min-h-[220px]">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {project.tag ? (
            <div className="absolute top-4 left-5 z-10">
              <span className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
                {project.tag}
              </span>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex items-center justify-between p-6 pb-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 transition-colors group-hover:text-white/70">
            {project.tag || 'Project'}
          </span>
          <span className="h-2 w-2 rounded-full bg-white/50" />
        </div>
      )}

      {/* Content Layer */}
      <div className={`select-none p-5 md:p-6 ${!hasImage ? 'mt-auto min-h-[140px]' : ''}`}>
        <h4 className="font-display text-xl font-medium tracking-tight text-white md:text-2xl">
          {project.title}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/80">
          {project.description}
        </p>
      </div>
    </article>
  );
};

const SplinePanel = () => {
  return (
    <div className="mt-12 overflow-hidden rounded-xl border border-black/10 bg-[#fbf9f6] shadow-sm">
      <div className="h-[360px] w-full md:h-[500px]">
        <Spline scene={SPLINE_SCENE_URL} className="h-full w-full" />
      </div>
    </div>
  );
};

const CampusParallax = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: 0.35, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative mt-5 overflow-hidden rounded-2xl"
      style={{ aspectRatio: '21 / 9' }}
    >
      {/* Parallax image layer */}
      <motion.img
        src="assets/phase3/smu-connexion.jpg"
        alt="SMU Connexion campus"
        style={{ scale, opacity: imgOpacity }}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Cinematic vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

      {/* Bottom gradient for text anchoring */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

    </motion.div>
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

const githubTheme = {
  dark: ['rgba(255,255,255,0.04)', '#0e4429', '#006d32', '#26a641', '#a3e635'],
};

const GitHubGraph = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="github-graph-wrap mt-10"
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/50">
          Build Cadence
        </p>
        <a
          href="https://github.com/trietdeptrai"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime-400/60 hover:text-lime-400 transition-colors duration-300"
        >
          @trietdeptrai ↗
        </a>
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-white/[0.07] bg-white/[0.02] p-4 md:p-6">
        <GitHubCalendar
          username="trietdeptrai"
          colorScheme="dark"
          theme={githubTheme}
          blockSize={13}
          blockMargin={4}
          fontSize={12}
          hideColorLegend={false}
          hideMonthLabels={false}
          hideTotalCount={false}
          labels={{
            totalCount: '{{count}} contributions this year',
          }}
        />
      </div>
    </motion.div>
  );
};
