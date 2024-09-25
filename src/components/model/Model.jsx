import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

function Model() {
  const modelRef = useRef();
  const mixerRef = useRef();
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollStopped, setScrollStopped] = useState(false);
  const [modelPosition, setModelPosition] = useState([-11.5, -5, -5]);
  const [modelRotation, setModelRotation] = useState([-0.2, 0.7, 0.2]);
  const [modelScale, setModelScale] = useState(1.8);
  const [isLaptop, setIsLaptop] = useState(window.innerWidth >= 1024); // Check if the screen is laptop or larger

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
        actions.swim.timeScale = 0.5;
      } else if (!isScrolling && actions.float) {
        actions.swim.stop();
        actions.float.play();
        actions.float.timeScale = 0.3;
      } else if (scrollStopped && actions.swim) {
        setTimeout(() => {
          if (actions.float) {
            actions.swim.stop();
            actions.float.play();
            actions.float.timeScale = 0.5;
          }
          setScrollStopped(false);
        }, 2000); // 2-second delay before switching to the float animation
      }
    }
  }, [actions, isScrolling, scrollStopped]);

  // Use spring for smooth rotation animation
  const { rotationY, rotationX } = useSpring({
    rotationY: isScrolling ? 3.2 : 0.7,
    rotationX: isScrolling ? 0.7 : -0.2,
    config: { mass: 1, tension: 100, friction: 30 },
  });

  // Update model position, rotation, and scale based on screen size
  useEffect(() => {
    const updateTransform = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        // Mobile view
        setModelPosition([-0.5, -8.2, -2.0]);
        setModelRotation([-2.2, 2, 0.2]);
        setModelScale(1);
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        // Tablet view
        setModelPosition([-2, -2.0, -6.0]);
        setModelRotation([-0.2, 0.7, 0.3]);
        setModelScale(1.5);
      } else {
        // Laptop/Desktop view
        setModelPosition([-2, -5, -5]);
        setModelRotation([-0.2, 0.7, 0.2]);
        setModelScale(1.8);
      }
    };

    updateTransform();

    // Check if the screen size is laptop or larger
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 1024); // Only show model on laptop or larger screens
      updateTransform();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Animate on each frame
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  // Conditionally render the model only on laptop or larger screens
  return isLaptop ? (
    <animated.group
      ref={modelRef}
      dispose={null}
      position={modelPosition}
      rotation-x={rotationX}
      rotation-y={rotationY}
      rotation-z={modelRotation[2]}
      scale={modelScale}
    >
      <primitive object={nodes.Scene} />
    </animated.group>
  ) : null;
}

useGLTF.preload("./model.glb");
export default Model;
