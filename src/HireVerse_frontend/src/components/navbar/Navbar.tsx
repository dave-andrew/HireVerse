import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Profile from "./Profile";

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
                name: "Home",
                activeUrl: ["/", "/"],
                redirectUrl: "/",
                position: "0%",
            },
            {
                name: "Find Jobs",
                activeUrl: ["/find-job"],
                redirectUrl: "/find-job",
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

    const isActive = (menu: string[]) => menu.includes(location.pathname);

    return (
        <>
            <div className="fixed z-[100] flex h-16 w-full flex-row place-items-center justify-between bg-white ps-12 shadow-md">
                <div className="text-blue-primary pt-1 text-center align-middle font-bebas text-5xl">
                    HIREVERSE
                </div>
                <div className="absolute left-1/2 flex h-full w-5/12 min-w-96 translate-x-[-50%] transform flex-row place-items-center justify-center px-8">
                    {menus.map((menu, index) => {
                        return (
                            <Link
                                className="flex h-full w-full place-items-center justify-center"
                                to={menu.redirectUrl || ""}
                                key={index}>
                                <div
                                    key={index}
                                    className={`${
                                        isActive(menu.activeUrl)
                                            ? "text-blue-primary border-color-blue-primary font-semibold"
                                            : ""
                                    } text-s mx-8 flex h-full place-items-center justify-center border-b-2 border-transparent transition-colors hover:border-gray-400 xl:text-base `}>
                                    {menu.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex h-full flex-row place-items-center">
                    <a
                        href="/employer"
                        className="hover:border-blue-primary mr-6 flex h-full cursor-pointer items-center justify-center border-b-2 border-transparent transition-colors">
                        Employer
                    </a>
                    <div className="border-l-2">
                        <Profile />
                    </div>
                </div>
            </div>
            <div className="flex w-[21rem]" />
        </>
    );
}
