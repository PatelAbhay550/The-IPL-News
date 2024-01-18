import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useParams } from "react-router-dom";

const CategoryNewsDetail = () => {
  const { id } = useParams();
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const newsDocRef = doc(db, "Allnews", id);
        const newsDoc = await getDoc(newsDocRef);

        if (newsDoc.exists()) {
          const data = {
            id: newsDoc.id,
            ...newsDoc.data(),
          };

          // Set title directly from data
          document.title = data.title || "Default Title";

          // Set meta description directly from data
          const metaDescriptionTag = document.querySelector(
            'meta[name="description"]'
          );
          if (metaDescriptionTag) {
            metaDescriptionTag.content =
              data.shortDescription || "Default meta description";
          }

          setNewsData(data);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching news data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold mb-4">{newsData.title}</h1>
          <img
            src={newsData.imageUrl}
            className="w-full object-top object-cover h-64 mb-4 rounded-lg"
            alt={newsData.title}
          />
          <p className="text-lg mb-4">{newsData.shortDescription}</p>
          <div className="flex items-center justify-between border-b-2 border-slate-400 text-gray-600 mb-4">
            <p>By: {newsData.authorName}</p>
            <p className="text-sm">
              {newsData.createdAt.toDate().toLocaleString()}
            </p>
          </div>
          <div
            className="texthtml"
            dangerouslySetInnerHTML={{ __html: newsData.content }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default CategoryNewsDetail;
