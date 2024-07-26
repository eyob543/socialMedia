/* eslint-disable prettier/prettier */
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import Typography from "@mui/material/Typography";
import { v4 as uuid4 } from "uuid";
import Fallback from "./Fallback";

export default function Following() {
  const data = useLoaderData();
  return (
    <Suspense fallback={<Fallback />}>
      <Await resolve={data.following}>
        {(loadedFollowing) => {
          if (!loadedFollowing || loadedFollowing.length === 0) {
            return <Typography>You are not following anyone</Typography>;
          }
          return (
            <section>
              {loadedFollowing.map((following) => (
                <Typography key={uuid4()}>{following}</Typography>
              ))}
            </section>
          );
        }}
      </Await>
    </Suspense>
  );
}
