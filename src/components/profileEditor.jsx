import { useContext, useEffect, useRef, useState } from "react";
import TextArea from "./textarea";
import api from "../config/api.config";
import UserContext from "../context/userContext";
import Icon from "@mdi/react";
import { mdiCameraPlusOutline } from "@mdi/js";

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
      <div className="pos-rel">
        <div>
          <div>
            <div style={{ width: "100%", paddingBottom: "33.333%" }}></div>
          </div>
          <div className="banner">
            {profile.bannerUrl && <img src={profile.bannerUrl || ""} alt="" />}
          </div>
        </div>

        <div className="pos-abs-c flex flex-col">
          <div>
            <label class="profile-editor__file">
              <div className="flex">
                <Icon path={mdiCameraPlusOutline} size={0.85} />
              </div>
              <input
                className="input-file"
                accept="image/jpeg, image/png, image/webp"
                aria-label="Banner image"
                type="file"
                name="bannerImage"
                ref={bannerRef}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="picture profile__picture picture--edit pos-rel">
        <div className="pos-rel">
          <img
            src={profile.pictureUrl || import.meta.env.VITE_DEFAULT_PICTURE250}
            alt=""
          />
        </div>

        <div className="pos-abs-c">
          <label class="profile-editor__file">
            <div className="flex">
              <Icon path={mdiCameraPlusOutline} size={0.85} />
            </div>
            <input
              className="input-file"
              accept="image/jpeg, image/png, image/webp"
              aria-label="Profile picture"
              type="file"
              name="profileImage"
              ref={pictureRef}
            />
          </label>
        </div>
      </div>

      <div className="flex">
        <label className="input-wrapper">
          <div className="placeholder">Firstname</div>
          <input
            className="input"
            type="text"
            name="firstaname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            maxLength={20}
          />
        </label>
        <div></div>
      </div>
      <div className="flex">
        <label className="input-wrapper">
          <div className="placeholder">Lastname</div>
          <input
            className="input"
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
        <div className="input-wrapper">
          <div className="placeholder">Bio</div>
          <TextArea handleChange={handleChange} content={bio} />
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default ProfileEditor;
