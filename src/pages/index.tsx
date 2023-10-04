// import HeroTest from "@/components/Sections/HeroTest";

import Hero from "@/components/Sections/Hero";
import HeroNew from "@/components/Sections/HeroNew";
import Awards from "@/components/Sections/Awards";
import Contact from "@/components/Sections/Contact";

import Ethos from "@/components/Sections/Ethos";
import Projects from "@/components/Sections/Projects";
import Clients from "@/components/Sections/Clients";
import SplitTextHeader from "@/components/Sections/SplitTextHeader";
import BackgroundVideo from "@/components/BackgroundVideo";
import Jukebox from "@/components/Jukebox/Jukebox";

export default function Home() {
  return (
    <>
      {/* <Hero hue={250} saturation={100} lightness={10} randomUuid="hero" /> */}
      <HeroNew hue={250} saturation={100} lightness={10} randomUuid="hero" />
      <Projects />
      <Awards />
      <Contact />
      {/* <BackgroundVideo /> */}

      {/* <Clients /> */}
      {/* <HeroTest /> */}

      {/* <Awards
        stopColor1HueBase={0}
        stopColor1Saturation={100}
        stopColor1Lightness={10}
        stopColor2HueBase={0}
        stopColor2Saturation={10}
        stopColor2Lightness={10}
        randomUuid="awards"
      />
      <Contact
        stopColor1HueBase={0}
        stopColor1Saturation={100}
        stopColor1Lightness={10}
        stopColor2HueBase={0}
        stopColor2Saturation={10}
        stopColor2Lightness={10}
        randomUuid="contact"
      /> */}
    </>
  );
}
