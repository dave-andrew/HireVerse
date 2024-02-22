import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
            <div className="z-50 fixed flex flex-col bg-white h-full w-[16rem] justify-between place-items-center px-2 py-6">
                <div className="text-blue-primary text-5xl text-center align-middle font-bebas pt-1">
                    HIREVERSE
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
                    <div className="flex flex-col place-items-start">
                        <div className={"text-base text-start"}>
                            VINCENT TANJAYA
                        </div>
                        <div className="text-sm font-normal">UID: xxx</div>
                    </div>

                </div>
            </div>
            <div className="w-[16rem] flex" />
        </>
    );
}
