import { useState } from "react";
import Modal from "./modal";
import ProfileEditor from "./profileEditor";
import Icon from "@mdi/react";
import { mdiClose, mdiLoading } from "@mdi/js";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [saveEdit, setSaveEdit] = useState(false);
  const navigate = useNavigate();

  return (
    <Modal>
      <div className="modal__content__edit-profile">
        <div className="modal__header">
          <button
            className="modal__close"
            aria-label="Close modal"
            onClick={() => navigate(-1)}
          >
            <Icon path={mdiClose} size={1} />
          </button>

          <div className="modal__title">
            <h2>Edit profile</h2>
          </div>

          <button onClick={() => setSaveEdit(true)}>Save</button>
        </div>
        <ProfileEditor saveEdit={saveEdit} savingEdit={setSaveEdit} />
      </div>
      {saveEdit && (
        <div className="modal">
          <div className="loading-icon">
            <Icon path={mdiLoading} size={1.5} />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditProfile;
