import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(db, "Allnews"), {
        title,
        metaDescription,
        imageUrl: coverImage,
        authorName,
        category,
        content,
        createdAt: serverTimestamp(),
      });

      console.log("Document written with ID: ", docRef.id);
      // Reset the form after successful save
      setTitle("");
      setMetaDescription("");
      setCoverImage("");
      setAuthorName("");
      setCategory("");
      setContent("");
    } catch (error) {
      ()=>{}
    }
  };

  return (
    <div>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Meta Description:</label>
        <input
          type="text"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Cover Image URL:</label>
        <input
          type="text"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />
      </div>
      <div>
        <label>Author Name:</label>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label>Content:</label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(value) => setContent(value)}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default AddNews;
