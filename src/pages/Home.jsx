import { Suspense } from "react";
import { useLoaderData, Await, useNavigate } from "react-router-dom";
import { v4 as uuid4 } from "uuid";
import _ from "lodash";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import handleFollow from "../functions/handleFollow";
import handleUnFollow from "../functions/handleUnfollow";
import handleLike from "../functions/handleLikeButton";
import { useLoggedInfo, useUserName } from "../functions/store";
import Fallback from "./Fallback";

export default function Home() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const currentUser = useUserName();
  const isLoggedIn = useLoggedInfo();

  return (
    <Suspense fallback={<Fallback />}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "75vh",
          overflowY: "auto",
          width: "100%",
        }}
      >
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
                    }}
                    key={uuid4()}
                  >
                    <CardContent>
                      <div className="flex items-center ">
                        {post.userName && (
                          <Typography
                            sx={{
                              fontSize: 14,
                            }}
                          >
                            {post.userName}
                          </Typography>
                        )}
                        {post.isFollowing ? (
                          <Button
                            sx={{
                              fontSize: 14,
                              fontWeight: 500,
                            }}
                            onClick={() => {
                              handleUnFollow(post.userName, currentUser);
                            }}
                          >
                            unfollow
                          </Button>
                        ) : (
                          post.isFollowing !== null && (
                            <Button
                              sx={{
                                fontSize: 12,
                              }}
                              onClick={() => {
                                if (isLoggedIn) {
                                  handleFollow(post.userName, currentUser);
                                } else {
                                  alert("please login to follow users");
                                }
                              }}
                            >
                              follow
                            </Button>
                          )
                        )}
                      </div>
                      {post.url && (
                        <CardMedia
                          component="img"
                          image={post.url}
                          sx={{
                            minHeight: "12rem",
                            maxWidth: "30vw",
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
                            if (isLoggedIn) {
                              handleLike(post.userName, post.id, currentUser);
                            } else {
                              alert("please login to follow users");
                            }
                          }}
                        >
                          <FaHeart
                            className={
                              post.isLiked
                                ? "w-8 h-8 text-red-500"
                                : "w-6 h-6 text-white"
                            }
                          />
                        </Button>
                        {post.likeCount && (
                          <Typography>{post.likeCount}</Typography>
                        )}
                      </div>
                      <div className="flex flex-col items-center">
                        <Button
                          onClick={() => {
                            navigate(`comments/${post.userName}/${post.id}`);
                          }}
                        >
                          <FaRegCommentDots className="w-6 h-6" />
                        </Button>
                        {post.commentsCount && (
                          <Typography>{post.commentsCount}</Typography>
                        )}
                      </div>
                    </CardActions>
                  </Card>
                ))}
              </section>
            );
          }}
        </Await>
      </Box>
    </Suspense>
  );
}
