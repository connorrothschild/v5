import Hero from "@/components/Sections/Hero";
import Intro from "@/components/Sections/Intro";
import Work from "@/components/Sections/Work";
import Contact from "@/components/Sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="bg-[--background] z-[9] relative">
        <Intro />
        <Work />
        <Contact />
      </div>
    </>
  );
}
