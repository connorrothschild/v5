import { useRef } from "react";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
// import {
//   /images/projects/cudi,
//   floating2,
//   floating3,
//   floating4,
//   floating5,
//   floating6,
//   floating7,
//   floating8,
// } from "../data";

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
      }}
      className="relative h-screen w-screen overflow-hidden"
      ref={ref}
    >
      <div ref={plane1} className="w-full h-full absolute">
        <img
          src={"/images/projects/cudi.png"}
          alt="img"
          width={300}
          className="rounded-md absolute left-[90%] top-[70%]"
        />
        <img
          src={"/images/projects/cudi.png"}
          alt="img"
          width={300}
          className="rounded-md absolute left-[5%] top-[65%]"
        />
        <img
          src={"/images/projects/cudi.png"}
          alt="img"
          width={225}
          className="rounded-md absolute left-[35%] top-[0%]"
        />
      </div>
      <div
        ref={plane2}
        className="w-full h-full absolute"
        style={{
          filter: "brightness(0.9) blur(1px)",
        }}
      >
        <img
          src={"/images/projects/cudi.png"}
          alt="img"
          width={250}
          className="rounded-md absolute left-[5%] top-[10%]"
        />
        <img
          src={"/images/projects/cudi.png"}
          alt="img"
          width={200}
          className="rounded-md absolute left-[80%] top-[5%]"
        />
        <img
          src={"/images/projects/cudi.png"}
          alt="img"
          width={225}
          className="rounded-md absolute left-[60%] top-[60%]"
        />
      </div>
      <div
        ref={plane3}
        className="w-full h-full absolute"
        style={{
          filter: "brightness(0.8) blur(2px)",
        }}
      >
        <img
          src={"/images/projects/cudi.png"}
          alt="img"
          width={150}
          className="rounded-md absolute left-[65%] top-[2.5%]"
        />
        <img
          src={"/images/projects/cudi.png"}
          alt="img"
          width={200}
          className="rounded-md absolute left-[40%] top-[75%]"
        />
      </div>
      {/* <div className="rounded-md absolute left-1/2 top-1/2 transform translate-x-[-50%] translate-y-[-50%] text-white text-center">
        <h1 className="font-light text-4xl">Floating imgs Gallery</h1>
        <p className="text-gray-400">Next.js and GSAP</p>
      </div> */}
    </motion.section>
  );
}
