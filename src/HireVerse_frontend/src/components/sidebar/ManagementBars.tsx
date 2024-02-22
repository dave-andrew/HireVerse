import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaHome, FaUsersCog } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import Profile from "../navbar/Profile";

type Menu = {
    name: string;
    activeUrl: string[];
    redirectUrl?: string;
    position?: string;
};

export default function ManagementBars() {
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

    const dropdownMenuRef: MutableRefObject<null | HTMLDivElement> =
        useRef(null);
    const openDropdown = () => {
        dropdownMenuRef?.current?.classList.toggle("hidden");
    };

    return (
        <>
            <div className="z-50 fixed flex flex-row justify-end w-full h-16 bg-white shadow-md">
                <div className="font-bold flex flex-row gap-4 place-items-center ">
                    <Profile />
                </div>
            </div>
            <div className="z-50 fixed flex flex-col bg-white h-full w-[16rem] justify-between place-items-center shadow-md px-2 pt-4 pb-6">
                <div className="flex flex-col gap-8 w-full">
                    <div className="text-blue-primary text-5xl text-center align-middle font-bebas">
                        HIREVERSE
                    </div>

                    <div className={"flex flex-col gap-4 px-6"}>
                        <div className="flex flex-row gap-4 place-items-center">
                            <FaHome /> Overview
                        </div>
                        <div
                            className={
                                "flex flex-row gap-4 place-items-center"
                            }>
                            <FaUsersCog /> Managers
                        </div>
                        <div
                            className={
                                "flex flex-row gap-4 place-items-center"
                            }>
                            <MdOutlineWork /> Jobs
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[20rem] flex" />
        </>
    );
}
