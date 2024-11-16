import React, {
  useRef,
  useMemo,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

const ImageParticleSystem = ({
  imageUrl,
  state,
  transitioning,
  setTransitioning,
  gradientThreshold,
  pixelStep,
  SPEED,
  STAGGER,
  offsetZ,
}) => {
  const particlesRef = useRef();
  const [particles, setParticles] = useState([]);
  const [targetPositions, setTargetPositions] = useState(null);
  const [startTime, setStartTime] = useState(0);

  const generateRandomPositions = useCallback(
    (count) => {
      if (offsetZ) {
        return new Float32Array(count * 3).map(
          () => (0.5 - Math.random()) * 250
        );
      } else {
        return new Float32Array(count * 3)
          .map((_, i) => (0.5 - Math.random()) * 350)
          .map((value, i) => (i % 3 === 2 ? 0 : value));
      }
    },
    [offsetZ]
  );

  const positionAttribute = useRef();
  const colorAttribute = useRef();
  const delayAttribute = useRef();

  const calculateDelays = useCallback(
    (particles, state) => {
      let maxX = -Infinity;
      let minX = Infinity;

      for (let i = 0; i < particles.length; i++) {
        const x = particles[i].position.x;
        if (x > maxX) maxX = x;
        if (x < minX) minX = x;
      }

      const xRange = maxX - minX;

      return new Float32Array(particles.length).map((_, i) => {
        const normalizedX = (particles[i].position.x - minX) / xRange;
        return state === "random"
          ? (1 - normalizedX) * STAGGER * 1000
          : normalizedX * STAGGER * 1000;
      });
    },
    [STAGGER]
  );

  useEffect(() => {
    setParticles([]);

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const wWidth = window.innerWidth;
      const wHeight = window.innerHeight;
      canvas.width = wWidth;
      canvas.height = wHeight;

      const scale = wWidth / img.width;

      ctx.drawImage(img, 0, 0, wWidth, wHeight);
      const imageData = ctx.getImageData(0, 0, wWidth, wHeight);

      const newParticles = [];
      const width = wWidth;
      const height = wHeight;

      const sobelKernelX = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1],
      ];
      const sobelKernelY = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1],
      ];

      const applyKernel = (x, y, kernel) => {
        let sum = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const pixelX = Math.min(Math.max(x + i, 0), width - 1);
            const pixelY = Math.min(Math.max(y + j, 0), height - 1);
            const index = (pixelY * width + pixelX) * 4;
            const value =
              (imageData.data[index] +
                imageData.data[index + 1] +
                imageData.data[index + 2]) /
              3;
            sum += value * kernel[i + 1][j + 1];
          }
        }
        return sum;
      };

      for (let y = 0; y < height; y += pixelStep) {
        for (let x = 0; x < width; x += pixelStep) {
          const gx = applyKernel(x, y, sobelKernelX);
          const gy = applyKernel(x, y, sobelKernelY);
          const gradient = Math.sqrt(gx * gx + gy * gy);

          if (gradient >= gradientThreshold) {
            const index = (y * width + x) * 4;
            const r = imageData.data[index];
            const g = imageData.data[index + 1];
            const b = imageData.data[index + 2];

            newParticles.push({
              position: new THREE.Vector3(
                (x - width / 2) / (scale * 5),
                (height / 2 - y) / (scale * 5),
                0
              ),
              color: new THREE.Color(r / 255, g / 255, b / 255),
            });
          }
        }
      }

      console.log("Particles created:", newParticles.length);
      setParticles(newParticles);

      positionAttribute.current = new THREE.BufferAttribute(
        new Float32Array(newParticles.length * 3),
        3
      );
      colorAttribute.current = new THREE.BufferAttribute(
        new Float32Array(newParticles.length * 3),
        3
      );
      delayAttribute.current = new THREE.BufferAttribute(
        new Float32Array(newParticles.length),
        1
      );

      const initialRandomPositions = generateRandomPositions(
        newParticles.length
      );
      positionAttribute.current.array.set(initialRandomPositions);
      colorAttribute.current.array.set(
        new Float32Array(newParticles.flatMap((p) => p.color.toArray()))
      );

      const initialDelays = calculateDelays(newParticles, "random");
      delayAttribute.current.array.set(initialDelays);

      positionAttribute.current.needsUpdate = true;
      colorAttribute.current.needsUpdate = true;
      delayAttribute.current.needsUpdate = true;

      setStartTime(Date.now());
      setTargetPositions(initialRandomPositions);
    };
    img.onerror = (err) => {
      console.error("Error loading image:", err);
    };
    img.src = imageUrl;
  }, [
    imageUrl,
    generateRandomPositions,
    calculateDelays,
    gradientThreshold,
    pixelStep,
  ]);

  const imagePositions = useMemo(() => {
    if (!particles.length) return null;
    return new Float32Array(particles.flatMap((p) => p.position.toArray()));
  }, [particles]);

  useEffect(() => {
    if (particles.length > 0) {
      const newDelays = calculateDelays(particles, state);
      delayAttribute.current.array.set(newDelays);
      delayAttribute.current.needsUpdate = true;
      setStartTime(Date.now());
      setTransitioning(true);

      const newTargetPositions =
        state === "random"
          ? generateRandomPositions(particles.length)
          : imagePositions;
      setTargetPositions(newTargetPositions);
    }
  }, [
    state,
    particles,
    setTransitioning,
    imagePositions,
    calculateDelays,
    generateRandomPositions,
  ]);

  useFrame(() => {
    if (
      transitioning &&
      positionAttribute.current &&
      colorAttribute.current &&
      delayAttribute.current &&
      targetPositions
    ) {
      const positions = positionAttribute.current.array;
      const colors = colorAttribute.current.array;
      const delays = delayAttribute.current.array;

      if (!positions || !colors || !delays || !particles.length) {
        return;
      }

      let allReached = true;
      const relativeTime = Date.now() - startTime;

      for (let i = 0; i < positions.length; i += 3) {
        const delay = delays[i / 3];
        if (relativeTime > delay) {
          for (let j = 0; j < 3; j++) {
            const index = i + j;
            positions[index] +=
              (targetPositions[index] - positions[index]) * SPEED;
            colors[index] +=
              (particles[Math.floor(index / 3)].color.toArray()[j] -
                colors[index]) *
              0.1;

            if (Math.abs(positions[index] - targetPositions[index]) > 0.01) {
              allReached = false;
            }
          }
        } else {
          allReached = false;
        }
      }

      positionAttribute.current.needsUpdate = true;
      colorAttribute.current.needsUpdate = true;

      if (allReached) {
        setTransitioning(false);
      }
    }
  });

  return (
    <>
      <points ref={particlesRef}>
        <bufferGeometry>
          {particles.length > 0 && positionAttribute.current && (
            <bufferAttribute
              ref={positionAttribute}
              attach="attributes-position"
              count={particles.length}
              array={positionAttribute.current.array}
              itemSize={3}
            />
          )}
          {particles.length > 0 && colorAttribute.current && (
            <bufferAttribute
              ref={colorAttribute}
              attach="attributes-color"
              count={particles.length}
              array={colorAttribute.current.array}
              itemSize={3}
            />
          )}
        </bufferGeometry>
        <pointsMaterial vertexColors size={1} sizeAttenuation={true} />
      </points>
    </>
  );
};

