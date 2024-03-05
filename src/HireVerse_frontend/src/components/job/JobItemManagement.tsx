import WrappedDropdown from "../form/WrappedDropdown";
import { Menu } from "@headlessui/react";
import { SlOptions } from "react-icons/sl";
import CardLayout from "../../layouts/CardLayout";
import { Job } from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import { BiHide, BiShow, BiTrash } from "react-icons/bi";
import { JobStatus } from "../../utils/enums";
import { Dispatch, SetStateAction } from "react";
import { useToggleJobVisibility } from "../../datas/mutations/jobMutation";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Company } from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import EmployTypeIndicator from "./EmployTypeIndicator";
import { convertTimeInterval } from "../../utils/convertTimeInterval";
import purifyDOM from "../../utils/purifyDOM";

interface Props {
    job: Job;
    setConfirmationState: Dispatch<SetStateAction<boolean>>;
    onClick?: () => void;
}

export default function JobItemManagement({ job, setConfirmationState, onClick }: Props) {
    const [selectedCompany, setSelectedCompany] = useLocalStorage<Company | null>("selectedCompany", null);
    const mutation = useToggleJobVisibility();

    const toggleJobVisibility = async () => {
        if (!selectedCompany) {
            return;
        }
        mutation.mutate({
            jobId: job.id,
            companyId: selectedCompany.id,
        });
    };

    return (
        <CardLayout
            onClick={onClick}
            className="flex min-h-64 flex-col p-6 shadow-md">
            <div className="flex flex-row items-center justify-between gap-2 pb-5 text-xl font-bold">
                <div className="flex w-full flex-col">
                    <div className="flex w-full flex-row justify-between text-2xl font-semibold">
                        <div className="flex flex-row  flex-wrap items-center gap-2">
                            <span className="flex">{job.position}</span>
                            {job.status === JobStatus.Active ? (
                                <span className="inline-flex items-center rounded-lg bg-green-200 px-2.5 py-1 text-xs font-medium text-green-800">
                                    <span className="me-1 h-2 w-2 rounded-full bg-green-500"></span>
                                    Active
                                </span>
                            ) : (
                                <span className="inline-flex items-center rounded-lg bg-red-200 px-2.5 py-1 text-xs font-medium text-red-800">
                                    <span className="me-1 h-2 w-2 rounded-full bg-red-500"></span>
                                    Hidden
                                </span>
                            )}
                            <EmployTypeIndicator employType={job.employType} />
                        </div>
                        <span className="self-start">
                            <WrappedDropdown
                                className="!z-[50]"
                                itemClassName="!w-44"
                                button={
                                    <Menu.Button className="hover:bg-signature-gray relative z-0 flex cursor-pointer flex-row rounded-lg p-2 ">
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
                                            onClick={() => setConfirmationState(true)}>
                                            <BiTrash />
                                            Delete Job
                                        </div>
                                    </Menu.Item>
                                </div>
                            </WrappedDropdown>
                        </span>
                    </div>
                    <div className="flex w-full flex-row justify-between text-lg font-normal">
                        <span className="flex flex-row items-center gap-3">
                            <span>
                                at <b> {job.location} </b>
                            </span>{" "}
                        </span>
                    </div>
                    <div className="flex w-full flex-row justify-between text-sm font-normal">Posted {convertTimeInterval(job.timestamp)}</div>
                </div>
            </div>
            <hr />
            <div className="flex h-full flex-col justify-between">
                <div
                    className="flex flex-row pt-5 text-lg font-normal text-gray-700"
                    dangerouslySetInnerHTML={{ __html: purifyDOM(job.short_description) }}></div>
                <div className="flex flex-row gap-2">
                    <span>Salary:</span>
                    <b>
                        {job.currency} {Number(job.salary_start)} - {job.currency} {Number(job.salary_end)}
                    </b>
                </div>
            </div>
        </CardLayout>
    );
}
