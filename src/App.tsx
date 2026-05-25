import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, Shield, Cpu, Code, Wifi, Lock, ChevronRight,
  FileText, AlertCircle, Eye, Server, Mail, Database, Cloud
} from 'lucide-react';

// --- CONFIGURATION & DATA ---

const COLORS = {
  bg: '#0a0a0a',
  primary: '#00ff41', // Matrix Green
  secondary: '#008F11', // Darker Green
  alert: '#ef4444', // Red
  dim: '#4ade80', // Light Green
};

const BOOT_SEQUENCE = [
  "INITIALIZING KERNEL...",
  "LOADING MODULES: [ REACT, TAILWIND, FRAMER_MOTION ]",
  "MOUNTING /DEV/SDA1 (ROOT)... [ OK ]",
  "ESTABLISHING SECURE CONNECTION...",
  "BYPASSING FIREWALL...",
  "ACCESS GRANTED."
];

const SKILLS = [
  { name: "Python & JavaScript", level: 90, icon: <Code size={16} /> },
  { name: "SQL, MySQL & SQLite", level: 85, icon: <Database size={16} /> },
  { name: "Linux & Kali Env", level: 80, icon: <Terminal size={16} /> },
  { name: "Virtual Machines (Local)", level: 85, icon: <Server size={16} /> },
  { name: "Cloud Infrastructure & VM Deployment", level: 80, icon: <Cloud size={16} /> },
  { name: "Threat Hunting & Vuln Analysis", level: 75, icon: <Shield size={16} /> },
];

const PROJECTS = [
  {
    id: "0x01",
    title: "Project: UNI_SHARE",
    type: "Vulnerability Remediation",
    status: "SECURED",
    desc: "A vulnerable application that underwent rigorous threat detection and vulnerability assessment, resulting in the remediation of 60+ security flaws.",
    url: "https://github.com/Tekoh/UniShareApplication.git"
  },
  {
    id: "0x02",
    title: "Project: ST_ALPHONSUS",
    type: "Backend Sys / Database",
    status: "ACTIVE",
    desc: "A robust school management tool engineered with a focus on backend architecture, utilizing MySQL for secure and structured data processing.",
    url: "https://github.com/Tekoh/StAlphonsusManagementTool.git"
  },
  {
    id: "0x03",
    title: "Project: D.ROID_SECURE",
    type: "E-Commerce Framework",
    status: "PUBLIC",
    desc: "An e-commerce web application developed to solidify full-stack web development skills and practice secure deployment methodologies.",
    url: "https://github.com/Tekoh/D.RoidSecure-Website.git"
  },
];

// --- UTILITY COMPONENTS ---

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789Z';
    const characters = katakana.split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) drops[i] = 1;

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0" />;
};

const CRTOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden h-screen w-screen">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
  </div>
);

const GlitchText = ({ text, as: Component = 'h2', className = "" }: { text: string, as?: React.ElementType, className?: string }) => {
  return (
    <Component className={`relative inline-block group ${className}`} style={{ fontFamily: '"JetBrains Mono", monospace' }}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-green-500 opacity-0 group-hover:opacity-70 animate-pulse translate-x-[2px]">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 animate-pulse -translate-x-[2px]">{text}</span>
    </Component>
  );
};

// --- SECTIONS ---

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let delay = 0;
    BOOT_SEQUENCE.forEach((line, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === BOOT_SEQUENCE.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col justify-end p-8 font-mono text-green-500 text-sm md:text-base leading-relaxed">
      {lines.map((line, i) => (
        <div key={i}>{`> ${line}`}</div>
      ))}
      <div className="animate-pulse mt-2">_</div>
    </div>
  );
};

const HeroSection = () => {
    const fullText = "MAHD R. // CYBER & CLOUD SECURITY";
    const [text, setText] = useState("");

    useEffect(() => {
        let i = 0;
        const typing = setInterval(() => {
            if (i < fullText.length) {
                setText(prev => prev + fullText.charAt(i));
                i++;
            } else {
                clearInterval(typing);
            }
        }, 50);
        return () => clearInterval(typing);
    }, []);

    return (
        <section className="min-h-[80vh] flex flex-col justify-center border-b border-green-900/30 pb-10">
            <div className="flex items-center gap-2 mb-4 text-green-700 text-sm">
                <Terminal size={16} />
                <span>/usr/bin/welcome</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight">
                <GlitchText text={text} as="span" />
                <span className="animate-pulse text-green-500">_</span>
            </h1>
            <p className="max-w-xl text-green-400/80 text-lg md:text-xl font-light">
                Cybersecurity student at UA92 analyzing threats and deploying resilient cloud infrastructure.
            </p>
        </section>
    );
};

