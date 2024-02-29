import WrappedDropdown from "../utils/WrappedDropdown";
import { Menu } from "@headlessui/react";
import { SlOptions } from "react-icons/sl";
import CardLayout from "../../layouts/CardLayout";
import { Job } from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import { BiHide, BiShow, BiTrash } from "react-icons/bi";
import { JobStatus } from "../../utils/enums";
import useService from "../../hooks/useService";
import { Dispatch, SetStateAction } from "react";

interface Props {
    job: Job;
    setJobs: Dispatch<SetStateAction<Job[]>>;
    setConfirmationState: Dispatch<SetStateAction<boolean>>;
    onClick?: () => void;
}

export default function JobItemManagement({
    job,
    setJobs,
    setConfirmationState,
    onClick,
}: Props) {
    const { getJobService } = useService();

    const toggleJobVisibility = async () => {
        await getJobService().then((s) => s.toggleJobVisibility(job.id));
        setJobs((prev) =>
            prev.map((j) => {
                if (j.id === job.id) {
                    if (j.status === JobStatus.Active) {
                        return { ...j, status: JobStatus.Hidden };
                    }
                    return { ...j, status: JobStatus.Active };
                }
                return j;
            }),
        );
    };

    return (
        <CardLayout
            onClick={onClick}
            className="flex flex-col p-6 shadow-md">
            <div className="flex flex-row items-center justify-between gap-2 pb-5 text-xl font-bold">
                <div className="flex w-full flex-col">
                    <div className="flex w-full flex-row justify-between text-2xl font-semibold">
                        <div className="flex flex-row items-center justify-center gap-2">
                            <span className="flex flex-wrap">
                                {job.position}
                            </span>
                            {job.status === JobStatus.Active ? (
                                <span className="inline-flex items-center rounded-lg bg-green-200 px-2.5 py-2 text-xs font-medium text-green-800">
                                    <span className="me-1 h-2 w-2 rounded-full bg-green-500"></span>
                                    Active
                                </span>
                            ) : (
                                <span className="inline-flex items-center rounded-lg bg-red-200 px-2.5 py-2 text-xs font-medium text-red-800">
                                    <span className="me-1 h-2 w-2 rounded-full bg-red-500"></span>
                                    Hidden
                                </span>
                            )}
                        </div>
                        <span>
                            <WrappedDropdown
                                className="!z-[50]"
                                itemClassName="!w-44"
                                button={
                                    <Menu.Button className="relative z-0 hover:bg-signature-gray flex cursor-pointer flex-row rounded-lg p-2 ">
                                        <SlOptions size="1rem" />
                                    </Menu.Button>
                                }>
                                <div className="px-1 py-1">
                                    {job.status === JobStatus.Active ? (
                                        <Menu.Item>
                                            <div
                                                className="text-gray-90 hover:bg-signature-gray flex cursor-pointer flex-row items-center gap-2 p-1 pl-4 text-lg font-normal"
                                                onClick={toggleJobVisibility}>
                                                <BiHide />
                                                Hide Job
                                            </div>
                                        </Menu.Item>
                                    ) : (
                                        <Menu.Item>
                                            <div
                                                className="text-gray-90 hover:bg-signature-gray flex cursor-pointer flex-row items-center gap-2 p-1 pl-4 text-lg font-normal"
                                                onClick={toggleJobVisibility}>
                                                <BiShow />
                                                Show Job
                                            </div>
                                        </Menu.Item>
                                    )}
                                    <Menu.Item>
                                        <div
                                            className="text-gray-90 hover:bg-signature-gray flex cursor-pointer flex-row items-center gap-2 p-1 pl-4 text-lg font-normal"
                                            onClick={() =>
                                                setConfirmationState(true)
                                            }>
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
                {new Date(Number(job.timestamp) / 1000000).toLocaleDateString()}
            </div>
        </CardLayout>
    );
}
