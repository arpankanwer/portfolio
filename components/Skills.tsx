'use client';
import { motion } from 'framer-motion';
import { Server, Smartphone, Cloud, Database, Layers, Sparkles, Code2 } from 'lucide-react';

// Mirrors the Technical Skills table on the resume
const skillGroups = [
  { label: 'Languages', icon: Code2, items: ['JavaScript', 'TypeScript', 'PHP', 'Java', 'Dart', 'Python', 'SQL', 'C#'] },
  { label: 'Frontend & Mobile', icon: Smartphone, items: ['React.js', 'Next.js', 'React Native', 'Expo', 'Flutter', 'HTML/CSS', 'Tailwind CSS'] },
  { label: 'Backend', icon: Server, items: ['Node.js', 'Express', 'RESTful API Design', 'Spring Boot', 'Django', 'Scheduled Jobs (cron)'] },
  { label: 'Databases', icon: Database, items: ['MongoDB', 'MySQL (phpMyAdmin)', 'SQL Server', 'Firebase (Firestore)'] },
  { label: 'Cloud & DevOps', icon: Cloud, items: ['AWS (EC2, S3, RDS, Lambda)', 'Docker', 'GitHub Actions', 'Jenkins', 'Vercel', 'CI/CD'] },
  { label: 'AI & Tools', icon: Sparkles, items: ['Claude Code', 'ElevenLabs Agents', 'Eleven v3 Conversational', 'Git', 'Jira', 'Agile/Scrum', 'Selenium'] },
];

// Highlighted as the primary stack
const coreStack = new Set(['TypeScript', 'React.js', 'Next.js', 'React Native', 'Node.js']);

const coreChip = 'px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-primary/10 dark:bg-primary/20 border border-primary/40 text-primary dark:text-cyan';
const chip = 'liquid-glass-subtle px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-white/80';

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24 px-6 sm:px-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-primary/10 dark:bg-secondary/15 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
        >
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

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-white/50">
            <span className={coreChip}>Core</span>
            <span>= what I use most</span>
          </div>
        </motion.div>

        {/* Skills table — one row per resume category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl glow-border divide-y divide-slate-200/80 dark:divide-white/10"
        >
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.label} className="flex flex-col md:flex-row md:items-start gap-3 md:gap-8 px-5 sm:px-8 py-5">
                <div className="flex items-center gap-3 md:w-52 shrink-0 md:pt-1">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center border border-primary/20 shrink-0">
                    <Icon size={16} />
                  </div>
                  <h3 className="font-display font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                    {group.label}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className={coreStack.has(item) ? coreChip : chip}>
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
