import React, { useEffect, useState } from 'react';
import CanvasContainer from './model/CanvasContainer'; // Import the model component

const Layout = ({ children }) => {
  const [isLaptop, setIsLaptop] = useState(window.innerWidth >= 1024); // Check if the screen is laptop or larger

  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 1024); // Update based on window size
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Conditionally render the model on larger screens */}
      {isLaptop && (
        <div className="w-1/2 fixed left-7 top-0 h-screen">
          <CanvasContainer /> {/* Model goes here */}
        </div>
      )}
      {/* Content area: Adjust width based on model's visibility */}
      <div className={`p-8 ${isLaptop ? 'w-1/2 ml-auto' : 'w-full'}`}>
        {children} {/* Render the content passed to the layout */}
      </div>
    </div>
  );
};

export default Layout;
