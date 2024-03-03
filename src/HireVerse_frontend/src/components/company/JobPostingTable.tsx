import { FaRegTrashAlt } from "react-icons/fa";

export default function JobPostingTable() {
    let postingData = [
        {
            position: "Software Engineer",
            industry: "Technology",
            location: "Jakarta, Indonesia",
            shortDesc:
                "We are looking for a software engineer to join our team",
            salary: "Rp. 10.000.000 - Rp. 15.000.000",
        },
        {
            position: "Software Engineer",
            industry: "Technology",
            location: "Jakarta, Indonesia",
            shortDesc:
                "We are looking for a software engineer to join our team",
            salary: "Rp. 10.000.000 - Rp. 15.000.000",
        },
        {
            position: "Software Engineer",
            industry: "Technology",
            location: "Jakarta, Indonesia",
            shortDesc:
                "We are looking for a software engineer to join our team",
            salary: "Rp. 10.000.000 - Rp. 15.000.000",
        },
        {
            position: "Software Engineer",
            industry: "Technology",
            location: "Jakarta, Indonesia",
            shortDesc:
                "We are looking for a software engineer to join our team",
            salary: "Rp. 10.000.000 - Rp. 15.000.000",
        },
        {
            position: "Software Engineer",
            industry: "Technology",
            location: "Jakarta, Indonesia",
            shortDesc:
                "We are looking for a software engineer to join our team",
            salary: "Rp. 10.000.000 - Rp. 15.000.000",
        },
    ];
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th
                            scope="col"
                            className="px-8 py-3">
                            Position
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3">
                            Industries
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3">
                            Location
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3">
                            Short Description
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3">
                            Salary
                        </th>
                        <th
                            scope="col"
                            className="pr-8 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {postingData.map((posting, index) => {
                        return (
                            <tr
                                key={index}
                                className="border-b odd:bg-white even:bg-gray-50">
                                <th className="whitespace-nowrap px-8 py-4 font-medium text-black">
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
                                <td className="px-6 py-4">{posting.salary}</td>
                                <td className="flex h-full place-items-center justify-center py-3 pr-8">
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
