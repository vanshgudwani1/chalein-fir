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
          <fog attach="fog" args={['#bae6fd', 10, 40]} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#fef08a" />
          
          <Sky 
            distance={450000} 
            sunPosition={[0, 1, 0]} 
            inclination={0} 
            azimuth={0.25} 
          />
          
          <Cloud 
            opacity={0.4}
            speed={0.4} 
            width={20} 
            depth={2} 
            segments={20} 
            position={[0, -5, -15]}
          />
          
          {/* Distant floating shapes */}
          {Array.from({ length: 20 }).map((_, i) => (
            <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={2} position={[
              (Math.random() - 0.5) * 50, 
              (Math.random() - 0.5) * 50, 
              (Math.random() - 0.5) * 20 - 20
            ]}>
              <mesh scale={Math.random() * 0.8 + 0.2}>
                {i % 3 === 0 ? <torusGeometry args={[1, 0.3, 16, 32]} /> : <icosahedronGeometry args={[1, 0]} />}
                <meshStandardMaterial 
                  color={i % 2 === 0 ? "#f472b6" : "#2dd4bf"} 
                  transparent 
                  opacity={0.4} 
                />
              </mesh>
            </Float>
          ))}
          <Environment preset="dawn" />
        </Canvas>
      </div>

      {/* Foreground Interactive Layer (In Front of Text) */}
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }} transparent>
          <ambientLight intensity={1.2} />
          <pointLight position={[0, 5, 0]} intensity={2} color="#d946ef" />
          
          {/* The Paper Plane with Smoke Trail */}
          <PaperPlane3D />
          
          <Environment preset="dawn" />
        </Canvas>
      </div>
    </>
  );
}
