// Categories.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const Categories = ({ selectedCategory, onCategoryClick }) => {
  const categories = ["Cricket", "ipl2024", "stats", "Domestic"];
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    onCategoryClick(category);
    navigate(`/category/${category}`); // Navigate to category-specific page
  };

  return (
    <div className="w-full h-10 border-b-2 border-white">
      <ul className="w-full cat flex gap-10 sm:gap-14 justify-center font-bold  m-0 sm:text-xl text-lg">
        {categories.map((category) => (
          <li
            style={{ cursor: "pointer" }}
            key={category}
            className={selectedCategory === category ? "selected" : ""}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
