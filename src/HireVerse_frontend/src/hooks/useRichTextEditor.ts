import { Extension, useEditor } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { PlaceholderOptions } from "@tiptap/extension-placeholder";

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ HTMLAttributes: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
    Underline.configure({ HTMLAttributes: { class: "underline" } }),
];

interface RichTextEditorProps {
    content?: string;
    addExtensions?: Extension<PlaceholderOptions, any>[];
}

export default function useRichTextEditor(
    { content, addExtensions }: RichTextEditorProps = {
        content: undefined,
        addExtensions: [],
    },
) {
    return useEditor({
        extensions: addExtensions
            ? [...extensions, ...addExtensions]
            : extensions,
        content,
    });
}
