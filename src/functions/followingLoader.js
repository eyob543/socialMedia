/* eslint-disable prettier/prettier */
import { database, auth as emailAuth } from "./firebase";
import { ref, onValue } from "firebase/database";
import { defer } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import _ from "lodash";

export default async function followingLoader() {
  const auth = emailAuth;
  const db = database;
  const following = [];
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
    const followingRef = ref(db, `users/${userName}/following`);
    try {
      await new Promise((resolve, reject) => {
        onValue(
          followingRef,
          (snapshot) => {
            if (!snapshot) {
              return defer({ following: [] });
            }
            const data = snapshot.val();
            resolve(data);
            _.forEach(data, (value) => following.push(value));
          },
          (error) => reject(error),
        );
      });
    } catch (err) {
      console.err(err);
      return defer({ following });
    }
  }
  return defer({ following });
}
