// Importing required modules and components
import * as THREE from "three"; // Import Three.js for 3D graphics
import { useRef, useState } from "react"; // Import React hooks
import { Canvas, useFrame, useThree } from "@react-three/fiber"; // Import React Three Fiber components
import {
  Image,
  ScrollControls,
  Scroll,
  useScroll,
  useVideoTexture,
  useTexture,
  useAspect,
  MeshReflectorMaterial,
  Environment,
} from "@react-three/drei"; // Import Drei components for additional Three.js functionalities
import { proxy, useSnapshot } from "valtio"; // Import Valtio for state management
import { easing } from "maath"; // Import Maath for easing functions

// Setting up material and geometry for lines in the minimap
const material = new THREE.LineBasicMaterial({ color: "white" });
const geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, -0.5, 0),
  new THREE.Vector3(0, 0.5, 0),
]);

// Creating a proxy state for global state management using Valtio
const state = proxy({
  clicked: null, // To track the clicked item
  urls: [
    "row-blackouts-1",
    "babby-2",
    "babby-1",
    "impact",
    "vana-1",
    "praxis-1",
    "row-tech-2",
    "row-tech-1",
    "praxis-2",
    "row-blackouts-2",
    "quarantunes-1",
    "row-tech-3",
  ],
});

// Minimap component to show a small navigational aid
function Minimap() {
  const ref = useRef(); // Reference to the group element
  const scroll = useScroll(); // Hook to access scroll values
  const { urls } = useSnapshot(state); // Subscribe to state changes
  const { height } = useThree((state) => state.viewport); // Get viewport height

  // Animation loop to update line scales based on scroll position
  useFrame((state, delta) => {
    ref.current.children.forEach((child, index) => {
      const y = scroll.curve(
        index / urls.length - 1.5 / urls.length,
        4 / urls.length
      );
      easing.damp(child.scale, "y", 0.15 + y / 6, 0.15, delta);
    });
  });

  // Rendering lines for each URL
  return (
    <group ref={ref}>
      {urls.map((_, i) => (
        <line
          key={i}
          geometry={geometry}
          material={material}
          position={[i * 0.06 - urls.length * 0.03, -height / 2 + 0.6, 0]}
        />
      ))}
    </group>
  );
}

// Item component to represent each image in the carousel
function Item({ index, position, scale, c = new THREE.Color(), ...props }) {
  const ref = useRef(); // Reference to the image element
  const scroll = useScroll(); // Hook to access scroll values
  const { clicked, urls } = useSnapshot(state); // Subscribe to state changes
  const [hovered, hover] = useState(false); // State for hover status

  // Event handlers for click and hover
  const click = () => (state.clicked = index === clicked ? null : index);
  const over = () => hover(true);
  const out = () => hover(false);

  // Animation loop to update image properties based on interactions
  useFrame((state, delta) => {
    const y = scroll.curve(
      index / urls.length - 1.5 / urls.length,
      4 / urls.length
    );

    // Constants for scaling
    // const RATIO = 1.777778;
    const RATIO = 1.5;
    const CLICKED_WIDTH = 7;
    const CLICKED_HEIGHT = CLICKED_WIDTH / RATIO;

    const TRANSITION_DURATION = 0.25;

    // Adjust scale based on click or hover state
    easing.damp3(
      ref.current.scale,
      [
        clicked === index ? CLICKED_WIDTH : scale[0],
        clicked === index ? CLICKED_HEIGHT : 4 + y,
        1,
      ],
      TRANSITION_DURATION,
      delta
    );

    // Adjust material properties based on scale
    ref.current.material.scale[0] = ref.current.scale.x;
    ref.current.material.scale[1] = ref.current.scale.y;

    // Reposition images based on clicked state
    if (clicked !== null && index < clicked)
      easing.damp(
        ref.current.position,
        "x",
        position[0] - 2,
        TRANSITION_DURATION,
        delta
      );
    if (clicked !== null && index > clicked)
      easing.damp(
        ref.current.position,
        "x",
        position[0] + 2,
        TRANSITION_DURATION,
        delta
      );
    if (clicked === null || clicked === index)
      easing.damp(
        ref.current.position,
        "x",
        position[0],
        TRANSITION_DURATION,
        delta
      );

    // Clicked image should always be on top
    // ref.current.position.z = clicked === index ? 1 : 0;
    // ref.current.renderOrder = clicked === index ? 1 : 0;
    easing.damp(
      ref.current,
      "renderOrder",
      clicked === index ? 1 : 0,
      TRANSITION_DURATION,
      delta
    );

    // Adjust grayscale and color based on hover or click state
    easing.damp(
      ref.current.material,
      "grayscale",
      hovered || clicked === index ? 0 : Math.max(0, 1 - y),
      0.15,
      delta
    );
    easing.dampC(
      ref.current.material.color,
      // Transparent if selected
      hovered || clicked === index ? "#aaa" : "#aaa",
      hovered ? 0.3 : 0.15,
      delta
    );
  });

  // Rendering the Image component from Drei
  return (
    <Image
      ref={ref}
      {...props}
      position={position}
      scale={scale}
      onClick={click}
      onPointerOver={over}
      onPointerOut={out}
    />
    // <mesh
    //   {...props}
    //   position={position}
    //   scale={useAspect(1000, 667)}
    //   onClick={click}
    //   onPointerOver={over}
    //   onPointerOut={out}
    //   renderOrder={1}
    //   ref={ref}
    // >
    //   <VideoMaterial url={props.url} />
    // </mesh>
  );
}

// Items component to layout all Item components in a scrollable area
function Items({ w = 1, gap = 0.15 }) {
  const { urls } = useSnapshot(state); // Subscribe to state changes
  const { width } = useThree((state) => state.viewport); // Get viewport width

  // Calculate the number of pages for scrolling based on items and viewport
  const xW = w + gap;

  return (
    <ScrollControls
      horizontal={true}
      damping={0.1}
      pages={(width - xW + urls.length * xW) / width}
    >
      {/* <Minimap /> */}
      <Scroll>
        {urls.map((url, i) => (
          <Item
            key={i}
            index={i}
            position={[i * xW, 0, 0]}
            scale={[w, 1, 1]} // ?
            url={`/images/thumbnails/${url}.jpg`}
          />
        ))}
      </Scroll>
    </ScrollControls>
  );
}

// Carousel component wrapping everything in a Canvas
export const Carousel = () => (
  <Canvas
    gl={{ antialias: true }}
    dpr={[1, 10]}
    onPointerMissed={() => (state.clicked = null)}
  >
    {/* <color attach="background" args={["#cecece"]} /> */}
    {/* <fog attach="fog" args={["#191920", 0, 15]} /> */}
    {/* <group position={[0, 0, 0]}> */}
    <Items />
    {/* <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, -1]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#000000"
          metalness={0.5}
        />
      </mesh> */}
    {/* </group> */}
    {/* <Environment preset="city" /> */}
  </Canvas>
);

// function VideoMaterial({ url }) {
//   const texture = useVideoTexture(`/videos/${url}.mp4`);
//   return <meshBasicMaterial map={texture} toneMapped={false} />;
// }

// function FallbackMaterial({ url }) {
//   const texture = useTexture(url);
//   return <meshBasicMaterial map={texture} toneMapped={false} />;
// }
