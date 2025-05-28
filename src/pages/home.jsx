import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import CreatePost from "../components/createPost";
import api from "../config/api.config";
import Post from "../components/post";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const { user, followingPosts, setFollowingPosts } = useContext(UserContext);
  const navigate = useNavigate();

  const posts = followingPosts;

  useEffect(() => {
    if (!user) navigate("/", { replace: true });
    else if (!followingPosts) {
      setLoading(true);
      api
        .get(`users/${user.username}/following_posts?limit=30`)
        .then((res) => setFollowingPosts(res.data.posts))
        .catch((error) => console.error(error.response?.data.message || error))
        .finally(() => setLoading(false));
    }
  }, [user?.id]);

  const updatePost = (post) => {
    setFollowingPosts((prev) =>
      prev.map((data) => (post.id === data.id ? post : data))
    );
  };

  return (
    <>
      {user && (
        <div>
          <h3 aria-hidden>Following</h3>
          <CreatePost />
          <div>
            {posts && posts.length > 0 && (
              <section>
                {posts.map((post) => (
                  <article key={post.id}>
                    <Post post={post} updatePost={updatePost} />
                  </article>
                ))}
              </section>
            )}
            {posts && posts.length === 0 && <div>No Posts</div>}
          </div>
          {loading && <div>Loading Posts...</div>}
        </div>
      )}
    </>
  );
};

export default Homepage;
