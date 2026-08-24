'use client';
import { motion } from 'framer-motion';
import { Code, Terminal, Server, Users } from 'lucide-react';

const stats = [
  { label: 'Years Experience', value: '3+', icon: Terminal },
  { label: 'Projects Built', value: '15+', icon: Code },
  { label: 'Cloud Platforms', value: '3', icon: Server },
  { label: 'Students Mentored', value: '125+', icon: Users },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 sm:px-12 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row gap-12 lg:gap-24"
        >
          {/* Left Side: Text */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                About <span className="text-primary">Me.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I am a Backend Engineer with a passion for building scalable applications using Node.js, React Native, Next.js, Spring Boot, Flutter, AWS, Firebase, and robust cloud infrastructure.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed">
                My journey includes creating accessible mobile apps for seniors at <strong className="text-white font-medium">KiloBryte</strong>, reducing testing times by 25% through automation at <strong className="text-white font-medium">Evertz Microsystems</strong>, and developing full-stack applications with elegant UIs.
              </p>
              <p className="text-white/80 leading-relaxed">
                As a Programming Tutor at <strong className="text-white font-medium">Sheridan College</strong>, I&apos;ve had the privilege of mentoring over 125 students, fostering a deep understanding of complex programming paradigms.
              </p>
            </div>
          </div>

          {/* Right Side: Stats */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:bg-white/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon size={20} />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
