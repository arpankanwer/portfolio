'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Building2, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

const experiences = [
  {
    role: 'Software Developer',
    company: 'KiloBryte',
    location: 'Guelph, ON, Canada',
    date: 'August 2025 – Present',
    badge: 'Current Role',
    stack: ['React', 'React Native', 'Next.js', 'Node.js', 'Firebase', 'Expo', 'Vercel', 'Native Modules'],
    bullets: [
      'Developing accessible, high-performance cross-platform applications tailored for senior citizens across iOS and Android.',
      'Architecting core features for the Paige™ ecosystem with responsive state synchronization and low-latency cloud data persistence.',
      'Engineering custom native module bridges for video streaming capabilities, optimizing hardware rendering pipelines.',
      'Spearheading production deployment pipelines to both Apple App Store and Google Play Store.'
    ]
  },
  {
    role: 'Software QA Engineering Intern',
    company: 'Evertz Microsystems Ltd',
    location: 'Burlington, ON, Canada',
    date: 'May 2024 – August 2024',
    badge: 'Enterprise QA',
    stack: ['Selenium WebDriver', 'Java', 'Python', 'IoT Monitoring', 'CI/CD', 'Regression Testing'],
    bullets: [
      'Engineered and deployed 50+ automated Selenium end-to-end test suites for enterprise broadcast hardware and web dashboards.',
      'Reduced overall regression testing execution cycle time by 25%, drastically accelerating release cadence for firmware builds.',
      'Collaborated with cross-functional hardware/software teams to validate IoT-plant monitoring systems (Smart Garden) under live operating conditions.'
    ]
  },
  {
    role: 'Programming Tutor & Mentor',
    company: 'Sheridan College',
    location: 'Oakville, ON, Canada',
    date: 'Jan 2023 – Dec 2023',
    badge: 'Academic Mentorship',
    stack: ['Spring Boot', 'Java', 'AngularJS', 'Django', 'Data Structures & Algorithms', 'SQL'],
    bullets: [
      'Mentored over 125+ computer science undergraduate students in modern software engineering principles, backend patterns, and algorithm design.',
      'Conducted weekly hands-on code reviews and debugging sessions focusing on Spring Boot REST architectures, Django MVC, and relational schema normalization.',
      'Authored supplementary coding problem sets and architecture cheat-sheets to improve student pass rates in advanced programming courses.'
    ]
  },
  {
    role: 'Application Developer',
    company: 'Eduwings Global',
    location: 'Ludhiana, Punjab, India',
    date: 'April 2021 – November 2021',
    badge: 'Mobile Engineering',
    stack: ['Flutter', 'Dart', 'PHP', 'Firebase', 'Google Play Console', 'REST APIs'],
    bullets: [
      'Developed and deployed production Android ERP mobile applications using Flutter and PHP web services to the Google Play Store.',
      'Streamlined cloud backend operations with Google Firebase to enable instant synchronization, user auth, and real-time push announcements.',
      'Integrated payment gateways and dynamic student document submission pipelines.'
    ]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 px-6 sm:px-12 relative overflow-hidden" ref={containerRef}>
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan/10 blur-[130px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="liquid-glass-subtle inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-cyan uppercase tracking-wider mb-3">
            <span>Career Progression</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Professional <span className="text-gradient">Experience</span>.
          </h2>
          <p className="text-slate-600 dark:text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            A track record of engineering scalable applications, automating test workflows, and driving high-impact technical initiatives.
          </p>
        </motion.div>

        <div className="relative">
          {/* Central spine line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10 -translate-x-1/2" />
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-primary via-cyan to-secondary -translate-x-1/2"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12 sm:space-y-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full">
                  
                  {/* Timeline Dot with Pulse */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-slate-50 dark:border-[#050505] -translate-x-1/2 z-20 shadow-[0_0_12px_rgba(79,140,255,0.8)] mt-1.5 md:mt-0" />
                  
                  {/* Experience Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`w-full pl-10 md:pl-0 md:w-[46%] ${isEven ? 'md:mr-auto md:text-left' : 'md:ml-auto md:text-left'}`}
                  >
                    <div className="glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden group hover:border-primary/40 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] transition-all duration-300">
                      {/* Top Bar — liquid glass pills */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="liquid-glass-subtle px-3 py-1 rounded-full text-xs font-mono text-cyan">
                          <span>{exp.date}</span>
                        </span>
                        <span className="liquid-glass-subtle px-2.5 py-0.5 rounded-full text-[11px] font-medium text-slate-600 dark:text-white/60">
                          <span>{exp.badge}</span>
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      
                      <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-white/70 mb-4 font-medium">
                        <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                          <Building2 size={14} className="text-primary" /> {exp.company}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5 text-slate-500 dark:text-white/50">
                          <MapPin size={13} /> {exp.location}
                        </span>
                      </div>

                      {/* Bullets */}
                      <div className="space-y-2.5 mb-5">
                        {exp.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-white/75 leading-relaxed">
                            <CheckCircle2 size={14} className="text-cyan shrink-0 mt-1" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Chips — liquid glass subtle */}
                      <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap gap-1.5">
                        {exp.stack.map((tech) => (
                          <span key={tech} className="liquid-glass-subtle px-2.5 py-0.5 rounded-md text-[11px] font-mono text-slate-700 dark:text-white/70">
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
