'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Cpu, 
  Trophy,
  Smartphone,
  ArrowRight,
  Radio,
  Play,
  Globe,
  PenTool
} from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  award?: string;
  badge?: string;
  image: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  demoUrl?: string;
  youtubeUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  figmaUrl?: string;
  overview: string;
  architecture: string;
  features: string[];
  results?: string;
  metrics: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    id: 'paige-connect',
    title: 'Paige Connect',
    subtitle: 'Paige™ App for Seniors (KiloBryte)',
    tags: ['React Native', 'Expo', 'Next.js', 'Node.js', 'Firebase', 'Native Video Bridging'],
    description: 'The Paige™ app for seniors, which I build and maintain at KiloBryte with React Native, Next.js, Node.js, Firebase, Expo, and native video bridging. Live on the App Store and Google Play.',
    badge: 'Live on App Store & Google Play',
    image: '/projects/paigeconnect.png',
    appStoreUrl: 'https://apps.apple.com/ca/app/paige-connect/id6744338186',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.kilobryte.paigecompanion&hl=en_CA',
    overview: "Paige™ is KiloBryte's app for seniors. I build and maintain it across iOS and Android, and I extended the platform with Amplifier Health's voice AI to analyze vocal health signals.",
    architecture: "React Native (Expo) mobile client with native video bridging, backed by Node.js and Firebase. A Next.js layer integrates Amplifier Health's Apex voice AI model and Longitudinal API, and an automated cron-job pipeline submits recordings for analysis and feeds a results dashboard.",
    features: [
      'Cross-platform app for seniors on iOS and Android',
      'Native video bridging',
      "Amplifier Health's Apex voice AI model integrated into Next.js to analyze vocal health signals",
      'Automated cron-job pipeline that submits recordings for analysis, plus a results dashboard',
      "Amplifier Health's Longitudinal API for per-user deltas and vocal health trends over time"
    ],
    results: 'Live on the Apple App Store and Google Play Store.',
    metrics: [
      { label: 'Platforms', value: 'iOS & Android' },
      { label: 'Store Status', value: 'Live' },
      { label: 'Voice AI', value: 'Apex' }
    ]
  },
  {
    id: 'skillkoo',
    title: 'Skillkoo / Eduwings',
    subtitle: 'Education Platform with AI Career-Counseling Voice Agents',
    tags: ['React Native', 'Expo', 'Express.js', 'AWS S3', 'ElevenLabs Agents', 'Eleven v3 Conversational'],
    description: 'An education platform shipped on iOS, Android, and the web, with student profiles, document uploads, and real-time AI career-counseling voice agents.',
    badge: 'Live on iOS, Android & Web',
    image: '/projects/skillkoo.png',
    appStoreUrl: 'https://apps.apple.com/us/app/skillkoo/id6761086381',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.eduwings.global&hl=en_CA',
    websiteUrl: 'https://www.learn.skillkoo.com/',
    overview: 'Skillkoo is an education platform available on iOS, Android, and the web. Students build profiles, upload documents, and talk with real-time AI career-counseling voice agents.',
    architecture: 'React Native (Expo) mobile clients, an Express.js backend, and AWS S3 storage. The real-time career-counseling voice agents are built with ElevenLabs Agents, powered by Eleven v3 Conversational.',
    features: [
      'Shipped on iOS, Android, and the web',
      'Student profiles and document uploads',
      'Real-time AI career-counseling voice agents built with ElevenLabs Agents',
      'Voice agents powered by Eleven v3 Conversational'
    ],
    results: 'Live on the App Store, Google Play, and the web.',
    metrics: [
      { label: 'Platforms', value: 'iOS, Android & Web' },
      { label: 'Voice AI', value: 'ElevenLabs' },
      { label: 'Backend', value: 'Express.js' }
    ]
  },
  {
    id: 'gigjet',
    title: 'GigJet',
    subtitle: 'Service Marketplace with Real-Time Chat',
    tags: ['React Native', 'Node.js'],
    description: 'A full-stack mobile app with chat and job postings, connecting service seekers and providers.',
    award: 'Awarded "Best Innovation 2024" (1st of 40+)',
    image: '/projects/gigjet.png',
    youtubeUrl: 'https://youtu.be/M1adKEKeFLo',
    demoUrl: 'https://youtu.be/M1adKEKeFLo',
    figmaUrl: 'https://www.figma.com/design/czmfCp4NJjOQn1y6MknLjz/Capstone?node-id=0-1&t=mgfBlIu44I6F7Afq-1',
    overview: 'GigJet connects people looking for services with the providers who offer them. Seekers post jobs, and both sides talk through built-in chat.',
    architecture: 'React Native mobile client backed by a Node.js server, covering job postings and in-app chat between service seekers and providers. Designed in Figma.',
    features: [
      'Job postings from service seekers',
      'In-app chat between seekers and providers',
      'Full-stack mobile app built with React Native and Node.js',
      'UI designed in Figma'
    ],
    results: 'Won "Best Innovation 2024" at Sheridan College, ranking 1st among 40+ teams.',
    metrics: [
      { label: 'Award Standing', value: '1st Place' },
      { label: 'Competing Teams', value: '40+' },
      { label: 'Year', value: '2024' }
    ]
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    subtitle: 'This Site, with a Live GitHub Heatmap',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GitHub GraphQL API'],
    description: "The site you're on, built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. It includes a live GitHub heatmap served by a Next.js API route that queries GitHub's GraphQL API, cached hourly.",
    image: '/projects/portfolio.png',
    githubUrl: 'https://github.com/arpankanwer/portfolio',
    websiteUrl: 'https://arpankanwer.ai.studio/',
    overview: 'My personal portfolio. It presents my experience, projects, and open-source work, and pulls my GitHub contribution activity live.',
    architecture: "Next.js App Router with React and TypeScript, styled with Tailwind CSS and animated with Framer Motion. A Next.js API route queries GitHub's GraphQL API for the contribution calendar and caches the result for an hour.",
    features: [
      'Live GitHub contribution heatmap',
      "Next.js API route backed by GitHub's GraphQL API",
      'Hourly caching of GitHub data',
      'Framer Motion animations with light and dark themes'
    ],
    metrics: [
      { label: 'Framework', value: 'Next.js' },
      { label: 'Data Source', value: 'GitHub GraphQL' },
      { label: 'Cache', value: 'Hourly' }
    ]
  },
  {
    id: 'smart-garden',
    title: 'Smart Garden (IoT)',
    subtitle: 'IoT Plant-Monitoring App at Evertz',
    tags: ['IoT', 'Microcontroller', 'C / C++', 'JavaScript', 'Python'],
    description: 'An IoT plant-monitoring app built by a team at Evertz. During my internship I collaborated across teams to improve it.',
    badge: 'Evertz Team Project',
    image: '/projects/smartgarden.png',
    githubUrl: 'https://github.com/Evertz-Garden/SmartGarden/tree/WebUIChange',
    overview: 'Smart Garden is a team project at Evertz Microsystems. A raised garden bed is divided into zones, each watered through motorized valves, and the system is operated from an internally hosted website.',
    architecture: 'Microcontroller firmware (C/C++) drives the motorized valves for each garden zone, and an internally hosted website is used to operate the system.',
    features: [
      'Zone-divided raised garden bed',
      'Motorized valves controlled by a microcontroller',
      'Internally hosted website for operating the garden',
      'Cross-team collaboration during my Evertz internship'
    ],
    metrics: [
      { label: 'Context', value: 'Evertz Internship' },
      { label: 'Type', value: 'IoT' },
      { label: 'Year', value: '2024' }
    ]
  },
  {
    id: 'chatie',
    title: 'Chatie',
    subtitle: 'Real-Time Group Chat App',
    tags: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Firebase Storage'],
    description: 'A real-time group chat app built with Flutter and Firebase. Users create or search for groups, send messages and file attachments, and group admins manage members.',
    image: '/projects/chatie.png',
    githubUrl: 'https://github.com/arpankanwer/chatie',
    websiteUrl: 'https://chatie1.web.app/',
    overview: 'Chatie is a group chat app in the spirit of Telegram. Users sign up, create their own groups or search for existing ones to join, and chat in real time.',
    architecture: 'Flutter client with Firebase Authentication for accounts, Cloud Firestore for real-time messages and chat data, and Firebase Storage for images, videos, and other attachments.',
    features: [
      'User authentication and account management',
      'Create groups and become the group admin',
      'Search for groups by name and join them',
      'Real-time messaging',
      'Image, video, and file attachments',
      'Admin tools to manage group members and permissions'
    ],
    metrics: [
      { label: 'Framework', value: 'Flutter' },
      { label: 'Realtime', value: 'Firestore' },
      { label: 'Storage', value: 'Firebase' }
    ]
  }
];

