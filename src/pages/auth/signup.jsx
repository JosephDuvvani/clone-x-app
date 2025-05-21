import { useContext, useState } from "react";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiURL = import.meta.env.VITE_CLONE_X_API_URL;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        password,
      }),
    };

    fetch(`${apiURL}/auth/signup`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.user) {
          setUser(data.user);
          navigate("/", { replace: true });
        }
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
              value={username}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div>
            <span>Lastname</span>
            <input
              type="text"
              name="lastname"
              value={username}
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
        </form>
      )}
    </>
  );
};

export default Signup;
