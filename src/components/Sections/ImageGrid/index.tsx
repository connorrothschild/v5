// components/Canvas/index.tsx
import dynamic from "next/dynamic";

const ImageGridWrapper = dynamic(() => import("./ImageGrid"), {
  ssr: false,
});

export default ImageGridWrapper;
