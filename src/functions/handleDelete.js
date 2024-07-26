/* eslint-disable prettier/prettier */
import { ref, remove } from "firebase/database";
import { database, storage } from "./firebase";
import { ref as blobRef, deleteObject } from "firebase/storage";
export default async function handleDelete(userName, id) {
  const db = database;
  const blobStorage = storage;
  const locationInDb = ref(db, `users/${userName}/posts/${id}`);
  const locationOfBlobInDb = blobRef(
    blobStorage,
    `users/${userName}/posts/${id}/`,
  );
  await deleteObject(locationOfBlobInDb).catch((error) => {
    console.error(error.message);
  });
  await remove(locationInDb);
  // return alert("Refresh to see changes");
}
