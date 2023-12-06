import Hero from "@/components/Sections/Hero";
import Clients from "@/components/Sections/Clients";
import Projects from "@/components/Sections/Projects";
import Contact from "@/components/Sections/Contact";
import Archive from "@/components/Sections/Archive";
import Ethos from "@/components/Sections/Ethos";
import HeroSimple from "@/components/Sections/HeroSimple";
import ImageGridWrapper from "@/components/Sections/ImageGrid";

export default function Home() {
  return (
    <>
      {/* <ImageGridWrapper
        imageUrls={[
          constructImageUrl("row-blackouts-1"),
          constructImageUrl("babby-2"),
          constructImageUrl("babby-1"),
          constructImageUrl("impact"),
          constructImageUrl("vana-1"),
          constructImageUrl("praxis-1"),
          constructImageUrl("row-tech-2"),
          constructImageUrl("row-tech-1"),
          constructImageUrl("praxis-2"),
          constructImageUrl("row-blackouts-2"),
          constructImageUrl("quarantunes-1"),
          constructImageUrl("row-tech-3"),
        ]}
      /> */}
      <HeroSimple />
      {/* <Hero /> */}
      {/* <div className="sticky top-0 z-10"> */}
      <Clients />
      <Ethos />
      {/* <Projects /> */}
      {/* <Awards /> */}
      <Contact />
      {/* </div> */}
    </>
  );
}
