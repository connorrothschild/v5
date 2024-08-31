import { useState } from "react";
import SplitTextHeader from "@/components/Elements/SplitTextHeader";
import Image from "next/image";
import Balls from "../Elements/Balls";
import Header from "./Header";

export default function Intro() {
  const [triggerBounce, setTriggerBounce] = useState(0);

  return (
    <>
      <section className="sticky px-[20px] overflow-x-clip">
        <Image
          src="/tmp/shadows.png"
          alt=""
          width={1000}
          height={1000}
          className="fixed top-0 left-0 w-full h-full object-cover opacity-40 pointer-events-none"
          draggable={false}
        />
        {/* <iframe
        src="https://paveldogreat.github.io/WebGL-Fluid-Simulation/"
        className="absolute top-0 left-0 w-full h-full object-cover"
      /> */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full max-w-[1330px] mx-auto">
          <Balls triggerBounce={triggerBounce} />
        </div>
        {/* <Gradient /> */}
        <div className="hero max-w-4xl w-full mx-auto top-0 h-screen flex flex-col justify-center items-center">
          <div
            className="flex flex-col justify-between gap-8"
            // className="flex flex-col justify-between gap-8 bg-[#f6f6f650] px-[3.5rem] py-[5rem] rounded-[10px]"
            // style={{
            //   backdropFilter: "blur(20px)",
            //   boxShadow:
            //     "rgba(0, 0, 0, 0.03) -12px 9px 19px, rgba(0, 0, 0, 0.05) -5px 4px 16px, rgba(0, 0, 0, 0.06) -1px 1px 14px",
            // }}
          >
            <SplitTextHeader
              phrase="👋 I’m Connor, an engineer in Texas. I make websites that are performant, beautiful, and fun."
              setTriggerBounce={setTriggerBounce}
            />
          </div>
        </div>
      </section>
    </>
  );
}
