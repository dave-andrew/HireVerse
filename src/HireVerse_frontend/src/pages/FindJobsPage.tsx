import { useEffect, useState } from "react";
import { TbFilterCog } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import FrontPageLayout from "../layouts/FrontPageLayout";
import CardLayout from "../layouts/CardLayout";
import CustomDropdown, {
    DropdownItems,
} from "../components/form/CustomDropdown";
import JobItem from "../components/job/JobItem";
import { IoLocationOutline } from "react-icons/io5";
import AutocompleteDropdown from "../components/form/AutocompleteDropdown";
import JobDetail from "../components/job/JobDetail";
import { HireVerse_job } from "../../../declarations/HireVerse_job";

export default function FindJobs() {
    const [sortStates, setSortStates] = useState<DropdownItems[]>();

    let job = HireVerse_job;

    useEffect(() => {
        const temp = [
            { label: "Newest", value: "Newest" },
            { label: "Oldest", value: "Oldest" },
            { label: "Highest Salary", value: "Highest Salary" },
            { label: "Lowest Salary", value: "Lowest Salary" },
        ];
        setSortStates(temp);

        const temp1 = async () => {
            const response = await job.getAllJobs();
            console.log(response);
        }
        temp1();
    }, []);

    return (
        <FrontPageLayout>
            <div className="flex flex-col w-full h-full place-items-center gap-20">
                <div className="w-full h-[60vh] bg-[url(/backgrounds/subtle-prism.svg)] shadow-md">
                    <div className="flex flex-row items-center justify-center w-full h-full gap-20">
                        <div className="flex flex-col w-2/6 gap-5">
                            <h3 className="font-bold text-4xl lg:text-5xl">
                                Find Your Dream Job Now.
                            </h3>
                            <p className="text-lg lg:text-xl leading-6">
                                Find your dream job now! Our platform connects
                                you with top employers and provides valuable
                                resources to enhance your job search experience.
                                Start exploring today for a brighter future and
                                take the first step towards a fulfilling career.
                            </p>
                        </div>
                        <img
                            className="w-[25vw]"
                            src="/storyset/resume-folder-cuate.png"
                            alt=""
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-10 w-3/4 pb-10">
                    <div className="flex flex-row gap-5 w-full">
                        <CardLayout className="p-3 cursor-pointer hover:bg-signature-hover-gray transition-colors">
                            <TbFilterCog size="1.5rem" />
                        </CardLayout>
                        <CardLayout className="flex flex-row items-center w-full">
                            <span className="flex flex-1 flex-row gap-2 p-3 has-[:focus]:bg-gray-100 transition-colors rounded-tl-xl rounded-bl-xl">
                                <IoIosSearch size="1.5rem" />
                                <input
                                    type="text"
                                    className="outline-0 w-full bg-transparent"
                                    placeholder="Search Job"
                                />
                            </span>
                            <span className="flex flex-row gap-2 items-center border-signature-gray border-l-[1px] has-[:focus]:bg-gray-100 transition-colors rounded-tr-xl rounded-br-xl p-1 pl-5">
                                <IoLocationOutline size="1.5rem" />
                                <AutocompleteDropdown />
                            </span>
                        </CardLayout>
                    </div>
                    <div className="flex flex-row w-full h-full gap-3">
                        <div className="h-auto flex flex-col gap-1">
                            <CardLayout className="flex flex-row ps-5 pe-2 justify-between items-center mr-2">
                                1000 Jakarta Jobs
                                <CustomDropdown states={sortStates} />
                            </CardLayout>
                            <div className="flex flex-col w-96 overflow-x-hidden overflow-y-auto card-scollr gap-2 pr-1">
                                {Array.from({ length: 21 }).map((_) => {
                                    return <JobItem />;
                                })}
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <JobDetail />
                        </div>
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
}
