import React, { useEffect, useRef } from 'react';
import { ripples } from 'ldrs';

ripples.register();

const RippleEffect = ({ children }) => {
  const rippleContainerRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      const { clientX, clientY } = event;
      const ripple = document.createElement('l-ripples');
      ripple.setAttribute('size', '45');
      ripple.setAttribute('speed', '5');
      ripple.setAttribute('color', '#57ddff');
      ripple.style.position = 'absolute';
      ripple.style.left = `${clientX}px`;
      ripple.style.top = `${clientY + window.scrollY}px`;
      ripple.style.pointerEvents = 'none'; // Allow the ripple to not block events

      if (rippleContainerRef.current) {
        rippleContainerRef.current.appendChild(ripple);
      }
      setTimeout(() => {
        if (rippleContainerRef.current) {
          rippleContainerRef.current.removeChild(ripple);
        }
      }, 3000);
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div ref={rippleContainerRef} className="absolute inset-0 z-50">
      {children}
    </div>
  );
};

export default RippleEffect;
