/* eslint-disable prettier/prettier */
import { database, auth } from "./firebase";
import { ref, get, update } from "firebase/database";
import { defer } from "react-router-dom";
import _ from "lodash";

export async function commentsLoader({ params }) {
  const db = database;
  const commentRef = ref(
    db,
    `users/${params.userName}/posts/${params.id}/comments`,
  );
  const comments = [];
  try {
    const snapshot = await get(commentRef);
    if (!snapshot.exists()) {
      return defer({ comments });
    }
    const data = snapshot.val();
    _.forEach(data, (comment) => comments.push(comment));
  } catch (error) {
    console.error(error);
    return defer({ comments });
  }
  return defer({ comments });
}
export async function commentsAction({ params, request }) {
  const formData = await request.formData();
  const newComment = formData.get("comment");
  const errors = {};
  const db = database;
  const commentRef = ref(db, `users/${params.userName}/posts/${params.id}`);
  const userName = auth.currentUser;
  if (_.trim(newComment) === "") {
    errors.comment = "Can't post an empty comment";
  }
  if (userName === null) {
    errors.notLoggedIn = "Please login to comment on a post";
  }
  try {
    const snapshot = await get(commentRef);
    const comments = snapshot.val().comments || [];
    comments.push(newComment);
    await update(commentRef, {
      comments,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
    errors.submit = "Failed to submit the form";
  }
  return errors;
}
