import { ReactElement, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Profile from "./Profile";
import { FaHome, FaSuitcase } from "react-icons/fa";
import { IconType } from "react-icons";
import { BsFillBuildingFill } from "react-icons/bs";
import useAuth, { AuthState } from "../../hooks/useAuth";

type Menu = {
    name: string;
    activeUrl: string[];
    redirectUrl?: string;
    position?: string;
    iconElement?: ReactElement<IconType>;
};

export default function Navbar() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const { authState } = useAuth();
    const location = useLocation();

    useEffect(() => {
        setMenus([
            {
                name: "Home",
                iconElement: <FaHome />,
                activeUrl: ["/", "/"],
                redirectUrl: "/",
                position: "0%",
            },
            {
                name: "Find Jobs",
                iconElement: <FaSuitcase />,
                activeUrl: ["/find-job"],
                redirectUrl: "/find-job",
                position: "40%",
            },
            {
                name: "Find Company",
                iconElement: <BsFillBuildingFill />,
                activeUrl: ["/find-company"],
                redirectUrl: "/find-company",
                position: "70%",
            },
        ]);
    }, []);

    const isActive = (menu: string[]) => menu.includes(location.pathname);

    return (
        <>
            <div className="fixed z-[100] flex h-16 w-full flex-row place-items-center justify-between bg-white ps-6 shadow-md md:ps-12">
                <Link
                    to="/"
                    className="text-blue-primary pt-1 text-center align-middle font-bebas md:text-4xl lg:text-5xl">
                    HIREVERSE
                </Link>
                <div className="absolute left-1/2 flex h-full translate-x-[-50%] transform flex-row place-items-center justify-center px-8 md:w-7/12 lg:w-5/12">
                    {menus.map((menu, index) => {
                        if (authState !== AuthState.Authenticated) {
                            return;
                        }
                        return (
                            <Link
                                className="flex h-full w-full place-items-center justify-center"
                                to={menu.redirectUrl || ""}
                                key={index}>
                                <div
                                    key={index}
                                    className={`${
                                        isActive(menu.activeUrl) ? "text-blue-primary border-color-blue-primary font-semibold" : ""
                                    } text-s group mx-2 flex h-full flex-row place-items-center justify-center gap-2 border-b-2 border-transparent px-4 text-xl transition-colors hover:border-gray-400 md:min-w-24 md:px-0 xl:text-base`}>
                                    {menu.iconElement}
                                    <div className=" duration-600 invisible absolute text-xs opacity-0 group-hover:visible group-hover:static group-hover:opacity-100 group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out md:visible md:relative md:text-sm md:opacity-100 lg:text-base">
                                        {menu.name}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex h-full flex-row place-items-center">
                    {authState === AuthState.Authenticated && (
                        <Link
                            to="/employer"
                            className="hover:border-blue-primary hover:text-blue-primary me-2 flex h-full cursor-pointer items-center justify-center border-b-2 border-transparent transition-colors md:mr-6">
                            Employee
                        </Link>
                    )}
                    <div className="border-l-2">
                        <Profile />
                    </div>
                </div>
            </div>
            <div className="flex w-[21rem]" />
        </>
    );
}
