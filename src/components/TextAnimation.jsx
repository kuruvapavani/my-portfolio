import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const TextAnimation = ({ children, bgColor, fgColor }) => {
  const textRef = useRef();

  useEffect(() => {
    const text = new SplitType(textRef.current, { types: 'chars' });

    gsap.fromTo(
      text.chars,
      { color: bgColor },
      {
        color: fgColor,
        duration: 20, // Longer duration to make the animation slower
        stagger: 2,   // More delay between character animations
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%', // Start the animation earlier
          end: 'top 10%',   // End the animation later for a longer scroll range
          scrub: 1,         // Scrub the animation slowly with the scroll
          toggleActions: 'play play reverse reverse',
        },
      }
    );
    

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [bgColor, fgColor]);

  return (
    <span ref={textRef} className="reveal-type">
      {children}
    </span>
  );
};

export default TextAnimation;
