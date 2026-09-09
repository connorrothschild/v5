import "@/styles/globals.css";
import type { AppProps } from "next/app";

import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";

const times = localFont({
  src: [
    // src/pages/fonts/times-now/TimesNow-Bold.woff2 src/pages/fonts/times-now/TimesNow-BoldItalic.woff2 src/pages/fonts/times-now/TimesNow-ExtraBold.woff2 src/pages/fonts/times-now/TimesNow-ExtraBoldItalic.woff2 src/pages/fonts/times-now/TimesNow-ExtraLight.woff2 src/pages/fonts/times-now/TimesNow-ExtraLightItalic.woff2 src/pages/fonts/times-now/TimesNow-Light.woff2 src/pages/fonts/times-now/TimesNow-LightItalic.woff2 src/pages/fonts/times-now/TimesNow-SemiBold.woff2 src/pages/fonts/times-now/TimesNow-SemiBoldItalic.woff2 src/pages/fonts/times-now/TimesNow-SemiLight.woff2 src/pages/fonts/times-now/TimesNow-SemiLightItalic.woff2
    {
      path: "./fonts/times-now/TimesNow-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/times-now/TimesNow-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/times-now/TimesNow-SemiBold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/times-now/TimesNow-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-times",
});

const montreal = localFont({
  src: [
    {
      path: "./fonts/montreal/PPNeueMontreal-Book.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/montreal/PPNeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/montreal/PPNeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/montreal/PPNeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "fallback",
  variable: "--font-montreal",
});

import { useRouter } from "next/router";
import { Toaster } from "sonner";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Sections/Header";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      {/* Needed to make global fonts apply in shadcn components */}
      <style jsx global>{`
        html {
          --font-sans: ${montreal.style.fontFamily};
        }

        .font-sans {
          font-family: var(--font-sans);
        }

        body {
          font-family: var(--font-sans);
        }
      `}</style>

      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
      </Head>

      <main className={`${montreal.variable} ${times.variable} font-sans`}>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/mhr2lku.css"
        ></link>
        <Toaster />
        <Header />

        <AnimatePresence
          mode="wait"
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </main>
      <Analytics />
    </>
  );
}
