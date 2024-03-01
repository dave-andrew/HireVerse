import useImageBlob from "../hooks/useImageBlob";

export default function imageHandler(
    image: File | string | number[] | null | undefined | Uint8Array,
) {
    const { convertBlobToImage } = useImageBlob();

    // console.log("imageHandler", image);
    if (!image) return undefined;
    if (image instanceof File) return URL.createObjectURL(image);
    if (image instanceof Uint8Array) return convertBlobToImage(image);
    if (typeof image === "string") return image;
    return convertBlobToImage(image);
}
