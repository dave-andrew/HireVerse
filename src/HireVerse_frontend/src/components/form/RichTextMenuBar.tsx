import React from "react";
import { Editor } from "@tiptap/react";
import { IoCodeSlashOutline } from "react-icons/io5";
import { GoListOrdered, GoListUnordered } from "react-icons/go";

interface Props {
    editor: Editor | null;
}

export default function RichTextMenuBar({ editor }: Props) {
    if (!editor) {
        return null;
    }
    return (
        <div className="flex h-fit min-w-[25rem] flex-row justify-between gap-1 rounded-md border-[1px] border-gray-200 bg-white p-2 shadow-md">
            <div className="flex flex-row">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`flex aspect-square min-w-8 flex-row items-center justify-center rounded-md border-[1px] border-gray-200 ${
                        editor.isActive("bold") ? "bg-signature-gray font-bold" : ""
                    }`}>
                    B
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`flex aspect-square min-w-8 flex-row items-center justify-center rounded-md border-[1px] border-gray-200 italic ${
                        editor.isActive("italic") ? "bg-signature-gray font-bold" : ""
                    }`}>
                    I
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={`flex aspect-square min-w-8 flex-row items-center justify-center rounded-md border-[1px] border-gray-200 line-through ${
                        editor.isActive("strike") ? "bg-signature-gray font-bold" : ""
                    }`}>
                    S
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={`flex aspect-square min-w-8 flex-row items-center justify-center rounded-md border-[1px] border-gray-200 underline ${
                        editor.isActive("underline") ? "bg-signature-gray font-bold" : ""
                    }`}>
                    U
                </button>
            </div>
            <div className="flex flex-row">
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`flex aspect-square min-w-8 flex-row items-center justify-center rounded-md border-[1px] border-gray-200 text-sm ${
                        editor.isActive("heading", { level: 1 }) ? "bg-signature-gray font-bold" : ""
                    }`}>
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`flex aspect-square min-w-8 flex-row items-center justify-center rounded-md border-[1px] border-gray-200 text-sm ${
                        editor.isActive("heading", { level: 2 }) ? "bg-signature-gray font-bold" : ""
                    }`}>
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`flex aspect-square min-w-8 flex-row items-center justify-center rounded-md border-[1px] border-gray-200 text-sm ${
                        editor.isActive("heading", { level: 3 }) ? "bg-signature-gray font-bold" : ""
                    }`}>
                    H3
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={`aspect-square h-auto w-fit rounded-md border-[1px] border-gray-200 p-2 text-sm ${
                        editor.isActive("heading", { level: 4 }) ? "bg-signature-gray font-bold" : ""
                    }`}>
                    H4
                </button>
            </div>
            <div className="flex flex-row">
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`flex aspect-square min-w-8 flex-row items-center justify-center rounded-md border-[1px] border-gray-200 ${
                        editor.isActive("bulletList") ? "bg-signature-gray font-bold" : ""
                    }`}>
                    <GoListUnordered />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`flex aspect-square min-w-8 flex-row items-center justify-center rounded-md border-[1px] border-gray-200 ${
                        editor.isActive("orderedList") ? "bg-signature-gray font-bold" : ""
                    }`}>
                    <GoListOrdered />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
                    className={`flex aspect-square min-w-8 flex-row items-center justify-center rounded-md border-[1px] border-gray-200 underline ${
                        editor.isActive("codeBlock") ? "bg-signature-gray font-bold" : ""
                    }`}>
                    <IoCodeSlashOutline />
                </button>
            </div>
        </div>
    );
}
