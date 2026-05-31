import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Code, Database, Terminal, Server, Cloud,
  ExternalLink, Mail, Cpu, User, MapPin, ChevronRight,
} from 'lucide-react';

import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { FloatingShapes } from './components/FloatingShapes';
import { Card } from './components/Card';
import { Button } from './components/Button';
import { SectionReveal } from './components/SectionReveal';

// --- DATA ---

const SKILLS = [
  { name: 'Python & JavaScript', level: 90, icon: <Code size={15} /> },
  { name: 'SQL, MySQL & SQLite', level: 85, icon: <Database size={15} /> },
  { name: 'Linux & Kali Linux', level: 80, icon: <Terminal size={15} /> },
  { name: 'Virtualisation & Hypervisors', level: 85, icon: <Server size={15} /> },
  { name: 'Cloud Infrastructure & VM Deployment', level: 80, icon: <Cloud size={15} /> },
  { name: 'Threat Hunting & Vulnerability Analysis', level: 75, icon: <Shield size={15} /> },
];

const PROJECTS = [
  {
    id: '01',
    title: 'UniShare',
    type: 'Vulnerability Remediation',
    status: 'Secured',
    desc: 'Conducted a full security audit on a deliberately vulnerable application — identifying and remediating 60+ flaws including injection vulnerabilities, broken authentication, and misconfigured access controls.',
    url: 'https://github.com/Tekoh/UniShareApplication',
  },
  {
    id: '02',
    title: 'St. Alphonsus',
    type: 'Backend / Database',
    status: 'Active',
    desc: 'A full-featured school management system built with a focus on database integrity and backend architecture, using MySQL for structured, relational data management.',
    url: 'https://github.com/Tekoh/StAlphonsusManagementTool',
  },
  {
    id: '03',
    title: 'D.Roid Secure',
    type: 'E-Commerce',
    status: 'Public',
    desc: 'A full-stack e-commerce platform applying real-world web development practices — including secure session handling, input validation, and structured deployment workflows.',
    url: 'https://github.com/Tekoh/D.RoidSecure-Website',
  },
];

const STATUS_STYLES: Record<string, string> = {
  Secured: 'bg-emerald-100 text-emerald-700',
  Active:  'bg-blue-100 text-blue-700',
  Public:  'bg-violet-100 text-violet-700',
};

// --- LOADING SCREEN ---

const LoadingScreen = () => (
  <motion.div
    exit={{ opacity: 0 }}
    transition={{ duration: 0.7, ease: 'easeInOut' }}
    className="fixed inset-0 z-[100] flex items-center justify-center"
    style={{ background: '#edf2fb' }}
  >
    <div className="flex flex-col items-center gap-5">
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-16 h-16 rounded-2xl bg-violet-500 flex items-center justify-center"
        style={{
          boxShadow:
            '8px 8px 20px rgba(124,58,237,0.25), -4px -4px 12px rgba(255,255,255,0.95), inset 2px 2px 5px rgba(255,255,255,0.30), inset -2px -2px 5px rgba(0,0,0,0.12)',
        }}
      >
        <Shield size={28} className="text-white" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm font-medium tracking-wide"
        style={{ color: '#64748b' }}
      >
        Loading portfolio…
      </motion.p>
    </div>
  </motion.div>
);

// --- HERO ---

const HeroSection = () => (
  <section id="hero" className="min-h-screen flex flex-col justify-center pt-28 pb-16">
    <SectionReveal>
      <div
        className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full mb-8 w-fit"
        style={{
          background: '#ede9fe',
          color: '#5b21b6',
          boxShadow:
            '4px 4px 12px rgba(0,0,0,0.08), -2px -2px 8px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80)',
        }}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
        Available for opportunities
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-4" style={{ color: '#1e1b4b' }}>
        Mahd Raihan
      </h1>

      <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: '#7c3aed' }}>
        Cybersecurity &amp; Cloud Security
      </h2>

      <p className="max-w-lg text-lg leading-relaxed mb-10" style={{ color: '#64748b' }}>
        Aspiring security engineer at UA92 — focused on threat analysis,
        vulnerability research, and building resilient cloud infrastructure.
      </p>

      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() =>
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          View Projects
          <ChevronRight size={16} />
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Contact Me
        </Button>
      </div>
    </SectionReveal>
  </section>
);

// --- ABOUT ---

const STATS = [
  { icon: <User size={14} />,   label: 'Name',     value: 'Mahd Raihan' },
  { icon: <Shield size={14} />, label: 'Role',     value: 'Cybersecurity & Cloud Security Student' },
  { icon: <MapPin size={14} />, label: 'Location', value: 'United Kingdom' },
  { icon: <Cpu size={14} />,    label: 'Uptime',   value: '99.998%' },
];

