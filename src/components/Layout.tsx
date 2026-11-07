import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for class merging */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Work', path: '/' },
    { name: 'Contacts', path: '/contacts' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-8 md:px-12 md:py-10 flex justify-between items-end">
      <Link to="/" className="text-white">
        <h1 className="text-lg md:text-xl tracking-[0.2em] font-light uppercase">Elena Korotkova</h1>
      </Link>

      {/* Desktop Nav */}
      <div className="flex gap-6 md:gap-12 text-white/70">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "text-[11px] uppercase tracking-[0.15em] hover:text-white transition-colors duration-300",
              (location.pathname === link.path || (link.path === '/' && location.pathname.startsWith('/work/'))) && "text-white"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Trigger */}
      <button 
        className="hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} strokeWidth={1.5} />
      </button>

      {/* Mobile Fullscreen Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#141414] z-[60] flex flex-col p-8 justify-between"
          >
            <div className="flex justify-between items-start">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <h1 className="text-xl text-white tracking-[0.2em] font-light uppercase">Elena Korotkova</h1>
              </Link>
              <button onClick={() => setIsOpen(false)} className="text-white">
                <X size={32} strokeWidth={1} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 py-20">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-serif italic text-white flex items-end gap-4"
                >
                  <span className="text-xs font-sans not-italic text-white/40 mb-2 uppercase tracking-widest">
                    {navLinks.indexOf(link) + 1}.
                  </span>
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="text-[10px] uppercase tracking-widest text-white/40 flex justify-between items-end">
              <span>© 2026 Elena Korotkova</span>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/whirlfull/" target="_blank" rel="noreferrer">Instagram</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="px-6 py-12 md:px-12 md:py-20 border-t border-black/5 bg-[#f9f9f7]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl md:text-3xl font-serif italic max-w-sm mb-8 leading-tight">
            Light, shadow and the people in between.
          </h2>
          <div className="flex gap-8 text-[10px] font-semibold uppercase tracking-widest text-black/40">
            <a href="https://www.instagram.com/whirlfull/" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">Instagram</a>
            <a href="mailto:korotko.elena@gmail.com" className="hover:text-black transition-colors">Email</a>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-4">Contact</span>
          <a href="mailto:korotko.elena@gmail.com" className="text-sm hover:underline break-all">korotko.elena@gmail.com</a>
          <p className="text-sm">Lisbon, Portugal</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="mt-auto pt-8">
            <p className="text-[10px] uppercase tracking-widest text-black/20">© 2026 Elena Korotkova Photography</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen selection:bg-black selection:text-white">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
