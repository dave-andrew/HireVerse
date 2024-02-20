class CustomCheckBoxProps {
    className: string;

    constructor(className: string | null) {
        this.className = className ? className : "";
    }
}

export function CustomCheckBox(props: CustomCheckBoxProps) {
    return (
        <div className={"flex items-center " + props.className}>
            <input id="link-checkbox" type="checkbox" value=""
                   className="w-4 h-4 text-red-600 bg-signature-red border-red-300 rounded "/>
            <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium text-gray-900 ">I agree
                with all <b className={"text-signature-red"}>HireVerse</b> <a href="#"
                                                                              className="text-blue-600 hover:underline">terms
                    and
                    conditions</a>.</label>
        </div>

    )
}