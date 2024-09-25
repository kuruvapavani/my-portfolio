import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ExperienceCard from './ExperienceCard';
import Layout from '../Layout';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Experience data
const experiences = [
  {
    position: 'Software Engineer',
    company: 'Tech Company A',
    image: 'path_to_image1.jpg',
    blogLink: 'https://blog1.com',
  },
  {
    position: 'Frontend Developer',
    company: 'Tech Company B',
    image: 'path_to_image2.jpg',
    blogLink: 'https://blog2.com',
  },
  {
    position: 'Backend Developer',
    company: 'Tech Company C',
    image: 'path_to_image3.jpg',
    blogLink: 'https://blog3.com',
  },
  // Add more experiences as needed
];

const ExperienceSection = () => {
  const experienceRef = useRef(null);
  const [totalWidth, setTotalWidth] = useState(0); // State to store total width of all cards

  useEffect(() => {
    const experienceElement = experienceRef.current;

    const totalScrollWidth = experienceElement.scrollWidth - 500;

    setTotalWidth(totalScrollWidth);

    const tween = gsap.to(experienceElement, {
      x: `-${totalScrollWidth}`, // Scroll distance based on card width
      duration: 3,
      ease: 'none',
    });

    ScrollTrigger.create({
      trigger: '.experience-section',
      start: 'top top', // End based on total scroll width
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="h-screen es">
      <div className="flex justify-center items-center">
        <img src="/projects.png" alt="projects" className="heading pt-10" />
      </div>
      <section>
      <Layout>
      <section className="experience-section es">
      {/* <h2>My Experience</h2> */}
      <div className="experience-wrapper" ref={experienceRef}>
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={index}
            position={experience.position}
            company={experience.company}
            image={experience.image}
            blogLink={experience.blogLink}
          />
        ))}
      </div>
    </section>
      </Layout>
    </section>
    </section>
  );
};

export default ExperienceSection;
