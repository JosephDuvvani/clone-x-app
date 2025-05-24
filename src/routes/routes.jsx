import Homepage from "../pages/home";
import Layout from "../pages/layout";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
import Auth from "../pages/auth";
import Profile from "../pages/profile";
import UserPosts from "../pages/profile/posts";
import UserLikes from "../pages/profile/likes";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Auth />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
      {
        path: "home",
        element: <Homepage />,
      },
      {
        path: "/:username",
        element: <Profile />,
        children: [
          {
            index: true,
            element: <UserPosts />,
          },
          {
            path: "likes",
            element: <UserLikes />,
          },
        ],
      },
    ],
  },
];

export default routes;
