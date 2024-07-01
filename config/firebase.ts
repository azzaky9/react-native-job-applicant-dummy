// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv1zvQSrElrjAYvkgAT1uVUomwyO0D8s0",
  authDomain: "jobstreet-clone-app.firebaseapp.com",
  projectId: "jobstreet-clone-app",
  storageBucket: "jobstreet-clone-app.appspot.com",
  messagingSenderId: "150177522534",
  appId: "1:150177522534:web:5d7639414dc34bd2e39ea7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
