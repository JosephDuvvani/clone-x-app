import { useContext, useState } from "react";
import UserContext from "../../../context/userContext";
import api from "../../../config/api.config";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

const LoginGuest = () => {
  const [loading, setLoading] = useState();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const loginAsGuest = () => {
    setLoading(true);
    api
      .get("/auth/guest")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((error) => {
        navigate("/failure");
      })
      .finally(() => setLoading(false));
  };

  return (
    <button
      className="auth-btn auth-btn--green"
      onClick={loginAsGuest}
      disabled={loading}
    >
      {loading ? (
        <div className="loading">
          <div className="loading__spinner">
            <Icon path={mdiLoading} size={0.85} />
          </div>
        </div>
      ) : (
        "Continue as Guest"
      )}
    </button>
  );
};

export default LoginGuest;
