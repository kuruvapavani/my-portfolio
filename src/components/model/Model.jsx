import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';

function Model() {
  const modelRef = useRef();
  const mixerRef = useRef();

  // Load the model and animations
  const { nodes, animations } = useGLTF('./moana.glb');
  const { actions, mixer } = useAnimations(animations, modelRef);

  // Set up animation mixer
  useEffect(() => {
    mixerRef.current = mixer;

    if (mixer) {
      // Log available actions and clips
      animations.forEach((clip) => {
        console.log('Animation Clip:', clip.name);
        const action = mixer.clipAction(clip);
        console.log('Animation Action:', action);
        action.play(); // Play default animation
      });
    }
  }, [mixer, animations]);

  // Animate on each frame
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <group ref={modelRef} dispose={null}>
      <primitive object={nodes.Scene} />
      {/* Adjust this to include all required parts of the model */}
    </group>
  );
}


export default Model;
