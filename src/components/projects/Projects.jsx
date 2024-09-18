import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Layout from "../Layout";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    image: "https://kuruvapavani.github.io/my_portfolio/static/media/drumKit.cd922a312e4fab846ecd.png",
    title: "Project One",
    stack: "HTML, CSS, JavaScript",
    demoLink: "https://example.com/demo1",
    codeLink: "https://github.com/yourusername/project1",
  },
  {
    image: "/project2.png",
    title: "Project Two",
    stack: "React, Node.js, MongoDB",
    demoLink: "https://example.com/demo2",
    codeLink: "https://github.com/yourusername/project2",
  },
  {
    image: "/project1.png",
    title: "Project One",
    stack: "HTML, CSS, JavaScript",
    demoLink: "https://example.com/demo1",
    codeLink: "https://github.com/yourusername/project1",
  },
  {
    image: "/project2.png",
    title: "Project Two",
    stack: "React, Node.js, MongoDB",
    demoLink: "https://example.com/demo2",
    codeLink: "https://github.com/yourusername/project2",
  },
  // Add more projects as needed
];

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef(null);

  useEffect(() => {
    const projectsElement = projectsRef.current;

    // Calculate the horizontal scroll amount based on screen size
    const getScrollAmount = () => {
      if (window.innerWidth <= 768) {
        return -(projectsElement.scrollWidth - window.innerWidth + 10); // For mobiles
      } else {
        return -(projectsElement.scrollWidth - window.innerWidth + 10000); // For desktops
      }
    };

    const tween = gsap.to(projectsElement, {
      x: getScrollAmount(),
      duration: 3,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: projectsElement,
      start: "top 20%", // Start when the top of the element hits 20% of the viewport height
      end: () => `+=${getScrollAmount() * -1}`, // End when the total scroll amount has been reached
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
      markers: false,
      onLeave: () => {
        document.querySelector('.rest-section').style.display = 'block'; // Handle display after scrolling
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="h-screen">
      <div className="flex justify-center items-center">
        <img src="/projects.png" alt="projects" className="heading pt-10" />
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
              />
            ))}
          </div>
        </section>
      </Layout>
    </section>
  );
};

export default Projects;
