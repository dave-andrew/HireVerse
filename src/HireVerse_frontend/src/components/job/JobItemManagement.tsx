import WrappedDropdown from "../utils/WrappedDropdown";
import { Menu } from "@headlessui/react";
import { SlOptions } from "react-icons/sl";
import CardLayout from "../../layouts/CardLayout";
import { Job } from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import { BiHide, BiShow, BiTrash } from "react-icons/bi";
import { JobStatus } from "../../utils/enums";
import useService from "../../hooks/useService";

interface Props {
    job: Job;
}

export default function JobItemManagement({ job }: Props) {
    const { jobService } = useService();
    const toggleJobVisibility = async () => {
        jobService.toggleJobVisibility(job.id);
    };

    return (
        <CardLayout className="flex flex-col p-6 shadow-md">
            <div className="flex flex-row font-bold text-xl items-center justify-between gap-2 pb-5">
                <div className="flex flex-col w-full">
                    <div className="flex flex-row w-full justify-between text-2xl font-semibold">
                        <div className="flex flex-row justify-center items-center gap-2">
                            <span className="flex flex-wrap">
                                {job.position}
                            </span>
                            <span className="inline-flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-2 rounded-lg">
                                <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                Active
                            </span>
                        </div>
                        <span>
                            <WrappedDropdown
                                itemClassName="!w-44"
                                button={
                                    <Menu.Button className="flex flex-row cursor-pointer hover:bg-signature-gray p-2 rounded-lg">
                                        <SlOptions size="1rem" />
                                    </Menu.Button>
                                }>
                                <div className="px-1 py-1">
                                    {job.status === JobStatus.Active ? (
                                        <Menu.Item>
                                            <div
                                                className="flex flex-row items-center gap-2 text-gray-90 font-normal hover:bg-signature-gray p-1 pl-4 text-lg cursor-pointer"
                                                onClick={toggleJobVisibility}>
                                                <BiHide />
                                                Hide Job
                                            </div>
                                        </Menu.Item>
                                    ) : (
                                        <Menu.Item>
                                            <div
                                                className="flex flex-row items-center gap-2 text-gray-90 font-normal hover:bg-signature-gray p-1 pl-4 text-lg cursor-pointer"
                                                onClick={toggleJobVisibility}>
                                                <BiShow />
                                                Show Job
                                            </div>
                                        </Menu.Item>
                                    )}
                                    <Menu.Item>
                                        <div
                                            className="flex flex-row items-center gap-2 text-gray-90 font-normal hover:bg-signature-gray p-1 pl-4 text-lg cursor-pointer"
                                            onClick={() => console.log("Edit")}>
                                            <BiTrash />
                                            Delete Job
                                        </div>
                                    </Menu.Item>
                                </div>
                            </WrappedDropdown>
                        </span>
                    </div>
                    <div className="flex flex-row w-full justify-between text-lg font-normal">
                        <span>{job.location}</span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="flex flex-row pt-5 font-normal text-gray-700 text-lg">
                {job.short_description}
            </div>
            <div className="flex flex-row">{job.location}</div>
            <div className="flex flex-row">
                {Number(job.salary_start)} - {Number(job.salary_end)}
            </div>
            <div className="flex flex-row">
                {new Date(Number(job.timestamp)).toLocaleDateString()}
            </div>
        </CardLayout>
    );
}
