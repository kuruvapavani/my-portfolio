import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageReveal = ({ src, alt, cls }) => {
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
          start: "top 90%", 
          toggleActions: "play none none reverse", 
        }
      });
    
    return () => {
      if (reveal) reveal.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <img ref={imageRef} src={src} alt={alt} className={`rounded-lg ${cls}`} />
    </div>
  );
};

export default ImageReveal;
