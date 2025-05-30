import { useContext, useState } from "react";
import api from "../config/api.config";
import TextArea from "./textarea";
import { isEmpty } from "../lib/textAreaUtils";
import UserContext from "../context/userContext";
import { useLocation, useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [body, setBody] = useState("");
  const { user, setFollowingPosts } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;
  const post = state?.post;

  const handleChange = ({ editor }) => {
    setBody(editor.getJSON());
  };

  const handlePost = () => {
    if (isEmpty(body)) return;
    const url = post ? `posts/${post.id}` : "posts";
    api
      .post(url, { body })
      .then((res) => {
        setFollowingPosts((prev) => [
          { ...res.data.post, author: user, _count: { replies: 0, likes: 0 } },
          ...prev.map((data) =>
            data.id === post.id
              ? {
                  ...data,
                  _count: { ...data._count, replies: data._count.replies + 1 },
                }
              : data
          ),
        ]);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        if (backgroundLocation) navigate(-1);
      });
  };

  return (
    <div>
      <div>
        <div className="picture">
          <img
            src={
              user.profile.pictureUrl || import.meta.env.VITE_DEFAULT_PICTURE68
            }
            alt=""
          />
        </div>
        <TextArea handleChange={handleChange} content={body} />
      </div>
      <button onClick={handlePost} disabled={isEmpty(body)}>
        {post ? "Reply" : "Post"}
      </button>
    </div>
  );
};

export default CreatePost;
