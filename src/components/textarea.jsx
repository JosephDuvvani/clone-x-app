import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { isEmpty } from "../lib/textAreaUtils";

const extensions = [StarterKit];

const TextArea = ({ handleChange, content }) => {
  const editor = useEditor({
    extensions,
    content,
    onUpdate: handleChange,
    editorProps: {
      attributes: {
        class: "textEditor",
      },
    },
  });

  useEffect(() => {
    if (!content && content !== "") editor.commands.clearContent();
  }, [isEmpty(content)]);

  return <EditorContent editor={editor} />;
};

export default TextArea;
