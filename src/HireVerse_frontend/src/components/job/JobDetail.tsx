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
import { Link } from "react-router-dom";

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
    const { data: fullJob, isLoading, isFetching, refetch } = getJobDetails(jobId);
    const { convertBlobToImage } = useImageBlob();

    useEffect(() => {
        refetch();
    }, [jobId]);

    if (isLoading) {
        return <JobDetailSkeleton />;
    }

    return (
        <CardLayout className="relative h-full overflow-auto">
            {!(jobId && fullJob) ? (
                <div className="flex h-full w-full flex-col items-center justify-center">
                    <iframe
                        className="hidden h-[200px] w-[200px] xl:block"
                        src="https://lottie.host/embed/fc97f83d-253b-4e98-a7d5-659944b1e484/cyl5lNhDOU.json"></iframe>
                    <h3 className="m-2">Job not found</h3>
                    <p>Sorry, the job you are looking for is not found</p>
                </div>
            ) : (
                <>
                    <div className="border-signature-gray sticky top-0 flex h-32 w-full flex-row items-center justify-between gap-4 border-b-[1px] bg-white p-4 shadow-sm">
                        <div className="flex h-full flex-row items-center gap-4">
                            <Link
                                className="aspect-square h-full object-cover"
                                to={`company/detail/${fullJob.company.id}`}>
                                <img
                                    onError={handleDefaultImage}
                                    src={convertBlobToImage(fullJob?.company.image ?? [])}
                                    alt={fullJob.company.name}
                                />
                            </Link>
                            <div className="flex flex-col">
                                <h1 className="m-0 flex flex-row items-center gap-3 p-0 text-4xl font-bold">
                                    {fullJob?.position} <EmployTypeIndicator employType={fullJob.employType} />
                                </h1>
                                <p className="text-base">
                                    On{" "}
                                    <span className="font-bold">
                                        <Link to={`company/detail/${fullJob.id}`}>{fullJob?.company.name}</Link>
                                        {" - "}
                                    </span>
                                    {fullJob?.location}
                                </p>
                            </div>
                        </div>
                        <div className="h-full">{convertShortTimeInterval(fullJob?.timestamp)} ago</div>
                    </div>
                    <div className="flex flex-col gap-8 overflow-auto border-b-[1px] p-6 [&_h3]:text-base [&_h3]:font-bold">
                        <div>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: purifyDOM(fullJob?.shortDescription),
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
                                {fullJob?.salaryStart.toString()} - {fullJob?.currency}
                                {fullJob?.salaryEnd.toString()}
                            </p>
                        </div>
                        <div>
                            <h3 className="m-0 p-0">Contacts</h3>
                            <p>
                                {/*{console.log(fullJob)}*/}
                                {fullJob.contacts?.map((contact, index) => <span key={index}>{contact}</span>)}
                            </p>
                        </div>
                    </div>
                    <CompanyReviewSummary companyId={fullJob?.company.id!} />
                </>
            )}
        </CardLayout>
    );
}
