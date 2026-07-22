"use client";

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsok5HKu_8WCENKs5MA3G8zoDUY7h5IlU",
  authDomain: "summarist-internship-65982.firebaseapp.com",
  projectId: "summarist-internship-65982",
  storageBucket: "summarist-internship-65982.firebasestorage.app",
  messagingSenderId: "623602303308",
  appId: "1:623602303308:web:de2ae4086e104d6b540fe9"
}; 

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);