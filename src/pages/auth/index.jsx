import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import SignUpWithGithub from "./components/signupGithub";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) navigate("/home", { replace: true });
  }, [user?.id]);

  const openSignUpModal = () => {
    navigate("/signup", { state: { backgroundLocation: location } });
  };

  const openSignInModal = () => {
    navigate("/login", { state: { backgroundLocation: location } });
  };

  return (
    <div className="auth-container">
      <div className="flex flex-col flex-1 auth__logo-container">
        <svg
          className="auth__logo"
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
      <div className="auth__content">
        <div className="auth__main">
          <svg
            className="auth__logo--small"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 195 171"
            fill="none"
          >
            <path
              d="M108.979 143.657L169.958 0H194.958L122.673 170.293H72.2852L0 0H48L108.979 143.657ZM82.6094 154.076H96.6094L38 16H24L82.6094 154.076Z"
              fill="white"
            />
          </svg>

          <div
            className="auth__heading"
            style={{ color: "rgb(231, 233, 234)" }}
          >
            <span>Happening now</span>
          </div>
          <div
            className="auth__caption"
            style={{ color: "rgb(231, 233, 234)" }}
          >
            <span>Join today</span>
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <SignUpWithGithub />
              <div>
                <div className="flex algn-c">
                  <div className="flex-1">
                    <div className="line-1"></div>
                  </div>
                  <div style={{ padding: "12px" }}>
                    <span>OR</span>
                  </div>
                  <div className="flex-1">
                    <div className="line-1"></div>
                  </div>
                </div>
              </div>
              <div>
                <button className="auth-btn" onClick={openSignUpModal}>
                  Create account
                </button>
              </div>
              <div style={{ marginTop: "40px" }}>
                <div className="flex flex-col algn-c">
                  <span>Already have an account?</span>
                </div>
                <div style={{ marginTop: "12px" }}>
                  <button
                    className="auth-btn auth-btn--hollow"
                    onClick={openSignInModal}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Auth;
