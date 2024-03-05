interface Props {
    value: number;
    text: string;
}

export default function RatingBar({ value, text }: Props) {
    const getBarColor = (value: number) => {
        if (value < 2.5) return "bg-red-500";
        if (value < 3.75) return "bg-[rgb(252,200,43)]";
        if (value <= 5) return "bg-green-500";
        return "bg-green-500";
    };

    return (
        <div>
            <div className="flex w-full flex-row justify-between">
                <div className="mb-1 text-base font-medium">{text}</div>
                <div className="mb-1 text-base font-bold">{value.toFixed(1)}/5</div>
            </div>
            <div className="mb-4 h-2 w-full rounded-full bg-gray-200">
                <div
                    className={`${getBarColor(value)} h-2 rounded-full`}
                    style={{ width: `${(value / 5) * 100}%` }}
                />
            </div>
        </div>
    );
}
