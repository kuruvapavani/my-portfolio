import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const TextAnimation = ({ children, bgColor, fgColor }) => {
  const textRef = useRef();

  useEffect(() => {
    const text = new SplitType(textRef.current, { types: 'words' });
  
    // Commenting out the gsap animation to test text rendering behavior
    gsap.fromTo(
      text.words, // Animate words instead of characters
      { color: bgColor },
      {
        color: fgColor,
        duration: 20,
        stagger: 2,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'top 10%',
          scrub: 1,
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
