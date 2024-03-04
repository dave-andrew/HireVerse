import CardLayout from "../../layouts/CardLayout";
import { useEffect } from "react";
import JobDetailSkeleton from "./JobDetailSkeleton";
import { useQueryFullJob } from "../../datas/queries/jobQueries";

interface Props {
    jobId: string;
}

export default function JobDetail({ jobId }: Props) {
    const { data: fullJob, isLoading, refetch } = useQueryFullJob(jobId);

    useEffect(() => {
        refetch();
    }, [jobId]);

    if (isLoading) {
        return <JobDetailSkeleton />;
    }

    return (
        <CardLayout className="relative h-full">
            <div className="border-signature-gray absolute flex h-32 w-full flex-row items-center border-b-[1px]">
                <img
                    className="w-48"
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png"
                    alt="BINUS University"
                />
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">{fullJob?.position}</h1>
                    <p className="text-base">{fullJob?.location}</p>
                </div>
            </div>
            <div className="h-32" />
            <div className="flex flex-col gap-8 overflow-auto p-6 [&_h3]:text-base  [&_h3]:font-bold">
                <div>
                    <h3>{fullJob?.company.name}</h3>
                    <p>{fullJob?.short_description}</p>
                </div>
                <div>
                    <h3>Salary</h3>
                    <p>
                        {fullJob?.currency}
                        {fullJob?.salary_start.toString()} - {fullJob?.currency}
                        {fullJob?.salary_end.toString()}
                    </p>
                </div>
                <div>
                    <h3>Job Description</h3>
                    <p>{fullJob?.job_description}</p>
                </div>
                <div>
                    <h3>Requirements</h3>
                    <ul>
                        <li>{fullJob?.requirements}</li>
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
