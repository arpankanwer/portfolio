'use client';
import { motion } from 'framer-motion';
import { Code, Terminal, Trophy, Users, GitPullRequest, Award } from 'lucide-react';

const stats = [
  { label: 'Years Experience', value: '3+', icon: Terminal },
  { label: 'Selenium Tests Automated', value: '50+', icon: Code },
  { label: 'Merged OSS PR', value: 'VS Code', icon: GitPullRequest },
  { label: 'Best Innovation 2024', value: '1st of 40+', icon: Award },
  { label: 'Students Mentored', value: '125+', icon: Users },
  { label: 'GPA at Sheridan', value: '3.52', icon: Trophy },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 sm:px-12 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 -left-20 w-[450px] h-[450px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start"
        >
          {/* Left Side: Editorial Story */}
          <div className="flex-1 space-y-6">
            <div className="liquid-glass-subtle inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-cyan uppercase tracking-wider">
              About The Developer
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Building full-stack products with <span className="text-gradient">precision & craft</span>.
            </h2>
            
            <p className="text-slate-700 dark:text-white/80 text-base sm:text-lg leading-relaxed">
              I'm a full-stack developer based in Ontario, working across <strong className="text-slate-900 dark:text-white">React Native apps, Next.js dashboards, Node.js and Firebase backends</strong>, and PHP/MySQL systems.
            </p>
            
            <div className="space-y-3 text-slate-600 dark:text-white/70 text-sm sm:text-base leading-relaxed border-l-2 border-primary/40 pl-5">
              <p>
                At <strong className="text-slate-900 dark:text-white font-medium">KiloBryte</strong>, I build and maintain the Paige™ app for seniors, live on the App Store and Play Store, and integrated Amplifier Health's Apex voice AI model and Longitudinal API to surface vocal health signals and trends over time.
              </p>
              <p>
                At <strong className="text-slate-900 dark:text-white font-medium">Evertz Microsystems</strong>, I automated 50+ Selenium tests, reducing regression testing time by 25% and enabling faster releases.
              </p>
              <p>
                As a Programming Tutor at <strong className="text-slate-900 dark:text-white font-medium">Sheridan College</strong>, I mentored 125+ students in programming and frameworks such as Spring Boot, AngularJS, and Django.
              </p>
              <p>
                In open source, I've had PRs merged in <strong className="text-slate-900 dark:text-white font-medium">Microsoft VS Code</strong> and <strong className="text-slate-900 dark:text-white font-medium">oh-my-opencode-slim</strong>.
              </p>
            </div>
          </div>

          {/* Right Side: Animated Metric Bento */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 w-full">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between hover:border-primary/40 hover:bg-slate-100/80 dark:hover:bg-white/[0.07] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon size={20} />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white mb-1 tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-white/60 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
