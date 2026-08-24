'use client';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: 'GigJet',
    tags: ['React Native', 'Node.js', 'Full-stack'],
    description: 'A full-stack mobile app connecting service seekers and providers with chat and job postings.',
    award: 'Awarded "Best Innovation 2024" (Top 1/40+ Projects)',
    image: 'https://picsum.photos/seed/gigjet/800/600',
    demo: '#',
    github: '#',
    features: ['Job Postings', 'Real-time Chat', 'Service Provider Matching']
  },
  {
    title: 'Chatie',
    tags: ['Flutter', 'Dart', 'Azure Blob Storage', 'Firestore'],
    description: 'Cross-platform group chat app with multimedia sharing and media storage on Azure blob storage.',
    image: 'https://picsum.photos/seed/chatie/800/600',
    demo: '#',
    github: '#',
    features: ['Group Chat', 'Multimedia Sharing', 'Cloud Storage Integration']
  },
  {
    title: 'Shopping Cart',
    tags: ['Java', 'JavaFX', 'MVC'],
    description: 'User-friendly desktop app for cart management and inventory tracking, with checkout options.',
    image: 'https://picsum.photos/seed/cart/800/600',
    demo: '#',
    github: '#',
    features: ['Inventory Tracking', 'Cart Management', 'Checkout Flow']
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 sm:px-12 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-primary">Work.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Selected projects that showcase my expertise in building full-stack applications.
            </p>
          </div>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col gap-8 md:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              {/* Image Container */}
              <div className="w-full md:w-3/5 group relative rounded-3xl overflow-hidden glass-card aspect-video border border-white/10">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Content Container */}
              <div className="w-full md:w-2/5 flex flex-col justify-center">
                {project.award && (
                  <div className="mb-4 inline-flex items-center">
                    <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider">
                      🏆 {project.award}
                    </span>
                  </div>
                )}
                
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{project.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-cyan/80">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-8">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-4">
                  <a 
                    href={project.github}
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all group"
                    aria-label="View Source Code"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:scale-110 transition-transform"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  </a>
                  <a 
                    href={project.demo}
                    className="flex-1 py-3 rounded-full bg-primary text-white font-medium text-center hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group"
                  >
                    View Project <ExternalLink size={18} className="transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
