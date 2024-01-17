import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Search from "./components/Search";
import Newscardmd from "./components/Newscardmd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Story from "./pages/Story";
import Wysiwyg from "./pages/Wysiwyg";

function App() {
  const [appDarkMode, setAppDarkMode] = useState(false);

  const handleDarkModeToggle = (isDarkMode) => {
    setAppDarkMode(isDarkMode);
  };

  return (
    <Router>
      <>
        <Navbar onDarkModeToggle={handleDarkModeToggle} />
        <div
          className={`app-content ${
            appDarkMode ? "dark-bg" : "light-bg"
          } mt-16 p-0`}
        >
          <Categories />
          <Search />
          <br />
          <Routes>
            <Route path="/" element={<Newscardmd />} />
            <Route path="/add" element={<Wysiwyg />} />
            <Route path="/story/:id" element={<Story />} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
