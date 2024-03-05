import CardLayout from "../../layouts/CardLayout";
import { useEffect } from "react";
import JobDetailSkeleton from "./JobDetailSkeleton";
import { getJobDetails } from "../../datas/queries/jobQueries";
import CompanyReviewSummary from "../review/CompanyReviewSummary";
import handleDefaultImage from "../../utils/handleDefaultImage";
import useImageBlob from "../../hooks/useImageBlob";

export interface IJobDetail {
    id: string;
    position: string;
    location: string;
    currency: string;
    salaryStart: number;
    salaryEnd: number;
    company: {
        id: string;
        name: string;
        image: number[] | Uint8Array;
    };
    shortDescription: string;
    jobDescription: string;
    requirements: string;
}

interface Props {
    jobId: string;
}

export default function JobDetail({ jobId }: Props) {
    const { data: fullJob, isLoading, refetch } = getJobDetails(jobId);
    const { convertBlobToImage } = useImageBlob();

    useEffect(() => {
        refetch();
    }, [jobId]);

    if (isLoading) {
        return <JobDetailSkeleton />;
    }

    return (
        <CardLayout className="relative h-full overflow-auto">
            <div className="border-signature-gray sticky flex h-32 w-full top-0 bg-white flex-row items-center border-b-[1px]">
                <img
                    className="w-48"
                    onError={handleDefaultImage}
                    src={convertBlobToImage(fullJob?.company.image ?? [])}
                    alt="BINUS University"
                />
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">{fullJob?.position}</h1>
                    <p className="text-base">{fullJob?.location}</p>
                </div>
            </div>
            <div className="flex flex-col gap-8 overflow-auto p-6 [&_h3]:text-base  [&_h3]:font-bold">
                <div>
                    <h3 className="m-0 p-0">{fullJob?.company.name}</h3>
                    <p>{fullJob?.shortDescription}</p>
                </div>
                <div>
                    <h3 className="m-0 p-0">Salary</h3>
                    <p>
                        {fullJob?.currency}
                        {fullJob?.salaryStart.toString()} - {fullJob?.currency}
                        {fullJob?.salaryEnd.toString()}
                    </p>
                </div>
                <div>
                    <h3 className="m-0 p-0">Job Description</h3>
                    <p>{fullJob?.jobDescription}</p>
                </div>
                <div>
                    <h3 className="m-0 p-0">Requirements</h3>
                    <ul className="m-0 pl-5">
                        <li>{fullJob?.requirements}</li>
                    </ul>
                </div>
                <CompanyReviewSummary companyId={fullJob?.company.id!} />
            </div>
        </CardLayout>
    );
}
