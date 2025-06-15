import { mdiGithub } from "@mdi/js";
import Icon from "@mdi/react";

const LoginWithGithub = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/github";
  };

  return (
    <div>
      <button className="btn auth-btn auth-btn--white" onClick={handleLogin}>
        <div>Sign in with Github</div>
        <div>
          <Icon path={mdiGithub} />
        </div>
      </button>
    </div>
  );
};

export default LoginWithGithub;
