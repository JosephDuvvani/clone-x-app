import { useContext, useRef, useState } from "react";
import TextArea from "./textarea";
import api from "../config/api.config";
import UserContext from "../context/userContext";

const ProfileEditor = ({ saveEdit, savingEdit }) => {
  const { authUserInfo, setAuthUserInfo } = useContext(UserContext);
  const profile = authUserInfo?.profile;

  const [firstname, setFirstname] = useState(profile?.firstname || "");
  const [lastname, setLastname] = useState(profile?.lastname || "");
  const [bio, setBio] = useState(profile.bio || "");

  const pictureRef = useRef();
  const bannerRef = useRef();

  const username = authUserInfo.username;

  const handleChange = ({ editor }) => {
    setBio(editor.getJSON());
  };

  if (saveEdit) {
    const profileImage = pictureRef.current?.files[0];
    const bannerImage = bannerRef.current?.files[0];

    api
      .put(
        `users/${username}/profile`,
        {
          firstname,
          lastname,
          bio,
          profileImage: profileImage || null,
          bannerImage: bannerImage || null,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) =>
        setAuthUserInfo({ ...authUserInfo, profile: res.data.profile })
      )
      .catch((error) => console.log(error))
      .finally(() => {
        savingEdit(false);
      });
  }

  return (
    <div className="profile-editor">
      <div>
        <label>
          <div>Banner:</div>
          <input
            accept="image/jpeg, image/png, image/webp"
            type="file"
            name="bannerImage"
            ref={bannerRef}
          />
        </label>
        <div></div>
      </div>
      <div>
        <label>
          <div>Picture:</div>
          <input
            accept="image/jpeg, image/png, image/webp"
            type="file"
            name="profileImage"
            ref={pictureRef}
          />
        </label>
        <div></div>
      </div>
      <div>
        <label>
          <div>Firstname:</div>
          <input
            type="text"
            name="firstaname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            maxLength={20}
          />
        </label>
        <div></div>
      </div>
      <div>
        <label>
          <div>Lastname:</div>
          <input
            type="text"
            name="lastaname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            maxLength={20}
          />
        </label>
        <div></div>
      </div>
      <div>
        <div>
          <div>Bio:</div>
          <div>
            <TextArea handleChange={handleChange} content={bio} />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default ProfileEditor;
