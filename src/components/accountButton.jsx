import { Link } from "react-router-dom";
import api from "../config/api.config";
import { useContext } from "react";
import UserContext from "../context/userContext";

const AccountButton = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogOut = (e) => {
    e.preventDefault();
    api
      .get("/auth/logout")
      .then((res) => setUser(null))
      .catch((error) => console.error(error.message));
  };
  return (
    <div>
      <div>
        <Link to={"/logout"} onClick={handleLogOut}>
          Log Out @{user.username}
        </Link>
      </div>
    </div>
  );
};

export default AccountButton;
