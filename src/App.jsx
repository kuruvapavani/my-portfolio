import React, { useEffect } from 'react';
import CanvasContainer from "./components/model/CanvasContainer";
const App = () => {
  useEffect(() => {
    const video = document.getElementById('background-video');

    let isScrolling;

    const handleScroll = () => {
      clearTimeout(isScrolling);
      video.play();
      isScrolling = setTimeout(() => {
        video.pause();
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="h-screen w-full fixed top-0">
        <CanvasContainer />
      </div>
      <div className="video-container relative w-full h-screen overflow-hidden">
        <video
          id="background-video"
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/water.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="h-screen ">Section 1</div>
      <div className="h-screen">Section 2</div>
      <div className="h-screen">Section 3</div>
      <div className="h-screen ">Section 1</div>
      <div className="h-screen">Section 2</div>
      <div className="h-screen">Section 3</div><div className="h-screen ">Section 1</div>
      <div className="h-screen">Section 2</div>
      <div className="h-screen">Section 3</div><div className="h-screen ">Section 1</div>
      <div className="h-screen">Section 2</div>
      <div className="h-screen">Section 3</div><div className="h-screen ">Section 1</div>
      <div className="h-screen">Section 2</div>
      <div className="h-screen">Section 3</div>
    </div>
  );
};

export default App;
