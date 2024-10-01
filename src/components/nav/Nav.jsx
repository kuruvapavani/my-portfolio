import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Logo from './logo.svg';

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
      // Prevent scrolling when the menu is open
      document.body.style.overflow = 'hidden';

      // Animate menu
      gsap.to(menuRef.current, {
        duration: 0.6,
        y: 0,
        opacity: 1,
        ease: 'power3.out',
      });

      gsap.fromTo(
        linksRef.current.children,
        { y: 40, opacity: 0 },
        {
          duration: 0.8,
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    } else {
      // Re-enable scrolling when the menu is closed
      document.body.style.overflow = 'auto';

      // Animate closing of menu
      gsap.to(menuRef.current, {
        duration: 0.6,
        y: '100%',
        opacity: 0,
        ease: 'power3.in',
      });

      gsap.to(linksRef.current.children, {
        duration: 0.5,
        y: 40,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.in',
      });
    }

    // Clean up by enabling scroll when component is unmounted
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 left-0 w-full text-white nav ${isOpen ? 'z-50' : ''}`}>
      <div className="flex justify-between items-center p-4 bg-glass">
        {/* Logo on the left side */}
        <a href="#">
          <img src={Logo} alt="logo" className="logo" />
        </a>

        {/* Hamburger menu button */}
        <button
          onClick={toggleMenu}
          className={`menu-button flex flex-col justify-center items-center relative z-20 ${isOpen ? 'open' : ''}`}
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
        className={`site-nav__menu fixed bottom-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-glass backdrop-blur-lg transform transition-opacity transition-transform duration-700 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
      >
        <ul ref={linksRef} className="text-center">
          <li className="py-4 text-2xl text-white hover:text-blue-400" onClick={closeMenu}>
            <a href="#home">Home</a>
          </li>
          <li className="py-4 text-2xl text-white hover:text-blue-400" onClick={closeMenu}>
            <a href="#about">About</a>
          </li>
          <li className="py-4 text-2xl text-white hover:text-blue-400" onClick={closeMenu}>
            <a href="#skills">Skills</a>
          </li>
          <li className="py-4 text-2xl text-white hover:text-blue-400" onClick={closeMenu}>
            <a href="#projects">Projects</a>
          </li>
          <li className="py-4 text-2xl text-white hover:text-blue-400" onClick={closeMenu}>
            <a href="#experience">Experience</a>
          </li>
          <li className="py-4 text-2xl text-white hover:text-blue-400" onClick={closeMenu}>
            <a href="#testimonials">Testimonials</a>
          </li>
          <li className="py-4 text-2xl text-white hover:text-blue-400" onClick={closeMenu}>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
