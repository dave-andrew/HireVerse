import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { HireVerse_company } from "../../../../declarations/HireVerse_company";
import { Control, Controller } from "react-hook-form";

interface Props {
    control: Control<any>;
    name: string;
    onChange?: (value: string) => void;
}

const people = [
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
];

const companyService = HireVerse_company;

export default function CountryDropdown({ control, name, onChange }: Props) {
    const [countries, setCountries] = useState<string[]>([]);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState({});

    const filteredCountries = useMemo(() => {
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

    const getInitialCountries = async () => {
        console.log("haio");
        const response = await companyService.getCompanyCountries();
        setCountries(response);
        setSelected(response[0]);
        console.log(response);
    };

    useEffect(() => {
        getInitialCountries();
    }, []);

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
                            <div className="relative w-full cursor-default flow-hidden text-left sm:text-sm">
                                <Combobox.Input
                                    className="w-full border-none py-2 pl-0 pr-10 text-sm leading-5 bg-transparent text-gray-900 focus:outline-none"
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
                                <Combobox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm">
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
