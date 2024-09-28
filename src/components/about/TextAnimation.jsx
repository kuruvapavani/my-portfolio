import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextAnimation = ({ children }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;

    // Split text into spans while preserving spaces
    const letters = textElement.innerText.split("").map(char => {
      return char === " " ? "&nbsp;" : char;
    });
    
    textElement.innerHTML = letters.map(char => `<span>${char}</span>`).join("");

    // GSAP Scroll-triggered animation
    gsap.fromTo(
      textElement.querySelectorAll("span"),
      { opacity: 0, y: 50 }, // Initial state: transparent and below
      {
        opacity: 1,
        y: 0,
        stagger: 0.05, // Delay between each letter's animation
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: textElement,
          start: "top 80%", // Starts when the element is 80% visible
          toggleActions: "play none none reverse", // Play on scroll down, reverse on scroll up
        },
      }
    );
  }, []);

  return (
    <div className="text-animation-wrapper">
      <h2 ref={textRef} className="animated-text">{children}</h2>
    </div>
  );
};

export default TextAnimation;
