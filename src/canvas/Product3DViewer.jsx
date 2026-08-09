import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Procedural 3D Mesh generator based on product shape
const Product3DMesh = ({ product, isWireframe }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  const color = product?.color || '#00f2fe';
  const emissive = product?.emissiveColor || '#0066ff';
  const shape = product?.shape || 'box';

  const renderGeometry = () => {
    switch (shape) {
      case 'sphere':
      case 'fruit':
        return <sphereGeometry args={[1.3, 32, 32]} />;
      case 'cylinder':
      case 'bottle':
        return <cylinderGeometry args={[0.9, 1.1, 2.4, 32]} />;
      case 'can':
        return <cylinderGeometry args={[0.85, 0.85, 2.2, 32]} />;
      case 'torus':
        return <torusGeometry args={[1.2, 0.4, 24, 48]} />;
      case 'capsule':
        return <capsuleGeometry args={[0.7, 1.2, 16, 32]} />;
      case 'drone':
        return (
          <group>
            <boxGeometry args={[1.6, 0.4, 1.6]} />
            <mesh position={[1, 0.3, 1]}>
              <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[-1, 0.3, 1]}>
              <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[1, 0.3, -1]}>
              <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[-1, 0.3, -1]}>
              <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.8} />
            </mesh>
          </group>
        );
      case 'device':
      case 'box':
      default:
        return <boxGeometry args={[1.8, 2.2, 0.6]} />;
    }
  };

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={meshRef}>
        {/* Main Mesh */}
        <mesh castShadow receiveShadow>
          {renderGeometry()}
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.4}
            roughness={product?.materialType === 'metallic' ? 0.15 : 0.4}
            metalness={product?.materialType === 'metallic' ? 0.85 : 0.2}
            wireframe={isWireframe}
          />
        </mesh>

        {/* Outer Glow Ring */}
        <mesh scale={1.25}>
          <torusGeometry args={[1.4, 0.02, 16, 64]} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>
      </group>
    </Float>
  );
};

export const Product3DViewer = ({ product, autoRotate = true }) => {
  const [isWireframe, setIsWireframe] = useState(false);

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/20">
      
      {/* Controls Bar Overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="badge badge-cyan text-[11px] font-mono">
          3D Interactive Inspector
        </span>
        <button
          onClick={() => setIsWireframe(!isWireframe)}
          className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
            isWireframe
              ? 'bg-cyan-500 text-slate-950 border-cyan-400'
              : 'bg-slate-900/80 text-cyan-400 border-cyan-500/30 hover:border-cyan-400'
          }`}
        >
          {isWireframe ? 'PBR Solid Mode' : 'Wireframe Mode'}
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-10 text-[11px] text-slate-400 font-mono bg-slate-950/80 px-3 py-1.5 rounded-lg border border-white/10">
        🖱️ Drag to rotate 360° • Scroll to zoom
      </div>

      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        
        {/* Lights */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={1} color={product?.color || '#00f2fe'} />
        <pointLight position={[0, 5, 0]} intensity={1.2} color="#ffffff" />

        {/* 3D Product Mesh */}
        <Product3DMesh product={product} isWireframe={isWireframe} />

        {/* Ambient Sparkle Particles */}
        <Sparkles count={40} scale={6} size={2.5} speed={0.4} color={product?.color || '#00f2fe'} />

        {/* Floor Shadow Grid */}
        <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.4} />
        </mesh>

        <OrbitControls enableZoom={true} enablePan={false} autoRotate={autoRotate} autoRotateSpeed={1.5} maxDistance={8} minDistance={2.5} />
      </Canvas>
    </div>
  );
};
