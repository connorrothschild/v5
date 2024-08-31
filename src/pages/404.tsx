import CanvasGradient from "@/components/CanvasGradient";
import Link from "next/link";

export default function Custom404() {
  return (
    <section className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
      <CanvasGradient />
      <h1 className="text-6xl text-white font-normal z-10">Page Not Found</h1>
      <Link className="text-white font-normal z-10" href="/">
        &larr; Go Home
      </Link>
    </section>
  );
}
