import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { Control, Controller } from "react-hook-form";


/**
 * Props interface for TextDropdown component
 * @interface
 * @property {string[]} [states] - The items in the dropdown
 * @property {string} [className] - The CSS classes for the component
 * @property {string} [innerClassName] - The CSS classes for the inner component
 * @property {Control<any>} control - The control object from react-hook-form
 * @property {string} name - The name of the field
 * @property {(value: string) => void} [onChange] - The onChange event handler
 */
interface Props {
    states?: string[];
    className?: string;
    innerClassName?: string;
    control: Control<any>;
    name: string;
    onChange?: (value: string) => void;
}


/**
 * TextDropdown component
 * @param {Props} props - The properties passed to the component
 * @returns {JSX.Element} - The rendered component
 */
export default function TextDropdown({ states, className, innerClassName, control, name, onChange }: Props) {
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
                                    <span className={`block truncate text-left ${states?.includes(field.value) ? "" : "text-gray-400"}`}>{field.value}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <IoMdArrowDropdown />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                                    <Listbox.Options className="absolute z-[1] m-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-0 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {states?.map((item, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={({ active }) =>
                                                    `relative m-0 cursor-default select-none list-none p-0 py-2 pl-10 pr-4 ${
                                                        active ? "bg-blue-primary text-black" : "text-gray-900"
                                                    }`
                                                }
                                                value={item}>
                                                {({ selected }) => (
                                                    <>
                                                        <span className={`block truncate text-left ${selected ? "font-medium" : "font-normal"}`}>{item}</span>
                                                        <span className={`black absolute inset-y-0 left-0 flex items-center pl-3 ${selected ? "" : "hidden"}`}>
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
