interface Props {
    employType: string;
}

const employColor = {
    "Full-time": "bg-green-100 text-green-800",
    "Part-time": "bg-yellow-100 text-yellow-800",
    Internship: "bg-blue-100 text-blue-800",
    Contract: "bg-red-100 text-red-800",
    Freelance: "bg-purple-100 text-purple-800",
};

export default function EmployTypeIndicator({ employType }: Props) {
    return (
        <span className={`inline-flex items-center ${employColor[employType as keyof typeof employColor]} rounded-lg px-2.5 py-1 text-xs font-semibold`}>
            {employType}
        </span>
    );
}
