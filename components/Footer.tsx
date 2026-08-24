'use client';
import { useState, useEffect } from 'react';
import { ArrowUp, Heart, Sparkles, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const [torontoTime, setTorontoTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const timeString = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Toronto',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date());
      setTorontoTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#020204] py-16 px-6 sm:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Birarpanjot Singh Kanwer
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <p className="text-xs text-white/50 max-w-sm">
            Software Developer • Full-Stack & Mobile Engineer • Based in Ontario, Canada
          </p>
          {torontoTime && (
            <div className="flex items-center gap-2 mt-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-cyan">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Toronto/Guelph (EST): {torontoTime}</span>
            </div>
          )}
        </div>

        {/* Center Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-wider font-semibold text-white/60">
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
          <Link href="#skills" className="hover:text-white transition-colors">Skills</Link>
          <Link href="#experience" className="hover:text-white transition-colors">Experience</Link>
          <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="#education" className="hover:text-white transition-colors">Education</Link>
          <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Right Socials & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/arpankanwer"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="GitHub Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>

          <a
            href="https://linkedin.com/in/arpankanwer"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-[#0077b5] hover:bg-white/10 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-white/10 hover:bg-primary text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            aria-label="Scroll back to top"
            title="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
        <span>© {new Date().getFullYear()} Birarpanjot Singh Kanwer. All rights reserved.</span>
        <div className="flex items-center gap-2">
          <span>Crafted with Next.js 15, TypeScript & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
