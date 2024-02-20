import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

interface Props {
    sortStates?: string[];
    defaultState?: string;
    className?: string;
}

export default function SortDropdown({
    sortStates,
    defaultState,
    className,
}: Props) {
    const [selected, setSelected] = useState<string>("");

    useEffect(() => {
        if (sortStates && !defaultState) {
            setSelected(sortStates[0]);
            return;
        }

        setSelected(defaultState ?? "");
    }, [sortStates]);

    return (
        <>
            <div className={`top-16 w-36 ${className}`}>
                <Listbox
                    value={selected}
                    onChange={setSelected}>
                    <div className='relative mt-1'>
                        <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left '>
                            <span className='block truncate'>{selected}</span>
                            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                <IoMdArrowDropdown />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'>
                            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
                                {sortStates?.map((sortState, index) => (
                                    <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? "bg-signature-red text-white"
                                                    : "text-gray-900"
                                            }`
                                        }
                                        value={sortState}>
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}>
                                                    {sortState}
                                                </span>
                                                {selected ? (
                                                    <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-white'>
                                                        <FaCheck />
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
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
