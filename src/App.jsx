import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Projects from "./components/projects/Projects";
import Skills from "./components/skills/Skills";
import RippleEffect from "./components/RippleEffect";
import ExperienceSection from "./components/experience/Experience";
import TestimonialCards from "./components/testimonial/TestimonialCard";
import ContactMeSection from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Loading from "./components/loading/Loading";
import axios from "axios";
import Nav from "./components/nav/Nav";
const App = () => {
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(null); // State to store the fetched data

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get-portfolio-data");
      setPortfolioData(response.data); // Store the fetched data in the state
    } catch (error) {
      console.log(error);
      setLoading(false); // Even on error, we stop showing the loading component
    }
  }
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const video = document.getElementById("background-video");
    let isScrolling;

    const handleScroll = () => {
      clearTimeout(isScrolling);
      video.play();
      isScrolling = setTimeout(() => {
        setTimeout(() => {
          video.pause();
        }, 1000);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);

    // Simulate loading
    const loadData = () => {
      // Simulate a data fetch with a timeout
      setTimeout(() => {
        setLoading(false); // Set loading to false after data is loaded
      }, 3000); // Adjust time as needed
    };

    loadData();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <RippleEffect>
      <div className="video-container relative w-full h-screen">
        <video
          id="background-video"
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/water.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Conditional rendering based on loading state */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <Nav data={portfolioData.intro}/>
          <About data={portfolioData.about} />
          <Skills data={portfolioData.skills} />
          <Projects data={portfolioData.projects} />
          <ExperienceSection data={portfolioData.experience} />
          <TestimonialCards data={portfolioData.testimonials} />
          <ContactMeSection data={portfolioData.contact} />
          <Footer />
        </>
      )}
    </RippleEffect>
  );
};

export default App;
