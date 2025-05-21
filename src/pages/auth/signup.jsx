import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import api from "../../config/api.config";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) navigate("home", { replace: true });
  }, [user?.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("/auth/signup", {
        firstname,
        lastname,
        username,
        password,
      })
      .then((res) => setUser(res.data.user))
      .catch((error) => {
        setError(
          error.response.data.message
            ? error.response.data
            : error.response.data.errors[0]
        );
      });
  };

  return (
    <>
      {!user && (
        <form onSubmit={handleSubmit}>
          <div>
            <span>Firstname</span>
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div>
            <span>Lastname</span>
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <span>Username</span>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button>Log In</button>
          {error && <div>{error.message || error.msg}</div>}
        </form>
      )}
    </>
  );
};

export default Signup;
