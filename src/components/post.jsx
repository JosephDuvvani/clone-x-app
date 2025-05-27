import { format } from "date-fns";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Icon from "@mdi/react";
import { mdiCommentOutline, mdiHeartOutline, mdiLoading } from "@mdi/js";
import { Link } from "react-router-dom";
import api from "../config/api.config";
import { useState } from "react";

const Post = ({ post, updatePost }) => {
  const { author } = post;
  const [loadingLike, setLoadingLike] = useState(false);

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

  return (
    <>
      {post && (
        <div>
          <div>
            <Link to={`/${author.username}`} state={{ userInfo: author }}>
              <div>
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
            <div>{parse(generateHTML(post.body, [StarterKit]))}</div>
            <div>
              <div>
                <button
                  aria-label={`${post._count.comments} comments. Comment`}
                >
                  <div>
                    <Icon path={mdiCommentOutline} size={1} />
                  </div>
                  <span>{post._count.comments}</span>
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
      )}
    </>
  );
};

export default Post;
