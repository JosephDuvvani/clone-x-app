import { useState } from "react";
import api from "../config/api.config";

const FollowButton = ({ user, setConnects }) => {
  const [loading, setLoading] = useState(false);

  const handleFollow = () => {
    setLoading(true);
    api
      .post(`users/${user.username}/follow`)
      .then((res) =>
        setConnects((prev) =>
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
      )
      .catch((error) => console.error(error.response?.data.message || error))
      .finally(() => setLoading(false));
  };

  const handleUnfollow = () => {
    setLoading(true);
    api
      .post(`users/${user.username}/unfollow`)
      .then((res) =>
        setConnects((prev) =>
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
      )
      .catch((error) => console.error(error.response?.data.message || error))
      .finally(() => setLoading(false));
  };

  return (
    <button
      onClick={user.connection.following ? handleUnfollow : handleFollow}
      disabled={loading}
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
