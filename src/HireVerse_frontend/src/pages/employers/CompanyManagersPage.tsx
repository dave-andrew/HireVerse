import ManagementPageLayout from "../../layouts/ManagementPageLayout";
import { IoIosSearch } from "react-icons/io";
import CardLayout from "../../layouts/CardLayout";
import { useEffect, useState } from "react";
import ManagerTable from "../../components/company/ManagerTable";
import InviteManagerModal from "../../components/modal/InviteManagerModal";
import { getGetCompanyInvitations } from "../../datas/queries/companyQueries";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Company } from "../../../../declarations/HireVerse_company/HireVerse_company.did";

export default function CompanyManagersPage() {
    let [isModalShown, setIsModalShown] = useState(false);

    const toggleModal = () => {
        setIsModalShown(!isModalShown);
    };

    const [selectedCompany, setSelectedCompany] = useLocalStorage<Company | null>("selectedCompany", null);

    let { data: companyInvitation, refetch: getCompanyInvitation, isFetching } = getGetCompanyInvitations(selectedCompany?.id);

    useEffect(() => {
        getCompanyInvitation();
    }, [selectedCompany]);

    return (
        <>
            <div className="absolute z-0 h-96 w-full bg-[url(/backgrounds/liquid-cheese.svg)] bg-cover opacity-50"></div>
            <ManagementPageLayout>
                <div className="z-10 flex flex-col gap-8 px-14 py-8">
                    <div className="flex flex-col gap-4">
                        <div className="mt-8 text-4xl font-bold">Managers</div>
                        <div className="flex flex-col">
                            <div className="font-semibold text-gray-600">These person are responsible for managing job posting in this company.</div>
                            <div className="text-gray-600">
                                Once invited you cannot kick the manager, you may ask them to kindly leave managing the company instead.
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex h-12 flex-row place-items-end justify-end gap-4">
                            <CardLayout className="flex h-full w-96 flex-row items-center bg-white">
                                <span className="has-[:focus]:ring-signature-primary flex flex-1 flex-row gap-2 rounded-bl-xl rounded-tl-xl p-3  transition-colors has-[:focus]:bg-gray-100 has-[:focus]:ring-2">
                                    <IoIosSearch size="1.5rem" />
                                    <input
                                        type="text"
                                        className="w-full bg-transparent outline-0"
                                        placeholder="Search Job"
                                    />
                                </span>
                            </CardLayout>
                            <button
                                className="h-full"
                                onClick={toggleModal}>
                                <CardLayout className="flex h-full place-items-center justify-center rounded-xl px-8 py-4 hover:bg-gray-100">
                                    + Add Manager
                                </CardLayout>
                            </button>
                        </div>
                        <ManagerTable
                            companyInvitation={companyInvitation}
                            selectedCompany={selectedCompany}
                            isFetchingInvitation={isFetching}
                            refetchInvitation={getCompanyInvitation}
                        />
                    </div>
                </div>
                <InviteManagerModal
                    isModalShown={isModalShown}
                    toggleModal={toggleModal}
                    refetchInvitation={getCompanyInvitation}
                />
            </ManagementPageLayout>
        </>
    );
}
