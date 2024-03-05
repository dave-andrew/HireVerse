import CardLayout from "../../layouts/CardLayout";
import { IJobItem } from "../../types/IJobItem";

interface Props {
    job: IJobItem;
    onClick?: () => void;
}

export default function JobItem({ job, onClick }: Props) {
    return (
        <CardLayout
            onClick={onClick}
            className="flex cursor-pointer flex-col rounded-xl p-4 transition hover:bg-gray-200">
            <div className="flex flex-row items-center">
                <img
                    alt={job.companyName}
                    width="50rem"
                    height="auto"
                    className="aspect-square"
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png"
                />
                <span className="font-bold">{job.companyName}</span>
            </div>
            <div className="text-xl font-bold">{job.position}</div>
            <div>{job.location}</div>
            <div>
                {job.currency}
                {job.salaryStart.toString()} - {job.currency}
                {job.salaryEnd.toString()}
            </div>
        </CardLayout>
    );
}
