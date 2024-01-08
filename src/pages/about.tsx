import About from "@/components/Sections/About";
import Footer from "@/components/Sections/Footer";
import Head from "next/head";
import React from "react";

const META_TITLE = "Connor Rothschild | About";
const META_DESCRIPTION =
  "Connor Rothschild, a software and data visualization engineer.";

export default function archive() {
  return (
    <>
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />

        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
      </Head>

      <About />
      <Footer />
    </>
  );
}
