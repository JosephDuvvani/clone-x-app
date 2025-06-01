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
    <div className="flex">
      <div>
        <button
          aria-label={`${post._count.replies} replies. Reply`}
          onClick={openModal}
        >
          <div className="flex">
            <div>
              <Icon path={mdiCommentOutline} size={1} />
            </div>
            <span>{post._count.replies}</span>
          </div>
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
          <div className="flex">
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
  );
};

export default PostActions;
