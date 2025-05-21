import Homepage from "../pages/home";
import Layout from "../pages/layout";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
import Auth from "../pages/auth";

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
    ],
  },
];

export default routes;
