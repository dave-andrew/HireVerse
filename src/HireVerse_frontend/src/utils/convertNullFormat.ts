export default function convertNullFormat<T>(
    value: T,
    defaultValue: T | null = null,
): [T] | [] {
    if (value === null) {
        return [];
    } else if (value === undefined) {
        return [];
    } else if (value === defaultValue) {
        return [];
    } else {
        return [value];
    }
}
