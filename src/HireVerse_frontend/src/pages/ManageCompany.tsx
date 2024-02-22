import CompanyPageLayout from "../layouts/CompanyPageLayout";

export default function ManageCompany() {
    return (
        <CompanyPageLayout>
            <div className={"p-6 flex flex-col gap-4"}>
                <div className={"text-2xl font-bold pl-8"}>
                    Overview
                </div>
                <div className={"bg-white w-full h-64"}>
                    BINUS University
                </div>
            </div>
        </CompanyPageLayout>
    );
}
