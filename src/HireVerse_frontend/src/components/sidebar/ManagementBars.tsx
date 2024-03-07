import { ReactNode, useEffect, useState } from "react";
import Profile from "../navbar/Profile";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";
import { RiHome4Line, RiMailOpenLine, RiSuitcase2Line, RiUser3Line } from "react-icons/ri";
import { useForm } from "react-hook-form";
import ImageLabeledDropdown, { DropdownItems } from "../form/ImageLabeledDropdown";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Company } from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import useImageBlob from "../../hooks/useImageBlob";
import InvitationModal from "../modal/InvitationModal";
import { getManagedCompanies } from "../../datas/queries/companyQueries";
import { BsBuilding } from "react-icons/bs";

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
        icon: RiUser3Line,
    },
    {
        name: "Jobs",
        activeUrl: ["/employer/jobs"],
        redirectUrl: "/employer/jobs",
        icon: RiSuitcase2Line,
    },
];

interface IDropdownForm {
    label: string;
    value: string;
    img: string;
}

export default function ManagementBars({ children }: Props) {
    const { data: managedCompanies, refetch } = getManagedCompanies();
    const [menus, setMenus] = useState<Menu[]>(defaultMenu);
    const [selectedCompany, setSelectedCompany] = useLocalStorage<Company | null>("selectedCompany", null);
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
            const company = managedCompanies.find((c) => c.id === selectedCompany.id);

            if (company) {
                setValue("label", company.name);
                return;
            }
        }

        setValue("label", "No Company");
        setSelectedCompany(null);
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
            <div className="bg-gray flex h-[100vh] w-[100vw] flex-row">
                <div className="fixed z-50 flex h-16 w-full flex-row justify-between bg-white shadow-md">
                    <div className={`flex h-full flex-row place-items-center transition-all duration-500 ease-in-out ${isHovered ? "pl-80" : "pl-24"}`}>
                        <ImageLabeledDropdown
                            name="label"
                            states={dropdownItems}
                            control={control}
                            className="w-52"
                            onChange={changeCompany}
                        />
                    </div>
                    <div className="flex h-full flex-row place-items-center">
                        <Link
                            to="/"
                            className="hover:border-blue-primary hover:text-blue-primary mr-6 flex h-full cursor-pointer items-center justify-center border-b-2 border-transparent transition-colors">
                            Employer
                        </Link>
                        <div className="border-l-2">
                            <Profile />
                        </div>
                    </div>
                </div>
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`fixed z-50 flex h-full flex-col place-items-center justify-between bg-white px-2 pb-6 pt-4 shadow-md ${isHovered ? "w-[18rem]" : "w-[5rem]"} transition-all duration-500 ease-in-out`}>
                    <div className="flex w-full flex-col gap-8">
                        <div className="text-blue-primary flex flex-row justify-center text-center align-middle font-bebas text-5xl">
                            <div className="flex flex-col">
                                <span>
                                    H
                                    <span className={`${isHovered ? "static opacity-100" : "absolute opacity-0"} transition-opacity duration-300 ease-linear`}>
                                        IREVERSE
                                    </span>
                                </span>
                                <span
                                    className={`${isHovered ? "opacity-100" : "opacity-0"} mt-[-0.5rem] text-lg text-black transition-opacity duration-300 ease-linear`}>
                                    EMPLOYERS
                                </span>
                            </div>
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
                                            <span className={`overflow-hidden`}>{menu.name}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                            <hr className="my-8" />
                            <button
                                onClick={toggleModal}
                                className="hover:bg-signature-hover-gray m-1 flex cursor-pointer flex-row place-items-center gap-2 rounded-md border-l-2 border-transparent p-3">
                                <RiMailOpenLine className="min-w-[1.5rem]" />
                                <span className={`overflow-hidden`}>Invitations</span>
                            </button>
                            <Link
                                to="/employer/register"
                                className="hover:bg-signature-hover-gray m-1 flex cursor-pointer flex-row place-items-center gap-2 rounded-md border-l-2 border-transparent p-3">
                                <BsBuilding className="min-w-[1.5rem]" />
                                <span className={`overflow-hidden`}>Register</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={`flex h-full ${isHovered ? "min-w-[18rem]" : "min-w-[5rem]"} transition-all duration-500 ease-in-out`} />
                <div className="flex-grow-1 flex h-full w-full flex-1 flex-col">
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
