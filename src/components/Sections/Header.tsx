import Link from "next/link";
import React from "react";
import { ContactPopup } from "../Elements/ContactPopup";
import Dot from "../Elements/Dot";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed z-50 w-full py-6 top-0 left-0 flex flex-row items-center gap-2 px-8 justify-between">
      <Link
        scroll={false}
        href="/"
        className="font-sans font-light text-gray-700 flex items-center gap-1.5"
      >
        <Image
          src="/images/me/andys-low.jpg"
          alt="Connor Rothschild"
          width={40}
          height={40}
          className="rounded-full w-5 h-5 inline-block"
        />
        Connor Rothschild
      </Link>
      <ContactPopup>
        <div className="cursor-pointer flex items-center gap-2 text-gray-700">
          Work with me <Dot classes="!w-5 !h-5" />
        </div>
      </ContactPopup>
    </header>
  );
}
