/* eslint-disable prettier/prettier */
import { ref, onValue } from "firebase/database";
import { database, auth as emailAuth } from "./firebase";
import { defer } from "react-router-dom";
import _ from "lodash";

export default async function homeLoader() {
  const db = database;
  const auth = emailAuth;
  const usersRef = ref(db, "users/");
  const posts = [];
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
        _.forEach(data, (user) => {
          let isFollowing = false;
          let isLiked = false;
          if (currentUser !== null) {
            if (user.userName === currentUser) {
              isFollowing = null; // Indicate the current user's own posts
            } else {
              isFollowing = _.includes(user.followers, currentUser);
            }
          }
          if (user.posts) {
            _.forEach(user.posts, (post, id) => {
              const likeCount = post.likedBy ? post.likedBy.length : 0;
              const commentsCount = post.comments ? post.comments.length : 0;
              isLiked = _.includes(post.likedBy, currentUser);
              posts.push({
                ...post,
                isFollowing,
                isLiked,
                likeCount,
                commentsCount,
                userName: user.userName,
                id,
              });
            });
          }
        });
      },
      (error) => reject(error),
    );
  });
  return defer({ posts });
}
