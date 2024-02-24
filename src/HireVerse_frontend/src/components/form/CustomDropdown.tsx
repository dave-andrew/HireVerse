import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

export interface DropdownItems {
    value: string;
    label: string;
    img?: string;
}

interface Props {
    states?: DropdownItems[];
    defaultState?: DropdownItems;
    className?: string;
    onChange?: (value: DropdownItems) => void;
}

export default function CustomDropdown({
    states,
    defaultState = { value: "", label: "" },
    className,
    onChange,
}: Props) {
    const [selected, setSelected] = useState<DropdownItems>(defaultState);

    const handleChange = (value: DropdownItems) => {
        setSelected(value);
        if (onChange) {
            onChange(value);
        }
    };

    useEffect(() => {
        if (
            states &&
            states.length > 0 &&
            (defaultState?.value === "" || defaultState?.label === "")
        ) {
            setSelected(states[0]);
            return;
        }
    }, [states]);

    return (
        <>
            <div className={`top-16 w-40 ${className}`}>
                <Listbox
                    value={selected}
                    onChange={handleChange}>
                    <div className="relative m-2">
                        <Listbox.Button className="relative flex flex-row items-center w-full cursor-default rounded-lg bg-white hover:bg-signature-hover-gray transition-colors py-2 pl-3 pr-10 ">
                            <span className="block truncate">
                                {selected.img && (
                                    <img
                                        className="w-8 h-8 rounded-full mr-2"
                                        src={selected.img}
                                        alt=""
                                    />
                                )}
                            </span>
                            <span className="block truncate text-left">
                                {selected.label}
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
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
                                                    {item.label}
                                                </span>
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 black ${selected ? "" : "hidden"}`}>
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
        </>
    );
}
