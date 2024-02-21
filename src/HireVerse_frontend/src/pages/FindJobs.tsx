import { useEffect, useState } from "react";
import { TbFilterCog } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import PageLayout from "../layouts/PageLayout";
import CardLayout from "../layouts/CardLayout";
import SortDropdown from "../components/button/SortDropdown";
import JobItem from "../components/job/JobItem";

export default function FindJobs() {
    const [sortStates, setSortStates] = useState<string[]>();

    useEffect(() => {
        setSortStates(["Newest", "Oldest", "Highest Salary", "Lowest Salary"]);
    }, []);

    return (
        <PageLayout>
            <div className={"flex flex-col w-full h-full place-items-center gap-4 p-8"}>
                <div className={"flex flex-row gap-2 w-1/2"}>
                    {/*TODO: Filter*/}
                    <CardLayout className={"p-2 cursor-pointer"}>
                        <TbFilterCog size={"1.5rem"} />
                    </CardLayout>
                    <CardLayout
                        className={
                            "flex flex-row items-center p-2 w-full gap-2"
                        }>
                        <IoIosSearch size={"1.5rem"} />
                        <input
                            type={"text"}
                            className={"outline-0"}
                            placeholder={"Search Job"}
                        />
                    </CardLayout>
                </div>
                <div className={"flex flex-row w-full h-full gap-3 xl:px-32 px-4"}>
                    <CardLayout className={"h-[75vh] flex flex-col gap-3 py-3"}>
                        <div
                            className={
                                "flex flex-row mx-6 justify-between items-center"
                            }>
                            1000 Jakarta Jobs
                            <SortDropdown sortStates={sortStates} />
                        </div>
                        <div
                            className={
                                "w-96 mx-6 overflow-x-hidden overflow-y-auto card-scollbar gap-1"

                            }>
                            {Array.from({ length: 21 }).map((_) => {
                                return <JobItem />;
                            })}
                        </div>
                    </CardLayout>
                    <div className={"flex flex-col w-full gap-2"}>
                        <CardLayout className={"h-full"}>aa</CardLayout>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
