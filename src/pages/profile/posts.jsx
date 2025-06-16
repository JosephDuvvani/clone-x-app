import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/post";
import ProfileContext from "../../context/profileContext";
import api from "../../config/api.config";
import UserContext from "../../context/userContext";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

const UserPosts = () => {
  const { posts, setPosts, userInfo } = useContext(ProfileContext);
  const { followingPosts, setFollowingPosts } = useContext(UserContext);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const { username } = useParams();

  useEffect(() => {
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
      {loadingPosts ? (
        <div className="loading posts-empty">
          <div className="loading__spinner">
            <Icon path={mdiLoading} />
          </div>
        </div>
      ) : posts && posts.length > 0 ? (
        <section>
          {posts.map((post) => (
            <div key={post.id}>
              <Post post={post} updatePost={updatePost} />
            </div>
          ))}
        </section>
      ) : posts && posts.length === 0 ? (
        <div className="posts-empty dim-text">
          <div>No Posts</div>
        </div>
      ) : null}
    </>
  );
};

export default UserPosts;
