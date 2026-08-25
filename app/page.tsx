import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import GithubHeatmap from '@/components/GithubHeatmap';
import Education from '@/components/Education';
import Testimonials from '@/components/Testimonials';
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
      <Education />
      <Testimonials />
      <Contact />
    </>
  );
}
