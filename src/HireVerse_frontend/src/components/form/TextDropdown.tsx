import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { Control, Controller } from "react-hook-form";

interface Props {
    states?: string[];
    className?: string;
    innerClassName?: string;
    control: Control<any>;
    name: string;
    onChange?: (value: string) => void;
}

export default function TextDropdown({
    states,
    className,
    innerClassName,
    control,
    name,
    onChange,
}: Props) {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className={`top-16 w-40 ${className}`}>
                        <Listbox
                            {...field}
                            onChange={(e) => {
                                field.onChange(e);
                                onChange?.(e);
                            }}>
                            <div className="relative">
                                <Listbox.Button
                                    className={`hover:bg-signature-hover-gray relative flex w-full cursor-default flex-row items-center rounded-lg bg-white py-2 pl-3 pr-10 transition-colors ${innerClassName}`}>
                                    <span
                                        className={`block truncate text-left ${states?.includes(field.value) ? "" : "text-gray-400"}`}>
                                        {field.value}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <IoMdArrowDropdown />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                                    <Listbox.Options className="absolute z-[1] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {states?.map((item, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active
                                                            ? "bg-blue-primary text-black"
                                                            : "text-gray-900"
                                                    }`
                                                }
                                                value={item}>
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate text-left ${
                                                                selected
                                                                    ? "font-medium"
                                                                    : "font-normal"
                                                            }`}>
                                                            {item}
                                                        </span>
                                                        <span
                                                            className={`black absolute inset-y-0 left-0 flex items-center pl-3 ${selected ? "" : "hidden"}`}>
                                                            <FaCheck />
                                                        </span>
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                )}
            />
        </>
    );
}
