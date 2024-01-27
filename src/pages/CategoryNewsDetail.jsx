import React, { useState, useEffect } from "react";
import { doc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs, } from "firebase/firestore";
import { db } from "../config/firebase";
import { useParams } from "react-router-dom";

const CategoryNewsDetail = () => {
  const { id } = useParams();
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [nextStories, setNextStories] = useState([]);

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
          const newsCollection = collection(db, "Allnews");
          const nextStoriesQuery = query(
            newsCollection,
            orderBy("createdAt", "desc"),
            limit(5)
          );
          const nextStoriesSnapshot = await getDocs(nextStoriesQuery);
          const nextStoriesData = nextStoriesSnapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
          }));

          const filteredNextStories = nextStoriesData.filter(
            (story) => story.id !== id
          );
          setNextStories(filteredNextStories);
        } else {
          console.log("No such document!");
        }

          // Set title directly from data
          document.title = data.title || "Default Title";

    const twitterImage = data.imageUrl;
    const existingTwitterImage = document.querySelector('meta[name="twitter:image"]');

    if (existingTwitterImage) {
      existingTwitterImage.setAttribute('content', twitterImage);
    } else {
      const newTwitterImage = document.createElement('meta');
      newTwitterImage.setAttribute('name', 'twitter:image');
      newTwitterImage.setAttribute('content', twitterImage);
      document.head.appendChild(newTwitterImage);
    }

          
          const ogImage = data.imageUrl;
          const existingOGImage = document.querySelector(
            'meta[property="og:image"]'
          );

          if (existingOGImage) {
            existingOGImage.setAttribute("content", ogImage);
          } else {
            const newOGImage = document.createElement("meta");
            newOGImage.setAttribute("property", "og:image");
            newOGImage.setAttribute("content", ogImage);
            document.head.appendChild(newOGImage);
          }
          
          // Set meta description directly from data
          const metaDescriptionTag = document.querySelector(
            'meta[name="description"]'
          );
          if (metaDescriptionTag) {
            metaDescriptionTag.content =
              data.metaDescription || "Some news about the cricket incident, you should read and know about!";
          }

          setNewsData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching news data: ", error);
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
            className="texthtm"
            dangerouslySetInnerHTML={{ __html: newsData.content }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default CategoryNewsDetail;
