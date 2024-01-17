import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const Newscardmd = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const newsCollection = collection(db, "Quickbytes");
        const snapshot = await getDocs(newsCollection);
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
  }, []); // Empty dependency array to run the effect only once

  const isSmallScreen = window.innerWidth <= 768; // Adjust the breakpoint as needed
  const displayedNews = isSmallScreen
    ? newsData.slice(0, 3)
    : newsData.slice(0, 5);

  const justifyContentStyle = isSmallScreen ? "center" : "normal";

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or other loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-3">
      <h1 className="sm:text-2xl text-3xl pb-1 ">
        Quick Bytes From <span style={{ color: "#026985" }}>IPL</span> :
      </h1>
      <div
        className="flex flex-col items-center gap-2 sm:flex-row"
        style={{ justifyContent: justifyContentStyle }}
      >
        {displayedNews.map((news) => (
          <Link
            key={news.id}
            to={`/story/${news.id}`}
            className="text-decoration-none"
          >
            <div className="flex flex-col shadow-md scale-90 cursor-pointer hover:scale-100 transition-all duration-300 shadow-slate-400 w-56 h-80 rounded-lg overflow-hidden">
              <img
                src={news.imageUrl || "https://placehold.it/1280x720"}
                alt={news.title}
                className="w-full h-2/3 object-cover p-2"
              />

              <div className="bottom w-full h-1/3 p-2">
                <h2 className="text-2xl leading-none">{news.title}</h2>
                <p className="mt-2 text-lg">{news.shortDescription}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Newscardmd;
