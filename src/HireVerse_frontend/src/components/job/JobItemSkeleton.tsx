import CardLayout from "../../layouts/CardLayout";

export default function JobItemSkeleton() {
    return (
        <CardLayout className="flex animate-pulse flex-col rounded-xl p-4 transition">
            <div className="flex flex-row items-center gap-2">
                <svg
                    className="h-10 w-10 text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
                <div>
                    <div className="mb-2 h-2.5 w-48 rounded-full bg-gray-200" />
                    <div className="h-2.5 w-56 rounded-full bg-gray-200" />
                </div>
            </div>
            <div className="text-xl font-bold">
                <div className="my-2 h-3 w-48 rounded-full bg-gray-200" />
                <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-200" />
                <div className="mb-2 h-2.5 w-64 rounded-full bg-gray-200" />
                <div className="mb-2 h-2.5 w-28 rounded-full bg-gray-200" />
            </div>
        </CardLayout>
    );
}
