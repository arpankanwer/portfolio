'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden px-6"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 blur-[120px] rounded-full pointer-events-none opacity-40" />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md inline-flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="text-sm font-medium text-white/80">Available for new opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6 leading-[1.1]"
        >
          Hi, I&apos;m <br className="md:hidden" />
          <span className="text-gradient">Birarpanjot Singh Kanwer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-lg md:text-2xl text-muted-foreground font-medium max-w-2xl mb-10 leading-relaxed"
        >
          Software Developer bridging the gap between elegant design and robust backend engineering.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link 
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-medium text-base hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            View Projects <ArrowRight size={18} />
          </Link>
          <a 
            href="/resume.pdf"
            target="_blank"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass font-medium text-base hover:bg-white/10 transition-colors flex items-center justify-center gap-2 group"
          >
            Download Resume 
            <Download size={18} className="text-muted-foreground group-hover:text-white transition-colors" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/50 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
