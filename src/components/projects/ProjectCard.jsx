import React from "react";
const ProjectCard = ({ image, title, stack, demoLink, codeLink }) => {
  return (
    <div className="project-card z-index-10000 bg-white/30 backdrop-blur-md shadow-lg rounded-lg p-6 m-4 max-w-sm mx-auto transition-transform transform hover:scale-105">
      <img src={image} alt={title} className="project-image" />
      <div className="project-info">
        <h3 className="project-title">{title}</h3>
        <p className="project-stack">{stack}</p>
        <div className="project-links">
          <a href={demoLink} target="_blank" rel="noopener noreferrer" className="link">
            Live Demo
          </a>
          <a href={codeLink} target="_blank" rel="noopener noreferrer" className="link">
            Code on GitHub
          </a>
        </div>
      </div>
      
    </div>
  );
};

export default ProjectCard;
