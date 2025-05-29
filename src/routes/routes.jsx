import Homepage from "../pages/home";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
import Auth from "../pages/auth";
import Profile from "../pages/profile";
import UserPosts from "../pages/profile/posts";
import UserLikes from "../pages/profile/likes";
import ConnectPeople from "../pages/connectPeople";
import { Route, Routes, useLocation } from "react-router-dom";
import EditProfile from "../components/editProfile";
import ComposePost from "../components/composePost";

const AppRoutes = () => {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Auth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/home" element={<Homepage />} />
        <Route path="/:username" element={<Profile />}>
          <Route index element={<UserPosts />} />
          <Route path="likes" element={<UserLikes />} />
        </Route>
        <Route path="/connect_people" element={<ConnectPeople />} />
      </Routes>

      {backgroundLocation && location.pathname === "/settings/profile" && (
        <EditProfile />
      )}
      {backgroundLocation && location.pathname === "/compose/post" && (
        <ComposePost />
      )}
    </>
  );
};

export default AppRoutes;
