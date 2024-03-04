import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CustomCheckBoxProps {
    className: string;
    useFormRef?: UseFormRegisterReturn;
    error?: FieldError;
}

export function CustomCheckBox({
    className,
    useFormRef,
    error,
}: CustomCheckBoxProps) {
    return (
        <div className={"flex items-center " + className}>
            <input
                {...useFormRef}
                id="link-checkbox"
                type="checkbox"
                value=""
                className="bg-blue-primary h-4 w-4 rounded border-red-300 text-red-600 "
            />
            <label
                htmlFor="link-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 ">
                I agree with all{" "}
                <b className="text-blue-primary"> HireVerse </b>
                <a
                    href="/terms"
                    target="_blank"
                    className="text-blue-600 hover:underline">
                    terms and conditions
                </a>
                .
            </label>
            <div
                className={`hidden text-xs ${
                    error ? "!block text-red-500" : "h-5"
                }`}>
                {error?.message}
            </div>
        </div>
    );
}
