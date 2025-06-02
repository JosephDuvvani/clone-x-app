import { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [postChain, setPostChain] = useState([]);
  const [replies, setReplies] = useState([]);

  return (
    <PostContext.Provider
      value={{ postChain, setPostChain, replies, setReplies }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
