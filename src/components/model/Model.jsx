import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { Leva, useControls } from "leva";

function Model() {
  const modelRef = useRef();
  const mixerRef = useRef();
  const { position, rotation } = useControls({
    position: {
      value: { x: 3, y: -3, z: -5 },
      step: 1,
    },
    rotation: {
      value: { x: 0, y: 0.2, z: 0.3 },
      step: 0.1,
    },
  });
  const [isScrolling, setIsScrolling] = useState(false);
  const [swimStarted, setSwimStarted] = useState(false);

  // Load the model and animations
  const { nodes, animations } = useGLTF("./model.glb");
  const { actions, mixer } = useAnimations(animations, modelRef);
  console.log(animations);

  // Set up scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(handleScroll.timeout);
      handleScroll.timeout = setTimeout(() => setIsScrolling(false), 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set up animation mixer and play the appropriate animation
  useEffect(() => {
    mixerRef.current = mixer;

    if (actions) {
      if (isScrolling && actions.swim) {
        actions.float.stop();
        actions.swim.play();
        setSwimStarted(true); // Track that the swim animation has started
      } else if (actions.float) {
        actions.swim.stop();
        actions.float.play();
        actions.float.timeScale = 0.5;
        setSwimStarted(false); // Reset the swimStarted flag
      }
    }
  }, [actions, isScrolling]);

  // Use spring for smooth rotation animation
  const { rotationY } = useSpring({
    rotationY: swimStarted ? 3.5 : 0.7, // Target rotation based on swimStarted
    config: { mass: 1, tension: 280, friction: 60 }, // Adjust these values to control the smoothness
  });

  // Animate on each frame
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <animated.group
      ref={modelRef}
      dispose={null}
      position={[-10, -5, -5]}
      rotation-x={-0.2}
      rotation-y={rotationY}
      rotation-z={0.2}
      scale={2}
    >
      <primitive object={nodes.Scene} />
    </animated.group>
  );
}
useGLTF.preload('./model.glb');
export default Model;
