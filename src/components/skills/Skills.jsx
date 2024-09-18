import React from "react";
import Layout from "../Layout";

const skills = [
  { src: "/html.png", alt: "HTML Skill", name: "HTML" },
  { src: "/css.png", alt: "CSS Skill", name: "CSS" },
  { src: "/javascript.png", alt: "JavaScript Skill", name: "JavaScript" },
  { src: "/react.png", alt: "React Skill", name: "React" },
  { src: "/bootstrap-framework.png", alt: "Bootstrap Framework Skill", name: "Bootstrap" },
  { src: "/tailwind.png", alt: "Tailwind CSS Skill", name: "Tailwind CSS" },
  { src: "/git.png", alt: "Git Skill", name: "Git" },
  { src: "/github.png", alt: "GitHub Skill", name: "GitHub" },
  { src: "/nodejs.png", alt: "Node.js Skill", name: "Node.js" },
  { src: "/sql.png", alt: "SQL Skill", name: "SQL" },
  { src: "/mongo-db.png", alt: "MongoDB Skill", name: "MongoDB" },
  { src: "/canva.png", alt: "Canva Skill", name: "Canva" },
  { src: "/figma.png", alt: "Figma Skill", name: "Figma" },
  { src: "/word-press.png", alt: "WordPress Skill", name: "WordPress" },
  { src: "/c-plus-plus.png", alt: "C++ Skill", name: "C++" },
  { src: "/java.png", alt: "Java Skill", name: "Java" },
  { src: "/amazon-web-services.png", alt: "AWS Skill", name: "AWS" },
];

const SkillsSection = () => {
  return (
    <section className="h-screen">
      <div className="flex justify-center items-center">
        <img src="/skills.png" alt="skills" className="heading" />
      </div>
      <Layout>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 z-1000">
          {skills.map((skill, index) => (
            <div className="relative group" key={index}>
              <div className="bubble mx-auto transition-transform duration-300 ease-in-out transform group-hover:scale-110">
                <img
                  src={skill.src}
                  alt={skill.alt}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center text-white text-lg bg-blue-600 rounded-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100">
                  {skill.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </section>
  );
};

export default SkillsSection;
