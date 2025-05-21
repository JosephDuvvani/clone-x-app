import { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) navigate("/home", { replace: true });
  }, [user?.id]);

  return (
    <div>
      <div>
        <Link to={"/signup"}>Create account</Link>
        <Link to={"/login"}>Sign in</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Auth;
