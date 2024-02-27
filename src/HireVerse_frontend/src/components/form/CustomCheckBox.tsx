interface CustomCheckBoxProps {
    className: string;
}

export function CustomCheckBox({ className }: CustomCheckBoxProps) {
    return (
        <div className={"flex items-center " + className}>
            <input
                id="link-checkbox"
                type="checkbox"
                value=""
                className="bg-blue-primary h-4 w-4 rounded border-red-300 text-red-600 "
            />
            <label
                htmlFor="link-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 ">
                I agree with all <b className="text-blue-primary"> HireVerse </b>
                <a
                    href="#"
                    className="text-blue-600 hover:underline">
                    terms and conditions
                </a>
                .
            </label>
        </div>
    );
}