const AboutSection = () => (
  <section id="about" className="py-24">
    <SectionReveal>
      <p className="text-xs font-mono font-semibold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#7c3aed' }}>
        <Cpu size={13} /> About Me
      </p>
      <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: '#1e1b4b' }}>
        Who Am I?
      </h2>
    </SectionReveal>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SectionReveal delay={100}>
        <Card>
          <ul className="space-y-5">
            {STATS.map(({ icon, label, value }) => (
              <li key={label} className="flex items-start gap-3">
                <span
                  className="mt-0.5 w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: '#ede9fe',
                    color: '#7c3aed',
                    boxShadow:
                      '4px 4px 10px rgba(0,0,0,0.08), -2px -2px 6px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80)',
                  }}
                >
                  {icon}
                </span>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider mb-0.5" style={{ color: '#64748b' }}>
                    {label}
                  </p>
                  <p className="font-medium text-sm" style={{ color: '#1e1b4b' }}>
                    {value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </SectionReveal>

      <SectionReveal delay={200}>
        <Card className="flex flex-col justify-center">
          <p className="leading-relaxed mb-4" style={{ color: '#64748b' }}>
            I'm a Cybersecurity student at UA92 with a strong interest in cloud
            security and offensive security techniques. I enjoy building systems,
            understanding how they break, and hardening them against real-world threats.
          </p>
          <p className="leading-relaxed" style={{ color: '#64748b' }}>
            My focus sits at the intersection of backend engineering and cloud
            infrastructure — where secure design decisions have the most impact.
          </p>
        </Card>
      </SectionReveal>
    </div>
  </section>
);

// --- SKILLS ---

const SkillsSection = () => (
  <section id="skills" className="py-24">
    <SectionReveal>
      <p className="text-xs font-mono font-semibold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#7c3aed' }}>
        <Code size={13} /> Technical Skills
      </p>
      <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: '#1e1b4b' }}>
        What I Work With
      </h2>
    </SectionReveal>

    <Card>
      <div className="space-y-7">
        {SKILLS.map((skill, i) => (
          <SectionReveal key={i} delay={i * 70}>
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <span className="flex items-center gap-2 text-sm font-medium" style={{ color: '#1e1b4b' }}>
                  <span style={{ color: '#7c3aed' }}>{skill.icon}</span>
                  {skill.name}
                </span>
                <span className="text-xs font-mono font-semibold" style={{ color: '#7c3aed' }}>
                  {skill.level}%
                </span>
              </div>

              {/* Inset trough */}
              <div
                className="h-3 w-full rounded-full overflow-hidden"
                style={{
                  background: '#f3f0ff',
                  boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.08), inset -1px -1px 3px rgba(255,255,255,0.90)',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: i * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #a78bfa 0%, #7c3aed 100%)',
                    boxShadow: '2px 0 10px rgba(124,58,237,0.45)',
                  }}
                />
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </Card>
  </section>
);

// --- PROJECTS ---

const ProjectsSection = () => (
  <section id="projects" className="py-24">
    <SectionReveal>
      <p className="text-xs font-mono font-semibold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#7c3aed' }}>
        <Shield size={13} /> Projects
      </p>
      <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: '#1e1b4b' }}>
        Things I've Built
      </h2>
    </SectionReveal>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PROJECTS.map((project, i) => (
        <SectionReveal key={project.id} delay={i * 100}>
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            className="block group h-full"
            data-cursor-hover
          >
            <div
              className="bg-white rounded-3xl p-6 h-full flex flex-col transition-shadow duration-300"
              style={{
                boxShadow:
                  '8px 8px 20px rgba(0,0,0,0.10), -4px -4px 12px rgba(255,255,255,0.95), inset 2px 2px 5px rgba(255,255,255,0.85), inset -2px -2px 5px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '12px 12px 30px rgba(0,0,0,0.12), -6px -6px 16px rgba(255,255,255,0.98), inset 3px 3px 8px rgba(255,255,255,0.90), inset -3px -3px 8px rgba(0,0,0,0.07)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '8px 8px 20px rgba(0,0,0,0.10), -4px -4px 12px rgba(255,255,255,0.95), inset 2px 2px 5px rgba(255,255,255,0.85), inset -2px -2px 5px rgba(0,0,0,0.06)';
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs" style={{ color: '#94a3b8' }}>
                  #{project.id}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[project.status]}`}
                >
                  {project.status}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-1.5" style={{ color: '#1e1b4b' }}>
                {project.title}
              </h3>
              <p className="text-xs font-mono uppercase tracking-wide mb-4" style={{ color: '#7c3aed' }}>
                {project.type}
              </p>
              <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: '#64748b' }}>
                {project.desc}
              </p>

              <div
                className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all duration-200"
                style={{ color: '#7c3aed' }}
              >
                <ExternalLink size={14} />
                View on GitHub
              </div>
            </div>
          </motion.a>
        </SectionReveal>
      ))}
    </div>
  </section>
);

// --- CONTACT ---

const ContactSection = () => (
  <section id="contact" className="py-24 pb-32">
    <SectionReveal>
      <div className="max-w-2xl mx-auto text-center">
        <div
          className="w-16 h-16 rounded-2xl bg-violet-500 flex items-center justify-center mx-auto mb-6"
          style={{
            boxShadow:
              '8px 8px 20px rgba(124,58,237,0.25), -4px -4px 12px rgba(255,255,255,0.95), inset 2px 2px 5px rgba(255,255,255,0.30), inset -2px -2px 5px rgba(0,0,0,0.12)',
          }}
        >
          <Mail size={28} className="text-white" />
        </div>

        <p className="text-xs font-mono font-semibold uppercase tracking-widest mb-3" style={{ color: '#7c3aed' }}>
          Get In Touch
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: '#1e1b4b' }}>
          Let's Connect
        </h2>
        <p className="leading-relaxed mb-10 max-w-md mx-auto" style={{ color: '#64748b' }}>
          Whether you want to talk security research, cloud infrastructure, or
          just connect — my inbox is always open.
        </p>

        <Button href="mailto:mahdraihan@outlook.com" className="text-base px-8 py-4 mx-auto">
          <Mail size={18} />
          Send Me an Email
        </Button>
      </div>
    </SectionReveal>
  </section>
);

// --- APP ---

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: '#edf2fb' }}>
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
            className="relative z-10 py-8 text-center text-sm border-t"
            style={{ color: '#94a3b8', borderColor: 'rgba(226,232,240,0.8)' }}
          >
            © {new Date().getFullYear()} Mahd Raihan — Built with React &amp; Tailwind CSS
          </footer>
        </motion.div>
      )}
    </div>
  );
}
