import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { Control, Controller } from "react-hook-form";
import { useGetCompanyCountries } from "../../datas/queries/companyQueries";

interface Props {
    control: Control<any>;
    name: string;
    onChange?: (value: string) => void;
}

export default function CountryDropdown({ control, name, onChange }: Props) {
    const { data: countries } = useGetCompanyCountries();
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState({});

    const filteredCountries = useMemo(() => {
        if (!countries) {
            return [];
        }

        if (query === "") {
            return countries;
        }

        return countries.filter((country) =>
            country
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(query.toLowerCase().replace(/\s+/g, "")),
        );
    }, [query, countries]);

    useEffect(() => {
        if (countries) {
            setSelected(countries[0]);
        }
    }, [countries]);

    return (
        <div className="top-16 w-72 border-0">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Combobox
                        {...field}
                        onChange={(e) => {
                            field.onChange(e);
                            onChange?.(e);
                        }}>
                        <div className="relative mt-1">
                            <div className="flow-hidden relative w-full cursor-default text-left sm:text-sm">
                                <Combobox.Input
                                    className="w-full border-none bg-transparent py-2 pl-0 pr-10 text-sm leading-5 text-gray-900 focus:outline-none"
                                    displayValue={(country: string) => country}
                                    onChange={(event) =>
                                        setQuery(event.target.value)
                                    }
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <IoMdArrowDropdown />
                                </Combobox.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQuery("")}>
                                <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm">
                                    {filteredCountries.length === 0 &&
                                    query !== "" ? (
                                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filteredCountries.map((country) => (
                                            <Combobox.Option
                                                key={country}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active
                                                            ? "bg-blue-primary text-white"
                                                            : "text-gray-900"
                                                    }`
                                                }
                                                value={country}>
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${
                                                                selected
                                                                    ? "font-medium"
                                                                    : "font-normal"
                                                            }`}>
                                                            {country}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                    active
                                                                        ? "text-white"
                                                                        : "text-teal-600"
                                                                }`}>
                                                                <FaCheck />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
                )}
            />
        </div>
    );
}