const AboutSection = () => (
    <section className="py-20 border-b border-green-900/30">
        <div className="flex items-center gap-2 mb-8 text-green-500">
            <Cpu size={20} />
            <h2 className="text-2xl font-bold tracking-widest">SYSTEM_STATS (/whoami)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-900/10 border border-green-500/20 p-6 font-mono text-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-50"><Lock size={16} /></div>
                <ul className="space-y-4 text-green-300">
                    <li className="flex justify-between"><span>[ USER ]</span> <span className="text-white">Mahd Raihan</span></li>
                    <li className="flex justify-between"><span>[ ROLE ]</span> <span className="text-white">CyberSecurity Student</span></li>
                    <li className="flex justify-between"><span>[ LOCATION ]</span> <span className="text-white">Encrypted Node (UK)</span></li>
                    <li className="flex justify-between"><span>[ UPTIME ]</span> <span className="text-white">99.998%</span></li>
                </ul>
            </div>
            <div className="text-green-400/80 leading-relaxed text-sm md:text-base border-l-2 border-green-500/50 pl-6">
                <p className="mb-4">
                    Currently a student at UA92, deeply interested in cloud and cybersecurity. I execute code with surgical precision and focus on bridging the gap between robust backend systems and secure networking.
                </p>
                <p>
                    My objective is to construct resilient digital fortresses, hunt for threats, and deploy scalable cloud environments.
                </p>
            </div>
        </div>
    </section>
);

const SkillsSection = () => (
    <section className="py-20 border-b border-green-900/30">
        <div className="flex items-center gap-2 mb-8 text-green-500">
            <AlertCircle size={20} />
            <h2 className="text-2xl font-bold tracking-widest">DIAGNOSTICS</h2>
        </div>
        <div className="space-y-6">
            {SKILLS.map((skill, i) => (
                <div key={i} className="group">
                    <div className="flex justify-between mb-2 text-xs text-green-400 uppercase tracking-wider">
                        <span className="flex items-center gap-2">{skill.icon} {skill.name}</span>
                        <span>{skill.level}% LOAD</span>
                    </div>
                    <div className="h-4 w-full bg-green-900/20 border border-green-900/50 relative">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            className="h-full bg-green-500 relative"
                        >
                            <div className="absolute top-0 right-0 w-1 h-full bg-white animate-pulse shadow-[0_0_10px_#fff]" />
                        </motion.div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const ProjectsSection = () => (
    <section className="py-20 border-b border-green-900/30">
        <div className="flex items-center gap-2 mb-8 text-green-500">
            <FileText size={20} />
            <h2 className="text-2xl font-bold tracking-widest">MISSION_LOGS</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
                <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={project.id}
                    whileHover={{ scale: 1.02 }}
                    className="block border border-green-500/30 bg-black p-6 cursor-pointer hover:border-green-400 hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] transition-all"
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs text-green-700 border border-green-900 px-2 py-0.5">{project.id}</span>
                        <Lock size={14} className={project.status === 'CLASSIFIED' ? 'text-red-500' : 'text-green-500'} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 font-mono">{project.title}</h3>
                    <p className="text-xs text-green-500 mb-4 uppercase">[{project.type}]</p>
                    <p className="text-sm text-gray-400 mb-6 font-light">{project.desc}</p>
                    <div className="flex items-center text-green-400 text-xs font-bold gap-1 group">
                        <span>DECRYPT FILE (GITHUB)</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </motion.a>
            ))}
        </div>
    </section>
);

const ContactSection = () => (
    <section className="py-20 mb-20 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-8 text-green-500">
            <Mail size={20} />
            <h2 className="text-2xl font-bold tracking-widest">ENCRYPTED_CHANNEL</h2>
        </div>
        <p className="text-sm text-green-400/80 mb-8 text-center max-w-md font-light">
            Direct node to my secure inbox. Ready to discuss security assessments, cloud infrastructure deployments, or general networking.
        </p>
        <a
            href="mailto:mahdraihan@outlook.com"
            className="relative group overflow-hidden border border-green-500 bg-green-900/10 px-8 py-4 w-full max-w-md hover:bg-green-500 transition-colors text-center block"
        >
            <div className="flex items-center justify-center gap-4 text-green-400 group-hover:text-black">
                <Mail size={20} />
                <span className="font-mono font-bold tracking-widest uppercase">ESTABLISH_CONNECTION</span>
            </div>
        </a>
    </section>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;400;700&display=swap');
          body { background-color: #0a0a0a; overflow-x: hidden; }
          ::selection { background: #00ff41; color: #000; }
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #0a0a0a; }
          ::-webkit-scrollbar-thumb { background: #003300; border: 1px solid #00ff41; }
        `}
      </style>

      <div className="min-h-screen bg-[#0a0a0a] text-[#00ff41] font-mono relative">
        <CRTOverlay />

        <AnimatePresence>
          {!booted && (
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BootScreen onComplete={() => setBooted(true)} />
            </motion.div>
          )}
        </AnimatePresence>

        {booted && (
          <>
            <MatrixRain />

            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10 max-w-5xl mx-auto px-6 md:px-12"
            >
              <header className="fixed top-0 left-0 w-full p-4 flex justify-between items-center z-40 bg-black/80 backdrop-blur-sm border-b border-green-900/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs tracking-widest opacity-70">SECURE_TERM_V.2.0.4</span>
                </div>
                <div className="text-xs opacity-50 hidden md:block">
                  IPv6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
                </div>
              </header>

              <div className="mt-20">
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <ContactSection />
              </div>

              <footer className="py-6 text-center text-xs text-green-800 border-t border-green-900/30">
                <p>SYSTEM STATUS: STABLE | © {new Date().getFullYear()} MAHD RAIHAN</p>
              </footer>
            </motion.main>
          </>
        )}
      </div>
    </>
  );
}
