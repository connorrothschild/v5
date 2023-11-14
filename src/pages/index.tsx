import Hero from "@/components/Sections/Hero";
import Clients from "@/components/Sections/Clients";
import Projects from "@/components/Sections/Projects";
import Contact from "@/components/Sections/Contact";
import Archive from "@/components/Sections/Archive";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <div className="sticky top-0 z-10"> */}
      <Clients />
      <Projects />
      {/* <Awards /> */}
      <Contact />
      {/* </div> */}
    </>
  );
}
