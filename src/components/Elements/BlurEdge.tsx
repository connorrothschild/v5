import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

const BlurDiv = ({
  blurValue,
  gradientStops,
  zIndex,
  className,
  endPosition = "left",
}: {
  blurValue: number;
  gradientStops: string;
  zIndex: number;
  className?: string;
  endPosition: "top" | "left" | "bottom" | "right";
}) => (
  <div
    className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    style={{
      zIndex,
      backdropFilter: `blur(${blurValue}px)`,
      WebkitBackdropFilter: `blur(${blurValue}px)`,
      maskImage: `linear-gradient(to ${endPosition}, ${gradientStops})`,
      WebkitMaskImage: `linear-gradient(to ${endPosition}, ${gradientStops})`,
    }}
  />
);

export default function BlurEdge({
  bgColor,
  classes,
  endPosition = "left",
}: {
  bgColor: string;
  classes: string;
  endPosition?: "top" | "left" | "bottom" | "right";
}) {
  const isMobile = useIsTouchDevice();
  if (isMobile) {
    return null;
  }
  return (
    <div
      className={`pointer-events-none absolute bottom-0 top-0 z-30 w-[300px] ${classes}`}
    >
      <div className="relative h-full w-full">
        <BlurDiv
          zIndex={1}
          blurValue={0.25}
          gradientStops="rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5%"
          endPosition={endPosition}
        />
        <BlurDiv
          zIndex={2}
          blurValue={0.5}
          gradientStops="rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50%"
          endPosition={endPosition}
        />
        <BlurDiv
          zIndex={3}
          blurValue={0.75}
          gradientStops="rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5%"
          endPosition={endPosition}
        />
        <BlurDiv
          zIndex={4}
          blurValue={1}
          gradientStops="rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75%"
          endPosition={endPosition}
        />
        <BlurDiv
          zIndex={5}
          blurValue={1.25}
          gradientStops="rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5%"
          endPosition={endPosition}
        />
        <BlurDiv
          zIndex={6}
          blurValue={1.5}
          gradientStops="rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%"
          endPosition={endPosition}
        />
        <BlurDiv
          zIndex={7}
          blurValue={2}
          gradientStops="rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100%"
          endPosition={endPosition}
        />
        <BlurDiv
          zIndex={8}
          blurValue={2.5}
          gradientStops="rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 1) 100%"
          className={bgColor}
          endPosition={endPosition}
        />
      </div>
    </div>
  );
}
