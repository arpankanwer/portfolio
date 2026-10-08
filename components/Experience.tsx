'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Building2, MapPin, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react';

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  date: string;
  badge: string;
  stack: string[];
  bullets: string[];
  links: { label: string; url: string }[];
}

const experiences: ExperienceItem[] = [
  {
    role: 'Software Developer',
    company: 'KiloBryte',
    location: 'Guelph, ON, Canada',
    date: 'August 2025 – Present',
    badge: 'Current Role',
    stack: ['React Native', 'Next.js', 'Node.js', 'Firebase', 'Expo', 'Native Video Bridging', 'Apex Voice AI', 'Cron Jobs'],
    bullets: [
      'Build and maintain the Paige™ app for seniors with React Native, Next.js, Node.js, Firebase, Expo, and native video bridging; live on the App Store and Play Store.',
      "Integrated Amplifier Health's Apex voice AI model into Next.js to analyze vocal health signals.",
      'Built an automated cron-job pipeline that submits recordings for analysis, plus a dashboard for results.',
      "Integrated Amplifier Health's Longitudinal API to surface per-user deltas and vocal health trends over time."
    ],
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/ca/app/paige-connect/id6744338186' },
      { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.kilobryte.paigecompanion&hl=en_CA' }
    ]
  },
  {
    role: 'Software QA Engineering Intern',
    company: 'Evertz Microsystems Ltd',
    location: 'Burlington, ON, Canada',
    date: 'May 2024 – August 2024',
    badge: 'QA Automation',
    stack: ['Selenium', 'Test Automation', 'Regression Testing', 'IoT'],
    bullets: [
      'Automated 50+ Selenium tests, reducing regression testing time by 25% and enabling faster releases.',
      'Collaborated across teams to improve Smart Garden, an IoT plant-monitoring app.'
    ],
    links: [
      { label: 'Smart Garden', url: 'https://github.com/Evertz-Garden/SmartGarden/tree/WebUIChange' }
    ]
  },
  {
    role: 'Programming Tutor',
    company: 'Sheridan College',
    location: 'Oakville, ON, Canada',
    date: 'Jan 2023 – Apr 2023; Sep 2023 – Dec 2023',
    badge: 'Academic Mentorship',
    stack: ['Spring Boot', 'AngularJS', 'Django', 'Mentoring'],
    bullets: [
      'Mentored 125+ students in programming and frameworks such as Spring Boot, AngularJS, and Django.'
    ],
    links: []
  },
  {
    role: 'Application Developer',
    company: 'Eduwings Global',
    location: 'Ludhiana, Punjab, India',
    date: 'April 2021 – November 2021',
    badge: 'Mobile Engineering',
    stack: ['Flutter', 'PHP', 'Firebase', 'Android'],
    bullets: [
      'Built an Android app with Flutter, PHP, and Firebase, published on the Play Store.'
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/arpankanwer/eduwings_global' },
      { label: 'Android App', url: 'https://apkpure.com/eduwings-global/com.eduwingserp.studentapp' }
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
            Shipping production mobile and web apps, integrating AI features, and automating test workflows.
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

                      {/* Resume Links — liquid glass */}
                      {exp.links.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {exp.links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="liquid-glass px-3 py-1 rounded-full text-xs font-medium text-slate-800 dark:text-white flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>{link.label}</span>
                              <ExternalLink size={11} className="text-slate-400 dark:text-white/40" />
                            </a>
                          ))}
                        </div>
                      )}

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
