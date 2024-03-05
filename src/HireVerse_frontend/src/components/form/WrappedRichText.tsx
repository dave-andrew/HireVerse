import { BubbleMenu, Editor, EditorContent } from "@tiptap/react";
import React, { Fragment } from "react";
import RichTextMenuBar from "./RichTextMenuBar";

interface Props {
    className?: string;
    editor: Editor | null;
    placeholder?: string;
}

export default function WrappedRichText({
    className,
    editor,
    placeholder,
}: Props) {
    return (
        <>
            <EditorContent
                className={className}
                editor={editor}
                placeholder={placeholder}
            />
            <BubbleMenu
                className="w-full"
                editor={editor!}>
                <RichTextMenuBar editor={editor} />
            </BubbleMenu>
        </>
    );
}
