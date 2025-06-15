import { useState } from "react";
import api from "../config/api.config";

const FollowButton = ({ user, setConnects, setUserInfo }) => {
  const [loading, setLoading] = useState(false);

  const handleFollow = (e) => {
    e.stopPropagation();
    setLoading(true);
    api
      .post(`users/${user.username}/follow`)
      .then((res) =>
        setConnects
          ? setConnects((prev) =>
              prev.map((data) =>
                data.id === user.id
                  ? {
                      ...data,
                      connection: {
                        ...data.connection,
                        following: true,
                      },
                    }
                  : data
              )
            )
          : setUserInfo
          ? setUserInfo((prev) => ({
              ...prev,
              connection: {
                ...prev.connection,
                following: true,
              },
              _count: {
                ...prev._count,
                followedBy: prev._count.followedBy + 1,
              },
            }))
          : null
      )
      .catch((error) => console.error(error.response?.data.message || error))
      .finally(() => setLoading(false));
  };

  const handleUnfollow = (e) => {
    e.stopPropagation();
    setLoading(true);
    api
      .post(`users/${user.username}/unfollow`)
      .then((res) =>
        setConnects
          ? setConnects((prev) =>
              prev.map((data) =>
                data.id === user.id
                  ? {
                      ...data,
                      connection: {
                        ...data.connection,
                        following: false,
                      },
                    }
                  : data
              )
            )
          : setUserInfo
          ? setUserInfo((prev) => ({
              ...prev,
              connection: {
                ...prev.connection,
                following: false,
              },
              _count: {
                ...prev._count,
                followedBy: prev._count.followedBy - 1,
              },
            }))
          : null
      )
      .catch((error) => console.error(error.response?.data.message || error))
      .finally(() => setLoading(false));
  };

  return (
    <button
      className="btn btn--connect"
      onClick={user.connection.following ? handleUnfollow : handleFollow}
      disabled={loading}
      title={!loading && user.connection.following ? "Unfollow" : null}
    >
      {!loading && user.connection.followedBy
        ? "Follow back"
        : user.connection.following
        ? "Following"
        : "Follow"}
    </button>
  );
};

export default FollowButton;
