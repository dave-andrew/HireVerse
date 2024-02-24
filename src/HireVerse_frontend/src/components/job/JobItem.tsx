import CardLayout from "../../layouts/CardLayout";
import { Job } from "../../../../../.dfx/local/canisters/HireVerse_job/service.did";

interface Props {
    job: Job;
    companyName: string;
    onClick?: () => void;
}

export default function JobItem({ job, companyName, onClick }: Props) {
    return (
        <CardLayout className="flex flex-col p-4 transition rounded-xl cursor-pointer hover:bg-gray-200">
            <div className="flex flex-row items-center">
                <img
                    width="50rem"
                    height="auto"
                    className="aspect-square"
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png"
                />
                <span className="font-bold">{companyName}</span>
            </div>
            <div className="text-xl font-bold">{job.position}</div>
            <div>{job.location}</div>
            <div>
                {job.salary_start.toString()} - {job.salary_end.toString()}
            </div>
        </CardLayout>
    );
}
