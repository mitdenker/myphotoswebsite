import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const EMAIL = 'korotko.elena@gmail.com';
const INSTAGRAM_URL = 'https://www.instagram.com/whirlfull/';

const Contacts = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '');
    const from = String(data.get('email') ?? '');
    const interest = String(data.get('interest') ?? '');
    const message = String(data.get('message') ?? '');
    const subject = `${interest}${name ? ` — ${name}` : ''}`;
    const body = `${message}\n\n${name}${from ? `\n${from}` : ''}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

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
              I'm a photographer from Saint Petersburg, based between Lisbon and Berlin. I love working with light and making striking, expressive, vivid portraits that are anything but ordinary.
            </p>
            <p>
              I'm drawn to mystery: portraits made in darkness or through smoke, where the hidden, shadowed side of a person comes to the surface. At the same time I love the opposite — light, airy film photographs, unposed and full of life.
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
            src="/elena.webp"
            alt="Elena Korotkova"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Bookings */}
      <section className="px-6 md:px-12 py-32 border-t border-black/5">
        <div className="bg-zinc-100 p-8 md:p-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-10 block">Bookings</span>
            <p className="text-2xl md:text-4xl font-serif italic max-w-2xl leading-tight">
              To book a shoot, just write to me by email or on Instagram.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <a
              href={`mailto:${EMAIL}`}
              className="text-lg underline underline-offset-4 hover:text-black/50 transition-colors break-all"
            >
              {EMAIL}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="text-lg underline underline-offset-4 hover:text-black/50 transition-colors"
            >
              @whirlfull
            </a>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 md:px-12 py-40 text-center bg-[#141414] text-white">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
              <h2 className="text-3xl md:text-5xl font-serif italic leading-tight mb-12">
                  "A photograph is a secret about a secret. The more it tells you the less you know."
              </h2>
              <p className="text-white/40 text-xs uppercase tracking-[0.3em]">Diane Arbus</p>
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
              <a href={`mailto:${EMAIL}`} className="text-lg underline underline-offset-4 hover:text-black/50 transition-colors break-all">
                {EMAIL}
              </a>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-4 block">Instagram</span>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-lg underline underline-offset-4 hover:text-black/50 transition-colors">
                @whirlfull
              </a>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-4 block">Based in</span>
              <p className="text-sm leading-relaxed">
                Lisbon, Portugal<br />
                Berlin, Germany
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
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-widest text-black/40 group-focus-within:text-black transition-colors block mb-2">Full Name</label>
                <input name="name" className="w-full bg-transparent border-b border-black/10 py-3 text-sm focus:outline-none focus:border-black transition-colors" type="text" />
              </div>
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-widest text-black/40 group-focus-within:text-black transition-colors block mb-2">Email</label>
                <input name="email" className="w-full bg-transparent border-b border-black/10 py-3 text-sm focus:outline-none focus:border-black transition-colors" type="email" />
              </div>
            </div>

            <div className="group relative">
              <label className="text-[10px] uppercase tracking-widest text-black/40 group-focus-within:text-black transition-colors block mb-2">Interest</label>
              <select name="interest" className="w-full bg-transparent border-b border-black/10 py-3 text-sm focus:outline-none focus:border-black transition-colors appearance-none">
                <option>Portrait Session</option>
                <option>Film Session</option>
                <option>Collaboration</option>
                <option>Other</option>
              </select>
            </div>

            <div className="group relative">
              <label className="text-[10px] uppercase tracking-widest text-black/40 group-focus-within:text-black transition-colors block mb-2">Message</label>
              <textarea name="message" rows={4} className="w-full bg-transparent border-b border-black/10 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none mb-4"></textarea>
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
