// App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Search from "./components/Search";
import Newscardmd from "./components/Newscardmd";
import Story from "./pages/Story";
import Wysiwyg from "./pages/Wysiwyg";
import AddNews from "./pages/Addnews";
import Catnews from "./components/Catnews";
import CategoryNewsDetail from "./pages/CategoryNewsDetail";
import "./App.css";

function App() {
  const [appDarkMode, setAppDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleDarkModeToggle = () => {
    setAppDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const metaDescriptionTag = document.querySelector('meta[name="description"]');
  if (metaDescriptionTag) {
    metaDescriptionTag.content =
      "Stay updated with the latest news, scores, and updates from the world of IPL and cricket. The IPL News brings you in-depth coverage and analysis.";
  }

  return (
    <Router>
      <div className={`app-content ${appDarkMode ? "dark-bg" : "light-bg"}`}>
        <Navbar
          onDarkModeToggle={handleDarkModeToggle}
          appDarkMode={appDarkMode}
        />
        <div className="mt-10 p-0">
          <Categories
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
          <Search />
          <br />
          <Routes>
            <Route
              path="/"
              element={<Newscardmd appDarkMode={appDarkMode} />}
            />
            <Route path="/add" element={<Wysiwyg />} />
            <Route
              path="/category/:category"
              element={<Catnews appDarkMode={appDarkMode} />}
            />
            <Route path="/allnews" element={<AddNews />} />
            <Route path="/story/:id" element={<Story />} />
            <Route
              path="/news/:category/:id"
              element={<CategoryNewsDetail appDarkMode={appDarkMode} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
