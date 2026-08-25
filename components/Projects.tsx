'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Layers, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Cpu, 
  ShieldAlert, 
  Trophy,
  Smartphone,
  Download,
  Flame,
  Radio,
  Play
} from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'production' | 'featured' | 'iot' | 'opensource';
  tags: string[];
  description: string;
  award?: string;
  badge?: string;
  downloads?: string;
  image: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  demoUrl?: string;
  youtubeUrl?: string;
  githubUrl?: string;
  overview: string;
  architecture: string;
  features: string[];
  challenges: string;
  results: string;
  metrics: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    id: 'paige-connect',
    title: 'Paige Connect',
    subtitle: 'Senior Companion & Healthcare Video Bridge (KiloBryte)',
    category: 'production',
    tags: ['React Native', 'iOS', 'Android', 'WebRTC Video Bridge', 'TypeScript', 'Redux', 'REST API'],
    description: 'Production companion mobile application built for senior care connectivity and video calling with dedicated hardware hubs, featuring custom native module bridging, real-time presence, and accessible UI.',
    badge: 'Live on App Store & Google Play',
    image: '/projects/paigeconnect.png',
    appStoreUrl: 'https://apps.apple.com/ca/app/paige-connect/id6744338186',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.kilobryte.paigecompanion&hl=en_CA',
    overview: 'Engineered as a core mobile companion for KiloBryte\'s senior telehealth system. Paige Connect enables family members and caregivers to bridge crystal-clear video calls, monitor device heartbeats, and exchange secure check-in updates.',
    architecture: 'React Native cross-platform client with custom Native Objective-C/Swift and Java module bridges for low-overhead audio/video streaming, background push notification orchestration, and bi-directional WebSocket telemetry.',
    features: [
      'Low-latency 1-tap video calling with native WebRTC hardware decoding',
      'Background call alerts and persistent caregiver notification priority',
      'Live hardware hub status monitoring & connection diagnostics',
      'Accessible, high-contrast UI tailored for multi-generational families',
      'Cross-platform parity across iOS (App Store) and Android (Google Play)'
    ],
    challenges: 'Maintaining reliable background video wake-ups across battery-optimized Android devices and strict iOS VoIP push constraints.',
    results: 'Successfully deployed to Apple App Store and Google Play Store with active daily users across North American care facilities.',
    metrics: [
      { label: 'Platforms', value: 'iOS & Android' },
      { label: 'Store Status', value: 'Live' },
      { label: 'Audio Latency', value: '<120ms' }
    ]
  },
  {
    id: 'gigjet',
    title: 'GigJet',
    subtitle: 'On-Demand Service Marketplace & Real-Time Chat Platform',
    category: 'featured',
    tags: ['React Native', 'Node.js', 'Express', 'Firebase', 'Expo', 'REST API'],
    description: 'Full-stack mobile platform engineered to connect freelance service seekers and verified providers with real-time bidirectional chat, geo-location job postings, and instant quote dispatching.',
    award: 'Awarded "Best Innovation 2024" (Top 1/40+ Capstone Teams)',
    image: '/projects/gigjet.png',
    youtubeUrl: 'https://youtu.be/M1adKEKeFLo',
    demoUrl: 'https://youtu.be/M1adKEKeFLo',
    overview: 'GigJet is an end-to-end gig economy platform designed to eliminate friction in hiring local trades and technical specialists. It features a reactive mobile frontend in React Native with a high-throughput Node.js/Express API layer and Firebase real-time sync.',
    architecture: 'Microservice-ready REST API with modular controllers, JWT authentication, Firebase Firestore listeners for low-latency messaging, and cloud-hosted object buckets for portfolio image uploads.',
    features: [
      'Bidirectional real-time messaging with attachment support',
      'Geolocated service request creation and smart proximity filtering',
      'Provider quote bidding with instant push notification delivery',
      'In-app rating, review, and verification badge system',
      'End-to-end responsive UI optimized for iOS and Android'
    ],
    challenges: 'Ensuring sub-100ms real-time chat latency across diverse mobile device connections and preventing race conditions during concurrent job bids.',
    results: 'Won "Best Innovation 2024" at Sheridan College among 40+ competitor teams, recognized for superior software architecture, clean user experience, and robust API design.',
    metrics: [
      { label: 'Award Standing', value: '1st Place' },
      { label: 'Chat Latency', value: '<80ms' },
      { label: 'Competitor Teams', value: '40+' }
    ]
  },
  {
    id: 'skillkoo',
    title: 'SkillKoo (Eduwings)',
    subtitle: 'Global EdTech Mobile Learning Ecosystem (100+ Downloads)',
    category: 'production',
    tags: ['Flutter', 'iOS', 'Android', 'Firebase', 'EdTech', 'REST APIs'],
    description: 'Global educational mobile platform connecting learners and mentors with interactive course catalogs, personalized learning roadmaps, real-time assessment tracking, and multi-region localization.',
    badge: 'Live App',
    downloads: '100+',
    image: '/projects/skillkoo.png',
    appStoreUrl: 'https://apps.apple.com/us/app/eduwings/id6761086381',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.eduwings.global&hl=en',
    overview: 'SkillKoo transforms mobile education with rich multimedia course materials, structured module progress tracking, and instant mentor notifications. Engineered for high performance across diverse smartphone tiers.',
    architecture: 'Modular mobile client architecture with reactive state management, asynchronous offline-first course caching, Firebase authentication, and scalable media streaming CDN.',
    features: [
      'Multi-category course browsing with smooth video stream playback',
      'Offline module progress persistence and cloud synchronization',
      'Push notifications for upcoming live sessions & quiz deadlines',
      'Multi-lingual support and adaptive theme rendering',
      'Dual platform availability on iOS App Store & Google Play'
    ],
    challenges: 'Optimizing media caching to support smooth playback in low-bandwidth network zones across various international regions.',
    results: 'Surpassed 100+ downloads with positive feedback across both major mobile application marketplaces.',
    metrics: [
      { label: 'Downloads', value: '100+' },
      { label: 'Ecosystem', value: 'iOS & Android' },
      { label: 'Uptime', value: '99.9%' }
    ]
  },
  {
    id: 'smart-garden',
    title: 'Smart Garden (IoT)',
    subtitle: 'Automated Soil & Environmental Plant Telemetry Platform',
    category: 'iot',
    tags: ['Python', 'Hardware Sensors', 'IoT Telemetry', 'Actuators', 'Embedded Systems'],
    description: 'An automated intelligent botanical monitoring system utilizing environmental sensors, automated moisture detection, automated watering triggers, and real-time telemetry analytics.',
    badge: 'Embedded Systems & Automation',
    image: '/projects/smartgarden.png',
    githubUrl: 'https://github.com/arpankanwer/SmartGarden',
    overview: 'Smart Garden automates precision horticulture by continuously streaming soil moisture, ambient humidity, temperature, and light levels into an event processing engine that dynamically manages hydration and lighting cycles.',
    architecture: 'Hardware sensor grid connected to embedded micro-controllers running Python firmware, transmitting JSON telemetry over MQTT/HTTP to a centralized dashboard with automated threshold actuators.',
    features: [
      'Real-time sensor data acquisition (Moisture, Temp, Humidity, Light)',
      'Automated pump and solenoid valve actuation based on PID thresholds',
      'Historical climate trend analysis and moisture depletion charting',
      'Configurable alert notifications when parameters cross safety limits',
      'Power-efficient sleep cycles and sensor calibration algorithms'
    ],
    challenges: 'Calibrating analog moisture sensor degradation and preventing over-watering cycles during rapid temperature fluctuations.',
    results: 'Achieved 100% plant hydration consistency with zero manual intervention over a 60-day continuous testing cycle.',
    metrics: [
      { label: 'Sensor Polling', value: 'Real-Time' },
      { label: 'Water Efficiency', value: '+45%' },
      { label: 'Platform', value: 'Python / IoT' }
    ]
  },
  {
    id: 'oh-my-opencode-slim',
    title: 'oh-my-opencode-slim',
    subtitle: 'High-Performance Streamlined Dev Environment Configuration',
    category: 'opensource',
    tags: ['Open Source', 'Shell', 'Zsh / Bash', 'DevOps', 'Productivity', 'Automation'],
    description: 'Lightweight, ultra-fast developer shell environment and toolkit designed to minimize terminal latency, optimize plugin loading sequences, and standardize engineering workflows.',
    badge: 'Open Source Contribution',
    image: '/projects/ohmyopencode.webp',
    githubUrl: 'https://github.com/arpankanwer/oh-my-opencode-slim',
    overview: 'A community-driven open-source project focused on shaving hundreds of milliseconds off interactive shell startup times while maintaining rich autocomplete, git prompt decorations, and aliases.',
    architecture: 'Asynchronous lazy-loading architecture with modular prompt engines, caching layers for git status evaluation, and zero-dependency POSIX fallback routines.',
    features: [
      'Sub-15ms terminal startup and prompt evaluation latency',
      'Asynchronous Git status daemon avoiding large repository lag',
      'Zero-bloat configuration syntax with pluggable alias modules',
      'Cross-platform compatibility across macOS, Linux, and WSL2',
      'Active open-source community contributions and updates'
    ],
    challenges: 'Eliminating synchronous fork-exec overhead during deep git status checks in multi-gigabyte monorepos.',
    results: 'Reduced prompt rendering time by over 70% compared to standard monolithic terminal frameworks.',
    metrics: [
      { label: 'Startup Time', value: '<15ms' },
      { label: 'Lag Reduction', value: '70% Faster' },
      { label: 'License', value: 'MIT Open Source' }
    ]
  },
  {
    id: 'chatie',
    title: 'Chatie',
    subtitle: 'Cross-Platform Real-Time Group Chat with Cloud Media Storage',
    category: 'featured',
    tags: ['Flutter', 'Dart', 'Azure Blob Storage', 'Cloud Firestore', 'Mobile'],
    description: 'A cross-platform mobile messenger featuring encrypted group rooms, instant multimedia sharing, media pipeline compression, and scalable Azure Blob storage.',
    image: '/projects/chatie.png',
    githubUrl: 'https://github.com/arpankanwer/chatie',
    overview: 'Chatie provides seamless group collaboration with instant media streaming. Built natively with Flutter and Dart, the application offloads heavy multimedia payloads to Azure Blob Storage while maintaining live state and presence in Cloud Firestore.',
    architecture: 'Hybrid multi-cloud architecture pairing Google Firebase (Authentication & Realtime Firestore) with Microsoft Azure (Blob Storage with SAS token security) to minimize latency and optimize media ingestion costs.',
    features: [
      'Real-time group channels and direct 1-on-1 private messaging',
      'High-resolution photo and video compression pipeline',
      'Azure Blob Storage integration with secure temporary access tokens',
      'Online/offline presence indicators and read receipts',
      'Smooth 60fps animations with Flutter Material 3 design'
    ],
    challenges: 'Handling large video uploads over fluctuating mobile networks without blocking UI rendering or causing out-of-memory crashes on budget Android devices.',
    results: 'Successfully handled concurrent group streams with zero dropped frames, achieving over 99.8% message delivery reliability.',
    metrics: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Media Compression', value: '65% Reduction' },
      { label: 'Delivery Rate', value: '99.8%' }
    ]
  }
];

