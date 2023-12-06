import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Manrope } from "next/font/google";
import localFont from "next/font/local";

const timesNow = localFont({
  src: [
    {
      path: "./fonts/TimesNow-ExtraLightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/TimesNow-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/TimesNow-ExtraLightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/TimesNow-ExtraLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/TimesNow-LightItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/TimesNow-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/TimesNow-SemiLight.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/TimesNow-SemiLightItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/TimesNow-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/TimesNow-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/TimesNow-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/TimesNow-Bold.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/TimesNow-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/TimesNow-ExtraBoldItalic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-times-now",
});

const tobias = localFont({
  src: [
    {
      path: "./fonts/tobias/TobiasTRIAL-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/tobias/TobiasTRIAL-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    // {
    //   path: "./fonts/tobias/TobiasTRIAL-ExtraLightItalic.woff2",
    //   weight: "200",
    //   style: "italic",
    // },
    // {
    //   path: "./fonts/tobias/TobiasTRIAL-ExtraLight.woff2",
    //   weight: "200",
    //   style: "normal",
    // },
    {
      path: "./fonts/tobias/TobiasTRIAL-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/tobias/TobiasTRIAL-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/tobias/TobiasTRIAL-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/tobias/TobiasTRIAL-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/tobias/TobiasTRIAL-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/tobias/TobiasTRIAL-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/tobias/TobiasTRIAL-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/tobias/TobiasTRIAL-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/tobias/TobiasTRIAL-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/tobias/TobiasTRIAL-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/tobias/TobiasTRIAL-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/tobias/TobiasTRIAL-ExtraBoldItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/tobias/TobiasTRIAL-Heavy.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/tobias/TobiasTRIAL-HeavyItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-tobias",
});

const nyghtSerif = localFont({
  src: [
    {
      path: "./fonts/nyght-serif/NyghtSerif-Light.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-LightItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Light.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-LightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-MediumItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Dark.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-DarkItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Dark.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nyght",
});

const canela = localFont({
  src: [
    {
      path: "./fonts/canela/Canela-Thin-Trial.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/canela/Canela-Thin-Trial.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/canela/Canela-Light-Trial.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/canela/Canela-LightItalic-Trial.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/canela/Canela-Regular-Trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/canela/Canela-RegularItalic-Trial.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/canela/Canela-Medium-Trial.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/canela/Canela-MediumItalic-Trial.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/canela/Canela-Medium-Trial.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/canela/Canela-MediumItalic-Trial.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/canela/Canela-Bold-Trial.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/canela/Canela-BoldItalic-Trial.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/canela/Canela-Black-Trial.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/canela/Canela-BlackItalic-Trial.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/canela/Canela-Black-Trial.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/canela/Canela-BlackItalic-Trial.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-canela",
});

const family = localFont({
  src: "./fonts/test-family-regular.woff2",
  variable: "--font-family",
});

const suisse = localFont({
  src: [
    {
      path: "./fonts/suisse/Suisse_BP_Intl_Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/suisse/Suisse_BP_Intl_Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/suisse/Suisse_BP_Intl_Thin.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/suisse/Suisse_BP_Intl_Thin.otf",
      weight: "200",
      style: "normal",
    },
  ],
  variable: "--font-suisse",
});

// const instrumentSerif = Instrument_Serif({
//   subsets: ["latin"],
//   weight: "400",
//   display: "fallback",
//   variable: "--font-instrument-serif",
// });

const editorialNew = localFont({
  src: [
    {
      path: "./fonts/editorial/PPEditorialNew-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/editorial/PPEditorialNew-Italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-editorial-new",
});

const tasaOrbiter = localFont({
  // Variable font
  src: "./fonts/TasaOrbiterVF.woff2",
  variable: "--font-tasa-orbiter",
});

const manrope = Manrope({
  subsets: ["latin"],
  // weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "fallback",
  variable: "--font-manrope",
});

import Menu from "@/components/Menu";
import Jukebox from "@/components/Jukebox";
import Loader from "@/components/Loader";
import Grid from "@/components/Grid";
import Footer from "@/components/Sections/Footer";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          bg: "",
        },
      }),
    },
  });

  return (
    <main
      className={`${canela.variable} ${editorialNew.variable} ${tobias.variable} ${manrope.variable} ${timesNow.variable} ${suisse.variable} ${nyghtSerif.variable} ${tasaOrbiter.variable} font-sans`}
    >
      <link rel="stylesheet" href="https://use.typekit.net/mhr2lku.css"></link>
      <ChakraProvider theme={theme}>
        <Menu />
        {/* For testing */}
        {/* <Grid /> */}
        <Loader>
          <Component {...pageProps} />
          <Footer />
        </Loader>
      </ChakraProvider>
    </main>
  );
}
