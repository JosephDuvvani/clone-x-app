import { useContext, useEffect, useState } from "react";
import api from "../config/api.config";
import UserContext from "../context/userContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import Post from "../components/post";
import ActivePost from "../components/activePost";

const FullPost = () => {
  const { user, followingPosts, setFollowingPosts } = useContext(UserContext);

  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  let postData = location.state?.post;

  const [postChain, setPostChain] = useState([postData]);
  const [replies, setReplies] = useState();
  const [loadingChain, setLoadingChain] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const post = postChain?.[postChain.length - 1];
  const author = post?.author;

  useEffect(() => {
    if (!user) navigate("/", { replace: true });
    else {
      if (post?.id !== postData?.id) {
        if (
          postChain.length >= 2 &&
          postData.id === postChain[postChain.length - 2].id
        )
          postChain.splice(postChain.length - 2, 2);
        setPostChain([...postChain, postData]);
      }

      if (postChain.length === 1 && post.replyToId) {
        setLoadingChain(true);
        api
          .get(`posts/${postId}/reply_chain`)
          .then((res) => setPostChain(res.data.chain))
          .catch((error) =>
            console.error(error.response?.data.message || error)
          )
          .finally(() => setLoadingChain(false));
      }

      setLoadingReplies(true);
      api
        .get(`posts/${postId}/replies`)
        .then((res) => setReplies(res.data.replies))
        .catch((error) => console.error(error.message))
        .finally(() => setLoadingReplies(false));
    }
  }, [user?.id, postId]);

  const handleBack = () => {
    if (post.replyToId)
      setPostChain((prev) => prev.filter((data) => data.id !== post.id));
    navigate(-1);
  };

  const openModal = (e) => {
    e.stopPropagation();
    navigate("/compose/post", {
      state: { backgroundLocation: location, post },
    });
  };

  const updatePost = (updatedPost) => {
    setPostChain((prev) =>
      prev.map((data) => (data.id === updatedPost.id ? updatedPost : data))
    );

    if (
      !updatedPost.replyToId &&
      author.connection?.following &&
      followingPosts &&
      followingPosts.length > 0
    ) {
      let targetPost = followingPosts.find(({ id }) => id === updatedPost.id);
      targetPost
        ? setFollowingPosts((prev) =>
            prev.map((data) =>
              data.id === updatedPost.id ? updatedPost : data
            )
          )
        : null;
    }
  };

  const updatedReply = (updatedReply) => {
    setReplies((prev) =>
      prev.map((reply) => (reply.id === updatedReply.id ? updatedReply : reply))
    );
  };

  return (
    <div>
      {post && (
        <div>
          <div>
            <div className="flex">
              <div>
                <button aria-label="back" onClick={handleBack}>
                  <Icon path={mdiArrowLeft} size={1} />
                </button>
              </div>
              <div>
                <h2>Post</h2>
              </div>
              <div>
                <button onClick={openModal}>
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <section>
              <div>
                <div>
                  {!loadingChain && (
                    <>
                      {postChain.map((data) =>
                        data.id === post.id ? (
                          <div key={data.id}>
                            <ActivePost post={post} updatePost={updatePost} />
                          </div>
                        ) : (
                          <div key={data.id}>
                            <Post post={data} updatePost={updatePost} />
                          </div>
                        )
                      )}
                    </>
                  )}
                  {loadingChain && <div>Loading Chain...</div>}
                </div>

                {postData.id === post.id && replies && replies.length > 0 && (
                  <div>
                    {replies.map((reply) => (
                      <div key={reply.id}>
                        <Post post={reply} updatePost={updatedReply} />
                      </div>
                    ))}
                  </div>
                )}
                {loadingReplies && <div>Loading Replies...</div>}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullPost;
