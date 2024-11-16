import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  uniform float uVelo;
  uniform float uDistortion;
  varying vec2 vUv;
  
  #define M_PI 3.1415926535897932384626433832795
  
  void main() {
    vec3 pos = position;
    float distortion = sin(uv.y * M_PI) * uDistortion;
    pos.x = pos.x + ((sin(uv.y * M_PI) * uVelo) * 0.125);
    pos.z += distortion * 0.1;
    
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uImageSize;
  uniform float uVelo;
  uniform float uScale;
  uniform float uDistortion;
  
  varying vec2 vUv;
  
  vec2 backgroundCoverUv(vec2 screenSize, vec2 imageSize, vec2 uv) {
    float screenRatio = screenSize.x / screenSize.y;
    float imageRatio = imageSize.x / imageSize.y;
    vec2 newSize = screenRatio < imageRatio 
        ? vec2(imageSize.x * screenSize.y / imageSize.y, screenSize.y)
        : vec2(screenSize.x, imageSize.y * screenSize.x / imageSize.x);
    vec2 newOffset = (screenRatio < imageRatio 
        ? vec2((newSize.x - screenSize.x) / 2.0, 0.0) 
        : vec2(0.0, (newSize.y - screenSize.y) / 2.0)) / newSize;
    return uv * screenSize / newSize + newOffset;
  }
  
  void main() {
    vec2 uv = vUv;
    
    vec2 texCenter = vec2(0.5);
    vec2 texUv = backgroundCoverUv(vec2(1.0), uImageSize, uv);
    vec2 texScale = (texUv - texCenter) * (uScale + uDistortion * 0.2) + texCenter;
    vec4 color = texture2D(uTexture, texScale);
    
    vec2 rTexScale = texScale;
    rTexScale.x += 0.15 * uVelo;
    if(uv.x < 1.0) color.r = texture2D(uTexture, rTexScale).r;
    
    vec2 bTexScale = texScale;
    bTexScale.x += 0.25 * uVelo;
    if(uv.x < 1.0) color.b = texture2D(uTexture, bTexScale).b;
    
    gl_FragColor = color;
  }
`;

const ImagePlane = ({
  texture,
  rowIndex,
  columnIndex,
  offset,
  totalWidth,
  totalHeight,
  spacing,
}) => {
  const mesh = useRef();
  const shaderRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uImageSize: { value: [texture.image.width, texture.image.height] },
      uVelo: { value: 0 },
      uScale: { value: 1 },
      uDistortion: { value: 0 },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (shaderRef.current) {
      const relativePositionX = (offset.x - mesh.current.position.x) / 2;
      const relativePositionY = (offset.y - mesh.current.position.y) / 2;
      //   shaderRef.current.uniforms.uVelo.value =
      //     Math.sqrt(relativePositionX ** 2 + relativePositionY ** 2) * 0.0025;
      shaderRef.current.uniforms.uScale.value = THREE.MathUtils.lerp(
        shaderRef.current.uniforms.uScale.value,
        1,
        0.1
      );

      const distortion =
        5 -
        Math.sqrt(mesh.current.position.x ** 2 + mesh.current.position.y ** 2) *
          0.2;
      mesh.current.position.z = distortion * 0.5;
    }

    // Calculate the actual position considering the loop for both x and y
    let actualPositionX = (offset.x + columnIndex * (1 + spacing)) % totalWidth;
    let actualPositionY = (offset.y + rowIndex * (1 + spacing)) % totalHeight;
    const midpointX = totalWidth / 2;
    const midpointY = totalHeight / 2;

    if (actualPositionX > midpointX) actualPositionX -= totalWidth;
    if (actualPositionX < -midpointX) actualPositionX += totalWidth;
    if (actualPositionY > midpointY) actualPositionY -= totalHeight;
    if (actualPositionY < -midpointY) actualPositionY += totalHeight;

    mesh.current.position.x = actualPositionX;
    mesh.current.position.y = actualPositionY;

    // Set visibility based on position
    mesh.current.visible =
      actualPositionX > -(4 + spacing) &&
      actualPositionX < 4 + spacing &&
      actualPositionY > -(4 + spacing) &&
      actualPositionY < 4 + spacing;
  });

  return (
    <mesh
      ref={mesh}
      position={[columnIndex * (2 - spacing), rowIndex * (2 - spacing), 0]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

// Utility function to shuffle an array
const shuffleArray = (array, rowIndex) => {
  // FIXME: Use row index to shuffle the array
  // rowIndex 0 === [1,2,3,4,5,6,7,8,9,10]
  // rowIndex 1 === [10,9,8,7,6,5,4,3,2,1]
  // rowIndex 2 === [5,2,6,3,7,4,8,9,10,1]
  const shuffledArray = array.slice(0);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Scroller = () => {
  const groupRef = useRef();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [lastTime, setLastTime] = useState(0);
  const { camera, gl } = useThree();

  const textures = useTexture([
    "/images/screens/blackouts.png",
    "/images/screens/bob-ross.png",
    "/images/screens/course.png",
    "/images/screens/cudi.png",
    "/images/screens/impact.png",
    "/images/screens/learn-prompt.png",
    "/images/screens/linkedin.png",
    "/images/screens/midjourney.png",
    "/images/screens/minerva.png",
    "/images/screens/olympics.png",
    "/images/screens/praxis.jpg ",
    "/images/screens/protests.png",
    "/images/screens/rainmaker.jpg ",
    "/images/screens/realm.jpg ",
    "/images/screens/tech.png",
  ]);

  const totalImages = textures.length;
  const imageSize = 1;
  const spacing = 1; // Adjust this value to increase or decrease spacing
  const totalWidth = totalImages * (imageSize + spacing);
  const totalHeight = totalImages * (imageSize + spacing);

  const friction = 0.95; // Adjust this value to change how quickly the scrolling slows down
  const damping = 0.9; // Adjust this value to change how "bouncy" the scrolling feels

  useEffect(() => {
    const canvas = gl.domElement;

    const handleMouseDown = (event) => {
      setIsDragging(true);
      setLastPosition({ x: event.clientX, y: event.clientY });
      setLastTime(Date.now());
      setVelocity({ x: 0, y: 0 }); // Reset velocity when starting a new drag
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        const currentTime = Date.now();
        const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
        const deltaX = (event.clientX - lastPosition.x) * 0.0025;
        const deltaY = (event.clientY - lastPosition.y) * 0.0025;

        setOffset((prev) => ({
          x: prev.x + deltaX,
          y: prev.y - deltaY,
        }));

        // Calculate new velocity
        setVelocity({
          x: deltaX / deltaTime,
          y: -deltaY / deltaTime,
        });

        setLastPosition({ x: event.clientX, y: event.clientY });
        setLastTime(currentTime);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [
    isDragging,
    lastPosition,
    lastTime,
    gl.domElement,
    totalWidth,
    totalHeight,
  ]);

  useFrame((state, delta) => {
    if (!isDragging) {
      // Apply velocity with friction and damping
      setOffset((prev) => ({
        x: prev.x + velocity.x * delta,
        y: prev.y + velocity.y * delta,
      }));

      // Apply friction and damping to velocity
      setVelocity((prev) => ({
        x: prev.x * friction * (1 - damping * delta),
        y: prev.y * friction * (1 - damping * delta),
      }));

      // Stop the animation when velocity is very low
      if (Math.abs(velocity.x) < 0.01 && Math.abs(velocity.y) < 0.01) {
        setVelocity({ x: 0, y: 0 });
      }
    }
  });

  // Create shuffled rows of textures
  const shuffledRows = useMemo(() => {
    return Array(totalImages)
      .fill()
      .map((item, index) => shuffleArray(textures, index));
  }, [textures]);

  return (
    <group ref={groupRef}>
      {shuffledRows.map((rowTextures, rowIndex) =>
        rowTextures.map((texture, columnIndex) => (
          <ImagePlane
            key={`${rowIndex}-${columnIndex}`}
            texture={texture}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            offset={offset}
            totalWidth={totalWidth}
            totalHeight={totalHeight}
            spacing={spacing}
          />
        ))
      )}
    </group>
  );
};

const WebGLScroller = () => (
  <div style={{ width: "100%", height: "100vh", background: "#000" }}>
    <Canvas>
      <OrbitControls
        enablePan={false}
        enableRotate={false}
        enableZoom={true}
        minDistance={4}
        maxDistance={5}
      />
      {/* <PerspectiveCamera makeDefault position={[0, 0, 10]} /> */}
      <Scroller />
    </Canvas>
  </div>
);

export default WebGLScroller;
