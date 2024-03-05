import CardLayout from "../../layouts/CardLayout";

export default function JobItemManagementSkeleton() {
    return (
        <CardLayout className="flex flex-col gap-2 p-6 shadow-md">
            <div className="flex flex-row items-center justify-between gap-2 pb-5 text-xl font-bold">
                <div className="flex w-full animate-pulse flex-col gap-3">
                    <div className="flex w-full flex-row justify-between">
                        <div className="flex flex-row gap-2">
                            <div className="h-6 min-w-60 rounded-full bg-gray-200"></div>
                            <div className="h-6 min-w-12 rounded-full bg-gray-200"></div>
                            <div className="h-6 min-w-12 rounded-full bg-gray-200"></div>
                        </div>
                        <div className="h-6 min-w-6 rounded-full bg-gray-200"></div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-40 rounded-full bg-gray-200"></div>
                        <div className="h-3 w-28 rounded-full bg-gray-200"></div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="flex w-full animate-pulse flex-col gap-2 pt-1">
                <div className="flex w-full flex-row gap-2">
                    <div className="h-4 w-full rounded-full bg-gray-200"></div>
                    <div className="h-4 w-full rounded-full bg-gray-200"></div>
                    <div className="h-4 w-full rounded-full bg-gray-200"></div>
                </div>
                <div className="flex w-full flex-row gap-2">
                    <div className="h-4 w-full rounded-full bg-gray-200"></div>
                    <div className="h-4 w-full rounded-full bg-gray-200"></div>
                </div>
                <div className="h-4 w-72 rounded-full bg-gray-200"></div>
            </div>
            <div className="flex w-full animate-pulse flex-row gap-2 pt-1">
                <div className="h-4 w-24 rounded-full bg-gray-200"></div>
                <div className="h-4 w-32 rounded-full bg-gray-200"></div>
            </div>
        </CardLayout>
    );
}
