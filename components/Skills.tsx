'use client';
import { motion } from 'framer-motion';

const skills = [
  {
    category: 'Programming Languages',
    items: ['JavaScript', 'TypeScript', 'Java', 'Dart', 'Python', 'SQL', 'C#'],
  },
  {
    category: 'Frameworks & Tools',
    items: ['Node.js', 'React.js', 'Next.js', 'React Native', 'Spring Boot', 'Django', 'Flutter', 'Jenkins'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS (EC2, S3, RDS, Lambda)', 'Docker', 'GitHub Actions', 'Vercel', 'Expo'],
  },
  {
    category: 'Database & Others',
    items: ['MongoDB', 'SQL Server', 'Firebase', 'RESTful API Design', 'Agile/Scrum', 'Git', 'CI/CD'],
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 sm:px-12 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-secondary">Arsenal.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A comprehensive overview of the technologies and tools I utilize to engineer modern digital solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-3xl glow-border"
            >
              <h3 className="text-xl font-bold text-white mb-6 font-display tracking-wide uppercase text-sm">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-primary/50 transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
