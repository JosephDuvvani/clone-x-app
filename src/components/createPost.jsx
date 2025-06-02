import { useContext, useState } from "react";
import api from "../config/api.config";
import TextArea from "./textarea";
import { isEmpty } from "../lib/textAreaUtils";
import UserContext from "../context/userContext";
import { useLocation, useNavigate } from "react-router-dom";
import { usePost } from "../context/postContext";
import ProfileContext from "../context/profileContext";

const CreatePost = () => {
  const [body, setBody] = useState("");
  const { user, setFollowingPosts } = useContext(UserContext);
  const { setPosts, setLikes } = useContext(ProfileContext);
  const { postChain, setPostChain, setReplies } = usePost();

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
          res.data.post,
          ...prev.map((data) =>
            data.id === post.id
              ? {
                  ...data,
                  _count: { ...data._count, replies: data._count.replies + 1 },
                }
              : data
          ),
        ]);

        if (post && backgroundLocation.pathname.includes("/post/")) {
          const replyToCurrent =
            backgroundLocation.pathname === `/post/${post.id}`;
          const parentInChain = !!postChain.find(({ id }) => id === post.id);

          if (replyToCurrent)
            setReplies((prev) => [
              { ...res.data.post, replyTo: null },
              ...prev,
            ]);

          parentInChain
            ? setPostChain((prev) =>
                prev.map((data) =>
                  data.id === post.id
                    ? {
                        ...data,
                        _count: {
                          ...data._count,
                          replies: data._count.replies + 1,
                        },
                      }
                    : data
                )
              )
            : setReplies((prev) =>
                prev.map((data) =>
                  data.id === post.id
                    ? {
                        ...data,
                        _count: {
                          ...data._count,
                          replies: data._count.replies + 1,
                        },
                      }
                    : data
                )
              );
        } else if (
          post &&
          backgroundLocation.pathname.includes(`/${user.username}`)
        ) {
          backgroundLocation.pathname === `/${user.username}`
            ? setPosts((prev) =>
                prev.map((data) =>
                  data.id === post.id
                    ? {
                        ...data,
                        _count: {
                          ...data._count,
                          replies: data._count.replies + 1,
                        },
                      }
                    : data
                )
              )
            : setLikes((prev) =>
                prev.map((like) =>
                  post.id === like.post.id
                    ? {
                        ...like,
                        post: {
                          ...like.post,
                          _count: {
                            ...like.post._count,
                            replies: like.post._count.replies + 1,
                          },
                        },
                      }
                    : like
                )
              );
        }
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
