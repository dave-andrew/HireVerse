import { FaRegTrashAlt } from "react-icons/fa";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Company } from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import { useQueryManagersFromCompany } from "../../datas/queries/jobQueries";

export default function ManagerTable() {
    const [selectedCompany, setSelectedCompany] =
        useLocalStorage<Company | null>("selectedCompany", null);

    const { data: managerData, refetch: getJobs } = useQueryManagersFromCompany(
        selectedCompany?.id,
    );

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
                            className="py-3">
                            Joined Date
                        </th>
                        <th
                            scope="col"
                            className="py-3">
                            Email
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
                                <th className="w-fit overflow-hidden whitespace-nowrap text-nowrap px-2 font-medium text-black">
                                    {manager.internet_identity.toText()}
                                </th>
                                <td className="font-bold text-black lg:pr-12">
                                    {manager.first_name} {manager.last_name}
                                </td>
                                <td>
                                    {" "}
                                    {new Date(
                                        manager.birth_date,
                                    ).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </td>
                                <td className="pr-0 xl:pr-60">
                                    {manager.email}
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
                                <td className="pl-3">
                                    <div className="w-fit rounded-md bg-red-700 p-2 text-white">
                                        <FaRegTrashAlt />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
