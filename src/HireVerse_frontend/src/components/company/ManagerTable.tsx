import { FaRegTrashAlt } from "react-icons/fa";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Company, UserInvitation } from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import { useQueryManagersFromCompany } from "../../datas/queries/jobQueries";
import { useQueryGetCompanyInvitations } from "../../datas/queries/companyQueries";
import { useEffect, useState } from "react";
import { useRemoveInvitation } from "../../datas/mutations/companyMutations";

export default function ManagerTable({ companyInvitation, selectedCompany, isFetchingInvitation , refetchInvitation}: {
    companyInvitation: UserInvitation[] | undefined,
    selectedCompany: Company | null,
    isFetchingInvitation: boolean
    refetchInvitation: () => void
}) {

    const { data: managerData, refetch: getManagers } = useQueryManagersFromCompany(
        selectedCompany?.id,
    );

    const [isLoadingRemove, setIsLoadingRemove] = useState(false);
    const removeMutation = useRemoveInvitation();
    const removeInvitation = (invite_id: string) => {
        setIsLoadingRemove(true);
        removeMutation.mutate(invite_id, {
            onSuccess: () => {
                console.log("Success rejecting invitation");
                setIsLoadingRemove(false);
                refetchInvitation()
            },
            onError: (error) => {
                console.error(error);
                setIsLoadingRemove(false);
            },
        });
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                    <th
                        scope="col"
                        className="flex justify-center px-4 py-3">
                        No
                    </th>
                    <th
                        scope="col"
                        className="w-fit px-2 py-3">
                        UID
                    </th>
                    <th
                        scope="col"
                        className="py-3">
                        Full Name
                    </th>
                    <th
                        scope="col"
                        className="py-3 lg:table-cell hidden">
                        Email
                    </th>
                    <th
                        scope="col"
                        className="md:table-cell hidden py-3">
                        Birth Date
                    </th>
                    <th
                        scope="col"
                        className="py-3">
                        Status
                    </th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {managerData?.map((manager, index) => {
                    return (
                        <tr
                            key={index}
                            className="border-b odd:bg-white even:bg-gray-50">
                            <th className="whitespace-nowrap px-2 py-4 text-center font-medium text-black">
                                {index + 1}
                            </th>
                            <th className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap w-1/12 pr-4">
                                {manager.internet_identity.toText()}
                            </th>
                            <td className="font-bold text-black">
                                {manager.first_name} {manager.last_name}
                            </td>
                            <td className="lg:table-cell hidden">
                                {manager.email}
                            </td>
                            <td className="md:table-cell hidden 2xl:pr-24">
                                {new Date(
                                    manager.birth_date,
                                ).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </td>
                            <td
                                className={
                                    "pr-4 font-semibold text-green-600"
                                    // : manager.status == "Pending"
                                    //     ? "text-yellow-600"
                                    //     : "text-red-600")
                                }>
                                Active
                            </td>
                            <td className="px-3">
                                {/*<div className="w-fit rounded-md bg-red-700 p-2 text-white">*/}
                                {/*    <FaRegTrashAlt />*/}
                                {/*</div>*/}
                            </td>
                        </tr>
                    );
                })}
                {isFetchingInvitation ?
                    <div role="status" className="px-2 m-4">
                        <svg aria-hidden="true"
                             className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                    </div>
                    : companyInvitation?.map((invitation, index) => {
                        return (
                            <tr
                                key={index}
                                className="border-b odd:bg-white even:bg-gray-50">
                                <th className="whitespace-nowrap px-2 py-4 text-center font-medium text-black">
                                    {managerData?.length ? managerData?.length + index + 1 : index + 1}
                                </th>
                                <th className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap w-1/12 pr-4">
                                    {invitation.user.internet_identity.toText()}
                                </th>
                                <td className="font-bold text-black">
                                    {invitation.user.first_name} {invitation.user.last_name}
                                </td>
                                <td className="lg:table-cell hidden">
                                    {invitation.user.email}
                                </td>
                                <td className="md:table-cell hidden 2xl:pr-24">
                                    {new Date(
                                        invitation.user.birth_date,
                                    ).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </td>
                                <td
                                    className={
                                        "pr-4 font-semibold text-yellow-600"
                                    }>
                                    Pending
                                </td>
                                <td className="px-3">
                                    <button
                                        onClick={() => {
                                            removeInvitation(invitation.invite.id);
                                        }}
                                        disabled={isLoadingRemove}
                                        className="disabled:bg-gray-400 hover:bg-red-800 disabled:cursor-not-allowed w-fit rounded-md bg-red-700 p-2 text-white">
                                        <FaRegTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
