import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model() {
  // Carrega o modelo .glb
  const { scene } = useGLTF("/models/d0e086c7-ec34-4b5b-88eb-8103745a646c.glb");
  return <primitive object={scene} scale={2} />;
}

export default function ModelViewer() {
  return (
    <Canvas style={{ height: "100vh", width: "100%" }}>
      {/* Iluminação */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      {/* Carregando o modelo */}
      <Suspense fallback={null}>
        <Model />
      </Suspense>

      {/* Permite girar com o mouse */}
      <OrbitControls />
    </Canvas>
  );
}
