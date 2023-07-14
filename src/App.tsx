import { BubbleMenu, useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import { LinkActionsMenu } from "./LinkMenu/LinkActionsMenu";
import "./App.css";

const initialContent = `
<p>
  Wow, this editor has support for links to the whole <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. We tested a lot of URLs and I think you can add *every URL* you want. Isn't that cool? Let's try <a href="https://statamic.com/">another one!</a> Yep, seems to work.
</p>
<p>
  By default every link will get a <code>rel="noopener noreferrer nofollow"</code> attribute. It's configurable though.
</p>`;

function App() {
  const editor = useEditor({
    extensions: [
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      StarterKit,
    ],
    content: initialContent,
  });

  return (
    <div className="editor-container">
      {editor && (
        <LinkActionsMenu editor={editor} className="link-actions-menu" />
      )}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <button onClick={() => console.log("clicked bold!")}>bold</button>
          <button onClick={() => console.log("clicked italic!")}>italic</button>
          <button onClick={() => console.log("clicked strike!")}>strike</button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}

export default App;
