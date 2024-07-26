/* eslint-disable prettier/prettier */
import { useLoaderData, Await, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import { v4 as uuid4 } from "uuid";
import _ from "lodash";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FaRegCommentDots } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import handleDelete from "../functions/handleDelete";
import { useUserName } from "../functions/store";
import Fallback from "./Fallback";
export default function Posts() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const currentUser = useUserName();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "50vh",
        overflowY: "auto",
        width: "100%",
      }}
    >
      <Suspense fallback={<Fallback />}>
        <Await resolve={data.posts}>
          {(loadedPosts) => {
            if (!loadedPosts || loadedPosts.length === 0) {
              return <Typography>No posts available</Typography>;
            }
            return (
              <section>
                {loadedPosts?.map((post) => (
                  <Card
                    sx={{
                      backgroundColor: "black",
                      color: "whitesmoke",
                      minWidth: "25em",
                    }}
                    key={uuid4()}
                  >
                    <CardContent>
                      {post.url && (
                        <CardMedia
                          component="img"
                          image={post.url}
                          sx={{
                            minHeight: "12rem",
                          }}
                        />
                      )}

                      {post.description && (
                        <Typography
                          sx={{
                            fontSize: 16,
                          }}
                        >
                          {_.truncate(post.description)}
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <div className="flex flex-col items-center">
                        <Button
                          onClick={() => {
                            navigate(`/comments/${currentUser}/${post.id}`);
                          }}
                        >
                          <FaRegCommentDots className="w-6 h-6" />
                        </Button>
                        {post.commentsCount && (
                          <Typography>{post.commentsCount}</Typography>
                        )}
                      </div>
                      <div className="my-auto">
                        <Button
                          onClick={() => {
                            handleDelete(currentUser, post.id);
                          }}
                        >
                          <MdDelete className="w-8 h-8 text-red" />
                        </Button>
                      </div>
                    </CardActions>
                  </Card>
                ))}
              </section>
            );
          }}
        </Await>
      </Suspense>
    </Box>
  );
}
