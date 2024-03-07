import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";


/**
 * Props interface for CustomTextField component
 * @interface
 * @property {string} label - The label for the text field
 * @property {HTMLInputTypeAttribute} type - The type of the input field
 * @property {string} [placeholder] - The placeholder for the input field
 * @property {string} [className] - The CSS classes for the component
 * @property {ChangeEventHandler<HTMLInputElement>} [onChange] - The onChange event handler
 * @property {number} [min] - The minimum value for the input field
 * @property {number} [max] - The maximum value for the input field
 * @property {UseFormRegisterReturn} [useFormRef] - The ref returned from useForm
 * @property {FieldError} [error] - The error object from react-hook-form
 */
interface CustomTextFieldProps {
    label: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    min?: number;
    max?: number;
    useFormRef?: UseFormRegisterReturn;
    error?: FieldError;
}


/**
 * CustomTextField component
 * @param {CustomTextFieldProps} props - The properties passed to the component
 * @returns {JSX.Element} - The rendered component
 */
export default function CustomTextField({ label, type, placeholder, className, onChange, min, max, useFormRef, error }: CustomTextFieldProps) {
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
            <div className={`hidden text-xs ${error ? "!block text-red-500" : "h-5"}`}>{error?.message}</div>
        </div>
    );
}
