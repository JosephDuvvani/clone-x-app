import { Link } from "react-router-dom";
import PostActions from "./postActions";
import { format } from "date-fns";
import StarterKit from "@tiptap/starter-kit";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";

const ActivePost = ({ post, updatePost }) => {
  const author = post.author;

  return (
    <article>
      <div>
        <div>
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
            </div>
            <div>
              <Link
                to={`/${author.username}`}
                onClick={(e) => e.stopPropagation()}
                state={{ userInfo: author }}
              >
                <span> @{author.username}</span>
              </Link>
            </div>
          </div>
        </div>
        <div>{parse(generateHTML(post.body, [StarterKit]))}</div>
        <div>
          <span> {format(post.createdAt, "h:mm a MMM dd, yyyy")}</span>
        </div>
        <div>
          <PostActions post={post} updatePost={updatePost} />
        </div>
      </div>
    </article>
  );
};

export default ActivePost;
