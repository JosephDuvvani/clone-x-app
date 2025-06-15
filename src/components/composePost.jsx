import { Link, useLocation, useNavigate } from "react-router-dom";
import CreatePost from "./createPost";
import Modal from "./modal";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { format } from "date-fns";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const ComposePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state?.post;
  const author = post?.author;

  return (
    <Modal contentStyle={{ top: "5%", transform: "translate(-50%, 0)" }}>
      <div className="modal__content__compose-post">
        <div className="modal__header">
          <div>
            <button
              className="modal__close strip-btn flex"
              aria-label="Close modal"
              onClick={() => navigate(-1)}
            >
              <Icon path={mdiClose} size={0.85} />
            </button>
          </div>
        </div>
        {post && (
          <div>
            <article>
              <div
                className="post"
                style={{ borderBottomColor: "transparent" }}
              >
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
                <div className="flex-1">
                  <div>
                    <Link
                      to={`/${author.username}`}
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
                      state={{ userInfo: author }}
                    >
                      <span> @{author.username}</span>
                    </Link>

                    <span> {format(post.createdAt, "MMM dd")}</span>
                  </div>
                  <div>{parse(generateHTML(post.body, [StarterKit]))}</div>
                </div>
              </div>
            </article>
            <div style={{ marginLeft: "64px", marginBlock: "8px" }}>
              <span className="dim-text">Replying to</span> @
              {post.author.username}
            </div>
          </div>
        )}
        <div>
          <CreatePost />
        </div>
      </div>
    </Modal>
  );
};

export default ComposePost;
