import React from 'react';
import Layout from '../Layout';
import TextAnimation from '../TextAnimation'; // Adjust the path as necessary
import ImageReveal from '../ImageReveal';

const About = () => {
  return (
    <section className='min-h-screen'>
      <div className="flex justify-center items-center">
        {/* <TextAnimation bgColor="#000" fgColor="#fff">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
        </TextAnimation> */}
        <ImageReveal src='/about.png' alt='about' className='ams heading'/>
      </div>
      <Layout>
        {/* Right: About Me Content (Top and Centered Horizontally) */}
        <div className="text-white flex flex-col items-center justify-start pt-0">
          <TextAnimation bgColor="#000" fgColor="#fff">
            <p className="text-lg md:text-xl leading-relaxed mb-4 text-center">
              Welcome to my underwater realm! I’m Kuruva Pavani, a passionate web  developer and designer.<br />
              My journey in web development began as a personal adventure, fueled by curiosity and the desire to create. What started as a hobby has evolved into a career where I craft beautiful, functional websites. I believe design is about creating experiences that resonate with users, blending code and creativity to bring my ideas to life. Beyond coding, I’m a music lover. You’ll often find me humming my favorite tunes, which inspire my creativity and add rhythm to my work. Let’s dive into innovation together and look for the heart of Te Fiti—connect with me!
            </p>
          </TextAnimation>
        </div>
      </Layout>
    </section>
  );
};

export default About;
