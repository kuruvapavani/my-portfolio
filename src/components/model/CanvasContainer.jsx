import { Canvas } from '@react-three/fiber';
import React from 'react';
import Model from './Model'; // Adjust path as needed
import { Environment, OrbitControls } from '@react-three/drei';

const CanvasContainer = () => {
  return (
    <div className='h-screen'>
      <Canvas>
        {/* <OrbitControls enableZoom={false}/> */}
        <ambientLight intensity={0.5}/>
        <Environment preset='city'/>
        <Model />
      </Canvas>
    </div>
  );
};

export default CanvasContainer;
