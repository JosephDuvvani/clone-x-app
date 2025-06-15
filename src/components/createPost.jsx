import { useContext, useState } from "react";
import api from "../config/api.config";
import TextArea from "./textarea";
import { isEmpty } from "../lib/textAreaUtils";
import UserContext from "../context/userContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePost } from "../context/postContext";
import ProfileContext from "../context/profileContext";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

const CreatePost = () => {
  const [body, setBody] = useState("");
  const { user, setFollowingPosts } = useContext(UserContext);
  const { setPosts, setLikes } = useContext(ProfileContext);
  const { postChain, setPostChain, setReplies } = usePost();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
        setLoading(false);
        if (backgroundLocation) navigate(-1);
      });
  };

  return (
    <div className="post-creator">
      <div>
        <Link to={`/${user.username}`}>
          <div className="picture picture--small">
            <img
              src={
                user.profile.pictureUrl ||
                import.meta.env.VITE_DEFAULT_PICTURE68
              }
              alt=""
            />
          </div>
        </Link>
      </div>
      <div className="post-creator__main">
        <div className="pos-rel">
          {isEmpty(body) && (
            <div className="placeholder">
              <span>{"What's happening?"}</span>
            </div>
          )}
          <TextArea handleChange={handleChange} content={body} />
        </div>
        <button
          className="btn btn--post"
          onClick={handlePost}
          disabled={isEmpty(body)}
        >
          {loading && (
            <div className="loading">
              <div className="loading__spinner">
                <Icon path={mdiLoading} className="loading__icon" />
              </div>
            </div>
          )}{" "}
          <div className={loading ? "btn-content-loading" : null}>
            {post ? "Reply" : "Post"}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
