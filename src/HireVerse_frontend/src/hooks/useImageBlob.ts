import { useState } from "react";


export default function useImageBlob() {

   const convertImageToBlob = (file: File) => {
        return new Promise<Blob>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (typeof result === "string") {
                    fetch(result)
                        .then((res) => res.blob())
                        .then((blob) => {
                            resolve(blob);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
            };
            reader.readAsDataURL(file);
        });
    }

    const convertBlobToImage = (blob: Blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (typeof result === "string") {
                    resolve(result);
                }
            };
            reader.readAsDataURL(blob);
        });
    }

    return { convertImageToBlob, convertBlobToImage };
}