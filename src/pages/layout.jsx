import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../context/userContext";
import api from "../config/api.config";
import AccountButton from "../components/accountButton";

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
            {user && (
              <header>
                <AccountButton />
              </header>
            )}
            <main>
              <Outlet />
            </main>
          </>
        )}
        {loading && <div>Loading...</div>}
      </UserProvider>
    </div>
  );
};

export default Layout;
