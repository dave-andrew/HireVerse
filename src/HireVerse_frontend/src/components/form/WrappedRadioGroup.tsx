import { RadioGroup } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import { Control, Controller, RegisterOptions } from "react-hook-form";

interface Props {
    values: string[];
    name: string;
    label?: string;
    onChange?: (value: string) => void;
    className?: string;
    selectionClassName?: string;
    control?: Control<any>;
    rules?: RegisterOptions<any, any>;
}

export default function WrappedRadioGroup({
    values,
    onChange,
    label,
    className,
    selectionClassName,
    name,
    control,
    rules,
}: Props) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <RadioGroup
                    className={`${className}`}
                    {...field}>
                    {label && (
                        <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                            {label}
                        </RadioGroup.Label>
                    )}
                    {values.map((value) => (
                        <RadioGroup.Option
                            key={value}
                            value={value}
                            className={({ checked }) =>
                                `${
                                    checked
                                        ? "bg-signature-gray text-black"
                                        : "bg-white"
                                }
                    relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none ${selectionClassName}`
                            }>
                            {({ active, checked }) => (
                                <>
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="text-sm text-black">
                                                <RadioGroup.Label
                                                    as="p"
                                                    className={`font-medium  ${
                                                        checked
                                                            ? "text-black"
                                                            : "text-gray-900"
                                                    }`}>
                                                    {value}
                                                </RadioGroup.Label>
                                            </div>
                                        </div>
                                        {checked && (
                                            <div className="shrink-0 text-black">
                                                <FaCheck />
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
                </RadioGroup>
            )}
        />
    );
}
