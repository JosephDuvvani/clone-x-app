import { useContext, useEffect, useState } from "react";
import {
  Link,
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

const Profile = () => {
  const { user } = useContext(UserContext);
  const { userInfo: info, setUserInfo } = useContext(ProfileContext);
  const { authUserInfo } = useContext(UserContext);
  const [loadingInfo, setLoadingInfo] = useState(false);

  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  let userInfo = info;

  if (username === authUserInfo.username) userInfo = authUserInfo;

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
        <div style={{ maxWidth: "600px", borderInline: "1px solid lightgrey" }}>
          {loadingInfo && <div>Loading Info...</div>}
          <div>
            <div>
              <button aria-label="back" onClick={() => navigate(-1)}>
                <Icon path={mdiArrowLeft} size={1} />
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
              <div>{userInfo?._count.posts} posts</div>
            </div>
          </div>

          <div>
            <>
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

                <div>
                  <div className="picture">
                    <img
                      src={
                        userInfo?.profile.pictureUrl ||
                        import.meta.env.VITE_DEFAULT_PICTURE250
                      }
                      alt=""
                    />
                  </div>
                  {userInfo.username === user.username && (
                    <div>
                      <button onClick={openModal}>Edit profile</button>
                    </div>
                  )}
                </div>

                <div>
                  <div>
                    {`${userInfo?.profile.firstname} ${
                      userInfo?.profile.lastname || ""
                    }`.trim()}
                  </div>
                  <div>@{userInfo?.username}</div>
                </div>

                {userInfo.profile.bio && (
                  <div>
                    {parse(generateHTML(userInfo.profile.bio, [StarterKit]))}
                  </div>
                )}

                <div>
                  <div>
                    <Icon path={mdiCalendarMonthOutline} size={1} />
                    <span>
                      Joined {format(userInfo?.createdAt, "MMM yyyy")}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <Link>
                    <span>{userInfo._count.following}</span> Following
                  </Link>
                  <Link>
                    <span>{userInfo._count.followedBy}</span> Followers
                  </Link>
                </div>
              </div>
            </>

            <div>
              <nav>
                <Link to={`/${username}`}>Posts</Link>
                {userInfo?.username === user.username && (
                  <Link to={"likes"}>Likes</Link>
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
