import { IoIosArrowForward } from "react-icons/io";

/**
 * ManagedCompanyItem is a functional component that renders a company item.
 * Each company item includes a company logo, company name, and industry.
 * The company item also includes an arrow icon indicating more details can be viewed.
 *
 * @returns JSX.Element A company item.
 */
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
