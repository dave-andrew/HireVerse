import {
    FieldArrayWithId,
    UseFieldArrayRemove,
    UseFormRegister,
} from "react-hook-form";
import { ReactNode } from "react";

interface Props {
    className?: string;
    inputClassName?: string;
    fields: FieldArrayWithId<any, any, any>[];
    register: UseFormRegister<any>;
    remove: UseFieldArrayRemove;
    addButton: ReactNode;
    removeButton: ReactNode;
}

export default function DynamicInputBox({
    className,
    inputClassName,
    fields,
    register,
    addButton,
    removeButton,
    remove,
}: Props) {
    return (
        <>
            {fields.map((field, index) => (
                <div className={className}>
                    <input
                        key={index}
                        {...register(`dynamicInput.${index}`)}
                        placeholder={field.placeholder}
                        className={inputClassName}
                    />
                    <div onClick={() => remove(index)}>{removeButton}</div>
                </div>
            ))}
            {addButton}
        </>
    );
}
