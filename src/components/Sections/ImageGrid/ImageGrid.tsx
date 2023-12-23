import * as THREE from "three";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { GlassPortal } from "@/components/Three/GlassPortal";

const GOLDENRATIO = 1.196;

// Custom hook to track mouse position
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(event) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

const CAMERA_X = 0;
const CAMERA_Y = 0.15;
const CAMERA_Z = 2;

export default function ImageGridWrapper({
  showProjects,
  images,
  currentImageIndex,
}: {
  showProjects: boolean;
  images: any[];
  currentImageIndex: number;
}) {
  const cameraControlsRef = useRef<CameraControls | null>(null);
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImageUrl = useMemo(
    () =>
      images[currentImageIndex]
        ? images[currentImageIndex]?.url
        : images[0]?.url,
    [currentImageIndex]
  );

  return (
    <div className="w-screen h-full relative">
      <div
        className="absolute w-full h-full z-10"
        style={{
          // background:
          //   "linear-gradient(to bottom, transparent 50%, var(--background) 100%)",
          pointerEvents: showProjects ? "none" : "all",
        }}
      />

      <Canvas
        shadows
        dpr={[5, 15]}
        camera={{ fov: 80, position: [CAMERA_X, CAMERA_Y, CAMERA_Z] }}
        // linear
        // flat
        // frameloop="demand"
      >
        {/* Background color */}
        {/* <color attach="background" args={["#191920"]} /> */}
        <color attach="background" args={["#111111"]} />
        <fog attach="fog" args={["#191920", 0, 15]} />

        {/* FIXME: Not working */}
        {/* <directionalLight
          intensity={10}
          position={[0, 0, 5]}
          castShadow
          color="#000000"
        /> */}

        <Environment preset="warehouse" />

        <group position={[0, 0, 0]} castShadow>
          <Frames
            images={images}
            cameraControlsRef={cameraControlsRef}
            currentImageUrl={currentImageUrl}
          />

          {/* Reflective BG/floor */}
          {/* <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 10]} />
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
              metalness={0.25}
            />
          </mesh> */}
        </group>

        {/* <Environment preset="warehouse" /> */}
        {/* <Environment preset="city" /> */}
        {/* <Environment near={1} far={1000} resolution={256}>
          <mesh scale={100}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshBasicMaterial color={"#ffffff"} side={THREE.DoubleSide} />
          </mesh>
        </Environment> */}

        {/* <OrbitControls
          makeDefault
          // target={[0, 0, 0]}
          // autoRotate
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 8}
          maxAzimuthAngle={Math.PI / 4}
          // mouseButtons={{
          //   LEFT: 0, // THREE.MOUSE.ROTATE,
          //   MIDDLE: 0,
          //   RIGHT: 0,
          // }}
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        /> */}
        <CameraControls
          ref={cameraControlsRef}
          mouseButtons={{
            left: 0,
            // left: THREE.MOUSE.PAN,
            middle: 0,
            wheel: 0,
            right: 0,
          }}

          // minPolarAngle={Math.PI / 4}
          // maxPolarAngle={Math.PI / 2}
          // minAzimuthAngle={-Math.PI / 8}
          // maxAzimuthAngle={Math.PI / 4}
          // minDistance={0.001}
          // maxDistance={5}
          // distance={0.1}
          // mouseButtons={{
          //   left: 0,
          //   middle: 0,
          //   wheel: 0,
          //   right: 0,
          // }}
          // touches={
          //   {
          //     one: 0,
          //     two: 0, // PAN
          //   } as any
          // }
          // interactiveArea={{ x: 0, y: 0, width: 0, height: 0 }}
          // enabled={false}
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
  currentImageUrl,
}) {
  const mousePosition = useMousePosition();

  const ref = useRef();
  const clicked = useRef();
  // FIXME.
  const [, params] = useRoute("/:id");
  // const params = useParams();

  const DEFAULT_X_ROTATION = 0; // Math.PI * 0.25;
  const DEFAULT_Y_ROTATION = Math.PI * 0.45;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    if (!images[currentImageIndex]) return;
    setLocation(images[currentImageIndex].url.split("/").pop());
  }, [currentImageIndex]);

  // Handler for keydown events
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!params?.id) return;
      if (event.key === "ArrowLeft") {
        const currentUrl = params.id;
        const currentIndex = images.findIndex(
          (image) => image.url.split("/").pop() === currentUrl
        );
        const previousUrl = images[currentIndex - 1]?.url;
        setLocation(previousUrl ? previousUrl.split("/").pop() : "/");
      } else if (event.key === "ArrowRight") {
        const currentUrl = params.id;
        const currentIndex = images.findIndex(
          (image) => image.url.split("/").pop() === currentUrl
        );
        const nextUrl = images[currentIndex + 1]?.url;
        setLocation(nextUrl ? nextUrl.split("/").pop() : "/");
      }
    },
    [images.length, params?.id]
  );

  // Bind the event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // const { camera } = useThree();
  // console.log(camera);

  useFrame(({ camera }) => {
    if (params?.id) return;
    // if (cameraControlsRef.current) {
    const Y_MIDPOINT = window.innerHeight / 2;
    const X_MIDPOINT = window.innerWidth / 2;
    const Y_POSITION = mousePosition.y - Y_MIDPOINT;
    const X_POSITION = mousePosition.x - X_MIDPOINT;
    const Y_PERCENT_FROM_MIDPOINT = (Y_POSITION / Y_MIDPOINT) * -1;
    const X_PERCENT_FROM_MIDPOINT = (X_POSITION / X_MIDPOINT) * -1;
    const NUDGEABLE_Y_AMOUNT = 0.25;
    const NUDGEABLE_X_AMOUNT = 0.25;
    // Calculate rotation based on mouse position
    const yRotation =
      DEFAULT_Y_ROTATION + Y_PERCENT_FROM_MIDPOINT * NUDGEABLE_Y_AMOUNT;
    const xRotation =
      DEFAULT_X_ROTATION + X_PERCENT_FROM_MIDPOINT * NUDGEABLE_X_AMOUNT;
    // Apply rotation to camera
    cameraControlsRef.current.rotateTo(xRotation, yRotation, true);
    // camera.rotation.set(xRotation, yRotation, 0);
    // }
  });

  const [, setLocation] = useLocation();
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
      // Change rotation to 0
      cameraControlsRef.current?.fitToBox(clicked.current, true, {
        paddingTop: 0.1,
        paddingBottom: 0.1,
        paddingLeft: 0.1,
        paddingRight: 0.1,
      });
      cameraControlsRef.current?.rotateTo(0, Math.PI / 2, true);
    } else {
      p.set(CAMERA_X, CAMERA_Y, CAMERA_Z);
      // cameraControlsRef.current?.moveTo(CAMERA_X, CAMERA_Y, CAMERA_Z, true);

      // cameraControlsRef.current?.fitToBox(ref.current, true);
      // cameraControlsRef.current?.rotateTo(Math.PI * 0.25, Math.PI * 0.45, true);

      q.identity();
    }
  }, [params?.id]);

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
        })
        // cameraControlsRef.current?.rotateTo(0, Math.PI / 2, true)
      )}
      onPointerMissed={() => {
        // cameraControlsRef.current?.fitToBox(ref.current, true);
        // cameraControlsRef.current?.moveTo(CAMERA_X, CAMERA_Y, CAMERA_Z, true);
        // cameraControlsRef.current?.rotateTo(
        //   Math.PI * 0.25,
        //   Math.PI * 0.45,
        //   true
        // );
        cameraControlsRef.current?.moveTo(CAMERA_X, CAMERA_Y, CAMERA_Z, true);
        setLocation("/");
      }}
    >
      {/* <GlassPortal image={currentImageUrl} /> */}
      {images.map((image, i) => (
        <Frame key={image.url} {...image} />
      ))}
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
  const id = url.split("/").pop();
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
        castShadow
        receiveShadow
      >
        {/* Box — needed for click events */}
        <boxGeometry />

        {/* Optional: radial gradient around frame */}
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

      <Html
        position={[-0.5, 0.6, 0.01]}
        occlude
        style={{
          pointerEvents: isActive ? "all" : "none",
        }}
      >
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
