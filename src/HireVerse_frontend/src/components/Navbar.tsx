import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type Menu = {
    name: string;
    activeUrl: string[];
    redirectUrl?: string;
    position?: string;
};

export default function Navbar() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const location = useLocation();

    useEffect(() => {
        setMenus([
            {
                name: "Find Jobs",
                activeUrl: ["/"],
                redirectUrl: "/",
                position: "40%",
            },
            {
                name: "Find Company",
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

    return (
        <>
            <div className="z-50 fixed flex flex-row bg-white w-full h-16 justify-between place-items-center xl:px-24 px-2">
                <div className="text-blue-primary text-5xl text-center align-middle font-bebas pt-1">
                    HIREVERSE
                </div>
                <div className="relative flex flex-row w-1/2 min-w-96 justify-center h-full place-items-center px-8">
                    {menus.map((menu, index) => {
                        return (
                            <Link
                                className={
                                    "w-full h-full flex justify-center place-items-center"
                                }
                                to={menu.redirectUrl || ""}
                                key={index}>
                                <div
                                    key={index}
                                    className={`${
                                        menu.activeUrl.includes(
                                            location.pathname,
                                        )
                                            ? "text-blue-primary border-b-2 border-color-blue-primary font-semibold"
                                            : ""
                                    } 
                                        grow h-full mx-8 flex place-items-center justify-center text-s xl:text-base
                                        `}>
                                    {menu.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="font-bold flex flex-row gap-4 place-items-center ">
                    <div className="flex flex-col place-items-end">
                        <div className={"text-xs text-end"}>
                            VINCENT TANJAYA
                        </div>
                        <div className="text-sm font-normal">UID: xxx</div>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                </div>
            </div>
            <div className="w-[21rem] flex" />
        </>
    );
}
