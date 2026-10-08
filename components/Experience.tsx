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
    date: 'Aug 2025 – Present',
    badge: 'Current Role',
    stack: ['React Native', 'Next.js', 'Node.js', 'Firebase', 'Expo', 'Native Video Bridging', 'Apex Voice AI', 'Cron Jobs'],
    bullets: [
      'Build and maintain the Paige™ app, which keeps seniors in touch with family through one-touch video calls, using React Native, Expo, Next.js, Node.js, and Firebase. It is live on the App Store and Google Play.',
      "Work on the native video bridging behind Paige's calls on iOS and Android.",
      "Integrated Amplifier Health's Apex voice AI model into our Next.js app. It screens each recording for vocal health signals such as stress, fatigue, cognitive load, dehydration, and cardiovascular strain.",
      'Built an automated cron-job pipeline that submits new recordings for analysis on a schedule, plus a dashboard for reviewing the results.',
      "Integrated Amplifier Health's Longitudinal API, which compares each new recording with the same person's history, so every user gets a baseline, per-recording deltas, and a trend over time instead of one-off readings."
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
    date: 'May 2024 – Aug 2024',
    badge: 'QA Automation',
    stack: ['Selenium WebDriver', 'Java', 'Python', 'Regression Testing', 'CI/CD', 'IoT'],
    bullets: [
      "Automated 50+ Selenium end-to-end tests for Evertz's enterprise broadcast hardware and its web dashboards.",
      'Cut regression testing time by 25%, which sped up the release cadence for firmware builds.',
      'Worked with hardware and software teams to improve Smart Garden, an IoT plant-monitoring app, and validate it under live operating conditions.'
    ],
    links: [
      { label: 'Smart Garden', url: 'https://github.com/Evertz-Garden/SmartGarden/tree/WebUIChange' }
    ]
  },
  {
    role: 'Programming Tutor',
    company: 'Sheridan College',
    location: 'Oakville, ON, Canada',
    date: 'Jan–Apr 2023 · Sep–Dec 2023',
    badge: 'Academic Mentorship',
    stack: ['Spring Boot', 'Java', 'AngularJS', 'Django', 'Data Structures & Algorithms', 'SQL'],
    bullets: [
      'Mentored 125+ computer science students across two terms in programming fundamentals and frameworks including Spring Boot, AngularJS, and Django.',
      'Ran weekly hands-on code reviews and debugging sessions covering Spring Boot REST APIs, Django MVC, and relational schema normalization.',
      'Wrote supplementary coding problem sets and architecture cheat sheets for students in advanced programming courses.'
    ],
    links: []
  },
  {
    role: 'Application Developer',
    company: 'Eduwings Global',
    location: 'Ludhiana, Punjab, India',
    date: 'Apr 2021 – Nov 2021',
    badge: 'Mobile Engineering',
    stack: ['Flutter', 'Dart', 'PHP', 'Firebase', 'REST APIs', 'Google Play Console'],
    bullets: [
      "Built and published Eduwings' Android ERP app on the Google Play Store, with a Flutter front end and PHP web services behind it.",
      'Used Firebase for real-time data sync, user authentication, and push announcements to students.',
      'Integrated payment gateways and a student document submission flow.'
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

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
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
          {/* Timeline spine line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10 -translate-x-1/2" />
          <motion.div 
            className="absolute left-4 top-0 w-[2px] bg-gradient-to-b from-primary via-cyan to-secondary -translate-x-1/2"
            style={{ height: lineHeight }}
          />

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              return (
                <div key={index} className="relative w-full">
                  
                  {/* Timeline Dot with Pulse */}
                  <div className="absolute left-4 top-8 w-4 h-4 rounded-full bg-primary border-4 border-slate-50 dark:border-[#050505] -translate-x-1/2 z-20 shadow-[0_0_12px_rgba(79,140,255,0.8)]" />
                  
                  {/* Experience Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full pl-10 sm:pl-12"
                  >
                    <div className="glass-card p-5 sm:p-8 rounded-3xl relative overflow-hidden group hover:border-primary/40 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] transition-all duration-300">
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
                      
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-600 dark:text-white/70 mb-4 font-medium">
                        <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                          <Building2 size={14} className="text-primary" /> {exp.company}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1.5 text-slate-500 dark:text-white/50">
                          <MapPin size={13} /> {exp.location}
                        </span>
                      </div>

                      {/* Bullets */}
                      <div className="space-y-2.5 mb-5">
                        {exp.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-white/75 leading-relaxed">
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
