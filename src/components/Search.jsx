import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ appDarkMode }) => {
  return (
    <div
      className={`flex w-full h-12 items-center gap-2 px-6 border-b-2 border-slate-100 ${
        appDarkMode ? "dark-mode" : ""
      }`}
    >
      <label htmlFor="search">
        <FaSearch />
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search IPL News..."
        className={`w-96 bg-transparent ${
          appDarkMode ? "text-light" : "dark-bg"
        }`}
      />
    </div>
  );
};

export default Search;
