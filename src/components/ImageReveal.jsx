import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ImageReveal = ({ src, alt }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const reveal = gsap.fromTo(imageRef.current, 
      { scale: 0, opacity: 0 }, 
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 90%", // Adjust this value based on when you want the animation to trigger
          toggleActions: "play none none reverse", // Play on scroll down, reverse on scroll up
        }
      });
    
    return () => {
      // Clean up the animation instance on unmount
      if (reveal) reveal.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <img ref={imageRef} src={src} alt={alt} className="rounded-lg w-full h-auto" />
    </div>
  );
};

export default ImageReveal;
