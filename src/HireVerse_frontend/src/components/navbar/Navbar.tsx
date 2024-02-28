import {ReactElement, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Profile from "./Profile";
import {FaBinoculars, FaHome} from "react-icons/fa";
import {IconType} from "react-icons";
import {BsFillBuildingFill} from "react-icons/bs";

type Menu = {
    name: string;
    activeUrl: string[];
    redirectUrl?: string;
    position?: string;
    iconElement?: ReactElement<IconType>;
};

export default function Navbar() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const location = useLocation();

    useEffect(() => {
        setMenus([
            {
                name: "Home",
                iconElement: <FaHome/>,
                activeUrl: ["/", "/"],
                redirectUrl: "/",
                position: "0%",
            },
            {
                name: "Find Jobs",
                iconElement: <FaBinoculars/>,
                activeUrl: ["/find-job"],
                redirectUrl: "/find-job",
                position: "40%",
            },
            {
                name: "Find Company",
                iconElement: <BsFillBuildingFill/>,
                activeUrl: ["/find-company"],
                redirectUrl: "/find-company",
                position: "70%",
            },
        ]);
    }, []);

    const isActive = (menu: string[]) => menu.includes(location.pathname);

    return (
        <>
            <div
                className="fixed z-[100] flex h-16 w-full flex-row place-items-center justify-between bg-white md:ps-12 ps-6 shadow-md">
                <Link to="/"
                      className="text-blue-primary pt-1 text-center align-middle font-bebas lg:text-5xl md:text-4xl">
                    HIREVERSE
                </Link>
                <div
                    className="absolute left-1/2 flex h-full lg:w-5/12 md:w-7/12 translate-x-[-50%] transform flex-row place-items-center justify-center px-8">
                    {menus.map((menu, index) => {
                        return (
                            <Link
                                className="flex h-full w-full place-items-center justify-center "
                                to={menu.redirectUrl || ""}
                                key={index}>
                                <div
                                    key={index}
                                    className={`${isActive(menu.activeUrl)
                                        ? "text-blue-primary border-color-blue-primary font-semibold"
                                        : ""
                                    } text-s mx-2 flex min-w-24 flex-row gap-2 h-full text-xl place-items-center justify-center border-b-2 border-transparent transition-colors hover:border-gray-400 xl:text-base group`}>
                                    {menu.iconElement}
                                    <div className="lg:text-base md:text-sm text-xs group-hover:block hidden duration-1000 opacity-0 group-hover:opacity-100 group-hover:duration-300">
                                        {menu.name}
                                    </div>
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
                        <Profile/>
                    </div>
                </div>
            </div>
            <div className="flex w-[21rem]"/>
        </>
    );
}
