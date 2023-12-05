import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useCursor,
  MeshReflectorMaterial,
  Image,
  Text,
  Environment,
  OrbitControls,
  RoundedBox,
  Box,
  GradientTexture,
  GradientType,
  Trail,
  useAspect,
  CameraControls,
  Html,
} from "@react-three/drei";
import { useRoute, useLocation, useParams } from "wouter";
import { easing } from "maath";
import getUuid from "uuid-by-string";

import { motion } from "framer-motion";
import { easeInOutQuint } from "@/config/eases";

const LOADING_TIME = 3;

// const images = [
//   "/images/thumbnails/row-blackouts-1.jpg",
//   "/images/thumbnails/babby-2.jpg",
//   "/images/thumbnails/babby-1.jpg",
//   "/images/thumbnails/impact.jpg",
//   "/images/thumbnails/vana-1.jpg",
//   "/images/thumbnails/praxis-1.jpg",
//   "/images/thumbnails/row-tech-2.jpg",
//   "/images/thumbnails/row-tech-1.jpg",
//   "/images/thumbnails/praxis-2.jpg",
//   "/images/thumbnails/row-row-blackouts-1-2.jpg",
//   "/images/thumbnails/quarantunes-1.jpg",
//   "/images/thumbnails/row-tech-3.jpg",
// ];

const GOLDENRATIO = 1.196; // 1.61803398875;

// const pexel = (id) =>
//   `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;
const imageConstructor = (id: string) => `/images/thumbnails/${id}.jpg`;
const CAROUSEL_LAYOUT = [
  // Front
  {
    position: [0, 0, -1.2],
    rotation: [0, 0, 0],
    url: imageConstructor(1103970),
  },

  // Back
  {
    position: [-1, 0, -0.6],
    rotation: [0, 0, 0],
    url: imageConstructor(416430),
  },
  {
    position: [1, 0, -0.6],
    rotation: [0, 0, 0],
    url: imageConstructor(310452),
  },

  // Left
  {
    position: [-1.75, 0, 0.25],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageConstructor(327482),
  },
  {
    position: [-2.15, 0, 1.5],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageConstructor(325185),
  },
  {
    position: [-2, 0, 2.75],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageConstructor(358574),
  },

  // Right
  {
    position: [1.75, 0, 0.25],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor(227675),
  },
  {
    position: [2.15, 0, 1.5],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor(911738),
  },
  {
    position: [2, 0, 2.75],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor(1738986),
  },
];

const LINE_LAYOUT = [
  // Front
  {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    url: imageConstructor("row-blackouts-1"),
  },

  // Back
  {
    position: [1 * GOLDENRATIO, 0, 0],
    rotation: [0, 0, 0],
    url: imageConstructor("row-blackouts-2"),
  },
  {
    position: [2 * GOLDENRATIO, 0, 0],
    rotation: [0, 0, 0],
    url: imageConstructor("row-blackouts-2"),
  },

  // Left
  {
    position: [3 * GOLDENRATIO, 0, 0],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageConstructor("row-blackouts-2"),
  },
  {
    position: [4 * GOLDENRATIO, 0, 0],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageConstructor("row-blackouts-2"),
  },
  {
    position: [5 * GOLDENRATIO, 0, 0],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageConstructor("row-blackouts-2"),
  },

  // Right
  {
    position: [6 * GOLDENRATIO, 0, 0],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor("row-blackouts-2"),
  },
  {
    position: [7 * GOLDENRATIO, 0, 0],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor("row-blackouts-2"),
  },
  {
    position: [8 * GOLDENRATIO, 0, 0],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor("row-blackouts-1"),
  },
];

const FLOATING_LAYOUT = [
  // Front
  {
    position: [3, 1, 1],
    rotation: [0, 0, 0],
    url: imageConstructor("babby-1"),
    name: "Gallery",
    link: "https://gallery.so/",
  },

  // Back
  {
    position: [-3, 0, -1],
    rotation: [0, 0, 0],
    url: imageConstructor("row-tech-1"),
    name: "Gallery",
    link: "https://gallery.so/",
  },
  {
    position: [-1, 1, -4],
    rotation: [0, 0, 0],
    url: imageConstructor("row-blackouts-1"),
    name: "Gallery",
    link: "https://gallery.so/",
  },

  // Left
  {
    position: [2, 3, -2],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageConstructor("vana-1"),
    name: "Gallery",
    link: "https://gallery.so/",
  },
  {
    position: [3, 0, -1],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageConstructor("impact"),
    name: "Gallery",
    link: "https://gallery.so/",
  },
  {
    position: [-3, 3, 0],
    rotation: [0, 0, 0],
    // rotation: [0, Math.PI / 2.5, 0],
    url: imageConstructor("praxis-1"),
    name: "Gallery",
    link: "https://gallery.so/",
  },

  // Right
  {
    position: [-1, 2, 0],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor("quarantunes-1"),
    name: "Gallery",
    link: "https://gallery.so/",
  },
  {
    position: [3, 0, 2],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor("row-blackouts-2"),
    name: "Gallery",
    link: "https://gallery.so/",
  },
  {
    position: [-2, 0, 3],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor("gallery-1"),
    name: "Gallery",
    link: "https://gallery.so/",
  },
  {
    position: [-3, 3, 2],
    rotation: [0, 0, 0],
    // rotation: [0, -Math.PI / 2.5, 0],
    url: imageConstructor("gallery-1"),
    name: "Gallery",
    link: "https://gallery.so/",
  },
];

