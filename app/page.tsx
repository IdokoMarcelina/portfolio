import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Skills, Projects, Contact } from "@/components/home/Sections";
import { Reveal } from "@/components/motion/Reveal";

export default function Home() {
  return (
    <main>
      <Hero />
      <Reveal>
        <About />
        <Skills />
        <Projects />
        <Contact />
      </Reveal>
    </main>
  );
}
