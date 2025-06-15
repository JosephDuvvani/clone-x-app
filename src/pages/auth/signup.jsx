import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../config/api.config";
import Icon from "@mdi/react";
import { mdiClose, mdiLoading } from "@mdi/js";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    if (user) navigate("home", { replace: true });
  }, [user?.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .post("/auth/signup", {
        firstname,
        lastname,
        username,
        password,
      })
      .then((res) => setUser(res.data.user))
      .catch((error) => {
        setError(
          error.response.data.message
            ? error.response.data
            : error.response.data.errors[0]
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {!user && (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__content__auth">
              <div className="modal__header">
                <div className="flex-1">
                  <button
                    className="modal__close strip-btn flex algn-c"
                    aria-label="Close modal"
                    onClick={() =>
                      navigate(
                        backgroundLocation
                          ? `${backgroundLocation?.pathname}`
                          : -1
                      )
                    }
                  >
                    <Icon path={mdiClose} size={0.85} />
                  </button>
                </div>
                <div className="auth__logo--modal">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 195 171"
                    fill="none"
                  >
                    <path
                      d="M108.979 143.657L169.958 0H194.958L122.673 170.293H72.2852L0 0H48L108.979 143.657ZM82.6094 154.076H96.6094L38 16H24L82.6094 154.076Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="flex-1"></div>
              </div>
              <div className="modal__main">
                <div>
                  <div style={{ marginBottom: "16px" }}>
                    <h1>
                      <span>Create your account</span>
                    </h1>
                  </div>

                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="input-wrapper input-wrapper--auth">
                        <div className="placeholder">
                          {" "}
                          <span>Firstname</span>
                        </div>
                        <input
                          className="input"
                          type="text"
                          name="firstname"
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-wrapper input-wrapper--auth">
                        <div className="placeholder">
                          <span>Lastname</span>
                        </div>
                        <input
                          className="input"
                          type="text"
                          name="lastname"
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                        />
                      </div>
                      <div className="input-wrapper input-wrapper--auth">
                        <div className="placeholder">
                          <span>Username</span>
                        </div>
                        <input
                          className="input"
                          type="text"
                          name="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-wrapper input-wrapper--auth">
                        <div className="placeholder">
                          <span>Password</span>
                        </div>
                        <input
                          className="input"
                          type="password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        className="btn auth-btn auth-btn--white"
                        style={{ marginBlock: "16px" }}
                      >
                        {loading ? (
                          <div className="loading">
                            <div className="loading__spinner">
                              <Icon path={mdiLoading} size={0.85} />
                            </div>
                          </div>
                        ) : (
                          "Sign up"
                        )}
                      </button>
                      {error && (
                        <div className="auth__error">
                          {error.message || error.msg}
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
