import ManagementPageLayout from "../../layouts/ManagementPageLayout";
import CardLayout from "../../layouts/CardLayout";
import {IoAdd} from "react-icons/io5";
import {IoIosSearch} from "react-icons/io";


export default function CompanyInvitation() {
    return (
        <>
            <ManagementPageLayout>
                <div className="z-10 flex flex-col gap-16 px-14 py-8 opacity-100">
                    <div className="mt-8 text-4xl font-bold">Jobs</div>
                    <div className="flex flex-col gap-4">
                        <div
                            className={
                                "flex h-12 flex-row place-items-end justify-between gap-4"
                            }>
                            <button
                                className="h-full" >
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
                                    </span>
                                </CardLayout>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {/*{Array.from({ length: 5 }).map((_, index) => (*/}
                            {/*    <>*/}
                            {/*        {jobs.map((job, index) => (*/}
                            {/*            <JobItemManagement*/}
                            {/*                key={index}*/}
                            {/*                job={job}*/}
                            {/*                setJobs={setJobs}*/}
                            {/*                onClick={() => setSelectedJob(job)}*/}
                            {/*                setConfirmationState={*/}
                            {/*                    setConfirmationModal*/}
                            {/*                }*/}
                            {/*            />*/}
                            {/*        ))}*/}
                            {/*    </>*/}
                            {/*))}*/}
                        </div>
                    </div>
                </div>
            </ManagementPageLayout>
        </>
    )
}