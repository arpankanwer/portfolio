'use client';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Birarpanjot has exceptional problem-solving instincts. His ability to streamline our mobile video modules and ship performant features with zero regression has made a huge difference to our platform.",
    author: "Engineering Lead",
    organization: "KiloBryte Technologies",
    tag: "Mobile & Full-Stack"
  },
  {
    quote: "His automation suite work at Evertz cut our regression execution cycles significantly. He has a meticulous eye for edge cases and clean code architecture.",
    author: "Senior QA Director",
    organization: "Evertz Microsystems Ltd",
    tag: "Test Automation"
  },
  {
    quote: "As a tutor at Sheridan, Birarpanjot broke down complex Spring Boot, Django, and Data Structure concepts into intuitive patterns for over 125 students. A natural communicator and engineer.",
    author: "Faculty & Peer Review",
    organization: "Sheridan College",
    tag: "Technical Mentorship"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 sm:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan uppercase tracking-wider mb-3">
            Peer Endorsements
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Trusted by Teams & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan to-secondary">Collaborators</span>.
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto">
            Feedback from engineering leads, mentors, and peers across industry and academia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card p-6 sm:p-7 rounded-3xl glow-border flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-[10px] font-mono text-cyan border border-white/10">
                    {item.tag}
                  </span>
                </div>

                <Quote size={24} className="text-primary/40 mb-3" />
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-sm font-semibold text-white">{item.author}</p>
                <p className="text-xs text-white/50">{item.organization}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
