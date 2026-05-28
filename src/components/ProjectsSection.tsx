import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  liveUrl: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  singleImage?: string;
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'React Native · GenAI',
    name: 'RizzAI — Multi‑Feature Dating AI Assistant',
    liveUrl: 'https://github.com/srinija63/RizzAI',
    col1Image1: '/rizzai-1.png',
    col1Image2: '/rizzai-2.png',
    col2Image: '/rizzai-3.png',
  },
  {
    number: '02',
    category: 'Python · FastAPI · LangChain',
    name: 'Multi‑Tool AI Research Agent (Autonomous Decision System)',
    liveUrl: 'https://github.com/srinija63/multi-tool-ai-research-agent',
    col1Image1: '/agent-1.svg',
    col1Image2: '/agent-2.svg',
    col2Image: '/agent-3.svg',
  },
  {
    number: '03',
    category: 'Full‑stack · AI‑driven Support',
    name: 'Online Mental Health Companion',
    liveUrl: 'https://github.com/srinija63/online-therapy-application',
    col1Image1: '/mhc-1.png',
    col1Image2: '/mhc-2.png',
    col2Image: '/mhc-3.png',
  },
  {
    number: '04',
    category: 'Android · Safety',
    name: 'Women’s Security Alert System',
    liveUrl: 'https://github.com/srinija63/women-security-project',
    col1Image1: '/women-safety-1.svg',
    col1Image2: '/women-safety-2.svg',
    col2Image: '/women-safety-3.svg',
  },
  {
    number: '05',
    category: 'Web · Accessibility · EdTech',
    name: 'Personalized Educational Aid for Dyslexic Children',
    liveUrl: 'https://github.com/srinija63/dyslexia',
    col1Image1: '/dyslexia-1.png',
    col1Image2: '/dyslexia-2.png',
    col2Image: '/dyslexia-3.png',
  },
  {
    number: '06',
    category: 'GenAI · Web',
    name: 'ResumeIQ — AI Resume Reviewer',
    liveUrl: 'https://github.com/srinija63/resumeiq',
    col1Image1: '/resumeiq-hero.png',
    col1Image2: '/resumeiq-feedback.png',
    col2Image: '/resumeiq-score.png',
  },
  {
    number: '07',
    category: 'UI · Dashboard',
    name: 'Zorvyn Finance Dashboard',
    liveUrl: 'https://zorvyn-finance-dashboard-three.vercel.app',
    col1Image1: '/zorvyn-1.png',
    col1Image2: '/zorvyn-2.png',
    col2Image: '/zorvyn-3.png',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ProjectCard = ({ project, index, total, containerRef }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll progress for THIS card relative to the whole projects scroll range.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  // Cards further down the stack stay full-size; earlier cards scale DOWN
  // as later cards stack on top of them.
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky top-24 md:top-32 h-[85vh] w-full"
      style={{ top: `${96 + index * 28}px` }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto h-full w-full flex flex-col gap-4 sm:gap-6 md:gap-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
          {/* Top row: number + meta + button */}
                  <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 sm:gap-6">
                    <div className="flex flex-row items-start gap-3 sm:gap-6 md:gap-10 min-w-0 w-full">
                      <div
                        className="shrink-0 font-black text-[#D7E2EA] leading-none"
                        style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)' }}
                      >
                        {project.number}
                      </div>

                      <div className="flex flex-col gap-1 sm:gap-3 pt-1 sm:pt-3 md:pt-4 min-w-0 flex-1">
                        <span
                          className="font-light uppercase tracking-widest text-[#D7E2EA]/60"
                          style={{ fontSize: 'clamp(0.65rem, 1.2vw, 1rem)' }}
                        >
                          {project.category}
                        </span>
                        <h3
                          className="font-medium uppercase text-[#D7E2EA] leading-tight"
                          style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
                        >
                          {project.name}
                        </h3>
                      </div>
                    </div>

                    <div className="shrink-0 self-start sm:self-auto pt-1 sm:pt-2 md:pt-3 w-full sm:w-auto">
                      <LiveProjectButton href={project.liveUrl} className="w-full sm:w-auto" />
                    </div>
                  </div>

        {/* Bottom row: images */}
        {project.singleImage ? (
          <div className="flex flex-1 min-h-0">
            <div className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] w-full">
              <img
                src={project.singleImage}
                alt={`${project.name} preview`}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>
        ) : (
          <div
            className="grid min-h-0 flex-1 grid-cols-[2fr_3fr] grid-rows-2 gap-3 sm:gap-4 md:gap-5"
            style={{ minHeight: 'clamp(220px, 42vh, 520px)' }}
          >
            <div className="min-h-0 overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]">
              <img
                src={project.col1Image1}
                alt={`${project.name} preview 1`}
                className="h-full w-full object-cover object-top"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="min-h-0 overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] row-start-2">
              <img
                src={project.col1Image2}
                alt={`${project.name} preview 2`}
                className="h-full w-full object-cover object-top"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="min-h-0 overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] col-start-2 row-span-2 row-start-1">
              <img
                src={project.col2Image}
                alt={`${project.name} preview 3`}
                className="h-full w-full object-cover object-center"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>
        )}
      </motion.article>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-7xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
