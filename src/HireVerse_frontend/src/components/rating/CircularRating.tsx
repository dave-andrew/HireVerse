import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { TbTilde } from "react-icons/tb";

interface PieProps {
    percentage: number;
    hasReview?: boolean;
}

export default function CircularRating({ percentage, hasReview }: PieProps) {
    const getBarColor = (value: number) => {
        if (value < 50) return "#EF4444";
        if (value < 75) return "#FCC82B";
        if (value <= 100) return "#10B981";
        return "#10B981";
    };

    const getBorderColor = (value: number) => {
        if (value < 50) return "border-red-500";
        if (value < 75) return "border-yellow-500";
        if (value <= 100) return "border-green-500";
        return "border-green-500";
    };

    const getIcon = (value: number) => {
        if (value < 50) return <FaRegThumbsDown />;
        if (value < 75) return <TbTilde />;
        if (value <= 100) return <FaRegThumbsUp />;
        return <FaRegThumbsUp />;
    };

    const pct = cleanPercentage(percentage);
    return (
        <div className="relative">
            <svg
                width={200}
                height={200}>
                <g transform={`rotate(-90 100 100)`}>
                    <Circle
                        colour={"rgb(229, 231, 235, 0.5)"}
                        percentage={100}
                    />
                    <Circle
                        colour={getBarColor(pct)}
                        percentage={pct}
                    />
                </g>
                <Text percentage={pct} />
            </svg>
            {hasReview && (
                <div
                    className={`absolute rounded-full border-4 bg-white p-2 ${getBorderColor(pct)} bottom-[12.5%] right-[12.5%] text-lg`}>
                    {getIcon(pct)}
                </div>
            )}
        </div>
    );
}

const cleanPercentage = (percentage: number) => {
    const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
    const isTooHigh = percentage > 100;
    return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

interface CircleProps {
    colour: string;
    percentage: number;
}

const Circle = ({ colour, percentage }: CircleProps) => {
    const r = 70;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
    return (
        <circle
            r={r}
            cx={100}
            cy={100}
            fill="transparent"
            stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
            strokeWidth={"0.75rem"}
            strokeDasharray={circ}
            strokeDashoffset={percentage ? strokePct : 0}></circle>
    );
};

interface TextProps {
    percentage: number;
}

const Text = ({ percentage }: TextProps) => {
    return (
        <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fontSize={"1.5em"}>
            {percentage.toFixed(0)}%
        </text>
    );
};
