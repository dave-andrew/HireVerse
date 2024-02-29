export default function useImageBlob() {
    const convertImageToBlob = (file: File) => {
        return new Promise<number[]>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const blob = reader.result;

                const c = document.createElement("canvas");
                const ctx = c.getContext("2d");

                const img = new Image();
                img.onload = () => {
                    c.width = img.naturalWidth;
                    c.height = img.naturalHeight;
                    ctx?.drawImage(img, 0, 0);
                    c.toBlob(
                        async (blob) => {
                            const arrayBuffer = await blob?.arrayBuffer();
                            try {
                                console.log("Uploading...");
                                console.log([
                                    ...new Uint8Array(
                                        arrayBuffer as ArrayBuffer,
                                    ),
                                ]);
                                return resolve([
                                    ...new Uint8Array(
                                        arrayBuffer as ArrayBuffer,
                                    ),
                                ]);
                            } catch (e) {
                                console.error(e);
                            }
                        },
                        "image/jpeg",
                        0.75,
                    );
                };
                img.src = blob as string;
            };
            reader.readAsDataURL(file);
        });
    };

    const convertBlobToImageURL = (blob: number[] | Uint8Array) => {
        return URL.createObjectURL(
            new Blob([new Uint8Array(blob)], { type: "image/png" }),
        );
    };

    return { convertImageToBlob, convertBlobToImage: convertBlobToImageURL };
}