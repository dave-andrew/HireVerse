import { FaRegTrashAlt } from "react-icons/fa";

export default function ManagerTable() {
    let managerData = [
        {
            uid: "123456",
            fullName: "John Doe",
            email: "john-doe@gmail.com",
            birthDate: "12/12/2021",
            status: "Active",
        },
        {
            uid: "123456",
            fullName: "John Doe",
            email: "john-doe@gmail.com",
            birthDate: "12/12/2021",
            status: "Active",
        },
        {
            uid: "123456",
            fullName: "John Doe",
            email: "john-doe@gmail.com",
            birthDate: "12/12/2021",
            status: "Active",
        },
        {
            uid: "123456",
            fullName: "John Doe",
            email: "john-doe@gmail.com",
            birthDate: "12/12/2021",
            status: "Active",
        },
        {
            uid: "123456",
            fullName: "John Doe",
            email: "john-doe@gmail.com",
            birthDate: "12/12/2021",
            status: "Active",
        },
    ];
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th
                            scope="col"
                            className="flex justify-center px-4 py-3">
                            No
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-3">
                            UID
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3">
                            Full Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3">
                            Birth Date
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3">
                            Email
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {managerData.map((manager, index) => {
                        return (
                            <tr
                                key={index}
                                className="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                                <td className="flex place-items-start justify-center px-4">
                                    {index + 1}
                                </td>
                                <th className="whitespace-nowrap px-2 font-medium text-black">
                                    {manager.uid}
                                </th>
                                <td className="px-6">{manager.fullName}</td>
                                <td className="px-6">{manager.birthDate}</td>
                                <td className="px-6">{manager.email}</td>
                                <td
                                    className={
                                        "px-6 font-semibold " +
                                        (manager.status == "Active"
                                            ? "text-green-600"
                                            : manager.status == "Pending"
                                              ? "text-yellow-600"
                                              : "text-red-600")
                                    }>
                                    {manager.status}
                                </td>
                                <td className="flex justify-start pl-3">
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
