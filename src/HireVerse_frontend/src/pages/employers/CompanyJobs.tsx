import ManagementPageLayout from "../../layouts/ManagementPageLayout";
import { IoIosSearch } from "react-icons/io";
import CardLayout from "../../layouts/CardLayout";
import { useEffect, useState } from "react";
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
import JobItemManagement from "../../components/job/JobItemManagement";
import WrappedModal from "../../components/utils/WrappedModal";
import CreateJobModal from "../../components/modal/CreateJobModal";

interface IQuerySortForm {
    query: string;
    order: string;
    status: string;
}

export default function CompanyJobs() {
    const [selectedCompany, setSelectedCompany] =
        useLocalStorage<Company | null>("selectedCompany", null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalShown, setIsModalShown] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const { jobService } = useService();
    const { register, control, getValues } = useForm<IQuerySortForm>({
        defaultValues: {
            query: "",
            order: "Newest",
            status: "All",
        },
    });

    const toggleModal = () => {
        setIsModalShown(!isModalShown);
    };

    const getConvertedFilters = () => {
        const values = getValues();
        const jobFilter: JobManagerFilterInput = {
            order: convertNullFormat(values.order, ""),
            position: convertNullFormat(values.query, ""),
            status: convertNullFormat(
                values.status === "All" ? "" : values.status.toLowerCase(),
                "",
            ),
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

        if (isOk(response)) {
            setJobs(response.ok);
            console.log(getConvertedFilters());
            console.log(response.ok);
        }
    };

    const handleDeleteJob = async () => {
        if (!selectedJob) {
            return;
        }

        const response = await jobService.deleteJob(selectedJob.id);

        if (isOk(response)) {
            setJobs(jobs.filter((job) => job.id !== selectedJob.id));
        }
        setSelectedJob(null);
        setConfirmationModal(false);
    };

    useEffect(() => {
        getJobs();
    }, []);

    useEffect(() => {
        getJobs();
    }, [selectedCompany]);

    return (
        <>
            <WrappedModal
                isOpen={confirmationModal}
                setIsOpen={setConfirmationModal}
                title={
                    <>
                        <div className="text-xl font-bold pb-4">
                            Delete Confirmation
                        </div>
                        <hr />
                    </>
                }>
                <div className="mt-2 pb-5 pt-4">
                    <p className="text-sm text-gray-500">
                        Are you sure you want to delete this job?
                    </p>
                </div>
                <div className="mt-4 flex flex-row justify-end gap-3">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
                        onClick={() => handleDeleteJob()}>
                        Confirm
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-sm font-medium text-white hover:bg-gray-500"
                        onClick={() => setConfirmationModal(false)}>
                        Cancel
                    </button>
                </div>
            </WrappedModal>
            {/*<div className="absolute z-0 h-96 w-full bg-[url(/backgrounds/sun-tornado.svg)] bg-cover opacity-50"></div>*/}
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
                            <div className="flex flex-row items-center justify-center gap-2">
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
                                    key="order"
                                    className="flex !w-48 rounded-lg "
                                    innerClassName="min-h-12 !pl-4 !pr-16 border-[1px] !w-48 !max-w-48 border-gray-200"
                                    name="order"
                                    control={control}
                                    states={CONSTANTS.ORDER}
                                    onChange={(_) => getJobs()}
                                />
                                <TextDropdown
                                    key="status"
                                    className="flex !w-40 rounded-lg "
                                    innerClassName="min-h-12 !pl-4 !pr-16 border-[1px] !w-36 !max-w-36 border-gray-200"
                                    name="status"
                                    control={control}
                                    states={["All", ...CONSTANTS.JOB.STATUS]}
                                    onChange={(_) => getJobs()}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <>
                                    {jobs.map((job, index) => (
                                        <JobItemManagement
                                            key={index}
                                            job={job}
                                            setJobs={setJobs}
                                            onClick={() => setSelectedJob(job)}
                                            setConfirmationState={
                                                setConfirmationModal
                                            }
                                        />
                                    ))}
                                </>
                            ))}
                        </div>
                    </div>
                </div>
                {/*<Modal*/}
                {/*    handleClose={toggleModal}*/}
                {/*    show={isModalShown}*/}
                {/*    modalTitle="Post Job Hiring"></Modal>*/}
                <CreateJobModal
                    openState={isModalShown}
                    setOpenState={setIsModalShown}
                />
            </ManagementPageLayout>
        </>
    );
}
