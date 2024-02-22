import { FaRegTrashAlt } from "react-icons/fa";

export default function ManagerTable() {

    let managerData = [{
        uid: "123456",
        fullName: "John Doe",
        email: "john-doe@gmail.com",
        birthDate: "12/12/2021",
        status: "Active"
    }, {
        uid: "123456",
        fullName: "John Doe",
        email: "john-doe@gmail.com",
        birthDate: "12/12/2021",
        status: "Active"
    }, {
        uid: "123456",
        fullName: "John Doe",
        email: "john-doe@gmail.com",
        birthDate: "12/12/2021",
        status: "Active"
    }, {
        uid: "123456",
        fullName: "John Doe",
        email: "john-doe@gmail.com",
        birthDate: "12/12/2021",
        status: "Active"
    }, {
        uid: "123456",
        fullName: "John Doe",
        email: "john-doe@gmail.com",
        birthDate: "12/12/2021",
        status: "Active"
    }]
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-4 flex justify-center">
                        No
                    </th>
                    <th scope="col" className="px-2 py-3">
                        UID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Full Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Birth Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {managerData.map((manager, index) => {
                    return (
                        <tr key={index}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b">
                            <td className="px-4 py-4 flex justify-center">
                                {index + 1}
                            </td>
                            <th className="px-2 py-4 font-medium text-black whitespace-nowrap">
                                {manager.uid}
                            </th>
                            <td className="px-6 py-4">
                                {manager.fullName}
                            </td>
                            <td className="px-6 py-4">
                                {manager.birthDate}
                            </td>
                            <td className="px-6 py-4">
                                {manager.email}
                            </td>
                            <td className={"font-semibold px-6 py-4 " + (manager.status == "Active" ? "text-green-600" : manager.status == "Pending" ? "text-yellow-600" : "text-red-600")}>
                                {manager.status}
                            </td>
                            <td className="flex place-items-center justify-start">
                                <div className="p-2 bg-red-700 rounded-md text-white w-fit">
                                    <FaRegTrashAlt/>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>

    )
}