import { IoIosArrowForward } from "react-icons/io";

export default function ManagedCompanyItem() {
    return (
        <div className="flex w-full flex-row items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-md">
            <div className="flex flex-row gap-4">
                <img
                    src="https://picsum.photos/200/300"
                    alt="company logo"
                    className="h-24 w-24 rounded-xl"
                />
                <div className="flex flex-col gap-2 ">
                    <h1 className="text-2xl font-bold">Company Name</h1>
                    <p className="text-gray-400">Industry</p>
                </div>
            </div>
            <IoIosArrowForward />
        </div>
    );
}
