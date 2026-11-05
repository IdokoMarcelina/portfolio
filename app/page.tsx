import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Projects } from "@/components/home/Projects";
import { Contact, Experience, Skills } from "@/components/home/Sections";
import { Reveal } from "@/components/motion/Reveal";

export default function Home() {
  return (
    <main>
      <Hero />
      <Reveal>
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </Reveal>
    </main>
  );
}
