import React, { useEffect } from "react";
import logo from "./logo.svg";

const Nav = () => {
  useEffect(() => {
    const btn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");

    function navToggle() {
      console.log('Menu button clicked');
      btn.classList.toggle("open");
      menu.classList.toggle("flex");
      menu.classList.toggle("hidden");
    }

    btn.addEventListener("click", navToggle);

    return () => {
      btn.removeEventListener("click", navToggle);
    };
  }, []);
  return (
    <nav className="flex items-center justify-between font-bold text-white mt-0 sticky top-0 mx-5">
      <img src={logo} alt="Logo" className="h-14 md:h-24" />
      <div id="menu" className="hidden flex-col h-10 font-alata md:flex md:flex-row md:space-x-8">
        {["About", "Careers", "Events", "Products", "Support"].map((item) => (
          <div className="group" key={item}>
            <a href="#">{item}</a>
            <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
          </div>
        ))}
      </div>
      <div className="md:hidden">
        <button
          id="menu-btn"
          type="button"
          className="z-50 block hamburger md:hidden focus:outline-none"
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
