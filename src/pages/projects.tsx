import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import Archive from "@/components/Sections/Archive";
import FeaturedProjects from "@/components/Sections/FeaturedProjects";
import Footer from "@/components/Sections/Footer";
import React from "react";
import Head from "next/head";

const META_TITLE = "Connor Rothschild";
const META_DESCRIPTION =
  "The portfolio of software & data visualization engineer, Connor Rothschild.";

export default function projects() {
  return (
    <>
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CL_Rothschild" />
        <meta name="twitter:creator" content="@CL_Rothschild" />
        <meta name="twitter:title" content={META_TITLE} />
        <meta name="twitter:description" content={META_DESCRIPTION} />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
      </Head>
      <PageTransitionWrapper>
        <FeaturedProjects />
        <Archive />
        <Footer />
      </PageTransitionWrapper>
    </>
  );
}
