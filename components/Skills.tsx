'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, 
  Smartphone, 
  Cloud, 
  Database, 
  CheckCircle2, 
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Code2
} from 'lucide-react';

interface TechCategory {
  id: string;
  label: string;
  icon: typeof Server;
  description: string;
  items: {
    name: string;
    highlight?: string;
  }[];
}

const techDomains: TechCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    icon: Code2,
    description: 'The languages I write production and project code in.',
    items: [
      { name: 'JavaScript', highlight: 'React, Next.js & Node.js' },
      { name: 'TypeScript', highlight: 'Merged PR in Microsoft VS Code' },
      { name: 'PHP', highlight: 'PHP/MySQL backends' },
      { name: 'Java', highlight: 'Spring Boot' },
      { name: 'Dart', highlight: 'Flutter apps' },
      { name: 'Python', highlight: 'Django' },
      { name: 'SQL', highlight: 'MySQL & SQL Server' },
      { name: 'C#' },
    ]
  },
  {
    id: 'frontend-mobile',
    label: 'Frontend & Mobile',
    icon: Smartphone,
    description: 'Cross-platform mobile apps and modern web interfaces.',
    items: [
      { name: 'React Native', highlight: 'Paige & Skillkoo, live on both stores' },
      { name: 'Expo', highlight: 'iOS & Android apps' },
      { name: 'Next.js', highlight: 'Voice AI integration & this site' },
      { name: 'React.js', highlight: 'Web interfaces' },
      { name: 'Flutter', highlight: 'Eduwings Android app' },
      { name: 'Tailwind CSS', highlight: 'This portfolio' },
      { name: 'HTML/CSS' },
    ]
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: Server,
    description: 'APIs, services, and scheduled jobs.',
    items: [
      { name: 'Node.js', highlight: 'Paige & GigJet' },
      { name: 'Express', highlight: 'Skillkoo backend' },
      { name: 'RESTful API Design' },
      { name: 'Scheduled Jobs (cron)', highlight: 'Voice AI analysis pipeline' },
      { name: 'Spring Boot', highlight: 'Tutored at Sheridan' },
      { name: 'Django', highlight: 'Tutored at Sheridan' },
    ]
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: Database,
    description: 'Document and relational data stores.',
    items: [
      { name: 'Firebase (Firestore)', highlight: 'Paige, Eduwings & Chatie' },
      { name: 'MySQL (phpMyAdmin)', highlight: 'PHP/MySQL work' },
      { name: 'MongoDB' },
      { name: 'SQL Server' },
    ]
  },
  {
    id: 'cloud-devops',
    label: 'Cloud & DevOps',
    icon: Cloud,
    description: 'Cloud services, containers, and CI/CD.',
    items: [
      { name: 'AWS (EC2, S3, RDS, Lambda)', highlight: 'S3 storage for Skillkoo' },
      { name: 'Docker' },
      { name: 'GitHub Actions' },
      { name: 'Jenkins' },
      { name: 'Vercel' },
      { name: 'CI/CD' },
    ]
  },
  {
    id: 'ai-tools',
    label: 'AI & Tools',
    icon: Sparkles,
    description: 'AI agents, developer tooling, and team workflow.',
    items: [
      { name: 'ElevenLabs Agents', highlight: 'Skillkoo voice agents' },
      { name: 'Eleven v3 Conversational', highlight: 'Real-time voice counseling' },
      { name: 'Claude Code' },
      { name: 'Selenium', highlight: '50+ tests automated at Evertz' },
      { name: 'Git' },
      { name: 'Jira' },
      { name: 'Agile/Scrum' },
    ]
  }
];

export default function Skills() {
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const displayedDomains = selectedTab === 'all' 
    ? techDomains 
    : techDomains.filter(d => d.id === selectedTab);

  return (
    <section id="skills" className="py-20 sm:py-24 px-6 sm:px-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-primary/10 dark:bg-secondary/15 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="liquid-glass-subtle inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary uppercase tracking-wider mb-3">
              <Layers size={13} />
              Technical Arsenal
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Core <span className="text-gradient">Tech Stack</span>.
            </h2>
            <p className="text-slate-600 dark:text-white/70 text-sm sm:text-base max-w-xl mt-2">
              Languages, frameworks, and tools I use across mobile, web, backend, and AI work.
            </p>
          </div>

          {/* Filter Pills — iOS Liquid Glass */}
          <div className="liquid-glass-subtle flex items-center gap-1.5 p-1 rounded-full self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                selectedTab === 'all'
                  ? 'bg-primary text-white border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.30),0_4px_12px_rgba(59,130,246,0.25)] backdrop-blur-xl font-semibold'
                  : 'liquid-glass-subtle text-slate-600 dark:text-white/70 border-transparent hover:border-white/15'
              }`}
            >
              All Domains
            </button>
            {techDomains.map((domain) => (
              <button
                key={domain.id}
                onClick={() => setSelectedTab(domain.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  selectedTab === domain.id
                    ? 'bg-primary text-white border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.30),0_4px_12px_rgba(59,130,246,0.25)] backdrop-blur-xl font-semibold'
                    : 'liquid-glass-subtle text-slate-600 dark:text-white/70 border-transparent hover:border-white/15'
                }`}
              >
                {domain.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Categorized Tech Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedDomains.map((domain) => {
              const Icon = domain.icon;
              return (
                <motion.div
                  key={domain.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Domain Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center border border-primary/20">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                          {domain.label}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-white/50">
                          {domain.description}
                        </p>
                      </div>
                    </div>

                    {/* Tech Badges List — liquid glass subtle chips */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                      {domain.items.map((tech) => (
                        <div 
                          key={tech.name}
                          className="liquid-glass-subtle p-2.5 rounded-xl hover:border-primary/25 transition-all group"
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-semibold text-slate-800 dark:text-white/90 group-hover:text-primary transition-colors line-clamp-1">
                              {tech.name}
                            </span>
                          </div>
                          {tech.highlight && (
                            <span className="text-[11px] font-mono text-slate-500 dark:text-cyan/80 line-clamp-1">
                              {tech.highlight}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom summary tag */}
                  <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-white/40">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-emerald-500" /> Production Verified
                    </span>
                    <span className="font-mono text-slate-400 dark:text-white/30">
                      {domain.items.length} Core Technologies
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
