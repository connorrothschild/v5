import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Instrument_Serif, Manrope } from "next/font/google";
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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "fallback",
  variable: "--font-instrument-serif",
});

const manrope = Manrope({
  subsets: ["latin"],
  // weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "fallback",
  variable: "--font-manrope",
});

import Menu from "@/components/Menu";
import Jukebox from "@/components/Jukebox/Simple";
import Loader from "@/components/Loader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${tobias.variable} ${manrope.variable} ${instrumentSerif.variable} ${timesNow.variable} ${suisse.variable} font-sans`}
    >
      <Menu />
      <Jukebox />
      <Loader>
        <Component {...pageProps} />
      </Loader>
    </main>
  );
}
