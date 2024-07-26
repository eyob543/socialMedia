import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AuthRequired from "./pages/AuthRequired";
import Post from "./pages/Post";
import User from "./pages/User";
import Following from "./pages/Following";
import Followers from "./pages/Followers";
import Posts from "./pages/UserPosts";
import Comments from "./pages/Comments";
import postAction from "./functions/postAction";
import homeLoader from "./functions/homeLoader";
import followingLoader from "./functions/followingLoader";
import followersLoader from "./functions/followersLoader";
import postsLoader from "./functions/postsLoader";
import { commentsAction, commentsLoader } from "./functions/handleComments";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: homeLoader,
        },
        {
          path: "comments/:userName/:id",
          element: <Comments />,
          loader: commentsLoader,
          action: commentsAction,
        },
        {
          element: <AuthRequired />,
          children: [
            {
              path: "post",
              element: <Post />,
              action: postAction,
            },
            {
              path: "user",
              element: <User />,
              children: [
                {
                  index: true,
                  element: <Posts />,
                  loader: postsLoader,
                },
                {
                  path: "followers",
                  element: <Followers />,
                  loader: followersLoader,
                },
                {
                  path: "following",
                  element: <Following />,
                  loader: followingLoader,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
