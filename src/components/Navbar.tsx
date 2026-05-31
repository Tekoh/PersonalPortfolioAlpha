import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl"
    >
      <nav
        className="rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.60)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: scrolled
            ? '4px 4px 12px rgba(0,0,0,0.08), -2px -2px 8px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80), inset -1px -1px 3px rgba(0,0,0,0.04)'
            : '2px 2px 8px rgba(0,0,0,0.05), -1px -1px 5px rgba(255,255,255,0.80)',
          border: '1px solid rgba(255,255,255,0.75)',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 font-bold text-clay-text text-lg tracking-tight"
        >
          <div className="w-8 h-8 rounded-xl bg-violet-500 flex items-center justify-center shadow-clay-violet-sm flex-shrink-0">
            <Shield size={15} className="text-white" />
          </div>
          Mahd R.
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-clay-muted hover:text-clay-text hover:bg-violet-50 transition-all duration-200"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="mailto:mahdraihan@outlook.com"
          className="hidden md:flex items-center gap-2 bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-150 hover:bg-violet-600 active:scale-95"
          style={{ boxShadow: '4px 4px 10px rgba(124,58,237,0.30)' }}
        >
          Hire Me
        </a>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden p-2 rounded-xl text-clay-muted hover:bg-violet-50 transition-colors"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mt-2 rounded-2xl p-4 flex flex-col gap-1"
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            boxShadow: '4px 4px 12px rgba(0,0,0,0.08), -2px -2px 8px rgba(255,255,255,0.90)',
            border: '1px solid rgba(255,255,255,0.75)',
          }}
        >
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setMenuOpen(false); }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-clay-muted hover:text-clay-text hover:bg-violet-50 transition-all duration-200"
            >
              {label}
            </button>
          ))}
          <a
            href="mailto:mahdraihan@outlook.com"
            className="mt-2 text-center bg-violet-500 text-white text-sm font-semibold px-4 py-3 rounded-xl hover:bg-violet-600 transition-colors"
          >
            Hire Me
          </a>
        </motion.div>
      )}
    </motion.header>
  );
};
