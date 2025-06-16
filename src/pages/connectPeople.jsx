import { useContext, useEffect, useState } from "react";
import api from "../config/api.config";
import UserContext from "../context/userContext";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiLoading } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import Users from "../components/connectUsers";

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
        {loading ? (
          <div className="loading posts-empty">
            <div className="loading__spinner">
              <Icon path={mdiLoading} />
            </div>
          </div>
        ) : (
          <>
            <div style={{ padding: "16px" }}>
              <h2>Suggestions</h2>
            </div>
            {connects && connects.length > 0 ? (
              <div>
                <Users connects={connects} setConnects={setConnects} />
              </div>
            ) : null}
          </>
        )}
      </section>
    </div>
  );
};

export default ConnectPeople;
