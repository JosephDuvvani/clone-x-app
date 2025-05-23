import { useState } from "react";
import api from "../config/api.config";
import TextArea from "./textarea";
import { isEmpty } from "../lib/textAreaUtils";

const CreatePost = () => {
  const [body, setBody] = useState("");

  const handleChange = ({ editor }) => {
    setBody(editor.getJSON());
  };

  const handlePost = () => {
    if (isEmpty(body)) return;
    api
      .post("posts", { body })
      .then((res) => {
        setBody();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <TextArea handleChange={handleChange} content={body} />
      <button onClick={handlePost} disabled={isEmpty(body)}>
        Post
      </button>
    </div>
  );
};

export default CreatePost;
