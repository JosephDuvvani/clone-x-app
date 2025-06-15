import { useContext, useEffect, useState } from "react";
import api from "../config/api.config";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiLoading } from "@mdi/js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Users from "../components/connectUsers";
import UserContext from "../context/userContext";

const Followers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useParams();
  const { user: authUser } = useContext(UserContext);

  const [user, setUser] = useState(location.state?.userInfo);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authUser) navigate("/", { replace: true });
    else {
      setLoading(true);
      if (!user && username !== authUser.username) {
        api
          .get(`users/${username}`)
          .then((res) => setUser(res.data.userInfo))
          .catch((error) =>
            console.error(error.response?.data.message || error)
          );
      }
      api
        .get(`users/${username}/followers?limit=50`)
        .then((res) => setFollowers(res.data.followers))
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
            <div>
              <h2>
                {`${user.profile.firstname} ${
                  user.profile.lastname || ""
                }`.trim()}
              </h2>
              <div className="dim-text">@{user.username}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile">
        <section>
          <div className="flex jst-c" style={{ padding: "16px" }}>
            <h2>Followers</h2>
          </div>
          {loading && (
            <div className="loading">
              <div className="loading__spinner">
                <Icon path={mdiLoading} size={1.5} />
              </div>
            </div>
          )}
          {followers.length > 0 ? (
            <div>
              <Users connects={followers} setConnects={setFollowers} />
            </div>
          ) : (
            <div className="content-empty">
              <div>No followers</div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Followers;
