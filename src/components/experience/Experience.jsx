import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExperienceCard from "./ExperienceCard";
import Layout from "../Layout";
import ImageReveal from "../ImageReveal";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = (data) => {
  const experienceRef = useRef(null);
  const experiences = [...(data.data)];

  useEffect(() => {
    const experienceElement = experienceRef.current;
    const mm = gsap.matchMedia();

    const updateMargin = () => {
      const experienceHeight = experienceElement.getBoundingClientRect().height;
      const totalScrollWidth = experienceElement.scrollWidth - 500;
      const dynamicMargin = totalScrollWidth - experienceHeight;
      document.querySelector('.ts').style.marginTop = `${experienceElement.scrollWidth - (200 * experiences.length) + 400}px`;
    };

    // Scroll-triggered animation for laptops and larger screens
    mm.add("(min-width: 1024px)", () => {
      
      const dynamicMargin = experienceElement.scrollWidth + 2800;
      document.querySelector('.ts').style.marginTop = `${dynamicMargin}px`;
      const totalScrollWidth = experienceElement.scrollWidth - 500;
      const experienceTween = gsap.to(experienceElement, {
        x: `-${totalScrollWidth}`, // Scroll distance based on the total width
        ease: "none",
        onComplete: updateMargin, // Update margin after animation completes
      });

      ScrollTrigger.create({
        trigger: ".experience-section",
        start: "top 20%",
        pin: true,
        animation: experienceTween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      updateMargin(); // Initial margin update

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });

    // Stack card animation for tablets
    mm.add("(max-width: 1024px)", () => {
      const items = gsap.utils.toArray(".experience-card");
      document.querySelector('.ts').style.marginTop = `200px`;

      items.forEach((item) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%", // Trigger animation when card is scrolled into view
            end: "bottom top", // End when the card leaves the view
            scrub: true,
          },
        });

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

    // Add margin only for mobile views
    mm.add("(max-width: 768px)", () => {
      document.querySelector('.ts').style.marginTop = '600px'; // Adjust margin-top specifically for mobile views
    });

    // Cleanup on component unmount
    return () => {
      mm.revert();
    };
  }, [experiences.length]);

  return (
    <section className="min-h-screen es" id="experience">
      <div className="flex justify-center items-center">
        <ImageReveal src="/experience.png" alt="projects" cls={"esi pt-10"} />
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
