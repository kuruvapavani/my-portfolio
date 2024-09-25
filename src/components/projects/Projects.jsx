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
  
    const totalScrollWidth = projectsElement.scrollWidth - 500;
  
    const projectTween = gsap.to(projectsElement, {
      x: `-${totalScrollWidth}`,
      ease: 'none',
    });
    document.querySelector('.es').style.marginTop = `${totalScrollWidth-300}px`;
    ScrollTrigger.create({
      trigger: '.projects-section',
      start: 'top top',
      pin: true,
      animation: projectTween,
      scrub: 1,
      invalidateOnRefresh: true,
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
          <div className="projects-grid" ref={projectsRef} >
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