import React from "react";
import logo from "./logo.svg"
const Nav = () => {
  return (
    <nav className="sticky top-0 z-10 bg-blue bg-opacity-30 ">
      <div className="max-w-screen  px-1">
        <div className="flex items-center justify-between h-16 px-12">
          <span className=""><img src={logo} className="h-28 mt-10"/></span>
          <div className="flex space-x-10 text-white mt-10">
            <a href="#">Dashboard</a>
            <a href="#">About</a>
            <a href="#">Projects</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
