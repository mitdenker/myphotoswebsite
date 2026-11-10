import React from 'react';
import {
  motion,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects, type Project } from '../constants/projects';
import { homeSeo } from '../seo';
import { useSeo } from '../useSeo';

const FloatingProjectCard: React.FC<{
  project: Project;
  index: number;
  scrollFloat: MotionValue<number>;
}> = ({ project, index, scrollFloat }) => {
  const shouldReduceMotion = useReducedMotion();
  const driftDirection = index % 2 === 0 ? 1 : -1;
  const cardRef = React.useRef<HTMLDivElement>(null);
  const heightRef = React.useRef(0);
  React.useLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const update = () => { heightRef.current = el.offsetHeight; };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  // Touch screens have no hover: colour the card that is in the middle of the screen.
  const [isTouch, setIsTouch] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const touchFilter = useTransform(scrollYProgress, (p: number) => {
    // 0 = full colour when the card centre is at the screen centre, 1 = black & white near the edges
    const d = Math.min(1, Math.max(0, (Math.abs(p - 0.5) - 0.04) / 0.36));
    return `grayscale(${d}) brightness(${(0.9 + 0.1 * (1 - d)).toFixed(3)}) contrast(1.1)`;
  });
  const imageY = useTransform(scrollFloat, (value: number) => value * driftDirection);
  // Scale up just enough that the shifted image always covers its frame:
  // a shift of |y| px needs (2|y| + 2px safety) of extra height. Never shows a gap.
  const imageScale = useTransform(scrollFloat, (value: number) => {
    const h = heightRef.current || 400;
    return 1 + (2 * Math.abs(value) + 2) / h;
  });

  return (
    <div ref={cardRef} className="group relative overflow-hidden break-inside-avoid">
      <Link to={`/work/${project.id}`} className="block">
        <motion.img
          style={{
            ...(shouldReduceMotion ? {} : { y: imageY, scale: imageScale }),
            ...(isTouch ? { filter: touchFilter } : {}),
          }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          src={project.image}
          alt={`${project.title} — ${project.category.toLowerCase()} by Elena Korotkova`}
          loading="lazy"
          decoding="async"
          className={
            isTouch
              ? 'block w-full'
              : 'block w-full grayscale brightness-90 contrast-110 group-hover:grayscale-0 transition-[filter,scale] duration-1000'
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 p-8 flex flex-col justify-end text-white">
          <div className="flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
            <div>
              <span className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">{project.category}</span>
              <h3 className="text-3xl font-serif italic leading-none">{project.title}</h3>
            </div>
            <ArrowUpRight size={24} strokeWidth={1} />
          </div>
        </div>
      </Link>
    </div>
  );
};

const Work = () => {
  useSeo(homeSeo(projects));
  const gridRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollFloatTarget = useMotionValue(0);
  const scrollFloat = useSpring(scrollFloatTarget, { stiffness: 240, damping: 24, mass: 0.35 });
  const lastScrollYRef = React.useRef(0);
  const hasScrollSampleRef = React.useRef(false);
  const settleTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (shouldReduceMotion) return;

    if (!hasScrollSampleRef.current) {
      lastScrollYRef.current = latest;
      hasScrollSampleRef.current = true;
      return;
    }

    const delta = latest - lastScrollYRef.current;
    lastScrollYRef.current = latest;

    if (Math.abs(delta) < 0.5) return;

    scrollFloatTarget.set(delta > 0 ? 8 : -8);

    if (settleTimerRef.current) {
      clearTimeout(settleTimerRef.current);
    }

    settleTimerRef.current = setTimeout(() => {
      scrollFloatTarget.set(0);
      settleTimerRef.current = null;
    }, 90);
  });

  React.useEffect(() => () => {
    if (settleTimerRef.current) {
      clearTimeout(settleTimerRef.current);
    }
  }, []);

  return (
    <section className="bg-[#f9f9f7]">
      {/* Intro header */}
      <header className="px-6 md:px-12 pt-32 md:pt-48 pb-12 md:pb-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-end">
        <motion.div
          className="md:col-span-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-sans not-italic text-[10px] uppercase tracking-[0.4em] text-black/40 block font-bold"><span className="sr-only">Elena Korotkova — </span>Portrait photographer · Lisbon</h1>
        </motion.div>
        <motion.div
          className="md:col-span-4 space-y-6 text-sm leading-relaxed text-black/60 max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <blockquote className="border-l border-black/15 pl-5">
            <p className="font-serif italic text-lg md:text-xl leading-snug text-black/80">
              “If the doors of perception were cleansed, everything would appear to man as it is — infinite.”
            </p>
            <cite className="not-italic block mt-3 text-[10px] uppercase tracking-[0.3em] text-black/40">William Blake</cite>
          </blockquote>
          <p>
            I'm Elena Korotkova, a photographer based in Lisbon, originally from Saint Petersburg. Expressive, vivid portraits — in darkness, through smoke, or in soft daylight on film.
          </p>
          <Link to="/contacts" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-black hover:text-black/50 transition-colors">
            Book a shoot <ArrowUpRight size={14} strokeWidth={1.5} />
          </Link>
        </motion.div>
      </header>

      {/* Border-to-border 3 Column Grid */}
      {/* Mobile: one column in list order */}
      <div ref={gridRef} className="pb-32 md:hidden">
        {projects.map((project, index) => (
          <FloatingProjectCard
            key={project.id}
            project={project}
            index={index}
            scrollFloat={scrollFloat}
          />
        ))}
      </div>
      {/* Desktop: 3 masonry columns filled row by row (1 2 3 / 4 5 6 / ...) */}
      <div className="pb-32 hidden md:flex items-start">
        {[0, 1, 2].map((col) => (
          <div key={col} className="flex-1 min-w-0">
            {projects.map((project, index) =>
              index % 3 === col ? (
                <FloatingProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  scrollFloat={scrollFloat}
                />
              ) : null,
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;
