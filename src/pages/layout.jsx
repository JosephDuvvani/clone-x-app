import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserProvider } from "../context/userContext";
import api from "../config/api.config";
import "../assets/styles/layout.css";
import MainContent from "../components/mainContent";
import Header from "../components/header";
import ConnectBox from "../components/connectBox";
import AppRoutes from "../routes/routes";
import { PostProvider } from "../context/postContext";

const Layout = () => {
  const [user, setUser] = useState();
  const [authUserInfo, setAuthUserInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [followingPosts, setFollowingPosts] = useState();

  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;

  useEffect(() => {
    if (!user) {
      api
        .get("/auth/me")
        .then((res) => setUser(res.data.user))
        .catch(() => {
          setUser(null);
          setLoading(false);
        });
    } else if (!authUserInfo) {
      api
        .get(`users/${user.username}`)
        .then((res) => setAuthUserInfo(res.data.userInfo))
        .catch((error) => error.response?.data.message || error)
        .finally(() => setLoading(false));
      api
        .get(`users/${user.username}/following_posts?limit=30`)
        .then((res) => setFollowingPosts(res.data.posts))
        .catch((error) => console.error(error.response?.data.message || error))
        .finally(() => setLoadingPosts(false));
    }
  }, [user?.id]);
  return (
    <div className="layout">
      <UserProvider
        value={{
          user,
          setUser,
          authUserInfo,
          setAuthUserInfo,
          followingPosts,
          setFollowingPosts,
          loadingPosts,
        }}
      >
        {!loading && (
          <>
            {user && <Header />}
            <main className="main">
              <MainContent>
                <div
                  className={
                    location.pathname === "/" ||
                    backgroundLocation?.pathname === "/"
                      ? "main__content main__content--auth"
                      : "main__content"
                  }
                >
                  <PostProvider>
                    <div className={user ? "main__outlet" : "flex flex-1"}>
                      <AppRoutes />
                    </div>
                  </PostProvider>

                  {user &&
                    !(
                      location.pathname === "/connect_people" ||
                      backgroundLocation?.pathname === "/connect_people"
                    ) && (
                      <aside className="aside">
                        <div className="aside__main">
                          <ConnectBox />
                        </div>
                      </aside>
                    )}
                </div>
              </MainContent>
            </main>
          </>
        )}
        {loading && (
          <div className="modal" style={{ backgroundColor: "var(--bg)" }}>
            <div className="modal__content" style={{ borderRadius: "0" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 195 171"
                fill="none"
                style={{ width: "4rem", height: "4rem" }}
              >
                <path
                  d="M108.979 143.657L169.958 0H194.958L122.673 170.293H72.2852L0 0H48L108.979 143.657ZM82.6094 154.076H96.6094L38 16H24L82.6094 154.076Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        )}
      </UserProvider>
    </div>
  );
};

export default Layout;
