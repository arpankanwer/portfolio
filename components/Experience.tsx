'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    title: 'Software Developer',
    company: 'KiloBryte',
    location: 'Guelph, ON',
    date: 'August 2025 – Present',
    description: [
      'Developing accessible, cross-platform apps for seniors across both mobile platforms.',
      'Worked with technologies including React, React Native, Next.js, Node.js, Firebase, Expo, Vercel, and native module bridging for video capabilities.',
      'Built and maintained core features for the Paige™ platform; Published on App Store and Play Store.'
    ]
  },
  {
    title: 'Software QA Engineering, Intern',
    company: 'Evertz Microsystems Ltd',
    location: 'Burlington, ON',
    date: 'May 2024 - Aug 2024',
    description: [
      'Automated over 50+ Selenium tests, reducing regression testing time by 25%, leading to faster releases.',
      'Collaborated with teams to improve application functionality including the Smart Garden IoT-plant monitoring app.'
    ]
  },
  {
    title: 'Programming Tutor',
    company: 'Sheridan College',
    location: 'Oakville, ON',
    date: 'Jan 2023 - Dec 2023',
    description: [
      'Mentored over 125+ students in programming and frameworks such as Spring Boot, AngularJS, and Django.'
    ]
  },
  {
    title: 'Application Developer',
    company: 'Eduwings Global',
    location: 'Ludhiana, India',
    date: 'Apr 2021 - Nov 2021',
    description: [
      'Developed Android application using PHP and Flutter, published on Play Store.',
      'Streamlined backend with Firebase to enable seamless data management and API integration.'
    ]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 px-6 sm:px-12 relative" ref={containerRef}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-cyan">Journey.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A timeline of my professional experience and contributions.
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-primary via-cyan to-secondary -translate-x-1/2 hidden md:block"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center justify-between w-full">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10 hidden md:block" />
                  
                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`w-full md:w-[45%] ${isEven ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}
                  >
                    <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-colors">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      
                      <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan mb-4">
                        {exp.date}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                      <h4 className="text-lg font-medium text-white/70 mb-4">{exp.company} <span className="text-muted-foreground text-sm font-normal">— {exp.location}</span></h4>
                      
                      <ul className={`space-y-2 text-muted-foreground text-sm ${isEven ? 'md:list-inside' : 'list-inside list-disc md:list-outside md:ml-4'}`}>
                        {exp.description.map((item, i) => (
                          <li key={i} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
