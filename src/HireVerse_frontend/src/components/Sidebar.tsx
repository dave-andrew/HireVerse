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
                name: "FIND JOBS",
                icon: <RiPhoneFindLine size="2rem" />,
                activeUrl: ["/"],
                redirectUrl: "/",
            },
            {
                name: "FIND COMPANY",
                icon: <LuBuilding2 size="2rem" />,
                activeUrl: ["/find-company"],
                redirectUrl: "/find-company",
            },
            {
                name: "MANAGE COMPANY",
                icon: <LuBuilding2 size="2rem" />,
                activeUrl: ["/manage-company"],
                redirectUrl: "/manage-company",
            },
        ]);
    }, []);

    return (
        <>
            <div className="flex flex-col fixed bg-white w-72 h-full">
                <div className="pl-6 pt-8 pb-6 text-signature-red font-bold text-5xl">
                    HIREVERSE
                </div>
                <hr />
                <div className="flex flex-col py-6 px-4 gap-2 grow">
                    {menus.map((menu, index) => {
                        return (
                            <Link
                                to={menu.redirectUrl || ""}
                                key={index}>
                                <div
                                    key={index}
                                    className={`${menu.activeUrl.includes(location.pathname) ? "bg-signature-red text-white" : ""} w-full hover:bg-red-400 font-bold flex px-3 p-5 place-items-center rounded-2xl gap-3`}>
                                    {menu.icon}
                                    {menu.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <hr />
                <div className="p-4">
                    <div className="bg-signature-gray p-4 rounded-xl font-bold flex flex-row gap-4 place-items-center">
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
                        <div className="flex flex-col">
                            <div>VINCENT TANJAYA</div>
                            <div className="text-sm font-normal">UID: xxx</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[21rem] flex" />
        </>
    );
}
