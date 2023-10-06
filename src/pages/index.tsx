// import HeroTest from "@/components/Sections/HeroTest";

import Hero from "@/components/Sections/Hero";
import HeroNew from "@/components/Sections/HeroNew";
import Awards from "@/components/Sections/Awards";
import Contact from "@/components/Sections/Contact";
import Footer from "@/components/Sections/Footer";

import Ethos from "@/components/Sections/Ethos";
import Projects from "@/components/Sections/Projects";
import Clients from "@/components/Sections/Clients";
import SplitTextHeader from "@/components/Sections/SplitTextHeader";
import BackgroundVideo from "@/components/BackgroundVideo";

export default function Home() {
  return (
    <>
      {/* <Hero hue={250} saturation={100} lightness={10} randomUuid="hero" /> */}
      <HeroNew />
      <Projects />
      <Awards />
      <Contact />
    </>
  );
}
