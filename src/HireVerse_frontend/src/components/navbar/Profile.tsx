import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import useAuth, { AuthState } from "../../hooks/useAuth";

export default function Profile() {
    const { login, logout, user, authState } = useAuth();

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div className="top-16 w-full max-w-sm px-1 md:px-4">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className="hover:bg-signature-hover-gray flex place-items-center justify-center rounded-lg p-1 align-middle transition-colors">
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
                            <Popover.Panel
                                className="absolute right-0 z-10 mt-3 w-screen max-w-[15rem] translate-x-[5%] transform px-4 sm:px-0">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                    <div className="relative flex flex-col gap-5 bg-white p-7">
                                        <span
                                            className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {authState ==
                                                    AuthState.Authenticated
                                                        ? user?.first_name.concat(
                                                            user?.last_name,
                                                        )
                                                        : "Not Logged In"}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {authState ==
                                                    AuthState.Authenticated
                                                        ? user?.email
                                                        : ""}
                                                </p>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2 bg-gray-50 p-2">
                                        {authState ==
                                        AuthState.Authenticated ? (
                                            <span
                                                className="flow-root cursor-pointer rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-red-600 hover:text-white">
                                                <span className="flex items-center justify-center">
                                                    <button
                                                        className="w-full text-sm font-medium"
                                                        onClick={logout}>
                                                        Sign Out
                                                    </button>
                                                    <PiSignOut size="1.5rem" />
                                                </span>
                                            </span>
                                        ) : (
                                            <span
                                                className="hover:bg-blue-primary flow-root cursor-pointer rounded-md px-2 py-2 transition duration-150 ease-in-out hover:text-white">
                                                <span className="flex items-center justify-center">
                                                    <button
                                                        className="w-full text-sm font-medium"
                                                        onClick={login}>
                                                        Login
                                                    </button>
                                                </span>
                                            </span>
                                        )}
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
