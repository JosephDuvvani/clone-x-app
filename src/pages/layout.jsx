import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../context/userContext";
import api from "../config/api.config";
import "../assets/styles/layout.css";
import MainContent from "../components/mainContent";
import Header from "../components/header";

const Layout = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="layout">
      <UserProvider value={{ user, setUser }}>
        {!loading && (
          <>
            {user && <Header />}
            <main className="main">
              <MainContent>
                <div className="main__content">
                  <Outlet />
                  <div></div>
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
