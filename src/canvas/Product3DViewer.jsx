import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { Download, Sparkles as SparklesIcon, Eye, Layers, Palette, Zap } from 'lucide-react';
import { useShop } from '../context/ShopContext';

// 3D Style Presets
export const STYLE_PRESETS = [
  { id: 'cyber', name: 'Cyber Neon', color: '#00f2fe', emissive: '#0066ff', metalness: 0.7, roughness: 0.2, wireframe: false, glass: false },
  { id: 'gold', name: '24K Gold PBR', color: '#ffd700', emissive: '#b8860b', metalness: 0.95, roughness: 0.1, wireframe: false, glass: false },
  { id: 'glass', name: 'Holo Glass', color: '#7f00ff', emissive: '#e100ff', metalness: 0.1, roughness: 0.05, wireframe: false, glass: true },
  { id: 'emerald', name: 'Plasma Emerald', color: '#00f5a0', emissive: '#00d9f5', metalness: 0.6, roughness: 0.3, wireframe: false, glass: false },
  { id: 'blueprint', name: '3D Blueprint', color: '#00f2fe', emissive: '#00f2fe', metalness: 0.1, roughness: 0.8, wireframe: true, glass: false }
];

// Inner 3D Mesh Component with exporter ref handle
const Product3DMesh = ({ product, activeStyle, groupRef }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  const color = activeStyle.color || product?.color || '#00f2fe';
  const emissive = activeStyle.emissive || product?.emissiveColor || '#0066ff';
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
            {[
              [1, 0.3, 1], [-1, 0.3, 1], [1, 0.3, -1], [-1, 0.3, -1]
            ].map((pos, idx) => (
              <mesh key={idx} position={pos}>
                <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
                <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.8} />
              </mesh>
            ))}
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
      <group ref={groupRef}>
        <mesh ref={meshRef} castShadow receiveShadow position={[0, 0, 0]}>
          {renderGeometry()}
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={activeStyle.glass ? 0.8 : 0.4}
            roughness={activeStyle.roughness}
            metalness={activeStyle.metalness}
            wireframe={activeStyle.wireframe}
            transparent={activeStyle.glass}
            opacity={activeStyle.glass ? 0.75 : 1}
          />
        </mesh>

        {/* Dynamic Glowing Halo */}
        <mesh scale={1.28}>
          <torusGeometry args={[1.4, 0.02, 16, 64]} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>
      </group>
    </Float>
  );
};

export const Product3DViewer = ({ product, autoRotate = true }) => {
  const { showToast } = useShop();
  const [activeStyle, setActiveStyle] = useState(STYLE_PRESETS[0]);
  const exportGroupRef = useRef();

  // Three.js GLTF Downloader
  const handleDownload3DModel = () => {
    if (!exportGroupRef.current) return;

    try {
      const exporter = new GLTFExporter();
      exporter.parse(
        exportGroupRef.current,
        (gltf) => {
          const output = JSON.stringify(gltf, null, 2);
          const blob = new Blob([output], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${(product?.name || '3d-model').toLowerCase().replace(/\s+/g, '-')}-${activeStyle.id}.gltf`;
          link.click();
          URL.revokeObjectURL(url);
          showToast('3D Model Exported!', `Downloaded ${product?.name || 'Item'} in ${activeStyle.name} format (.gltf)`, 'emerald');
        },
        (error) => {
          console.error('GLTF Export Error:', error);
          showToast('Export Error', 'Failed to generate 3D GLTF file.', 'rose');
        },
        { binary: false }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 flex flex-col justify-between p-4">
      
      {/* Top Header Bar: Controls & Presets */}
      <div className="z-10 flex flex-wrap items-center justify-between gap-2">
        
        {/* Style Presets Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
          <Palette className="w-4 h-4 text-cyan-400 ml-1 mr-0.5" />
          {STYLE_PRESETS.map(preset => (
            <button
              key={preset.id}
              onClick={() => setActiveStyle(preset)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                activeStyle.id === preset.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* 3D Model Download Button */}
        <button
          onClick={handleDownload3DModel}
          className="btn-primary py-1.5 px-3.5 text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20"
        >
          <Download className="w-3.5 h-3.5" /> Download 3D (.gltf)
        </button>

      </div>

      {/* Center 3D Canvas Viewport */}
      <div className="absolute inset-0">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          
          {/* Lighting Rig */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
          <pointLight position={[-10, -10, -5]} intensity={1.2} color={activeStyle.color} />
          <pointLight position={[0, 5, 0]} intensity={1.5} color="#ffffff" />

          {/* 3D Product Mesh */}
          <Product3DMesh product={product} activeStyle={activeStyle} groupRef={exportGroupRef} />

          {/* Sparkle Particles */}
          <Sparkles count={45} scale={6} size={2.5} speed={0.5} color={activeStyle.color} />

          {/* Floor Shadow */}
          <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={8} blur={1.5} far={4} color={activeStyle.color} />

          <OrbitControls enableZoom={true} enablePan={false} autoRotate={autoRotate} autoRotateSpeed={1.5} maxDistance={8} minDistance={2.5} />
        </Canvas>
      </div>

      {/* Bottom Status Bar */}
      <div className="z-10 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
        <span>🖱️ 360° Drag & Zoom</span>
        <span className="text-cyan-400 font-bold">Active Material: {activeStyle.name}</span>
      </div>

    </div>
  );
};
