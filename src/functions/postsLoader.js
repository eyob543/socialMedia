/* eslint-disable prettier/prettier */
import { database, auth as emailAuth } from "./firebase";
import { ref, onValue } from "firebase/database";
import { defer } from "react-router-dom";
import _ from "lodash";

export default async function postsLoader() {
  const db = database;
  const auth = emailAuth;
  const posts = [];
  if (auth.currentUser) {
    const userName = auth.currentUser.displayName;
    const usersRef = ref(db, `users/${userName}/posts`);
    await new Promise((resolve, reject) => {
      onValue(
        usersRef,
        (snapshot) => {
          if (!snapshot) {
            return defer({ posts: [] });
          }
          const currentUser = auth.currentUser?.displayName || null;
          const data = snapshot.val();
          resolve(data);
          _.forEach(data, (post, id) => {
            const likeCount = post?.likedBy ? post.likedBy.length : 0;
            const commentsCount = post?.comments ? post.comments.length : 0;
            const isLiked = _.includes(post?.likedBy, currentUser);
            posts.push({
              ...post,
              isLiked,
              likeCount,
              commentsCount,
              userName: post.userName,
              id,
            });
          });
        },
        (error) => reject(error),
      );
    });
  }
  return defer({ posts });
}
