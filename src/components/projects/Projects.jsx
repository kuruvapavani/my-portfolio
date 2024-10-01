import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Layout from "../Layout";
import ProjectCard from "./ProjectCard";
import ImageReveal from "../ImageReveal";

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
  },{
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
  },{
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
  },{
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
  // Add more projects as needed
];

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef(null);

  useEffect(() => {
    const projectsElement = projectsRef.current;

    const mm = gsap.matchMedia();

    // Scroll-triggered animation for laptops and larger screens
    mm.add("(min-width: 1024px)", () => {
      const totalScrollWidth = projectsElement.scrollWidth - 500;
      document.querySelector('.es').style.marginTop = `${totalScrollWidth-2500}px`;
      const projectTween = gsap.to(projectsElement, {
        x: `-${totalScrollWidth}`,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: ".projects-section",
        start: "top 15%",
        pin: true,
        animation: projectTween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });

    // Stack card animation for mobile and tablets
    mm.add("(max-width: 1024px)", () => {
      const items = gsap.utils.toArray(".project-card");
      document.querySelector('.es').style.marginTop = `${projectsElement.scrollWidth+3500}px`;
      items.forEach((item, index) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%", // Trigger animation when the card is scrolled into view
            end: "bottom top", // End when the card leaves the view
            scrub: true,
            markers: false, // Set true if you want to debug
          },
        });

        // Stack animation: adjust scale and opacity based on the scroll
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
