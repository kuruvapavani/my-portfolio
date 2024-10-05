import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Layout from '../Layout';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ data }) => {
  const headingRef = useRef(null);
  const subTextRef = useRef(null);
  const mainTextRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 150, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 90%',
          end: 'top 30%',
          scrub: true, // smooth parallax scrolling
        },
      }
    );

    gsap.fromTo(
      subTextRef.current,
      { y: 150, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: subTextRef.current,
          start: 'top 85%',
          end: 'top 30%',
          scrub: true, // smooth parallax scrolling
        },
      }
    );

    gsap.fromTo(
      mainTextRef.current,
      { y: 150, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mainTextRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <Layout>
      <div className="text-white p-4 flex flex-col justify-center items-center min-h-screen" id='home'>
        {/* Heading */}
        <h1 
          ref={headingRef} 
          className="text-4xl md:text-7xl font-bold w-full text-center leading-tight tracking-tight"
        >
          {data[0].headingText}
        </h1>

        {/* Subtext */}
        <p 
          ref={subTextRef} 
          className="text-sm w-full md:text-xl max-w-2xl  font-exo mt-4 text-center max-w-3xl leading-snug tracking-wide"
        >
          {data[0].subText}
        </p>

        {/* Main text */}
        <div 
          ref={mainTextRef} 
          className="text-base md:text-2xl leading-relaxed font-exo mt-6 text-center tracking-wide"
        >
          {data[0].mainText}
        </div>
      </div>
    </Layout>
  );
};

export default Hero;
