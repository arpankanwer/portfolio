'use client';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, Command as CommandIcon, Sparkles, FileText, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import CommandPalette from '@/components/CommandPalette';
import { useTheme } from '@/components/ThemeProvider';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    if (newCount === 5) {
      setShowEasterEgg(true);
      setTimeout(() => {
        setShowEasterEgg(false);
        setLogoClicks(0);
      }, 5000);
    }
  };

  return (
    <>
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* Easter Egg Banner */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[110] px-6 py-3 rounded-full bg-gradient-to-r from-primary via-secondary to-cyan text-white shadow-2xl flex items-center gap-3 border border-white/20"
          >
            <Sparkles className="animate-spin text-yellow-300" size={20} />
            <span className="font-medium text-sm">
              ✨ Secret Unlocked! Senior Software Engineer ready to build world-class systems.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 flex justify-center py-4 px-4 sm:px-8 transition-all duration-300 pointer-events-auto",
          scrolled ? "py-2.5 sm:py-3" : "py-4 sm:py-5"
        )}
      >
        <div className={cn(
          "relative flex items-center justify-between w-full max-w-6xl rounded-full px-4 sm:px-5 py-2 transition-all duration-500 overflow-hidden",
          // liquid glass base — ultra translucent, high blur + saturation, inner highlight
          "border supports-[backdrop-filter]:backdrop-blur-2xl supports-[backdrop-filter]:backdrop-saturate-150",
          // fallback solid for browsers without backdrop-filter, liquid translucent when supported — MAX glassy
          scrolled
            ? [
                // — Scrolled: max glassy, barely visible tint —
                "bg-white/35 supports-[backdrop-filter]:bg-white/12 supports-[backdrop-filter]:bg-gradient-to-b supports-[backdrop-filter]:from-white/10 supports-[backdrop-filter]:via-white/2 supports-[backdrop-filter]:to-transparent",
                "dark:bg-zinc-900/35 supports-[backdrop-filter]:dark:bg-white/[0.02] supports-[backdrop-filter]:dark:from-white/[0.03] supports-[backdrop-filter]:dark:via-white/[0.005] supports-[backdrop-filter]:dark:to-transparent",
                "border-white/10 dark:border-white/06",
                "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_8px_32px_rgba(0,0,0,0.02),0_1px_3px_rgba(0,0,0,0.01)]",
                "supports-[backdrop-filter]:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_8px_32px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.01)]",
              ].join(" ")
            : [
                // — Top / unscrolled: pure glass, almost invisible —
                "bg-white/15 supports-[backdrop-filter]:bg-white/05 supports-[backdrop-filter]:bg-gradient-to-b supports-[backdrop-filter]:from-white/08 supports-[backdrop-filter]:via-white/1 supports-[backdrop-filter]:to-transparent",
                "dark:bg-zinc-900/15 supports-[backdrop-filter]:dark:bg-white/[0.008] supports-[backdrop-filter]:dark:from-white/[0.015] supports-[backdrop-filter]:dark:via-white/[0.004] supports-[backdrop-filter]:dark:to-transparent",
                "border-white/08 dark:border-white/[0.02]",
                "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_4px_24px_rgba(0,0,0,0.01),0_1px_2px_rgba(0,0,0,0.005)]",
                "supports-[backdrop-filter]:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_32px_rgba(0,0,0,0.01),0_2px_8px_rgba(0,0,0,0.005)]",
              ].join(" ")
        )}>
          {/* Logo with Easter Egg */}
          <button 
            onClick={handleLogoClick} 
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            title="Click 5 times for a surprise!"
          >
            <span className="font-display font-bold text-xl tracking-tighter text-slate-900 dark:text-white group-hover:text-primary transition-colors">
              BK<span className="text-primary group-hover:text-cyan transition-colors">.</span>
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-500 dark:text-white/40 group-hover:text-slate-900 dark:group-hover:text-white/70 transition-colors">
              dev
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-xs uppercase tracking-wider font-semibold text-slate-600 dark:text-white/70 hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons — iOS Liquid Glass */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle Button — liquid glass subtle */}
            <button
              onClick={toggleTheme}
              className="liquid-glass rounded-full w-9 h-9 flex items-center justify-center text-slate-700 dark:text-white cursor-pointer shrink-0"
              title={theme === 'dark' ? "Switch to Light theme" : "Switch to Dark theme"}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={15} className="text-amber-400" />
              ) : (
                <Moon size={15} className="text-indigo-600" />
              )}
            </button>

            {/* Quick Command Palette Button — liquid glass */}
            <button
              onClick={() => setCommandOpen(true)}
              className="liquid-glass rounded-full flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-white/80 cursor-pointer shrink-0"
              title="Command Palette (⌘K)"
            >
              <CommandIcon size={13} />
              <span className="hidden md:inline font-medium">Search</span>
              <kbd className="hidden sm:inline-flex text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/50 dark:bg-white/10 border border-white/30 dark:border-white/10 text-slate-700 dark:text-white/70">⌘K</kbd>
            </button>

            <a 
              href="https://drive.google.com/file/d/1WySmgzMxBNcgSk7RdIkixkCUsp8PCf9d/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-white cursor-pointer shrink-0"
              title="View Resume on Google Drive"
            >
              <FileText size={12} className="text-primary" />
              <span>Resume</span>
            </a>

            <Link 
              href="#contact" 
              className="liquid-glass-strong inline-flex items-center justify-center px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer shrink-0"
            >
              <span>Contact</span>
            </Link>

            {/* Mobile Menu Toggle — liquid glass */}
            <button 
              className="liquid-glass lg:hidden w-9 h-9 rounded-full flex items-center justify-center text-slate-900 dark:text-white cursor-pointer shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-white dark:bg-[#050507] supports-[backdrop-filter]:bg-white/95 supports-[backdrop-filter]:dark:bg-[#050507]/95 supports-[backdrop-filter]:backdrop-blur-2xl flex flex-col items-center justify-center gap-6 lg:hidden"
        >
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link 
                href={link.href}
                className="text-2xl font-display font-semibold text-slate-800 dark:text-white/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <div className="pt-6 flex flex-col items-center gap-3">
            <button
              onClick={toggleTheme}
              className="liquid-glass flex items-center gap-2 px-5 py-2.5 rounded-full text-slate-800 dark:text-white text-sm font-medium cursor-pointer"
            >
              {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-600" />}
              <span>{theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}</span>
            </button>

            <a
              href="https://drive.google.com/file/d/1WySmgzMxBNcgSk7RdIkixkCUsp8PCf9d/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-strong flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText size={16} /> <span>View Resume (PDF)</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCommandOpen(true);
              }}
              className="liquid-glass flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-slate-800 dark:text-white cursor-pointer"
            >
              <CommandIcon size={16} /> <span>Search & Actions (⌘K)</span>
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
