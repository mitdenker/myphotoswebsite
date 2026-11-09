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
          style={shouldReduceMotion ? undefined : { y: imageY, scale: imageScale }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          src={project.image}
          alt={`${project.title} — ${project.category.toLowerCase()} by Elena Korotkova`}
          loading="lazy"
          decoding="async"
          className="block w-full grayscale brightness-90 contrast-110 group-hover:grayscale-0 transition-[filter,scale] duration-1000"
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
