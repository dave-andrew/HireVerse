import {IoIosArrowForward} from "react-icons/io";


export default function ManagedCompanyItem() {
    return (
        <div className="flex flex-row w-full bg-white rounded-xl shadow-md p-4 gap-4 items-center justify-between">
            <div className="flex flex-row gap-4">
                <img src="https://picsum.photos/200/300" alt="company logo" className="w-24 h-24 rounded-xl" />
                <div className="flex flex-col gap-2 ">
                    <h1 className="text-2xl font-bold">Company Name</h1>
                    <p className="text-gray-400">Industry</p>
                </div>
            </div>
            <IoIosArrowForward />
        </div>
    );
}