const categoryTabs = [
  { id: 'all', label: 'All Projects' },
  { id: 'production', label: 'Production Mobile Apps' },
  { id: 'featured', label: 'Award & Enterprise' },
  { id: 'iot', label: 'IoT & Embedded' },
  { id: 'opensource', label: 'Open Source' },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState('all');

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

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-primary uppercase tracking-wider mb-3">
              Portfolio Showcase
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Featured <span className="text-gradient">Engineering Work</span>.
            </h2>
            <p className="text-slate-600 dark:text-white/70 text-base sm:text-lg max-w-2xl">
              Live mobile apps published on the App Store & Google Play, award-winning capstones, IoT systems, and open-source contributions.
            </p>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categoryTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white/70 dark:hover:text-white border border-slate-200 dark:border-white/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-16">
          {filteredProjects.map((project, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center glass-card p-6 sm:p-8 md:p-10 rounded-3xl glow-border`}
              >
                {/* Visual Preview */}
                <div 
                  onClick={() => setSelectedProject(project)}
                  className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden aspect-[16/10] group cursor-pointer border border-slate-200/80 dark:border-white/15 bg-slate-100 dark:bg-black/40 flex items-center justify-center p-4"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    referrerPolicy="no-referrer"
                    className="object-contain p-2 transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 dark:bg-black/70 backdrop-blur-md text-white text-xs font-mono border border-white/20">
                      Click for Deep-Dive Specs
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary group-hover:scale-110 transition-all">
                      <ExternalLink size={14} />
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {project.award && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 dark:bg-secondary/20 border border-secondary/30 text-primary dark:text-cyan text-xs font-semibold uppercase tracking-wider">
                          <Trophy size={13} className="text-amber-500 dark:text-yellow-400" />
                          <span>{project.award}</span>
                        </div>
                      )}

                      {project.badge && !project.award && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/30 text-primary dark:text-cyan text-xs font-semibold">
                          <Smartphone size={13} className="text-primary" />
                          <span>{project.badge}</span>
                        </div>
                      )}

                      {project.downloads && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                          <Download size={12} />
                          <span>{project.downloads} Downloads</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-primary dark:text-cyan/90 mb-4">{project.subtitle}</p>

                    <p className="text-slate-600 dark:text-white/75 text-sm sm:text-base leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Key Highlights Bullet points */}
                    <div className="space-y-2 mb-6">
                      {project.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-white/70">
                          <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-slate-200/80 dark:border-white/10">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 min-w-[170px] py-2.5 px-4 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-xs sm:text-sm hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm dark:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    >
                      <Layers size={15} /> System Architecture
                    </button>
                    
                    {/* YouTube / Demo Link — GigJet Pitch Video */}
                    {(project.youtubeUrl || project.demoUrl) && (
                      <a
                        href={project.youtubeUrl || project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-full bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 text-white transition-all text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                        title="Watch pitch video on YouTube"
                      >
                        <Play size={14} className="fill-white" />
                        <span>Pitch Video</span>
                      </a>
                    )}

                    {/* Apple App Store Link */}
                    {project.appStoreUrl && (
                      <a
                        href={project.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200/80 dark:bg-white/5 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white transition-all text-xs font-mono flex items-center gap-1.5"
                        title="View on Apple App Store"
                      >
                        <Smartphone size={14} className="text-primary" />
                        <span>App Store</span>
                      </a>
                    )}

                    {/* Google Play Link */}
                    {project.playStoreUrl && (
                      <a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200/80 dark:bg-white/5 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white transition-all text-xs font-mono flex items-center gap-1.5"
                        title="View on Google Play Store"
                      >
                        <Radio size={14} className="text-emerald-500 dark:text-emerald-400" />
                        <span>Google Play</span>
                      </a>
                    )}

                    {/* GitHub Link */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200/80 dark:bg-white/5 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white transition-all"
                        title="View Source on GitHub"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
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
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center dark:text-white transition-colors cursor-pointer"
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
                    {selectedProject.downloads && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                        <Download size={12} />
                        <span>{selectedProject.downloads} Downloads</span>
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

                {/* Live App Store Links if available */}
                {(selectedProject.appStoreUrl || selectedProject.playStoreUrl || selectedProject.githubUrl || selectedProject.youtubeUrl || selectedProject.demoUrl) && (
                  <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
                    <span className="text-xs text-slate-600 dark:text-white/60 font-mono">Live Access:</span>
                    {(selectedProject.youtubeUrl || selectedProject.demoUrl) && (
                      <a
                        href={selectedProject.youtubeUrl || selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                      >
                        <Play size={13} className="fill-white" />
                        <span>Pitch Video on YouTube</span>
                        <ExternalLink size={11} className="text-white/70" />
                      </a>
                    )}
                    {selectedProject.appStoreUrl && (
                      <a
                        href={selectedProject.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-full bg-slate-200/70 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
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
                        className="px-3.5 py-1.5 rounded-full bg-slate-200/70 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
                      >
                        <Radio size={13} className="text-emerald-500 dark:text-emerald-400" />
                        <span>Google Play Store</span>
                        <ExternalLink size={11} className="text-slate-400 dark:text-white/40" />
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-full bg-slate-200/70 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
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

                {/* Challenges & Results */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-white/50 flex items-center gap-2">
                      <ShieldAlert size={14} className="text-amber-500 dark:text-amber-400" /> Engineering Challenges
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed">
                      {selectedProject.challenges}
                    </p>
                  </div>

                  <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-white/50 flex items-center gap-2">
                      <Trophy size={14} className="text-emerald-500 dark:text-emerald-400" /> Outcomes & Impact
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed">
                      {selectedProject.results}
                    </p>
                  </div>
                </div>

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

                {/* Tech Stack Chips */}
                <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-xs font-mono text-slate-800 dark:text-white/90 border border-slate-200/50 dark:border-transparent">
                      {tag}
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

