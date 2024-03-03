import { BubbleMenu, Editor, EditorContent } from "@tiptap/react";
import React, { Fragment } from "react";
import RichTextMenuBar from "./RichTextMenuBar";

interface Props {
    className?: string;
    editor: Editor | null;
}

export default function WrappedRichText({ className, editor }: Props) {
    return (
        <>
            <EditorContent
                className={className}
                editor={editor}
            />
            <BubbleMenu
                className="w-full"
                editor={editor!}>
                <RichTextMenuBar editor={editor} />
            </BubbleMenu>
        </>
    );
}
