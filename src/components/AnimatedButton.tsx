import { useMotionValue } from "framer-motion";
import CanvasGradient from "./CanvasGradient";

const AnimatedButton = ({
  children,
  expandOnHover,
  classes = "",
}: {
  children: React.ReactNode;
  expandOnHover?: boolean;
  classes?: string;
}) => {
  return (
    <div
      className={`relative flex justify-stretch items-center group cursor-pointer ${classes}`}
    >
      <div
        className={`relative w-full after:transition-opacity after:duration-500 rounded-[30px] overflow-hidden after:bg-[radial-gradient(circle_farthest-side_at_50px_50px,_#fff_0%,transparent_200%)] after:block after:absolute after:inset-[5px] after:z-10 after:rounded-[25px] animate-[rotating_10s_linear_infinite] ${
          expandOnHover ? "hover:after:opacity-[.35]" : ""
        }`}
      >
        <CanvasGradient
          width="100%"
          height="100%"
          opacity={useMotionValue(1)}
        />
        <div className="relative z-30">{children}</div>
      </div>
    </div>
  );
};

export default AnimatedButton;
