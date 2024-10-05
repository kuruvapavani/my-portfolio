import React, { useState, useEffect } from "react";
import gsap from "gsap";
import Logo from "./logo.svg";
import Hero from "../hero/Hero";

const Nav = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getVpdr = () => {
    const vph = Math.pow(document.documentElement.offsetHeight, 2);
    const vpw = Math.pow(document.documentElement.offsetWidth, 2);
    const vpd = Math.sqrt(vph + vpw);
    const circleWidth = document.getElementById("bg-circle").clientWidth;
    return (vpd * 2) / circleWidth;
  };

  const openNavbar = () => {
    const openTimeline = gsap.timeline();
    openTimeline.to(".navbar", 0, { display: "flex" });
    openTimeline.to("#bg-circle", 0.5, { // Reduce the time from 1.5s to 0.5s
      scale: getVpdr(),
      ease: "expo.inOut",
    });
    openTimeline.fromTo(
      ".navbar ul li",
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, delay: 0.3 } // Reduced stagger and delay
    );
  };
  
  const closeNavbar = () => {
    const closeTimeline = gsap.timeline();
    closeTimeline.to(".navbar ul li", {
      y: 25,
      opacity: 0,
      stagger: -0.05, // Reduced stagger
      delay: 0.1, // Reduced delay
    });
    closeTimeline.to("#bg-circle", 0.5, { // Reduce time from 1s to 0.5s
      scale: 0,
      ease: "expo.inOut",
      delay: -0.2, // Reduced negative delay for faster transitions
    });
    closeTimeline.to(".navbar", 0, { display: "none" });

  };
  

  const toggleNavbar = () => {
    if (isOpen) {
      closeNavbar();
    } else {
      openNavbar();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        gsap.to("#bg-circle", 1, {
          scale: getVpdr(),
          ease: "expo.inOut",
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <div id="wrapper">
      {/* Logo added at the top-left */}
      <img className="logo" src={Logo} />

      <button className={`navbar-toggle ${isOpen ? "active" : ""}`} id="toggle" type="button" onClick={toggleNavbar}>
        <svg viewBox="0 0 100 100" width="80">
          <path className="line top" d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
          <path className="line middle" d="m 30,50 h 40" />
          <path className="line bottom" d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
        </svg>
      </button>

      <div className={`navbar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a data-text="1" href="#">Home</a></li>
          <li><a data-text="2" href="#">Our Team</a></li>
          <li><a data-text="3" href="#">Projects</a></li>
          <li><a data-text="4" href="#">Contact</a></li>
        </ul>
      </div>

      <div id="bg-circle"></div>

      {/* Hero Section comes right after the navbar */}
      <section className="hero-section">
      <Hero  data={data}/>
      </section>
    </div>
  );
};

export default Nav;
