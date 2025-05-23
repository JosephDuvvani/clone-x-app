import { mdiAccountOutline, mdiHomeVariant } from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import AccountButton from "./accountButton";
import { useContext } from "react";
import UserContext from "../context/userContext";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="header">
      <div>
        <div>
          <div>
            <h1>V</h1>
          </div>
          <nav>
            <Link to={"/home"}>
              <Icon path={mdiHomeVariant} size={1} />
              <span>Home</span>
            </Link>
            <Link to={`/${user.username}`}>
              <Icon path={mdiAccountOutline} size={1} />
              <span>Profile</span>
            </Link>
          </nav>
        </div>
        <AccountButton />
      </div>
    </header>
  );
};

export default Header;
