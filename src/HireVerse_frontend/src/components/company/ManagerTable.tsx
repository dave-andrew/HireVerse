import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { useRemoveInvitation } from "../../datas/mutations/companyMutations";
import { Company, User, UserInvitation } from "../../../../declarations/HireVerse_company/HireVerse_company.did";

/**
 * ManagerTable is a functional component that renders a table of managers.
 * Each manager includes details such as UID, Full Name, Email, Birth Date, and Status.
 * The table also includes an action button for each manager, represented by a trash icon.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {UserInvitation[] | undefined} props.companyInvitation - The company invitations.
 * @param {Company | null} props.selectedCompany - The selected company.
 * @param {boolean} props.isFetchingInvitation - The state of fetching invitations.
 * @param {Function} props.refetchInvitation - The function to refetch invitations.
 * @param {User[] | null | undefined} props.managerData - The manager data.
 * @returns JSX.Element A table of managers.
 */

export default function ManagerTable({
    companyInvitation,
    selectedCompany,
    isFetchingInvitation,
    refetchInvitation,
    managerData,
}: {
    companyInvitation: UserInvitation[] | undefined;
    selectedCompany: Company | null;
    isFetchingInvitation: boolean;
    refetchInvitation: () => void;
    managerData: User[] | null | undefined;
}) {
    const [isLoadingRemove, setIsLoadingRemove] = useState(false);
    const removeMutation = useRemoveInvitation();
    const removeInvitation = (invite_id: string) => {
        setIsLoadingRemove(true);
        removeMutation.mutate(invite_id, {
            onSuccess: () => {
                console.log("Success rejecting invitation");
                setIsLoadingRemove(false);
                refetchInvitation();
            },
            onError: (error) => {
                console.error(error);
                setIsLoadingRemove(false);
            },
        });
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {managerData && !isFetchingInvitation ? (
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
                                className="hidden py-3 lg:table-cell">
                                Email
                            </th>
                            <th
                                scope="col"
                                className="hidden py-3 md:table-cell">
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
                        {managerData.map((manager, index) => (
                            <tr
                                key={index}
                                className="border-b odd:bg-white even:bg-gray-50">
                                <th className="whitespace-nowrap px-2 py-4 text-center font-medium text-black">{index + 1}</th>
                                <th className="w-1/12 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap pr-4">
                                    {manager.internet_identity.toText()}
                                </th>
                                <td className="font-bold text-black">
                                    {manager.first_name} {manager.last_name}
                                </td>
                                <td className="hidden lg:table-cell">{manager.email}</td>
                                <td className="hidden md:table-cell 2xl:pr-24">
                                    {new Date(manager.birth_date).toLocaleDateString("en-US", {
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
                        ))}

                        {companyInvitation?.map((invitation, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="border-b odd:bg-white even:bg-gray-50">
                                    <th className="whitespace-nowrap px-2 py-4 text-center font-medium text-black">
                                        {managerData?.length ? managerData?.length + index + 1 : index + 1}
                                    </th>
                                    <th className="w-1/12 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap pr-4">
                                        {invitation.user.internet_identity.toText()}
                                    </th>
                                    <td className="font-bold text-black">
                                        {invitation.user.first_name} {invitation.user.last_name}
                                    </td>
                                    <td className="hidden lg:table-cell">{invitation.user.email}</td>
                                    <td className="hidden md:table-cell 2xl:pr-24">
                                        {new Date(invitation.user.birth_date).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className={"pr-4 font-semibold text-yellow-600"}>Pending</td>
                                    <td className="px-3">
                                        <button
                                            onClick={() => {
                                                removeInvitation(invitation.invite.id);
                                            }}
                                            disabled={isLoadingRemove}
                                            className="w-fit rounded-md bg-red-700 p-2 text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-gray-400">
                                            <FaRegTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div className="h-24 w-full rounded-md  bg-white text-left">
                    <div className="h-full w-full animate-pulse bg-gray-400"></div>
                </div>
            )}
        </div>
    );
}
