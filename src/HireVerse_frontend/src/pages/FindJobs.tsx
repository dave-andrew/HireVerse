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
            <div className={"flex flex-col p-6 pt-0 w-full h-full"}>
                <h1 className="main-title">FIND JOBS</h1>
                <div className={"flex flex-row w-full h-full gap-3"}>
                    <CardLayout className={"h-full"}>
                        <div
                            className={
                                "flex flex-row m-6 justify-between items-center"
                            }>
                            1000 Jakarta Jobs
                            <SortDropdown sortStates={sortStates} />
                        </div>
                        <div
                            className={
                                "w-96 m-6 h-[70vh] overflow-x-hidden overflow-y-auto card-scollbar gap-1"
                            }>
                            {Array.from({ length: 21 }).map((_) => {
                                return <JobItem />;
                            })}
                        </div>
                    </CardLayout>
                    <div className={"flex flex-col w-full gap-2"}>
                        <div className={"flex flex-row gap-2 w-full"}>
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
                        <CardLayout className={"h-full"}>aa</CardLayout>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
