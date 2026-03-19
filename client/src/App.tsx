import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Terminal,
  Cpu,
  Globe,
  Moon,
  Sun,
  Menu,
  X,
  ChevronRight,
  GitPullRequest,
  Star,
  Download,
  Send,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from './lib/cn';
import { portfolioApi } from './services/api';
import type { Experience, OpenSourceContribution, Project, SkillCategory } from './types';

const iconMap = {
  Code2: <Code2 className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
};

const fallbackSkills: SkillCategory[] = [
  { _id: '1', category: 'Languages', icon: 'Code2', skills: ['TypeScript', 'JavaScript', 'Python', 'C++', 'Solidity'], order: 1 },
  { _id: '2', category: 'Frontend', icon: 'Globe', skills: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'], order: 2 },
  { _id: '3', category: 'Backend & DB', icon: 'Terminal', skills: ['Node.js', 'Express', 'MongoDB'], order: 3 },
  { _id: '4', category: 'Blockchain', icon: 'Cpu', skills: ['Ethereum', 'Ethers.js', 'IPFS'], order: 4 },
];

const fallbackProjects: Project[] = [
  {
    _id: '1',
    title: 'SoundStake',
    description:
      'A decentralized music streaming platform leveraging IPFS for storage and Ethereum for royalty distribution. Implemented gas-optimized smart contracts.',
    tags: ['Solidity', 'React', 'IPFS', 'Ethereum'],
    githubUrl: 'https://soundstake.vercel.app/',
    demoUrl: 'https://github.com/sumit0770/Sound_Stake',
    featured: true,
    order: 1,
  },
  {
    _id: '2',
    title: 'CodeSync',
    description:
      'Cross-platform code synchronization utility that maintains consistency of codebases across multiple devices.',
    tags: ['Python', 'Cloud APIs', 'Git'],
    githubUrl: 'https://github.com/sumit0770/Code-Sync',
    demoUrl: 'https://github.com/sumit0770/Code-Sync',
    featured: true,
    order: 2,
  },
];

const fallbackOpenSource: OpenSourceContribution[] = [
  {
    _id: '1',
    repo: 'sunny2kk9/Blockchain',
    title: 'PR #17: Feature Implementation',
    description: 'Contributed core logic improvements to enhance transaction validation speed.',
    status: 'Merged',
    url: 'https://github.com/sunny2kk9/Blockchain/pull/17',
    order: 1,
  },
];

const fallbackExperience: Experience[] = [
  {
    _id: '1',
    role: 'Operating System Expert',
    company: 'Turing',
    period: 'Feb 2026 - Present',
    description: 'Executed complex system-level workflows and provided technical walkthroughs to refine agent reasoning.',
    order: 1,
  },
];

const SectionHeading = ({ children, subtitle }: { children: ReactNode; subtitle?: string }) => (
  <div className="mb-14 md:mb-20 text-center">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-28 h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 mx-auto mt-6 rounded-full" />
  </div>
);

const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div
    className={cn(
      'glass rounded-2xl p-6 transition-all duration-300 shadow-lg shadow-slate-900/5 dark:shadow-black/20',
      'hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10',
      className
    )}
  >
    {children}
  </div>
);

