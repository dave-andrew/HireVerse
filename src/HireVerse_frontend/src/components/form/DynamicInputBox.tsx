import {
    FieldArrayWithId,
    UseFieldArrayRemove,
    UseFormRegister,
} from "react-hook-form";
import { Fragment, ReactNode } from "react";

interface Props {
    className?: string;
    inputClassName?: string;
    fields: FieldArrayWithId<any, any, any>[];
    register: UseFormRegister<any>;
    remove: UseFieldArrayRemove;
    addButton: ReactNode;
    removeButton: ReactNode;
    inputObject: string;
    inputName: string;
}

export default function DynamicInputBox({
    className,
    inputClassName,
    fields,
    register,
    addButton,
    removeButton,
    remove,
    inputObject,
    inputName,
}: Props) {
    return (
        <Fragment key="t">
            {fields.map((field, index) => (
                <div className={className}>
                    <input
                        key={field.id}
                        {...register(`${inputObject}.${index}.${inputName}`)}
                        placeholder={field.placeholder}
                        className={inputClassName}
                    />
                    <div onClick={() => remove(index)}>{removeButton}</div>
                </div>
            ))}
            {addButton}
        </Fragment>
    );
}
