import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="https://next-site-connorrothschild.vercel.app/social.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@CL_Rothschild" />
        <meta name="twitter:creator" content="@CL_Rothschild" />
        <meta
          name="twitter:image"
          content="https://next-site-connorrothschild.vercel.app/social.png"
        />
        <meta
          name="twitter:image:alt"
          content="The portfolio of software & data visualization engineer, Connor Rothschild."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
