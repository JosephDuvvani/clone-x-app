import { Link } from "react-router-dom";
import PostActions from "./postActions";
import { format } from "date-fns";
import StarterKit from "@tiptap/starter-kit";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";

const ActivePost = ({ post, updatePost }) => {
  const author = post.author;

  return (
    <article className="post" style={{ cursor: "auto" }}>
      <div className="flex-1">
        <div className="flex">
          <div>
            <Link to={`/${author.username}`} state={{ userInfo: author }}>
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
          <div className="account-names">
            <div>
              <Link
                to={`/${author.username}`}
                onClick={(e) => e.stopPropagation()}
                state={{ userInfo: author }}
                className="fullname-link"
              >
                <span>
                  {`${author.profile.firstname} ${
                    author.profile.lastname || ""
                  }`.trim()}
                </span>
              </Link>
            </div>
            <div className="flex">
              <Link
                to={`/${author.username}`}
                onClick={(e) => e.stopPropagation()}
                state={{ userInfo: author }}
              >
                <div className="dim-text">
                  <span> @{author.username}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="post__content" style={{ marginTop: "8px" }}>
          {parse(generateHTML(post.body, [StarterKit]))}
        </div>
        <div style={{ marginBottom: "12px" }}>
          <span> {format(post.createdAt, "h:mm a MMM dd, yyyy")}</span>
        </div>
        <div className="line-1"></div>
        <div style={{ marginTop: "8px" }}>
          <PostActions post={post} updatePost={updatePost} />
        </div>
      </div>
    </article>
  );
};

export default ActivePost;
