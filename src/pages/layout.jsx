import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { UserProvider } from "../context/userContext";
import api from "../config/api.config";
import "../assets/styles/layout.css";
import MainContent from "../components/mainContent";
import Header from "../components/header";
import ConnectBox from "../components/connectBox";

const Layout = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [followingPosts, setFollowingPosts] = useState();

  const location = useLocation();

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="layout">
      <UserProvider
        value={{ user, setUser, followingPosts, setFollowingPosts }}
      >
        {!loading && (
          <>
            {user && <Header />}
            <main className="main">
              <MainContent>
                <div className="main__content">
                  <Outlet />
                  {user && !location.pathname.includes("connect_people") && (
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
