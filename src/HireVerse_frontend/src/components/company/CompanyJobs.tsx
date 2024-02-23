import ManagementPageLayout from "../../layouts/ManagementPageLayout";
import { IoIosSearch } from "react-icons/io";
import CardLayout from "../../layouts/CardLayout";
import JobPostingTable from "./JobPostingTable";
import Modal from "../modal/Modal";
import { useState } from "react";

export default function CompanyJobs() {

    let [isModalShown, setIsModalShown] = useState(false);


    const toggleModal = () => {
        setIsModalShown(!isModalShown);
    }

    return (
        <ManagementPageLayout>
            <div className={"px-14 py-8 flex flex-col gap-16"}>
                <div className={"text-4xl font-bold mt-8"}>Jobs</div>
                <div className={"flex flex-col gap-4"}>
                    <div
                        className={
                            "flex flex-row place-items-end justify-end h-12 gap-4"
                        }>
                        <CardLayout className="flex flex-row items-center w-96 h-full bg-white">
                            <span
                                className="flex flex-1 flex-row gap-2 p-3 has-[:focus]:bg-gray-100 transition-colors rounded-tl-xl rounded-bl-xl">
                                <IoIosSearch size="1.5rem" />
                                <input
                                    type="text"
                                    className="outline-0 w-full bg-transparent"
                                    placeholder="Search Job"
                                />
                            </span>
                        </CardLayout>
                        <button className="h-full" onClick={toggleModal}>
                            <CardLayout
                                className="h-full flex justify-center
                                place-items-center py-4 px-8
                                rounded-xl hover:bg-gray-100">
                                + Add Job
                            </CardLayout>
                        </button>
                    </div>
                    <JobPostingTable />
                </div>
            </div>
            <Modal handleClose={toggleModal} show={isModalShown} modalTitle={"Post Job Hiring"}>
                <div className={"grid grid-cols-2"}>
                    {/* Position Name Field */}
                    <div className="py-5 flex flex-col border-b border-gray-400 border-opacity-30">
                        <div className={"font-bold"}>Position Name</div>
                        <div className="text-sm">Input the name of your company.</div>
                    </div>
                    <div className={"py-5 border-b  border-gray-400 border-opacity-30"}>
                        <div className="border-gray-900 border h-full rounded-md">
                            <input type="text" className={"w-full h-full px-3  rounded-md"} />
                        </div>
                    </div>
                    {/* Industries Field */}
                    <div className="py-5 flex flex-col border-b border-gray-400 border-opacity-30">
                        <div className={"font-bold"}>Industries</div>
                        <div className="text-sm">Input the year your company was created.</div>
                    </div>
                    <div className={"py-5 border-b  border-gray-400 border-opacity-30"}>
                        <div className="border-gray-900 border h-full rounded-md">
                            <input type="text" className={"w-full h-full px-3  rounded-md"} />
                        </div>
                    </div>
                    {/* Salary Field */}
                    <div className="py-5 flex flex-col border-b border-gray-400 border-opacity-30">
                        <div className={"font-bold"}>Salary</div>
                        <div className="text-sm">Input the salary range for this position in your company.</div>
                    </div>
                    <div className={"py-5 border-b  border-gray-400 border-opacity-30"}>
                        <div className="border-gray-900 border h-full rounded-md">
                            <input type="text" className={"w-full h-full px-3  rounded-md"} />
                        </div>
                    </div>
                    {/* Short Description Field */}
                    <div className="py-5 flex flex-col border-b border-gray-400 border-opacity-30">
                        <div className={"font-bold"}>Short Description</div>
                        <div className="text-sm">Input the short description of this job.</div>
                    </div>
                    <div className={"py-5 border-b  border-gray-400 border-opacity-30"}>
                        <div className="border-gray-900 border h-full rounded-md">
                            <input type="text" className={"w-full h-full px-3  rounded-md"} />
                        </div>
                    </div>
                    {/* Requirements Field */}
                    <div className="py-5 flex flex-col border-b border-gray-400 border-opacity-30">
                        <div className={"font-bold"}>Requirements</div>
                        <div className="text-sm">Input the requirements to get this role.</div>
                    </div>
                    <div className={"py-5 border-b  border-gray-400 border-opacity-30"}>
                        <div className="border-gray-900 border h-full rounded-md">
                            <input type="text" className={"w-full h-full px-3  rounded-md"} />
                        </div>
                    </div>
                    {/* Job Description Field */}
                    <div className="py-5 flex flex-col border-b border-gray-400 border-opacity-30">
                        <div className={"font-bold"}>Job Description</div>
                        <div className="text-sm">Describe what this role does in detail.</div>
                    </div>
                    <div className={"py-5 border-b  border-gray-400 border-opacity-30"}>
                        <div className="border-gray-900 border h-full rounded-md">
                            <input type="text" className={"w-full h-full px-3  rounded-md"} />
                        </div>
                    </div>
                    {/* Apply Website Field */}
                    <div className="py-5 flex flex-col border-b border-gray-400 border-opacity-30">
                        <div className={"font-bold"}>Apply Website Link</div>
                        <div className="text-sm">Input the website for employee to apply.</div>
                    </div>
                    <div className={"py-5 border-b  border-gray-400 border-opacity-30"}>
                        <div className="border-gray-900 border h-full rounded-md">
                            <input type="text" className={"w-full h-full px-3  rounded-md"} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center w-full gap-2 items-center">
                    <input
                        type="checkbox"
                        value=""
                        checked={true}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="font-medium text-gray-900 dark:text-gray-300">
                        I accept all the terms and requirements
                    </label>
                </div>
                <div className="flex justify-center w-full gap-2 items-center">
                    <button className={"bg-signature-yellow w-fit px-12 py-3 font-bold rounded-md shadow-md"}>
                        Post Job
                    </button>
                </div>
            </Modal>
        </ManagementPageLayout>
);
}
