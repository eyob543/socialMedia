/* eslint-disable prettier/prettier */
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import Typography from "@mui/material/Typography";

import { v4 as uuid4 } from "uuid";
import Fallback from "./Fallback";

export default function Followers() {
  const data = useLoaderData();
  return (
    <Suspense fallback={<Fallback />}>
      <div className="flex items-end w-full ">
        <Await resolve={data.followers}>
          {(loadedFollowers) => {
            if (!loadedFollowers || loadedFollowers.length === 0) {
              return <Typography>No followers yet</Typography>;
            }
            return (
              <section>
                {loadedFollowers.map((follower) => (
                  <Typography key={uuid4()}>{follower}</Typography>
                ))}
              </section>
            );
          }}
        </Await>
      </div>
    </Suspense>
  );
}
