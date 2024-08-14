/* eslint-disable prettier/prettier */
import { database, auth, storage } from "./firebase";
import { ref, set } from "firebase/database";
import { v4 as uuid4 } from "uuid";
import { ref as imageRef, uploadBytes, getDownloadURL } from "firebase/storage";
export default async function action({ request }) {
  const formData = await request.formData();
  const description = formData.get("description");
  const image = formData.get("image");
  const errors = {};
  const db = database;
  const blobStorage = storage;
  const userName = auth.currentUser?.displayName;
  const uid = uuid4();

  if (!image) {
    errors.post = "Please choose a picture or video to post";
    return errors;
  }

  if (image) {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/webm",
    ];
    if (!validTypes.includes(image.type)) {
      errors.typeMismatch = "Please choose an image or video file.";
      return errors;
    }
  }
  try {
    const postRef = ref(db, `users/${userName}/posts/${uid}`);

    if (image) {
      const storageRef = imageRef(
        blobStorage,
        `users/${userName}/posts/${uid}/${image.name}`,
      );
      const snapshot = await uploadBytes(storageRef, image);
      const imageURL = await getDownloadURL(snapshot.ref);

      await set(postRef, {
        url: imageURL,
        description,
        comments: [],
        likedBy: [],
      });
    }
    errors.success = "Your post was successful";
    return errors;
  } catch (e) {
    console.error("Error adding document: ", e);
    errors.submit = "Failed to submit the form";
    return errors;
  }
}