const images = FLOATING_LAYOUT;

const CAMERA_X = 5;
const CAMERA_Y = 2;
const CAMERA_Z = 4;

export default function ImageGridWrapper() {
  const cameraControlsRef = useRef();

  useEffect(() => {
    if (!cameraControlsRef.current) return;
    cameraControlsRef.current.mouseButtons.left = 0;
    // cameraControlsRef.current.mouseButtons.right = 0;
    cameraControlsRef.current.mouseButtons.wheel = 0;
  }, []);

  return (
    <div className="w-screen h-screen relative">
      <div
        className="absolute w-full h-full z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 50%, var(--background) 100%)",
        }}
      />
      <Canvas
        dpr={[5, 15]}
        camera={{ fov: 70, position: [CAMERA_X, CAMERA_Y, CAMERA_Z] }}
        // linear
        // flat
        // frameloop="demand"
      >
        {/* Background color */}
        {/* <color attach="background" args={["#191920"]} />
        <fog attach="fog" args={["#191920", 0, 15]} /> */}

        {/* FIXME: Not working */}
        {/* <directionalLight
          intensity={10}
          position={[0, 0, 5]}
          castShadow
          color="#ffffff"
        /> */}

        <group position={[0, 0, 0]}>
          <Frames images={images} cameraControlsRef={cameraControlsRef} />

          {/* Reflective BG/floor */}
          {/* <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050505"
              metalness={0.5}
            />
          </mesh> */}
        </group>
        <Environment preset="city" />
        <CameraControls
          ref={cameraControlsRef}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 8}
          maxAzimuthAngle={Math.PI / 4}
          minDistance={0.001}
          maxDistance={5}
          distance={0.1}
        />
      </Canvas>
    </div>
  );
}

function Frames({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
  cameraControlsRef,
}) {
  const ref = useRef();
  const clicked = useRef();
  // FIXME.
  const [, params] = useRoute("/:id");
  // const params = useParams();

  const [, setLocation] = useLocation();
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      // clicked.current.parent.updateWorldMatrix(true, true);
      // clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      // clicked.current.parent.getWorldQuaternion(q);
      // Change rotation to 0
      cameraControlsRef.current?.fitToBox(clicked.current, true, {
        paddingTop: 0.1,
        paddingBottom: 0.1,
        paddingLeft: 0.1,
        paddingRight: 0.1,
      });
      // cameraControlsRef.current?.rotateTo(0, Math.PI / 2, true);
    } else {
      // p.set(CAMERA_X, CAMERA_Y, CAMERA_Z);
      // cameraControlsRef.current?.fitToBox(ref.current, true);
      cameraControlsRef.current?.moveTo(CAMERA_X, CAMERA_Y, CAMERA_Z, true);
      cameraControlsRef.current?.rotateTo(Math.PI * 0.25, Math.PI * 0.45, true);
      q.identity();
    }
  });

  // cameraControlsRef.current?.fitToBox(clicked.current, true);
  // cameraControlsRef.current?.rotateTo(0, 1.5, false);

  // Do not delete—this enables the transitions between states
  // But this also causes a bug, wherein pans are never permanent
  // useFrame((state, dt) => {
  //   // easing.damp3(state.camera.position, p, 0.4, dt);
  //   // easing.dampQ(state.camera.quaternion, q, 0, dt);
  //   if (clicked.current) {
  //     setLastPannedPosition(state.camera.position);
  //     easing.damp3(state.camera.position, p, 0.4, dt);
  //     easing.dampQ(state.camera.quaternion, q, 0, dt);
  //   } else {
  //     // easing.damp3(state.camera.position, p, 0.4, dt);
  //     easing.dampQ(state.camera.quaternion, q, 0, dt);
  //     easing.damp3(state.camera.position, lastPannedPosition, 0.4, dt);
  //     // easing.damp3(
  //     //   state.camera.position,
  //     //   [CAMERA_X, CAMERA_Y, CAMERA_Z],
  //     //   0.1,
  //     //   dt,
  //     //   lastPannedPosition
  //     // );
  //     // easing.dampC(state.camera.quaternion, q, 0.1, dt);
  //     // setLastPannedPosition(state.camera.position);
  //   }
  // });
  // useFrame((state, dt) => {
  //   easing.damp3(state.camera.position, p, 0.4, dt);
  //   easing.dampQ(state.camera.quaternion, q, 0, dt);
  // });

  return (
    <group
      ref={ref}
      onClick={(e) => (
        e.stopPropagation(),
        setLocation(clicked.current === e.object ? "/" : "/" + e.object.name),
        cameraControlsRef.current?.fitToBox(e.object, true, {
          paddingTop: 0.1,
          paddingBottom: 0.1,
          paddingLeft: 0.1,
          paddingRight: 0.1,
        }),
        cameraControlsRef.current?.rotateTo(0, Math.PI / 2, true)
      )}
      onPointerMissed={() => {
        // cameraControlsRef.current?.fitToBox(ref.current, true);
        // cameraControlsRef.current?.moveTo(CAMERA_X, CAMERA_Y, CAMERA_Z, true);
        cameraControlsRef.current?.rotateTo(
          Math.PI * 0.25,
          Math.PI * 0.45,
          true
        );
        setLocation("/");
      }}
    >
      {images.map(
        (props) => <Frame key={props.url} cameraControlsRef={cameraControlsRef} {...props} /> /* prettier-ignore */
      )}
    </group>
  );
}

