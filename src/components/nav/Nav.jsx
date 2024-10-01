import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      // Animate the menu up from bottom and links fade in
      gsap.to(menuRef.current, {
        duration: 0.5,
        y: 0,
        opacity: 1,
        ease: 'power2.out',
      });

      gsap.fromTo(
        linksRef.current.children,
        { y: 20, opacity: 0 },
        {
          duration: 0.5,
          y: 0,
          opacity: 1,
          stagger: 0.1, // Stagger the appearance of each link
          ease: 'power2.out',
        }
      );
    } else {
      // Animate the menu down to the bottom and links fade out
      gsap.to(menuRef.current, {
        duration: 0.5,
        y: '100%', // Slide out of view
        opacity: 0,
        ease: 'power2.in',
      });

      gsap.to(linksRef.current.children, {
        duration: 0.5,
        y: 20,
        opacity: 0,
        stagger: 0.1, // Stagger the disappearance of each link
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 text-white">
      <div className="flex justify-between items-center p-4 bg-glass">
        {/* Logo on the left side */}
        <a href="#" className="text-3xl font-bold text-white">
          My Portfolio
        </a>

        {/* Hamburger menu button */}
        <button
          onClick={toggleMenu}
          className={`menu-button flex flex-col space-y-1 items-center justify-center relative z-20 transition-all duration-500 ${
            isOpen ? 'open' : ''
          }`}
          aria-expanded={isOpen}
          aria-controls="menu"
          aria-label="Menu button"
        >
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </button>
      </div>

      {/* Full-screen glass background for the menu (sliding from bottom) */}
      <div
        ref={menuRef}
        className={`site-nav__menu fixed bottom-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-glass backdrop-blur-lg transition-all transform ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <ul ref={linksRef} className="text-center">
          <li className="py-4 text-2xl text-white hover:text-blue-300" onClick={closeMenu}>
            <a href="#home">Home</a>
          </li>
          <li className="py-4 text-2xl text-white hover:text-blue-300" onClick={closeMenu}>
            <a href="#about">About</a>
          </li>
          <li className="py-4 text-2xl text-white hover:text-blue-300" onClick={closeMenu}>
            <a href="#skills">Skills</a>
          </li>
          <li className="py-4 text-2xl text-white hover:text-blue-300" onClick={closeMenu}>
            <a href="#projects">Projects</a>
          </li>
          <li className="py-4 text-2xl text-white hover:text-blue-300" onClick={closeMenu}>
            <a href="#experience">Experience</a>
          </li>
          <li className="py-4 text-2xl text-white hover:text-blue-300" onClick={closeMenu}>
            <a href="#testimonials">Testimonials</a>
          </li>
          <li className="py-4 text-2xl text-white hover:text-blue-300" onClick={closeMenu}>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
