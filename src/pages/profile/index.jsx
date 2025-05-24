import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import api from "../../config/api.config";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiCalendarMonthOutline } from "@mdi/js";
import ProfileContext from "../../context/profileContext";
import UserContext from "../../context/userContext";
import { format } from "date-fns";

const Profile = () => {
  const { user } = useContext(UserContext);
  const { posts, userInfo, setUserInfo } = useContext(ProfileContext);
  const [loadingInfo, setLoadingInfo] = useState(false);

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
      {user && (
        <div>
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
                  <div>
                    <div>
                      <div></div>
                    </div>
                    <div></div>
                  </div>

                  <div>
                    <div>
                      <img
                        src={
                          userInfo?.profile.pictureUrl ||
                          import.meta.env.VITE_DEFAULT_PICTURE250
                        }
                        alt=""
                      />
                    </div>
                  </div>

                  <div>
                    <div>
                      {`${userInfo?.profile.firstname} ${
                        userInfo?.profile.lastname || ""
                      }`.trim()}
                    </div>
                    <div>@{userInfo?.username}</div>
                  </div>

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
