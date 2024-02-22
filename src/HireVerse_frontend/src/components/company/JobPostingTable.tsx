import {FaRegTrashAlt} from "react-icons/fa";


export default function JobPostingTable() {
    let postingData = [{
        position: "Software Engineer",
        industry: "Technology",
        location: "Jakarta, Indonesia",
        shortDesc: "We are looking for a software engineer to join our team",
        salary: "Rp. 10.000.000 - Rp. 15.000.000"
    }, {
        position: "Software Engineer",
        industry: "Technology",
        location: "Jakarta, Indonesia",
        shortDesc: "We are looking for a software engineer to join our team",
        salary: "Rp. 10.000.000 - Rp. 15.000.000"
    }, {
        position: "Software Engineer",
        industry: "Technology",
        location: "Jakarta, Indonesia",
        shortDesc: "We are looking for a software engineer to join our team",
        salary: "Rp. 10.000.000 - Rp. 15.000.000"
    }, {
        position: "Software Engineer",
        industry: "Technology",
        location: "Jakarta, Indonesia",
        shortDesc: "We are looking for a software engineer to join our team",
        salary: "Rp. 10.000.000 - Rp. 15.000.000"
    }, {
        position: "Software Engineer",
        industry: "Technology",
        location: "Jakarta, Indonesia",
        shortDesc: "We are looking for a software engineer to join our team",
        salary: "Rp. 10.000.000 - Rp. 15.000.000"
    }]
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-8 py-3">
                        Position
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Industries
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Location
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Short Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Salary
                    </th>
                    <th scope="col" className="text-center pr-8">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {postingData.map((posting, index) => {
                    return (
                        <tr key={index}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b">
                            <th className="px-8 py-4 font-medium text-black whitespace-nowrap">
                                {posting.position}
                            </th>
                            <td className="px-6 py-4">
                                {posting.industry}
                            </td>
                            <td className="px-6 py-4">
                                {posting.location}
                            </td>
                            <td className="px-6 py-4">
                                {posting.shortDesc}
                            </td>
                            <td className="px-6 py-4">
                                {posting.salary}
                            </td>
                            <td className="flex place-items-center h-full justify-center pr-8 py-3">
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