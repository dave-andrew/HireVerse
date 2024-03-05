const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
];

export function convertTimeInterval(date: number | BigInt) {
    const number = Number(date) / 1_000_000;

    const seconds = Math.floor((Date.now() - number) / 1000);

    for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i];
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
        }
    }

    return "Just now";
}

const shortintervals = [
    { label: "Y", seconds: 31536000 },
    { label: "M", seconds: 2592000 },
    { label: "W", seconds: 604800 },
    { label: "D", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "m", seconds: 60 },
    { label: "s", seconds: 1 },
];

export function convertShortTimeInterval(date: number | BigInt) {
    const number = Number(date) / 1_000_000;

    const seconds = Math.floor((Date.now() - number) / 1000);

    for (let i = 0; i < shortintervals.length; i++) {
        const interval = shortintervals[i];
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count}${interval.label}`;
        }
    }

    return "Just now";
}
