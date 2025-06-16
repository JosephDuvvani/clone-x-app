import { useContext, useEffect } from "react";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import CreatePost from "../components/createPost";
import Post from "../components/post";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

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
          <div className="main__outlet__header">
            <div className="home-title">
              <h3 aria-hidden>Following</h3>
            </div>
          </div>
          <CreatePost />
          <div>
            {loadingPosts ? (
              <div className="loading posts-empty">
                <div className="loading__spinner">
                  <Icon path={mdiLoading} />
                </div>
              </div>
            ) : (
              <section>
                {posts && posts.length > 0 && (
                  <>
                    {posts.map((post) => (
                      <div key={post.id}>
                        <Post post={post} updatePost={updatePost} />
                      </div>
                    ))}
                  </>
                )}
                {posts && posts.length === 0 && (
                  <div className="posts-empty">
                    <div>No Posts</div>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;
