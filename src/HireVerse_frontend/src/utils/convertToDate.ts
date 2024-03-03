export default function convertToDate(date: number) {
    return new Date(date / 1000000);
}
