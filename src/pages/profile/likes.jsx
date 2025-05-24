import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/post";
import ProfileContext from "../../context/profileContext";
import api from "../../config/api.config";

const UserLikes = () => {
  const { likes, setLikes } = useContext(ProfileContext);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const { username } = useParams();

  useEffect(() => {
    setLoadingPosts(true);
    api
      .get(`users/${username}/liked_posts`)
      .then((res) => setLikes(res.data.posts))
      .catch((error) => console.error(error.message))
      .finally(() => setLoadingPosts(false));
  }, [username]);
  return (
    <div>
      {likes && likes.length > 0 && (
        <section>
          {likes.map((post) => (
            <article key={post.id}>
              <Post post={post} />
            </article>
          ))}
        </section>
      )}
      {loadingPosts && <div>Loading Liked Posts...</div>}
      {likes && likes.length === 0 && <div>No Liked Posts</div>}
    </div>
  );
};

export default UserLikes;
