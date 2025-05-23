import { useState } from "react";
import { ProfileProvider } from "../context/profileContext";

const MainContent = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [posts, setPosts] = useState();
  const [likes, setLikes] = useState();
  return (
    <ProfileProvider
      value={{ userInfo, setUserInfo, posts, setPosts, likes, setLikes }}
    >
      {children}
    </ProfileProvider>
  );
};

export default MainContent;
