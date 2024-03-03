export default function handleKeyDown(
    key: string,
    target: string,
    callback: Function,
) {
    if (key === target) {
        console.log(key, target, callback);
        console.log("Keydown");
        callback();
    }
}
