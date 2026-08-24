'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 sm:px-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <GraduationCap size={24} />
              </div>
              <h2 className="font-display text-3xl font-bold">Education</h2>
            </div>
            
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <GraduationCap size={120} />
              </div>
              
              <div className="relative z-10">
                <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan mb-4">
                  Jan 2022 - Dec 2024
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">Three-year Advanced Diploma</h3>
                <h4 className="text-lg font-medium text-white/80 mb-6">Computer Systems Technology</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-muted-foreground">Institution</span>
                    <span className="font-medium text-white">Sheridan College</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-muted-foreground">Focus</span>
                    <span className="font-medium text-white text-right">Software Development & Network Engineering</span>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-muted-foreground">GPA</span>
                    <span className="font-display font-bold text-2xl text-primary">3.52</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Awards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
                <Award size={24} />
              </div>
              <h2 className="font-display text-3xl font-bold">Awards</h2>
            </div>
            
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden group hover:border-secondary/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent z-0" />
              
              <div className="relative z-10 flex flex-col h-full justify-center">
                <motion.div 
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 flex items-center justify-center text-white shadow-[0_0_40px_rgba(234,179,8,0.3)] mb-8"
                >
                  <Award size={40} />
                </motion.div>
                
                <h3 className="text-3xl font-display font-bold text-white mb-2">Best Innovation 2024</h3>
                <p className="text-muted-foreground text-lg mb-6">Top 1 of 40+ Projects for GigJet Application.</p>
                
                <p className="text-sm text-white/60 leading-relaxed">
                  Recognized for excellence in full-stack architecture, innovative problem solving, and seamless user experience.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
