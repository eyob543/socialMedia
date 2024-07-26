/* eslint-disable prettier/prettier */
import { ref, get, update } from "firebase/database";
import { database } from "./firebase";
import _ from "lodash";
export default async function handleLike(userName, uid, currentUser) {
  const db = database;
  try {
    const likeRef = ref(db, `users/${userName}/posts/${uid}`);
    const likedBySnapshopt = await get(likeRef);
    const likedByData = likedBySnapshopt.val()?.likedBy || [];
    if (_.includes(likedByData, currentUser)) {
      await update(likeRef, {
        likedBy: _.without(likedByData, currentUser),
      });
    }
    if (!_.includes(likedByData, currentUser)) {
      likedByData.push(currentUser);
      await update(likeRef, {
        likedBy: likedByData,
      });
    }
    alert("refresh to see changes");
  } catch (error) {
    console.error("Error updating liked list:", error);
    return "Error occurred";
  }
}
