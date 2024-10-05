import React from "react";
import Layout from "../Layout";
import TextAnimation from "../TextAnimation"; // Adjust the path as necessary
import ImageReveal from "../ImageReveal";

const About = (data) => {
  return (
    <section className="min-h-screen abs" id="about">
      <div className="flex justify-center items-center">
        {/* <TextAnimation bgColor="#000" fgColor="#fff">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
        </TextAnimation> */}
        <ImageReveal src="/about.png" alt="about" cls={"ams"} />
      </div>
      <Layout>
        {/* Right: About Me Content (Top and Centered Horizontally) */}
        <div className="text-white flex flex-col items-center justify-start pt-0">
          <TextAnimation bgColor="#000" fgColor="#fff">
            <p
              className="text-base md:text-2xl leading-relaxed mb-4 text-center zz"
              style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
            >
              {data.data[0].headingText1}
              <br />
              {data.data[0].mainText1}
            </p>
          </TextAnimation>
        </div>
      </Layout>
    </section>
  );
};

export default About;
