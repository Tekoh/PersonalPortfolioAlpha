import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Code, Database, Terminal, Server, Cloud,
  ExternalLink, Mail, Cpu, MapPin, ChevronRight,
  Lock, AlertTriangle, CheckCircle,
} from 'lucide-react';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.7.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

import { CustomCursor }    from './components/CustomCursor';
import { Navbar }          from './components/Navbar';
import { FloatingShapes }  from './components/FloatingShapes';
import { Card }            from './components/Card';
import { Button }          from './components/Button';
import { SectionReveal }   from './components/SectionReveal';
import { ParticleNetwork } from './components/ParticleNetwork';
import { TypewriterText }  from './components/TypewriterText';
import { StatCounter }     from './components/StatCounter';

// ─── DATA ────────────────────────────────────────────────────────────────────

const ROLES = [
  'Security Engineer',
  'Threat Hunter',
  'Cloud Defender',
  'Ethical Hacker',
];

const STATS = [
  { value: 60,  suffix: '+', label: 'Vulnerabilities Remediated' },
  { value: 3,   suffix: '',  label: 'Security Projects' },
  { value: 99,  suffix: '%', label: 'Uptime Maintained' },
  { value: 1,   suffix: '',  label: 'University: UA92' },
];

const SKILLS = [
  { name: 'Python & JavaScript',                  level: 90, icon: <Code size={15} />,     color: '#38bdf8' },
  { name: 'SQL, MySQL & SQLite',                  level: 85, icon: <Database size={15} />, color: '#818cf8' },
  { name: 'Linux & Kali Linux',                   level: 80, icon: <Terminal size={15} />, color: '#34d399' },
  { name: 'Virtualisation & Hypervisors',         level: 85, icon: <Server size={15} />,   color: '#38bdf8' },
  { name: 'Cloud Infrastructure & VM Deployment', level: 80, icon: <Cloud size={15} />,    color: '#818cf8' },
  { name: 'Threat Hunting & Vulnerability Analysis', level: 75, icon: <Shield size={15} />, color: '#34d399' },
];

const PROJECTS = [
  {
    id: '01',
    title: 'UniShare',
    type: 'Vulnerability Remediation',
    status: 'Secured',
    statusIcon: <CheckCircle size={13} />,
    statusColor: '#34d399',
    statusBg: 'rgba(52,211,153,0.12)',
    desc: 'Conducted a full security audit on a deliberately vulnerable application — identifying and remediating 60+ flaws including injection vulnerabilities, broken authentication, and misconfigured access controls.',
    url: 'https://github.com/Tekoh/UniShareApplication',
    tags: ['Penetration Testing', 'OWASP', 'Auth Hardening'],
  },
  {
    id: '02',
    title: 'St. Alphonsus',
    type: 'Backend / Database',
    status: 'Active',
    statusIcon: <AlertTriangle size={13} />,
    statusColor: '#fbbf24',
    statusBg: 'rgba(251,191,36,0.12)',
    desc: 'A full-featured school management system built with a focus on database integrity and backend architecture, using MySQL for structured, relational data management.',
    url: 'https://github.com/Tekoh/StAlphonsusManagementTool',
    tags: ['MySQL', 'Backend', 'Data Integrity'],
  },
  {
    id: '03',
    title: 'D.Roid Secure',
    type: 'E-Commerce',
    status: 'Public',
    statusIcon: <Lock size={13} />,
    statusColor: '#38bdf8',
    statusBg: 'rgba(56,189,248,0.12)',
    desc: 'A full-stack e-commerce platform applying real-world web development practices — including secure session handling, input validation, and structured deployment workflows.',
    url: 'https://github.com/Tekoh/D.RoidSecure-Website',
    tags: ['Full-Stack', 'Session Security', 'Deployment'],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const SectionLabel = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="inline-flex items-center gap-2 mb-4">
    <span className="text-sky-400">{icon}</span>
    <span className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-sky-400">
      {text}
    </span>
    <div className="h-px w-12 bg-gradient-to-r from-sky-400 to-transparent" />
  </div>
);

// ─── LOADING ─────────────────────────────────────────────────────────────────

const LoadingScreen = () => (
  <motion.div
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: 'easeInOut' }}
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5"
    style={{ background: '#0b1120' }}
  >
    <motion.div
      animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className="w-16 h-16 rounded-2xl bg-sky-500 flex items-center justify-center"
      style={{
        boxShadow:
          '0 0 40px rgba(56,189,248,0.5), inset 1px 1px 2px rgba(255,255,255,0.25)',
      }}
    >
      <Shield size={28} className="text-white" />
    </motion.div>
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs font-mono text-sky-400 tracking-widest uppercase">
        Initialising secure session
      </p>
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            className="w-1.5 h-1.5 rounded-full bg-sky-400"
          />
        ))}
      </div>
    </div>
  </motion.div>
);

