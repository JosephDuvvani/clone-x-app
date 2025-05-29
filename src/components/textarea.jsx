import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { isEmpty } from "../lib/textAreaUtils";
import { useLocation } from "react-router-dom";

const extensions = [StarterKit];

const TextArea = ({ handleChange, content }) => {
  const location = useLocation();

  const editor = useEditor({
    extensions,
    content,
    onUpdate: handleChange,
    editorProps: {
      attributes: {
        class: "textEditor",
      },
    },
    autofocus: location.pathname === "/compose/post" ? true : false,
  });

  useEffect(() => {
    if (!content && content !== "") editor.commands.clearContent();
  }, [isEmpty(content)]);

  return <EditorContent editor={editor} />;
};

export default TextArea;
