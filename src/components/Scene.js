"use client";
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Cloud, Sky } from '@react-three/drei';
import PaperPlane3D from './PaperPlane3D';
import styles from './Scene.module.css';

export default function Scene() {
  return (
    <>
      {/* Background Atmosphere Layer (Behind Text) */}
      <div className={styles.backgroundLayer}>
        <Canvas camera={{ position: [0, 2, 15], fov: 45 }}>
          {/* Much clearer fog - only far distance */}
          <fog attach="fog" args={['#bae6fd', 25, 60]} />
          
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
          
          <Sky 
            distance={450000} 
            sunPosition={[0, 1, 0]} 
            inclination={0} 
            azimuth={0.25} 
          />
          
          {/* Subtle clouds for depth without muddiness */}
          <Cloud 
            opacity={0.15}
            speed={0.2} 
            width={10} 
            depth={1} 
            segments={10} 
            position={[0, -5, -20]}
          />
          
          {/* Very sharp distant shapes with higher opacity/vibrancy */}
          {Array.from({ length: 15 }).map((_, i) => (
            <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={1.5} position={[
              (Math.random() - 0.5) * 40, 
              (Math.random() - 0.5) * 40, 
              (Math.random() - 0.5) * 15 - 25
            ]}>
              <mesh scale={Math.random() * 0.8 + 0.3}>
                {i % 3 === 0 ? <torusGeometry args={[1, 0.2, 16, 32]} /> : <icosahedronGeometry args={[1, 0]} />}
                <meshStandardMaterial 
                  color={i % 2 === 0 ? "#ec4899" : "#06b6d4"} 
                  transparent 
                  opacity={0.6} 
                  roughness={0}
                  metalness={0.5}
                />
              </mesh>
            </Float>
          ))}
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Foreground Interactive Layer (In Front of Text) */}
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }} transparent>
          {/* Brighter foreground lighting */}
          <ambientLight intensity={1.5} />
          <pointLight position={[0, 10, 0]} intensity={3} color="#ffffff" />
          
          {/* The Paper Plane with Smoke Trail */}
          <PaperPlane3D />
          
          <Environment preset="city" />
        </Canvas>
      </div>
    </>
  );
}
