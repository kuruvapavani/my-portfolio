import { Canvas } from '@react-three/fiber';
import React from 'react';
import Model from './Model'; // Adjust path as needed
import { OrbitControls } from '@react-three/drei';

const CanvasContainer = () => {
  return (
    <div className='h-screen'>
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <Model />
      </Canvas>
    </div>
  );
};

export default CanvasContainer;
