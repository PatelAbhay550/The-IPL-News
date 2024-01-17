import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, timestampToDateString } from "../config/firebase";
import ReactHtmlParser from "react-html-parser";

const Story = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [time, setTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");

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

          // Assuming you have a helper function to convert timestamp to a formatted date string
          setTime(timestampToDateString(data.createdAt));
          document.title = data.title;
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching story data: ", error);
      }
    };

    fetchStoryData();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <img
        src={imageUrl}
        className="w-full object-cover h-64 mb-4 rounded-lg"
        alt={title}
      />
      <p className="text-lg mb-4">{shortDescription}</p>
      <div className="flex items-center justify-between border-b-2 border-slate-400 text-gray-600">
        <p>By: {authorName}</p>
        <p className="texthtm">{time}</p>
      </div>
      <div className="mt-8">{ReactHtmlParser(content)}</div>
    </div>
  );
};

export default Story;
