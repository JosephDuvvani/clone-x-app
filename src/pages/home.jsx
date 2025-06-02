import { useContext, useEffect } from "react";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import CreatePost from "../components/createPost";
import Post from "../components/post";

const Homepage = () => {
  const { user, followingPosts, setFollowingPosts, loadingPosts } =
    useContext(UserContext);
  const navigate = useNavigate();

  const posts = followingPosts;

  useEffect(() => {
    if (!user) navigate("/", { replace: true });
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
                  <div key={post.id}>
                    <Post post={post} updatePost={updatePost} />
                  </div>
                ))}
              </section>
            )}
            {posts && posts.length === 0 && <div>No Posts</div>}
          </div>
          {loadingPosts && <div>Loading Posts...</div>}
        </div>
      )}
    </>
  );
};

export default Homepage;
