'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Server, 
  Smartphone, 
  Cloud, 
  Database, 
  CheckCircle2, 
  Terminal,
  Cpu
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Stack', icon: Cpu },
  { id: 'backend', label: 'Backend', icon: Server },
  { id: 'frontend', label: 'Frontend', icon: Code2 },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
  { id: 'cloud', label: 'Cloud & DevOps', icon: Cloud },
  { id: 'database', label: 'Databases', icon: Database },
  { id: 'qa', label: 'QA Automation', icon: CheckCircle2 },
  { id: 'languages', label: 'Languages', icon: Terminal },
];

const skillsData = [
  // Languages
  { name: 'JavaScript / TypeScript', category: 'languages', level: 95, icon: 'TS' },
  { name: 'Java (Spring Boot / JavaFX)', category: 'languages', level: 90, icon: 'JV' },
  { name: 'Python (Django / Scripting)', category: 'languages', level: 85, icon: 'PY' },
  { name: 'Dart / Flutter', category: 'languages', level: 90, icon: 'DT' },
  { name: 'SQL & Query Optimization', category: 'languages', level: 88, icon: 'SQL' },
  { name: 'C# / .NET Basics', category: 'languages', level: 80, icon: 'C#' },

  // Backend
  { name: 'Node.js & Express / NestJS', category: 'backend', level: 95, icon: 'JS' },
  { name: 'Spring Boot Architecture', category: 'backend', level: 88, icon: 'SB' },
  { name: 'RESTful & GraphQL API Design', category: 'backend', level: 95, icon: 'API' },
  { name: 'Django & Python Web Services', category: 'backend', level: 82, icon: 'DJ' },
  { name: 'Microservices & Event Messaging', category: 'backend', level: 85, icon: 'MS' },
  { name: 'Native Module Bridging (Video/Audio)', category: 'backend', level: 90, icon: 'BR' },

  // Frontend
  { name: 'Next.js 15 (App Router & SSR)', category: 'frontend', level: 92, icon: 'NX' },
  { name: 'React.js Ecosystem', category: 'frontend', level: 95, icon: 'RC' },
  { name: 'Tailwind CSS & Design Systems', category: 'frontend', level: 95, icon: 'TW' },
  { name: 'Framer Motion & Animations', category: 'frontend', level: 90, icon: 'FM' },

  // Mobile
  { name: 'React Native & Expo', category: 'mobile', level: 94, icon: 'RN' },
  { name: 'Flutter Cross-Platform Apps', category: 'mobile', level: 90, icon: 'FL' },
  { name: 'iOS App Store & Android Play Deployment', category: 'mobile', level: 90, icon: 'APP' },
  { name: 'Mobile State Management (Zustand/Redux)', category: 'mobile', level: 92, icon: 'ST' },

  // Cloud & DevOps
  { name: 'AWS (EC2, S3, RDS, Lambda)', category: 'cloud', level: 88, icon: 'AWS' },
  { name: 'Docker & Containerization', category: 'cloud', level: 86, icon: 'DK' },
  { name: 'GitHub Actions & CI/CD Pipelines', category: 'cloud', level: 90, icon: 'GA' },
  { name: 'Vercel, Firebase Hosting & Expo EAS', category: 'cloud', level: 95, icon: 'CD' },
  { name: 'Jenkins Automated Pipelines', category: 'cloud', level: 82, icon: 'JK' },

  // Databases
  { name: 'Firebase Firestore & Realtime DB', category: 'database', level: 94, icon: 'FB' },
  { name: 'MongoDB & Document Modeling', category: 'database', level: 90, icon: 'MG' },
  { name: 'Microsoft SQL Server', category: 'database', level: 85, icon: 'SS' },
  { name: 'Azure Blob Storage', category: 'database', level: 88, icon: 'AZ' },

  // QA Automation
  { name: 'Selenium WebDriver Test Automation', category: 'qa', level: 92, icon: 'SE' },
  { name: 'Regression & E2E Testing Strategies', category: 'qa', level: 90, icon: 'QA' },
  { name: 'Agile/Scrum, Jira, & Git Workflows', category: 'qa', level: 95, icon: 'JR' },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all'
    ? skillsData
    : skillsData.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-6 sm:px-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/15 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-secondary uppercase tracking-wider mb-3">
            Technical Proficiency
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-cyan">Tech Stack</span>.
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl">
            Filter through my specialized competencies across enterprise backend development, cross-platform mobile frameworks, and cloud architecture.
          </p>
        </motion.div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-[0_0_20px_rgba(79,140,255,0.4)] scale-105'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -3 }}
                className="glass-card p-5 rounded-2xl border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-cyan group-hover:bg-primary/20 group-hover:text-white transition-colors">
                      {skill.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-white/50">{skill.level}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-cyan rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
