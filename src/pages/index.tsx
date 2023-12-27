import Hero from "@/components/Sections/Hero";
import Clients from "@/components/Sections/Clients";
import Projects from "@/components/Sections/Projects";
import Contact from "@/components/Sections/Contact";
import Archive from "@/components/Sections/Archive";
import Ethos from "@/components/Sections/Ethos";
import HeroSimple from "@/components/Sections/HeroSimple";
import ImageGridWrapper from "@/components/Sections/ImageGrid";
import ImageGrid from "@/components/Sections/ImageGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="bg-[--background] z-[9] relative">
        <Clients />
        {/* <ImageGrid /> */}
        <Ethos />
        <Contact />
      </div>
    </>
  );
}
