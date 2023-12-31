import Hero from "@/components/Sections/Hero";
import Intro from "@/components/Sections/Intro";
import Work from "@/components/Sections/Work";
import Contact from "@/components/Sections/Contact";
import Head from "next/head";

const META_TITLE = "Connor Rothschild";
const META_DESCRIPTION =
  "The portfolio of software & data visualization engineer, Connor Rothschild.";

export default function Home() {
  return (
    <>
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />

        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
      </Head>
      <Hero />
      <Intro />
      <Work />
      <Contact />
    </>
  );
}
