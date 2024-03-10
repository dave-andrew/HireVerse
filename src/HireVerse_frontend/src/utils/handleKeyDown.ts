export default function handleKeyDown(key: string, target: string, callback: Function) {
    if (key === target) {
        callback();
    }
}
