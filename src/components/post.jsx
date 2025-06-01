import { format } from "date-fns";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link, useNavigate } from "react-router-dom";
import PostActions from "./postActions";

const Post = ({ post, updatePost }) => {
  const { author } = post;

  const navigate = useNavigate();

  const openPost = () => {
    navigate(`/post/${post.id}`, {
      state: { post },
    });
  };

  return (
    <>
      {post && (
        <article onClick={openPost}>
          <div className="flex">
            <div>
              <Link
                to={`/${author.username}`}
                onClick={(e) => e.stopPropagation()}
                state={{ userInfo: author }}
              >
                <div className="flex picture picture--small">
                  <img
                    src={
                      author.profile.pictureUrl ||
                      import.meta.env.VITE_DEFAULT_PICTURE68
                    }
                    alt=""
                  />
                </div>
              </Link>
            </div>
            <div>
              <div>
                <Link
                  to={`/${author.username}`}
                  onClick={(e) => e.stopPropagation()}
                  state={{ userInfo: author }}
                >
                  <span>
                    {`${author.profile.firstname} ${
                      author.profile.lastname || ""
                    }`.trim()}
                  </span>
                </Link>
                <Link
                  to={`/${author.username}`}
                  onClick={(e) => e.stopPropagation()}
                  state={{ userInfo: author }}
                >
                  <span> @{author.username}</span>
                </Link>

                <span> {format(post.createdAt, "MMM dd")}</span>
              </div>
              {post.replyTo && (
                <div>Replying to @{post.replyTo.author.username}</div>
              )}
              <div>{parse(generateHTML(post.body, [StarterKit]))}</div>
              <div>
                <PostActions post={post} updatePost={updatePost} />
              </div>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default Post;
