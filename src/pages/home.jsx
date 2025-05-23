import { useContext, useEffect } from "react";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import CreatePost from "../components/createPost";

const Homepage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/", { replace: true });
  }, [user?.id]);

  return (
    <>
      {user && (
        <div>
          <h3 aria-hidden>Following</h3>
          <CreatePost />
        </div>
      )}
    </>
  );
};

export default Homepage;
