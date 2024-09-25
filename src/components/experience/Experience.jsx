import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExperienceCard from "./ExperienceCard";
import Layout from "../Layout";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Experience data
const experiences = [
  {
    position: "Software Engineer",
    company: "Tech Company A",
    image: "path_to_image1.jpg",
    blogLink: "https://blog1.com",
  },
  {
    position: "Frontend Developer",
    company: "Tech Company B",
    image: "path_to_image2.jpg",
    blogLink: "https://blog2.com",
  },
  {
    position: "Backend Developer",
    company: "Tech Company C",
    image: "path_to_image3.jpg",
    blogLink: "https://blog3.com",
  },
  {
    position: "Software Engineer",
    company: "Tech Company A",
    image: "path_to_image1.jpg",
    blogLink: "https://blog1.com",
  },
  {
    position: "Frontend Developer",
    company: "Tech Company B",
    image: "path_to_image2.jpg",
    blogLink: "https://blog2.com",
  },
  {
    position: "Backend Developer",
    company: "Tech Company C",
    image: "path_to_image3.jpg",
    blogLink: "https://blog3.com",
  },
  {
    position: "Software Engineer",
    company: "Tech Company A",
    image: "path_to_image1.jpg",
    blogLink: "https://blog1.com",
  },
  {
    position: "Frontend Developer",
    company: "Tech Company B",
    image: "path_to_image2.jpg",
    blogLink: "https://blog2.com",
  },
  {
    position: "Backend Developer",
    company: "Tech Company C",
    image: "path_to_image3.jpg",
    blogLink: "https://blog3.com",
  },
  // Add more experiences as needed
];

const ExperienceSection = () => {
  const experienceRef = useRef(null);

  useEffect(() => {
    const experienceElement = experienceRef.current;

    const mm = gsap.matchMedia();

    // Scroll-triggered animation for laptops and larger screens
    mm.add("(min-width: 1024px)", () => {
      const totalScrollWidth = experienceElement.scrollWidth - 500;
      document.querySelector('.ts').style.marginTop = `${experienceElement.scrollWidth-2300}px`;
      const experienceTween = gsap.to(experienceElement, {
        x: `-${totalScrollWidth}`, // Scroll distance based on the total width
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: ".experience-section",
        start: "top 20%", // End based on total scroll width
        pin: true,
        animation: experienceTween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });

    // Stack card animation for mobile and tablets
    mm.add("(max-width: 1024px)", () => {
      const items = gsap.utils.toArray(".experience-card");
      document.querySelector('.ts').style.marginTop = `${experienceElement.scrollWidth+2800}px`;
      items.forEach((item, index) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%", // Trigger animation when card is scrolled into view
            end: "bottom top", // End when the card leaves the view
            scrub: true,
            markers: false, // Set true if you want to debug
          },
        });

        // Stack animation: adjust scale and opacity based on scroll
        tl.fromTo(
          item,
          {
            opacity: 0,
            scale: 0.85,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          }
        );
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });

    // Cleanup on component unmount
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section className="min-h-screen es">
      <div className="flex justify-center items-center">
        <img src="/experience.png" alt="projects" className="heading pt-10 esi" />
      </div>
      <section>
        <Layout>
          <section className="experience-section">
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
