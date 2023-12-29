import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* maximum-scale=1 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Connor Rothschild</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
