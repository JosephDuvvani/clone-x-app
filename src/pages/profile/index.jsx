import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import api from "../../config/api.config";
import Icon from "@mdi/react";
import {
  mdiArrowLeft,
  mdiCalendarMonthOutline,
  mdiClose,
  mdiLoading,
} from "@mdi/js";
import ProfileContext from "../../context/profileContext";
import UserContext from "../../context/userContext";
import { format } from "date-fns";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";
import "../../assets/styles/profile.css";
import ProfileEditor from "../../components/profileEditor";
import StarterKit from "@tiptap/starter-kit";

const Profile = () => {
  const { user } = useContext(UserContext);
  const { posts, userInfo, setUserInfo } = useContext(ProfileContext);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [saveEdit, setSaveEdit] = useState(false);

  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/", { replace: true });
    else if (!userInfo || userInfo.username !== username) {
      setLoadingInfo(true);
      api
        .get(`users/${username}?limit=10&offset=${posts?.length || 0}`)
        .then((res) => setUserInfo(res.data.userInfo))
        .catch((error) => console.error(error.message))
        .finally(() => setLoadingInfo(false));
    }
  }, [user?.id, username]);

  return (
    <>
      {showEdit && (
        <div className="modal">
          <div className="modal__content modal__content--edit-profile">
            <div>
              <div className="modal__header">
                <button
                  className="modal__close"
                  aria-label="Close modal"
                  onClick={() => setShowEdit(false)}
                >
                  <Icon path={mdiClose} size={1} />
                </button>

                <div className="modal__title">
                  <h2>Edit profile</h2>
                </div>

                <button onClick={() => setSaveEdit(true)}>Save</button>
              </div>
              <ProfileEditor
                showEdit={setShowEdit}
                saveEdit={saveEdit}
                savingEdit={setSaveEdit}
              />
            </div>
            {saveEdit && (
              <div className="modal">
                <div className="loading-icon">
                  <Icon path={mdiLoading} size={1.5} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {user && (
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
            {userInfo && (
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
                        <button onClick={() => setShowEdit(true)}>
                          Edit profile
                        </button>
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
            )}
            <div>
              <nav>
                <Link to={`/${username}`}>Posts</Link>
                <Link to={"likes"}>Likes</Link>
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
