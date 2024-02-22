import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUsersCog } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";

type Menu = {
    name: string;
    activeUrl: string[];
    redirectUrl?: string;
    position?: string;
};

export default function Sidebar() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const location = useLocation();

    useEffect(() => {
        setMenus([
            {
                name: "Overview",
                activeUrl: ["/"],
                redirectUrl: "/",
                position: "40%",
            },
            {
                name: "Managers",
                activeUrl: ["/find-company"],
                redirectUrl: "/find-company",
                position: "70%",
            },
        ]);
    }, []);

    const getActivePosition = () =>
        menus
            .map((menu) =>
                menu.activeUrl.includes(location.pathname)
                    ? menu.position
                    : null,
            )
            .toString()
            .replaceAll(",", "");


    const dropdownMenuRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const openDropdown = () => {
        dropdownMenuRef?.current?.classList.toggle("hidden");
    };
    return (
        <>
            <div
                className="z-50 fixed flex flex-col bg-white h-full w-[16rem] justify-between place-items-center px-2 py-6">
                <div className={"flex flex-col gap-8 w-full"}>
                    <div className="text-blue-primary text-5xl text-center align-middle font-bebas pt-1">
                        HIREVERSE
                    </div>

                    <div className={"w-full flex justify-center"}>
                        {/*TODO: Perbaiki Dropdown*/}
                        <div className={"w-fit relative"}>
                            <button onClick={openDropdown}
                                    className="w-52 text-black border border-gray-500 focus:ring-4 focus:outline-none
                                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
                                        text-center flex flex-row justify-between items-center" type="button">
                                Alvin's House
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            <div ref={dropdownMenuRef}
                                 className="absolute z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <a href="#"
                                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                                            out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={"flex flex-col gap-4 px-6"}>
                        <div className={"flex flex-row gap-4 place-items-center"}>
                            <FaHome /> Overview
                        </div>
                        <div className={"flex flex-row gap-4 place-items-center"}>
                            <FaUsersCog /> Managers
                        </div>
                        <div className={"flex flex-row gap-4 place-items-center"}>
                            <MdOutlineWork /> Jobs
                        </div>
                    </div>
                </div>
                <div className="font-bold flex flex-row gap-2 place-items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                    <div className="flex flex-col place-items-start pr-4">
                        <div className={"text-sm text-start"}>
                            VINCENT TANJAYA
                        </div>
                        <div className="text-xs font-normal text-gray-500">UID: xxx</div>
                    </div>

                </div>
            </div>
            <div className="w-[20rem] flex" />
        </>
    );
}
