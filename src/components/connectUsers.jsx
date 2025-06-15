import { Link, useNavigate } from "react-router-dom";
import FollowButton from "./followButton";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Users = ({ connects, setConnects }) => {
  const navigate = useNavigate();

  return (
    <>
      {connects.map((user) => (
        <div
          key={user.id}
          className="connect-box__account"
          onClick={() => navigate(`/${user.username}`)}
        >
          <div>
            <div className="picture picture--small">
              <img
                src={
                  user.profile.pictureUrl ||
                  import.meta.env.VITE_DEFAULT_PICTURE68
                }
                alt=""
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex">
              <div className="account-names flex-1">
                <Link
                  to={`/${user.username}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex fullname-link"
                >
                  <div className="flex account-name">
                    <span>
                      {`${user.profile.firstname} ${
                        user.profile.lastname || ""
                      }`.trim()}
                    </span>
                  </div>
                </Link>

                <div>
                  <div className="account-name dim-text">
                    <span> @{user.username}</span>
                  </div>
                </div>
              </div>
              <div>
                <FollowButton user={user} setConnects={setConnects} />
              </div>
            </div>
            <div style={{ paddingLeft: "12px" }}>
              {user.profile.bio && (
                <div>{parse(generateHTML(user.profile.bio, [StarterKit]))}</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Users;
