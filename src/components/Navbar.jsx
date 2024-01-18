import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = ({ onDarkModeToggle }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    onDarkModeToggle(!darkMode);
  };

  return (
    <>
      <div
        className={`nav w-full h-16 border-b-2 fixed top-0 flex items-center justify-between px-6 py-5 z-50 ${
          darkMode ? "dark-bg" : "light-bg"
        }`}
      >
        <div className="l">
          <IoMdMenu className="w-8 h-8 cursor-pointer" />
        </div>
        <div className="m">
          <Link to="/">
            <h1
              className={`text-4xl text-center ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              The{" "}
              <span
                className={`text-customDecoration ${
                  darkMode ? "dark-text" : "light-text"
                }`}
              >
                IPL
              </span>{" "}
              News
            </h1>
          </Link>
        </div>
        <div className="r flex gap-3 items-center">
          <button
            className={`px-10 lg:px-7 py-2 lg:py-3 rounded-full sm:block hidden ${
              darkMode ? "bg-slate-800" : "bg-slate-900"
            } ${darkMode ? "text-white" : "text-white"}`}
          >
            Subscribe
          </button>
          {darkMode ? (
            <MdLightMode
              className="w-8 h-8 cursor-pointer"
              onClick={toggleDarkMode}
            />
          ) : (
            <MdDarkMode
              className="w-8 h-8 cursor-pointer"
              onClick={toggleDarkMode}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
