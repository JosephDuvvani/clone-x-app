import { mdiAccountOutline, mdiFeather, mdiHomeVariant } from "@mdi/js";
import Icon from "@mdi/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AccountButton from "./accountButton";
import { useContext, useState } from "react";
import UserContext from "../context/userContext";

const Header = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = () => {
    navigate("/compose/post", { state: { backgroundLocation: location } });
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    api
      .get("/auth/logout")
      .then((res) => setUser(null))
      .catch((error) => console.error(error.message));
  };

  return (
    <header className="header">
      <div className="header__content">
        <div>
          <h1 className="header__logo">
            <Link to={"/home"} aria-label="V" className="flex">
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
            </Link>
          </h1>
        </div>
        <div className="flex-1">
          <nav className="header__nav">
            <Link to={"/home"} aria-label="Home" className="header__nav__link">
              <div className="header__nav__content">
                <div className="flex">
                  <Icon path={mdiHomeVariant} className="nav__icon" />
                </div>
                <div className="header__nav__text">
                  <span>Home</span>
                </div>
              </div>
            </Link>
            <Link
              to={`/${user.username}`}
              aria-label="Profile"
              className="header__nav__link"
            >
              <div className="header__nav__content">
                <div className="flex">
                  <Icon path={mdiAccountOutline} className="nav__icon" />
                </div>
                <div className="header__nav__text">
                  <span>Profile</span>
                </div>
              </div>
            </Link>
          </nav>
          <div>
            <button
              className="header__post-btn"
              aria-label="Post"
              onClick={openModal}
            >
              <div className="post-btn__text">Post</div>
              <div className="post-btn__icon">
                <Icon path={mdiFeather} />
              </div>
            </button>
          </div>
        </div>
        <AccountButton setShow={setShowAccountMenu} />
      </div>
      {showAccountMenu && (
        <>
          <div
            className="overlay"
            onClick={() => setShowAccountMenu(false)}
          ></div>

          <div className="account-menu" onClick={(e) => e.stopPropagation()}>
            <Link
              to={"/logout"}
              className="account-menu__link"
              onClick={handleLogOut}
            >
              Log Out @{user.username}
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
