import React, { useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Projects from './components/projects/Projects';
import Skills from './components/skills/Skills';
import RippleEffect from './components/RippleEffect';
import ExperienceSection from './components/experience/Experience';
import TestimonialCards from './components/testimonial/TestimonialCard';
import ContactMeSection from './components/contact/Contact';
import Footer from './components/footer/Footer';
import Navbar from './components/nav/Nav';

const App = () => {
  useEffect(() => {
    const video = document.getElementById('background-video');
    let isScrolling;

    const handleScroll = () => {
      clearTimeout(isScrolling);
      video.play();
      isScrolling = setTimeout(() => {
        setTimeout(() => {
          video.pause();
        }, 1000);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <RippleEffect>
      <div className="video-container relative w-full h-screen">
        <video
          id="background-video"
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/water.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Wrapping each section in Layout */}
      <>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ExperienceSection />
        <TestimonialCards />
        <ContactMeSection />
        <Footer />
      </>
    </RippleEffect>
  );
};

export default App;
