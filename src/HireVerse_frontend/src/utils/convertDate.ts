export enum DateFormat {
    DATE = "date",
    TIME = "time",
    YEAR = "year",
    MONTH = "month",
    DAY = "day",
}

export default function convertDate(date: number | BigInt, format: DateFormat) {
    const number = Number(date) / 1_000_000;
    const dateObj = new Date(number);

    if (format === DateFormat.DATE) {
        return dateObj.toDateString();
    }
    if (format === DateFormat.TIME) {
        return dateObj.toTimeString();
    }
    if (format === DateFormat.YEAR) {
        return dateObj.getFullYear().toString();
    }
    if (format === DateFormat.MONTH) {
        return dateObj.getMonth().toString();
    }
    if (format === DateFormat.DAY) {
        return dateObj.getDate().toString();
    }
    return dateObj.toLocaleString();
}
