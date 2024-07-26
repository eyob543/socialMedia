/* eslint-disable prettier/prettier */
import { ref, get, update } from "firebase/database";
import { database } from "./firebase";
import _ from "lodash";

export default async function handleUnFollow(userName, currentUser) {
  const db = database;

  try {
    // Update the following list of the current user
    const updateFollowingRef = ref(db, `users/${currentUser}/following`);
    const followingSnapshot = await get(updateFollowingRef);
    const followingData = followingSnapshot.val() || [];
    const newFollowingList = _.without(followingData, userName);

    await update(ref(db, `users/${currentUser}`), {
      following: newFollowingList,
    });

    // Update the followers list of the target user
    const updateFollowersRef = ref(db, `users/${userName}/followers`);
    const followersSnapshot = await get(updateFollowersRef);
    const followersData = followersSnapshot.val() || [];
    const newFollowersList = _.without(followersData, currentUser);

    await update(ref(db, `users/${userName}`), { followers: newFollowersList });
    alert("refresh to see changes");
    return "Unfollow successful";
  } catch (error) {
    console.error("Error updating following/followers lists:", error);
    return "Error occurred";
  }
}
