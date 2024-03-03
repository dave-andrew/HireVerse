import WrappedStarReview from "../form/WrappedStarReview";
import { FaCheck } from "react-icons/fa";

export default function CompanyReviewItem() {
    return (
        <>
            <div className="flex flex-col w-full border-[1px] border-gray-200 rounded-md p-5">
                <div className="flex flex-row gap-5 items-center">
                    <h2 className="!py-0 my-0">THIS IS THE TITLE</h2>
                    <span className="inline-flex h-8 items-center bg-green-100 text-green-500 text-md gap-2 font-medium px-2.5 py-0.5 rounded-full">
                        <FaCheck />
                        Recommended
                    </span>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row gap-2 items-center">
                        <span>By Robbert Willy</span>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <WrappedStarReview
                            value={1}
                            className="has-[svg]:w-32"
                            disabled={true}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div>
                        <h3>Pros</h3>
                        <ol>
                            <li>Good pay</li>
                            <li>Good benefits</li>
                        </ol>
                    </div>
                    <div>
                        <h3>Cons</h3>
                        <ol>
                            <li>Long hours</li>
                            <li>Bad management</li>
                        </ol>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div>
                        This is a review of the company. It is a very good
                        company to work for. I would recommend it to anyone.
                    </div>
                </div>
            </div>
        </>
    );
}
