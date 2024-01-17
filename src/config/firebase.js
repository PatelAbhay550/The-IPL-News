// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTXH3OW1EUbee8yXt04YkC7zvTWfCt1Ts",
  authDomain: "myblog-aee44.firebaseapp.com",
  projectId: "myblog-aee44",
  storageBucket: "myblog-aee44.appspot.com",
  messagingSenderId: "851291435958",
  appId: "1:851291435958:web:b7767c42b275579bf74717",
  measurementId: "G-D7D8PWJ936",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore();

// Timestamp to Date String function
export const timestampToDateString = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleString(); // Adjust the formatting as needed
};
