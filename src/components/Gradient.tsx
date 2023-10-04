import { motion } from "framer-motion";

interface GradientProps {
  stopColor: string;
  randomUuid: string;
  baseFrequency?: string;
  svgProps?: React.SVGProps<SVGSVGElement>;
}

export default function Gradient({
  stopColor,
  randomUuid,
  baseFrequency = "0.0005 0.0003",
  svgProps = {},
}: GradientProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 700 700"
      width="700"
      height="700"
      id={`svg-${randomUuid}`}
      preserveAspectRatio="none"
      className="w-[100vw] h-[100vh] z-[-2] absolute top-0 left-0"
      // style={{
      //   opacity,
      // }}
      // transition={{ ease: "easeInOut", delay: 1.5, duration: 1 }}
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      {...(svgProps as any)}
    >
      <defs>
        <linearGradient
          gradientTransform="rotate(150, 0.5, 0.5)"
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id={`gradient-${randomUuid}`}
        >
          <stop stopColor={stopColor} stopOpacity="1" offset="0%" />
          <stop stopColor={stopColor} stopOpacity="1" offset="100%" />
        </linearGradient>
        <filter
          id={`filter-${randomUuid}`}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves="2"
            seed="304"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence"
          />
          <feGaussianBlur
            stdDeviation="20 0"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="turbulence"
            edgeMode="duplicate"
            result="blur"
          />
          <feBlend
            mode="color-dodge"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="SourceGraphic"
            in2="blur"
            result="blend"
          />
        </filter>
      </defs>
      <rect
        width="700"
        height="700"
        fill={`url(#gradient-${randomUuid})`}
        filter={`url(#filter-${randomUuid})`}
      />
    </motion.svg>
  );
}
