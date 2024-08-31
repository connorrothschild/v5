import Intro from "@/components/Sections/Intro";
import Head from "next/head";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

const META_TITLE = "Connor Rothschild";
const META_DESCRIPTION =
  "The portfolio of software & data visualization engineer, Connor Rothschild.";

export default function Home() {
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
        <Intro />
      </PageTransitionWrapper>
    </>
  );
}
