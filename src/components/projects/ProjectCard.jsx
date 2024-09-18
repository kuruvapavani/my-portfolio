import React from "react";

const ProjectCard = ({ image, title, stack, demoLink, codeLink }) => {
  return (
    <div className="project-card glass-effect">
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
