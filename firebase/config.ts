import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/firestore";
import { getAuth } from "firebase/auth";
import { collection, initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA-fEoTnxzTwgGnljHMn53H8m13SKXf1UA",
  authDomain: "coyotecarpool-ios.firebaseapp.com",
  projectId: "coyotecarpool-ios",
  storageBucket: "coyotecarpool-ios.appspot.com",
  messagingSenderId: "829459939386",
  appId: "1:829459939386:web:9fad2ccdb0d57d9cd5f503",
  measurementId: "G-M32EJ8WC0Z",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const userRef = collection(db, "user");
export const chatRef = collection(db, "chats");