const ParticleScene = () => {
  // const imageUrl = "/images/screens/rainmaker.jpg";
  const imageUrl = "/images/me/andys-low.jpg";

  const [state, setState] = useState("random");
  const [transitioning, setTransitioning] = useState(false);

  const { gradientThreshold, SPEED, STAGGER, offsetZ, enableOrbit } =
    useControls({
      gradientThreshold: { value: 0, min: 0, max: 50, step: 1 },
      // pixelStep: { value: 4, min: 1, max: 10, step: 1 },
      SPEED: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
      STAGGER: { value: 0.05, min: 0, max: 1, step: 0.01 },
      offsetZ: false,
      enableOrbit: false,
    });

  const toggleState = () => {
    setState((prevState) => (prevState === "random" ? "image" : "random"));
  };

  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 150], fov: 100 }}>
        <color attach="background" args={["#cecece"]} />
        <ImageParticleSystem
          key={`${gradientThreshold}-${SPEED}-${STAGGER}-${offsetZ}`}
          imageUrl={imageUrl}
          state={state}
          transitioning={transitioning}
          // transitioning={transitioning}
          setTransitioning={setTransitioning}
          gradientThreshold={gradientThreshold}
          // pixelStep={pixelStep}
          pixelStep={3}
          SPEED={SPEED}
          STAGGER={STAGGER}
          offsetZ={offsetZ}
        />
        <OrbitControls enabled={enableOrbit} />
      </Canvas>
      <button
        onClick={toggleState}
        style={{ position: "absolute", bottom: 10, right: 10, zIndex: 100 }}
      >
        Toggle State
      </button>
    </div>
  );
};

export default ParticleScene;
