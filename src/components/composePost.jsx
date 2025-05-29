import { useNavigate } from "react-router-dom";
import CreatePost from "./createPost";
import Modal from "./modal";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

const ComposePost = () => {
  const navigate = useNavigate();

  return (
    <Modal contentStyle={{ top: "5%", transform: "translate(-50%, 0)" }}>
      <div className="modal__content__compose-post">
        <div className="modal__header">
          <div>
            <button
              className="modal__close"
              aria-label="Close modal"
              onClick={() => navigate(-1)}
            >
              <Icon path={mdiClose} size={1} />
            </button>
          </div>
        </div>
        <div>
          <CreatePost />
        </div>
      </div>
    </Modal>
  );
};

export default ComposePost;