const Badge = ({ children, color = 'blue' }: { children: ReactNode; color?: 'blue' | 'green' | 'purple' | 'orange' }) => {
  const colors = {
    blue: 'bg-blue-100/80 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    green: 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    purple: 'bg-purple-100/80 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    orange: 'bg-orange-100/80 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  };

  return <span className={cn('px-3 py-1 rounded-full text-xs font-semibold border border-white/60 dark:border-slate-700/60', colors[color])}>{children}</span>;
};

const Navbar = ({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['about', 'skills', 'projects', 'opensource', 'experience', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.15, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Open Source', href: '#opensource' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        isScrolled ? 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-white/50 dark:border-slate-800/80 py-4 shadow-lg shadow-slate-900/5' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-2xl font-black tracking-tight text-gradient">
          Sumit.dev
        </a>

        <div className="hidden md:flex items-center gap-2 p-1.5 rounded-full glass">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300',
                activeSection === link.href.replace('#', '')
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
              )}
            >
              {link.name}
            </a>
          ))}
          <button onClick={toggleTheme} className="p-2.5 rounded-full glass transition-colors text-slate-600 dark:text-slate-300">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleTheme} className="p-2.5 rounded-full glass transition-colors text-slate-600 dark:text-slate-300">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2.5 glass rounded-full text-slate-600 dark:text-slate-300">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden glass border-b border-white/40 dark:border-slate-800/80 overflow-hidden">
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await portfolioApi.sendMessage(form);
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send message. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-white/40 dark:bg-slate-900/40">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Have a project in mind or want to collaborate?">Get In Touch</SectionHeading>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <Card className="rounded-3xl h-full">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Let’s build something unforgettable.</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">I’m open to collaborations, internships, and impactful projects. Reach out and I’ll get back quickly.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400"><Mail size={24} /></div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                  <a href="mailto:sangalesumitcp@gmail.com" className="text-lg font-semibold text-slate-900 dark:text-white hover:text-indigo-500 transition-colors">sangalesumitcp@gmail.com</a>
                </div>
              </div>
            </div>
          </Card>
          <form className="space-y-4 glass rounded-3xl p-6 md:p-8" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/30"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/30"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
              <textarea
                rows={4}
                required
                minLength={10}
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/30"
                placeholder="Your message here..."
              />
            </div>
            <button disabled={submitting} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-70 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30">
              {submitting ? 'Sending...' : 'Send Message'} <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [skills, setSkills] = useState<SkillCategory[]>(fallbackSkills);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [contributions, setContributions] = useState<OpenSourceContribution[]>(fallbackOpenSource);
  const [experience, setExperience] = useState<Experience[]>(fallbackExperience);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = storedTheme ? storedTheme === 'dark' : isSystemDark;
    setIsDark(shouldUseDark);
    if (shouldUseDark) document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, skillsData, openSourceData, experienceData] = await Promise.all([
          portfolioApi.getProjects(),
          portfolioApi.getSkills(),
          portfolioApi.getOpenSource(),
          portfolioApi.getExperience(),
        ]);

        if (projectsData.length) setProjects(projectsData);
        if (skillsData.length) setSkills(skillsData);
        if (openSourceData.length) setContributions(openSourceData);
        if (experienceData.length) setExperience(experienceData);
      } catch {
        console.warn('Using fallback portfolio data.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScrollProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    handleScrollProgress();
    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    window.addEventListener('resize', handleScrollProgress);
    return () => {
      window.removeEventListener('scroll', handleScrollProgress);
      window.removeEventListener('resize', handleScrollProgress);
    };
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-50 transition-colors duration-300 overflow-x-hidden">
      <div className="fixed top-0 left-0 z-[60] h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" style={{ width: `${scrollProgress}%` }} />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <section className="min-h-screen flex items-center justify-center pt-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[28rem] h-[28rem] bg-indigo-500/25 rounded-full blur-3xl" />
          <div className="absolute bottom-[-15%] left-[-8%] w-[26rem] h-[26rem] bg-violet-500/25 rounded-full blur-3xl" />
          <div className="absolute top-[30%] left-[35%] w-[20rem] h-[20rem] bg-cyan-400/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 section-noise opacity-60" />
        </div>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-indigo-700 dark:text-indigo-300 mb-8">
                <Star size={16} className="fill-current" />
                <span className="text-sm font-semibold tracking-wide uppercase">GSoC 2026 Applicant</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-[0.95]">
                Building ideas into <span className="text-gradient">impactful products</span>.
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl font-light leading-relaxed mx-auto lg:mx-0">
                Hi, I’m Sumit — a Computer Science student and open-source contributor focused on scalable systems, developer tools, and decentralized applications.
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                <a href="#projects" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-full font-semibold transition-all hover:scale-105 flex items-center gap-2 shadow-xl shadow-indigo-600/30">View Projects <ChevronRight size={20} /></a>
                <a href="#contact" className="px-8 py-4 glass text-slate-900 dark:text-white rounded-full font-semibold transition-all hover:scale-105">Contact Me</a>
                <a href="#" className="p-4 rounded-full glass text-slate-600 dark:text-slate-300 hover:text-indigo-500" title="Download CV"><Download size={20} /></a>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-cyan-500/20 blur-2xl" />
              <Card className="relative rounded-[2rem] p-6 md:p-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">portfolio.config.ts</p>
                </div>

                <pre className="text-sm md:text-[15px] leading-7 text-left overflow-x-auto text-slate-700 dark:text-slate-300">
{`const developer = {
  name: "Sumit Sangale",
  focus: ["MERN", "Web3", "Open Source"],
  mindset: "Build clean. Ship fast. Scale well.",
};`}
                </pre>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Projects Built', value: `${projects.length}+` },
                    { label: 'Open Source PRs', value: `${contributions.length}+` },
                    { label: 'Core Skill Areas', value: `${skills.length}+` },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-700/70 px-4 py-3">
                      <p className="text-xl font-black text-slate-900 dark:text-white">{item.value}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{item.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
          <div className="mt-10 flex justify-center">
            <a href="#about" className="text-xs tracking-[0.25em] uppercase text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">
              Scroll to explore
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative max-w-md mx-auto">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 opacity-25 blur-xl" />
                <Card className="relative rounded-3xl p-8 md:p-10 text-center">
                  <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-4xl mb-5 shadow-lg shadow-indigo-500/30">
                    👨‍💻
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Sumit Sangale</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">Full-Stack & Blockchain Developer</p>
                </Card>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionHeading subtitle="I design and build reliable software with attention to performance, architecture, and user experience.">
                About Me
              </SectionHeading>
              <div className="space-y-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                <p>
                  I enjoy turning complex problems into elegant products—whether that means creating polished user interfaces, designing robust APIs, or optimizing systems under the hood.
                </p>
                <p>
                  My focus areas include modern JavaScript ecosystems, backend engineering with Node.js, and decentralized applications with Solidity.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 md:py-32 bg-white/40 dark:bg-slate-900/40">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="My technical toolkit and areas of expertise.">Technical Skills</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((category, idx) => (
              <motion.div key={category._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <Card className="h-full rounded-3xl hover:border-indigo-500/40">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-violet-500/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                    {iconMap[category.icon as keyof typeof iconMap] || <Code2 className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 rounded-md text-sm font-semibold border border-slate-200/70 dark:border-slate-700/70">{skill}</span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Showcasing my best work in web development and blockchain.">Featured Projects</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div key={project._id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <Card className="h-full flex flex-col group rounded-3xl overflow-hidden relative">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" />
                  <div className="mb-4 flex justify-between items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400"><Code2 size={24} /></div>
                    <div className="flex gap-2">
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-white/70 dark:hover:bg-slate-800 text-slate-500 hover:text-indigo-600"><Github size={20} /></a>
                      <a href={project.demoUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-white/70 dark:hover:bg-slate-800 text-slate-500 hover:text-indigo-600"><ExternalLink size={20} /></a>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/70 dark:border-slate-700/70">{tag}</span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="opensource" className="py-20 md:py-32 bg-white/40 dark:bg-slate-900/40">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="My contributions to the open source community.">Open Source Contributions</SectionHeading>
          <div className="max-w-4xl mx-auto space-y-6">
            {contributions.map((contrib, idx) => (
              <motion.div key={contrib._id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <Card className="flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-green-500/40 rounded-2xl">
                  <div className="p-3 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full text-green-600 dark:text-green-400 shrink-0"><GitPullRequest size={24} /></div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{contrib.title}</h3>
                      <Badge color="green">{contrib.status}</Badge>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-1">{contrib.description}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 font-mono">{contrib.repo}</p>
                  </div>
                  <a href={contrib.url} target="_blank" rel="noopener noreferrer" className="shrink-0 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-indigo-600">
                    <ExternalLink size={20} />
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="My professional journey and work history.">Experience</SectionHeading>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-violet-500 to-cyan-500 transform -translate-x-1/2" />
            {experience.map((exp, idx) => (
              <motion.div key={exp._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mb-12 last:mb-0">
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white dark:border-slate-900 transform -translate-x-1/2 mt-1.5 shadow-lg shadow-indigo-500/50" />
                <div className="ml-12 md:ml-0 md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className={cn('md:text-right', idx % 2 === 0 ? 'md:order-1' : 'md:order-2')}>
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">{exp.period}</span>
                  </div>
                  <div className={cn('mt-2 md:mt-0', idx % 2 === 0 ? 'md:order-2' : 'md:order-1')}>
                    <Card className="inline-block w-full rounded-2xl">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                      <p className="text-slate-600 dark:text-slate-400 font-medium mb-3">{exp.company}</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{exp.description}</p>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Contact />

      <footer className="py-12 bg-white/70 dark:bg-slate-950/70 border-t border-white/50 dark:border-slate-800/80 backdrop-blur-md">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-4 mb-8">
            <a href="https://github.com/sumit-sangale" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full glass inline-flex items-center justify-center text-slate-500 hover:text-indigo-600"><Github size={22} /></a>
            <a href="https://www.linkedin.com/in/sumit-sangale-420bb4283/" className="w-11 h-11 rounded-full glass inline-flex items-center justify-center text-slate-500 hover:text-indigo-600"><Linkedin size={22} /></a>
            <a href="mailto:sangalesumitcp@gmail.com" className="w-11 h-11 rounded-full glass inline-flex items-center justify-center text-slate-500 hover:text-indigo-600"><Mail size={22} /></a>
          </div>
          <p className="text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} Sumit Sangale. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
