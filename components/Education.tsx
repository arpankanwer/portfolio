'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Trophy, Star, CheckCircle, Calendar, Sparkles } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 sm:px-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan uppercase tracking-wider mb-3">
            Credentials & Recognition
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Education & <span className="text-gradient">Honors</span>.
          </h2>
          <p className="text-slate-600 dark:text-white/70 text-base sm:text-lg max-w-2xl">
            Formal technical education, academic excellence, and competitive software innovation awards.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 rounded-3xl glow-border relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <GraduationCap size={160} />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                  <GraduationCap size={24} />
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-cyan">
                  <Calendar size={13} /> Jan 2022 – Dec 2024
                </span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">
                Three-Year Advanced Diploma
              </h3>
              <p className="text-base font-semibold text-primary mb-2">
                Computer Systems Technology
              </p>
              <p className="text-sm text-slate-600 dark:text-white/70 mb-6">
                Specialization in Software Development & Network Engineering
              </p>

              <div className="space-y-3.5 bg-slate-50 dark:bg-white/[0.03] p-5 rounded-2xl border border-slate-200/60 dark:border-white/5 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-slate-500 dark:text-white/60">Institution</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">Sheridan College (Oakville, ON)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-slate-500 dark:text-white/60">Cumulative GPA</span>
                  <div className="flex items-center gap-1.5">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span className="font-display font-bold text-lg text-slate-900 dark:text-white">3.52 / 4.0</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-slate-500 dark:text-white/60">Academic Standing</span>
                  <span className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400">High Academic Standing</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-white/40">Core Coursework</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Enterprise Java & Spring',
                  'Distributed Systems',
                  'Database Management & SQL',
                  'Cloud Architecture',
                  'Data Structures & Algorithms',
                  'Full-Stack Web & Mobile'
                ].map((course) => (
                  <span key={course} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-[11px] text-slate-700 dark:text-white/75 font-mono border border-slate-200/50 dark:border-transparent">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Awards Spotlight Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 rounded-3xl glow-border relative overflow-hidden group flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-primary/5 to-transparent z-0" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-yellow-400 via-amber-500 to-yellow-600 flex items-center justify-center text-black shadow-md dark:shadow-[0_0_30px_rgba(234,179,8,0.4)]"
                >
                  <Trophy size={28} className="text-black" />
                </motion.div>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-600 dark:text-yellow-300">
                  Year 2024
                </span>
              </div>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 dark:bg-secondary/20 text-primary dark:text-cyan text-xs font-mono mb-3">
                <Sparkles size={13} className="text-amber-500 dark:text-yellow-400" />
                1st Place Capstone Innovation Award
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">
                Best Innovation Award 2024
              </h3>
              <p className="text-sm font-semibold text-slate-700 dark:text-white/90 mb-4">
                Sheridan College Software Engineering Capstone Showcase
              </p>
              
              <p className="text-sm sm:text-base text-slate-600 dark:text-white/75 leading-relaxed mb-6">
                Awarded top rank among <strong className="text-slate-900 dark:text-white">40+ competing engineering teams</strong> for building <strong className="text-slate-900 dark:text-white">GigJet</strong>. Recognized by industry judges for superior mobile architecture, real-time communication protocols, clean UI execution, and full-stack reliability.
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-white/60">
              <span>Verified Award Recipient</span>
              <span className="font-mono text-primary dark:text-cyan font-semibold">Top 1 / 40+ Teams</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
