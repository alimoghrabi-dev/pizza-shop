import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "insightq-423b3.firebaseapp.com",
  projectId: "insightq-423b3",
  storageBucket: "insightq-423b3.appspot.com",
  messagingSenderId: "759344713064",
  appId: "1:759344713064:web:fa053c57b74be541bfdadd",
};

export const app = initializeApp(firebaseConfig);
