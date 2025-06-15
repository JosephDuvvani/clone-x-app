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
            className="modal__close strip-btn flex algn-c"
            aria-label="Close modal"
            onClick={() => navigate(-1)}
          >
            <Icon path={mdiClose} size={0.85} />
          </button>

          <div className="modal__title">
            <h2>Edit profile</h2>
          </div>

          <button
            className="btn"
            style={{ fontWeight: "400", fontSize: "15px", padding: "6px 16px" }}
            onClick={() => setSaveEdit(true)}
          >
            {saveEdit && (
              <div className="loading">
                <div className="loading__spinner">
                  <Icon path={mdiLoading} className="loading__icon" />
                </div>
              </div>
            )}{" "}
            <div className={saveEdit ? "btn-content-loading" : null}>Save</div>
          </button>
        </div>
        <ProfileEditor saveEdit={saveEdit} savingEdit={setSaveEdit} />
      </div>
    </Modal>
  );
};

export default EditProfile;