const linkClass = 'liquid-glass py-2 px-3 rounded-full text-slate-800 dark:text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock background scroll when modal is open and allow modal inner scroll with Lenis
  useEffect(() => {
    if (selectedProject) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      const prevBodyPaddingRight = document.body.style.paddingRight;
      // Compensate scrollbar width to avoid layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.paddingRight = prevBodyPaddingRight;
      };
    }
  }, [selectedProject]);

  // Close on Escape
  useEffect(() => {
    if (!selectedProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedProject]);

  return (
    <section id="projects" className="py-24 px-6 sm:px-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="liquid-glass-subtle inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary uppercase tracking-wider mb-3">
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Featured <span className="text-gradient">Engineering Work</span>.
            </h2>
            <p className="text-slate-600 dark:text-white/70 text-base sm:text-lg max-w-2xl">
              Apps live on the App Store & Google Play, AI-powered platforms, an award-winning capstone, and full-stack web work.
            </p>
          </div>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
              className="glass-card p-5 sm:p-6 rounded-3xl glow-border flex flex-col"
            >
              {/* Preview — opens the details modal */}
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                aria-label={`View details for ${project.title}`}
                className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden group cursor-pointer border border-slate-200/80 dark:border-white/10 bg-slate-100 dark:bg-black/40 mb-5"
              >
                {/* Blurred fill so square screenshots don't letterbox */}
                <Image
                  src={project.image}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  className="object-cover blur-2xl scale-110 opacity-50"
                />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  className="object-contain transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              </button>

              {project.award ? (
                <div className="self-start inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-secondary/10 dark:bg-secondary/20 border border-secondary/30 text-primary dark:text-cyan text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                  <Trophy size={13} className="text-amber-500 dark:text-yellow-400 shrink-0" />
                  <span>{project.award}</span>
                </div>
              ) : project.badge && (
                <div className="self-start inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/30 text-primary dark:text-cyan text-[11px] sm:text-xs font-semibold">
                  <Smartphone size={13} className="text-primary shrink-0" />
                  <span>{project.badge}</span>
                </div>
              )}

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-primary dark:text-cyan/90 mb-3">{project.subtitle}</p>

              <p className="text-slate-600 dark:text-white/75 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech Stack Chips — liquid glass subtle */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="liquid-glass-subtle px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium text-slate-700 dark:text-white/80"
                  >
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* Links — live links first, details last */}
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200/80 dark:border-white/10">
                {project.appStoreUrl && (
                  <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <Smartphone size={13} className="text-primary" />
                    <span>App Store</span>
                  </a>
                )}
                {project.playStoreUrl && (
                  <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <Radio size={13} className="text-emerald-500 dark:text-emerald-400" />
                    <span>Google Play</span>
                  </a>
                )}
                {project.websiteUrl && (
                  <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <Globe size={13} className="text-cyan" />
                    <span>Website</span>
                  </a>
                )}
                {(project.youtubeUrl || project.demoUrl) && (
                  <a href={project.youtubeUrl || project.demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <Play size={13} className="text-red-500 fill-red-500" />
                    <span>Pitch Video</span>
                  </a>
                )}
                {project.figmaUrl && (
                  <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <PenTool size={13} className="text-secondary" />
                    <span>Figma</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    <span>GitHub</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="ml-auto inline-flex items-center gap-1 py-2 text-xs font-semibold text-primary dark:text-cyan hover:underline cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Deep-Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-[130] flex items-start justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-900/60 dark:bg-black/85 backdrop-blur-xl"
            />

            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl my-4 sm:my-8 max-h-[90vh] bg-white dark:bg-[#0b0b10] border border-slate-200 dark:border-white/15 rounded-3xl shadow-2xl overflow-y-auto overscroll-contain z-10 p-6 sm:p-8"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Close Button — liquid glass */}
              <button
                onClick={() => setSelectedProject(null)}
                className="liquid-glass absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center text-slate-700 dark:text-white cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {selectedProject.award && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 dark:bg-secondary/20 text-primary dark:text-cyan text-xs font-semibold">
                        <Trophy size={13} className="text-amber-500 dark:text-yellow-400" />
                        <span>{selectedProject.award}</span>
                      </div>
                    )}
                    {selectedProject.badge && !selectedProject.award && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-cyan text-xs font-semibold">
                        <Smartphone size={13} className="text-primary" />
                        <span>{selectedProject.badge}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm font-mono text-primary dark:text-cyan">{selectedProject.subtitle}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {selectedProject.metrics.map((m, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-center">
                      <p className="text-xs text-slate-500 dark:text-white/50">{m.label}</p>
                      <p className="text-lg font-display font-bold text-slate-900 dark:text-white mt-1">{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Live App Store Links if available — liquid glass */}
                {(selectedProject.appStoreUrl || selectedProject.playStoreUrl || selectedProject.githubUrl || selectedProject.youtubeUrl || selectedProject.demoUrl || selectedProject.websiteUrl || selectedProject.figmaUrl) && (
                  <div className="liquid-glass-subtle flex flex-wrap items-center gap-3 p-4 rounded-2xl">
                    <span className="text-xs text-slate-600 dark:text-white/60 font-mono">Live Access:</span>
                    {(selectedProject.youtubeUrl || selectedProject.demoUrl) && (
                      <a
                        href={selectedProject.youtubeUrl || selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="liquid-glass px-3.5 py-1.5 rounded-full text-slate-900 dark:text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                      >
                        <Play size={13} className="text-red-500 fill-red-500" />
                        <span>Pitch Video on YouTube</span>
                        <ExternalLink size={11} className="text-slate-400 dark:text-white/40" />
                      </a>
                    )}
                    {selectedProject.appStoreUrl && (
                      <a
                        href={selectedProject.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="liquid-glass px-3.5 py-1.5 rounded-full text-slate-900 dark:text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                      >
                        <Smartphone size={13} className="text-primary" />
                        <span>Apple App Store</span>
                        <ExternalLink size={11} className="text-slate-400 dark:text-white/40" />
                      </a>
                    )}
                    {selectedProject.playStoreUrl && (
                      <a
                        href={selectedProject.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="liquid-glass px-3.5 py-1.5 rounded-full text-slate-900 dark:text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                      >
                        <Radio size={13} className="text-emerald-500 dark:text-emerald-400" />
                        <span>Google Play Store</span>
                        <ExternalLink size={11} className="text-slate-400 dark:text-white/40" />
                      </a>
                    )}
                    {selectedProject.websiteUrl && (
                      <a
                        href={selectedProject.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="liquid-glass px-3.5 py-1.5 rounded-full text-slate-900 dark:text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                      >
                        <Globe size={13} className="text-cyan" />
                        <span>Website</span>
                        <ExternalLink size={11} className="text-slate-400 dark:text-white/40" />
                      </a>
                    )}
                    {selectedProject.figmaUrl && (
                      <a
                        href={selectedProject.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="liquid-glass px-3.5 py-1.5 rounded-full text-slate-900 dark:text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                      >
                        <PenTool size={13} className="text-secondary" />
                        <span>Figma Designs</span>
                        <ExternalLink size={11} className="text-slate-400 dark:text-white/40" />
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="liquid-glass px-3.5 py-1.5 rounded-full text-slate-900 dark:text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                        <span>GitHub Repository</span>
                        <ExternalLink size={11} className="text-slate-400 dark:text-white/40" />
                      </a>
                    )}
                  </div>
                )}

                {/* YouTube Pitch Video Embed */}
                {(selectedProject.youtubeUrl || selectedProject.demoUrl) && (
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-white/50 flex items-center gap-2">
                      <Play size={14} className="text-red-500" /> Pitch Video
                    </h4>
                    <div className="aspect-video rounded-xl overflow-hidden border border-slate-200/60 dark:border-white/10 bg-black">
                      <iframe
                        src={
                          (() => {
                            const url = selectedProject.youtubeUrl || selectedProject.demoUrl || '';
                            if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'www.youtube.com/embed/').split('?')[0];
                            if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/').split('&')[0];
                            return url;
                          })()
                        }
                        title={`${selectedProject.title} pitch video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                    <a
                      href={selectedProject.youtubeUrl || selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-red-600 dark:text-red-400 hover:underline"
                    >
                      <ExternalLink size={12} /> Watch on YouTube — https://youtu.be/M1adKEKeFLo
                    </a>
                  </div>
                )}

                {/* Overview */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-white/50 flex items-center gap-2">
                    <Sparkles size={14} className="text-primary" /> System Overview
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-white/80 leading-relaxed">
                    {selectedProject.overview}
                  </p>
                </div>

                {/* Architecture */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-white/50 flex items-center gap-2">
                    <Cpu size={14} className="text-secondary" /> Architecture & Data Flow
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-white/80 leading-relaxed bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200/60 dark:border-white/10 font-mono">
                    {selectedProject.architecture}
                  </p>
                </div>

                {/* Results */}
                {selectedProject.results && (
                  <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-white/50 flex items-center gap-2">
                      <Trophy size={14} className="text-emerald-500 dark:text-emerald-400" /> Outcomes & Impact
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed">
                      {selectedProject.results}
                    </p>
                  </div>
                )}

                {/* Complete Feature Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-white/50">
                    Complete Feature Breakdown
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selectedProject.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-white/80 bg-slate-50 dark:bg-white/[0.03] p-2.5 rounded-lg border border-slate-200/60 dark:border-white/5">
                        <CheckCircle2 size={13} className="text-primary dark:text-cyan shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chips — liquid glass subtle */}
                <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="liquid-glass-subtle px-3 py-1 rounded-full text-xs font-mono text-slate-800 dark:text-white/90">
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