// ─── HERO ─────────────────────────────────────────────────────────────────────

const HeroSection = () => (
  <section
    id="hero"
    className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden"
  >
    {/* Particle network scoped to hero */}
    <div className="absolute inset-0 z-0">
      <ParticleNetwork />
    </div>

    {/* Radial fade so content is readable */}
    <div
      className="absolute inset-0 z-[1]"
      style={{
        background:
          'radial-gradient(ellipse 70% 80% at 30% 50%, transparent 40%, rgba(11,17,32,0.85) 100%)',
      }}
    />

    <div className="relative z-[2]">
      <SectionReveal>
        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 text-xs font-mono font-medium px-3 py-1.5 rounded-full mb-8"
          style={{
            background: 'rgba(52,211,153,0.10)',
            border: '1px solid rgba(52,211,153,0.28)',
            color: '#34d399',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for opportunities
        </div>

        {/* Name */}
        <h1
          className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-3"
          style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}
        >
          Mahd Raihan
        </h1>

        {/* Typewriter roles */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 min-h-[2.5rem]">
          <TypewriterText phrases={ROLES} className="text-sky-400" />
        </h2>

        {/* Tagline */}
        <p
          className="max-w-lg text-lg leading-relaxed mb-12"
          style={{ color: '#94a3b8' }}
        >
          Turning attack surfaces into hardened systems. Focused on threat
          analysis, vulnerability research, and resilient cloud infrastructure.
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap gap-4 mb-16">
          <Button
            onClick={() =>
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Case Files
            <ChevronRight size={16} />
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Open Channel
          </Button>
        </div>

        {/* Stat strip */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl"
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="rounded-xl px-4 py-3"
              style={{
                background: 'rgba(20,30,51,0.75)',
                border: '1px solid rgba(56,189,248,0.10)',
                backdropFilter: 'blur(8px)',
                boxShadow:
                  '4px 4px 14px rgba(0,0,0,0.50), inset 1px 1px 1px rgba(255,255,255,0.05)',
              }}
            >
              <p
                className="text-2xl font-bold font-mono"
                style={{ color: '#38bdf8' }}
              >
                <StatCounter to={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </SectionReveal>
    </div>

    {/* Bottom fade */}
    <div
      className="absolute bottom-0 left-0 right-0 h-32 z-[2]"
      style={{ background: 'linear-gradient(to bottom, transparent, #0b1120)' }}
    />
  </section>
);

// ─── ABOUT ───────────────────────────────────────────────────────────────────

const TerminalCard = () => {
  const lines = [
    { delay: 0,    text: '$ whoami',                          color: '#38bdf8' },
    { delay: 400,  text: 'mahd_raihan',                       color: '#f1f5f9' },
    { delay: 900,  text: '$ cat role.txt',                    color: '#38bdf8' },
    { delay: 1300, text: 'Cybersecurity & Cloud Security — UA92', color: '#34d399' },
    { delay: 1700, text: '$ cat objective.txt',               color: '#38bdf8' },
    { delay: 2100, text: 'Build things. Break things. Harden', color: '#f1f5f9' },
    { delay: 2200, text: 'them against real-world threats.',  color: '#f1f5f9' },
    { delay: 2700, text: '$ status',                          color: '#38bdf8' },
    { delay: 3100, text: '[ACTIVE] — Open to opportunities',  color: '#34d399' },
  ];

  const [visible, setVisible] = useState<boolean[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        lines.forEach((_, i) => {
          setTimeout(() => setVisible(v => { const n = [...v]; n[i] = true; return n; }), lines[i].delay);
        });
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-2xl p-5 font-mono text-sm h-full"
      style={{
        background: '#0d1526',
        border: '1px solid rgba(56,189,248,0.15)',
        boxShadow:
          '6px 6px 20px rgba(0,0,0,0.55), -3px -3px 10px rgba(255,255,255,0.03), inset 1px 1px 2px rgba(255,255,255,0.07), inset -1px -1px 2px rgba(0,0,0,0.45)',
      }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 mb-4 pb-3" style={{ borderBottom: '1px solid rgba(56,189,248,0.10)' }}>
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs" style={{ color: '#475569' }}>mahd@secure-term ~ </span>
      </div>

      {/* Output lines */}
      <div className="space-y-1.5 leading-relaxed">
        {lines.map((line, i) => (
          <div
            key={i}
            className="transition-all duration-300"
            style={{
              color: line.color,
              opacity: visible[i] ? 1 : 0,
              transform: visible[i] ? 'translateX(0)' : 'translateX(-8px)',
            }}
          >
            {line.text}
          </div>
        ))}
        {/* Blinking cursor after last visible line */}
        {visible.length > 0 && (
          <span
            className="inline-block w-2 h-4 align-middle animate-pulse"
            style={{ background: '#38bdf8', opacity: 0.8 }}
          />
        )}
      </div>
    </div>
  );
};

const AboutSection = () => (
  <section id="about" className="py-24">
    <SectionReveal>
      <SectionLabel icon={<Cpu size={13} />} text="Security Profile" />
      <h2
        className="text-3xl md:text-4xl font-bold mb-12"
        style={{ color: '#f1f5f9', letterSpacing: '-0.01em' }}
      >
        Who's Behind the Keyboard
      </h2>
    </SectionReveal>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SectionReveal delay={80}>
        <TerminalCard />
      </SectionReveal>

      <SectionReveal delay={180}>
        <Card className="flex flex-col justify-center h-full gap-5">
          {/* Location pill */}
          <div className="flex items-center gap-2 text-sm" style={{ color: '#94a3b8' }}>
            <MapPin size={14} className="text-sky-400" />
            United Kingdom
          </div>

          <p className="leading-relaxed" style={{ color: '#94a3b8' }}>
            I'm a Cybersecurity student at UA92 with a strong interest in cloud
            security and offensive security techniques. I enjoy building systems,
            understanding how they break, and hardening them against real-world
            threats.
          </p>
          <p className="leading-relaxed" style={{ color: '#94a3b8' }}>
            My focus sits at the intersection of backend engineering and cloud
            infrastructure — where secure design decisions have the most impact.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['Cloud Security', 'Penetration Testing', 'Secure Architecture', 'Threat Modelling'].map(tag => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-1 rounded-lg"
                style={{
                  background: 'rgba(56,189,248,0.08)',
                  border: '1px solid rgba(56,189,248,0.20)',
                  color: '#38bdf8',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </Card>
      </SectionReveal>
    </div>
  </section>
);

// ─── SKILLS ───────────────────────────────────────────────────────────────────

const SkillCard = ({ skill, index }: { skill: typeof SKILLS[0]; index: number }) => (
  <SectionReveal delay={index * 70}>
    <div
      className="rounded-xl p-4 group transition-all duration-300"
      style={{
        background: '#141e33',
        border: '1px solid rgba(56,189,248,0.08)',
        boxShadow:
          '4px 4px 14px rgba(0,0,0,0.50), -2px -2px 8px rgba(255,255,255,0.02), inset 1px 1px 1px rgba(255,255,255,0.05), inset -1px -1px 1px rgba(0,0,0,0.38)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${skill.color}30`;
        (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 14px rgba(0,0,0,0.50), 0 0 18px ${skill.color}14, inset 1px 1px 1px rgba(255,255,255,0.05)`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.08)';
        (e.currentTarget as HTMLElement).style.boxShadow =
          '4px 4px 14px rgba(0,0,0,0.50), -2px -2px 8px rgba(255,255,255,0.02), inset 1px 1px 1px rgba(255,255,255,0.05), inset -1px -1px 1px rgba(0,0,0,0.38)';
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span style={{ color: skill.color }}>{skill.icon}</span>
          <span className="text-sm font-medium" style={{ color: '#f1f5f9' }}>
            {skill.name}
          </span>
        </div>
        <span className="text-xs font-mono font-semibold" style={{ color: skill.color }}>
          {skill.level}%
        </span>
      </div>

      {/* Inset trough */}
      <div
        className="h-2 w-full rounded-full overflow-hidden"
        style={{
          background: '#0d1526',
          boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.50), inset -1px -1px 2px rgba(255,255,255,0.04)',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.08, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
            boxShadow: `2px 0 12px ${skill.color}55`,
          }}
        />
      </div>
    </div>
  </SectionReveal>
);

const SkillsSection = () => (
  <section id="skills" className="py-24">
    <SectionReveal>
      <SectionLabel icon={<Code size={13} />} text="Technical Arsenal" />
      <h2
        className="text-3xl md:text-4xl font-bold mb-12"
        style={{ color: '#f1f5f9', letterSpacing: '-0.01em' }}
      >
        Tools of the Trade
      </h2>
    </SectionReveal>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {SKILLS.map((skill, i) => (
        <SkillCard key={i} skill={skill} index={i} />
      ))}
    </div>
  </section>
);

// ─── PROJECTS ────────────────────────────────────────────────────────────────

const ProjectCard = ({ project, delay }: { project: typeof PROJECTS[0]; delay: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <SectionReveal delay={delay}>
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="block group relative"
        data-hover
      >
        <div
          className="rounded-2xl p-6 h-full flex flex-col relative overflow-hidden transition-all duration-300"
          style={{
            background: '#141e33',
            border: hovered
              ? `1px solid ${project.statusColor}40`
              : '1px solid rgba(56,189,248,0.10)',
            boxShadow: hovered
              ? `6px 6px 20px rgba(0,0,0,0.55), 0 0 28px ${project.statusColor}18, inset 1px 1px 2px rgba(255,255,255,0.07)`
              : '6px 6px 20px rgba(0,0,0,0.55), -3px -3px 10px rgba(255,255,255,0.03), inset 1px 1px 2px rgba(255,255,255,0.07), inset -1px -1px 2px rgba(0,0,0,0.45)',
          }}
        >
          {/* Scan line on hover */}
          {hovered && (
            <motion.div
              initial={{ top: 0 }}
              animate={{ top: '110%' }}
              transition={{ duration: 0.9, ease: 'linear' }}
              className="absolute left-0 right-0 h-px z-10 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent, ${project.statusColor}, transparent)`,
                boxShadow: `0 0 8px ${project.statusColor}`,
              }}
            />
          )}

          {/* Header row */}
          <div className="flex items-center justify-between mb-5">
            <span className="font-mono text-xs" style={{ color: '#475569' }}>
              #{project.id}
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                color: project.statusColor,
                background: project.statusBg,
                border: `1px solid ${project.statusColor}40`,
              }}
            >
              {project.statusIcon}
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-xl font-bold mb-1"
            style={{ color: '#f1f5f9' }}
          >
            {project.title}
          </h3>
          <p className="text-xs font-mono uppercase tracking-wide mb-4" style={{ color: '#38bdf8' }}>
            {project.type}
          </p>

          {/* Description */}
          <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#64748b' }}>
            {project.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-md font-mono"
                style={{
                  background: 'rgba(56,189,248,0.07)',
                  border: '1px solid rgba(56,189,248,0.15)',
                  color: '#94a3b8',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Link row */}
          <div
            className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all duration-200"
            style={{ color: '#38bdf8' }}
          >
            <ExternalLink size={14} />
            View on GitHub
          </div>
        </div>
      </motion.a>
    </SectionReveal>
  );
};

const ProjectsSection = () => (
  <section id="projects" className="py-24">
    <SectionReveal>
      <SectionLabel icon={<Shield size={13} />} text="Case Files" />
      <h2
        className="text-3xl md:text-4xl font-bold mb-12"
        style={{ color: '#f1f5f9', letterSpacing: '-0.01em' }}
      >
        Ops I've Run
      </h2>
    </SectionReveal>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PROJECTS.map((p, i) => (
        <ProjectCard key={p.id} project={p} delay={i * 90} />
      ))}
    </div>
  </section>
);

// ─── CONTACT ─────────────────────────────────────────────────────────────────

const ContactSection = () => (
  <section id="contact" className="py-24 pb-32">
    <SectionReveal>
      <div className="max-w-2xl mx-auto text-center">
        <Card glow className="py-14 px-8">
          {/* Pulsing icon */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div
              className="absolute inset-0 rounded-2xl animate-pulse"
              style={{
                background: 'rgba(56,189,248,0.15)',
                animationDuration: '2s',
              }}
            />
            <div
              className="relative w-16 h-16 rounded-2xl bg-sky-500 flex items-center justify-center"
              style={{
                boxShadow:
                  '0 0 30px rgba(56,189,248,0.40), inset 1px 1px 2px rgba(255,255,255,0.25)',
              }}
            >
              <Mail size={26} className="text-white" />
            </div>
          </div>

          <SectionLabel icon={<Lock size={12} />} text="Open Channel" />

          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#f1f5f9', letterSpacing: '-0.01em' }}
          >
            Let's Talk Security
          </h2>
          <p className="leading-relaxed mb-10 max-w-md mx-auto" style={{ color: '#64748b' }}>
            Whether you want to talk security research, cloud infrastructure, or
            just connect — my inbox is always open.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="mailto:mahdraihan@outlook.com" className="text-base px-8 py-3.5">
              <Mail size={17} />
              Send Encrypted Mail
            </Button>
            <Button
              href="https://github.com/Tekoh"
              variant="secondary"
              className="text-base px-8 py-3.5"
            >
              <GithubIcon size={17} />
              GitHub Profile
            </Button>
          </div>
        </Card>
      </div>
    </SectionReveal>
  </section>
);

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: '#0b1120' }}>
      <CustomCursor />

      <AnimatePresence>{!loaded && <LoadingScreen />}</AnimatePresence>

      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <FloatingShapes />
          <Navbar />

          <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>

          <footer
            className="relative z-10 py-8 text-center text-sm"
            style={{
              color: '#334155',
              borderTop: '1px solid rgba(56,189,248,0.08)',
            }}
          >
            © {new Date().getFullYear()} Mahd Raihan
          </footer>
        </motion.div>
      )}
    </div>
  );
}
