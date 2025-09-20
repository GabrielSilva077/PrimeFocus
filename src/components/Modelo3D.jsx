import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useInView } from "react-intersection-observer";

function Modelo({ girar }) {
  const gltf = useGLTF("/models/img3d.glb");
  const ref = useRef();

  // Estado para a escala
  const targetScale = 3; // escala final
  const initialScale = 5; // escala inicial maior

  useFrame(() => {
    if (ref.current) {
      // anima de initialScale para targetScale
      ref.current.scale.lerp(
        { x: targetScale, y: targetScale, z: targetScale },
        0.02 // velocidade da interpolação (quanto menor, mais lento)
      );

      // rotação automática
      if (girar) ref.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={[initialScale, initialScale, initialScale]} // começa maior
      position={[0, -1, 0]}
    />
  );
}

export default function Modelo3D() {
  const [girar, setGirar] = useState(false);
  const { ref: containerRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setGirar(true), 500); // começa a girar após 0.5s
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <div ref={containerRef} style={{ width: "200vw", height: "140vh" }}>
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
          <Modelo girar={girar} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 2 - 0.26} // limita vertical (para cima)
          maxPolarAngle={Math.PI / 2 + 0.26} // limita vertical (para baixo)
        />
      </Canvas>
    </div>
  );
}
