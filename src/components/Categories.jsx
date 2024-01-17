import React from "react";
import "../App.css";

const Categories = () => {
  return (
    <div className="w-full h-10 border-b-2 border-white ">
      <ul className=" w-full cat flex gap-10 sm:gap-14 justify-center font-bold font-sans m-0 sm:text-lg  text-xs ">
        <li>MATCHES</li>
        <li>STATS</li>
        <li>AUCTION</li>
        <li>POINTS TABLE</li>
      </ul>
    </div>
  );
};

export default Categories;
