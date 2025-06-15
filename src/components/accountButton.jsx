import { useContext } from "react";
import UserContext from "../context/userContext";
import Icon from "@mdi/react";
import { mdiDotsHorizontal } from "@mdi/js";

const AccountButton = ({ setShow }) => {
  const { user } = useContext(UserContext);

  return (
    <>
      <div>
        <div>
          <button className="account-menu-btn" onClick={() => setShow(true)}>
            <div className="flex picture picture--small">
              <img
                src={
                  user.profile.pictureUrl ||
                  import.meta.env.VITE_DEFAULT_PICTURE68
                }
                alt=""
              />
            </div>
            <div className="account-menu__names">
              <div className="flex">
                <span className="ellipsis">
                  {`${user.profile.firstname} ${
                    user.profile.lastname || ""
                  }`.trim()}
                </span>
              </div>
              <div className="flex account-menu__username">
                <span className="ellipsis">@{user.username}</span>
              </div>
            </div>
            <div>
              <Icon path={mdiDotsHorizontal} size={0.85} />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountButton;
