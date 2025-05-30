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
      <div>
        <div>
          <button aria-label="back" onClick={() => navigate(-1)}>
            <Icon path={mdiArrowLeft} size={1} />
          </button>
        </div>
        <div>
          <h2>Connect</h2>
        </div>
      </div>
      <section>
        <h2>Suggestions</h2>
        {loading && (
          <div className="loading">
            <Icon path={mdiLoading} size={1.5} />
          </div>
        )}
        {connects && connects.length > 0 && (
          <div>
            {connects.map((user) => (
              <div key={user.id}>
                <div>
                  <Link to={`/${user.username}`}>
                    <div className="picture">
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
                <div>
                  <div>
                    <div>
                      <div>
                        <Link to={`/${user.username}`}>
                          <span>
                            {`${user.profile.firstname} ${
                              user.profile.lastname || ""
                            }`.trim()}
                          </span>
                        </Link>
                      </div>
                      <div>
                        <Link to={`/${user.username}`}>
                          <span> @{user.username}</span>
                        </Link>
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
