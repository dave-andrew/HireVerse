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
            <div className={"font-bold"}>{label}</div>
            <input
                type={type}
                className={"border-b outline-0 p-2 border-gray-900"}
                placeholder={placeholder}
                onChange={onChange}
                min={min}
                max={max}
            />
        </div>
    );
}
