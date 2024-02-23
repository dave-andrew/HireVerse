import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";

export default function Profile() {
    return (
        <div className="top-16 w-full max-w-sm px-4">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button className="flex place-items-center hover:bg-signature-hover-gray transition-colors p-1 rounded-lg align-middle justify-center">
                            <IoPersonCircleOutline size="2rem" />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1">
                            <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-[15rem] transform translate-x-[5%] px-4 sm:px-0">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                    <div className="relative flex flex-col bg-white p-7 gap-5">
                                        <span className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Vincent Tanjaya
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    UUID: 123123123
                                                </p>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="bg-gray-50 p-2">
                                        <span className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-blue-primary hover:text-white cursor-pointer">
                                            <span className="flex items-center justify-center">
                                                <span className="w-full text-sm font-medium text-gray-900">
                                                    Sign Out
                                                </span>
                                                <PiSignOut size="1.5rem" />
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
}
