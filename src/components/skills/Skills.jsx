import React from "react";
import Layout from "../Layout";
import ImageReveal from "../ImageReveal";


const SkillsSection = (data) => {
const skills = [...(data.data)];


  
  return (
    <section className="min-h-screen" id="skills">
      <div className="flex justify-center items-center">
        <ImageReveal src="/skills.png" alt="skills" cls={"ssi"} />
      </div>
      <Layout>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 z-1000">
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
