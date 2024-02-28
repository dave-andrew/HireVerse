import { ChangeEventHandler, HTMLInputTypeAttribute, HTMLProps, Ref } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CustomTextFieldProps {
    label: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    min?: number;
    max?: number;
    useFormRef ?: UseFormRegisterReturn;
    error ?: FieldError;
}

export default function CustomTextField({
    label,
    type,
    placeholder,
    className,
    onChange,
    min,
    max,
    useFormRef,
    error
}: CustomTextFieldProps) {
    return (
        <div className={`flex flex-col gap-[5px] ${className}`}>
            <div className="text-xs font-bold">{label}</div>
            <input
                {...useFormRef}
                type={type}
                className="border-b border-gray-900 outline-0"
                placeholder={placeholder}
                onChange={onChange}
                min={min}
                max={max}
            />
            <div
                className={`text-xs hidden ${error ? "text-red-500 !block" : "h-5"}`}>
                {error?.message}
            </div>
        </div>
    );
}
