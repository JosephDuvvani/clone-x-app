import { format } from "date-fns";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Icon from "@mdi/react";
import { mdiCommentOutline, mdiHeartOutline, mdiLoading } from "@mdi/js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../config/api.config";
import { useState } from "react";

const Post = ({ post, updatePost }) => {
  const { author } = post;
  const [loadingLike, setLoadingLike] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLike = () => {
    setLoadingLike(true);
    api
      .put(`posts/${post.id}/like`)
      .then((res) => {
        updatePost({
          ...post,
          liked: true,
          _count: { ...post._count, likes: post._count.likes + 1 },
        });
      })
      .catch((error) => console.error(error.response?.data.message || error))
      .finally(() => setLoadingLike(false));
  };

  const handleUnlike = () => {
    setLoadingLike(true);
    api
      .put(`posts/${post.id}/unlike`)
      .then((res) => {
        updatePost({
          ...post,
          liked: false,
          _count: { ...post._count, likes: post._count.likes - 1 },
        });
      })
      .catch((error) => console.error(error.response?.data.message || error))
      .finally(() => setLoadingLike(false));
  };

  const openModal = () => {
    navigate("/compose/post", {
      state: { backgroundLocation: location, post },
    });
  };

  return (
    <>
      {post && (
        <article>
          <div className="flex">
            <div>
              <Link to={`/${author.username}`} state={{ userInfo: author }}>
                <div className="flex">
                  <img
                    src={
                      author.profile.pictureUrl ||
                      import.meta.env.VITE_DEFAULT_PICTURE68
                    }
                    alt=""
                  />
                </div>
              </Link>
            </div>
            <div>
              <div>
                <Link to={`/${author.username}`} state={{ userInfo: author }}>
                  <span>
                    {`${author.profile.firstname} ${
                      author.profile.lastname || ""
                    }`.trim()}
                  </span>
                </Link>
                <Link to={`/${author.username}`} state={{ userInfo: author }}>
                  <span> @{author.username}</span>
                </Link>

                <span> {format(post.createdAt, "MMM dd")}</span>
              </div>
              {post.replyTo && (
                <div>Replying to @{post.replyTo.author.username}</div>
              )}
              <div>{parse(generateHTML(post.body, [StarterKit]))}</div>
              <div className="flex">
                <div>
                  <button
                    aria-label={`${post._count.replies} replies. Reply`}
                    onClick={openModal}
                  >
                    <div>
                      <Icon path={mdiCommentOutline} size={1} />
                    </div>
                    <span>{post._count.replies}</span>
                  </button>
                </div>
                <div>
                  <button
                    aria-label={`${post._count.likes} likes. Like`}
                    onClick={post.liked ? handleUnlike : handleLike}
                    style={{
                      color: post.liked ? "lightgreen" : "inherit",
                    }}
                  >
                    <div>
                      <div className={loadingLike ? "loading" : null}>
                        <Icon
                          path={loadingLike ? mdiLoading : mdiHeartOutline}
                          size={1}
                        />
                      </div>

                      <span>{post._count.likes}</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default Post;
