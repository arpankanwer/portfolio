'use client';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, Command as CommandIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import CommandPalette from '@/components/CommandPalette';

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
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
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

      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 flex justify-center py-4 px-4 sm:px-8 transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className={cn(
          "flex items-center justify-between w-full max-w-6xl rounded-full px-5 py-2.5 transition-all duration-300",
          scrolled ? "glass shadow-2xl border-white/10" : "bg-black/20 backdrop-blur-sm border border-white/5"
        )}>
          {/* Logo with Easter Egg */}
          <button 
            onClick={handleLogoClick} 
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            title="Click 5 times for a surprise!"
          >
            <span className="font-display font-bold text-xl tracking-tighter text-white group-hover:text-primary transition-colors">
              BK<span className="text-primary group-hover:text-cyan transition-colors">.</span>
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors">
              dev
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-xs uppercase tracking-wider font-semibold text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Quick Command Palette Button */}
            <button
              onClick={() => setCommandOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/60 hover:text-white transition-all cursor-pointer"
              title="Command Palette (⌘K)"
            >
              <CommandIcon size={13} />
              <span className="hidden sm:inline">Search</span>
              <kbd className="text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/70">⌘K</kbd>
            </button>

            <Link 
              href="#contact" 
              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-white text-black rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,140,255,0.4)]"
            >
              Contact
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-white p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 lg:hidden"
        >
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link 
                href={link.href}
                className="text-2xl font-display font-semibold text-white/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <div className="pt-6 flex flex-col items-center gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCommandOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-sm text-white"
            >
              <CommandIcon size={16} /> Open Command Palette (⌘K)
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
