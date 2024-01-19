import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

const Wysiwyg = () => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(db, "Quickbytes"), {
        title: title,
        imageUrl: coverImage,
        shortDescription: desc,
        content: content,
        authorName: authorName,
        createdAt: serverTimestamp(), // Use serverTimestamp to store the current date and time
        // Add other properties as needed
      });

      console.log("Document written with ID: ", docRef.id);
      // Reset the form after successful save
      setTitle("");
      setCoverImage("");
      setDesc("");
      setContent("");
      setAuthorName("");
    } catch (error) {
      console.log("Error adding document: ");
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
        <label>Cover Image URL:</label>
        <input
          type="text"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />
      </div>
      <div>
        <label>Cover Short desc:</label>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
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
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Wysiwyg;
