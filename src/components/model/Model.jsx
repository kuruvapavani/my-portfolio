import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { Leva, useControls } from "leva";

function Model() {
  const modelRef = useRef();
  const mixerRef = useRef();
  const desktopControls = useControls("Desktop", {
    position: { value: { x: -10, y: -5, z: -5 }, step: 0.1 },
    rotation: { value: { x: -0.2, y: 0.7, z: 0.2 }, step: 0.1 },
    scale: { value: 2, min: 0.5, max: 3, step: 0.1 },
  });

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollStopped, setScrollStopped] = useState(false);
  const [modelPosition, setModelPosition] = useState(desktopControls.position);
  const [modelRotation, setModelRotation] = useState(desktopControls.rotation);
  const [modelScale, setModelScale] = useState(desktopControls.scale);

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
        }, 2000); // 2-second delay before switching to the float animation
      }
    }
  }, [actions, isScrolling, scrollStopped]);

  // Use spring for smooth rotation animation
  const { rotationY ,rotationX} = useSpring({
    rotationY: isScrolling ? 3.2 : 0.7,
    rotationX: isScrolling ? 0.7 : -0.2,
    config: { mass: 1, tension: 280, friction: 60 },
  });

  // Update model position, rotation, and scale based on screen size
  useEffect(() => {
    const updateTransform = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        // Mobile view
        setModelPosition([-2.5, -2.0, -3.0]);
        setModelRotation([-0.2, 0.7, 0.2]);
        setModelScale(0.7);
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        // Tablet view
        setModelPosition([-3.5, -2.0, -6.0]);
        setModelRotation([-0.2, 0.7, 0.3]);
        setModelScale(1);
      } else {
        // Desktop view
        setModelPosition([-11.5,-5,-5]);
        setModelRotation([-0.2,0.7,0.2]);
        setModelScale(2);
      }
    };

    updateTransform();

    window.addEventListener("resize", updateTransform);
    return () => {
      window.removeEventListener("resize", updateTransform);
    };
  }, [desktopControls]);

  // Animate on each frame
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <>
      <animated.group
        ref={modelRef}
        dispose={null}
        position={modelPosition}
        rotation-x={rotationX}
        rotation-y={rotationY} // Y-axis rotation is still animated
        rotation-z={modelRotation[2]}
        scale={modelScale}
      >
        <primitive object={nodes.Scene} />
      </animated.group>
    </>
  );
}

useGLTF.preload("./model.glb");
export default Model;
