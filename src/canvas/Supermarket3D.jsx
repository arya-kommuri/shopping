import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Sparkles, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { useSound } from '../context/SoundContext';

// Smooth Camera Rig Controller
const CameraRig = ({ selectedCategory }) => {
  const controlsRef = useRef();
  const { playTeleport } = useSound();

  useEffect(() => {
    if (selectedCategory && controlsRef.current) {
      playTeleport();
      const cat = CATEGORIES.find(c => c.id === selectedCategory);
      if (cat) {
        const { x, y, z } = cat.coordinates;
        const target = cat.cameraTarget;

        // Smooth camera movement target
        controlsRef.current.target.set(target.x, target.y, target.z);
        controlsRef.current.object.position.set(x, y + 4, z + 12);
        controlsRef.current.update();
      }
    }
  }, [selectedCategory]);

  return <OrbitControls ref={controlsRef} enablePan={true} maxPolarAngle={Math.PI / 2 - 0.05} minDistance={4} maxDistance={35} />;
};

// Department Aisle 3D Component
const Aisle3D = ({ category, onCategoryClick, onProductClick }) => {
  const { x, y, z } = category.coordinates;
  const aisleProducts = PRODUCTS.filter(p => p.category === category.id).slice(0, 3);
  const [hovered, setHovered] = useState(false);

  return (
    <group position={[x, 0, z]}>
      {/* Shelf Base Structure */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 2.4, 1.2]} />
        <meshStandardMaterial color="#121526" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Glowing Neon Shelf Trim */}
      <mesh position={[0, 2.4, 0.6]}>
        <boxGeometry args={[6.1, 0.1, 0.1]} />
        <meshStandardMaterial color={category.color} emissive={category.color} emissiveIntensity={1} />
      </mesh>

      {/* Floating 3D Department Neon Signboard */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <group 
          position={[0, 4.2, 0]}
          onClick={() => onCategoryClick(category.id)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <mesh castShadow>
            <boxGeometry args={[4.8, 1.2, 0.4]} />
            <meshStandardMaterial 
              color={hovered ? '#00f2fe' : '#1a1e36'} 
              emissive={category.color} 
              emissiveIntensity={hovered ? 0.8 : 0.3} 
              roughness={0.2}
            />
          </mesh>
          <Text
            position={[0, 0, 0.25]}
            fontSize={0.45}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/outfit/v11/QOUfd5YoRz-35-L1vTyj.woff"
          >
            {category.name.toUpperCase()}
          </Text>
        </group>
      </Float>

      {/* 3D Products Displayed on Shelves */}
      {aisleProducts.map((product, idx) => {
        const posX = (idx - 1) * 1.8;
        return (
          <group 
            key={product.id} 
            position={[posX, 1.8, 0.3]}
            onClick={(e) => { e.stopPropagation(); onProductClick(product); }}
          >
            <Float speed={3} rotationIntensity={0.2} floatIntensity={0.4}>
              <mesh castShadow>
                <boxGeometry args={[0.7, 0.9, 0.4]} />
                <meshStandardMaterial 
                  color={product.color} 
                  emissive={product.emissiveColor} 
                  emissiveIntensity={0.5} 
                  roughness={0.3} 
                  metalness={0.7}
                />
              </mesh>
            </Float>
          </group>
        );
      })}
    </group>
  );
};

export const Supermarket3D = ({ selectedCategory, onSelectCategory }) => {
  const { setQuickViewProduct } = useShop();

  return (
    <div className="w-full h-full relative bg-slate-950 border border-cyan-500/30 rounded-2xl overflow-hidden">
      
      {/* Overlay Instructions */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="badge badge-cyan text-xs font-mono">
          Virtual Supermarket 3D Floor
        </span>
      </div>

      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 18, 28]} fov={50} />

        {/* Lighting Setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[20, 30, 20]} intensity={1.5} castShadow />
        <pointLight position={[0, 15, 0]} intensity={2} color="#00f2fe" />
        <pointLight position={[-15, 10, -10]} intensity={1.5} color="#7f00ff" />
        <pointLight position={[15, 10, 10]} intensity={1.5} color="#00f5a0" />

        {/* Glossy Floor Grid */}
        <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[70, 70]} />
          <meshStandardMaterial color="#0a0c16" roughness={0.15} metalness={0.9} />
        </mesh>

        {/* Floor Grid Lines */}
        <gridHelper args={[70, 35, '#00f2fe', 'rgba(255,255,255,0.08)']} position={[0, 0.01, 0]} />

        {/* 8 Department Aisles */}
        {CATEGORIES.map(category => (
          <Aisle3D
            key={category.id}
            category={category}
            onCategoryClick={(id) => onSelectCategory(id)}
            onProductClick={(prod) => setQuickViewProduct(prod)}
          />
        ))}

        {/* Ambient Sparkles */}
        <Sparkles count={80} scale={40} size={3} speed={0.5} color="#00f2fe" />

        <CameraRig selectedCategory={selectedCategory} />
      </Canvas>
    </div>
  );
};
