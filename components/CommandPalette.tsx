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
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 md:p-20">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#0d0d12]/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            <Command className="w-full">
              <div className="flex items-center px-4 border-b border-white/10">
                <Search size={18} className="text-white/40 mr-3" />
                <Command.Input 
                  placeholder="Type a command, search projects, or jump to section..." 
                  className="w-full bg-transparent py-4 text-white text-base outline-none placeholder:text-white/40"
                  autoFocus
                />
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-white/40 bg-white/5 border border-white/10 rounded font-mono">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[380px] overflow-y-auto p-2 space-y-1 text-sm">
                <Command.Empty className="py-8 text-center text-white/50 text-sm">
                  No matching results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="px-2 py-1 text-xs font-semibold text-white/40 uppercase tracking-wider">
                  <Command.Item 
                    onSelect={() => handleNavigation('about')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <User size={16} className="text-primary" />
                    <span>About Me</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleNavigation('skills')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <Code2 size={16} className="text-cyan" />
                    <span>Technical Arsenal & Skills</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleNavigation('experience')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <Briefcase size={16} className="text-secondary" />
                    <span>Experience Timeline</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleNavigation('projects')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <FolderGit2 size={16} className="text-primary" />
                    <span>Featured Projects</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleNavigation('education')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <GraduationCap size={16} className="text-cyan" />
                    <span>Education & Awards</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleNavigation('contact')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <Mail size={16} className="text-secondary" />
                    <span>Contact Form</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Quick Actions" className="px-2 py-1 text-xs font-semibold text-white/40 uppercase tracking-wider mt-3">
                  <Command.Item 
                    onSelect={copyEmail}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} className="text-white/60" />}
                      <span>{copied ? "Copied birarpanjot@gmail.com!" : "Copy Email Address"}</span>
                    </div>
                    <span className="text-xs text-white/40 font-mono">birarpanjot@gmail.com</span>
                  </Command.Item>

                  <Command.Item 
                    onSelect={() => {
                      window.open('https://drive.google.com/file/d/1WySmgzMxBNcgSk7RdIkixkCUsp8PCf9d/view?usp=sharing', '_blank');
                      handleClose();
                    }}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-primary" />
                      <span>View Resume</span>
                    </div>
                    <span className="text-xs text-white/40 font-mono">Google Drive PDF</span>
                  </Command.Item>

                  <Command.Item 
                    onSelect={() => {
                      window.open('https://github.com/arpankanwer', '_blank');
                      handleClose();
                    }}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <ExternalLink size={16} className="text-white/60" />
                      <span>Open GitHub Profile</span>
                    </div>
                    <span className="text-xs text-white/40 font-mono">@arpankanwer</span>
                  </Command.Item>

                  <Command.Item 
                    onSelect={() => {
                      window.open('https://linkedin.com/in/arpankanwer', '_blank');
                      handleClose();
                    }}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <ExternalLink size={16} className="text-[#0077b5]" />
                      <span>Open LinkedIn Profile</span>
                    </div>
                    <span className="text-xs text-white/40 font-mono">/in/arpankanwer</span>
                  </Command.Item>

                  <Command.Item 
                    onSelect={() => {
                      handleNavigation('contact');
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <Sparkles size={16} className="text-yellow-400" />
                    <span>Send Direct Message</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div className="p-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-white/40">
                <div className="flex items-center gap-2">
                  <span>Navigation:</span>
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↓</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↵</kbd>
                </div>
                <span>Birarpanjot Singh Kanwer Portfolio</span>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
