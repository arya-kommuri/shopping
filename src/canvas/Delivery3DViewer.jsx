import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, PerspectiveCamera, OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const DroneMesh = () => {
  const droneRef = useRef();
  const rotor1 = useRef();
  const rotor2 = useRef();
  const rotor3 = useRef();
  const rotor4 = useRef();

  useFrame((state, delta) => {
    // Fast rotor spinning animation
    if (rotor1.current) rotor1.current.rotation.y += delta * 25;
    if (rotor2.current) rotor2.current.rotation.y += delta * 25;
    if (rotor3.current) rotor3.current.rotation.y += delta * 25;
    if (rotor4.current) rotor4.current.rotation.y += delta * 25;
  });

  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={droneRef}>
        
        {/* Main Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 0.4, 1.4]} />
          <meshStandardMaterial color="#0e1222" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Central Glowing Core */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
          <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={1} />
        </mesh>

        {/* 4 Quadcopter Arms */}
        {[-1.2, 1.2].map((x, i) => (
          [-1.2, 1.2].map((z, j) => (
            <group key={`arm-${i}-${j}`} position={[x, 0, z]}>
              {/* Arm Rod */}
              <mesh position={[-x * 0.4, 0, -z * 0.4]}>
                <boxGeometry args={[0.2, 0.15, 0.2]} />
                <meshStandardMaterial color="#1a1e36" />
              </mesh>

              {/* Motor Base */}
              <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
                <meshStandardMaterial color="#00f5a0" emissive="#00f5a0" emissiveIntensity={0.6} />
              </mesh>

              {/* Spinning Propeller Rotor */}
              <mesh 
                ref={i === 0 && j === 0 ? rotor1 : i === 0 && j === 1 ? rotor2 : i === 1 && j === 0 ? rotor3 : rotor4}
                position={[0, 0.25, 0]}
              >
                <boxGeometry args={[1.4, 0.04, 0.15]} />
                <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={0.9} />
              </mesh>
            </group>
          ))
        ))}

        {/* Attached Cargo Parcel Box */}
        <mesh position={[0, -0.8, 0]}>
          <boxGeometry args={[1.1, 0.9, 1.1]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={0.4} roughness={0.2} />
        </mesh>

        {/* Laser Downward Beacon Beam */}
        <mesh position={[0, -2.2, 0]}>
          <cylinderGeometry args={[0.05, 0.6, 2, 16, 1, true]} />
          <meshBasicMaterial color="#00f2fe" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>

      </group>
    </Float>
  );
};

export const Delivery3DViewer = () => {
  return (
    <div className="w-full h-full min-h-[300px] relative rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/30">
      
      {/* Radar Overlay Header */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="badge badge-emerald text-xs font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          Autonomous Drone Telemetry Live
        </span>
      </div>

      <div className="absolute bottom-4 left-4 z-10 text-[11px] font-mono text-cyan-300 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-cyan-500/30">
        🛸 Target Coordinates Lock: Sector 9 • Altitude 120m • Speed 45 km/h
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1, 6]} fov={50} />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00f2fe" />
        <pointLight position={[-10, -5, -10]} intensity={1.5} color="#ff007f" />
        
        <DroneMesh />

        <Sparkles count={50} scale={6} size={3} speed={0.8} color="#00f2fe" />

        {/* Radar Ring Floor */}
        <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.5, 3.5, 32]} />
          <meshBasicMaterial color="#00f2fe" wireframe transparent opacity={0.25} />
        </mesh>

        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
};
