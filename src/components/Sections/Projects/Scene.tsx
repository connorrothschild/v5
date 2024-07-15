import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useHelper, useTexture } from "@react-three/drei";
import CustomShaderMaterial from "three-custom-shader-material";
import vertexShader from "!!raw-loader!./shaders/vertex.glsl";
import fragmentShader from "!!raw-loader!./shaders/fragment.glsl";
import {
  PointLightHelper,
  Vector2,
  MathUtils,
  MeshStandardMaterial,
} from "three";

function Lights() {
  const pointLightRef = useRef();
  useHelper(pointLightRef, PointLightHelper, 0.7, "cyan");
  return (
    <pointLight
      ref={pointLightRef}
      color="white"
      intensity={25}
      distance={12}
      decay={1}
      position={[2, 4, 6]}
    />
  );
}

function Scene({ image }: { image: any }) {
  const { viewport } = useThree();
  const { width, height } = viewport;

  const materialRef = useRef();
  // const texture = useLoader(TextureLoader, image);
  const texture = useTexture(image);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new Vector2(0, 0) },
    }),
    [texture]
  );

  const mouseLerped = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const { mouse } = state;
    mouseLerped.current.x = MathUtils.lerp(
      mouseLerped.current.x,
      mouse.x,
      0.015
    );
    mouseLerped.current.y = MathUtils.lerp(
      mouseLerped.current.y,
      mouse.y,
      0.015
    );
    materialRef.current.uniforms.uMouse.value.x = mouseLerped.current.x;
    materialRef.current.uniforms.uMouse.value.y = mouseLerped.current.y;
  });

  const ASPECT_RATIO = 1.5;
  const screenWidthGreaterThanImageWidth = width > height * ASPECT_RATIO;
  const imageHeight = screenWidthGreaterThanImageWidth
    ? width / ASPECT_RATIO
    : height;

  return (
    <mesh>
      <planeGeometry
        args={[imageHeight * ASPECT_RATIO, imageHeight, 254, 254]}
      />
      <CustomShaderMaterial
        ref={materialRef}
        baseMaterial={MeshStandardMaterial}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
      <Lights />
    </mesh>
  );
}

export default Scene;
