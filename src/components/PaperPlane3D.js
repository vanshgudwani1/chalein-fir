"use client";
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function PaperPlane3D() {
  const planeRef = useRef();

  // Create a programmatic 3D paper plane (Two-tone like the image)
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      // Left wing (Top) - White/Light
      0, 0, 2,       // Nose
      -1.5, 0.2, -1.5, // Left tip
      0, 0.2, -1.5,    // Center top

      // Right wing (Top) - Red/Magenta
      0, 0, 2,       // Nose
      0, 0.2, -1.5,    // Center top
      1.5, 0.2, -1.5,  // Right tip

      // Left wing (Bottom)
      0, 0, 2,       // Nose
      0, -0.5, -1.5,   // Keel
      -1.5, 0.2, -1.5, // Left tip

      // Right wing (Bottom)
      0, 0, 2,       // Nose
      1.5, 0.2, -1.5,  // Right tip
      0, -0.5, -1.5,   // Keel
      
      // Back fold left
      -1.5, 0.2, -1.5,
      0, -0.5, -1.5,
      0, 0.2, -1.5,

      // Back fold right
      1.5, 0.2, -1.5,
      0, 0.2, -1.5,
      0, -0.5, -1.5,
    ]);

    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.computeVertexNormals();

    geo.addGroup(0, 3, 0); // Left top
    geo.addGroup(3, 3, 1); // Right top
    geo.addGroup(6, 3, 0); // Left bottom
    geo.addGroup(9, 3, 1); // Right bottom
    geo.addGroup(12, 3, 0); // Left back
    geo.addGroup(15, 3, 1); // Right back

    return geo;
  }, []);

  useFrame((state) => {
    if (!planeRef.current) return;

    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

    const time = state.clock.getElapsedTime();
    const floatY = Math.sin(time * 2) * 0.2;
    const floatX = Math.cos(time * 1.5) * 0.1;

    const targetX = Math.sin(progress * Math.PI * 6) * 5; 
    const targetY = (Math.cos(progress * Math.PI * 8) * 1.5) + floatY;
    const targetZ = Math.sin(progress * Math.PI * 4) * 3;

    const deltaX = Math.cos(progress * Math.PI * 6) * 6; 
    const targetBank = deltaX * -0.4; 
    const targetYaw = deltaX * -0.15;
    const deltaY = -Math.sin(progress * Math.PI * 8) * 4;
    const targetPitch = (deltaY * 0.2) + (Math.sin(time * 3) * 0.05);

    planeRef.current.position.x = THREE.MathUtils.lerp(planeRef.current.position.x, targetX + floatX, 0.08);
    planeRef.current.position.y = THREE.MathUtils.lerp(planeRef.current.position.y, targetY, 0.08);
    planeRef.current.position.z = THREE.MathUtils.lerp(planeRef.current.position.z, targetZ, 0.08);
    
    planeRef.current.rotation.z = THREE.MathUtils.lerp(planeRef.current.rotation.z, targetBank, 0.08);
    planeRef.current.rotation.y = THREE.MathUtils.lerp(planeRef.current.rotation.y, targetYaw, 0.08);
    planeRef.current.rotation.x = THREE.MathUtils.lerp(planeRef.current.rotation.x, targetPitch, 0.08); 
  });

  return (
    <Trail
      width={1.5}
      length={10}
      color={'#ffffff'}
      attenuation={(t) => t * t}
    >
      <mesh ref={planeRef} geometry={geometry} scale={0.6} rotation={[0.2, 0, 0]}>
        <meshStandardMaterial attach="material-0" color="#ffffff" roughness={0.2} metalness={0.1} side={THREE.DoubleSide} />
        <meshStandardMaterial attach="material-1" color="#d946ef" roughness={0.2} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
    </Trail>
  );
}
