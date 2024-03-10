import ManagementPageLayout from "../../layouts/ManagementPageLayout";
import { IoIosAdd, IoIosSearch } from "react-icons/io";
import CardLayout from "../../layouts/CardLayout";
import React, { useState } from "react";
import TextDropdown from "../../components/form/TextDropdown";
import { useForm } from "react-hook-form";
import { Job } from "../../../../../.dfx/local/canisters/HireVerse_job/service.did";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Company } from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import { CONSTANTS } from "../../utils/constants";
import handleKeyDown from "../../utils/handleKeyDown";
import JobItemManagement from "../../components/job/JobItemManagement";
import WrappedModal from "../../components/form/WrappedModal";
import CreateJobModal from "../../components/modal/CreateJobModal";
import { getJobPostedByCompany } from "../../datas/queries/jobQueries";
import { useDeleteJob } from "../../datas/mutations/jobMutation";
import JobItemManagementSkeleton from "../../components/job/JobItemManagementSkeleton";

export interface IQuerySortForm {
    query: string;
    order: string;
    status: string;
}

export default function CompanyJobsPage() {
    const [selectedCompany, setSelectedCompany] = useLocalStorage<Company | null>("selectedCompany", null);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalShown, setIsModalShown] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const { register, control, getValues } = useForm<IQuerySortForm>({
        defaultValues: {
            query: "",
            order: "Newest",
            status: "All",
        },
    });
    const { data: jobs, refetch: getJobs, isLoading } = getJobPostedByCompany(selectedCompany?.id, getValues);
    const mutation = useDeleteJob();

    const toggleModal = () => {
        setIsModalShown(!isModalShown);
    };

    const handleDeleteJob = async () => {
        if (!selectedJob || !selectedCompany) {
            return;
        }

        mutation.mutate({
            companyId: selectedCompany.id,
            jobId: selectedJob.id,
        });

        setSelectedJob(null);
        setConfirmationModal(false);
    };

    return (
        <>
            <WrappedModal
                isOpen={confirmationModal}
                setIsOpen={setConfirmationModal}
                title={
                    <>
                        <div className="pb-4 text-xl font-bold">Delete Confirmation</div>
                        <hr />
                    </>
                }>
                <div className="mt-2 pb-5 pt-4">
                    <p className="text-sm text-gray-500">Are you sure you want to delete this job?</p>
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
                <div className="z-10 flex h-full flex-col gap-16 px-14 py-8 opacity-100">
                    <div className="mt-8 text-4xl font-bold">Jobs</div>
                    <div className="flex flex-col gap-4">
                        <div className={"flex h-12 flex-row place-items-end justify-between gap-4"}>
                            <button
                                className="bg-signature-yellow hover:bg-signature-yellow flex w-fit flex-row items-center justify-center gap-2 rounded-md px-5 py-3 text-lg font-semibold text-black transition-colors"
                                onClick={toggleModal}>
                                <IoIosAdd
                                    size={"1.5rem"}
                                    className="font-bold"
                                />
                                <span className="pr-2">Post Job</span>
                            </button>
                            <div className="flex flex-row items-center justify-center gap-2">
                                <CardLayout className="flex h-full w-96 flex-row items-center rounded-lg bg-white">
                                    <span className="has-[:focus]:ring-signature-primary flex flex-1 flex-row gap-2 rounded-lg p-3 transition-colors has-[:focus]:bg-gray-100 has-[:focus]:ring-2">
                                        <IoIosSearch size="1.5rem" />
                                        <input
                                            {...register("query")}
                                            type="text"
                                            className="has-[:focus]:ring-signature-primary w-full bg-transparent outline-0 has-[:focus]:ring-2"
                                            placeholder="Search Job"
                                            onKeyDown={(e) => handleKeyDown(e.key, "Enter", getJobs)}
                                        />
                                    </span>
                                </CardLayout>
                                <TextDropdown
                                    key="order"
                                    className="has-[:focus]:ring-signature-primary flex !w-48 rounded-lg has-[:focus]:ring-2"
                                    innerClassName="min-h-12 !pl-4 !pr-16 border-[1px] !w-48 !max-w-48 border-gray-200"
                                    name="order"
                                    control={control}
                                    states={CONSTANTS.ORDER}
                                    onChange={(_) => getJobs()}
                                />
                                <TextDropdown
                                    key="status"
                                    className="has-[:focus]:ring-signature-primary flex !w-36 rounded-lg pr-0 has-[:focus]:ring-2"
                                    innerClassName="min-h-12 !pl-4 !pr-16 border-[1px] !w-36 !max-w-36 border-gray-200"
                                    name="status"
                                    control={control}
                                    states={["All", ...CONSTANTS.JOB.STATUS]}
                                    onChange={(_) => getJobs()}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {isLoading && Array.from({ length: 6 }).map((_, index) => <JobItemManagementSkeleton key={index} />)}

                            {jobs?.map((job, index) => (
                                <JobItemManagement
                                    key={index}
                                    job={job}
                                    onClick={() => setSelectedJob(job)}
                                    setConfirmationState={setConfirmationModal}
                                />
                            ))}
                            {jobs && jobs.length === 0 && (
                                <div className="col-span-3 flex h-full w-full flex-col items-center justify-center pt-20">
                                    <iframe
                                        className="hidden h-[350px] w-[350px] xl:block"
                                        src="https://lottie.host/embed/57def831-fe52-4518-8ad6-6f77ccd58d31/9Nvm6fotjy.json"></iframe>
                                    <h3 className="m-2">No job found</h3>
                                    <p>Try changing your filter</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <CreateJobModal
                    openState={isModalShown}
                    setOpenState={setIsModalShown}
                />
            </ManagementPageLayout>
        </>
    );
}
