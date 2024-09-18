import React from 'react';
import CanvasContainer from './model/CanvasContainer'; // Import the model component

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Left: Model */}
      <div className="w-1/2 fixed left-7 top-0 h-screen">
        <CanvasContainer /> {/* Model goes here */}
      </div>
      {/* Right: Content */}
      <div className="w-1/2 ml-auto p-8">
        {children} {/* Render the content passed to the layout */}
      </div>
    </div>
  );
};

export default Layout;
