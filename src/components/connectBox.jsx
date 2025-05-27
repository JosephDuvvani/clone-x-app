import { useContext, useEffect, useState } from "react";
import api from "../config/api.config";
import UserContext from "../context/userContext";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { Link } from "react-router-dom";
import FollowButton from "./followButton";

const ConnectBox = () => {
  const [connects, setConnects] = useState();
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

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
    <div>
      {loading && (
        <div className="loading">
          <Icon path={mdiLoading} size={1.5} />
        </div>
      )}
      {connects && (
        <>
          <div>
            <h3>Who to follow</h3>
          </div>
          {connects.length > 0 && (
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
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ConnectBox;
