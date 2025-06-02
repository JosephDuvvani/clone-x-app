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
                <div className="main__content">
                  <PostProvider>
                    <AppRoutes />
                  </PostProvider>

                  {user &&
                    !(
                      location.pathname === "/connect_people" ||
                      backgroundLocation?.pathname === "/connect_people"
                    ) && (
                      <aside className="aside">
                        <div>
                          <ConnectBox />
                        </div>
                      </aside>
                    )}
                </div>
              </MainContent>
            </main>
          </>
        )}
        {loading && <div>Loading...</div>}
      </UserProvider>
    </div>
  );
};

export default Layout;
