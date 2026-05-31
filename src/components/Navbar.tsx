import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.7.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const NAV_LINKS = [
  { label: 'About',    id: 'about' },
  { label: 'Skills',   id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact',  id: 'contact' },
];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navBg = scrolled
    ? 'rgba(11,17,32,0.88)'
    : 'rgba(20,30,51,0.55)';

  const navShadow = scrolled
    ? '4px 4px 14px rgba(0,0,0,0.55), -2px -2px 8px rgba(255,255,255,0.02), inset 1px 1px 1px rgba(255,255,255,0.05), inset -1px -1px 1px rgba(0,0,0,0.38)'
    : '2px 2px 8px rgba(0,0,0,0.35)';

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl"
    >
      <nav
        className="rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-300"
        style={{
          background: navBg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: navShadow,
          border: '1px solid rgba(56,189,248,0.12)',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 font-bold text-cyber-text text-lg tracking-tight"
        >
          <div
            className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center flex-shrink-0"
            style={{ boxShadow: '0 0 14px rgba(56,189,248,0.40), inset 1px 1px 2px rgba(255,255,255,0.20)' }}
          >
            <Shield size={15} className="text-white" />
          </div>
          <span>Mahd<span className="text-sky-400">.</span>R</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-cyber-muted hover:text-cyber-primary hover:bg-sky-500/10 transition-all duration-200"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="https://github.com/Tekoh"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:bg-sky-500/10"
          style={{
            color: '#38bdf8',
            border: '1px solid rgba(56,189,248,0.30)',
            boxShadow: '0 0 14px rgba(56,189,248,0.10)',
          }}
        >
          <GithubIcon size={15} />
          GitHub
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden p-2 rounded-xl text-cyber-muted hover:text-cyber-primary hover:bg-sky-500/10 transition-colors"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 rounded-2xl p-4 flex flex-col gap-1"
          style={{
            background: 'rgba(11,17,32,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(56,189,248,0.12)',
            boxShadow: '6px 6px 20px rgba(0,0,0,0.55)',
          }}
        >
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setMenuOpen(false); }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-cyber-muted hover:text-cyber-primary hover:bg-sky-500/10 transition-all"
            >
              {label}
            </button>
          ))}
          <a
            href="https://github.com/Tekoh"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-xl"
            style={{ color: '#38bdf8', border: '1px solid rgba(56,189,248,0.30)' }}
          >
            <GithubIcon size={15} /> GitHub
          </a>
        </motion.div>
      )}
    </motion.header>
  );
};
