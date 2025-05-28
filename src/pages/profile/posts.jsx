import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/post";
import ProfileContext from "../../context/profileContext";
import api from "../../config/api.config";
import UserContext from "../../context/userContext";

const UserPosts = () => {
  const { posts, setPosts, userInfo } = useContext(ProfileContext);
  const { followingPosts, setFollowingPosts } = useContext(UserContext);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const { username } = useParams();

  useEffect(() => {
    setLoadingPosts(true);
    api
      .get(`users/${username}/posts`)
      .then((res) => setPosts(res.data.posts))
      .catch((error) => console.error(error.message))
      .finally(() => setLoadingPosts(false));
  }, [username]);

  const updatePost = (post) => {
    setPosts((prev) => prev.map((data) => (post.id === data.id ? post : data)));
    if (
      userInfo.connection?.following &&
      followingPosts &&
      followingPosts.length > 0
    ) {
      let targetPost = followingPosts.find(({ id }) => id === post.id);
      targetPost
        ? setFollowingPosts((prev) =>
            prev.map((data) => (data.id === post.id ? post : data))
          )
        : null;
    }
  };

  return (
    <>
      {posts && posts.length > 0 && (
        <section>
          {posts.map((post) => (
            <article key={post.id}>
              <Post post={post} updatePost={updatePost} />
            </article>
          ))}
        </section>
      )}
      {loadingPosts && <div>Loading Posts...</div>}
      {posts && posts.length === 0 && <div>No Posts</div>}
    </>
  );
};

export default UserPosts;
