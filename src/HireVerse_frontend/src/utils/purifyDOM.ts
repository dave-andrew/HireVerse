import DOMPurify from "dompurify";

export default function purifyDOM(html: string | null | undefined) {
    if (!html) return "";
    return DOMPurify.sanitize(html);
}
