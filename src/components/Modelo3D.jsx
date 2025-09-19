// src/components/Modelo3D.jsx
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

function Modelo() {
  const gltf = useGLTF("/models/img3d.glb");
  const ref = useRef();
  const [girar, setGirar] = useState(false); // controla quando girar

  // useEffect para iniciar a rotação após 0.5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setGirar(true);
    }, 1000); // 500ms
    return () => clearTimeout(timer);
  }, []);

  // gira o modelo apenas se girar=true
  useFrame(() => {
    if (ref.current && girar) {
      ref.current.rotation.y += 0.01; // velocidade da rotação
    }
  });

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={[3, 3, 3]}
      position={[0, -1, 0]}
    />
  );
}

export default function Modelo3D() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense
          fallback={
            <mesh>
              <boxGeometry />
              <meshStandardMaterial color="red" />
            </mesh>
          }
        >
          <Modelo />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
