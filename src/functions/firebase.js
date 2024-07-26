/* eslint-disable no-undef */
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDbexRZiWT0-ywsH7GZhJeHmu9lcmxLskg",
  authDomain: "social-media-df883.firebaseapp.com",
  projectId: "social-media-df883",
  databaseURL:
    "https://social-media-df883-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "social-media-df883.appspot.com",
  messagingSenderId: "601576917427",
  appId: "1:601576917427:web:ac145a175c469b848fe3c6",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
