import { useContext, useEffect, useState } from "react";
import api from "../config/api.config";
import UserContext from "../context/userContext";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiLoading } from "@mdi/js";
import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";
import FollowButton from "../components/followButton";
import StarterKit from "@tiptap/starter-kit";

const ConnectPeople = () => {
  const [connects, setConnects] = useState();
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/", { replace: true });
    else {
      setLoading(true);
      api
        .get(`users/${user.username}/notFollowing?limit=50`)
        .then((res) => setConnects(res.data.notFollowing))
        .catch((error) => console.error(error.response?.data.message || error))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div>
      <div className="main__content__header">
        <div className="flex algn-c">
          <div>
            <button
              aria-label="back"
              className="strip-btn flex"
              onClick={() => navigate(-1)}
            >
              <Icon path={mdiArrowLeft} size={0.85} />
            </button>
          </div>
          <div style={{ marginLeft: "16px" }}>
            <h2>Connect</h2>
          </div>
        </div>
      </div>
      <section>
        <div style={{ padding: "16px" }}>
          <h2>Suggestions</h2>
        </div>
        {loading && (
          <div className="loading">
            <Icon path={mdiLoading} size={1.5} />
          </div>
        )}
        {connects && connects.length > 0 && (
          <div>
            {connects.map((user) => (
              <div
                key={user.id}
                className="connect-box__account"
                onClick={() => navigate(`/${user.username}`)}
              >
                <div>
                  <Link to={`/${user.username}`}>
                    <div className="picture picture--small">
                      <img
                        src={
                          user.profile.pictureUrl ||
                          import.meta.env.VITE_DEFAULT_PICTURE68
                        }
                        alt=""
                      />
                    </div>
                  </Link>
                </div>
                <div className="flex-1">
                  <div className="flex">
                    <div className="account-names flex-1">
                      <Link
                        to={`/${user.username}`}
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
                  <div>
                    {user.profile.bio && (
                      <div>
                        {parse(generateHTML(user.profile.bio, [StarterKit]))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ConnectPeople;
