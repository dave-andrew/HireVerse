import CardLayout from "../../layouts/CardLayout";
import { useEffect } from "react";
import JobDetailSkeleton from "./JobDetailSkeleton";
import { getJobDetails } from "../../datas/queries/jobQueries";
import CompanyReviewSummary from "../review/CompanyReviewSummary";
import handleDefaultImage from "../../utils/handleDefaultImage";
import useImageBlob from "../../hooks/useImageBlob";
import { convertShortTimeInterval } from "../../utils/convertTimeInterval";
import EmployTypeIndicator from "./EmployTypeIndicator";
import purifyDOM from "../../utils/purifyDOM";

export interface IJobDetail {
    id: string;
    position: string;
    location: string;
    currency: string;
    salaryStart: number;
    salaryEnd: number;
    employType: string;
    company: {
        id: string;
        name: string;
        image: number[] | Uint8Array;
    };
    shortDescription: string;
    jobDescription: string;
    requirements: string;
    contacts: string[];
    timestamp: number;
}

interface Props {
    jobId: string;
}

export default function JobDetail({ jobId }: Props) {
    const {
        data: fullJob,
        isLoading,
        isFetching,
        refetch,
    } = getJobDetails(jobId);
    const { convertBlobToImage } = useImageBlob();

    useEffect(() => {
        refetch();
    }, [jobId]);

    if (!jobId || isLoading) {
        return <JobDetailSkeleton />;
    }

    return (
        <CardLayout className="relative h-full overflow-auto">
            {!(jobId && fullJob) ? (
                <div className="flex flex-col w-full h-full justify-center items-center">
                    <img
                        className="w-72"
                        src="storyset/empty-bro.png"
                        alt="empty"
                    />
                    <h3 className="m-2">Job not found</h3>
                    <p>Sorry, the job you are looking for is not found</p>
                </div>
            ) : (
                <>
                    <div className="border-signature-gray sticky flex h-32 w-full top-0 bg-white flex-row items-center justify-between border-b-[1px] shadow-sm p-4 gap-4">
                        <div className="flex flex-row items-center h-full gap-4">
                            <img
                                className="aspect-square object-cover h-full"
                                onError={handleDefaultImage}
                                src={convertBlobToImage(
                                    fullJob?.company.image ?? [],
                                )}
                                alt={fullJob.company.name}
                            />
                            <div className="flex flex-col">
                                <h1 className="m-0 p-0 text-4xl font-bold flex flex-row items-center gap-3">
                                    {fullJob?.position}{" "}
                                    <EmployTypeIndicator
                                        employType={fullJob.employType}
                                    />
                                </h1>
                                <p className="text-base">
                                    On{" "}
                                    <span className="font-bold">
                                        {fullJob?.company.name}
                                        {" - "}
                                    </span>
                                    {fullJob?.location}
                                </p>
                            </div>
                        </div>
                        <div className="h-full">
                            {convertShortTimeInterval(fullJob?.timestamp)} ago
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 overflow-auto p-6 [&_h3]:text-base [&_h3]:font-bold border-b-[1px]">
                        <div>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: purifyDOM(
                                        fullJob?.shortDescription,
                                    ),
                                }}></p>
                        </div>
                        <div>
                            <h3 className="m-0 p-0">Job Description</h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: purifyDOM(fullJob?.jobDescription),
                                }}></p>
                        </div>
                        <div>
                            <h3 className="m-0 p-0">Requirements</h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: purifyDOM(fullJob?.requirements),
                                }}></p>
                        </div>
                        <div>
                            <h3 className="m-0 p-0">Salary</h3>
                            <p>
                                {fullJob?.currency}
                                {fullJob?.salaryStart.toString()} -{" "}
                                {fullJob?.currency}
                                {fullJob?.salaryEnd.toString()}
                            </p>
                        </div>
                        <div>
                            <h3 className="m-0 p-0">Contacts</h3>
                            <p>
                                {/*{console.log(fullJob)}*/}
                                {fullJob.contacts?.map((contact, index) => (
                                    <span key={index}>{contact}</span>
                                ))}
                            </p>
                        </div>
                    </div>
                    <CompanyReviewSummary companyId={fullJob?.company.id!} />
                </>
            )}
        </CardLayout>
    );
}
