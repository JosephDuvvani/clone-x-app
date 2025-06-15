import { useContext, useEffect, useState } from "react";
import api from "../config/api.config";
import UserContext from "../context/userContext";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { Link, useNavigate } from "react-router-dom";
import FollowButton from "./followButton";

const ConnectBox = () => {
  const [connects, setConnects] = useState();
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const offset = Math.floor(Math.random() * 15);
    api
      .get(`users/${user.username}/notFollowing?limit=4&offset=${offset}`)
      .then((res) => setConnects(res.data.notFollowing))
      .catch((error) => console.error(error.response?.data.message || error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="connect-box">
      {loading && (
        <div className="loading">
          <Icon path={mdiLoading} size={1.5} />
        </div>
      )}
      {connects && (
        <>
          <div>
            <h3 className="connect-box__heading">Who to follow</h3>
          </div>
          {connects.length > 0 && (
            <ul>
              {connects.map((user) => (
                <li
                  key={user.id}
                  className="connect-box__account"
                  tabIndex={0}
                  onClick={() => navigate(`/${user.username}`)}
                >
                  <div>
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
                  </div>
                  <div className="account-main">
                    <div className="account-names">
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

                    <div style={{ flexShrink: "0", marginRight: "2px" }}>
                      <FollowButton user={user} setConnects={setConnects} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div style={{ padding: "12px 16px", color: "rgb(29, 155, 240)" }}>
            <Link to={"connect_people"}>Show more</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ConnectBox;
