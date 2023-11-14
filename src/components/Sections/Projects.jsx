import Image from "next/image";
import gsap from "gsap";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 1],
    [0, 0, 0.5, 1, 1, 0]
  );
  const translateY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 1],
    [0, 50, 25, 0, -25, -100]
  );

  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const lerp = (start, target, amount) =>
    start * (1 - amount) + target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
    gsap.set(plane2.current, {
      x: `+=${xForce * 0.5}`,
      y: `+=${yForce * 0.5}`,
    });
    gsap.set(plane3.current, {
      x: `+=${xForce * 0.25}`,
      y: `+=${yForce * 0.25}`,
    });

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce !== 0 || yForce !== 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    }
  };

  return (
    <motion.section
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
      style={{
        opacity,
        // translateY,
      }}
      className="relative min-h-screen my-24 w-screen overflow-visible"
      ref={ref}
    >
      <div
        ref={plane1}
        className="w-full h-full absolute pointer-events-none z-30"
      >
        <ProjectImage left="90%" top="70%" src="blackouts" scale={1} />
        <ProjectImage left="5%" top="65%" src="blackouts" scale={1} />
        <ProjectImage left="35%" top="0%" src="blackouts" scale={1} />
      </div>
      <div
        ref={plane2}
        className="w-full h-full absolute pointer-events-none z-20"
        style={{
          filter: "brightness(0.9) blur(1px)",
        }}
      >
        <ProjectImage left="5%" top="10%" src="blackouts" scale={0.75} />
        <ProjectImage left="80%" top="5%" src="blackouts" scale={0.75} />
        <ProjectImage left="60%" top="60%" src="blackouts" scale={0.75} />
      </div>
      <div
        ref={plane3}
        className="w-full h-full absolute pointer-events-none z-10"
        style={{
          filter: "brightness(0.8) blur(2px)",
        }}
      >
        <ProjectImage left="65%" top="2.5%" src="blackouts" scale={0.5} />
        <ProjectImage left="40%" top="75%" src="blackouts" scale={0.5} />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 transform translate-x-[-50%] translate-y-[-50%] text-white text-center z-40">
        <h1 className="leading-[1.05] font-light font-serif text-7xl">
          Some of those projects can be found here.
        </h1>
      </div>
      <Link
        href="/archive"
        className="cursor-pointer z-50 absolute bottom-2 right-2 text-xs text-gray-400"
      >
        See all projects
      </Link>
    </motion.section>
  );
}

function ProjectImage({ left, top, scale, src }) {
  const defaultWidth = 300;
  const defaultHeight = 300;

  return (
    <Image
      src={`/images/projects/${src}.png`}
      onClick={() => alert("Open project page")}
      alt="img"
      width={defaultWidth * scale}
      height={defaultHeight * scale}
      className="rounded-md absolute pointer-events-auto cursor-pointer"
      style={{
        left,
        top,
      }}
    />
  );
}
