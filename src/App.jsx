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
  const metaDescriptionTag = document.querySelector('meta[name="description"]');
  if (metaDescriptionTag) {
    metaDescriptionTag.content =
      "Stay updated with the latest news, scores, and updates from the world of IPL and cricket. The IPL News brings you in-depth coverage and analysis.";
  }

  return (
    <Router>
      <>
        <Navbar onDarkModeToggle={handleDarkModeToggle} />
        <div
          className={`app-content ${
            appDarkMode ? "dark-bg" : "light-bg"
          } mt-10 p-0`}
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
