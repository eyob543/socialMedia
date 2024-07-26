/* eslint-disable prettier/prettier */
import { database, auth as emailAuth } from "./firebase";
import { ref, onValue } from "firebase/database";
import { defer } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import _ from "lodash";

export default async function followersLoader() {
  const auth = emailAuth;
  const db = database;
  const followers = [];
  let isLoggedIn;
  await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
      if (user) {
        isLoggedIn = true;
      }
    });
  });
  if (isLoggedIn) {
    const userName = auth.currentUser.displayName;
    const followersRef = ref(db, `users/${userName}/followers`);
    try {
      await new Promise((resolve, reject) => {
        onValue(
          followersRef,
          (snapshot) => {
            if (!snapshot) {
              return defer({ followers: [] });
            }
            const data = snapshot.val();
            resolve(data);
            _.forEach(data, (value) => followers.push(value));
          },
          (error) => reject(error),
        );
      });
    } catch (err) {
      console.err(err);
      return defer({ followers });
    }
  }
  return defer({ followers });
}
