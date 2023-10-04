import { motion } from "framer-motion";
import type { MotionValue } from "framer-motion";

export default function CursorShadow({
  shadowSize,
  shadowOpacity,
}: {
  shadowSize: MotionValue<number>;
  shadowOpacity: MotionValue<number>;
}) {
  return (
    <motion.div
      className="shadow-follow absolute top-0 left-0 w-full h-full z-[-1]"
      style={{
        background: `radial-gradient(circle farthest-side at var(--x, 100px) var(--y, 100px), var(--shadow-color, #ffd5d5) 0%, transparent ${shadowSize.get()}%)`,
        transition: "background 300ms ease-out",
        opacity: shadowOpacity,
      }}
    />
  );
}
