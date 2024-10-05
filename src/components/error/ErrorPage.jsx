// src/NotFound.jsx
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const NotFound = () => {
  useEffect(() => {
    // GSAP Animation for the not-found section
    gsap.fromTo('.not-found', { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 });

    // Bubble Generation
    const createBubble = () => {
      const bubble5 = document.createElement('div');
      bubble5.classList.add('bubble5');
      const size = Math.random() * 50 + 10; // Bubble size between 10px and 60px
      bubble5.style.width = `${size}px`;
      bubble5.style.height = `${size}px`;
      bubble5.style.left = `${Math.random() * 100}vw`;
      bubble5.style.bottom = '0'; // Start from the bottom
      bubble5.style.animationDuration = `${Math.random() * 4 + 4}s`; // Random duration between 4s and 8s
      document.querySelector('.bubbles').appendChild(bubble5);

      // Remove bubble after animation completes
      setTimeout(() => {
        bubble5.remove();
      }, 8000); // Match this with the longest animation duration
    };

    // Create bubbles every 300ms
    const bubbleInterval = setInterval(createBubble, 300);

    // Cleanup function
    return () => {
      clearInterval(bubbleInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white relative overflow-hidden">
      <div className="bubbles absolute top-0 left-0 w-full h-full pointer-events-none"></div>
      <div className="not-found relative z-10">
        <h1 className="text-6xl font-bold mb-4 animate-bounce">404</h1>
        <h2 className="text-2xl mb-8">Looks like you are lost in the ocean...</h2>
        <a href="/">
          <button
            id="back-home"
            className="mt-8 px-6 py-2 bg-blue-700 hover:bg-white text-white hover:text-blue-700 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Back to Home
          </button>
        </a>
      </div>

      <style jsx>{`
        body {
          background: linear-gradient(to bottom, #002b5c, #006994, #009dd9);
        }

        .bubble5 {
          position: absolute;
          border-radius: 50%;
          opacity: 0.5;
          background: rgba(255, 255, 255, 0.2);
          animation: float1 8s infinite ease-in-out;
        }

        @keyframes float1 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100vh);
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
