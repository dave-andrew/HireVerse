import { ReactNode, useEffect, useState } from "react";
import Profile from "../navbar/Profile";
import CustomDropdown, { DropdownItems } from "../form/CustomDropdown";
import { IconType } from "react-icons";
import { useLocation } from "react-router-dom";
import {
    RiHome4Line,
    RiMailOpenLine,
    RiSuitcase2Line,
    RiUser3Line,
} from "react-icons/ri";

type Menu = {
    name: string;
    activeUrl: string[];
    redirectUrl?: string;
    icon: IconType;
};

interface Props {
    children?: ReactNode;
}

const defaultMenu: Menu[] = [
    {
        name: "Overview",
        activeUrl: ["/manage-company", "/"],
        redirectUrl: "/manage-company",
        icon: RiHome4Line,
    },
    {
        name: "Find Jobs",
        activeUrl: ["/find-job"],
        redirectUrl: "/find-job",
        icon: RiUser3Line,
    },
    {
        name: "Find Company",
        activeUrl: ["/find-company"],
        redirectUrl: "/find-company",
        icon: RiSuitcase2Line,
    },
];

export default function ManagementBars({ children }: Props) {
    const [managedCompanies, setManagedCompanies] = useState<DropdownItems[]>(
        [],
    );
    const [menus, setMenus] = useState<Menu[]>([]);
    const location = useLocation();

    useEffect(() => {
        const temp = [
            {
                label: "Company 1",
                value: "Company 1",
                img: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
            },
        ];
        setManagedCompanies(temp);

        setMenus(defaultMenu);
    }, []);

    const isActive = (menu: string[]) => menu.includes(location.pathname);

    return (
        <div className="flex flex-row w-[100vw] h-[100vh]">
            <div className="z-50 fixed flex flex-row justify-between w-full h-16 bg-white shadow-md">
                <div className="pl-64 flex flex-row h-full place-items-center">
                    <CustomDropdown
                        states={managedCompanies}
                        className="w-52"
                    />
                </div>
                <div className="flex flex-row h-full place-items-center">
                    <a
                        href="/"
                        className="flex h-full mr-6 justify-center items-center transition-colors border-b-2 border-transparent hover:border-blue-primary cursor-pointer">
                        Employee
                    </a>
                    <div className="border-l-2">
                        <Profile />
                    </div>
                </div>
            </div>

            <div className="z-50 fixed flex flex-col bg-white h-full w-[16rem] justify-between place-items-center shadow-md px-2 pt-4 pb-6">
                <div className="flex flex-col gap-8 w-full">
                    <div className="text-blue-primary text-5xl text-center align-middle font-bebas">
                        HIREVERSE
                    </div>
                    <div className="flex flex-col text-lg text-gray-500">
                        {managedCompanies.length > 0 &&
                            menus.map((menu) => (
                                <div
                                    className={`flex flex-row gap-4 p-3 m-1 border-l-2 border-transparent place-items-center hover:bg-signature-hover-gray cursor-pointer ${isActive(menu.activeUrl) ? "text-blue-primary bg-signature-gray border-color-blue-primary" : ""}`}>
                                    <menu.icon size="1.5rem" />
                                    <span>{menu.name}</span>
                                </div>
                            ))}
                        {managedCompanies?.length > 0 && (
                            <hr className="my-5" />
                        )}
                        <div className="flex flex-row gap-4 p-3 m-1 border-l-2 border-transparent place-items-center hover:bg-signature-hover-gray cursor-pointer">
                            <RiMailOpenLine size="1.5rem" />
                            <span>Invite</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex min-w-[16rem] h-full" />
            <div className="flex flex-col flex-grow-1 w-full h-full">
                <div className="min-h-16 w-full" />
                {children}
            </div>
        </div>
    );
}
