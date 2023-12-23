import { Canvas } from "@react-three/fiber";
import {
  Environment,
  MeshTransmissionMaterial,
  RoundedBox,
  useTexture,
  useFBO,
  CameraControls,
  shaderMaterial,
} from "@react-three/drei";
// import { Splat } from "./splat";
import { useFrame, extend } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// import {useControls} from 'leva'// problematic
// import { useTweaks } from 'tweakpane'

export function GlassPortal({ image }: { image?: string }) {
  const { roughness, transmission, rotation, showOriginal, color } =
    // useControls ()
    {
      roughness: { value: 0.05, min: 0, max: 1 },
      transmission: { value: 1, min: 0, max: 1 },
      rotation: { value: 1.4 * Math.PI, min: 0, max: 2 * Math.PI },
      showOriginal: { value: false },
      color: { value: "#fff" },
    };
  const buffer = useFBO();
  const ref = useRef();
  const ref0 = useRef();
  const ref1 = useRef();
  const material = useRef();
  const normalMap = useTexture("images/textures/dirt.png");

  normalMap.wrapS = normalMap.wrapT = 1000;

  useFrame((state) => {
    ref0.current.visible = true;
    ref1.current.visible = false;
    state.gl.setRenderTarget(buffer);
    state.gl.render(state.scene, state.camera);
    state.gl.setRenderTarget(null);
    ref0.current.visible = showOriginal.value;
    ref1.current.visible = true;
  });

  const imageTexture = useTexture(image);
  return (
    <>
      <group ref={ref0}>
        <mesh
          scale={[1, 1, 1]} // Adjust scale as needed
          rotation={[0, 0, 0]}
          position={[0, 0, 0.8]}
        >
          {/* This is where we change aspect ratio of your image */}
          {/* <planeGeometry args={[1.5, 2, 1]} /> */}
          {/* <boxGeometry args={[1, 1, 0.5]} /> */}

          <planeGeometry args={[1.25, 1, 1]} />
          <meshStandardMaterial
            map={imageTexture}
            // raycast={() => null}
            // position={[0, 0, 0.51]}
            // toneMapped={false}
          />
        </mesh>
        {/* <DepthBG /> */}
      </group>

      <RoundedBox
        ref={ref1}
        position={[0, 0, 0.8]}
        args={[1.5, 2, 0.12]}
        radius={0.03}
      >
        <MeshTransmissionMaterial
          ref={material}
          transmission={transmission.value}
          roughness={roughness.value}
          thickness={0.1}
          normalMap={normalMap}
          normalScale={[0.2, 0.2]}
          color={color.value}
          buffer={buffer.texture}
        />
      </RoundedBox>
    </>
  );
}

function DepthBG() {
  const StripeMaterial = shaderMaterial(
    {},
    // vertex shader
    /*glsl*/ `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    // fragment shader
    /*glsl*/ `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        float stripes = smoothstep(0.95,1., sin(vPosition.z * 30.0 ));
        float fadeOut = smoothstep(-0.9, 0.1, vPosition.z);
        gl_FragColor.rgba = vec4(fadeOut*0.2*vec3(stripes), 1.0);
      }
    `
  );

  extend({ StripeMaterial });

  return (
    <mesh>
      <boxGeometry position={[0, 0, 0.8]} args={[1.5, 2, 1.5]} />
      <stripeMaterial color="black" time={1} side={THREE.BackSide} />
    </mesh>
  );
}

// export default function App() {
//   return (
//     <>
//       <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
//         <color attach="background" args={["#111111"]} />
//         <Environment preset="warehouse" />
//         {/* <Environment files="Default.exr" /> */}
//         {/* <Environment  near={1} far={1000} resolution={256}>
//   <mesh scale={100}>
//     <sphereGeometry args={[1, 64, 64]} />
//     <meshBasicMaterial color={'#ffffff'} side={THREE.DoubleSide}  />
//   </mesh>
// </Environment> */}
//         <GlassPortal />
//         <CameraControls />
//       </Canvas>
//     </>
//   );
// }
