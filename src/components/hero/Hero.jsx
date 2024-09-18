import React from 'react';
import Nav from '../nav/Nav';
import Layout from '../Layout';

const Hero = () => {
  return (
    <Layout>
    <div className="text-white p-2 space-y-2 flex flex-col justify-center items-center h-full">
        <h1 className="text-l md:text-6xl font-bold font-exo">
          Welcome to My World Beneath the Waves
        </h1>
        <p className="text-sm md:text-2xl font-exo">
          Scroll down slowly to dive deeper into my world.
        </p>
        <div className="text-sm md:text-xl max-w-2xl leading-relaxed font-exo">
          <p>
            Hi, I'm <strong>Kuruva Pavani</strong>, a passionate <strong>Web Developer</strong> and <strong>MERN Stack Developer</strong>, currently expanding my expertise by learning <strong>Full Stack with Java</strong>.
          </p>
          <p>
            Just like the ocean, my journey in development is deep and ever-expanding. As you explore, you'll discover my skills, projects, and passion for code. The deeper you go, the more there is to uncover.
          </p>
        </div>
      </div>
      </Layout>
  );
};

export default Hero;
