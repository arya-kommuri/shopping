import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const ShoppingCartMesh = () => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Cart Wire Basket */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.2, 1.4, 1.6]} />
          <meshStandardMaterial color="#00f2fe" wireframe roughness={0.1} emissive="#00f2fe" emissiveIntensity={0.6} />
        </mesh>

        {/* Base Frame */}
        <mesh position={[0, -0.9, 0]}>
          <boxGeometry args={[2.4, 0.2, 1.4]} />
          <meshStandardMaterial color="#1a1e36" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Handle */}
        <mesh position={[-1.2, 0.8, 0]} rotation={[0, 0, -0.4]}>
          <cylinderGeometry args={[0.08, 0.08, 1.4, 16]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={0.8} />
        </mesh>

        {/* 4 Wheels */}
        {[-0.9, 0.9].map((x, i) => (
          [-0.6, 0.6].map((z, j) => (
            <mesh key={`${i}-${j}`} position={[x, -1.2, z]}>
              <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
              <meshStandardMaterial color="#ffffff" emissive="#00f5a0" emissiveIntensity={0.5} />
            </mesh>
          ))
        ))}

        {/* Floating Items inside basket */}
        <mesh position={[0.4, 0.3, 0.2]} rotation={[0.2, 0.4, 0]}>
          <boxGeometry args={[0.5, 0.7, 0.4]} />
          <meshStandardMaterial color="#7f00ff" emissive="#7f00ff" emissiveIntensity={0.6} />
        </mesh>

        <mesh position={[-0.4, 0.4, -0.2]} rotation={[-0.3, 0.2, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#00f5a0" emissive="#00f5a0" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </Float>
  );
};

export const Cart3DAnimation = () => {
  return (
    <div className="w-full h-full min-h-[220px] relative rounded-2xl overflow-hidden bg-slate-950/60 border border-cyan-500/20">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={50} />
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2fe" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff007f" />
        
        <ShoppingCartMesh />
        <Sparkles count={30} scale={4} size={2} color="#00f2fe" />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
};
