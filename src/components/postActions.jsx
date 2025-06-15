import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../config/api.config";
import Icon from "@mdi/react";
import { mdiCommentOutline, mdiHeartOutline, mdiLoading } from "@mdi/js";

const PostActions = ({ post, updatePost }) => {
  const [loadingLike, setLoadingLike] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLike = (e) => {
    e.stopPropagation();
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

  const handleUnlike = (e) => {
    e.stopPropagation();
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

  const openModal = (e) => {
    e.stopPropagation();
    navigate("/compose/post", {
      state: { backgroundLocation: location, post },
    });
  };

  return (
    <div className="post-actions">
      <div>
        <button
          aria-label={`${post._count.replies} replies. Reply`}
          onClick={openModal}
          className="post-actions__btn dim-text reply-btn"
        >
          <div className="flex">
            <div className="flex">
              <Icon path={mdiCommentOutline} />
            </div>
            <div className="post-action__value">
              {" "}
              <span>{post._count.replies}</span>
            </div>
          </div>
        </button>
      </div>
      <div>
        <button
          aria-label={`${post._count.likes} likes. Like`}
          onClick={post.liked ? handleUnlike : handleLike}
          style={{
            color: post.liked ? "rgb(249, 24, 128)" : null,
          }}
          className="post-actions__btn dim-text like-btn"
        >
          <div className="flex">
            <div className={loadingLike ? "loading flex" : "flex"}>
              <Icon path={loadingLike ? mdiLoading : mdiHeartOutline} />
            </div>

            <div className="post-action__value">
              <span>{post._count.likes}</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PostActions;
