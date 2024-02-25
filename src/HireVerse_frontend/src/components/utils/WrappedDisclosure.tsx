import { Disclosure } from "@headlessui/react";
import { IoIosArrowUp } from "react-icons/io";
import { ReactNode } from "react";

interface Props {
    className?: string;
    panelClassName?: string;
    text: string;
    children: ReactNode;
}

export default function WrappedDisclosure({
    className,
    panelClassName,
    text,
    children,
}: Props) {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <hr />
                    <Disclosure.Button
                        className={`flex w-full justify-between items-center rounded-lg ${className}`}>
                        <span>{text}</span>
                        <IoIosArrowUp
                            className={`${
                                open ? "rotate-180 transform" : ""
                            } h-5 w-5`}
                        />
                    </Disclosure.Button>
                    <hr />
                    <Disclosure.Panel
                        className={`px-4 pb-2 pt-4 text-sm text-gray-500 ${panelClassName}`}>
                        {children}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
