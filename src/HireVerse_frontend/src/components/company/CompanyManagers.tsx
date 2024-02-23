import ManagementPageLayout from "../../layouts/ManagementPageLayout";
import { IoIosSearch } from "react-icons/io";
import CardLayout from "../../layouts/CardLayout";
import ManagerTable from "./ManagerTable";

export default function CompanyManagers() {
    return (
        <ManagementPageLayout>
            <div className={"px-14 py-8 flex flex-col gap-16"}>
                <div className={"text-4xl font-bold mt-8"}>Managers</div>
                <div className={"flex flex-col gap-4"}>
                    <div
                        className={
                            "flex flex-row place-items-end justify-end h-12 gap-4"
                        }>
                        <CardLayout className="flex flex-row items-center w-96 h-full bg-white">
                            <span className="flex flex-1 flex-row gap-2 p-3 has-[:focus]:bg-gray-100 transition-colors rounded-tl-xl rounded-bl-xl">
                                <IoIosSearch size="1.5rem" />
                                <input
                                    type="text"
                                    className="outline-0 w-full bg-transparent"
                                    placeholder="Search Job"
                                />
                            </span>
                        </CardLayout>
                        <button className="h-full">
                            <CardLayout className="h-full flex justify-center place-items-center py-4 px-8 rounded-xl hover:bg-gray-100">
                                + Add Manager
                            </CardLayout>
                        </button>
                    </div>
                    <ManagerTable />
                </div>
            </div>
        </ManagementPageLayout>
    );
}
