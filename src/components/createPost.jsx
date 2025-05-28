import { useContext, useState } from "react";
import api from "../config/api.config";
import TextArea from "./textarea";
import { isEmpty } from "../lib/textAreaUtils";
import UserContext from "../context/userContext";

const CreatePost = () => {
  const [body, setBody] = useState("");
  const { user, setFollowingPosts } = useContext(UserContext);

  const handleChange = ({ editor }) => {
    setBody(editor.getJSON());
  };

  const handlePost = () => {
    if (isEmpty(body)) return;
    api
      .post("posts", { body })
      .then((res) => {
        setFollowingPosts((prev) => [
          { ...res.data.post, author: user, _count: { comments: 0, likes: 0 } },
          ...prev,
        ]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <TextArea handleChange={handleChange} content={body} />
      <button onClick={handlePost} disabled={isEmpty(body)}>
        Post
      </button>
    </div>
  );
};

export default CreatePost;
