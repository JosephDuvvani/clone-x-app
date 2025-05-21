import { useContext, useEffect } from "react";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/", { replace: true });
  }, [user?.id]);

  return (
    <>
      {user && (
        <>
          <div>{user.profile.firstname}'s Homepage</div>
        </>
      )}
    </>
  );
};

export default Homepage;
