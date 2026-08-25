'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, ExternalLink, FileText, Mail, Sparkles, Terminal } from 'lucide-react';
import Link from 'next/link';

const roles = [
  "Software Developer",
  "Backend Engineer",
  "Mobile Developer",
  "Cloud Enthusiast"
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden px-6"
    >
      {/* Dynamic Aurora & Gradient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] bg-gradient-to-tr from-primary/25 via-secondary/20 to-cyan/20 blur-[130px] rounded-full pointer-events-none opacity-60" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan/15 blur-[100px] rounded-full pointer-events-none opacity-40 animate-pulse" />
      
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto"
      >
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-6 px-4 py-1.5 rounded-full border border-slate-200/80 dark:border-white/15 bg-white/80 dark:bg-white/5 backdrop-blur-xl inline-flex items-center gap-2.5 shadow-sm dark:shadow-[0_0_20px_rgba(79,140,255,0.15)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
          </span>
          <span className="text-xs font-medium text-slate-800 dark:text-white/90 tracking-wide">Available for Full-time</span>
          <Sparkles size={13} className="text-amber-500 dark:text-yellow-400" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight mb-4 leading-[1.08] text-slate-900 dark:text-white"
        >
          Birarpanjot Singh Kanwer
        </motion.h1>

        {/* Rotating Animated Role Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="h-12 sm:h-14 flex items-center justify-center mb-6 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoleIndex}
              initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -30, opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-cyan"
            >
              <Terminal size={26} className="text-cyan inline-block mr-1" />
              <span>{roles[currentRoleIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Value Proposition Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-white/70 font-normal max-w-3xl mb-10 leading-relaxed"
        >
          Specializing in scalable distributed systems, high-performance backends, and modern mobile & web experiences using <span className="text-slate-900 dark:text-white font-medium">Node.js, React Native, Next.js, AWS, and Cloud Architecture</span>.
        </motion.p>

        {/* 3 Call-To-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full"
        >
          <Link 
            href="#projects"
            className="px-7 py-3.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-md dark:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
          >
            View Projects <ArrowRight size={16} />
          </Link>

          <a 
            href="mailto:birarpanjot@gmail.com?subject=Portfolio%20Inquiry%20-%20Birarpanjot%20Singh%20Kanwer"
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-md dark:shadow-[0_0_25px_rgba(79,140,255,0.3)]"
          >
            Contact Me <Mail size={16} />
          </a>

          <a 
            href="https://drive.google.com/file/d/1WySmgzMxBNcgSk7RdIkixkCUsp8PCf9d/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-full glass hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 border border-slate-200/80 dark:border-white/15"
          >
            View Resume 
            <ExternalLink size={16} className="text-slate-500 dark:text-white/70" />
          </a>
        </motion.div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-white/40"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to explore</span>
        <div className="w-4 h-7 rounded-full border border-slate-300 dark:border-white/20 flex justify-center p-1">
          <motion.div
            className="w-1 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
