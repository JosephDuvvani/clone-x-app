import { format } from "date-fns";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Icon from "@mdi/react";
import { mdiCommentOutline, mdiHeartOutline } from "@mdi/js";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const { author } = post;

  return (
    <>
      {post && (
        <div>
          <div>
            <Link to={`/${author.username}`} state={{ userInfo: author }}>
              <div>
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
              <Link to={`/${author.username}`} state={{ userInfo: author }}>
                <span>
                  {`${author.profile.firstname} ${
                    author.profile.lastname || ""
                  }`.trim()}
                </span>
              </Link>
              <Link to={`/${author.username}`} state={{ userInfo: author }}>
                <span> @{author.username}</span>
              </Link>

              <span> {format(post.createdAt, "MMM dd")}</span>
            </div>
            <div>{parse(generateHTML(post.body, [StarterKit]))}</div>
            <div>
              <div>
                <button
                  aria-label={`${post._count.comments} comments. Comment`}
                >
                  <Icon path={mdiCommentOutline} size={1} />
                  <span>{post._count.comments}</span>
                </button>
              </div>
              <div>
                <button aria-label={`${post._count.likes} likes. Like`}>
                  <Icon path={mdiHeartOutline} size={1} />
                  <span>{post._count.likes}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
