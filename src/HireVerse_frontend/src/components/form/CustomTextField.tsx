class CustomTextFieldProps {
    label: string;
    type: string;
    placeholder: string;
    classNames: string;

    constructor(label: string, type: string, placeholder: string, classNames: string | null) {
        this.label = label;
        this.type = type;
        this.placeholder = placeholder;
        this.classNames = classNames ? classNames : "";
    }
}

export default function CustomTextField(props: CustomTextFieldProps) {
    return (
        <div className={"flex flex-col " + props.classNames}>
            <div className={"font-bold"}>
                {props.label}
            </div>
            <input
                type={props.type}
                className={"border-b outline-0 p-2 border-gray-900"}
                placeholder={props.placeholder}
            />
        </div>
    )
}