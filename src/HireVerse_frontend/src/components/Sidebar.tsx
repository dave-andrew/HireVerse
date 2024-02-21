import { ReactElement, useEffect, useState } from "react";
import { RiPhoneFindLine } from "react-icons/ri";
import { LuBuilding2 } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";

type Menu = {
    name: string;
    icon: ReactElement;
    activeUrl: string[];
    redirectUrl?: string;
};

export default function Sidebar() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const location = useLocation();

    useEffect(() => {
        setMenus([
            {
                name: "Find Jobs",
                icon: <RiPhoneFindLine size="2rem" />,
                activeUrl: ["/"],
                redirectUrl: "/",
            },
            {
                name: "Find Company",
                icon: <LuBuilding2 size="2rem" />,
                activeUrl: ["/find-company"],
                redirectUrl: "/find-company",
            },
            {
                name: "Manage Company",
                icon: <LuBuilding2 size="2rem" />,
                activeUrl: ["/manage-company"],
                redirectUrl: "/manage-company",
            },
        ]);
    }, []);

    return (
        <>
            <div className="flex flex-row fixed bg-white w-full h-16 justify-between place-items-center xl:px-24">
                <div className=" text-blue-primary font-bold text-4xl">
                    HIREVERSE
                </div>
                <div className="flex flex-row w-1/2 min-w-96 justify-center h-full place-items-center px-8">
                    {menus.map((menu, index) => {
                        return (
                            <Link
                                className={"w-full h-full flex justify-center place-items-center font-semibold"}
                                to={menu.redirectUrl || ""}
                                key={index}>
                                <div
                                    key={index}
                                    className={`${menu.activeUrl.includes(location.pathname) ?
                                        "text-blue-primary border-b-2 border-color-blue-primary" : ""} 
                                        grow h-full flex place-items-center justify-center text-xs xl:text-base
                                        `}>
                                    {menu.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="font-bold flex flex-row gap-4 place-items-center ">
                    <div className="flex flex-col place-items-end">
                        <div className={"text-xs"}>VINCENT TANJAYA</div>
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
