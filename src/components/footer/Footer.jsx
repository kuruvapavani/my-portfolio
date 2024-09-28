import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'; // Importing icons
import { faCode } from '@fortawesome/free-solid-svg-icons'; // For Leetcode
import { gsap } from 'gsap';

const Footer = () => {
  const bubblesRef = useRef([]);

  useEffect(() => {
    // GSAP animation
    gsap.fromTo(bubblesRef.current, 
      { y: 0 }, 
      { 
        y: -15, 
        repeat: -1, 
        yoyo: true, 
        duration: 2, 
        stagger: 0.2 
      });
  }, []);

  return (
    <footer className="text-white p-6">
      <div className="flex justify-center items-center space-x-4">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noreferrer" 
          ref={el => (bubblesRef.current[0] = el)} 
          className="bubble1 transition-transform duration-300 hover:scale-110"
        >
          <FontAwesomeIcon icon={faGithub} className="text-3xl" />
        </a>
        <a 
          href="https://leetcode.com" 
          target="_blank" 
          rel="noreferrer" 
          ref={el => (bubblesRef.current[1] = el)} 
          className="bubble1 transition-transform duration-300 hover:scale-110"
        >
          <FontAwesomeIcon icon={faCode} className="text-3xl" />
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noreferrer" 
          ref={el => (bubblesRef.current[2] = el)} 
          className="bubble1 transition-transform duration-300 hover:scale-110"
        >
          <FontAwesomeIcon icon={faTwitter} className="text-3xl" />
        </a>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noreferrer" 
          ref={el => (bubblesRef.current[3] = el)} 
          className="bubble1 transition-transform duration-300 hover:scale-110"
        >
          <FontAwesomeIcon icon={faLinkedin} className="text-3xl" />
        </a>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noreferrer" 
          ref={el => (bubblesRef.current[4] = el)} 
          className="bubble1 transition-transform duration-300 hover:scale-110"
        >
          <FontAwesomeIcon icon={faInstagram} className="text-3xl" />
        </a>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm opacity-75">© {new Date().getFullYear()} Kuruva Pavani. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
