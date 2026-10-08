import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import OpenSource from '@/components/OpenSource';
import GithubHeatmap from '@/components/GithubHeatmap';
import Education from '@/components/Education';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <GithubHeatmap />
      <Experience />
      <Projects />
      <OpenSource />
      <Education />
      <Contact />
    </>
  );
}
