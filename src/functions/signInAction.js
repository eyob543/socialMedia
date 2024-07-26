/* eslint-disable prettier/prettier */
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { database, auth as emailAuth } from "./firebase";
import _ from "lodash";

export default async function handleSignInWithGoogle() {
  const auth = emailAuth;
  const db = database;
  const provider = new GoogleAuthProvider();
  auth.useDeviceLanguage();

  try {
    const usersRef = ref(db, "users/");
    const snapshot = await get(usersRef);
    const data = snapshot.val();

    await signInWithPopup(auth, provider);
    const userName = auth.currentUser.displayName;

    if (!_.has(data, userName)) {
      const userRef = ref(db, `users/${userName}`);
      await set(userRef, {
        followers: [],
        following: [],
        likedBy: [],
        userName,
      });
    }
  } catch (error) {
    console.error("Error during sign-in or user setup:", error.message);
  }
}
