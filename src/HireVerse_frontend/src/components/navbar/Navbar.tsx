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
            <div className="z-50 fixed flex flex-row bg-white w-full h-16 justify-between place-items-center ps-12 shadow-md">
                <div className="text-blue-primary text-5xl text-center align-middle font-bebas pt-1">
                    HIREVERSE
                </div>
                <div className="absolute left-1/2 transform translate-x-[-50%] flex flex-row w-5/12 min-w-96 justify-center h-full place-items-center px-8">
                    {menus.map((menu, index) => {
                        return (
                            <Link
                                className="w-full h-full flex justify-center place-items-center"
                                to={menu.redirectUrl || ""}
                                key={index}>
                                <div
                                    key={index}
                                    className={`${
                                        isActive(menu.activeUrl)
                                            ? "text-blue-primary border-color-blue-primary font-semibold"
                                            : ""
                                    } h-full mx-8 flex place-items-center border-b-2 transition-colors border-transparent hover:border-gray-400 justify-center text-s xl:text-base `}>
                                    {menu.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex flex-row h-full place-items-center">
                    <a
                        href="/employer"
                        className="flex h-full mr-6 justify-center items-center transition-colors border-b-2 border-transparent hover:border-blue-primary cursor-pointer">
                        Employer
                    </a>
                    <div className="border-l-2">
                        <Profile />
                    </div>
                </div>
            </div>
            <div className="w-[21rem] flex" />
        </>
    );
}
