import { ReactNode, useEffect, useState } from "react";
import Profile from "../navbar/Profile";
import { IconType } from "react-icons";
import { useLocation } from "react-router-dom";
import {
    RiHome4Line,
    RiMailOpenLine,
    RiSuitcase2Line,
    RiUser3Line,
} from "react-icons/ri";
import { useForm } from "react-hook-form";
import useService from "../../hooks/useService";
import { Result } from "../../../../../.dfx/local/canisters/HireVerse_company/service.did";
import { isOk } from "../../utils/resultGuarder";
import ImageLabeledDropdown, {
    DropdownItems,
} from "../form/ImageLabeledDropdown";

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

interface IDropdownForm {
    label: string;
    value: string;
    img: string;
}

export default function ManagementBars({ children }: Props) {
    const { control, setValue, getValues } = useForm<IDropdownForm>({
        defaultValues: {},
    });
    const { companyService } = useService();
    const [managedCompanies, setManagedCompanies] = useState<DropdownItems[]>(
        [],
    );
    const [menus, setMenus] = useState<Menu[]>([]);
    const location = useLocation();

    const getCompanies = async () => {
        const companies: Result = await companyService.getManagedCompanies();

        if (isOk(companies)) {
            const temp: DropdownItems[] = companies.ok.map((company) => ({
                label: company.name,
                value: company.name,
                img: "a",
            }));

            console.log(companies.ok);
            setManagedCompanies(temp);
            setValue("label", temp[0].label);
            setValue("value", temp[0].value);
            setValue("img", temp[0].img ?? "");
            console.log(getValues());
        }
    };

    useEffect(() => {
        getCompanies();
        setMenus(defaultMenu);
    }, []);

    const isActive = (menu: string[]) => menu.includes(location.pathname);

    return (
        <div className="flex h-[100vh] w-[100vw] flex-row">
            <div className="fixed z-50 flex h-16 w-full flex-row justify-between bg-white shadow-md">
                <div className="flex h-full flex-row place-items-center pl-64">
                    <ImageLabeledDropdown
                        name="company"
                        states={managedCompanies}
                        control={control}
                        className="w-52"
                    />
                </div>
                <div className="flex h-full flex-row place-items-center">
                    <a
                        href="/"
                        className="hover:border-blue-primary mr-6 flex h-full cursor-pointer items-center justify-center border-b-2 border-transparent transition-colors">
                        Employee
                    </a>
                    <div className="border-l-2">
                        <Profile />
                    </div>
                </div>
            </div>

            <div className="fixed z-50 flex h-full w-[16rem] flex-col place-items-center justify-between bg-white px-2 pb-6 pt-4 shadow-md">
                <div className="flex w-full flex-col gap-8">
                    <div className="text-blue-primary text-center align-middle font-bebas text-5xl">
                        HIREVERSE
                    </div>
                    <div className="flex flex-col text-lg text-gray-500">
                        {managedCompanies.length > 0 &&
                            menus.map((menu, index) => (
                                <div
                                    key={index}
                                    className={`hover:bg-signature-hover-gray m-1 flex cursor-pointer flex-row place-items-center gap-4 border-l-2 border-transparent p-3 ${isActive(menu.activeUrl) ? "text-blue-primary bg-signature-gray border-color-blue-primary" : ""}`}>
                                    <menu.icon size="1.5rem" />
                                    <span>{menu.name}</span>
                                </div>
                            ))}
                        {managedCompanies?.length > 0 && (
                            <hr className="my-5" />
                        )}
                        <div className="hover:bg-signature-hover-gray m-1 flex cursor-pointer flex-row place-items-center gap-4 border-l-2 border-transparent p-3">
                            <RiMailOpenLine size="1.5rem" />
                            <span>Invite</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex h-full min-w-[16rem]" />
            <div className="flex-grow-1 flex h-full w-full flex-col">
                <div className="min-h-16 w-full" />
                {children}
            </div>
        </div>
    );
}
