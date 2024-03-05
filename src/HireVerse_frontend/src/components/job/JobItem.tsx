import CardLayout from "../../layouts/CardLayout";
import useImageBlob from "../../hooks/useImageBlob";
import { convertShortTimeInterval } from "../../utils/convertTimeInterval";
import EmployTypeIndicator from "./EmployTypeIndicator";
import handleDefaultImage from "../../utils/handleDefaultImage";

export interface IJobItem {
    id: string;
    position: string;
    location: string;
    currency: string;
    salaryStart: string;
    salaryEnd: string;
    companyName: string;
    companyImage: number[] | Uint8Array;
    employType: string;
    timestamp: number;
}

interface Props {
    job: IJobItem;
    onClick?: () => void;
}

export default function JobItem({ job, onClick }: Props) {
    const { convertBlobToImage } = useImageBlob();
    return (
        <CardLayout
            onClick={onClick}
            className="flex cursor-pointer flex-col rounded-xl p-4 transition hover:bg-gray-100">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-3">
                    <img
                        onError={handleDefaultImage}
                        alt={job.companyName}
                        width="50rem"
                        height="auto"
                        className="aspect-square object-cover rounded-full w-12 h-12"
                        src={convertBlobToImage(job.companyImage)}
                    />
                    <span className="font-bold">{job.companyName}</span>
                </div>
                <div className="text-sm">
                    {convertShortTimeInterval(job.timestamp)}
                </div>
            </div>
            <div className="text-2xl font-bold pt-2">{job.position}</div>
            <div>
                at <span className="font-semibold"> {job.location}</span>
            </div>
            <div className="py-2">
                <span className="font-semibold">Salary:</span> {job.currency}
                {job.salaryStart.toString()} - {job.currency}
                {job.salaryEnd.toString()}
            </div>
            <div>
                <EmployTypeIndicator employType={job.employType} />
            </div>
        </CardLayout>
    );
}
