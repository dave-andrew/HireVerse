import CardLayout from "../../layouts/CardLayout";
import { HireVerse_job } from "../../../../declarations/HireVerse_job";
import { FullJob } from "../../../../../.dfx/local/canisters/HireVerse_job/service.did";
import { useEffect, useState } from "react";

interface Props {
    jobId: string;
}

export default function JobDetail({ jobId }: Props) {
    const [fullJob, setFullJob] = useState<FullJob | null>(null);
    const jobService = HireVerse_job;

    const getFullJob = async () => {
        if (jobId.length === 0) {
            return;
        }

        const response = await jobService.getFullJob(jobId);

        if (response.length === 0) {
            return;
        }

        setFullJob(response[0]);
    };

    useEffect(() => {
        getFullJob();
    }, [jobId]);

    if (fullJob === null) {
        return <SkeletonLayout />;
    }
    
    return (
        <CardLayout className="h-full relative">
            <div className="absolute h-32 w-full flex flex-row items-center border-b-[1px] border-signature-gray">
                <img
                    className="w-48"
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png"
                    alt="BINUS University"
                />
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl">{fullJob.position}</h1>
                    <p className="text-base">{fullJob.location}</p>
                </div>
            </div>
            <div className="h-32" />
            <div className="flex flex-col p-6 [&_h3]:font-bold [&_h3]:text-base gap-8  overflow-auto">
                <div>
                    <h3>{fullJob.company[0]?.name}</h3>
                    <p>{fullJob.short_description}</p>
                </div>
                <div>
                    <h3>Salary</h3>
                    <p>
                        {fullJob.salary_start.toString()} -{" "}
                        {fullJob.salary_end.toString()}
                    </p>
                </div>
                <div>
                    <h3>Job Description</h3>
                    <p>{fullJob.job_description}</p>
                </div>
                <div>
                    <h3>Requirements</h3>
                    <ul>
                        <li>{fullJob.requirements}</li>
                        {/*<li>1+ years of experience in software development</li>*/}
                        {/*<li>Strong knowledge in Java, Python, and C++</li>*/}
                        {/*<li>*/}
                        {/*    Strong knowledge in data structures and algorithms*/}
                        {/*</li>*/}
                        {/*<li>Strong knowledge in software testing</li>*/}
                        {/*<li>Strong knowledge in software documentation</li>*/}
                        {/*<li>Strong knowledge in software deployment</li>*/}
                        {/*<li>Strong knowledge in software maintenance</li>*/}
                        {/*<li>*/}
                        {/*    Strong knowledge in software development*/}
                        {/*    methodologies*/}
                        {/*</li>*/}
                        {/*<li>Strong knowledge in software development tools</li>*/}
                        {/*<li>*/}
                        {/*    Strong knowledge in software development frameworks*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        </CardLayout>
    );
}

function SkeletonLayout() {
    return (
        <CardLayout className="h-full relative">
            <div className="absolute h-32 w-full flex flex-row items-center border-b-[1px] border-signature-gray">
                <div className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                    <div className="flex items-center justify-center w-full h-32 bg-gray-300 rounded sm:w-72 dark:bg-gray-200">
                        <svg
                            className="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                    <div className="w-full">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[480px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[440px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[460px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[360px]"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <div className="h-32" />
            <div className="flex flex-col p-6 [&_h3]:font-bold [&_h3]:text-base gap-8  overflow-auto">
                <div className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-48 mb-4" />
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-48 mb-4" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[360px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[330px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[300px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[330px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[360px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[360px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[360px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 mb-2.5" />
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </CardLayout>
    );
}
