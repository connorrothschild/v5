import Hero from "@/components/Sections/Hero";
import Clients from "@/components/Sections/Clients";
import Contact from "@/components/Sections/Contact";
import Ethos from "@/components/Sections/Ethos";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="bg-[--background] z-[9] relative">
        <Clients />
        <Ethos />
        <Contact />
      </div>
    </>
  );
}
