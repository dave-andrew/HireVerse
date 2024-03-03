import { ReactNode, useEffect, useState } from "react";
import Profile from "../navbar/Profile";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";
import {
    RiHome4Line,
    RiMailOpenLine,
    RiSuitcase2Line,
    RiUser3Line,
} from "react-icons/ri";
import { useForm } from "react-hook-form";
import ImageLabeledDropdown, {
    DropdownItems,
} from "../form/ImageLabeledDropdown";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Company } from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import useImageBlob from "../../hooks/useImageBlob";
import InvitationModal from "../modal/InvitationModal";
import { useGetManagedCompanies } from "../../datas/queries/companyQueries";

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
        activeUrl: ["/employer", "/"],
        redirectUrl: "/employer",
        icon: RiHome4Line,
    },
    {
        name: "Managers",
        activeUrl: ["/employer/managers"],
        redirectUrl: "/employer/managers",
        icon: RiSuitcase2Line,
    },
    {
        name: "Jobs",
        activeUrl: ["/employer/jobs"],
        redirectUrl: "/employer/jobs",
        icon: RiUser3Line,
    },
];

interface IDropdownForm {
    label: string;
    value: string;
    img: string;
}

export default function ManagementBars({ children }: Props) {
    const { data: managedCompanies, refetch } = useGetManagedCompanies();
    const [menus, setMenus] = useState<Menu[]>(defaultMenu);
    const [selectedCompany, setSelectedCompany] =
        useLocalStorage<Company | null>("selectedCompany", null);
    const [dropdownItems, setDropdownItems] = useState<DropdownItems[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const [isModalShown, setIsModalShown] = useState(false);
    const { control, setValue } = useForm<IDropdownForm>({
        defaultValues: {
            value: "",
            label: "",
            img: "",
        },
    });
    const { convertBlobToImage } = useImageBlob();
    const location = useLocation();

    const manageDropdownItems = async () => {
        if (!managedCompanies) {
            return;
        }

        const items: DropdownItems[] = await Promise.all(
            managedCompanies.map(async (company) => ({
                label: company.name,
                value: company.name,
                img: convertBlobToImage(company.image),
            })),
        );
        setDropdownItems(items);

        if (selectedCompany) {
            const company = managedCompanies.find(
                (c) => c.id === selectedCompany.id,
            );

            if (company) {
                setValue("label", company.name);
                return;
            }
        }

        if (managedCompanies.length === 0) {
            setValue("label", "No Company");
            setSelectedCompany(null);
            return;
        }
    };

    const changeCompany = (companyLabel: string) => {
        const company = managedCompanies?.find((c) => c.name === companyLabel);
        if (company) {
            setSelectedCompany(company);
        }
    };

    const toggleModal = () => {
        setIsModalShown(!isModalShown);
    };

    const isActive = (menu: string[]) => menu.includes(location.pathname);

    useEffect(() => {
        manageDropdownItems();
    }, [managedCompanies]);

    return (
        <>
            <div className="flex h-[100vh] w-[100vw] flex-row">
                <div className="fixed z-50 flex h-16 w-full flex-row justify-between bg-white shadow-md">
                    <div
                        className={`flex h-full flex-row place-items-center transition-all duration-500 ease-in-out ${isHovered ? "pl-80" : "pl-24"}`}>
                        <ImageLabeledDropdown
                            name="label"
                            states={dropdownItems}
                            control={control}
                            className="w-52"
                            onChange={changeCompany}
                        />
                        <button
                            onClick={toggleModal}
                            className="hover:bg-signature-hover-gray m-1 flex cursor-pointer flex-row place-items-center gap-2 rounded-md border-l-2 border-transparent p-3">
                            <RiMailOpenLine className="min-w-[1.5rem]" />
                            <span className={`overflow-hidden`}>
                                Invitations
                            </span>
                        </button>
                    </div>
                    <div className="flex h-full flex-row place-items-center">
                        <a
                            href="/"
                            className="hover:border-blue-primary hover:text-blue-primary mr-6 flex h-full cursor-pointer items-center justify-center border-b-2 border-transparent transition-colors">
                            Employer
                        </a>
                        <div className="border-l-2">
                            <Profile />
                        </div>
                    </div>
                </div>

                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`fixed z-50 flex h-full flex-col place-items-center justify-between
                 bg-white px-2 pb-6 pt-4 shadow-md ${isHovered ? "w-[18rem]" : "w-[5rem]"}
                 transition-all duration-500 ease-in-out
                 `}>
                    <div className="flex w-full flex-col gap-8">
                        <div className="text-blue-primary flex flex-row justify-center text-center align-middle font-bebas text-5xl">
                            H
                            <span
                                className={`${isHovered ? "block" : "hidden"}`}>
                                IREVERSE
                            </span>
                        </div>
                        <div className="flex flex-col text-lg text-gray-500">
                            {menus.map((menu, index) => {
                                if (selectedCompany === null && index > 0) {
                                    return;
                                }
                                return (
                                    <Link
                                        to={menu.redirectUrl ?? ""}
                                        key={index}>
                                        <div
                                            key={index}
                                            className={`hover:bg-signature-hover-gray m-1 flex cursor-pointer flex-row place-items-center gap-4 border-l-2 border-transparent p-3 ${isActive(menu.activeUrl) ? "text-blue-primary bg-signature-gray border-color-blue-primary" : ""}`}>
                                            <menu.icon className="min-w-[1.5rem]" />
                                            <span className={`overflow-hidden`}>
                                                {menu.name}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div
                    className={`flex h-full ${isHovered ? "min-w-[18rem]" : "min-w-[5rem]"} transition-all duration-500 ease-in-out`}
                />
                <div className="flex-grow-1 flex h-full w-full flex-col">
                    <div className="min-h-16 w-full" />
                    {children}
                </div>
            </div>
            <InvitationModal
                openState={isModalShown}
                setOpenState={setIsModalShown}
            />
        </>
    );
}
