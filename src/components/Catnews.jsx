import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { useParams, Link, useNavigate } from "react-router-dom";

const Catnews = ({ appDarkMode }) => {
  const { category } = useParams();
  const [newsData, setNewsData] = useState([]);
  const navigate = useNavigate(); // Import useNavigate

  useEffect(() => {
    const fetchNewsData = async () => {
      const newsCollection = collection(db, "Allnews");
      const q = category
        ? query(
            newsCollection,
            where("category", "==", category),
            orderBy("createdAt", "desc")
          )
        : query(newsCollection, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNewsData(data);
    };

    fetchNewsData();
  }, [category]);

  const handleCardClick = (news) => {
    navigate(`/news/${news.category}/${news.id}`, { state: { news } }); // Pass news as state
  };

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ${
        appDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      {newsData.map((news) => (
        <div
          key={news.id}
          className={`bg-white p-4 rounded-lg shadow-md ${
            appDarkMode ? "dark-card" : "light-card"
          }`}
        >
          <Link to={`/news/${news.category}/${news.id}`} className="block">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h2
              className={`text-xl font-bold mb-2 ${
                appDarkMode ? "light-bg" : "text-dark"
              }`}
            >
              {news.title}
            </h2>
            <p
              className={`text-gray-500 text-sm mb-2 ${
                appDarkMode ? "text-light" : "text-dark"
              }`}
            >
              {news.category}
            </p>
            <p
              className={`text-gray-600 text-sm ${
                appDarkMode ? "light-bg" : "light-bg"
              }`}
            >
              {news.createdAt.toDate().toLocaleString()}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Catnews;
