import { Menu, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

interface Props {
    className?: string;
    itemClassName?: string;
    children: ReactNode;
    button: ReactNode;
}

export default function WrappedDropdown({
    children,
    button,
    className,
    itemClassName,
}: Props) {
    return (
        <Menu
            as="div"
            className={`relative inline-block text-left ${className}`}>
            <div>{button}</div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items
                    className={`absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none ${itemClassName}`}>
                    {children}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
