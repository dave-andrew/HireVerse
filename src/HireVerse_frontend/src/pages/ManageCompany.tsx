import ManagementPageLayout from "../layouts/ManagementPageLayout";

export default function ManageCompany() {
    return (
        <ManagementPageLayout>
            <div className={"p-6 flex flex-col gap-4"}>
                <div className={"text-2xl font-bold pl-8"}>Overview</div>
                <div className={"bg-white w-full h-64"}>BINUS University</div>
            </div>
        </ManagementPageLayout>
    );
}
