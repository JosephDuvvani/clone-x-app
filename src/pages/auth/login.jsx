import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../config/api.config";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import LoginWithGithub from "./components/loginGithub";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

    api
      .post("/auth/login", { username, password })
      .then((res) => {
        if (res.statusText == "OK") {
          setUser(res.data.user);
        }
      })
      .catch((error) => {
        setError(
          error.response.data.message
            ? error.response.data
            : error.response.data.errors[0]
        );
      });
  };

  const openSignUpModal = (e) => {
    e.preventDefault();
    navigate("/signup", {
      state: {
        backgroundLocation: backgroundLocation || location,
      },
    });
  };

  return (
    <>
      {!user && (
        <div className="modal">
          <div className="modal__content modal__content--auth">
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
                      <span>Sign in to V</span>
                    </h1>
                  </div>
                  <div>
                    <LoginWithGithub />
                  </div>
                  <div>
                    <div className="flex algn-c">
                      <div className="flex-1">
                        <div className="line-1"></div>
                      </div>
                      <div style={{ padding: "4px", marginBlock: "8px" }}>
                        <span>OR</span>
                      </div>
                      <div className="flex-1">
                        <div className="line-1"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <form onSubmit={handleSubmit} className="auth-form">
                      <div>
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
                      </div>
                      <div>
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
                      </div>
                      <button
                        className="btn auth-btn auth-btn--white"
                        style={{ marginBlock: "16px" }}
                      >
                        Sign in
                      </button>
                      {error && (
                        <div className="auth__error">
                          {error.message || error.msg}
                        </div>
                      )}
                    </form>
                  </div>
                  <div>
                    <span className="dim-text">Don't have an account? </span>
                    <Link to={"/signup"} onClick={openSignUpModal}>
                      Sign up
                    </Link>
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

export default Login;
