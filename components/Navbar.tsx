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
          "flex items-center justify-between w-full max-w-6xl rounded-full px-4 sm:px-5 py-2 transition-all duration-300",
          scrolled 
            ? "glass shadow-lg border-slate-200/80 dark:border-white/10" 
            : "bg-white/70 dark:bg-black/40 backdrop-blur-md border border-slate-200/60 dark:border-white/5 shadow-sm"
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

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white transition-all cursor-pointer"
              title={theme === 'dark' ? "Switch to Light theme" : "Switch to Dark theme"}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={15} className="text-amber-400 rotate-0 transition-transform duration-300" />
              ) : (
                <Moon size={15} className="text-indigo-600 rotate-0 transition-transform duration-300" />
              )}
            </button>

            {/* Quick Command Palette Button */}
            <button
              onClick={() => setCommandOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              title="Command Palette (⌘K)"
            >
              <CommandIcon size={13} />
              <span className="hidden md:inline">Search</span>
              <kbd className="text-[10px] font-mono bg-slate-200/80 dark:bg-white/10 px-1.5 py-0.5 rounded text-slate-700 dark:text-white/70">⌘K</kbd>
            </button>

            <a 
              href="https://drive.google.com/file/d/1WySmgzMxBNcgSk7RdIkixkCUsp8PCf9d/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white rounded-full transition-all duration-200 border border-slate-200 dark:border-white/10"
              title="View Resume on Google Drive"
            >
              <FileText size={12} className="text-primary" />
              <span>Resume</span>
            </a>

            <Link 
              href="#contact" 
              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-slate-900 text-white dark:bg-white dark:text-black rounded-full hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              Contact
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-slate-900 dark:text-white p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
          className="fixed inset-0 z-40 bg-white/95 dark:bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 lg:hidden"
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
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white text-sm font-medium border border-slate-200 dark:border-white/10"
            >
              {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-600" />}
              <span>{theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}</span>
            </button>

            <a
              href="https://drive.google.com/file/d/1WySmgzMxBNcgSk7RdIkixkCUsp8PCf9d/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText size={16} /> View Resume (PDF)
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCommandOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-white/10 text-sm text-slate-800 dark:text-white"
            >
              <CommandIcon size={16} /> Search & Actions (⌘K)
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
