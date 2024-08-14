/* eslint-disable prettier/prettier */
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import Typography from "@mui/material/Typography";
import { v4 as uuid4 } from "uuid";
import Fallback from "./Fallback";
import { FaRegUserCircle } from "react-icons/fa";

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
            <section className="scroll-auto">
              {loadedFollowing.map((following) => {
                return (
                  <div className="flex gap-2 mb-2" key={uuid4()}>
                    {following.profilePhoto ? (
                      <img
                        src={following.profilePhoto}
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
                      {following}
                    </Typography>
                  </div>
                );
              })}
            </section>
          );
        }}
      </Await>
    </Suspense>
  );
}
