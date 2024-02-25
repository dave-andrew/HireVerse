import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface CustomTextFieldProps {
    label: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    min?: number;
    max?: number;
}

export default function CustomTextField({
    label,
    type,
    placeholder,
    className,
    onChange,
    min,
    max,
}: CustomTextFieldProps) {
    return (
        <div className={`flex flex-col ${className}`}>
            <div className="text-xs font-bold">{label}</div>
            <input
                type={type}
                className="border-b border-gray-900 outline-0"
                placeholder={placeholder}
                onChange={onChange}
                min={min}
                max={max}
            />
        </div>
    );
}
