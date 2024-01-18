import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db, timestampToDateString } from "../config/firebase";
import { data } from "autoprefixer";

const Story = ({ appDarkMode }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [time, setTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [nextStories, setNextStories] = useState([]);

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const newsDocument = doc(db, "Quickbytes", id);
        const snapshot = await getDoc(newsDocument);

        if (snapshot.exists()) {
          const data = snapshot.data();

          setTitle(data.title || "");
          setAuthorName(data.authorName || "");
          setImageUrl(data.imageUrl || "");
          setShortDescription(data.shortDescription || "");
          setContent(data.content || "");
          setTime(timestampToDateString(data.createdAt));
          document.title = data.title || "Default Title";

          // Set meta description directly from data
          const metaDescriptionTag = document.querySelector(
            'meta[name="description"]'
          );
          if (metaDescriptionTag) {
            metaDescriptionTag.content =
              data.shortDescription ||
              "Stay updated with the latest news, scores, and updates from the world of IPL and cricket. The IPL News brings you in-depth coverage and analysis";
          }

          const newsCollection = collection(db, "Quickbytes");
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
      } catch (error) {
        console.error("Error fetching story data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, [id, appDarkMode]); // Include appDarkMode as a dependency

  return (
    <div className={`container mx-auto p-4 ${appDarkMode ? "dark-mode" : ""}`}>
      {loading ? (
        <div className="loading">
          IPL News 2024 - Get latest IPL and cricket news
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <img
            src={imageUrl}
            className="w-full object-top object-cover h-64 mb-4 rounded-lg"
            alt={title}
          />
          <p className="text-lg mb-4">{shortDescription}</p>
          <div className="flex items-center justify-between border-b-2 border-slate-400 text-gray-600">
            <p>By: {authorName}</p>
            <p className="texthtm">{time}</p>
          </div>
          <div
            className="mt-8 texthtm"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Next Stories</h2>
            <ul>
              {nextStories.map((story) => (
                <li key={story.id}>
                  <Link
                    to={`/story/${story.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {story.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Story;
