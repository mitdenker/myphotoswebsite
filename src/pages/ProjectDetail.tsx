import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '../constants/projects';
import { projectSeo } from '../seo';
import { useSeo } from '../useSeo';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  useSeo(project ? projectSeo(project) : null, project);

  React.useEffect(() => {
    if (!project) {
      navigate('/');
    }
  }, [project, navigate]);

  if (!project) return null;

  const nextProject = projects.find(p => p.id === project.nextId);
  const hasLandscapeHero = project.heroOrientation === 'landscape';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-[#f9f9f7] min-h-screen"
    >
      {hasLandscapeHero ? (
        <section className="h-screen w-full relative overflow-hidden">
          <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              src={project.hero} 
              alt={`${project.title} — ${project.category.toLowerCase()} by Elena Korotkova`}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover grayscale brightness-90"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-12 left-6 md:left-12 text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                  <span className="text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold">{project.category}</span>
                  <h1 className="text-6xl md:text-8xl font-serif italic leading-none">{project.title}</h1>
              </motion.div>
          </div>
        </section>
      ) : (
        <section className="px-6 md:px-12 pt-36 md:pt-44 pb-16 md:pb-24 border-b border-black/5">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="text-[10px] uppercase tracking-[0.4em] mb-5 block font-bold text-black/40">{project.category}</span>
                <h1 className="text-6xl md:text-8xl font-serif italic leading-none text-black">{project.title}</h1>
            </motion.div>
          </div>
        </section>
      )}

      {/* Info */}
      <section className={`px-6 md:px-12 ${hasLandscapeHero ? 'py-32' : 'pt-16 md:pt-20 pb-32'} grid grid-cols-1 md:grid-cols-12 gap-12`}>
          <div className="md:col-span-4 lg:col-span-3">
              <div className="space-y-12 md:sticky md:top-32">
                  {project.description && (
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-4 block">Project Info</span>
                        <p className="text-sm leading-relaxed text-black/60">{project.description}</p>
                    </div>
                  )}
                  <div className="flex gap-20">
                      <div>
                          <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-2 block">Location</span>
                          <p className="text-sm">Global</p>
                      </div>
                      <div>
                          <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-2 block">Year</span>
                          <p className="text-sm">{project.year}</p>
                      </div>
                  </div>
              </div>
          </div>

          <div className="md:col-span-8 lg:col-start-5 space-y-24 md:space-y-32">
              {project.gallery.map((img: string, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className={i % 2 === 0 ? "max-w-4xl" : "max-w-4xl ml-auto"}
                  >
                      <div className="overflow-hidden bg-zinc-100">
                          <img 
                            src={img} 
                            alt={`${project.title}, figure ${String(i + 1).padStart(2, '0')} by Elena Korotkova`}
                            loading="lazy"
                            decoding="async"
                            className="w-full grayscale brightness-110 hover:grayscale-0 hover:scale-105 transition-all duration-1000"
                          />
                      </div>
                      <p className="text-[9px] uppercase tracking-widest text-black/30 mt-4 text-right">Figure 0{i+1}</p>
                  </motion.div>
              ))}
          </div>
      </section>

      {/* Navigation Footer */}
      <section className="px-6 md:px-12 py-32 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <Link to="/" className="group flex items-center gap-4">
            <div className="p-4 border border-black/10 rounded-full group-hover:bg-black group-hover:text-white transition-all duration-500">
                <ArrowLeft size={16} strokeWidth={1} />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold">Back to Work</span>
          </Link>

          {nextProject && (
            <Link to={`/work/${nextProject.id}`} className="group flex items-center gap-6 text-right">
              <div>
                  <span className="text-[10px] uppercase tracking-widest text-black/30 block mb-1">Next Project</span>
                  <h3 className="text-3xl md:text-4xl font-serif italic group-hover:translate-x-[-10px] transition-transform duration-700">{nextProject.title}</h3>
              </div>
              <div className="p-4 md:p-6 border border-black/10 rounded-full group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <ArrowRight size={24} strokeWidth={1} />
              </div>
            </Link>
          )}
      </section>
    </motion.div>
  );
};


export default ProjectDetail;
