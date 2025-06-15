import { useContext, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import api from "../../config/api.config";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiCalendarMonthOutline } from "@mdi/js";
import ProfileContext from "../../context/profileContext";
import UserContext from "../../context/userContext";
import { format } from "date-fns";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";
import "../../assets/styles/profile.css";
import StarterKit from "@tiptap/starter-kit";
import FollowButton from "../../components/followButton";

const Profile = () => {
  const { user } = useContext(UserContext);
  const { userInfo: info, setUserInfo } = useContext(ProfileContext);
  const { authUserInfo } = useContext(UserContext);
  const [loadingInfo, setLoadingInfo] = useState(false);

  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  let userInfo = info;

  if (username === authUserInfo?.username) userInfo = authUserInfo;

  useEffect(() => {
    if (!user) navigate("/", { replace: true });
    else if (!userInfo || userInfo.username !== username) {
      setLoadingInfo(true);
      api
        .get(`users/${username}`)
        .then((res) => setUserInfo(res.data.userInfo))
        .catch((error) => console.error(error.response.data.message))
        .finally(() => setLoadingInfo(false));
    }
  }, [user?.id, username]);

  const openModal = () => {
    navigate("/settings/profile", { state: { backgroundLocation: location } });
  };

  return (
    <>
      {user && userInfo && (
        <div>
          {loadingInfo && <div>Loading Info...</div>}
          <div className="main__content__header">
            <div>
              <button
                className="strip-btn"
                aria-label="back"
                onClick={() => navigate(-1)}
              >
                <Icon path={mdiArrowLeft} size={0.85} />
              </button>
            </div>
            <div>
              <div>
                <h2>
                  {`${userInfo?.profile.firstname} ${
                    userInfo?.profile.lastname || ""
                  }`.trim()}
                </h2>
              </div>
              <div className="dim-text" style={{ fontSize: "14px" }}>
                {userInfo?._count.posts} posts
              </div>
            </div>
          </div>

          <div className="profile">
            <div>
              <div className="pos-rel">
                <div>
                  <div
                    style={{ width: "100%", paddingBottom: "33.333%" }}
                  ></div>
                </div>
                <div className="banner">
                  {userInfo?.profile.bannerUrl && (
                    <img src={userInfo.profile.bannerUrl || ""} alt="" />
                  )}
                </div>
              </div>

              <div style={{ padding: "12px 16px 0", marginBottom: "16px" }}>
                <div className="flex spc-btwn">
                  <div className="picture profile__picture">
                    <img
                      src={
                        userInfo?.profile.pictureUrl ||
                        import.meta.env.VITE_DEFAULT_PICTURE250
                      }
                      alt=""
                    />
                  </div>

                  {userInfo.username === user.username ? (
                    <div>
                      <button
                        className="strip-btn hollow-btn"
                        onClick={openModal}
                      >
                        Edit profile
                      </button>
                    </div>
                  ) : (
                    <div>
                      <FollowButton user={userInfo} setUserInfo={setUserInfo} />
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <h2>
                    {`${userInfo?.profile.firstname} ${
                      userInfo?.profile.lastname || ""
                    }`.trim()}
                  </h2>
                  <div className="dim-text">@{userInfo?.username}</div>
                </div>

                {userInfo.profile.bio && (
                  <div
                    className="post__content"
                    style={{ marginBottom: "12px" }}
                  >
                    {parse(generateHTML(userInfo.profile.bio, [StarterKit]))}
                  </div>
                )}

                <div style={{ marginBottom: "12px" }}>
                  <div className="dim-text flex algn-c">
                    <Icon path={mdiCalendarMonthOutline} size={0.85} />
                    <div style={{ marginLeft: "6px" }}>
                      <span>
                        Joined {format(userInfo?.createdAt, "MMM yyyy")}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex">
                    <div style={{ marginRight: "20px", fontWeight: "400" }}>
                      <Link
                        to={`following`}
                        state={{ userInfo }}
                        className="hov-undrln"
                      >
                        <span>{userInfo._count.following}</span>
                        <span className="dim-text"> Following</span>
                      </Link>
                    </div>
                    <div>
                      <Link
                        to={`followers`}
                        state={{ userInfo }}
                        className="hov-undrln"
                      >
                        <span>{userInfo._count.followedBy}</span>
                        <span className="dim-text"> Followers</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <nav className="profile__nav">
                <NavLink
                  to={`/${username}`}
                  className={({ isActive }) =>
                    isActive
                      ? "profile__nav__link active"
                      : "profile__nav__link"
                  }
                  end
                >
                  <div className="nav__link__content">
                    <span>Posts</span>
                    <div className="active__base"></div>
                  </div>
                </NavLink>
                {userInfo?.username === user.username && (
                  <NavLink
                    to={"likes"}
                    className={({ isActive }) =>
                      isActive
                        ? "profile__nav__link active"
                        : "profile__nav__link"
                    }
                  >
                    <div className="nav__link__content">
                      <span>Likes</span>
                      <div className="active__base"></div>
                    </div>
                  </NavLink>
                )}
              </nav>
            </div>

            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
