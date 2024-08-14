/* eslint-disable prettier/prettier */
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import Typography from "@mui/material/Typography";
import { FaRegUserCircle } from "react-icons/fa";
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
              <section className="scroll-auto">
                {loadedFollowers.map((follower) => {
                  return (
                    <div key={uuid4()} className="flex gap-2 mb-2">
                      {follower.profilePhoto ? (
                        <img
                          src={follower.profilePhoto}
                          className=" rounded-full"
                          alt="User profile"
                        />
                      ) : (
                        <FaRegUserCircle className="w-6 h-6" />
                      )}
                      <Typography
                        sx={{
                          fontSize: "1.1rem",
                        }}
                      >
                        {follower}
                      </Typography>
                    </div>
                  );
                })}
              </section>
            );
          }}
        </Await>
      </div>
    </Suspense>
  );
}
