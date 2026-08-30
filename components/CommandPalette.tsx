'use client';
import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { 
  Search, 
  FolderGit2, 
  User, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink,
  Code2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CommandPalette({ isOpen: controlledOpen, onClose }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const showModal = isControlled ? controlledOpen : open;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isControlled && onClose) {
          if (controlledOpen) onClose();
          else setOpen(true);
        } else {
          setOpen((prev) => !prev);
        }
      }
      if (e.key === 'Escape' && showModal) {
        if (isControlled && onClose) onClose();
        else setOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [controlledOpen, isControlled, onClose, showModal]);

  // Lock background scroll + compensate scrollbar width — mirrors Projects.tsx pattern
  // Prevents Lenis smooth-scroll from hijacking wheel behind the palette
  useEffect(() => {
    if (!showModal) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyPaddingRight = document.body.style.paddingRight;
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
  }, [showModal]);

  const handleClose = () => {
    if (isControlled && onClose) {
      onClose();
    } else {
      setOpen(false);
    }
  };

  const handleNavigation = (id: string) => {
    handleClose();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('birarpanjot@gmail.com');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      handleClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[120] flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20 md:pt-24 overflow-y-auto overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Backdrop — dual themed to match Projects modal: slate veil in light, black veil in dark */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl"
            onClick={handleClose}
          />

          {/* Dialog — light: white/95 + slate borders + slate text; dark: #0d0d12/95 + white/15 + white text */}
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-white/95 dark:bg-[#0d0d12]/95 backdrop-blur-xl border border-slate-200 dark:border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 overscroll-contain"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <Command className="w-full">
              <div className="flex items-center px-4 border-b border-slate-200 dark:border-white/10">
                <Search size={18} className="text-slate-400 dark:text-white/40 mr-3 shrink-0" />
                <Command.Input 
                  placeholder="Type a command, search projects, or jump to section..." 
                  className="w-full bg-transparent py-4 text-slate-900 dark:text-white text-base outline-none placeholder:text-slate-400 dark:placeholder:text-white/40"
                  autoFocus
                />
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-slate-500 dark:text-white/40 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded font-mono shrink-0">
                  ESC
                </kbd>
              </div>

              <Command.List
                data-lenis-prevent
                className="max-h-[380px] overflow-y-auto overscroll-contain p-2 space-y-1 text-sm scrollbar-thin"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <Command.Empty className="py-8 text-center text-slate-500 dark:text-white/50 text-sm">
                  No matching results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="px-2 py-1 text-xs font-semibold text-slate-500 dark:text-white/40 uppercase tracking-wider [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-slate-500 dark:[&_[cmdk-group-heading]]:text-white/40 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider">
                  <Command.Item 
                    onSelect={() => handleNavigation('about')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-slate-900 dark:data-[selected=true]:text-white"
                  >
                    <User size={16} className="text-primary" />
                    <span>About Me</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleNavigation('skills')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-slate-900 dark:data-[selected=true]:text-white"
                  >
                    <Code2 size={16} className="text-cyan" />
                    <span>Technical Arsenal & Skills</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleNavigation('experience')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-slate-900 dark:data-[selected=true]:text-white"
                  >
                    <Briefcase size={16} className="text-secondary" />
                    <span>Experience Timeline</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleNavigation('projects')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-slate-900 dark:data-[selected=true]:text-white"
                  >
                    <FolderGit2 size={16} className="text-primary" />
                    <span>Featured Projects</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleNavigation('education')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-slate-900 dark:data-[selected=true]:text-white"
                  >
                    <GraduationCap size={16} className="text-cyan" />
                    <span>Education & Awards</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleNavigation('contact')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-slate-900 dark:data-[selected=true]:text-white"
                  >
                    <Mail size={16} className="text-secondary" />
                    <span>Contact Form</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Quick Actions" className="px-2 py-1 text-xs font-semibold text-slate-500 dark:text-white/40 uppercase tracking-wider mt-3 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-slate-500 dark:[&_[cmdk-group-heading]]:text-white/40 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider">
                  <Command.Item 
                    onSelect={copyEmail}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-slate-900 dark:data-[selected=true]:text-white"
                  >
                    <div className="flex items-center gap-3">
                      {copied ? <Check size={16} className="text-emerald-500 dark:text-emerald-400" /> : <Copy size={16} className="text-slate-400 dark:text-white/60" />}
                      <span>{copied ? "Copied birarpanjot@gmail.com!" : "Copy Email Address"}</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-white/40 font-mono hidden sm:inline">birarpanjot@gmail.com</span>
                  </Command.Item>

                  <Command.Item 
                    onSelect={() => {
                      window.open('https://drive.google.com/file/d/1WySmgzMxBNcgSk7RdIkixkCUsp8PCf9d/view?usp=sharing', '_blank');
                      handleClose();
                    }}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-slate-900 dark:data-[selected=true]:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-primary" />
                      <span>View Resume</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-white/40 font-mono hidden sm:inline">Google Drive PDF</span>
                  </Command.Item>

                  <Command.Item 
                    onSelect={() => {
                      window.open('https://github.com/arpankanwer', '_blank');
                      handleClose();
                    }}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-slate-900 dark:data-[selected=true]:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <ExternalLink size={16} className="text-slate-400 dark:text-white/60" />
                      <span>Open GitHub Profile</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-white/40 font-mono hidden sm:inline">@arpankanwer</span>
                  </Command.Item>

                  <Command.Item 
                    onSelect={() => {
                      window.open('https://linkedin.com/in/arpankanwer', '_blank');
                      handleClose();
                    }}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-slate-900 dark:data-[selected=true]:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <ExternalLink size={16} className="text-[#0077b5]" />
                      <span>Open LinkedIn Profile</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-white/40 font-mono hidden sm:inline">/in/arpankanwer</span>
                  </Command.Item>

                  <Command.Item 
                    onSelect={() => {
                      handleNavigation('contact');
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-slate-900 dark:data-[selected=true]:text-white"
                  >
                    <Sparkles size={16} className="text-yellow-500 dark:text-yellow-400" />
                    <span>Send Direct Message</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div className="p-3 border-t border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/40 flex items-center justify-between text-xs text-slate-500 dark:text-white/40">
                <div className="flex items-center gap-2">
                  <span>Navigation:</span>
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded">↓</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded">↵</kbd>
                </div>
                <span className="hidden sm:inline">Birarpanjot Singh Kanwer Portfolio</span>
                <span className="sm:hidden">BSK Portfolio</span>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
