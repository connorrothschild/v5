import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function CanvasGradient({
  incrementValue = 0.05,
}: {
  incrementValue?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    var c = ref.current as HTMLCanvasElement;
    var ctx = c.getContext("2d");
    if (!ctx) return;

    var col = function (x: number, y: number, r: number, g: number, b: number) {
      if (ctx) {
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, y, 1, 1);
      }
    };
    var R = function (x: number, y: number, t: number) {
      return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
    };

    var G = function (x: number, y: number, t: number) {
      return Math.floor(
        192 +
          64 *
            Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
      );
    };

    var B = function (x: number, y: number, t: number) {
      return Math.floor(
        192 +
          64 *
            Math.sin(
              5 * Math.sin(t / 9) +
                ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
            )
      );
    };

    var t = 0;

    var run = function () {
      for (let x = 0; x <= 35; x++) {
        for (let y = 0; y <= 35; y++) {
          col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
        }
      }
      t = t + incrementValue;
      window.requestAnimationFrame(run);
    };

    run();
  }, [incrementValue]);

  return (
    <motion.canvas
      id="canvas"
      width="32"
      height="32"
      className="z-1 absolute top-0 left-0 w-full h-screen"
      style={{
        filter: "brightness(.7)",
      }}
      ref={ref}
    />
  );
}
