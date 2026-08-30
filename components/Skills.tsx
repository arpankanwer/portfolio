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
  ExternalLink
} from 'lucide-react';

interface TechCategory {
  id: string;
  label: string;
  icon: typeof Server;
  description: string;
  items: {
    name: string;
    level: 'Production Core' | 'Advanced' | 'Proficient';
    highlight?: string;
  }[];
}

const techDomains: TechCategory[] = [
  {
    id: 'backend',
    label: 'Backend & Systems',
    icon: Server,
    description: 'Scalable services, REST/GraphQL APIs, and low-latency native video bridging.',
    items: [
      { name: 'Node.js & Express / NestJS', level: 'Production Core', highlight: 'REST & Event Pipelines' },
      { name: 'Java & Spring Boot', level: 'Production Core', highlight: 'Enterprise Microservices' },
      { name: 'TypeScript / JavaScript (ES6+)', level: 'Production Core', highlight: 'Strict Type Systems' },
      { name: 'Python & Django', level: 'Advanced', highlight: 'Data & Scripting Services' },
      { name: 'Native Module Bridging', level: 'Production Core', highlight: 'Objective-C / Java / Video' },
      { name: 'RESTful & GraphQL API Architecture', level: 'Production Core', highlight: 'Clean Contract Design' },
    ]
  },
  {
    id: 'mobile-frontend',
    label: 'Mobile & Frontend',
    icon: Smartphone,
    description: 'Cross-platform mobile applications and modern SSR web interfaces.',
    items: [
      { name: 'React Native & Expo', level: 'Production Core', highlight: 'Published to App Store / Play' },
      { name: 'Flutter & Dart', level: 'Advanced', highlight: 'Cross-Platform Android / iOS' },
      { name: 'Next.js 15 & React.js', level: 'Production Core', highlight: 'App Router & SSR Architecture' },
      { name: 'Tailwind CSS & Design Systems', level: 'Production Core', highlight: 'Accessible Modern UI' },
      { name: 'Zustand / Redux State Engines', level: 'Production Core', highlight: 'Predictable Global State' },
      { name: 'Framer Motion & Micro-interactions', level: 'Advanced', highlight: '60fps GPU Animations' },
    ]
  },
  {
    id: 'cloud-devops',
    label: 'Cloud & Infrastructure',
    icon: Cloud,
    description: 'Containerized deployment pipelines, cloud functions, and CI/CD automation.',
    items: [
      { name: 'AWS (EC2, S3, RDS, Lambda)', level: 'Advanced', highlight: 'Cloud Hosting & Storage' },
      { name: 'Docker & Containerization', level: 'Advanced', highlight: 'Reproducible Build Envs' },
      { name: 'GitHub Actions & CI/CD', level: 'Production Core', highlight: 'Automated Test & Deploy' },
      { name: 'Firebase & Google Cloud Platform', level: 'Production Core', highlight: 'Auth, Firestore, Hosting' },
      { name: 'Expo Application Services (EAS)', level: 'Production Core', highlight: 'Over-the-Air iOS/Android Builds' },
      { name: 'Vercel Edge Platform', level: 'Production Core', highlight: 'Serverless Edge Functions' },
    ]
  },
  {
    id: 'data-qa',
    label: 'Databases & QA Automation',
    icon: Database,
    description: 'NoSQL & Relational databases, regression testing suites, and agile workflows.',
    items: [
      { name: 'Firebase Firestore & Realtime DB', level: 'Production Core', highlight: 'Real-time WebSocket Sync' },
      { name: 'PostgreSQL & MS SQL Server', level: 'Advanced', highlight: 'Complex Queries & Indexing' },
      { name: 'MongoDB & Document Modeling', level: 'Advanced', highlight: 'Schema Design & Aggregations' },
      { name: 'Selenium WebDriver Automation', level: 'Production Core', highlight: '50+ Evertz Test Suites' },
      { name: 'Regression & Integration Testing', level: 'Production Core', highlight: 'Cut Test Cycles by 25%' },
      { name: 'Jira, Agile / Scrum & Git', level: 'Production Core', highlight: 'Iterative Sprint Delivery' },
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
              Production-Tested <span className="text-gradient">Core Tech Stack</span>.
            </h2>
            <p className="text-slate-600 dark:text-white/70 text-sm sm:text-base max-w-xl mt-2">
              Clean architectural competencies spanning backend microservices, published mobile applications, and automated CI/CD infrastructure.
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
