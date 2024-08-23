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
  const [scrollStopped, setScrollStopped] = useState(false);

  // Load the model and animations
  const { nodes, animations } = useGLTF("./model.glb");
  const { actions, mixer } = useAnimations(animations, modelRef);

  // Set up scroll event listener
  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        setScrollStopped(true);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Set up animation mixer and play the appropriate animation
  useEffect(() => {
    mixerRef.current = mixer;

    if (actions) {
      if (isScrolling && actions.swim) {
        actions.float.stop();
        actions.swim.play();
      } else if (!isScrolling && actions.float) {
        // Start float animation on initial load
        actions.swim.stop();
        actions.float.play();
        actions.float.timeScale = 0.5;
      } else if (scrollStopped && actions.swim) {
        setTimeout(() => {
          if (actions.float) {
            actions.swim.stop();
            actions.float.play();
            actions.float.timeScale = 0.5;
          }
          setScrollStopped(false);
        }, 5000); // 2-second delay before switching to the float animation
      }
    }
  }, [actions, isScrolling, scrollStopped]);

  // Use spring for smooth rotation animation
  const { rotationY } = useSpring({
    rotationY: isScrolling ? 3.5 : 0.7,
    config: { mass: 1, tension: 280, friction: 60 },
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
