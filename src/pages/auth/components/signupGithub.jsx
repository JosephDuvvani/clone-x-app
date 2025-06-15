import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";

const SignUpWithGithub = () => {
  const handleSignup = () => {
    window.location.href = "http://localhost:3000/auth/github";
  };

  return (
    <div>
      <button className="btn auth-btn auth-btn--white" onClick={handleSignup}>
        <div>Sign up with Github</div>
        <div>
          <Icon path={mdiGithub} />
        </div>
      </button>
    </div>
  );
};

export default SignUpWithGithub;
