export default function RatingBar() {
    const getBarColor = (value: number) => {
        if (value < 50) return "bg-red-500";
        if (value < 75) return "bg-yellow-200";
        if (value < 100) return "bg-green-500";
        return "bg-green-500";
    };

    return (
        <div>
            <div className="flex w-full flex-row justify-between">
                <div className="mb-1 text-base font-medium">Dark</div>
                <div className="mb-1 text-base font-bold">4.5</div>
            </div>
            <div className="mb-4 h-2 w-full rounded-full bg-gray-200">
                <div
                    className={`${getBarColor(10)} h-2 rounded-full`}
                    style={{ width: "10%" }}
                />
            </div>
        </div>
    );
}
