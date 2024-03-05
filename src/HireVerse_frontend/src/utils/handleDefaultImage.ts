import { SyntheticEvent } from "react";

const defaultImage = "default/image.png";
export default function handleDefaultImage(
    e: SyntheticEvent<HTMLImageElement, Event>,
) {
    e.currentTarget.src = defaultImage;
}
