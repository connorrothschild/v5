import dynamic from "next/dynamic";

const ParticleScene = dynamic(
  () => import("@/components/Sections/ParticleScene"),
  {
    ssr: false,
  }
);

export default function ParticlePage() {
  return <ParticleScene />;
}