function Frame({
  url,
  name,
  cameraControlsRef,
  c = new THREE.Color(),
  ...props
}) {
  const image = useRef();
  const frame = useRef();
  const [, params] = useRoute("/:id");

  // const scale = useAspect(
  //   // "cover",
  //   image.current?.material.map.image.width / 1000,
  //   image.current?.material.map.image.height / 1000,
  //   1
  // );

  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const id = getUuid(url);
  const isActive = params?.id === id;

  useCursor(hovered);

  const x = { hovered: 1, unhovered: 0.95 };
  const y = { hovered: 1, unhovered: 0.95 };

  useFrame((state, dt) => {
    // This is what enables the auto movement of images
    // image.current.material.zoom =
    //   2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 2) / 2;
    // This is what enables the hover event with the yellow border
    easing.damp3(
      image.current.scale,
      [
        1 * (!isActive && hovered ? x.hovered : x.unhovered),
        1 * (!isActive && hovered ? y.hovered : y.unhovered),
        1,
      ],
      0.1,
      dt
    );

    // This is what enables the color of the border
    // easing.dampC(
    //   frame.current.material.color,
    //   hovered ? "#ca8a04" : "white",
    //   0.1,
    //   dt
    // );
  });

  const FRAME_DEPTH = 0.15;

  return (
    <group {...props}>
      <mesh
        name={id}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, 1, FRAME_DEPTH]}
        position={[0, 0, 0]}
      >
        {/* Box — needed for click events */}
        <boxGeometry />

        {/* Optiona: radial gradient around frame */}
        {/* <meshBasicMaterial>
          <GradientTexture
            stops={[0, 0.5, 1]} // As many stops as you want
            colors={["aquamarine", "hotpink", "yellow"]} // Colors need to match the number of stops
            size={1024} // Size (height) is optional, default = 1024
            width={1024} // Width of the canvas producing the texture, default = 16
            type={GradientType.Radial} // The type of the gradient, default = GradientType.Linear
            innerCircleRadius={0} // Optional, the radius of the inner circle of the gradient, default = 0
            outerCircleRadius={"auto"} // Optional, the radius of the outer circle of the gradient, default = auto
          />
        </meshBasicMaterial> */}

        {/* Makes the frame black */}
        <meshStandardMaterial
          color="#151515"
          metalness={0.25}
          roughness={0.25}
          envMapIntensity={5}
        />

        {/* White inner box */}
        {/* <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.9, 0.9]}
          position={[0, 0, 0]}
          color="#151515"
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh> */}

        {/* Image itself */}
        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.51]}
          url={url}
          toneMapped={false}
          // opacity={0.5}
        />
      </mesh>

      {/* <Text
        maxWidth={1}
        anchorX="left"
        anchorY="top"
        position={[0.5, 0.5, 0.1]}
        fontSize={0.025}
      >
        Project.
      </Text> */}

      <Html position={[-0.5, 0.6, 0.01]} occlude>
        <a
          href="#"
          style={{
            pointerEvents: isActive ? "all" : "none",
            opacity: isActive ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            fontFamily: "var(--font-nyght)",
            width: "max-content",
            display: "block",
            color: "white",
          }}
        >
          {name}
        </a>
      </Html>
    </group>
  );
}
