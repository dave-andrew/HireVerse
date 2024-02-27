import ManagementPageLayout from "../../layouts/ManagementPageLayout";
import { IoIosSearch } from "react-icons/io";
import CardLayout from "../../layouts/CardLayout";
import { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import { IoAdd } from "react-icons/io5";
import TextDropdown from "../../components/form/TextDropdown";
import { useForm } from "react-hook-form";
import { Job } from "../../../../../.dfx/local/canisters/HireVerse_job/service.did";
import useService from "../../hooks/useService";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Company } from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import { CONSTANTS } from "../../utils/constants";
import { JobManagerFilterInput } from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import convertNullFormat from "../../utils/convertNullFormat";
import { isOk } from "../../utils/resultGuarder";
import handleKeyDown from "../../utils/handleKeyDown";

interface IQuerySortForm {
    query: string;
    order: string;
}

export default function CompanyJobs() {
    const [selectedCompany, setSelectedCompany] =
        useLocalStorage<Company | null>("selectedCompany", null);
    const { jobService } = useService();
    const { register, control, getValues } = useForm({
        defaultValues: {
            query: "",
            order: "Newest",
        },
    });
    const [jobs, setJobs] = useState<Job[]>([]);
    let [isModalShown, setIsModalShown] = useState(false);

    const toggleModal = () => {
        setIsModalShown(!isModalShown);
    };

    const getConvertedFilters = () => {
        const values = getValues();
        const jobFilter: JobManagerFilterInput = {
            order: convertNullFormat(values.order, ""),
            position: convertNullFormat(values.query, ""),
        };
        return jobFilter;
    };

    const getJobs = async () => {
        if (!selectedCompany) {
            return;
        }

        const response = await jobService.getJobPostedByCompany(
            selectedCompany.id,
            BigInt(0),
            BigInt(20),
            getConvertedFilters(),
        );

        console.log(response);
        if (isOk(response)) {
            setJobs(response.ok);
        }
    };

    useEffect(() => {
        getJobs();
    }, []);

    useEffect(() => {
        getJobs();
    }, [selectedCompany]);

    return (
        <>
            <div className="absolute z-0 h-96 w-full bg-[url(/backgrounds/sun-tornado.svg)] bg-cover opacity-50"></div>
            <ManagementPageLayout>
                <div className="z-10 flex flex-col gap-16 px-14 py-8 opacity-100">
                    <div className="mt-8 text-4xl font-bold">Jobs</div>
                    <div className="flex flex-col gap-4">
                        <div
                            className={
                                "flex h-12 flex-row place-items-end justify-between gap-4"
                            }>
                            <button
                                className="h-full"
                                onClick={toggleModal}>
                                <CardLayout
                                    className="hover:bg-signature-blue bg-blue-primary flex
                                h-full items-center justify-center
                                gap-4 rounded-lg p-4">
                                    <IoAdd
                                        size={"1.5rem"}
                                        className="font-bold text-white"
                                    />
                                    <span className="pr-2 text-white">
                                        Add Job
                                    </span>
                                </CardLayout>
                            </button>
                            <div className="flex flex-row items-center justify-center">
                                <CardLayout className="flex h-full w-96 flex-row items-center rounded-lg bg-white">
                                    <span className="flex flex-1 flex-row gap-2 rounded-lg p-3 transition-colors has-[:focus]:bg-gray-100">
                                        <IoIosSearch size="1.5rem" />
                                        <input
                                            {...register("query")}
                                            type="text"
                                            className="w-full bg-transparent outline-0"
                                            placeholder="Search Job"
                                            onKeyDown={(e) =>
                                                handleKeyDown(
                                                    e.key,
                                                    "Enter",
                                                    getJobs,
                                                )
                                            }
                                        />
                                    </span>
                                </CardLayout>
                                <TextDropdown
                                    className="flex !w-36 rounded-lg"
                                    innerClassName="min-h-12 !pl-4 !pr-16"
                                    name="order"
                                    control={control}
                                    states={CONSTANTS.ORDER}
                                    onChange={(_) => getJobs()}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {jobs.map((job, index) => (
                                <CardLayout
                                    key={index}
                                    className="flex flex-col p-4">
                                    <div className="flex flex-row">
                                        {job.position}
                                    </div>
                                    <div className="flex flex-row">
                                        {job.short_description}
                                    </div>
                                    <div className="flex flex-row">
                                        {job.location}
                                    </div>
                                    <div className="flex flex-row">
                                        {Number(job.salary_start)} -{" "}
                                        {Number(job.salary_end)}
                                    </div>
                                    <div className="flex flex-row">
                                        {new Date(
                                            Number(job.timestamp),
                                        ).toLocaleDateString()}
                                    </div>
                                </CardLayout>
                            ))}
                        </div>
                    </div>
                </div>
                <Modal
                    handleClose={toggleModal}
                    show={isModalShown}
                    modalTitle="Post Job Hiring">
                    <div className="grid grid-cols-2">
                        {/* Position Name Field */}
                        <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                            <div className="font-bold">Position Name</div>
                            <div className="text-sm">
                                Input the name of your company.
                            </div>
                        </div>
                        <div className="border-b border-gray-400  border-opacity-30 py-5">
                            <div className="h-full rounded-md border border-gray-900">
                                <input
                                    type="text"
                                    className="h-full w-full rounded-md  px-3"
                                />
                            </div>
                        </div>
                        {/* Industries Field */}
                        <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                            <div className="font-bold">Industries</div>
                            <div className="text-sm">
                                Input the year your company was created.
                            </div>
                        </div>
                        <div className="border-b border-gray-400  border-opacity-30 py-5">
                            <div className="h-full rounded-md border border-gray-900">
                                <input
                                    type="text"
                                    className="h-full w-full rounded-md  px-3"
                                />
                            </div>
                        </div>
                        {/* Salary Field */}
                        <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                            <div className="font-bold">Salary</div>
                            <div className="text-sm">
                                Input the salary range for this position in your
                                company.
                            </div>
                        </div>
                        <div className="border-b border-gray-400  border-opacity-30 py-5">
                            <div className="h-full rounded-md border border-gray-900">
                                <input
                                    type="text"
                                    className="h-full w-full rounded-md  px-3"
                                />
                            </div>
                        </div>
                        {/* Short Description Field */}
                        <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                            <div className="font-bold">Short Description</div>
                            <div className="text-sm">
                                Input the short description of this job.
                            </div>
                        </div>
                        <div className="border-b border-gray-400  border-opacity-30 py-5">
                            <div className="h-full rounded-md border border-gray-900">
                                <input
                                    type="text"
                                    className="h-full w-full rounded-md  px-3"
                                />
                            </div>
                        </div>
                        {/* Requirements Field */}
                        <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                            <div className="font-bold">Requirements</div>
                            <div className="text-sm">
                                Input the requirements to get this role.
                            </div>
                        </div>
                        <div className="border-b border-gray-400  border-opacity-30 py-5">
                            <div className="h-full rounded-md border border-gray-900">
                                <input
                                    type="text"
                                    className="h-full w-full rounded-md  px-3"
                                />
                            </div>
                        </div>
                        {/* Job Description Field */}
                        <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                            <div className="font-bold">Job Description</div>
                            <div className="text-sm">
                                Describe what this role does in detail.
                            </div>
                        </div>
                        <div className="border-b border-gray-400  border-opacity-30 py-5">
                            <div className="h-full rounded-md border border-gray-900">
                                <input
                                    type="text"
                                    className="h-full w-full rounded-md  px-3"
                                />
                            </div>
                        </div>
                        {/* Apply Website Field */}
                        <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                            <div className="font-bold">Apply Website Link</div>
                            <div className="text-sm">
                                Input the website for employee to apply.
                            </div>
                        </div>
                        <div className="border-b border-gray-400  border-opacity-30 py-5">
                            <div className="h-full rounded-md border border-gray-900">
                                <input
                                    type="text"
                                    className="h-full w-full rounded-md  px-3"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full items-center justify-center gap-2">
                        <input
                            type="checkbox"
                            value=""
                            checked={true}
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        <label className="font-medium text-gray-900 dark:text-gray-300">
                            I accept all the terms and requirements
                        </label>
                    </div>
                    <div className="flex w-full items-center justify-center gap-2">
                        <button className="bg-signature-yellow w-fit rounded-md px-12 py-3 font-bold shadow-md">
                            Post Job
                        </button>
                    </div>
                </Modal>
            </ManagementPageLayout>
        </>
    );
}
