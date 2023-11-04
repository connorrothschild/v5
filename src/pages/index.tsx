import Hero from "@/components/Sections/Hero";
import Projects from "@/components/Sections/Projects";
import Awards from "@/components/Sections/Awards";
import Contact from "@/components/Sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="sticky top-0 z-10">
        <Projects />
        <Awards />
        <Contact />
      </div>
    </>
  );
}
