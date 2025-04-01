import Link from "next/link";
import React, { useState } from "react";
import { ContactPopup } from "../Elements/ContactPopup";
import Dot from "../Elements/Dot";
import Image from "next/image";

import me from "@/components/_Images/me/andys-low.webp";
import BlurEdge from "../Elements/BlurEdge";
import HoverLink from "./HoverLink";

export default function Header() {
  const [hovered, setHovered] = useState<null | "W" | "P">(null);
  return (
    <header
      className="fixed z-50 w-full py-6 top-0 left-0 flex flex-row items-center gap-1 px-4 md:px-8 justify-between"
      onMouseLeave={() => setHovered(null)}
    >
      {/* <BlurEdge
        bgColor="bg-white"
        classes="w-full h-[100px] z-[-1]"
        endPosition="top"
      /> */}
      <Link
        scroll={false}
        href="/"
        className="flex-1 justify-start text-left font-sans font-light text-gray-700 flex items-center gap-1.5"
      >
        <Image
          src={me}
          alt="Connor Rothschild"
          width={40}
          height={40}
          className="rounded-full w-5 h-5 inline-block"
        />
        Connor Rothschild
      </Link>
      <HoverLink
        href="/writing"
        start="W"
        end="riting"
        hovered={hovered}
        setHovered={setHovered}
      />
      <span className="font-sans font-light text-gray-700">&</span>
      <HoverLink
        href="/projects"
        start="P"
        end="rojects"
        hovered={hovered}
        setHovered={setHovered}
      />
      <ContactPopup>
        <div className="hidden sm:flex flex-1 justify-end text-right cursor-pointer items-center gap-1.5 font-sans font-light text-gray-700">
          Contact
          <Dot classes="!w-5 !h-5" />
        </div>
      </ContactPopup>
    </header>
  );
}
