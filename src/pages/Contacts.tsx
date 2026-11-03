import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const Contacts = () => {
  return (
    <div className="bg-[#f9f9f7] min-h-screen">
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-black/40 mb-8 block font-bold">Contacts</span>
          <h1 className="text-6xl md:text-8xl font-serif italic leading-[0.9] mb-12">Elena Korotkova</h1>
          <div className="space-y-6 max-w-md text-sm md:text-base leading-relaxed text-black/70">
            <p>
              Based in London, Elena Korotkova is a photographer and visual artist whose work focuses on the dialogue between light and structural form. Her approach is rooted in minimalism, seeking perfection in the subtle nuances of shadows and geometry.
            </p>
            <p>
              With a background in both architecture and fine art, she brings a unique perspective to her commissions, treating every subject as a sculpture within a temporal landscape.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="aspect-[4/5] overflow-hidden rounded-sm"
        >
          <img 
            src="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=2000&auto=format&fit=crop" 
            alt="Elena Korotkova"
            className="w-full h-full object-cover grayscale brightness-110"
          />
        </motion.div>
      </section>

      {/* Selected Clients & Exhibitions */}
      <section className="px-6 md:px-12 py-32 border-t border-black/5 grid grid-cols-1 md:grid-cols-3 gap-20">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-10 block">Selected Clients</span>
          <ul className="space-y-4 text-sm font-light uppercase tracking-wide">
            <li>Vogue Italia</li>
            <li>Architectural Digest</li>
            <li>Kinfolk</li>
            <li>Loewe</li>
            <li>The White Company</li>
            <li>Aesop</li>
          </ul>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-10 block">Exhibitions</span>
          <ul className="space-y-8">
            <li className="group">
              <span className="text-[10px] text-black/40 block mb-1">2023 — London</span>
              <p className="text-sm font-serif italic text-lg leading-none">The Geometry of Silence</p>
              <p className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity mt-2">Serpentine Galleries</p>
            </li>
            <li className="group">
              <span className="text-[10px] text-black/40 block mb-1">2022 — Paris</span>
              <p className="text-sm font-serif italic text-lg leading-none">Reflective States</p>
              <p className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity mt-2">Centre Pompidou</p>
            </li>
            <li className="group">
              <span className="text-[10px] text-black/40 block mb-1">2021 — New York</span>
              <p className="text-sm font-serif italic text-lg leading-none">Anatomy of Light</p>
              <p className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity mt-2">MoMA PS1</p>
            </li>
          </ul>
        </div>

        <div className="bg-zinc-100 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-10 block">Newsletter</span>
            <p className="text-xl font-serif italic mb-8">Stay informed on new projects and print releases.</p>
          </div>
          <div className="relative">
            <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-transparent border-b border-black/10 py-4 text-sm focus:outline-none focus:border-black transition-colors pr-10"
            />
            <button className="absolute right-0 bottom-4 text-[10px] uppercase tracking-widest">Join</button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-6 md:px-12 py-40 text-center bg-[#141414] text-white">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
              <h2 className="text-3xl md:text-5xl font-serif italic leading-tight mb-12">
                  "I am interested in what remains when everything else is stripped away. The essential truth of a form revealed by the dance of photons."
              </h2>
              <p className="text-white/40 text-xs uppercase tracking-[0.3em]">Studio Philosophy</p>
          </motion.div>
      </section>

      {/* Contact */}
      <section className="px-6 md:px-12 py-32 grid grid-cols-1 md:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-black/40 mb-8 block font-bold">Contact</span>
          <h2 className="text-6xl md:text-8xl font-serif italic leading-none mb-12">Get in <br />Touch</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-4 block">Email</span>
              <p className="text-lg">[placeholder]</p>
              <p className="text-sm text-black/50 mt-1">Response within 24h</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-4 block">Telegram</span>
              <a href="https://t.me/elaravoss" target="_blank" rel="noreferrer" className="text-lg underline underline-offset-4 hover:text-black/50 transition-colors">
                @elaravoss
              </a>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-4 block">Instagram</span>
              <a href="https://instagram.com/elaravoss" target="_blank" rel="noreferrer" className="text-lg underline underline-offset-4 hover:text-black/50 transition-colors">
                @elaravoss
              </a>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-4 block">Studio Address</span>
              <p className="text-sm leading-relaxed">
                Unit 14, Whitecross Studios<br />
                London, EC1Y 8JL<br />
                United Kingdom
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-zinc-50 p-8 md:p-16 border border-black/5"
        >
          <form className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-widest text-black/40 group-focus-within:text-black transition-colors block mb-2">Full Name</label>
                <input className="w-full bg-transparent border-b border-black/10 py-3 text-sm focus:outline-none focus:border-black transition-colors" type="text" />
              </div>
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-widest text-black/40 group-focus-within:text-black transition-colors block mb-2">Email</label>
                <input className="w-full bg-transparent border-b border-black/10 py-3 text-sm focus:outline-none focus:border-black transition-colors" type="email" />
              </div>
            </div>

            <div className="group relative">
              <label className="text-[10px] uppercase tracking-widest text-black/40 group-focus-within:text-black transition-colors block mb-2">Interest</label>
              <select className="w-full bg-transparent border-b border-black/10 py-3 text-sm focus:outline-none focus:border-black transition-colors appearance-none">
                <option>Commercial Commission</option>
                <option>Print Inquiry</option>
                <option>Collaboration</option>
                <option>Other</option>
              </select>
            </div>

            <div className="group relative">
              <label className="text-[10px] uppercase tracking-widest text-black/40 group-focus-within:text-black transition-colors block mb-2">Message</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-black/10 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none mb-4"></textarea>
            </div>

            <button type="submit" className="flex items-center gap-4 group">
              <span className="text-[10px] uppercase tracking-widest font-bold">Send Message</span>
              <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                <Send size={14} strokeWidth={1.5} />
              </div>
            </button>
          </form>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div className="h-[60vh] overflow-hidden grayscale brightness-75">
          <img
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop"
            alt="Studio contact visual"
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-[4000ms]"
          />
        </div>
      </section>
    </div>
  );
};

export default Contacts;
