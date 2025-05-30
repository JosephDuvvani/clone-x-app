import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/post";
import ProfileContext from "../../context/profileContext";
import api from "../../config/api.config";
import UserContext from "../../context/userContext";

const UserLikes = () => {
  const { likes, setLikes } = useContext(ProfileContext);
  const { followingPosts, setFollowingPosts } = useContext(UserContext);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const { username } = useParams();

  const posts = likes?.map((like) => like.post);

  useEffect(() => {
    setLoadingPosts(true);
    api
      .get(`users/${username}/liked_posts`)
      .then((res) => setLikes(res.data.likes))
      .catch((error) => console.error(error.message))
      .finally(() => setLoadingPosts(false));
  }, [username]);

  const updatePost = (post) => {
    setLikes((prev) =>
      prev.map((like) =>
        post.id === like.post.id
          ? {
              ...like,
              post,
            }
          : like
      )
    );
    if (followingPosts && followingPosts.length > 0) {
      let targetPost = followingPosts.find(({ id }) => id === post.id);
      targetPost
        ? setFollowingPosts((prev) =>
            prev.map((data) => (data.id === post.id ? post : data))
          )
        : null;
    }
  };

  return (
    <div>
      {likes && likes.length > 0 && (
        <section>
          {likes.map((like) => (
            <div key={like.post.id}>
              <Post post={like.post} posts={posts} updatePost={updatePost} />
            </div>
          ))}
        </section>
      )}
      {loadingPosts && <div>Loading Liked Posts...</div>}
      {likes && likes.length === 0 && <div>No Liked Posts</div>}
    </div>
  );
};

export default UserLikes;
