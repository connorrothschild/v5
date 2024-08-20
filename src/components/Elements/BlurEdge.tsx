import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

const BlurDiv = ({
  blurValue,
  gradientStops,
  zIndex,
  className,
}: {
  blurValue: number;
  gradientStops: string;
  zIndex: number;
  className?: string;
}) => (
  <div
    className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    style={{
      zIndex,
      backdropFilter: `blur(${blurValue}px)`,
      WebkitBackdropFilter: `blur(${blurValue}px)`,
      maskImage: `linear-gradient(to left, ${gradientStops})`,
      WebkitMaskImage: `linear-gradient(to left, ${gradientStops})`,
    }}
  />
);

export default function BlurEdge({
  bgColor,
  classes,
}: {
  bgColor: string;
  classes: string;
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
        />
        <BlurDiv
          zIndex={2}
          blurValue={0.5}
          gradientStops="rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50%"
        />
        <BlurDiv
          zIndex={3}
          blurValue={0.75}
          gradientStops="rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5%"
        />
        <BlurDiv
          zIndex={4}
          blurValue={1}
          gradientStops="rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75%"
        />
        <BlurDiv
          zIndex={5}
          blurValue={1.25}
          gradientStops="rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5%"
        />
        <BlurDiv
          zIndex={6}
          blurValue={1.5}
          gradientStops="rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%"
        />
        <BlurDiv
          zIndex={7}
          blurValue={2}
          gradientStops="rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100%"
        />
        <BlurDiv
          zIndex={8}
          blurValue={2.5}
          gradientStops="rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 1) 100%"
          className={bgColor}
        />
      </div>
    </div>
  );
}
