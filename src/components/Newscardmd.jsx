// Newscardmd.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";

const Newscardmd = ({ appDarkMode }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const newsCollection = collection(db, "Quickbytes");
        const q = query(newsCollection, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNewsData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news data: ", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNewsData();
    document.title = "The IPL News - Your Source for IPL and Cricket News";
  }, []);

  if (loading) {
    return <div>The IPL News - All news related to cricket and IPL</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`p-3 ${appDarkMode ? "dark-mode" : "light-mode"}`}>
      <h1
        className={`sm:text-2xl text-3xl pb-1 ${
          appDarkMode ? "text-light" : "text-dark"
        }`}
      >
        Quick Bytes From <span style={{ color: "#026985" }}>IPL</span> :
      </h1>
      <div className="flex flex-col items-center gap-2 sm:flex-row justify-center">
        {newsData.map((news) => (
          <Link
            key={news.id}
            to={`/story/${news.id}`}
            className="text-decoration-none"
          >
            <div
              className={`flex flex-col shadow-md scale-90 cursor-pointer hover:scale-100 transition-all duration-300 ${
                appDarkMode
                  ? "shadow-slate-400 dark-card"
                  : "shadow-md light-card"
              } w-56 h-80 rounded-lg overflow-hidden`}
            >
              <img
                src={news.imageUrl || "https://placehold.it/1280x720"}
                alt={news.title}
                className="w-full h-2/3 object-cover p-2"
              />

              <div className="bottom w-full h-1/3 p-2">
                <h2
                  className={`text-2xl leading-none ${
                    appDarkMode ? "text-light" : "text-dark"
                  }`}
                >
                  {news.title}
                </h2>
                <p
                  className={`mt-2 text-lg ${
                    appDarkMode ? "text-light" : "text-dark"
                  }`}
                >
                  {news.shortDescription}
                </p>
                <p
                  className={`text-sm ${
                    appDarkMode ? "light-mode" : "text-dark"
                  }`}
                >{`By ${news.authorName} | ${new Date(
                  news.createdAt.seconds * 1000
                ).toLocaleString()}`}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Newscardmd;
