import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/post";
import ProfileContext from "../../context/profileContext";
import api from "../../config/api.config";

const UserPosts = () => {
  const { posts, setPosts } = useContext(ProfileContext);
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

  return (
    <>
      {posts && posts.length > 0 && (
        <section>
          {posts.map((post) => (
            <article key={post.id}>
              <Post post={post} />
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
