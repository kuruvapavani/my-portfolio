import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Layout from "../Layout";
import ProjectCard from "./ProjectCard";
import ImageReveal from "../ImageReveal";

gsap.registerPlugin(ScrollTrigger);

const Projects = (data) => {
  const projectsRef = useRef(null);
  const projects = [...(data.data)];

  useEffect(() => {
    const projectsElement = projectsRef.current;
    const mm = gsap.matchMedia();

    // Function to update margin dynamically based on screen size
    const updateMargin = (marginValue) => {
      document.querySelector('.es').style.marginTop = `${marginValue}px`;
    };

    // Scroll-triggered animation for laptops and larger screens
    mm.add("(min-width: 1024px)", () => {
      const totalScrollWidth = projectsElement.scrollWidth - 500;

      const projectTween = gsap.to(projectsElement, {
        x: `-${totalScrollWidth}`,
        ease: "none",
        onComplete: () => updateMargin(projectsElement.scrollWidth - (300 * projects.length) + 10), // Ensure margin updates after animation completes
      });

      ScrollTrigger.create({
        trigger: ".projects-section",
        start: "top 15%",
        pin: true,
        animation: projectTween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      // Initial margin update for desktop
      updateMargin(projectsElement.scrollWidth - (300 * projects.length) + 100);

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });

    // Stack card animation for tablets
    mm.add("(max-width: 1024px) and (min-width: 768px)", () => {
      const items = gsap.utils.toArray(".project-card");
      const marginTop = projectsElement.scrollWidth + 3500;
      updateMargin(marginTop); // Apply margin for tablets

      items.forEach((item) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom top",
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

    // Animation and margin for mobile screens (max-width: 768px)
    mm.add("(max-width: 768px)", () => {
      const items = gsap.utils.toArray(".project-card");
      const mobileMarginTop = projectsElement.scrollWidth + 2500;
      updateMargin(mobileMarginTop); // Apply margin for mobile devices

      items.forEach((item) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom top",
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

    return () => {
      mm.revert();
    };
  }, [projects.length]);

  return (
    <section className="min-h-screen" id="projects">
      <div className="flex justify-center items-center">
        <ImageReveal src="/projects.png" alt="projects" cls={"psi pt-10"} />
      </div>
      <Layout>
        <section className="projects-section">
          <div className="projects-grid" ref={projectsRef}>
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                image={project.image}
                title={project.title}
                stack={project.stack}
                demoLink={project.demoLink}
                codeLink={project.codeLink}
                className="project-card" // Add class for stack animation
              />
            ))}
          </div>
        </section>
      </Layout>
    </section>
  );
};

export default Projects;
